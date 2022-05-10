@@include('../libs/choise_js/choices.min.js')
@@include('../libs/jquery-3.6.0.min.js')
@@include('../libs/swiper-bundle.min.js')
@@include('../libs/lazyload/lazyload.min.js')
@@include('../libs/focus-visible.js')
@@include('../libs/noUiSlider/nouislider.min.js')
@@include('../libs/validate/just-validate.min.js')
@@include('../libs/validate/inputmask.min.js')
@@include('../libs/gsap/3.7.1/gsap.min.js')
@@include('../libs/simplebar/simplebar.min.js')

@@include('../js/service/scroll-block.js')
@@include('../js/service/modal-form.js')
@@include('../js/service/contacts-map.js')

@@include('../js/filter-price.js')
// @@include('../js/tabs-catalog.js')
@@include('../js/filters.js')

window.onload = function () {
    // Инициализация ленивой загрузки изображений
    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });

    // MAIN: HEADER Инициализация choise.js для селекта регион 
    const region = document.querySelector('.region__select');
    const choicesRegion = new Choices(region, {
        allowHTML: true,
        searchEnabled: false,
        searchChoices: false,
        itemSelectText: '',
        position: 'bottom',
    });

    // MAIN: HEADER Инициализация choise.js для селекта Категория в _header
    const category = document.querySelector('.category');
    const choicesCategory = new Choices(category, {
        allowHTML: true,
        searchEnabled: false,
        searchChoices: false,
        itemSelectText: '',
        position: 'bottom',
    });

    let cartSimpleBar = new SimpleBar(document.getElementById('cart'), {
        autoHide: false,
        scrollbarMaxSize: 28,
    });

    document.addEventListener("click", documentActions);
    function documentActions(e) {
        const targetElement = e.target;
        console.log(targetElement);
        // BURGER открытие
        if (targetElement.classList.contains("burger") || targetElement.closest(".burger")) {
            showBurger();
        };
        // MAIN:TOP: Анимация появления новых карточек
        if (targetElement.classList.contains("top-rate__btn")) {
            showNewItems();
        };
        // CATALOG:a-side показ дополнительных элементов в фильтрах
        if (targetElement.classList.contains("filter__btn_show")) {
            showHiddenFilters(targetElement);
        };
        // CATALOG:a-side скрытие дополнительных элементов в фильтрах
        if (targetElement.classList.contains("filter__btn_hide")) {
            hideFilters(targetElement);
        };
        // CATALOG:a-side раскрытие фильтров на >= 1024px
        if (document.body.clientWidth <= 1024 &&
            (targetElement.classList.contains("section-filter__heading") || targetElement.closest(".section-filter__heading"))) {
            openFilter(targetElement);
        };
        // CATALOG:a-side закрытие фильтров на >= 1024px
        if (!targetElement.closest(".section-filter__heading") && !targetElement.closest(".section-filter__body") && document.querySelectorAll(".section-filter__heading_open").length > 0) {
            document.querySelectorAll(".section-filter__body_open").forEach(n => n.classList.remove("section-filter__body_open"))
            document.querySelectorAll(".section-filter__heading_open").forEach(n => n.classList.remove("section-filter__heading_open"))
        }
        // PRODUCT: Закрытие формы в модальном окне
        if (document.querySelector(".modal") && !document.querySelector(".modal").classList.contains("closed")) {

            if (targetElement.closest(".modal__btn-close") || !targetElement.closest(".modal")) {
                closeModalWindow();
                enableScroll();
            }
        };
        // PRODUCT: Открытие формы в модальном окне
        if (targetElement.closest(".modal-btn-open")) {
            openModalWindow();
            addFormToModal();
            validateModalContactForm();
            disableScroll();
        }
        // PRODUCT: Открытие слайдера картинок в модальном окне
        if (targetElement.closest(".slider-product__slide")) {
            openModalWindow();
            addSliderToModal();
            disableScroll();
        }
        // PRODUCT: Добавление товара в корзину
        if (targetElement.classList.contains("card-product__btn-add") || targetElement.classList.contains("product-card__btn")) {
            let productId = NaN;
            if (targetElement.classList.contains('card-product__btn-add')) {
                productId = targetElement.closest('.card-product').dataset.product_id;
                console.log(productId);
            } else {
                productId = targetElement.closest('.product-card').dataset.product_id;
            };
            
            // addProductToCart(targetElement, productId);
            productFlytoCart(targetElement, productId);
        }
        // PRODUCT: Удаление товара из корзину
        if (targetElement.classList.contains('cart-list__delete')) {
            e.preventDefault();
            const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
            updateCart(targetElement, productId);
        }

        // HEADER открытие корзины
        if (targetElement.classList.contains('cart') || targetElement.closest('.cart')) {
            if (document.querySelector('.cart-list').children.length > 0) {
                document.querySelector('.cart-container').classList.toggle('cart-container_active')
            }
            e.preventDefault()
        } else if (!targetElement.closest('.cart-container') && !targetElement.classList.contains('cart-container')) {
            document.querySelector('.cart-container').classList.remove('cart-container_active')
        }
    }


    // MAIN:HERO Инициализация свайпера 
    if (document.querySelector(".slider-hero__body")) {
        new Swiper(".slider-hero__body", {
            slidesPerView: 1,
            speed: 1500,
            loop: true,
            preloadImages: false,
            parallax: true,
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 30000,
            },
            pagination: {
                el: ".controls-slider-hero__bullets",
                clickable: true,
            },
        })
    }

    // MAIN: SPECIAL Инициализация свайпера
    if (document.querySelector(".slider-special__body")) {
        new Swiper(".slider-special__body", {
            observer: true,
            observeParents: true,
            preloadImages: false,
            lazy: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            speed: 1500,
            breakpoints: {
                240: {
                    slidesPerGroup: 1,
                    slidesPerView: 1,
                    spaceBetween: 32,
                },
                641: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 32,
                },
                800: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 32,
                },
            },
            navigation: {
                prevEl: ".controls-slider-special__arrows .slider-arrows__btn_prev",
                nextEl: ".controls-slider-special__arrows .slider-arrows__btn_next",
            },
        });
    }
    // MAIN:TOP анимация карточек
    function showNewItems() {
        let topIems = document.querySelectorAll(".top-rate__item");
        console.log(topIems);
        let itemsNotShown = [];
        for (let index = 0; index < topIems.length; index++) {
            const element = topIems[index];
            let style = window.getComputedStyle(element);
            if (style.visibility === "hidden") {
                itemsNotShown.push(element);
            };
        }
        let series = 4;
        if ((document.body.clientWidth <= 1024 && document.body.clientWidth > 768)) {
            series = 3;
        } else if (document.body.clientWidth < 640) {
            series = 2;
        };

        if (itemsNotShown) {
            let itemsWillShown = itemsNotShown.slice(0, series);
            let newItems = gsap.timeline();
            if (itemsNotShown.length - series <= 0) {
                newItems
                    .to(".top-rate__btn", 0.3, {
                        opacity: 0,
                        display: "none",
                    })
            };

            newItems
                .to(itemsWillShown, {
                    display: "grid",
                    visibility: "visible",
                    opacity: 1,
                    scaleY: 1,
                    duration: 0.3,
                    // delay: 0.3,
                    stagger: 0.2,
                }, "<0.2")
        }
    }
    //MAIN:USEFUL Инициализация свйпера 
    if (document.querySelector(".slider-useful__body")) {
        let usefulSlide = new Swiper(".slider-useful__body", {
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
                511: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 32,
                },
                769: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 32,
                },
                1320: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 32,
                },
            },
            navigation: {
                prevEl: ".controls-slider-useful__arrows .slider-arrows__btn_prev",
                nextEl: ".controls-slider-useful__arrows .slider-arrows__btn_next",
            },
        });
    }

    // MAIN:CONTACT-US Валидация формы
    if (document.querySelector(".contact-us__form")) {
        validateModalContactUsForm();
    }
    function validateModalContactUsForm() {
        /* start Inputmask */
        var phone1 = document.getElementById("phone");
        var im1 = new Inputmask("+7(999) 999 99 99");
        im1.mask(phone1);
        /* end Inputmask */

        modalContactFormValidation = new JustValidate(".contact-us__form", {
            errorFieldCssClass: "is-invalid",
            successFieldCssClass: "is-valid",
        });
        modalContactFormValidation
            .addField("#name", [
                {
                    rule: "required",
                    errorMessage: "Обязательное поле",
                },
                {
                    rule: "minLength",
                    value: 2,
                    errorMessage: "Необходимо ввести минимум 2 символа",
                },
                {
                    rule: "maxLength",
                    value: 100,
                    errorMessage: "Не более 100 символов",
                },
                {
                    rule: "customRegexp",
                    value: "^[a-zA-Zа-яА-Я -]+$",
                    errorMessage: "Допустимы только буквы пробел и дефис",
                },
            ])
            .addField("#phone", [
                {
                    rule: "required",
                    errorMessage: "Обязательное поле",
                },
                {
                    validator: (value) => (Number(phone1.inputmask.unmaskedvalue()) && phone1.inputmask.unmaskedvalue().length === 10),
                    errorMessage: "Неполный номер",
                }
            ])
            .addField("#email-c", [
                {
                    rule: "required",
                    errorMessage: "Обязательное поле",
                },
                {
                    rule: "email",
                    errorMessage: "Недопустимый формат",
                }
            ])
            .addField("#agree", [
                {
                    rule: "required",
                    errorMessage: "Обязательное поле",
                },
            ])
            .onSuccess((ev) => {
                document.querySelector(".modal__btn-send").submit();
            });
    }

    //CATALOG Инициализация свайпера 
    if (document.querySelector(".slider-catalog__body")) {
        new Swiper(".slider-catalog__body", {
            // allowTouchMove: false,
            // simulateTouch: false,
            // observer: true,
            // observeParents: true,
            slidesPerView: 2,
            slidesPerGroup: 2,
            grid: {
                fill: 'rows',
                rows: 3,
            },
            spaceBetween: 16,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 32,
                },
                1024: {
                }
            },
            pagination: {
                el: ".controls-slider-catalog__bullets",
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + "</span>";
                },
            },
        })
    }

    // PRODUCT: Инициализация свайпера в Product (Страничке продукта)
    if (document.querySelector(".slider-product__body")) {
        let swiperProductThumbs = new Swiper(".slider-thumbs-product__body", {
            spaceBetween: 38,
            slidesPerView: "auto",
            freeMode: true,
            watchSlidesProgress: true,
            direction: "horizontal",

            breakpoints: {
                511: {
                    direction: "vertical",
                    slidesPerView: "auto",
                    spaceBetween: 18,
                },
                769: {
                    direction: "horizontal",
                    slidesPerView: "auto",
                    spaceBetween: 38,
                },
            },
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
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 16,
            },
            551: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 34,
            },
            1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 32,
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

    let burgerTL = gsap.timeline({ paused: true, reversed: true, });
    let burgerPlay = burgerTL
        .to(".header__top", {
            zIndex: 1000,
        })
        .fromTo(".burger-menu", {
            duration: 0.3,
            display: "none",
            visibility: "hidden",
            y: -20,
            opacity: 0
        }, {
            display: "block",
            visibility: "visible",
            y: 0,
            opacity: 1,
        })

    function showBurger() {
        if (burgerTL.reversed()) {
            let burgerMenu = document.querySelector(".burger-menu__menu");
            burgerMenu.innerText = "";
            let burgerMenuClone = document.querySelector(".header__menu").innerHTML;
            // burgerMenu.classList = ("burger-menu__menu menu")
            burgerMenu.insertAdjacentHTML("afterbegin", burgerMenuClone);
            document.querySelector(".header__burger").classList.add("burger_active");
            if (document.body.clientWidth <= 768) {
                let burgerSubMenuClone = document.querySelector(".header__submenu").innerHTML;
                // burgerSubMenu.classList = ("burger-menu__submenu submenu")
                let burgerSubMenu = document.querySelector(".burger-menu__submenu");
                burgerSubMenu.innerText = "";
                burgerSubMenu.insertAdjacentHTML("afterbegin", burgerSubMenuClone);
            }
            document.querySelector(".header__burger").setAttribute("aria-label", "Закрыть меню")
            burgerPlay.play();
            disableScroll();
        } else {
            document.querySelector(".header__burger").classList.remove("burger_active");
            burgerPlay.reverse();
            enableScroll();
        }
    }

    function addProductToCart(targetBtn, productId) {
        let allCarts = document.querySelectorAll(".cart");
        let cartValue = allCarts[0].querySelector(".cart__counter").innerText;
        const productInCart = document.querySelector(`[data-cart-pid="${productId}"]`)
        const cartList = document.querySelector('.cart-list')

        allCarts.forEach((el) => {
            el.querySelector(".cart__counter").innerText = parseInt(cartValue) + 1;
        })

        if (!productInCart) {
            let product = NaN;
            let cartProductImage = NaN;
            let cartProductTitle = NaN;

            if (targetBtn.classList.contains('card-product__btn-add')) {
                product = document.querySelector(`[data-product_id="${productId}"]`);
                cartProductImage = document.querySelector('.slider-product__slide').nextSibling.innerHTML;
                cartProductTitle = product.querySelector('.card-product__heading').innerHTML;
            } else {
                product = document.querySelector(`[data-product_id="${productId}"]`);
                cartProductImage = product.querySelector('.product-card__image').innerHTML;
                cartProductTitle = product.querySelector('.product-card__title').innerHTML;
            };
            
            const cartProductContent = `
                <a href="" class="cart-list__image">${cartProductImage}</a>
                <div class="cart-list__body">
                    <a href="" class="cart-list__title">${cartProductTitle}</a>
                    <div class="cart-list__quantity">Кол-во:<span>1</span></div>
                    <a href="" class="cart-list__delete">Удалить</a>
                </div>
                `;
            cartList.insertAdjacentHTML('beforeend', `<li class="cart-list__item" data-cart-pid="${productId}">${cartProductContent}</li>`)
            cartSimpleBar.recalculate();
        } else {
            const cartProductQuantity = productInCart.querySelector('.cart-list__quantity span');
            cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
        }
        targetBtn.classList.remove('_hold');


    };

    function productFlytoCart(targetBtn, productId) {
        if (!targetBtn.classList.contains('_hold')) {
            targetBtn.classList.add('_hold');
            targetBtn.classList.add('_fly');
            const product = document.querySelector(`[data-product_id="${productId}"]`);
            let productImage = NaN;
            if (targetBtn.classList.contains('card-product__btn-add')) {
                productImage = document.querySelector('.slider-product__slide.swiper-slide-active');
            } else {
                productImage = product.querySelector('.product-card__image');
            };

            const productImageFly = productImage.cloneNode(true);

            const productImageFlyWidth = productImage.offsetWidth;
            const productImageFlyHeight = productImage.offsetHeight;
            const productImageFlyTop = productImage.getBoundingClientRect().top;
            const productImageFlyLeft = productImage.getBoundingClientRect().left;

            productImageFly.classList.add('_flyImage');
            productImageFly.style.cssText =
                `
            left: ${productImageFlyLeft}px;
            top: ${productImageFlyTop}px;
            width: ${productImageFlyWidth}px;
            height: ${productImageFlyHeight}px;
            border: 1px solid red;
            `;

            document.body.append(productImageFly);

            let allCarts = document.querySelectorAll(".cart");
            allCarts.forEach((el) => {
                if (getComputedStyle(el.parentElement).display != 'none')
                    cart = el;
            })
            const cartFlyTop = cart.getBoundingClientRect().top;
            const cartFlyLeft = cart.getBoundingClientRect().left;
            console.log(cartFlyTop, cartFlyLeft);

            productImageFly.style.cssText =
                `
            left: ${cartFlyLeft}px;
            top: ${cartFlyTop}px;
            width: 0;
            height: 0;
            opacity: 0;
            transform: rotate(720deg);
            `;

            productImageFly.addEventListener('transitionend', function () {
                if (targetBtn.classList.contains('_fly')) {
                    productImageFly.remove();
                    addProductToCart(targetBtn, productId);
                    targetBtn.classList.remove('_fly');
                }
            })
        }
    };

    function updateCart(targetElement, productId) {
        const productInCart = document.querySelector(`[data-cart-pid="${productId}"]`)
        const productInCartQuantity = productInCart.querySelector('.cart-list__quantity span')
        productInCartQuantity.innerHTML = --productInCartQuantity.innerHTML
        if (!parseInt(productInCartQuantity.innerHTML)) {
            productInCart.remove()
        }

        let allCarts = document.querySelectorAll(".cart");
        let cartValue = allCarts[0].querySelector(".cart__counter").innerText;
        const cartList = document.querySelector('.cart-list')

        allCarts.forEach((el) => {
            el.querySelector(".cart__counter").innerText = parseInt(cartValue) - 1;
        })
    
        if (parseInt(cartValue) - 1 == 0) {
            document.querySelector(".cart-container").classList.remove('cart-container_active');
        }
    };

};


