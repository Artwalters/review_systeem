/**
 * Social Wave - Client Loader
 * Laadt dynamisch de juiste client configuratie en past de pagina aan
 * Gebruikt clients.json met standaard waardes voor eenvoudige configuratie
 */

// Globale variabele voor huidige client configuratie
let currentClientConfig = null;

// Standaard waardes (gebaseerd op Akropolis thema)
const DEFAULTS = {
    colors: {
        primary: '#2d3748',
        primaryDark: '#1a202c',
        accent: '#ffc107',
        background: '#000000',
        text: '#333333'
    },
    texts: {
        pageTitle: '{name} - Uw Ervaring',
        heading: 'Hoe was uw ervaring bij {name}?',
        ratingPrompt: 'Klik op de sterren om uw beoordeling te geven',
        feedbackHeading: 'Vertel ons wat we kunnen verbeteren',
        thankYouHeading: 'Bedankt voor uw feedback!',
        thankYouMessage: 'Wij waarderen uw mening en zullen deze gebruiken om onze service te verbeteren.',
        googlePrompt: 'Zou u ook een moment willen nemen om een review op Google achter te laten? Dit helpt ons enorm!',
        googleButtonText: 'Google Review Schrijven',
        footerTitle: 'Blijf verbonden'
    },
    email: {
        recipientEmail: 'socialwavereviews@gmail.com',
        recipientName: 'Social Wave Reviews'
    }
};

/**
 * Initialiseer de client configuratie en pas de pagina aan
 */
async function initializeClient() {
    try {
        // Detecteer welke client dit is
        const clientId = detectClientId();

        if (!clientId) {
            console.error('Kon geen client ID detecteren');
            return false;
        }

        console.log(`Client gedetecteerd: ${clientId}`);

        // Haal client configuratie op uit JSON
        const config = await loadClientConfig(clientId);

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
 * Laad client configuratie uit clients.json en vul aan met defaults
 */
async function loadClientConfig(clientId) {
    try {
        // Fetch clients.json
        const response = await fetch('config/clients.json');
        if (!response.ok) {
            throw new Error('Kon clients.json niet laden');
        }

        const data = await response.json();
        const clientData = data.clients[clientId];

        if (!clientData) {
            console.error(`Client '${clientId}' niet gevonden in clients.json`);
            return null;
        }

        // Bouw volledige configuratie met defaults
        const config = {
            name: clientData.name,
            displayName: clientData.name,
            logo: clientData.logo,
            favicon: clientData.logo, // Gebruik zelfde logo als fallback

            // Google Reviews
            googlePlaceId: clientData.googlePlaceId,
            googleReviewUrl: `https://search.google.com/local/writereview?placeid=${clientData.googlePlaceId}`,

            // Social media
            social: clientData.social || {},

            // Kleuren (gebruik defaults)
            colors: { ...DEFAULTS.colors },

            // Teksten met naam ingevuld
            texts: {
                pageTitle: DEFAULTS.texts.pageTitle.replace('{name}', clientData.name),
                heading: DEFAULTS.texts.heading.replace('{name}', clientData.name),
                ratingPrompt: DEFAULTS.texts.ratingPrompt,
                feedbackHeading: DEFAULTS.texts.feedbackHeading,
                thankYouHeading: DEFAULTS.texts.thankYouHeading,
                thankYouMessage: DEFAULTS.texts.thankYouMessage,
                googlePrompt: DEFAULTS.texts.googlePrompt,
                googleButtonText: DEFAULTS.texts.googleButtonText,
                footerTitle: DEFAULTS.texts.footerTitle
            },

            // Email configuratie
            email: {
                tag: clientData.emailTag,
                recipientEmail: clientData.recipientEmail || DEFAULTS.email.recipientEmail,
                recipientName: clientData.name
            }
        };

        return config;

    } catch (error) {
        console.error('Fout bij laden client configuratie:', error);
        return null;
    }
}

/**
 * Detecteer client ID uit huidige pagina URL of bestandsnaam
 */
function detectClientId() {
    // Probeer eerst URL parameter (?client=akropolis)
    const urlParams = new URLSearchParams(window.location.search);
    const clientParam = urlParams.get('client');
    if (clientParam) {
        return clientParam.toLowerCase();
    }

    // Probeer bestandsnaam (akropolis.html)
    const pathname = window.location.pathname;
    const filename = pathname.split('/').pop();
    const clientFromFilename = filename.replace('.html', '').toLowerCase();

    // Geef client ID terug (zelfs als niet gevalideerd - validatie gebeurt bij laden)
    return clientFromFilename;
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
