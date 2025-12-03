// EmailJS Configuratie
// Dynamisch email routing systeem met twee templates:
// - template_de4ed4x: Voor alle standaard clients → socialwavereviews@gmail.com
// - template_zgr691p: Speciaal voor Wieetsjaf → review@wieetsjaf.nl
//
// Template variabelen:
//    - {{rating}} - Aantal sterren
//    - {{name}} - Naam van de klant
//    - {{email}} - Email van de klant
//    - {{feedback}} - Feedback tekst
//    - {{client_tag}} - Client identificatie (bijv. WIEETSJAF, AKROPOLIS)
//    - {{client_name}} - Client naam
//    - {{business_name}} - Business naam
//    - {{date}} - Datum en tijd van de review

const EMAILJS_CONFIG = {
    serviceID: 'service_47s8oi9',      // EmailJS Service ID
    templateID: 'template_de4ed4x',    // EmailJS Template ID (standaard: socialwavereviews@gmail.com)
    templateID_wieetsjaf: 'template_zgr691p',  // Template voor Wieetsjaf (review@wieetsjaf.nl)
    publicKey: 'wF-4QAP4NvBd5rSFK'     // EmailJS Public Key
};

// Functie om email te versturen via EmailJS
function sendEmailViaEmailJS(data) {
    // Controleer of EmailJS is geladen
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is niet geladen. Voeg de EmailJS SDK toe aan je HTML.');
        return;
    }

    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.publicKey);

    // Haal client configuratie op
    const clientConfig = getCurrentClientConfig();

    // Template parameters
    const templateParams = {
        rating: data.rating,
        name: data.name,
        email: data.email,
        feedback: data.feedback,
        date: new Date().toLocaleString('nl-NL'),
        client_tag: clientConfig ? clientConfig.email.tag : 'UNKNOWN',
        client_name: clientConfig ? clientConfig.name : 'Onbekend',
        business_name: clientConfig ? clientConfig.name : 'Onbekend'
    };

    // Bepaal welke template te gebruiken op basis van client
    const isWieetsjaf = clientConfig && clientConfig.email &&
                        clientConfig.email.recipientEmail === 'review@wieetsjaf.nl';

    const templateToUse = isWieetsjaf ? EMAILJS_CONFIG.templateID_wieetsjaf : EMAILJS_CONFIG.templateID;

    // Verstuur email met de juiste template
    emailjs.send(
        EMAILJS_CONFIG.serviceID,
        templateToUse,
        templateParams
    )
    .then((response) => {
        console.log('Email succesvol verzonden!', response.status, response.text);
    })
    .catch((error) => {
        console.error('Fout bij verzenden email:', error);
    });
}

// Exporteer de configuratie (optioneel)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMAILJS_CONFIG, sendEmailViaEmailJS };
}
