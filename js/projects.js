let translations = {};
let currentLang = 'es';

async function loadTranslations(lang) {
    try {
        const response = await fetch(`./locales/${lang}.json`);
        translations = await response.json();
        console.log(translations)
        currentLang = lang;
        updateTexts();
    } catch (error) {
        console.error('Error loading translation file:', error);
    }
}

function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let text = translations;

        keys.forEach(key => {
            text = text[key] || '';
        });

        element.innerHTML = text;
    });
}

document.getElementById('select-lang').addEventListener('change', (event) => {
    loadTranslations(event.target.value);
});

loadTranslations(currentLang);



function changeTheme(theme) {

    if (theme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
}


let currentSlide = 0;
const sliders = document.querySelectorAll('input[type="radio"][name="slider"]');
const totalSlides = sliders.length;
const intervalTime = 4000;
let sliderInterval;

function changeSlide() {
    currentSlide++;
    if (currentSlide > totalSlides) currentSlide = 1;
    document.getElementById(`slide${currentSlide}`).checked = true;
}

function startSlider() {
    if (!sliderInterval) {
        sliderInterval = setInterval(changeSlide, intervalTime);
    }
}

function stopSlider() {
    clearInterval(sliderInterval);
    sliderInterval = null;
}

// Iniciar al cargar
changeSlide();
startSlider();

const galleryContainer = document.getElementById('gallery-container');
const gallery = document.getElementById('gallery');
const images = document.getElementsByClassName('wrapper-holder');
const closeBtn = document.getElementById('close-gallery');

images[0].addEventListener('click', (e) => {
    e.stopPropagation();
    galleryContainer.classList.add('active');
    stopSlider(); // detener autoplay al hacer zoom
});

gallery.addEventListener('click', e => e.stopPropagation());

document.addEventListener('click', () => {
    galleryContainer.classList.remove('active');
    startSlider(); // reanudar autoplay al cerrar
});

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    galleryContainer.classList.remove('active');
    startSlider(); // reanudar autoplay al cerrar
});


