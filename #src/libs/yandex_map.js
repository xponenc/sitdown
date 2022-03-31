$(document).ready(function () {
  let flagMap = false
  $(window).on('scroll', function () {
    if (!flagMap) {
      flagMap = true
      showMap()
    }
    function showMap() {
      var src = 'https://api-maps.yandex.ru/2.1/?apikey=edb7a56f-b6d2-4a63-af7c-ab1645a6e948&lang=ru_RU';
      $.getScript(src).done(function () {
        ymaps.ready(init);
        function init() {
          var myMap = new ymaps.Map("mapYandex", {
            center: [55.75717447825627,37.61505243121332], zoom: 12, controls: []
          }),
            myGeoObject = new ymaps.GeoObject({
              geometry: {
                type: "Point",
                coordinates: [55.76953456898229,37.63998549999998]
              },
              properties: {
                iconContent: '107045, Москва, Даев переулок, дом 41',
                hintContent: '107045, Москва, Даев переулок, дом 41',
              }
            }, {
              iconLayout: 'default#image',
              iconImageHref: 'img/map-pin.svg',
              iconImageSize: [20, 20],
              iconImageOffset: [-10, -10]
            });
          if ($(window).width() > '1360') {
            myMap.setCenter([55.75717447825627,37.61505243121332]);
          } else if ($(window).width() > '1024') {
            myMap.setCenter([55.75717447825627,37.61505243121332]);
          } else {
            myMap.setCenter([55.75717447825627,37.61505243121332], 15);
          }
          myMap.geoObjects.add(myGeoObject);

          function onResizeMap() {
            if ($(window).width() > '1360') {
              myMap.setCenter([55.75717447825627,37.61505243121332]);
            } else if ($(window).width() > '768') {
              myMap.setCenter([55.75717447825627,37.61505243121332]);
            } else {
              // myMap.setCenter([10, 10]);
              myMap.setCenter([55.75717447825627,37.61505243121332], 15);
            }
          }
          onResizeMap();
          window.onresize = function () {
            onResizeMap();
          };
        }
        // if ((screen.width <= 550) || (window.innerWidth <= 550)) {
        //   $('.contacts__map').insertAfter($('.info__showroom'));
        // }
      })
    }
  })
})