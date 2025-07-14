/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Autoplay, EffectFade } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Перечень слайдеров
// Проверяем, есть ли слайдер на стронице
document.querySelectorAll('.block').forEach(n => {
	const blockSliders = new Swiper(n.querySelector('.block__slider'), {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 4,
		spaceBetween: 20,
		speed: 800,
		loop: true,
		lazy: true,
		preloadImage: true,

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: n.querySelector('.block-arrow-prev'),
			nextEl: n.querySelector('.block-arrow-next'),
		},

		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 15,
			},
			500: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			767.98: {
				slidesPerView: 2.5,
			},
			991.98: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	});
});

if (document.querySelector('.main-home__slider')) { // Указываем скласс нужного слайдера
	// Создаем слайдер
	new Swiper('.main-home__slider', { // Указываем скласс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation, Autoplay, EffectFade],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 20,
		autoHeight: false,
		speed: 800,
		lazy: true,
		loop: true,
		effect: "fade",

		fadeEffect: {
			crossFade: true
		},

		// Эффекты
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.main-home__arrow-prev',
			nextEl: '.main-home__arrow-next',
		},
	});
}