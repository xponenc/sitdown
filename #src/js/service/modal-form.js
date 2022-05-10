// Модальное окно 

function openModalWindow() {
    const modal = document.querySelector('.modal');
    modal.classList.remove("closed");
    document.querySelector('.modal-overlay').classList.remove("closed");
    playModal.play();
}

function closeModalWindow() {
    const modal = document.querySelector('.modal');
    modal.classList.add("closed");
    document.querySelector('.modal-overlay').classList.add("closed");
    playModal.reverse();
}

function addFormToModal() {
    // Создание содержимого модального окна для контактной формы
    const formContext = `
        <h3 class="modal__heading">Купить в один клик</h3>
        <p class="modal__text">Чтобы оформить заказ — заполните формы ниже и наш менеджер свяжется с вами в течении часа.</p>
        <form action="http://jsonplaceholder.typicode.com/posts" method="POST" class="modal__contact-form contact-form">
            <div class="contact-form__input-box just-validate-tooltip-container">
                <input required id="name" type="text" name="name" class="contact-form__input"
                    placeholder="Как вас зовут?" data-validate-field="name" aria-label="Введите имя"
                    aria-required="true">
            </div>
            <div class="contact-form__input-box just-validate-tooltip-container">
                <input required id="phone" type="phone" name="phone" class="contact-form__input"
                    placeholder="Ваш телефон" data-validate-field="phone" aria-label="Введите ваш номер"
                    aria-required="true">
            </div>
            <div class="contact-form__checkbox checkbox">
                <div class="just-validate-tooltip-container">
                    <label class="checkbox__lable">
                        <input required type="checkbox" id="agree" data-validate-field="agree" class="checkbox__input"
                            aria-label="Согласие на принятие пользовательского соглашения" aria-required="true">
                        <p class="checkbox__text"><span>Принимаю </span><a href="#" class="checkbox__link">
                                пользовательское соглашение</a></p>
                    </label>
                </div>
                <button type="submit" class="contact-form__btn contact-form__btn_modal btn btn_primary"
                    aria-label="Отправить сообщение">Отправить</button>
            </div>
        </form>
    `
    let modal = document.querySelector(".modal");
    modal.classList = ("modal");

    let modalContent = document.querySelector(".modal__content");
    modalContent.classList = ("modal__content");
    modalContent.classList.add("modal__content_contact-form");
    modalContent.textContent = "";
    modalContent.insertAdjacentHTML('afterbegin', formContext);
};

function validateModalContactForm() {
    // Валидация контактной формы  в модале
    /* start Inputmask */
    var phone1 = document.getElementById("phone");
    var im1 = new Inputmask("+7(999) 999 99 99");
    im1.mask(phone1);
    /* end Inputmask */

    modalContactFormValidation = new JustValidate(".modal__contact-form", {
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
        .addField('#agree', [
            {
                rule: 'required',
                errorMessage: 'Обязательное поле',
            },
        ])
        .onSuccess((ev) => {
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
        });
}

function addSliderToModal() {
    // Функия создания слайдера в модальном окне на странице карточки товара PRODUCT
    document.querySelector(".modal").classList.add("modal_slider");

    let modalContent = document.querySelector(".modal__content");
    modalContent.classList = ("modal__content modal__content_slider");
    modalContent.innerText = "";
    let modalSliders = document.createElement('div');
    modalSliders.className = "modal__sliders";

    let modalSliderMain = document.createElement('div');
    modalSliderMain.className = "modal__slider slider-modal";
    let modalSliderMainBody = document.createElement('div');
    modalSliderMainBody.className = "slider-modal__body swiper";
    let modalSliderMainWrapper = document.createElement('div');
    modalSliderMainWrapper.className = "slider-modal__wrapper swiper-wrapper";
    document.querySelector(".slider-product__body").querySelectorAll("img").forEach((img) => {
        let slide = document.createElement('div');
        slide.className = "slider-modal__slide swiper-slide";
        let imgCopy = img.cloneNode();
        slide.append(imgCopy);
        modalSliderMainWrapper.append(slide);
    })
    modalSliderMainBody.append(modalSliderMainWrapper);
    modalSliderMain.append(modalSliderMainBody);


    let control = `
        <div class="slider-thumbs-modal__control controls-slider-thumbs">
            <div class="controls-slider-thumbs__arrows slider-arrows">
                <button class="slider-arrows__btn slider-arrows__btn_prev btn-round" aria-label="Предыдущий слайд">
                    <svg>
                        <use xlink:href="img/sprite.svg#arrow-right"></use>
                    </svg>
                </button>
                <button class="slider-arrows__btn slider-arrows__btn_next btn-round" aria-label="Следующий слайд">
                    <svg>
                        <use xlink:href="img/sprite.svg#arrow-right"></use>
                    </svg>
                </button>
            </div>
        </div>
    `
    let modalSliderThumbs = document.createElement('div');
    modalSliderThumbs.className = "modal__slider-thumbs slider-thumbs-modal";
    let modalSliderThumbsBody = document.createElement('div');
    modalSliderThumbsBody.innerHTML = control;
    modalSliderThumbsBody.className = "slider-thumbs-modal__body swiper-container";
    let modalSliderThumbsWrapper = document.createElement('div');
    modalSliderThumbsWrapper.className = "slider-thumbs-modal__wrapper swiper-wrapper";

    document.querySelector(".slider-thumbs-product__body").querySelectorAll("img").forEach((img) => {
        let slide = document.createElement('div');
        slide.className = "slider-thumbs-modal__slide swiper-slide";
        let imgCopy = img.cloneNode();
        slide.append(imgCopy);
        modalSliderThumbsWrapper.append(slide);
    })
    modalSliderThumbsBody.append(modalSliderThumbsWrapper);
    modalSliderThumbs.append(modalSliderThumbsBody);

    modalSliders.append(modalSliderMain);
    modalSliders.append(modalSliderThumbs);
    modalContent.append(modalSliders);

    let modalProductThumbsSlider = new Swiper(".slider-thumbs-modal__body", {
        spaceBetween: 78,
        slidesPerView: 4,
        slidesPerView: "auto",
        freeMode: true,
        watchSlidesProgress: true,
        navigation: {
            prevEl: '.controls-slider-thumbs__arrows .slider-arrows__btn_prev',
            nextEl: '.controls-slider-thumbs__arrows .slider-arrows__btn_next',
        },
    });
    let modalProductSlider = new Swiper(".slider-modal__body", {
        spaceBetween: 32,
        slidesPerView: 1,
        breakpoints: {
            1024: {
                spaceBetween: 65,
            },
        },
        thumbs: {
            swiper: modalProductThumbsSlider,
        },
    });
};


// gsap линия открытия-закрытия модального окна
let playModal = gsap.timeline({ paused: true });
playModal
    .fromTo(".modal-overlay", {
        display: "none",
        visibility: 'hidden',
        opacity: 0,
        y: "100%",
        duration: 0.5,
    }, {
        display: "block",
        visibility: 'visible',
        opacity: 1,
        y: "0",
    })
    .fromTo(".modal", {
        visibility: 'hidden',
        opacity: 0,
        y: 50,
        duration: 50,
    }, {
        visibility: 'visible',
        opacity: 1,
        y: "0",
    }, "<0.2")