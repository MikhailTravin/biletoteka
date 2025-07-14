import { isMobile, FLS } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Подключение из node_modules
import tippy from 'tippy.js';

// Подключение cтилей из src/scss/libs
import "../../scss/libs/tippy.scss";
// Подключение cтилей из node_modules
//import 'tippy.js/dist/tippy.css';

// Запускаем и добавляем в объект модулей
flsModules.tippy = tippy('[data-tippy-content]', {
    content: '<div class= "selection-time-table__seats-tippy seats-tippy"><div class="seats-tippy__item"><p>1 ряд, место 13</p><div class="seats-tippy__price">3 100 ₽</div></div></div>',
    arrow: true,
    //trigger: 'click',
    allowHTML: true,
});