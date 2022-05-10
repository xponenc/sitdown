let filters = document.querySelectorAll(".section-filter__body");

filters.forEach((el) => {
    let items = el.querySelectorAll(".section-filter__checkbox");
    let itemsCounter = items.length;
    let itemsHidden = itemsCounter - 9;

    if (itemsCounter > 9) {
        let btnShowMoreItems = el.querySelector(".filter__btn_show");
        if (btnShowMoreItems) {
            btnShowMoreItems.classList.remove("filter__btn_hidden");
            btnShowMoreItems.textContent = `+ ещё ${itemsHidden}`
        }
    }
})

function showHiddenFilters(target) {
    let items = target.parentElement.querySelectorAll(".section-filter__checkbox");
    let itemsHidden = [];
    for (let index = 0; index < items.length; index++) {
        if (index >= 9) {
            const element = items[index];
            itemsHidden.push(element);
            element.classList.add("_show")
        };
    }
    let btnHideItems = target.parentElement.querySelector(".filter__btn_hide");
    showHiddenFiltersAnnimate(target, btnHideItems, itemsHidden);
};

function hideFilters(target) {
    let items = Array.from(target.parentElement.querySelectorAll("._show"));
    let btnShowMoreItems = target.parentElement.querySelector(".filter__btn_show");
    hideFiltersAnnimate(btnShowMoreItems, target, items.reverse());
};

function showHiddenFiltersAnnimate(btnShow, btnHide, items) {
    let filtersTL = gsap.timeline();
    filtersTL
        .to(btnShow, 0.3, {
            scaleY: 0,
            display: "none",
            visibility: "hidden",
        })
        .to(items, {
            display: "flex",
            visibility: "visible",
            scaleY: 1,
            duration: 0.3,
            // delay: 0.3,
            stagger: 0.2,
        }, "<0.2")
        .to(btnHide, {
            display: "flex",
            visibility: "visible",
            scaleY: 1,
            duration: 0.3,
        }, "<0.2")

    // direction ? filtersTL.play() : filtersTL.reverse();
};

function hideFiltersAnnimate(btnShow, btnHide, items) {
    let filtersTL = gsap.timeline();
    filtersTL
        .to(btnHide, 0.3, {
            scaleY: 0,
            display: "none",
            visibility: "hidden",
        })
        .to(items, {
            display: "none",
            visibility: "hidden",
            scaleY: 0,
            duration: 0.3,
            // delay: 0.3,
            stagger: 0.2,
        }, "<0.2")
        .to(btnShow, {
            display: "flex",
            visibility: "visible",
            scaleY: 1,
            duration: 0.3,
        })
};

function openFilter(actvieFilterBtn) {
    let opened = false;
    let allOpenedFilterBtns = document.querySelectorAll(".section-filter__heading_open");
    if (actvieFilterBtn.classList.contains("section-filter__heading_open") || actvieFilterBtn.closest(".section-filter__heading_open")) {
        opened = true;
    };
    document.querySelectorAll('.section-filter').forEach(n => n.classList.remove('section-filter_active'));
    if (allOpenedFilterBtns.length > 0) {
        allOpenedFilterBtns.forEach(n => n.classList.remove('section-filter__heading_open'));
        document.querySelectorAll('.section-filter__body_open').forEach(n => n.classList.remove('section-filter__body_open'));
        
    }
    if (opened) {
        actvieFilterBtn.closest('.section-filter__heading').classList.remove('section-filter__heading_open');
        actvieFilterBtn.closest(".section-filter").classList.remove('section-filter_active');
        actvieFilterBtn.closest(".section-filter").querySelector(".section-filter__body").classList.remove('section-filter__body_open');
    } else {
        actvieFilterBtn.closest('.section-filter__heading').classList.add('section-filter__heading_open');
        actvieFilterBtn.closest(".section-filter").classList.add('section-filter_active');
        actvieFilterBtn.closest(".section-filter").querySelector(".section-filter__body").classList.add('section-filter__body_open');
    };
    
    function animateFilter(filterBody, reverse) {
        let filterBoxTL = gsap.timeline({ paused: true, reversed: true, });
        let filterAnim = filterBoxTL
            .fromTo(filterBody, {
                y: -40,
            }, {
                display: "flex",
                visibility: "visible",
                opacity: 1,
                y: 0,
            })
        if (filterBoxTL.reversed()) {
            filterAnim.play()
            disableScroll()
        } else {
            filterAnim.reverse()
            enableScroll()
        }
    };
};

