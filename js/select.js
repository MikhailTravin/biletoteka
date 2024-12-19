(() => {
    "use strict";
    function select_select() {
        const optionMenus = document.querySelectorAll(".select__menu");
        optionMenus.forEach((optionMenu => {
            const selectBtn = optionMenu.querySelector(".select__btn");
            const options = optionMenu.querySelectorAll(".select__option");
            const sBtntext = optionMenu.querySelector(".select__btn input");
            if (optionMenu) {
                selectBtn.addEventListener("click", (function (e) {
                    let elem_active = optionMenu.classList.contains("_active");
                    optionMenus.forEach((opt => {
                        opt.classList.remove("_active");
                    }));
                    optionMenu.classList.toggle("_active", !elem_active);
                }));
                options.forEach((option => {
                    option.addEventListener("click", (function (e) {
                        if (null != e.target.classList.contains(".select__option-text")) sBtntext.value = e.target.innerText;
                        options.forEach((el => {
                            el.classList.remove("_active");
                        }));
                        option.classList.add("_active");
                        optionMenu.classList.remove("_active");
                    }));
                }));
                window.addEventListener("click", (e => {
                    const target = e.target;
                    if (!target.closest(".select__options") && !target.closest(".select__menu")) optionMenu.classList.remove("_active");
                }));
            }
        }));
    }
    select_select();
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function (e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
})();