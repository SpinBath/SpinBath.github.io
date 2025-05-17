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



setTimeout(function () {
    let loadbar = document.getElementById("load-bar");
    loadbar.classList.add("loading");
}, 200);



setTimeout(function () {

    let popup = document.getElementById("popup");
    popup.classList.add("fade-out");

    setTimeout(() => {
        popup.style.display = "none";
    }, 1500);

}, 1500);