function createFilterTags() {
    let sectionsName = ["category", "price", "discount", "color"]
    let tagsWrapper = document.createElement('div');
    for (let i = 0; i < sectionsName.length; i++) {
        let sectionName = `.section-filter_${sectionsName[i]}`
        let section = document.querySelector(sectionName);
        if (sectionsName[i] == "price") {
            let filterItems = section.querySelectorAll(".filter-price__label");
            for (let j = 0; j < filterItems.length; j++) {
                let tagText = filterItems[j].querySelector('.filter-price__text').textContent;
                let tagValue = filterItems[j].querySelector('.filter-price__set').value;
                tagText = tagText[0].toUpperCase() + tagText.slice(1) + " " + tagValue;
                let tagElement = `
                    <div class="tags-filter__tag tags-filter__tag_${sectionsName[i]} tag">
                        <span class="tag__text">${tagText}</span>
                        <svg class="tag__close">
                            <use xlink:href="img/sprite.svg#close"></use>
                        </svg>
                    </div>
                `;
                tagsWrapper.append(tagElement);
            }
        } else {
            let filterItems = section.querySelectorAll(".checkbox-filter");
            for (let j = 0; j < filterItems.length; j++) {
                if (filterItems[j].querySelector('.checkbox-filter__input').checked) {
                    let tagText = filterItems[j].querySelector('.checkbox-filter__text').textContent;
                    if (tagText == "Не важно") {tagText = "Без скидки"};
                    let tagElement = `
                        <div class="tags-filter__tag tags-filter__tag_${sectionsName[i]} tag">
                            <span class="tag__text">${tagText}</span>
                            <svg class="tag__close">
                                <use xlink:href="img/sprite.svg#close"></use>
                            </svg>
                        </div>
                    `;
                    tagsWrapper.append(tagElement);
                }
            }
        };
    };
    tagsContainer = document.querySelector(".catalog-page__tags");
    tagsContainer.textContent = ""; 
    // tagsContainer.insertAdjacentHTML("afterbegin", tagsWrapper.innerHTML)
    tagsContainer.insertAdjacentHTML("afterbegin", tagsWrapper.innerText)

    // tagsContainer.append(tagsWrapper.content)

};

if (document.querySelector(".filter")) {
    createFilterTags();
    AddListnerToTags();
    
    let allFilterItems = document.querySelectorAll('.checkbox-filter__input, .filter-price__set');
    allFilterItems.forEach((el) => {
        el.addEventListener("change", function() {
            createFilterTags();
            AddListnerToTags();
        })
    })
}



function AddListnerToTags() {
    let allTags = document.querySelectorAll(".tags-filter__tag")
    allTags.forEach((el) => {
        el.addEventListener("click", () => {
            targetFilterText = el.querySelector(".tag__text").textContent
            filterCategory = el.classList;
            for (let index = 0; index < filterCategory.length; index++) {
                const element = filterCategory[index];
                if (element.startsWith("tags-filter__tag_")) {
                    let ident = element.split("_")[3];
                    let filterSection = document.querySelector(`.section-filter_${ident}`)
                    if (ident == "price") {
                        let filterItems = filterSection.querySelectorAll(".filter-price__text");
                        let targetKey = targetFilterText.split(" ")[0];
                        targetKey = targetKey[0].toLowerCase() + targetKey.slice(1)
                        for (let index = 0; index < filterItems.length; index++) {
                            const element = filterItems[index];
                            if (element.textContent == targetKey) {
                                console.log(element.nextElementSibling);
                                let itemValue = "0";
                                console.log(targetKey);
                                if (targetKey == "до") {
                                    itemValue = "200000";
                                };
                                element.nextElementSibling.value = itemValue;
                                el.remove();
                                break;
                            }
                        }
                    } else {
                        let filterItems = filterSection.querySelectorAll(".checkbox-filter");
                        for (let jindex = 0; jindex < filterItems.length; jindex++) {
                            if (filterItems[jindex].querySelector('.checkbox-filter__text').textContent == targetFilterText) {
                                filterItems[jindex].querySelector('.checkbox-filter__input').checked = false;
                                el.remove();
                                break;
                            }
                        }
                    };
                }
                
            }
        })
    })
};