$(document).ready(function () {
    if ($(".contacts__map").length) {
        
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
                city: "Москва",
                address: "м. Китай-город, ул. Солянка, д.24",
                phone: "+7 (495) 885-45-47",
                openHours: "с 10:00 до 21:00",
                description: "шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр",
            },
            {
                shopId: 1,
                coordinates: [55.759091068985285, 37.64497999999997],
                name: "SitDownPls на Покровке",
                city: "Москва",
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
                    } else if ($(window).width() >= '1024') {
                        myMap.setCenter([55.75525206897709,37.622373635726056], 14);
                    } else if ($(window).width() >= '768') {
                        myMap.setCenter([55.75423560297916,37.63511949296485], 14);
                    } else {
                        myMap.setCenter([55.75202240937246,37.641669525131164], 14);
                    }
    
                    geoObjects = [];
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
                                        <a class="balloon__call call call_accent" href="tel:+74958854547">
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
                            iconImageHref: 'img/emblem.svg',
                            iconImageSize: [32, 22],
                            iconImageOffset: [-16, -11],
                        },
                        );
                        myMap.options.set({balloonPanelMaxMapArea:'0'});
                        myMap.geoObjects.add(myPlacemark);
                        var geoObjects =  ymaps.geoQuery(myMap.geoObjects);
                        var selected = geoObjects.get(0);
                        selected.balloon.open();
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
                    // var suggestView1 = new ymaps.SuggestView('suggest');
                    var arrSuggestionYa = []
                    for (let index = 0; index < shops.length; index++) {
                        arrSuggestionYa.push(
                            `
                            <p class="shop-choices__heading">${shops[index].city}, ${shops[index].name}</p>
                            <p class="shop-choices__address">${shops[index].address}</p>
                            `
                        );
    
                    }
                    var find = function (arrSuggestionYa, find) {
                        return arrSuggestionYa.filter(function (value) {
                            return (value + "").toLowerCase().indexOf(find.toLowerCase()) != -1;
                        });
                    };
    
                    var myProvider = {
                        suggest: function (request, options) {
                            var res = find(arrSuggestionYa, request),
                                arrayResult = [],
                                results = Math.min(options.results, res.length);
                            for (var i = 0; i < results; i++) {
                                let value = res[i].split("</p>");
                                value = value[0].split(">")[1];
                                arrayResult.push({ displayName: res[i], value: value });
                            }
                            if (arrayResult.length == 0) {
                                arrayResult.push({ displayName: `<p class="shop-choices__heading">Мы не смогли найти нужный Вам магазин</p>`, value: "" });
                                arrayResult.push({ displayName: `<p class="shop-choices__address">Попробуйте другой адрес.</p>`, value: "" });
                            }
                            return ymaps.vow.resolve(arrayResult);
                        }
                    }
                    var suggestView = new ymaps.SuggestView('suggest', { provider: myProvider, results: 3 });
                    suggestView.events.add("select", function (e) {
                        let target = e.get('item').value;
                        for (let index = 0; index < shops.length; index++) {
                            if (shops[index].name == target.split(", ")[1]) {
                                point = shops[index].coordinates;
                                myMap.setCenter(point, 15);
                                var geoObjects =  ymaps.geoQuery(myMap.geoObjects);
                                var selected = geoObjects.search("geometry.coordinates = '" + point + "'").get(0);
                                selected.balloon.open();
                                // geoObjects[0].balloon.open();
                            };
    
                        }
                    })
                }
            })
        }
    
        // Инициализация поиска магазинов на карте
        const shopsInput = document.querySelector('.contacts__input');
        let shopsInputData = [];
        for (let index = 0; index < shops.length; index++) {
            const element = shops[index];
            shopsInputData.push({
                value: shops[index].shopId,
                label: `
                        <p class="shop-choices__heading">${shops[index].name}</p>
                        <p class="shop-choices__address">${shops[index].address}</p>
                    `,
                selected: false,
            })
        }
    
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
    }
})
