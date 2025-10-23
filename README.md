# Acropolis Heerlen - Review Pagina

Een slimme review pagina die positieve reviews naar Google stuurt en negatieve feedback privé opvangt.

## 📋 Hoe het werkt

1. **5 sterren** → Direct doorsturen naar Google Reviews
2. **1-4 sterren** → Toon feedback formulier en verstuur email naar bedrijf

## 🚀 Installatie & Configuratie

### Stap 1: Google Reviews URL ophalen

1. Zoek "Acropolis Heerlen" op Google Maps
2. Klik op "Review schrijven"
3. Kopieer de URL uit de adresbalk
4. Open `script.js` en vervang regel 3:
   ```javascript
   const GOOGLE_REVIEW_URL = 'JOUW_GOOGLE_REVIEW_URL_HIER';
   ```

**OF gebruik deze methode:**
1. Ga naar [Google Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Zoek naar "Acropolis Heerlen"
3. Kopieer de Place ID
4. Vervang in `script.js`:
   ```javascript
   const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=JOUW_PLACE_ID';
   ```

### Stap 2: Email configureren met EmailJS (Gratis)

#### A. Account aanmaken
1. Ga naar [EmailJS.com](https://www.emailjs.com/)
2. Klik op "Sign Up" en maak een gratis account

#### B. Email Service toevoegen
1. Ga naar "Email Services" in het dashboard
2. Klik "Add New Service"
3. Kies je email provider (Gmail, Outlook, etc.)
4. Volg de instructies om je email te verbinden
5. Noteer de **Service ID**

#### C. Email Template maken
1. Ga naar "Email Templates"
2. Klik "Create New Template"
3. Gebruik deze template:

**Template Name:** `acropolis_feedback`

**Subject:** `Nieuwe feedback - {{rating}} sterren`

**Content:**
```
Er is nieuwe feedback binnengekomen voor Acropolis Heerlen!

Rating: {{rating}} van de 5 sterren
Datum: {{date}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Klant informatie:
Naam: {{name}}
Email: {{email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Feedback:
{{feedback}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dit is een automatisch gegenereerd bericht van het feedback systeem.
```

4. Noteer de **Template ID**

#### D. Public Key ophalen
1. Ga naar "Account" → "General"
2. Kopieer de **Public Key**

#### E. Configuratie invullen
Open `emailjs-config.js` en vervang:
```javascript
const EMAILJS_CONFIG = {
    serviceID: 'JOUW_SERVICE_ID',      // Stap B
    templateID: 'JOUW_TEMPLATE_ID',    // Stap C
    publicKey: 'JOUW_PUBLIC_KEY'       // Stap D
};
```

### Stap 3: Logo toevoegen (Optioneel)

1. Plaats een foto van Acropolis in de map
2. Hernoem het naar `acropolis-logo.jpg`
3. De foto wordt automatisch getoond

Als je geen logo hebt, wordt alleen de tekst getoond.

### Stap 4: Testen

1. Open `index.html` in je browser
2. Test met 5 sterren (moet naar Google Reviews gaan)
3. Test met 3 sterren (moet feedback formulier tonen)
4. Controleer je email inbox voor de feedback

## 📁 Bestanden

- `index.html` - Hoofdpagina
- `style.css` - Styling
- `script.js` - Functionaliteit
- `emailjs-config.js` - Email configuratie
- `README.md` - Deze instructies

## 🎨 Aanpassingen

### Kleuren wijzigen
Open `style.css` en wijzig regel 9:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Tekst wijzigen
Open `index.html` en pas de teksten aan naar wens.

### Vragen toevoegen aan feedback formulier
Voeg extra velden toe in `index.html` tussen regel 31-48.

## 🌐 Online zetten

### Optie 1: GitHub Pages (Gratis)
1. Maak een GitHub account
2. Upload alle bestanden naar een repository
3. Ga naar Settings → Pages
4. Selecteer de branch en klik Save
5. Je krijgt een gratis URL

### Optie 2: Netlify (Gratis)
1. Ga naar [Netlify.com](https://www.netlify.com/)
2. Sleep de hele map naar Netlify
3. Krijg direct een gratis URL

### Optie 3: Eigen hosting
Upload alle bestanden naar je webserver via FTP.

## 📱 QR Code maken

1. Ga naar [QR Code Generator](https://www.qr-code-generator.com/)
2. Voer je website URL in
3. Download de QR code
4. Print en plaats bij de kassa of op tafels

## ⚠️ Belangrijk

- Test altijd eerst voordat je live gaat
- Controleer of emails aankomen
- Zorg dat de Google Reviews URL correct is
- EmailJS gratis versie: max 200 emails/maand

## 🆘 Hulp nodig?

### Email komt niet aan?
- Controleer de EmailJS configuratie
- Check de spam folder
- Controleer EmailJS dashboard voor errors

### Google Reviews werkt niet?
- Controleer of de URL correct is
- Test de URL handmatig in een browser

### Pagina laadt niet goed?
- Open Developer Tools (F12)
- Check de Console voor errors

## 📝 Licentie

Vrij te gebruiken voor Acropolis Heerlen.

---

**Gemaakt voor Acropolis Heerlen** 🏛️
