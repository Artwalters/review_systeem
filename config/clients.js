/**
 * Social Wave - Multi-Client Review System
 * Client Configuration File
 *
 * Voeg hier nieuwe klanten toe voor het review systeem
 */

const CLIENTS = {
    'akropolis': {
        // Basis informatie
        name: 'Akropolis Heerlen',
        displayName: 'Akropolis Heerlen',

        // Branding
        logo: 'logo/logo_header.webp',
        favicon: 'logo/logo_half.webp',

        // Kleuren (CSS variabelen)
        colors: {
            primary: '#2d3748',        // Donkergrijs voor buttons en accenten
            primaryDark: '#1a202c',    // Donkerder grijs voor hover states
            accent: '#ffc107',         // Goud voor sterren
            background: '#000000',     // Zwarte achtergrond
            text: '#333333'            // Tekst kleur
        },

        // Google Reviews
        googlePlaceId: 'ChIJ97cJ27q9wEcRsRAe5JZUD_k',
        googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ97cJ27q9wEcRsRAe5JZUD_k',

        // Social Media
        social: {
            website: 'https://akropolis-heerlen.nl/',
            instagram: 'https://www.instagram.com/akropolis.restaurants?igsh=OGxpdjNxc2Noamxk',
            facebook: 'https://www.facebook.com/akropolisgeleen/'
        },

        // Teksten (aanpasbaar per klant)
        texts: {
            pageTitle: 'Akropolis Heerlen - Uw Ervaring',
            heading: 'Hoe was uw ervaring bij Akropolis Heerlen?',
            ratingPrompt: 'Klik op de sterren om uw beoordeling te geven',
            feedbackHeading: 'Vertel ons wat we kunnen verbeteren',
            thankYouHeading: 'Bedankt voor uw feedback!',
            thankYouMessage: 'Wij waarderen uw mening en zullen deze gebruiken om onze service te verbeteren.',
            googlePrompt: 'Zou u ook een moment willen nemen om een review op Google achter te laten? Dit helpt ons enorm!',
            googleButtonText: 'Google Review Schrijven',
            footerTitle: 'Blijf verbonden'
        },

        // Email configuratie
        email: {
            tag: 'AKROPOLIS',           // Voor email subject: [AKROPOLIS]
            recipientEmail: 'Akropolisreviews@gmail.com',
            recipientName: 'Akropolis Reviews'
        }
    },

    // Voorbeeld voor tweede klant (uncommment en pas aan voor gebruik)
    /*
    'restaurantnaam': {
        name: 'Restaurant Naam',
        displayName: 'Restaurant Naam Locatie',
        logo: 'logos/restaurant.png',
        favicon: 'logos/restaurant-icon.png',
        colors: {
            primary: '#e63946',
            primaryDark: '#d62828',
            accent: '#f77f00',
            background: '#ffffff',
            text: '#2b2d42'
        },
        googlePlaceId: 'JOUW_PLACE_ID',
        googleReviewUrl: 'https://search.google.com/local/writereview?placeid=JOUW_PLACE_ID',
        social: {
            website: 'https://restaurant.nl',
            instagram: 'https://instagram.com/restaurant',
            facebook: 'https://facebook.com/restaurant'
        },
        texts: {
            pageTitle: 'Restaurant Naam - Uw Mening Telt',
            heading: 'Hoe was uw bezoek bij Restaurant Naam?',
            ratingPrompt: 'Deel uw ervaring met ons',
            feedbackHeading: 'Waar kunnen we beter in worden?',
            thankYouHeading: 'Hartelijk dank!',
            thankYouMessage: 'Uw feedback helpt ons om elke dag beter te worden.',
            googlePrompt: 'Help anderen door ook een Google review achter te laten!',
            googleButtonText: 'Review op Google',
            footerTitle: 'Volg ons'
        },
        email: {
            tag: 'RESTAURANT',
            recipientEmail: 'reviews@restaurant.nl',
            recipientName: 'Restaurant Naam'
        }
    }
    */
};

/**
 * Haal client configuratie op basis van identifier
 * @param {string} clientId - Client identifier (bijv. 'akropolis')
 * @returns {object|null} Client configuratie of null als niet gevonden
 */
function getClientConfig(clientId) {
    if (!clientId) {
        console.error('Geen client ID opgegeven');
        return null;
    }

    const config = CLIENTS[clientId.toLowerCase()];
    if (!config) {
        console.error(`Client '${clientId}' niet gevonden in configuratie`);
        return null;
    }

    return config;
}

/**
 * Detecteer client ID uit huidige pagina URL of bestandsnaam
 * @returns {string|null} Client ID of null
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

    // Check of het een bekende client is
    if (CLIENTS[clientFromFilename]) {
        return clientFromFilename;
    }

    // Fallback naar eerste client (voor development)
    console.warn('Geen client gedetecteerd, gebruik eerste client als fallback');
    return Object.keys(CLIENTS)[0];
}

/**
 * Lijst van alle beschikbare clients
 * @returns {array} Array van client IDs
 */
function listClients() {
    return Object.keys(CLIENTS);
}

// Export voor gebruik in andere bestanden
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLIENTS, getClientConfig, detectClientId, listClients };
}
