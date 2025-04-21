let currentLang = 'tr';

async function loadLanguage(lang) {
    const response = await fetch(`locales/${lang}.json`);
    const translations = await response.json();
    document.getElementById("title").innerText = translations.title;
    document.getElementById("description").innerText = translations.description;
}

function changeLanguage(lang) {
    currentLang = lang;
    loadLanguage(lang);
}

loadLanguage(currentLang); // Sayfa yüklendiğinde varsayılan dili yükler.
