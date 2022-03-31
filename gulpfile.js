
// Если вылетает ошибка webp-converter - переустановить npm install webp-converter@2.2.3 --save-dev
let source_folder = "#src";
let project_folder = 'build_' + require('path').basename(__dirname);

let path = {
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/css/**/*.scss",
    js: source_folder + "/js/script.js",
    libs: source_folder + "/libs/**",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico}",
    fonts: source_folder + "/fonts/*.ttf",
  },
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    libs: project_folder + "/libs/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/css/**/*.scss",
    js: source_folder + "/js/**/*.js",
    libs: source_folder + "/libs/**",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico}",
  },
  clean: {
    build: "./" + project_folder + "/",
  }
}

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  del = require('del'),
  rename = require('gulp-rename'),
  fileinclude = require('gulp-file-include'),
  typograf = require('gulp-typograf'),
  htmlMin = require('gulp-htmlmin'),
  sourcemaps = require('gulp-sourcemaps'),
  scss = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  groupmedia = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  uglify = require('gulp-uglify-es').default,
  babel = require('gulp-babel'),
  notify = require('gulp-notify'),
  imagemin = require('gulp-image'),
  webp = require('gulp-webp'),
  avif = require('gulp-avif'),
  // webp_html = require('gulp-webp-html'),
  // webp_css = require('gulp-webpcss')

  // подключить testwebp.js

  svgSprite = require('gulp-svg-sprite'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  fonter = require('gulp-fonter'), // Конвертер шрифтов, тут otf to ttf
  gulp_if = require('gulp-if');
  
//Запуск обработки production версии gulp --build, разработка по умолчанию gulp
// Устанавливает флаг для сборки product версии
let productFlag = false;

let setProductFlag = (done) => {
  productFlag = true;
  done();
};

// Очистка директории с build версией
const clean = () => {
  return del(path.clean.build)
}

const browserSync = () => {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
    // tunnel: true,
  })
}

// Обирает все компоненты @html в один файл, текст обрабатывается типографом
const processHtml = () => {
  return src(path.src.html)
    .pipe(fileinclude())
    // .pipe(typograf({
    //   locale: ['ru', 'en-US']
    // }))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

// Минификация html
const minifyHtml = () => {
  console.log(`${path.build.html}**/*.html`);
  return src(`${path.build.html}**/*.html`)
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(dest(path.build.html));
}

const processCss = () => {
  return src(path.src.css)
    .pipe(gulp_if(productFlag, sourcemaps.init()))
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )
    .pipe(groupmedia())
    .pipe(autoprefixer({
      overrideBrowserslist: [
        "last 5 version",
        "> 1%",
        "IE 10"
      ],
      cascade: true,
    }))
    .pipe(gulp_if(productFlag, sourcemaps.write()))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

// Минификация css
const minifyCss = () => {
  return src(`${path.build.css}/**/*.css`)
    .pipe(clean_css({
      level:
      {
        2: {
          specialComments: 0
        }
      }
      // , format: 'beautify'
    }))
    .pipe(dest(path.build.css));
}

const processJs = () => {
  return src(path.src.js)
    .pipe(gulp_if(productFlag, sourcemaps.init()))
    .pipe(fileinclude())
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    .pipe(gulp_if(productFlag, sourcemaps.write()))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

// Минификация JavaScript
const minifyJs = () => {
  return src(`${path.build.js}/*.js`)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify({ toplevel: true }).on('error', notify.onError()))
    // .pipe(rename({
    //   extname: ".min.js"
    // }))
    .pipe(dest(path.build.js));
}

const processImages = () => {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

const webpImages = () => {
  console.log([`${source_folder}/img/**/*.{jpg,jpeg,png}`])
  return src([`${source_folder}/img/**/*.{jpg,jpeg,png}`])
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(dest(path.build.img))
};

const avifImages = () => {
  return src([`${source_folder}/img/**/*.{jpg,jpeg,png}`])
    .pipe(avif())
    .pipe(dest(path.build.img))
};

const minfiyImages = () => {
  return src([`${source_folder}/img/**/*.{jpg,jpeg,png}`])
    .pipe(imagemin())
    .pipe(dest(path.build.img))
};

const createSpriteSVG = () => {
  return gulp.src([source_folder + '/iconsprite/*.svg'])
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg',
          // example: true, // формирует тестовый html с svg
        }
      }
    }))
    .pipe(dest(path.build.img))
}

const processFonts = () => {
  return src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts))
    .pipe(src(path.src.fonts))
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
}

const processLibs = () => {
  return src(path.src.libs)
    .pipe(dest(path.build.libs))
}

// запуск таска в терминале проекта gulp otf2ttf
gulp.task('otf2ttf', () => {
  return src([source_folder + '/fonts/*.otf'])
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(dest(source_folder + '/fonts/'))
})

// Подключение шрифтов в fonts.scss
const fs = require('fs');
async function fontsStyle(params) {
  let file_content = fs.readFileSync(source_folder + '/css/_fonts.scss', 'utf-8');
  if (file_content == '') {
    fs.writeFile(source_folder + '/css/_fonts.scss', '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (err) {
        console.log(err);
      }
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(source_folder + '/css/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    })
  }
}
function cb() {
}

const watchFiles = () => {
  gulp.watch([path.watch.html], processHtml)
  gulp.watch([path.watch.css], processCss)
  gulp.watch([path.watch.js], processJs)
  gulp.watch([path.watch.img], processImages)
  gulp.watch([path.watch.libs], processLibs)
}

exports.default = gulp.series(
  clean,
  fontsStyle,
  processFonts,
  gulp.parallel(
    processHtml,
    processImages,
    processJs,
    processLibs,
    processCss,
    createSpriteSVG,
  ),
  gulp.parallel(
    webpImages, avifImages,
  ),
  gulp.parallel(
    watchFiles,
    browserSync,
  ),
);

exports.build = gulp.series(
  setProductFlag,
  clean,
  fontsStyle,
  processFonts,
  gulp.parallel(
    processHtml, processImages, processJs, processLibs, processCss, createSpriteSVG,
  ),
  gulp.parallel(
    minifyHtml, minifyCss, minifyJs, minfiyImages, webpImages, avifImages,
  ),
);
