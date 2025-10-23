// EmailJS Configuratie
// Volg deze stappen om EmailJS in te stellen:

// 1. Ga naar https://www.emailjs.com/ en maak een gratis account
// 2. Voeg een email service toe (Gmail, Outlook, etc.)
// 3. Maak een email template met de volgende variabelen:
//    - {{rating}} - Aantal sterren
//    - {{name}} - Naam van de klant
//    - {{email}} - Email van de klant
//    - {{feedback}} - Feedback tekst
// 4. Noteer je Service ID, Template ID en Public Key
// 5. Vervang de waarden hieronder

const EMAILJS_CONFIG = {
    serviceID: 'YOUR_SERVICE_ID',      // Vervang met je EmailJS Service ID
    templateID: 'YOUR_TEMPLATE_ID',    // Vervang met je EmailJS Template ID
    publicKey: 'YOUR_PUBLIC_KEY'       // Vervang met je EmailJS Public Key
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

    // Template parameters
    const templateParams = {
        rating: data.rating,
        name: data.name,
        email: data.email,
        feedback: data.feedback,
        date: new Date().toLocaleString('nl-NL')
    };

    // Verstuur email
    emailjs.send(
        EMAILJS_CONFIG.serviceID,
        EMAILJS_CONFIG.templateID,
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
