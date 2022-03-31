// Модальное окно 

function openModalWindow() {
    const modal = document.querySelector('.modal')
    modal.classList.toggle("closed")
    document.querySelector('.modal-overlay').classList.toggle("closed")
}

function closeModalWindow() {
    const modal = document.querySelector('.modal')
    modal.classList.toggle("closed")
    document.querySelector('.modal-overlay').classList.toggle("closed")
}

function addFormToModal() {
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
    let modalContent = document.querySelector(".modal__content");
    modalContent.textContent = "";
    modalContent.insertAdjacentHTML('afterbegin', formContext);
};

// Валидация контактной формы  в модале
function validateModalContactForm() {
    document.querySelector(".modal__contact-form").onsubmit = null;
    document.querySelector(".contact-form__btn").click = null;

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
            document.querySelector(".modal__btn-send").submit();
        });
}

function addSliderToModal() {
    let modalContent = document.querySelector(".modal__content");
    modalContent.innerText = "";
    modalContent.classList.add("modal__content_slider")
    let modalSliders = document.createElement('div');
    modalSliders.className = "modal__sliders";

    let modalSliderMain = document.createElement('div');
    modalSliderMain.className = "modal__slider slider-modal";
    let modalSliderMainBody = document.createElement('div');
    modalSliderMainBody.className = "slider-modal__body swiper-container";
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



    let modalSliderThumbs = document.createElement('div');
    modalSliderThumbs.className = "modal__slider-thumbs slider-thumbs-modal";
    let modalSliderThumbsBody = document.createElement('div');
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
        freeMode: true,
        watchSlidesProgress: true,
    });
    let modalProductSlider = new Swiper(".slider-modal__body", {
        spaceBetween: 32,
        slidesPerView: 1,
        thumbs: {
            swiper: modalProductThumbsSlider,
        },
    });

};