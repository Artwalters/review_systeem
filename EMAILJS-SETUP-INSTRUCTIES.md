# 📧 EmailJS Template Setup - Stap voor Stap

## 🎯 Doel
Emails automatisch labelen per onderneming zodat je direct ziet van welke klant de review komt.

---

## 📋 Stap 1: Open EmailJS Dashboard

1. Ga naar: https://dashboard.emailjs.com/
2. Log in met je account
3. Klik op **"Email Templates"** in het linker menu

---

## 📋 Stap 2: Open Je Template

1. Zoek template: `template_de4ed4x`
2. Klik erop om te openen

---

## ✉️ Stap 3: Update Subject Line

**ZEER BELANGRIJK voor automatische labeling!**

In het **"Subject"** veld, vervang alles met:

```
[{{client_tag}}] ⭐ {{rating}} sterren - Nieuwe Review
```

**Wat dit doet:**
- `[AKROPOLIS] ⭐ 5 sterren - Nieuwe Review` voor Akropolis
- `[BELLAITALIA] ⭐ 4 sterren - Nieuwe Review` voor Bella Italia
- Gmail kan hier automatisch op filteren!

---

## 📄 Stap 4: Update Email Body (HTML Content)

1. Scroll naar beneden naar het grote tekst veld (HTML Content)
2. **Selecteer ALLES** (Ctrl+A of Cmd+A)
3. **Delete alles**
4. Open het bestand: `email-template.html` (in je project folder)
5. **Kopieer de hele inhoud** van dat bestand
6. **Plak het** in het EmailJS HTML Content veld

**Of:** Copy-paste deze complete HTML code:

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
      min-width: 60px;
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
    .badge {
      display: inline-block;
      background: #2d3748;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 10px;
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
      <div class="badge">{{date}}</div>
    </div>

    <!-- Content -->
    <div class="content-section">
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

---

## 💾 Stap 5: Opslaan

1. Scroll helemaal naar beneden
2. Klik op de grote **"Save"** knop
3. Wacht op bevestiging: "Template saved successfully"

---

## ✅ Stap 6: Test het Systeem

1. Open in browser: `akropolis.html`
2. Geef een test review (bijvoorbeeld 3 sterren)
3. Vul feedback in en verstuur
4. Check je inbox (Akropolisreviews@gmail.com)

**Je moet nu zien:**
```
Subject: [AKROPOLIS] ⭐ 3 sterren - Nieuwe Review

Email body:
┌─────────────────────────────┐
│ [AKROPOLIS]                 │
│ 📊 Nieuwe Review Ontvangen  │
│ Akropolis Heerlen           │
│                             │
│ ★★★★★                       │
│ 3 van 5 sterren             │
└─────────────────────────────┘
```

---

## 🎯 Stap 7: Gmail Filters Instellen (Optioneel)

Nu kun je Gmail filters maken:

1. In Gmail: Klik op zoekbalk
2. Type: `subject:[AKROPOLIS]`
3. Klik op filter icoon rechts
4. "Create filter"
5. Selecteer: "Apply the label" → Maak nieuw label "Reviews/Akropolis"
6. "Create filter"

**Herhaal voor elke client:**
- `[BELLAITALIA]` → Label: "Reviews/BellaItalia"
- `[RESTAURANT3]` → Label: "Reviews/Restaurant3"
- etc.

---

## 🎉 Klaar!

Je systeem is nu volledig ingesteld. Elke review wordt automatisch gelabeld per onderneming!

**Problemen?** Check de troubleshooting sectie in `MULTI-CLIENT-SETUP.md`
