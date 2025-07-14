(() => {
    "use strict";
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function (e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const searchButton = document.querySelector(".search-button");
    if (searchButton) {
        const searchClose = document.querySelector(".search-close");
        const searchButtonMob = document.querySelector(".search-button-mob");
        searchButton.addEventListener("click", (function (e) {
            document.documentElement.classList.add("_search-open");
        }));
        searchButtonMob.addEventListener("click", (function (e) {
            document.documentElement.classList.add("_search-open");
        }));
        searchClose.addEventListener("click", (function (e) {
            document.documentElement.classList.remove("_search-open");
        }));
        if (document.body.classList.contains("menu-open")) document.documentElement.classList.remove("_search-open");
        window.addEventListener("click", (e => {
            const target = e.target;
            if (!target.closest(".search-button-mob") && !target.closest(".search-top-header__simplebar") && !target.closest(".form__icon") && !target.closest(".form__input input")) document.documentElement.classList.remove("_search-open");
        }));
    }
    const calendar = document.querySelector(".calendar__main");
    if (calendar) {
        const input = document.querySelector("#date");
        const calHeaderTitle = document.querySelector(".calendar__header span");
        const calDays = document.querySelector(".calendar__days");
        const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
        const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        let oneDay = 60 * 60 * 24 * 1e3;
        let todayTimestamp = Date.now() - Date.now() % oneDay + 1e3 * (new Date).getTimezoneOffset() * 60;
        let selectedDay = todayTimestamp;
        const getNumberOfDays = (year, month) => 40 - new Date(year, month, 40).getDate();
        const getDayDetails = args => {
            let date = args.index - args.firstDay;
            let day = args.index % 7;
            let prevMonth = args.month - 1;
            let prevYear = args.year;
            if (prevMonth < 0) {
                prevMonth = 11;
                prevYear--;
            }
            let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
            let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
            let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
            let timestamp = new Date(args.year, args.month, _date).getTime();
            return {
                date: _date,
                day,
                month,
                timestamp,
                dayString: days[day]
            };
        };
        const getMonthDetails = (year, month) => {
            let firstDay = new Date(year, month).getDay();
            let numberOfDays = getNumberOfDays(year, month);
            let monthArray = [];
            let rows = 5;
            let currentDay = null;
            let index = 0;
            let cols = 7;
            for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
                currentDay = getDayDetails({
                    index,
                    numberOfDays,
                    firstDay,
                    year,
                    month
                });
                monthArray.push(currentDay);
                index++;
            }
            return monthArray;
        };
        let date = new Date;
        let year = date.getFullYear();
        let month = date.getMonth();
        let monthDetails = getMonthDetails(year, month);
        const isCurrentDay = (day, cell) => {
            if (day.timestamp === todayTimestamp) {
                cell.classList.add("isCurrent");
                cell.classList.add("active");
            }
        };
        const isSelectedDay = (day, cell) => {
            if (day.timestamp === selectedDay) cell.classList.toggle("isSelected");
        };
        const getMonthStr = month => months[Math.max(Math.min(11, month), 0)] || "Month";
        const setHeaderNav = offset => {
            month += offset;
            if (-1 === month) {
                month = 11;
                year--;
            } else if (12 === month) {
                month = 0;
                year++;
            }
            monthDetails = getMonthDetails(year, month);
            return {
                year,
                month,
                monthDetails
            };
        };
        const setHeader = (year, month) => {
            calHeaderTitle.innerHTML = getMonthStr(month) + " " + year;
        };
        setHeader(year, month);
        const getDateStringFromTimestamp = timestamp => {
            let dateObject = new Date(timestamp);
            let month = dateObject.getMonth();
            let date = dateObject.getDate();
            return `${getMonthStr(month)} ${date}, ${dateObject.getFullYear()}`;
        };
        const setDateToInput = timestamp => {
            getDateStringFromTimestamp(timestamp);
        };
        setDateToInput(todayTimestamp);
        for (let i = 0; i < days.length; i++) {
            let div = document.createElement("div"), span = document.createElement("span");
            div.classList.add("cell_wrapper");
            div.classList.add("cal_days");
            span.classList.add("cell_item");
            span.innerText = days[i].slice(0, 2);
            div.appendChild(span);
            calDays.appendChild(div);
        }
        const setCalBody = monthDetails => {
            for (let i = 0; i < monthDetails.length; i++) {
                let div = document.createElement("div"), span = document.createElement("span");
                div.classList.add("cell_wrapper");
                div.classList.add("cal_date");
                0 === monthDetails[i].month && div.classList.add("current");
                0 === monthDetails[i].month && isCurrentDay(monthDetails[i], div);
                span.classList.add("cell_item");
                span.innerText = monthDetails[i].date;
                div.appendChild(span);
                calendar.appendChild(div);
            }
        };
        setCalBody(monthDetails);
        const updateCalendar = btn => {
            let newCal, offset;
            if (btn.classList.contains("calendar__btn-prev")) offset = -1; else if (btn.classList.contains("calendar__btn-next")) offset = 1;
            newCal = setHeaderNav(offset);
            setHeader(newCal.year, newCal.month);
            calendar.innerHTML = "";
            setCalBody(newCal.monthDetails);
        };
        const selectOnClick = () => {
            document.querySelectorAll(".cell_wrapper").forEach((cell => {
                cell.classList.contains("isSelected") && cell.classList.remove("active");
                if (cell.classList.contains("isCurrent") && !cell.classList.contains("active")) cell.querySelector("span").classList.add("inactive_indicator");
            }));
        };
        const updateInput = () => {
            let currentDay = document.querySelector(".isCurrent");
            document.querySelectorAll(".cell_wrapper").forEach((cell => {
                if (cell.classList.contains("current")) cell.addEventListener("click", (e => {
                    let cell_date = e.target.textContent;
                    null !== currentDay && currentDay.classList.remove("active");
                    for (let i = 0; i < monthDetails.length; i++) if (0 === monthDetails[i].month) if (monthDetails[i].date.toString() === cell_date) {
                        selectedDay = monthDetails[i].timestamp;
                        setDateToInput(selectedDay);
                        selectOnClick();
                        isSelectedDay(monthDetails[i], cell);
                        cell.querySelector("span").classList.contains("inactive_indicator") && cell.querySelector("span").classList.remove("inactive_indicator");
                    }
                }));
            }));
        };
        updateInput();
        document.querySelectorAll(".calendar-btn").forEach((btn => {
            btn.addEventListener("click", (() => {
                updateCalendar(btn);
                updateInput();
            }));
        }));
        input.addEventListener("click", (() => {
            document.querySelector(".calendar__content").classList.toggle("_hidden");
            document.querySelector(".calendar__input").classList.toggle("_active");
            document.querySelector("#date").classList.toggle("_focus");
        }));
        window.addEventListener("click", (e => {
            const target = e.target;
            if (!target.closest("#date") && !target.closest(".calendar__input") && !target.closest(".calendar__content")) {
                document.querySelector(".calendar__content").classList.add("_hidden");
                document.querySelector(".calendar__input").classList.remove("_active");
                document.querySelector("#date").classList.add("_focus");
            }
        }));
    }
    const filter = document.querySelector(".filter");
    if (filter) {
        let blogItems = document.querySelectorAll(".poster__column");
        let blogFilters = document.querySelectorAll(".navigation-filter__title");
        if (blogFilters) {
            blogFilters.forEach((blogFilter => {
                blogFilter.addEventListener("click", (function (e) {
                    e.preventDefault();
                    const blogFilterValue = blogFilter.dataset.filter;
                    const blogFilterActive = document.querySelector(".navigation-filter__title._active");
                    blogFilterActive.classList.remove("_active");
                    blogFilter.classList.add("_active");
                    showBlogItems(blogFilterValue);
                }));
            }));
            function showBlogItems(filter) {
                blogItems.forEach((blogItem => {
                    if ("all" === filter || !filter) blogItem.classList.remove("_hide"); else {
                        blogItem.classList.add("_hide");
                        if (blogItem.classList.contains("poster__column_" + filter)) blogItem.classList.remove("_hide");
                    }
                }));
            }
        }
    }
    function scrollBlock() {
        let scrollBlocks = document.querySelectorAll(".scroll");
        if (scrollBlocks) {
            let speed = 2;
            let left = 0;
            let top = 0;
            let drag = false;
            let coorX = 0;
            let coorY = 0;
            scrollBlocks.forEach((scrollBlock => {
                scrollBlock.addEventListener("mousedown", (function (e) {
                    drag = true;
                    coorX = e.pageX;
                    coorY = e.pageY;
                }));
                document.addEventListener("mouseup", (function () {
                    drag = false;
                    left = scrollBlock.scrollLeft;
                    top = scrollBlock.scrollTop;
                }));
                scrollBlock.addEventListener("mousemove", (function (e) {
                    if (drag) {
                        this.scrollLeft = left - (e.pageX - coorX) * speed;
                        this.scrollTop = top - (e.pageY - coorY) * speed;
                    }
                }));
            }));
        }
    }
    scrollBlock();
    const selectTicketsItem = document.querySelectorAll(".simplebar-time-table__column");
    if (selectTicketsItem) {
        const selectButton = document.querySelector(".bottom-time-table__button");
        const back = document.querySelector(".top-time-table__back");
        const selectContent = document.querySelector(".time-table__select-content");
        const selectTicket = document.querySelector(".time-table__select-ticket");
        const buttons = document.querySelectorAll(".selection-time-table__seats");
        const closes = document.querySelectorAll(".bottom-time-table__close");
        document.querySelectorAll(".title-name");
        document.querySelector(".time-table__top h5");
        selectTicketsItem.forEach((ticket => {
            ticket.addEventListener("click", (function (e) {
                let activeIcon = document.querySelector(".simplebar-time-table__column._active");
                if (activeIcon) activeIcon.classList.remove("_active");
                ticket.classList.toggle("_active");
                selectContent.classList.add("hide");
                selectTicket.classList.add("_active");
                back.classList.add("_active");
            }));
            back.addEventListener("click", (function (e) {
                selectContent.classList.remove("hide");
                selectTicket.classList.remove("_active");
                back.classList.remove("_active");
            }));
            buttons.forEach((button => {
                const id = button.dataset.id;
                const contentSelector = `div[data-id='${id}'].bottom-time-table__column`;
                const contentBlock = document.querySelector(contentSelector);
                button.addEventListener("click", (function (e) {
                    contentBlock.classList.toggle("_active");
                    button.classList.toggle("selected");
                    if (document.querySelector(".selection-time-table__seats.selected")) {
                        document.documentElement.classList.add("selected-seats");
                        selectButton.classList.remove("disabled");
                    } else {
                        document.documentElement.classList.remove("selected-seats");
                        selectButton.classList.add("disabled");
                    }
                }));
                closes.forEach((close => {
                    const contentSelectorClose = `div[data-id='${id}'].bottom-time-table__column .bottom-time-table__close`;
                    const contentBlockClose = document.querySelector(contentSelectorClose);
                    contentBlockClose.addEventListener("click", (function (e) {
                        contentBlock.classList.remove("_active");
                        button.classList.remove("selected");
                        document.documentElement.classList.toggle("selected-seats", document.querySelector(".bottom-time-table__column._active"));
                    }));
                }));
            }));
        }));
    }
})();