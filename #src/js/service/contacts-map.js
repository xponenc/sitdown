$(document).ready(function () {
    /* версия для подгрузки карты при скролле страницы */
    // let flagMap = false
    // $(window).on('scroll', function () {
    //     if (!flagMap) {
    //         flagMap = true
    //         showMap()
    //     }
    // })
    /* версия для подгрузки карты при скролле страницы */

    showMap();

    // Список магазинов
    let shops = [
        {
            shopId: 0,
            coordinates: [55.750615568993275, 37.64180899999995],
            name: "SitDownPls на Солянке",
            address: "м. Китай-город, ул. Солянка, д.24",
            phone: "+7 (495) 885-45-47",
            openHours: "с 10:00 до 21:00",
            description: "шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр",
        },
        {
            shopId: 1,
            coordinates: [55.759091068985285, 37.64497999999997],
            name: "Москва, SitDownPls на Покровке",
            address: "м. Курская, ул. Покровка, д.14",
            phone: "+7 (495) 385-45-54",
            openHours: "с 09:00 до 20:00",
            description: "шоурум, пункт отгрузки, пункт выдачи",
        },
    ]

    // Инициализация карты с точками магазинов
    function showMap() {
        var src = 'https://api-maps.yandex.ru/2.1/?apikey=edb7a56f-b6d2-4a63-af7c-ab1645a6e948&lang=ru_RU';
        $.getScript(src).done(function () {
            ymaps.ready(init);
            function init() {
                var myMap = new ymaps.Map("mapYandex", {
                    center: [54.7509, 37.6152], zoom: 15, controls: []
                });
                if ($(window).width() > '1360') {
                    myMap.setCenter([55.75494181875479, 37.62408496282954], 15);
                } else if ($(window).width() > '1024') {
                    myMap.setCenter([55.75808357148573, 37.615080153259235]);
                } else {
                    myMap.setCenter([55.758043717365965, 37.61548821153161], 13);
                }

                for (let i = 0; i < shops.length; i++) {
                    var myPlacemark = new ymaps.Placemark(
                        // Координаты метки
                        shops[i].coordinates,
                        {
                            iconContent: `${shops[i].name}`,
                            hintContent: `${shops[i].name}`,
                            balloonContentHeader: `
                                <div class="balloon__header">
                                    <p class="balloon__heading">${shops[i].name}</p>
                                    <p class="balloon__address">${shops[i].address}</p>
                                    <a class="call call_accent" href="tel:+74958854547">
                                        <svg>
                                            <use xlink:href="img/sprite.svg#call"></use>
                                        </svg>
                                        <span>${shops[i].phone}</span>
                                    </a>
                                </div>`,
                            balloonContentBody: `
                                <div class="balloon__content">
                                    <span class="balloon__name">Часы работы</span>
                                    <span class="balloon__value">: ${shops[i].openHours}</span>
                                </div>`,
                            balloonContentFooter: `
                                <div>
                                    <span class="balloon__name">Что здесь: </span>
                                    <span class="balloon__value">${shops[i].description}</span>
                                </div>
                                `,
                        }, {
                        /* Свойства метки: - контент значка метки */
                        hideIcon: false,
                        hideIconOnBalloonOpen: false,
                        iconLayout: 'default#image',
                        iconImageHref: 'img/map-item.svg',
                        iconImageSize: [32, 22],
                        iconImageOffset: [-16, -11],
                    },
                    );
                    myMap.geoObjects.add(myPlacemark);
                }


                // function onResizeMap() {
                //     if ($(window).width() > '1360') {
                //         myMap.setCenter([55.760091893815854, 37.63869358468625]);
                //     } else if ($(window).width() > '768') {
                //         myMap.setCenter([55.75808357148573, 37.615080153259235]);
                //     } else {
                //         myMap.setCenter([10, 10]);
                //         myMap.setCenter([55.758043717365965, 37.61548821153161], 13);
                //     }
                // }
                // onResizeMap();
                // window.onresize = function () {
                //     onResizeMap();
                // };
            }
        })
    }

    // Инициализация поиска магазинов на карте
    const shopsInput = document.querySelector('.contacts__input');
    // const shopChoices = new Choices(shopsInput, {
    //     classNames: {
            // containerOuter: 'shop-choices',
            // containerInner: 'shop-choices__inner',
            // input: 'shop-choices__input',
            // inputCloned: 'shop-choices__input--cloned',
            // list: 'shop-choices__list',
            // listItems: 'shop-choices__list--multiple',
            // listSingle: 'shop-choices__list--single',
            // listDropdown: 'shop-choices__list--dropdown',
            // item: 'shop-choices__item',
            // itemSelectable: 'shop-choices__item--selectable',
            // itemDisabled: 'shop-choices__item--disabled',
            // itemChoice: 'shop-choices__item--choice',
            // placeholder: 'shop-choices__placeholder',
            // group: 'shop-choices__group',
            // groupHeading: 'shop-choices__heading',
            // button: 'shop-choices__button',
            // activeState: 'is-active',
            // focusState: 'is-focused',
            // openState: 'is-open',
            // disabledState: 'is-disabled',
            // highlightedState: 'is-highlighted',
            // selectedState: 'is-selected',
            // flippedState: 'is-flipped',
            // loadingState: 'is-loading',
            // noResults: 'has-no-results',
            // noChoices: 'has-no-choices'
    //     },
    // });

    let choicesList = [];
    for (i = 0; i < shops.length; i++) {
        choicesList.push(
            {
                value: shops[i].shopId,
                label: `
                    <p class="shop-choices__heading">${shops[i].name}</p>
                    <p class="shop-choices__address">${shops[i].address}</p>
                `,
            }
        )
    }

    // shopChoices.setChoices(
    //     choicesList,
    //     'value',
    //     'label',
    //     false,
    // );


    // Отправка контактной формы в модальном окне

    function sendForm() {
        let modalContent = document.querySelector(".modal__content");
        modalContent.className = ".modal__content .modal__content_sended";

        const successLogo = document.createElement('img');
        successLogo.className = "modal__logo";
        successLogo.src = "img/emblem.svg"
        const successHeading = document.createElement('h3');
        successHeading.className = "modal__heading";
        successHeading.innerText = "Спасибо, мы вам перезвоним!"

        modalContent.append(successLogo);
        modalContent.append(successHeading);
    };

})