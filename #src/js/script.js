@@include('../libs/choise_js/choices.min.js')
@@include('../libs/jquery-3.6.0.min.js')
@@include('../libs/swiper-bundle.min.js')
@@include('../libs/lazyload/lazyload.min.js')
@@include('../libs/focus-visible.js')
@@include('../libs/noUiSlider/nouislider.min.js')
@@include('../libs/validate/just-validate.min.js')
@@include('../libs/validate/inputmask.min.js')
@@include('../libs/gsap/3.7.1/gsap.min.js')


@@include('../js/service/scroll-block.js')
@@include('../js/service/modal-form.js')
@@include('../js/service/contacts-map.js')

@@include('../js/filter-price.js')
@@include('../js/tabs-catalog.js')

window.onload = function () {
    // Инициализация ленивой загрузки изображений
    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });

    // MAIN: HEADER Инициализация choise.js для селекта регион 
    const region = document.querySelector('.region__select');
    const choicesRegion = new Choices(region, {
        searchEnabled: false,
        searchChoices: false,
        itemSelectText: '',
        position: 'bottom',
    });

    // MAIN: HEADER Инициализация choise.js для селекта Категория в _header
    const category = document.querySelector('.category');
    const choicesCategory = new Choices(category, {
        searchEnabled: false,
        searchChoices: false,
        itemSelectText: '',
        position: 'bottom',
    });
    document.addEventListener("click", documentActions);
    function documentActions(e) {
        const targetElement = e.target;
        // PAGE: Переключение табов-странниц в каталоге
        if (targetElement.classList.contains('pages-tabs__btn')) {
            toggleActivePage(targetElement)
        }

        // PRODUCT: Открытие формы в модальном окне
        if (targetElement.closest('.modal-btn-open')) {
            document.querySelector(".modal__content").classList.add("modal__content_contact-form");
            openModalWindow();
            addFormToModal();
            validateModalContactForm();
            disableScroll();
        }

        // PRODUCT: Открытие слайдера картинок в модальном окне
        if (targetElement.closest('.slider-product__slide')) {
            document.querySelector(".modal").classList.add("modal_slider");
            document.querySelector(".modal").classList.add("container");
            openModalWindow();
            addSliderToModal();
            disableScroll();
        }

        // PRODUCT: Открытие формы в модальном окне
        if (targetElement.closest('.modal__btn-close')) {
            closeModalWindow();
            enableScroll();
            document.querySelector(".modal").classList.remove("modal_slider");
            document.querySelector(".modal__content").classList.remove("modal__content_contact-form");

        }
        // MAIN:TOP: Анимация появления новых карточек
        if (targetElement.classList.contains('top-rate__btn')) {
            newItems.play();
        }
        // PRODUCT:MODAL Отправка контактной формы в модальном окне
        if (targetElement.classList.contains('contact-form__btn_modal')) {
            e.preventDefault();
            let modalContent = document.querySelector(".modal__content");
            modalContent.className = "modal__content modal__content_sended";
            modalContent.innerText = "";
            const successLogo = document.createElement('img');
            successLogo.className = "modal__logo";
            successLogo.src = "img/emblem.svg";
            const successHeading = document.createElement('h3');
            successHeading.className = "modal__heading";
            successHeading.innerText = "Спасибо, мы вам перезвоним!"

            modalContent.append(successLogo);
            modalContent.append(successHeading);
        }
    }


    // MAIN:HERO Инициализация свайпера 
    if (document.querySelector('.slider-hero__body')) {
        new Swiper('.slider-hero__body', {
            // direction: 'vertical',
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            // spaceBetween: 32,
            watchOverFlow: true,
            speed: 1500,
            loop: true,
            preloadImages: false,
            parallax: true,
            effect: 'cards',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 30000,
            },
            pagination: {
                el: '.controls-slider-hero__bullets',
                clickable: true,
            },
            //   navigation: {
            //     prevEl: '.controls-slider-hero__arrows .slider-arrows__btn_prev',
            //     nextEl: '.controls-slider-hero__arrows .slider-arrows__btn_next',
            //   },
        })
    }

    // MAIN: SPECIAL Инициализация свайпера
    if (document.querySelector('.slider-special__body')) {
        new Swiper('.slider-special__body', {
            observer: true,
            observeParents: true,
            preloadImages: false,
            lazy: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            speed: 1500,
            // loop: true,
            breakpoints: {
                // 240: {
                //     slidesPerGroup: 1,
                //     slidesPerView: 1,
                //     spaceBetween: 21,
                //     // centeredSlides: true,
                // },
                // 551: {
                //     slidesPerView: 2,
                //     slidesPerGroup: 2,
                //     spaceBetween: 34,
                // },
                // 1024: {
                //     slidesPerView: 2,
                //     slidesPerGroup: 2,
                //     spaceBetween: 50,

                // },
                1360: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 32,
                }
            },
            navigation: {
                prevEl: '.controls-slider-special__arrows .slider-arrows__btn_prev',
                nextEl: '.controls-slider-special__arrows .slider-arrows__btn_next',
            },
        });
    }

    //MAIN:USEFUL Инициализация свйпера 
    if (document.querySelector('.slider-useful__body')) {
        let usefulSlide = new Swiper('.slider-useful__body', {
            observer: true,
            observeParents: true,
            preloadImages: false,
            lazy: true,
            watchSlidesVisibility: true,
            speed: 600,
            // loop: true,
            breakpoints: {
                240: {
                    slidesPerGroup: 1,
                    slidesPerView: 1,
                    spaceBetween: 21,
                    // centeredSlides: true,
                },
                551: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 34,
                },
                1024: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 50,
                },
                1360: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 32,
                }
            },
            navigation: {
                prevEl: '.controls-slider-useful__arrows .slider-arrows__btn_prev',
                nextEl: '.controls-slider-useful__arrows .slider-arrows__btn_next',
            },
        });
    }

    // MAIN:CONTACT-US Валидация формы
    if (document.querySelector('.contact-us__form')) {
        validateModalContactUsForm();
    }
    function validateModalContactUsForm() {
        /* start Inputmask */
        var phone1 = document.getElementById("phone");
        var im1 = new Inputmask("+7(999) 999 99 99");
        im1.mask(phone1);
        /* end Inputmask */

        modalContactFormValidation = new JustValidate(".contact-us__form", {
            errorFieldCssClass: 'is-invalid',
            successFieldCssClass: 'is-valid',
        });
        modalContactFormValidation
            .addField('#name', [
                {
                    rule: 'required',
                    errorMessage: 'Обязательное поле',
                },
                {
                    rule: 'minLength',
                    value: 2,
                    errorMessage: 'Необходимо ввести минимум 2 символа',
                },
                {
                    rule: 'maxLength',
                    value: 100,
                    errorMessage: 'Не более 100 символов',
                },
                {
                    rule: 'customRegexp',
                    value: '^[a-zA-Zа-яА-Я -]+$',
                    errorMessage: 'Допустимы только буквы пробел и дефис',
                },
            ])
            .addField('#phone', [
                {
                    rule: 'required',
                    errorMessage: 'Обязательное поле',
                },
                {
                    validator: (value) => (Number(phone1.inputmask.unmaskedvalue()) && phone1.inputmask.unmaskedvalue().length === 10),
                    errorMessage: 'Неполный номер',
                }
            ])
            .addField('#email-c', [
                {
                    rule: 'required',
                    errorMessage: 'Обязательное поле',
                },
                {
                    rule: 'email',
                    errorMessage: 'Недопустимый формат',
                }
            ])
            .addField('#agree', [
                {
                    rule: 'required',
                    errorMessage: 'Обязательное поле',
                },
            ])
            .onSuccess((ev) => {
                console.log('click');
                document.querySelector(".modal__btn-send").submit();
            });
    }

    // PRODUCT: Инициализация свайпера в Product (Страничке продукта)
    if (document.querySelector(".slider-product__body")) {
        let swiperProductThumbs = new Swiper(".slider-thumbs-product__body", {
            spaceBetween: 38,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
        });
        let swiperProduct2 = new Swiper(".slider-product__body", {
            spaceBetween: 38,
            slidesPerView: 1,
            navigation: {
                prevEl: '.controls-slider-product__arrows .slider-arrows__btn_prev',
                nextEl: '.controls-slider-product__arrows .slider-arrows__btn_next',
            },
            thumbs: {
                swiper: swiperProductThumbs,
            },
        });
    };

    // PRODUCT: Инициализация свайпера в Карточке товара секция Похожие товары
    new Swiper('.slider-similar__body', {
        observer: true,
        observeParents: true,
        preloadImages: false,
        lazy: true,
        watchSlidesVisibility: true,
        speed: 600,
        // loop: true,
        breakpoints: {
            240: {
                slidesPerGroup: 1,
                slidesPerView: 1,
                spaceBetween: 21,
            },
            551: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 34,
            },
            1024: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 50,
            },
            1360: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 32,
            }
        },
        navigation: {
            prevEl: '.controls-slider-similar__arrows .slider-arrows__btn_prev',
            nextEl: '.controls-slider-similar__arrows .slider-arrows__btn_next',
        },
    });

};


// MAIN:TOP анимация карточек
if (document.querySelector('.top-rate')) {
    let newItems = gsap.timeline({ paused: true, });

    newItems
        .to(".top-rate__btn", 0.3, {
            opacity: 0,
            display: "none",
        })
        .to(document.querySelectorAll('.product-card_hidden'), {
            display: "grid",
            visibility: "visible",
            opacity: 1,
            scaleY: 1,
            duration: 0.3,
            // delay: 0.3,
            stagger: 0.2,
        }, "<0.2")
};