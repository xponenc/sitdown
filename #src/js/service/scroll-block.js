// Блокировка скроллинга сайта
let scrollDisabled = null
let disableScroll = function () {
    scrollDisabled = true
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    // console.log(window.innerWidth);
    // console.log(document.body.clientWidth);
    // console.log(document.body.scrollWidth);
    // console.log( document.body.offsetWidth);

    document.body.style.paddingRight = paddingOffset
    let pagePosition = window.scrollY;

    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
}

let enableScroll = function () {
    scrollDisabled = null
    let pagePosition = parseInt(document.body.dataset.position, 10);
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scroll({ top: pagePosition, left: 0 });
    document.body.removeAttribute('data-position');

    document.body.style.paddingRight = '0'

}