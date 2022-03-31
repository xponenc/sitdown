// Переключение активного языкового блока в Gallery
function toggleActivePage(target) {
    const path = target.dataset.path

    const pageTabsItems = document.querySelectorAll('.pages-tabs__btn')
    const pageContentItems = document.querySelectorAll('.catalog__page')

    pageTabsItems.forEach(e => { e.classList.remove('pages-tabs__btn_active') })
    pageContentItems.forEach(e => { e.classList.remove('catalog__page_active') })

    document.querySelector(`[data-path="${path}"]`).classList.add('pages-tabs__btn_active')
    document.querySelector(`[data-target="${path}"]`).classList.add('catalog__page_active')
}