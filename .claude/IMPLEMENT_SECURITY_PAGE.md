# 🔐 Implémentation Page Security & Compliance — MSC Website

**Pour Claude Code (VSCode)**  
**Mandatory Shield Company © 2026**  
**Fondateurs : Pierre-Antoine Rouhaud & Raphaël Berki**

---

## 📋 OBJECTIF

Créer une page web `Security-Compliance.html` trilingue (FR/EN/NL) qui :
- ✅ S'intègre au design existant du site (cf. ADSecure_OnePager_Acen_EN.html)
- ✅ Affiche la politique de sécurité & conformité
- ✅ Responsive + accessible
- ✅ Inclut les disclaimers légaux obligatoires
- ✅ Permet la sélection de langue (FR/EN/NL)
- ✅ Zéro CDN externe (EU-sovereign)

---

## 🎨 DESIGN & COULEURS À RESPECTER

### Palette existante
```css
--navy: #0F2137
--navy-2: #1A237E
--ink: #1A1F2E
--muted: #5A6577
--line: #E2E6ED
--paper: #FCFCFD
--azure: #0078D4
--blue: #2563EB
--green: #10B981
--amber: #F59E0B
--red: #EF4444
```

### Polices
- **Heading** : IBM Plex Sans (uppercase, letter-spacing)
- **Body** : Segoe UI, -apple-system, BlinkMacSystemFont
- **Code/Meta** : SFMono-Regular, Courier New (monospace)
- **Serif** : Georgia (pour accents)

