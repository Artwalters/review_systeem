/**
 * Social Wave - Client Loader
 * Laadt dynamisch de juiste client configuratie en past de pagina aan
 */

// Globale variabele voor huidige client configuratie
let currentClientConfig = null;

/**
 * Initialiseer de client configuratie en pas de pagina aan
 */
function initializeClient() {
    try {
        // Detecteer welke client dit is
        const clientId = detectClientId();

        if (!clientId) {
            console.error('Kon geen client ID detecteren');
            return false;
        }

        console.log(`Client gedetecteerd: ${clientId}`);

        // Haal client configuratie op
        const config = getClientConfig(clientId);

        if (!config) {
            console.error(`Configuratie voor client '${clientId}' niet gevonden`);
            return false;
        }

        // Sla config op in globale variabele
        currentClientConfig = config;

        // Pas pagina aan met client specifieke info
        applyClientConfig(config);

        // Pas kleuren aan
        applyClientColors(config.colors);

        console.log('Client configuratie succesvol geladen:', config.name);
        return true;

    } catch (error) {
        console.error('Fout bij initialiseren client:', error);
        return false;
    }
}

/**
 * Pas alle tekst en URL elementen aan op basis van client config
 */
function applyClientConfig(config) {
    // Page title en favicon
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) pageTitle.textContent = config.texts.pageTitle;

    const favicon = document.getElementById('favicon');
    if (favicon) favicon.href = config.favicon;

    // Logo
    const logo = document.getElementById('logo');
    if (logo) {
        logo.src = config.logo;
        logo.alt = config.displayName;
    }

    // Tekstuele elementen
    const mainHeading = document.getElementById('mainHeading');
    if (mainHeading) mainHeading.textContent = config.texts.heading;

    const ratingPrompt = document.getElementById('ratingPrompt');
    if (ratingPrompt) ratingPrompt.textContent = config.texts.ratingPrompt;

    const feedbackHeading = document.getElementById('feedbackHeading');
    if (feedbackHeading) feedbackHeading.textContent = config.texts.feedbackHeading;

    const thankYouHeading = document.getElementById('thankYouHeading');
    if (thankYouHeading) thankYouHeading.textContent = config.texts.thankYouHeading;

    const thankYouMessage = document.getElementById('thankYouMessage');
    if (thankYouMessage) thankYouMessage.textContent = config.texts.thankYouMessage;

    const googlePrompt = document.getElementById('googlePrompt');
    if (googlePrompt) googlePrompt.textContent = config.texts.googlePrompt;

    const googleButtonText = document.getElementById('googleButtonText');
    if (googleButtonText) googleButtonText.textContent = config.texts.googleButtonText;

    const footerTitle = document.getElementById('footerTitle');
    if (footerTitle) footerTitle.textContent = config.texts.footerTitle;

    // URLs
    const googleReviewLink = document.getElementById('googleReviewLink');
    if (googleReviewLink) googleReviewLink.href = config.googleReviewUrl;

    const websiteLink = document.getElementById('websiteLink');
    if (websiteLink && config.social.website) websiteLink.href = config.social.website;

    const instagramLink = document.getElementById('instagramLink');
    if (instagramLink && config.social.instagram) instagramLink.href = config.social.instagram;

    const facebookLink = document.getElementById('facebookLink');
    if (facebookLink && config.social.facebook) facebookLink.href = config.social.facebook;
}

/**
 * Pas kleuren aan met CSS variabelen
 */
function applyClientColors(colors) {
    const root = document.documentElement;

    if (colors.primary) root.style.setProperty('--color-primary', colors.primary);
    if (colors.primaryDark) root.style.setProperty('--color-primary-dark', colors.primaryDark);
    if (colors.accent) root.style.setProperty('--color-accent', colors.accent);
    if (colors.background) root.style.setProperty('--color-background', colors.background);
    if (colors.text) root.style.setProperty('--color-text', colors.text);
}

/**
 * Haal de huidige client configuratie op
 * @returns {object|null} Client configuratie
 */
function getCurrentClientConfig() {
    return currentClientConfig;
}

// Initialiseer zodra de DOM geladen is
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClient);
} else {
    // DOM is al geladen
    initializeClient();
}
