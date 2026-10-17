let translations = {};
let currentLang = 'es';

function resolveTranslation(path, fallback = '') {
    const keys = path.split('.');
    let value = translations;

    for (const key of keys) {
        if (value === undefined || value === null) {
            return fallback;
        }
        value = value[key];
    }

    return value ?? fallback;
}

function updateStaticTexts() {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const value = resolveTranslation(element.dataset.i18n, '');
        if (value) {
            element.innerHTML = value;
        }
    });
}

function renderExperience() {
    const list = translations.experience?.items || [];
    const container = document.getElementById('experience-list');

    if (!container) {
        return;
    }

    container.innerHTML = list.map((item) => `
        <article class="child">
            <p class="experience-name">${item.name}</p>
            <p class="experience-company">${item.company}</p>
            <p class="experience-date">${item.date}</p>
            <p class="experience-info">${item.info}</p>
        </article>
    `).join('');
}

function renderProjects() {
    const list = translations.projects?.items || [];
    const container = document.getElementById('projects-list');

    if (!container) {
        return;
    }

    container.innerHTML = list.map((project) => `
        <article class="child">
            <a href="${project.href}" ${project.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                <p class="project-name">${project.name}</p>
            </a>
            ${project.badge ? `<p style="font-weight: bold">${project.badge}</p>` : ''}
            <p class="project-info">${project.info}</p>
            <p class="project-tech">${project.tech}</p>
        </article>
    `).join('');
}

function renderEducation() {
    const list = translations.education?.items || [];
    const container = document.getElementById('education-list');

    if (!container) {
        return;
    }

    container.innerHTML = list.map((item) => `
        <article class="child">
            <p class="education-title">${item.title}</p>
            <p class="education-date">${item.date}</p>
            <p class="education-center">${item.center}</p>
        </article>
    `).join('');
}

function renderContact() {
    const list = translations.contact?.items || [];
    const container = document.getElementById('contact-list');

    if (!container) {
        return;
    }

    container.innerHTML = list.map((item) => `
        <div class="child">
            <p class="contact-title">${item.label}</p>
            <p class="contact-info">
                <a href="${item.href}">
                    <img src="assets/images/externo.png" alt="${item.label}" />
                    ${item.value}
                </a>
            </p>
        </div>
    `).join('');
}

function renderSections() {
    renderExperience();
    renderProjects();
    renderEducation();
    renderContact();
}

async function loadTranslations(lang) {
    try {
        const response = await fetch(`./locales/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Error loading locale: ${response.status}`);
        }

        translations = await response.json();
        currentLang = lang;
        updateStaticTexts();
        renderSections();
    } catch (error) {
        console.error('Error loading translation file:', error);
    }
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
    let loadbar = document.getElementById('load-bar');
    if (loadbar) {
        loadbar.classList.add('loading');
    }
}, 200);

setTimeout(function () {
    let popup = document.getElementById('popup');
    if (popup) {
        popup.classList.add('fade-out');

        setTimeout(() => {
            popup.style.display = 'none';
        }, 1500);
    }
}, 1500);