### Éléments visuels
- **Top accent bar** : 5px gradient (navy-2 → azure → green)
- **Header** : Navy gradient + subtle grid pattern overlay
- **Cards** : Border subtle (#E2E6ED), shadow léger
- **Checkmarks** : Utiliser les emojis ✓ ou icônes SVG simples

---

## 📄 STRUCTURE HTML

La page doit suivre ce modèle (simplifié du OnePager existant) :

```html
<!-- Head -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Security & Compliance — Mandatory Shield Company</title>
<style>
  /* Réutiliser la majorité du CSS du OnePager */
  /* Adapter pour full-width (pas A4 print) */
</style>

<!-- Body -->
<body>
  <!-- Language Selector (sticky top-right) -->
  <div id="langSwitcher">
    <button data-lang="fr" class="active">FR</button>
    <button data-lang="en">EN</button>
    <button data-lang="nl">NL</button>
  </div>

  <!-- Header avec logo -->
  <header>
    <div class="htop">
      <div class="brand">
        <!-- Shield SVG + Logo -->
        <div class="shield"></div>
        <div>
          <div class="wordmark">ShieldAD<sup>™</sup></div>
          <div class="tagline">Security & Compliance</div>
        </div>
      </div>
      <div class="conf-tags">
        <span class="conf-tag">NIS2</span>
        <span class="conf-tag">ISO 27001</span>
        <span class="conf-tag">ANSSI</span>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="security-page">
    <!-- Section 1: Why Trust ShieldAD -->
    <!-- Section 2: Compliance Standards -->
    <!-- Section 3: Security Practices -->
    <!-- Section 4: Security Contact -->
    <!-- Section 5: Legal Disclaimer -->
  </main>

  <!-- Footer -->
  <footer>
    <p>&copy; 2026 Mandatory Shield Company. All rights reserved.</p>
  </footer>

  <script>
    // Language switching logic
  </script>
</body>
```

---

## 🌐 CONTENU TRILINGUE

### **SECTION 1 : "Why Trust ShieldAD"**

#### FRANÇAIS
```
🔒 AUDITS EN LECTURE SEULE
Active Directory ne subit aucune modification.
ShieldAD effectue des scans 100% passifs.

🔐 CHIFFREMENT BOUT EN BOUT
Chiffrement AES-256 de tous les rapports.
TLS 1.2+ pour toutes les communications.

🛡️ ZÉRO RÉTENTION DE DONNÉES
Vos rapports ne sont pas stockés.
Les scans sont supprimés après export.
```

#### ENGLISH
```
🔒 READ-ONLY AUDITS
Your Active Directory is never modified.
ShieldAD performs 100% passive scanning.

🔐 END-TO-END ENCRYPTION
All reports encrypted with AES-256.
TLS 1.2+ for all communications.

🛡️ ZERO DATA RETENTION
Your reports are not stored by us.
Scans are deleted after export.
```

#### NEDERLANDS
```
🔒 ALLEEN-LEZEN AUDITS
Active Directory wordt nooit gewijzigd.
ShieldAD voert 100% passief scannen uit.

🔐 END-TO-END VERSLEUTELING
Alle rapporten versleuteld met AES-256.
TLS 1.2+ voor alle communicatie.

🛡️ NULGEGEVENSRETENTIE
Uw rapporten worden niet door ons opgeslagen.
Scans worden na export verwijderd.
```

---

### **SECTION 2 : "Compliance Standards"**

Afficher comme des badges/cards avec descriptions courtes.

#### FRANÇAIS
| Badge | Titre | Description |
|-------|-------|-------------|
| ✓ | NIS2 | Directive UE 2022/2555 — Entités critiques |
| ✓ | ISO/IEC 27001 | Gouvernance sécurité & contrôle d'accès |
| ✓ | ANSSI | Recommandations ANSSI (R33, R72) |
| ✓ | GDPR | Conformité protection des données |
| ✓ | CIS Controls | Benchmark technique v8 (IG1/IG2/IG3) |
| ✓ | DORA | Résilience opérationnelle (entités financières) |

#### ENGLISH
| Badge | Title | Description |
|-------|-------|-------------|
| ✓ | NIS2 | EU Directive 2022/2555 — Critical entities |
| ✓ | ISO/IEC 27001 | Security governance & access control |
| ✓ | ANSSI | French CISA Recommendations (R33, R72) |
| ✓ | GDPR | Data Protection Compliance |
| ✓ | CIS Controls | Technical benchmark v8 (IG1/IG2/IG3) |
| ✓ | DORA | Operational Resilience (Financial Entities) |

#### NEDERLANDS
| Badge | Titel | Beschrijving |
|-------|-------|-------------|
| ✓ | NIS2 | EU Richtlijn 2022/2555 — Kritieke entiteiten |
| ✓ | ISO/IEC 27001 | Beveiligingsbeheer & toegangscontrole |
| ✓ | ANSSI | Franse CISA-aanbevelingen (R33, R72) |
| ✓ | GDPR | Naleving gegevensbescherming |
| ✓ | CIS Controls | Technische benchmark v8 (IG1/IG2/IG3) |
| ✓ | DORA | Operationele veerkracht (Financiële entiteiten) |

---

### **SECTION 3 : "Security Practices"**

#### FRANÇAIS
```
✓ Code Signé (PowerShell Authenticode)
  Garantit l'authenticité et l'intégrité du logiciel.

✓ Vérification d'Intégrité (SHA-256)
  Hachages vérifient que ShieldAD n'a pas été modifié.

✓ Journalisation d'Audit
  Tous les scans sont enregistrés & traçables.

✓ Sauvegardes Chiffrées
  Vos données de configuration sont protégées.

✓ Révisions Annuelles
  Audit interne de sécurité chaque année.

✓ Responsabilité Partagée
  Votre RSSI reste propriétaire des conclusions.
```

#### ENGLISH
```
✓ Signed Code (PowerShell Authenticode)
  Guarantees software authenticity and integrity.

✓ Integrity Verification (SHA-256)
  Hashes verify ShieldAD has not been tampered with.

✓ Audit Logging
  All scans are recorded & traceable.

✓ Encrypted Backups
  Your configuration data is protected.

✓ Annual Security Reviews
  Internal security audit every year.

✓ Shared Responsibility
  Your CISO remains owner of findings.
```

#### NEDERLANDS
```
✓ Ondertekende Code (PowerShell Authenticode)
  Garandeert authenticiteit en integriteit van software.

✓ Integriteitsverificatie (SHA-256)
  Hashes verifiëren dat ShieldAD niet is gewijzigd.

✓ Audit Logging
  Alle scans worden geregistreerd & traceerbaar.

✓ Gecodeerde Backups
  Uw configuratiegegevens zijn beschermd.

✓ Jaarlijkse Beveiligingsbeoordelingen
  Interne beveiligingsaudit elk jaar.

✓ Gedeelde Verantwoordelijkheid
  Uw CISO blijft eigenaar van bevindingen.
```

---

### **SECTION 4 : "Responsible Disclosure"**

#### FRANÇAIS
```
🔓 Vous avez trouvé une vulnérabilité de sécurité ?

Contactez-nous de manière responsable :

📧 Email : security@mandatoryshield.com
⏱️ Temps de réponse : 48 heures
🔐 Clé PGP : [disponible sur demande]

Incluez dans votre rapport :
• Description du problème
• Étapes pour reproduire
• Impact potentiel
• Vos informations de contact

Nous reconnaîtrons réception, corrigerons le problème
et vous créditerons dans nos annonces de sécurité.
```

#### ENGLISH
```
🔓 Found a security vulnerability?

Contact us responsibly:

📧 Email: security@mandatoryshield.com
⏱️ Response time: 48 hours
🔐 PGP Key: [available upon request]

Include in your report:
• Description of the issue
• Steps to reproduce
• Potential impact
• Your contact information

We'll acknowledge receipt, fix the issue, 
and credit you in our security advisories.
```

#### NEDERLANDS
```
🔓 Hebt u een beveiligingskwetsbaarheid gevonden?

Neem verantwoord contact met ons op:

📧 Email: security@mandatoryshield.com
⏱️ Responstijd: 48 uur
🔐 PGP Sleutel: [beschikbaar op aanvraag]

Voeg aan uw rapport toe:
• Beschrijving van het probleem
• Stappen om het probleem te reproduceren
• Potentiële impact
• Uw contactgegevens

We erkennen de ontvangst, verhelpen het probleem
en vermelden u in onze beveiligingsmededelingen.
```

---

### **SECTION 5 : "Legal Disclaimer"** (IMPORTANT)

#### FRANÇAIS
```
⚖️ CLAUSE DE NON-RESPONSABILITÉ LÉGALE

1. STATUT DE LA PAGE
   Cette page décrit les pratiques de sécurité actuelles 
   de Mandatory Shield Company concernant ShieldAD.
   Ces informations ont été mises à jour le 2026-08-31.

2. LIMITATION DE RESPONSABILITÉ
   ShieldAD est un outil d'audit en lecture seule.
   Mandatory Shield Company décline toute responsabilité
   pour les dommages directs ou indirects résultant de :
   • Erreurs d'interprétation des résultats de scan
   • Utilisation non conforme du logiciel
   • Modifications apportées par l'utilisateur

3. CONFORMITÉ
   ShieldAD est aligné avec ISO 27001, NIS2, ANSSI.
   Il n'est PAS certifié par un tiers indépendant
   (sauf indication contraire dans la documentation officielle).
   La responsabilité légale de la conformité reste
   celle de votre organisation.

4. MODIFICATIONS
   Ces pratiques peuvent changer sans préavis.
   Consultez cette page régulièrement pour les mises à jour.

5. DONNÉES PERSONNELLES
   Voir notre Politique de Confidentialité complète :
   https://mandatoryshield.com/privacy

6. CONTACT LÉGAL
   legal@mandatoryshield.com
```

#### ENGLISH
```
⚖️ LEGAL DISCLAIMER

1. PAGE STATUS
   This page describes current security practices
   of Mandatory Shield Company regarding ShieldAD.
   This information was last updated 2026-08-31.

2. LIMITATION OF LIABILITY
   ShieldAD is a read-only audit tool.
   Mandatory Shield Company disclaims any liability
   for direct or indirect damages resulting from:
   • Misinterpretation of scan results
   • Non-compliant use of the software
   • Modifications made by user

3. COMPLIANCE
   ShieldAD is aligned with ISO 27001, NIS2, ANSSI.
   It is NOT certified by independent third party
   (unless otherwise stated in official documentation).
   Legal responsibility for compliance remains
   with your organization.

4. MODIFICATIONS
   These practices may change without notice.
   Check this page regularly for updates.

5. PERSONAL DATA
   See our full Privacy Policy:
   https://mandatoryshield.com/privacy

6. LEGAL CONTACT
   legal@mandatoryshield.com
```

#### NEDERLANDS
```
⚖️ JURIDISCHE DISCLAIMER

1. PAGINA STATUS
   Deze pagina beschrijft huidige beveiligingspraktijken
   van Mandatory Shield Company met betrekking tot ShieldAD.
   Deze informatie werd voor het laatst bijgewerkt op 2026-08-31.

2. BEPERKING VAN AANSPRAKELIJKHEID
   ShieldAD is een alleen-lezen controletool.
   Mandatory Shield Company aanvaardt geen aansprakelijkheid
   voor directe of indirecte schade voortvloeiend uit:
   • Verkeerde interpretatie van scanresultaten
   • Niet-conform gebruik van de software
   • Wijzigingen aangebracht door gebruiker

3. COMPLIANCE
   ShieldAD is afgestemd op ISO 27001, NIS2, ANSSI.
   Het is NIET gecertificeerd door onafhankelijke derde partij
   (tenzij anders aangegeven in officiële documentatie).
   Juridische verantwoordelijkheid voor naleving blijft
   bij uw organisatie.

4. WIJZIGINGEN
   Deze praktijken kunnen zonder voorafgaande kennisgeving veranderen.
   Raadpleeg deze pagina regelmatig voor updates.

5. PERSOONLIJKE GEGEVENS
   Zie ons volledige privacybeleid:
   https://mandatoryshield.com/privacy

6. JURIDISCH CONTACT
   legal@mandatoryshield.com
```

---

## 💻 IMPLEMENTATION CHECKLIST (Claude Code)

### **Étape 1 : Créer le fichier HTML**
- [ ] Créer `Security-Compliance.html` à la racine du projet web
- [ ] Importer le CSS du OnePager existant (styles réutilisables)
- [ ] Adapter le CSS pour full-width (pas format A4)

### **Étape 2 : Implémenter le système de langue**
- [ ] Créer structure JSON `strings.js` avec traductions FR/EN/NL
- [ ] Ajouter boutons de sélection de langue (top-right sticky)
- [ ] LocalStorage pour mémoriser la langue préférée
- [ ] Fonction `switchLanguage()` pour remplacer le texte

### **Étape 3 : Créer les sections**
- [ ] Section "Why Trust" (3 colonnes avec icônes)
- [ ] Section "Compliance Standards" (grille 3x2 avec badges)
- [ ] Section "Security Practices" (liste avec checkmarks)
- [ ] Section "Responsible Disclosure" (formulaire ou email button)
- [ ] Section "Legal Disclaimer" (texte complet)

### **Étape 4 : Responsive & Accessible**
- [ ] Mobile-friendly (media queries)
- [ ] ARIA labels pour a11y
- [ ] Color contrast ratio ≥ 4.5:1 (WCAG AA)
- [ ] Test sur navigateurs (Chrome, Firefox, Safari)

### **Étape 5 : Tester**
- [ ] Vérifier toutes les traductions (FR/EN/NL)
- [ ] Vérifier les liens (security@, privacy page)
- [ ] Vérifier mobile (small screens)
- [ ] Copier-coller les disclaimers (validation légale)

### **Étape 6 : Intégration site**
- [ ] Ajouter lien dans menu principal : `Security & Compliance`
- [ ] Ajouter lien dans footer
- [ ] Mettre à jour sitemap XML (si applicable)
- [ ] SEO meta description

---

## 🔗 LIENS À CONFIGURER

```html
<!-- Navigation -->
<a href="/security-compliance.html">Security & Compliance</a>

<!-- Footer -->
<a href="/security-compliance.html">Security Policy</a>
<a href="/privacy.html">Privacy Policy</a>

<!-- Contacts -->
security@mandatoryshield.com
legal@mandatoryshield.com

<!-- Social/Legal -->
https://mandatoryshield.com/privacy
https://mandatoryshield.com/terms
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Desktop (default) */
@media (max-width: 1024px) {
  /* Tablet adjustments */
}

@media (max-width: 640px) {
  /* Mobile: single column */
  .compliance-grid { grid-template-columns: 1fr; }
  .security-practices { padding: 16px; }
}
```

---

## ✅ VALIDATION LÉGALE AVANT LIVRAISON

**À faire avant de publier :**

- [ ] Relire la section "Legal Disclaimer" avec votre avocate/consultant légal
- [ ] Vérifier que les claims (NIS2, ISO 27001, ANSSI) sont vraies pour ShieldAD
- [ ] Vérifier que l'email `security@` existe et est monitoré
- [ ] Vérifier la conformité RGPD des formulaires (si applicable)
- [ ] Tester la page sur tous les navigateurs EU populaires

---

## 📝 NOTES IMPORTANTES

1. **Pas de certification SOC 2 à afficher** — vous n'êtes pas certifiés (encore)
2. **"Aligned with" ≠ "Certified by"** — Utiliser "aligned" partout
3. **Disclaimers sont obligatoires** — Les garder visibles et en français/EN/NL
4. **Email security@** doit exister — Sinon ça crée de la méfiance
5. **Pas de buzzwords vides** — Chaque claim doit être vrai (ex: "zero telemetry" — vérifier)

---

## 🚀 COMMANDES POUR CLAUDE CODE

```bash
# 1. Créer le fichier
# File > New File > Security-Compliance.html

# 2. Copier-coller le template HTML complet
# (généré par Claude Code selon ce .md)

# 3. Tester en local
# Ouvrir dans navigateur (file:// ou serveur local)

# 4. Commit & push
git add Security-Compliance.html
git commit -m "feat: Add Security & Compliance page (FR/EN/NL)"
git push
```

---

**C'est prêt à utiliser avec Claude Code !** 🎯

Demande au code d'implémenter section par section en copiant le contenu trilingue ci-dessus.

