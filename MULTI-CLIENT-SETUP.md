# 📋 Multi-Client Review System Setup Guide

## Overzicht

Dit systeem stelt Social Wave in staat om review formulieren te beheren voor 20+ klanten, waarbij alle reviews naar één centrale email gaan maar wel herkenbaar zijn per klant.

---

## 🔧 EmailJS Template Updaten

### Stap 1: Update Email Subject

Ga naar je EmailJS template en update de **Subject** naar:

```
[{{client_tag}}] ⭐ {{rating}} sterren - Nieuwe Review
```

Dit zorgt ervoor dat elke email begint met een tag zoals `[AKROPOLIS]` of `[RESTAURANT]`.

### Stap 2: Update Email Content

Vervang de huidige email HTML met deze verbeterde versie:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f5f5f5;
      padding: 20px;
      line-height: 1.6;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.15);
    }
    .header {
      background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
      padding: 40px 30px;
      text-align: center;
      position: relative;
    }
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #2d3748 0%, #4a5568 50%, #2d3748 100%);
    }
    .client-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 15px;
    }
    .header h1 {
      color: #ffffff;
      font-size: 26px;
      font-weight: 600;
      margin: 0 0 10px 0;
    }
    .header p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
      margin: 0;
    }
    .rating-banner {
      background: #000000;
      padding: 30px;
      text-align: center;
    }
    .rating-stars {
      font-size: 60px;
      color: #ffc107;
      margin-bottom: 10px;
      letter-spacing: 5px;
    }
    .rating-text {
      color: #ffffff;
      font-size: 24px;
      font-weight: 600;
    }
    .content-section {
      padding: 40px 30px;
    }
    .info-card {
      background: #f9f9f9;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 20px;
      border-left: 4px solid #2d3748;
    }
    .info-row {
      display: flex;
      align-items: flex-start;
      margin-bottom: 12px;
    }
    .info-row:last-child {
      margin-bottom: 0;
    }
    .info-icon {
      font-size: 20px;
      margin-right: 12px;
      min-width: 24px;
    }
    .info-label {
      font-weight: 600;
      color: #555;
      margin-right: 8px;
      min-width: 80px;
    }
    .info-value {
      color: #333;
    }
    .feedback-card {
      background: linear-gradient(135deg, #fff9e6 0%, #fff5cc 100%);
      border-radius: 12px;
      padding: 25px;
      border: 2px solid #ffc107;
      margin-top: 20px;
    }
    .feedback-card h3 {
      color: #333;
      font-size: 18px;
      margin: 0 0 15px 0;
      display: flex;
      align-items: center;
    }
    .feedback-card h3::before {
      content: '💬';
      margin-right: 10px;
      font-size: 24px;
    }
    .feedback-text {
      color: #444;
      font-size: 15px;
      line-height: 1.8;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .divider {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #2d3748, transparent);
      margin: 30px auto;
    }
    .footer {
      background: #2d3748;
      padding: 30px;
      text-align: center;
    }
    .footer-logo {
      color: rgba(255, 255, 255, 0.3);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 15px;
    }
    .footer-text {
      color: rgba(255, 255, 255, 0.7);
      font-size: 13px;
      margin: 8px 0;
    }
    .footer-link {
      color: #ffffff;
      text-decoration: none;
      font-weight: 500;
    }
    .footer-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header met Client Badge -->
    <div class="header">
      <div class="client-badge">[{{client_tag}}]</div>
      <h1>📊 Nieuwe Review Ontvangen</h1>
      <p>{{client_name}}</p>
    </div>

    <!-- Rating Banner -->
    <div class="rating-banner">
      <div class="rating-stars">★★★★★</div>
      <div class="rating-text">{{rating}} van 5 sterren</div>
    </div>

    <!-- Content -->
    <div class="content-section">
      <!-- Business Info -->
      <div class="info-card">
        <div class="info-row">
          <div class="info-icon">🏢</div>
          <div>
            <span class="info-label">Bedrijf:</span>
            <span class="info-value">{{business_name}}</span>
          </div>
        </div>
        <div class="info-row">
          <div class="info-icon">📅</div>
          <div>
            <span class="info-label">Datum:</span>
            <span class="info-value">{{date}}</span>
          </div>
        </div>
      </div>

      <!-- Customer Info -->
      <div class="info-card">
        <div class="info-row">
          <div class="info-icon">👤</div>
          <div>
            <span class="info-label">Naam:</span>
            <span class="info-value">{{name}}</span>
          </div>
        </div>
        <div class="info-row">
          <div class="info-icon">📧</div>
          <div>
            <span class="info-label">Email:</span>
            <span class="info-value">{{email}}</span>
          </div>
        </div>
      </div>

      <!-- Feedback -->
      <div class="feedback-card">
        <h3>Feedback van de klant</h3>
        <div class="feedback-text">{{feedback}}</div>
      </div>

      <div class="divider"></div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-logo">Powered by Social Wave</div>
      <p class="footer-text">
        Dit bericht is verzonden via het<br>
        Social Wave Review Systeem
      </p>
      <p class="footer-text" style="font-size: 11px; margin-top: 15px;">
        © 2024 Social Wave • Alle rechten voorbehouden
      </p>
    </div>
  </div>
</body>
</html>
```

### Belangrijke Template Variabelen:
- `{{client_tag}}` - Client tag (bijv. "AKROPOLIS")
- `{{client_name}}` - Display naam (bijv. "Akropolis Heerlen")
- `{{business_name}}` - Bedrijfsnaam (bijv. "Akropolis Heerlen")
- `{{rating}}` - Aantal sterren (1-5)
- `{{name}}` - Naam klant
- `{{email}}` - Email klant
- `{{feedback}}` - Feedback tekst
- `{{date}}` - Datum/tijd

---

## 📮 Gmail Filters Instellen

### Waarom Gmail Filters?

Gmail filters zorgen automatisch voor:
- ✅ Labels per klant (bijv. "Reviews/Akropolis")
- ✅ Kleur-coding voor snelle herkenning
- ✅ Automatische organisatie van inbox
- ✅ Snelle zoekfunctionaliteit

### Filter Setup - Stap voor Stap

#### Optie A: Per Client Filter (Aanbevolen)

1. **Open Gmail** en ga naar **Settings** (⚙️) → **See all settings**

2. **Ga naar "Filters and Blocked Addresses"**

3. **Klik op "Create a new filter"**

4. **Voor Akropolis:**
   - In "Subject" veld: `[AKROPOLIS]`
   - Klik **"Create filter"**

5. **Selecteer acties:**
   - ☑️ **Apply the label:** Maak nieuw label → "Reviews/Akropolis"
   - ☑️ **Categorize as:** Primary
   - ☑️ **Star it** (optioneel)
   - ☑️ **Mark as important** (optioneel)

6. **Klik "Create filter"**

7. **Herhaal voor elke nieuwe client** met hun eigen tag

#### Optie B: Algemeen Reviews Filter

Voor alle reviews één filter:

1. In "Subject" veld: `⭐`  (het ster emoji uit de subject)
2. Label: "Reviews/Alle"
3. Categorize as: Primary

#### Optie C: Combinatie van Beiden

1. Algemeen filter voor alle reviews → Label "Reviews"
2. Specifieke filters per client → Sub-labels "Reviews/Akropolis", "Reviews/Restaurant2", etc.

### Filter Voorbeelden per Client

```
Client: Akropolis
Subject: [AKROPOLIS]
Label: Reviews/Akropolis
Kleur: Oranje

Client: Restaurant XYZ
Subject: [RESTAURANT]
Label: Reviews/Restaurant-XYZ
Kleur: Blauw

Client: Café ABC
Subject: [CAFE]
Label: Reviews/Cafe-ABC
Kleur: Groen
```

### Gmail Labels Kleuren Toewijzen

1. In Gmail sidebar, hover over label naam
2. Klik op de **drie puntjes** (⋮)
3. Selecteer **Label color**
4. Kies een kleur per client voor snelle herkenning

**Aanbevolen kleurenschema:**
- 🟠 Oranje - Akropolis
- 🔵 Blauw - Restaurant 2
- 🟢 Groen - Restaurant 3
- 🟣 Paars - Restaurant 4
- 🔴 Rood - Restaurant 5
- 🟡 Geel - Restaurant 6

---

## 🆕 Nieuwe Client Toevoegen (Super Eenvoudig!)

### 1. Update Client Config (config/clients.json)

Open `config/clients.json` en voeg een nieuw block toe:

```json
{
  "clients": {
    "akropolis": {
      "name": "Akropolis Heerlen",
      "logo": "logo/logo_header.webp",
      "googlePlaceId": "ChIJ97cJ27q9wEcRsRAe5JZUD_k",
      "social": {
        "website": "https://akropolis-heerlen.nl/",
        "instagram": "https://www.instagram.com/akropolis.restaurants?igsh=OGxpdjNxc2Noamxk",
        "facebook": "https://www.facebook.com/akropolisgeleen/"
      },
      "emailTag": "AKROPOLIS"
    },
    "bellaitalia": {
      "name": "Bella Italia Heerlen",
      "logo": "logos/bellaitalia.png",
      "googlePlaceId": "BELLA_PLACE_ID_HIER",
      "social": {
        "website": "https://bellaitalia.nl",
        "instagram": "https://instagram.com/bellaitalia",
        "facebook": "https://facebook.com/bellaitalia"
      },
      "emailTag": "BELLAITALIA"
    }
  }
}
```

**Dat is alles!** Alleen 6 velden per client:
- `name` - Bedrijfsnaam (wordt gebruikt in alle teksten)
- `logo` - Pad naar logo bestand
- `googlePlaceId` - Google Place ID voor reviews
- `social` - Website, Instagram, Facebook URLs
- `emailTag` - Tag voor email subject (bijv. [BELLAITALIA])

**Alle kleuren, teksten en andere instellingen zijn automatisch standaard!**

### 2. Maak HTML Bestand

Kopieer `akropolis.html` naar `bellaitalia.html` - **geen aanpassingen nodig!**

Het systeem detecteert automatisch welke client het is op basis van de bestandsnaam.

### 3. Upload Logo (optioneel)

Als de client een eigen logo heeft:
- Upload naar `logos/bellaitalia.png`

### 4. Maak Gmail Filter

Volg de stappen hierboven met de nieuwe `emailTag` (bijv. "BELLAITALIA").

### 5. Test!

1. Open `bellaitalia.html` in browser
2. Geef een review
3. Check of email arriveert met juiste tag: `[BELLAITALIA]`
4. Verify Gmail filter werkt

**Klaar! Nieuwe client is nu operationeel in 2 minuten.** 🎉

---

## 🎨 Standaard Instellingen

Het systeem gebruikt automatisch deze standaard waardes voor alle clients:

**Kleuren:**
- Primary: `#2d3748` (donkergrijs)
- Primary Dark: `#1a202c` (donkerder grijs)
- Accent: `#ffc107` (goud voor sterren)
- Background: `#000000` (zwart)
- Text: `#333333` (donkergrijs)

**Teksten:** (automatisch aangepast met bedrijfsnaam)
- "Hoe was uw ervaring bij {name}?"
- "Bedankt voor uw feedback!"
- "Klik op de sterren om uw beoordeling te geven"
- etc.

**Wil je custom kleuren of teksten?** Geen probleem! De standaard waardes staan in `client-loader.js` en kunnen daar aangepast worden.

---

## 📊 Overzicht URLs

```
Social Wave Landing:
https://artwalters.github.io/review_systeem/

Akropolis Review:
https://artwalters.github.io/review_systeem/akropolis.html

Restaurant 2 Review:
https://artwalters.github.io/review_systeem/restaurant2.html

etc...
```

---

## 🔍 Troubleshooting

### Reviews komen niet aan?

1. Check EmailJS dashboard - zijn er errors?
2. Check console in browser (F12) - JavaScript errors?
3. Verify client config is correct geladen

### Client naam verschijnt niet in email?

1. Check of `client-loader.js` correct laadt
2. Verify `getCurrentClientConfig()` werkt in console
3. Check EmailJS template heeft `{{client_name}}` variabele

### Gmail filter werkt niet?

1. Check of subject exact match heeft met filter
2. Probeer filter te verwijderen en opnieuw aanmaken
3. Test met "Test Search" in Gmail filter popup

### Verkeerde kleuren/logo?

1. Check client ID detectie in console
2. Verify logo pad klopt in config
3. Check CSS variabelen in browser inspector

---

## 💡 Tips

1. **Gebruik consistente naming**: Houd client IDs simpel en lowercase (bijv. 'akropolis', 'restaurant2')

2. **Test altijd eerst**: Maak test reviews voordat je het aan client geeft

3. **Backup je config**: Voor je grote wijzigingen maakt, backup `config/clients.js`

4. **Gebruik git**: Commit elke nieuwe client zodat je terug kunt

5. **Documenteer custom aanpassingen**: Als een client speciale wensen heeft, noteer dit

---

## 📞 Support

Bij vragen of problemen:
- Check console in browser (F12)
- Review deze documentatie
- Check EmailJS dashboard voor errors

---

**Social Wave Multi-Client Review System v1.0**
© 2024 Social Wave • Made with ❤️ for better customer feedback
