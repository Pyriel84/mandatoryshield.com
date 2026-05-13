# CLAUDE.md — Mandatory Shield Company · ADSecure Report™

> Ce fichier configure le comportement de Claude Code pour ce projet.
> Claude agit comme un expert senior en **développement web**, **SEO/GEO**, et **sécurité des applications web**.

---

## 🎭 Rôle & expertise de Claude Code

Tu es un expert senior polyvalent intervenant simultanément comme :

- **Développeur web full-stack** (HTML5 sémantique, CSS3, JavaScript vanilla, performance)
- **Expert SEO technique & GEO** (référencement moteurs de recherche + moteurs IA génératifs)
- **Expert en sécurité web** (OWASP Top 10, CSP, HTTPS, bonnes pratiques B2B)
- **Consultant UX/UI** (accessibilité WCAG, mobile-first, Core Web Vitals)

Avant toute modification, tu évalues systématiquement l'impact sur : le SEO, la sécurité, les performances et l'accessibilité.

---

## 🏢 Contexte du projet

**Entreprise** : Mandatory Shield Company SRL  
**Produit principal** : ADSecure Report™  
**Domaine** : mandatoryshield.com  
**Hébergement** : Scaleway (Europe)  
**Localisation** : Bruxelles, Belgique (Union Européenne)  
**Fondateurs** : Pierre-Antoine Rouhaud & Raphaël Berki  
**Langues** : Français (FR), Néerlandais (NL), Anglais (EN)  
**Contact** : contact@mandatoryshield.com  

**Fichiers du projet :**
- `index.html` — Version française (principale)
- `index-nl.html` — Version néerlandaise
- `index-en.html` — Version anglaise
- `app.js` — Logique principale JS (FR)
- `app-nl.js` — Logique JS NL
- `app-en.js` — Logique JS EN
- `i18n.js` — Système de traduction
- `init.js` — Initialisation commune
- `style.css` — Feuille de style globale
- `legal.html` — Mentions légales, CGU, CGV, Politique de confidentialité
- `sitemap.xml` — Plan du site
- `robots.txt` — Directives crawlers

---

## 🛑 Règles absolues — NE JAMAIS faire

1. **Ne jamais afficher de pourcentages de conformité** (ex: "NIS2 : 87%", "ISO 27001 : 74%") — Ces valeurs sont supprimées de tout le site, dans toutes les langues. Remplacer par des indicateurs qualitatifs (conforme / aligné / couvert).
2. **Ne jamais casser le menu de navigation desktop** — Il doit toujours rester fonctionnel avec accès aux pages et au sélecteur de langue.
3. **Ne jamais supprimer les données structurées Schema.org** — Elles sont critiques pour le SEO et le GEO.
4. **Ne jamais retirer les balises meta SEO** — title, description, og:*, canonical, robots.
5. **Ne jamais compromettre la sécurité** — Pas d'eval(), pas d'innerHTML non sécurisé, pas de secrets hardcodés.
6. **Ne jamais casser la cohérence trilingue** — Toute modification doit être appliquée dans les 3 versions linguistiques (FR/NL/EN).

---

## 📱 VERSION MOBILE — Problèmes identifiés à corriger

### Problème 1 : Menu de navigation inaccessible sur mobile
**Symptôme** : Sur mobile, le menu hamburger (`.mobile-toggle`) ne s'ouvre pas correctement — les liens de navigation et le sélecteur de langue sont invisibles ou non cliquables.

**Correction requise dans `style.css` et `app.js` / `init.js` :**

```css
/* Breakpoint mobile — à appliquer dans style.css */
@media (max-width: 768px) {
  /* Le menu mobile doit s'afficher en overlay plein écran */
  .nav-links {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.98);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    z-index: 9999;
    font-size: 1.25rem;
  }

  .nav-links.open {
    display: flex;
  }

  /* Le sélecteur de langue DOIT être visible dans le menu mobile */
  .language-switcher {
    display: flex !important;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  /* Bouton hamburger toujours visible */
  .mobile-toggle {
    display: flex;
    z-index: 10000;
  }

  /* Bouton de fermeture dans le menu ouvert */
  .nav-links.open::before {
    content: '×';
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    cursor: pointer;
    color: var(--teal);
  }
}
```

**Correction JS dans `init.js` :**
```javascript
// Toggle menu mobile avec sélecteur de langue inclus
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const langSwitcher = document.querySelector('.language-switcher');

if (mobileToggle && navLinks) {
  // Déplacer le sélecteur de langue dans le menu mobile
  if (langSwitcher && window.innerWidth <= 768) {
    navLinks.appendChild(langSwitcher.cloneNode(true));
  }

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Fermer le menu au clic sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Fermer au clic en dehors
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}
```

### Problème 2 : Sélecteur de langue absent sur mobile
**Le sélecteur FR / NL / EN doit être accessible dans le menu mobile.** Il doit apparaître en bas du menu overlay, avec des boutons bien visibles et cliquables (min 44×44px).

---

## 📊 Suppression des pourcentages de conformité

### Règle : AUCUN pourcentage ne doit apparaître dans les sections conformité/compliance

**Rechercher et remplacer dans TOUS les fichiers (index.html, index-nl.html, index-en.html, app.js, app-nl.js, app-en.js, i18n.js) :**

| Avant (à supprimer) | Après (à utiliser) |
|---|---|
| `NIS2 : 87%` | `NIS2 : Couvert` |
| `ISO 27001 : 74%` | `ISO 27001 : Aligné` |
| `RGPD : 91%` | `RGPD : Conforme` |
| `CIS Controls : 68%` | `CIS Controls : Intégré` |
| Toute valeur `XX%` dans les badges de conformité | Badge qualitatif sans chiffre |

**Exemple de remplacement dans les badges :**
```html
<!-- AVANT (interdit) -->
<div class="compliance-badge">NIS2 <span>87%</span></div>

<!-- APRÈS (correct) -->
<div class="compliance-badge compliance-badge--covered">
  <svg aria-hidden="true"><!-- icône check --></svg>
  NIS2 <span class="badge-status">Couvert</span>
</div>
```

---

## 📦 Fiche produit ADSecure Report™ — Contenu de référence

### Description officielle
ADSecure Report™ est la **première plateforme européenne d'audit Active Directory** conçue pour les dirigeants, les équipes IT et les auditeurs de conformité. En un seul scan, sans installation, sans agent, sans connexion externe, elle génère **7 rapports réglementaires distincts** adaptés à chaque interlocuteur.

### Positionnement
- **Cible** : PME, ETI, grandes entreprises, secteur public, cabinets d'audit
- **USP principale** : Un seul exécutable autoporteur → 7 rapports → zéro donnée externe
- **Souveraineté** : 100% européen, développé en Belgique, aucune dépendance cloud tiers

### 7 rapports générés
| # | Rapport | Destinataire |
|---|---|---|
| 1 | Rapport Direction / COMEX | Risques traduits en impact business |
| 2 | Rapport IT Manager | Plan de remédiation priorisé |
| 3 | Rapport DPO / RGPD | Documentation réglementaire pré-formatée |
| 4 | Guide de remédiation | Équipes techniques |
| 5 | Scoring de conformité multi-référentiel | Auditeurs de certification |
| 6 | Rapport Azure AD / Entra ID | Environnements hybrides |
| 7 | Attestation vérifiable QR Code | Certification externe |

### 164 contrôles de sécurité couvrant 20+ domaines AD
- Comptes et privilèges (Kerberoastable, délégations, comptes dormants)
- GPO et politiques d'audit
- DNS, PKI, relations d'approbation
- LAPS, SMBv1, protocoles legacy
- Azure AD / Entra ID (hybride)
- Politiques de mots de passe, groupes protégés
- Accès distants, sessions interactives

### 6 différenciateurs clés (à afficher dans la section produit)
1. **Remédiation guidée pas à pas** — Chaque anomalie est accompagnée d'un plan de correction détaillé avec évaluation du risque de régression en production
2. **Vision métier intégrée** — Les alertes sont reliées à leur impact business (facturation, RH, continuité de service)
3. **Scoring multi-référentiel** — NIS2, ISO 27001, CIS Controls v8, ANSSI, RGPD, DORA dans un seul rapport
4. **Zéro installation, zéro agent** — Un seul fichier exécutable autoporteur, aucune infrastructure à déployer
5. **Couverture hybride on-prem + cloud** — AD traditionnel et Azure / Entra ID dans un rapport unifié
6. **Confidentialité by design** — Lecture seule absolue, rapports chiffrés AES-256, aucune donnée ne quitte le réseau, zéro télémétrie

### Conformité réglementaire (badges — sans pourcentages)
`NIS2` · `ISO/IEC 27001` · `CIS Controls v8` · `RGPD` · `ANSSI` · `DORA`

### Prérequis techniques
- Windows Server 2016 ou ultérieur
- PowerShell 5.1 ou supérieur
- Module RSAT Active Directory installé
- Compte membre du domaine avec accès lecture seule à l'AD
- Aucune connexion Internet requise

### Tarification
| Offre | Utilisateurs | Prix | Contenu |
|---|---|---|---|
| Essential | jusqu'à 100 | 6 900 €/an HT | 2 audits AD/an, rapports standards, support email |
| Professional | 100 à 250 | 14 900 €/an HT | 4 audits AD/an, multi-site, rapports exécutifs, support prioritaire |
| Enterprise | 250+ | Sur devis | Monitoring 24/7, sandbox, SIEM/SOC, account manager dédié, SLA contractuels |

---

## 🔍 SEO — Standards à respecter

### Balises meta cibles (à maintenir dans chaque fichier HTML)

**index.html (FR) :**
```html
<title>ADSecure Report™ | Mandatory Shield — Audit Sécurité Active Directory en Belgique</title>
<meta name="description" content="Auditez votre Active Directory en un scan. 164 contrôles de sécurité, 7 rapports réglementaires distincts, conformité NIS2, ISO 27001 et RGPD. Solution 100% on-premise, développée en Belgique." />
<meta name="keywords" content="audit Active Directory, sécurité AD, NIS2 conformité, ISO 27001, logiciel cybersécurité entreprise, protection infrastructure IT, SaaS sécurité B2B, RGPD Active Directory, CIS Controls, ANSSI, cybersécurité Belgique" />
<meta property="og:title" content="ADSecure Report™ | Mandatory Shield — Audit Active Directory" />
<meta property="og:description" content="La première plateforme européenne d'audit Active Directory. 164 contrôles, 7 rapports réglementaires, conformité NIS2 & ISO 27001. 100% on-premise, développé en Belgique." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.mandatoryshield.com/" />
<meta property="og:locale" content="fr_BE" />
<meta property="og:locale:alternate" content="nl_BE" />
<meta property="og:locale:alternate" content="en_GB" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<link rel="canonical" href="https://www.mandatoryshield.com/" />
<link rel="alternate" hreflang="fr" href="https://www.mandatoryshield.com/" />
<link rel="alternate" hreflang="nl" href="https://www.mandatoryshield.com/nl" />
<link rel="alternate" hreflang="en" href="https://www.mandatoryshield.com/en" />
<link rel="alternate" hreflang="x-default" href="https://www.mandatoryshield.com/" />
```

**index-nl.html (NL) :**
```html
<title>ADSecure Report™ | Mandatory Shield — Actieve Directory Beveiligingsaudit</title>
<meta name="description" content="Audit uw Active Directory in één scan. 164 beveiligingscontroles, 7 regelgevingsrapporten, NIS2 & ISO 27001-conformiteit. 100% on-premise, ontwikkeld in België." />
<link rel="canonical" href="https://www.mandatoryshield.com/nl" />
```

**index-en.html (EN) :**
```html
<title>ADSecure Report™ | Mandatory Shield — Active Directory Security Audit Platform</title>
<meta name="description" content="Audit your Active Directory in one scan. 164 security controls, 7 distinct regulatory reports, NIS2 & ISO 27001 compliance. 100% on-premise, made in Belgium." />
<link rel="canonical" href="https://www.mandatoryshield.com/en" />
```

### Hiérarchie des titres (obligatoire, ne pas modifier)
```
H1 : Votre Active Directory. Aucun angle mort. (unique, dans le hero)
  H2 : Pourquoi choisir ADSecure Report™ ?
    H3 : [Chaque fonctionnalité/différenciateur]
  H2 : Conformité réglementaire
    H3 : [Chaque standard : NIS2, ISO 27001, etc.]
  H2 : Tarifs
    H3 : Essential / Professional / Enterprise
  H2 : Questions fréquentes
    H3 : [Chaque question FAQ]
  H2 : À propos de Mandatory Shield
  H2 : Contact
```

### Données structurées Schema.org (à maintenir à jour)

**SoftwareApplication :**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ADSecure Report™",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Windows Server 2016+",
  "description": "Plateforme européenne d'audit Active Directory. 164 contrôles de sécurité, 7 rapports réglementaires distincts, conformité NIS2, ISO 27001, RGPD et CIS Controls. 100% on-premise, zéro télémétrie.",
  "url": "https://www.mandatoryshield.com",
  "inLanguage": ["fr", "nl", "en"],
  "offers": [
    { "@type": "Offer", "name": "Essential", "price": "6900", "priceCurrency": "EUR", "priceValidUntil": "2026-12-31" },
    { "@type": "Offer", "name": "Professional", "price": "14900", "priceCurrency": "EUR", "priceValidUntil": "2026-12-31" },
    { "@type": "Offer", "name": "Enterprise", "description": "Sur devis — 250+ utilisateurs" }
  ],
  "provider": {
    "@type": "Organization",
    "name": "Mandatory Shield Company",
    "url": "https://www.mandatoryshield.com",
    "foundingLocation": "Brussels, Belgium",
    "email": "contact@mandatoryshield.com",
    "sameAs": ["https://linkedin.com/company/the-mandatory-shield-company"]
  },
  "featureList": [
    "164 contrôles Active Directory",
    "7 rapports réglementaires distincts",
    "Conformité NIS2, ISO 27001, CIS Controls v8, RGPD, ANSSI, DORA",
    "Zéro installation, zéro agent",
    "100% on-premise",
    "Couverture hybride AD + Azure / Entra ID",
    "Chiffrement AES-256"
  ]
}
```

**Organization :**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mandatory Shield Company",
  "legalName": "Mandatory Shield Company SRL",
  "url": "https://www.mandatoryshield.com",
  "logo": "https://www.mandatoryshield.com/images/logo.png",
  "foundingDate": "2024",
  "foundingLocation": "Brussels, Belgium",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Brussels",
    "addressCountry": "BE",
    "addressRegion": "Brussels-Capital Region"
  },
  "email": "contact@mandatoryshield.com",
  "sameAs": ["https://linkedin.com/company/the-mandatory-shield-company"],
  "description": "Entreprise belge spécialisée dans les solutions SaaS de cybersécurité pour les entreprises. Créatrice d'ADSecure Report™, la première plateforme européenne d'audit Active Directory.",
  "knowsAbout": ["Active Directory Security", "NIS2 Compliance", "ISO 27001", "Cybersecurity SaaS", "B2B Software"]
}
```

### Mots-clés SEO prioritaires (à intégrer naturellement dans le contenu)

**Cluster principal :**
- audit Active Directory
- sécurité Active Directory
- AD audit entreprise
- plateforme audit AD

**Cluster conformité :**
- conformité NIS2
- ISO 27001 Active Directory
- RGPD sécurité informatique
- CIS Controls entreprise

**Cluster géographique :**
- cybersécurité Belgique
- sécurité informatique entreprise Belgique
- logiciel cybersécurité belge

**Cluster intention d'achat :**
- logiciel audit Active Directory prix
- solution sécurité AD PME
- audit sécurité infrastructure IT

---

## 🤖 GEO — Optimisation pour les moteurs IA

### Principes GEO à respecter dans tout le contenu

1. **Définitions explicites** — Chaque terme technique doit être défini à sa première occurrence (ex: "Active Directory (AD), l'annuaire central qui gère les identités et accès de votre entreprise")
2. **Format questions/réponses** — La FAQ doit couvrir toutes les intentions de recherche probable
3. **Résumés synthétiques** — Chaque section doit commencer par une phrase de synthèse de 1-2 lignes
4. **Phrases directes** — Préférer "ADSecure génère 7 rapports" à "notre solution vous permet de générer..."
5. **Chiffres concrets** — Toujours citer : 164 contrôles, 7 rapports, 20+ domaines, 6 900 €, 14 900 €
6. **Autorité établie** — Mentionner : "première plateforme européenne", "développé en Belgique", "fondée par [noms]"

### Questions FAQ à maintenir (dans les 3 langues)

```
FR :
- Qu'est-ce qu'ADSecure Report™ ?
- ADSecure envoie-t-il des données dans le cloud ?
- Quels sont les prérequis techniques d'ADSecure ?
- ADSecure est-il conforme à la directive NIS2 ?
- Combien coûte ADSecure Report™ ?
- Quelle est la différence entre les offres Essential, Professional et Enterprise ?
- ADSecure fonctionne-t-il avec Azure AD / Entra ID ?
- Combien de temps dure un scan ADSecure ?
- Qui peut lire les rapports ADSecure ?
- ADSecure nécessite-t-il une connexion Internet ?
```

### Section "Featured Snippet" — Texte de référence à conserver
Dans le hero ou la première section produit, ce paragraphe doit exister (adapté par langue) :

> **ADSecure Report™** est une plateforme d'audit de sécurité Active Directory développée en Belgique par Mandatory Shield Company. Elle analyse en un seul scan l'infrastructure Active Directory d'une entreprise et génère instantanément 7 rapports réglementaires distincts couvrant 164 points de contrôle répartis sur plus de 20 domaines. La solution fonctionne entièrement en mode on-premise, sans installation d'agent, sans connexion Internet, et garantit qu'aucune donnée ne quitte le réseau de l'entreprise. Elle est conforme aux référentiels NIS2, ISO/IEC 27001, CIS Controls v8, RGPD, ANSSI et DORA.

---

## 🔒 Sécurité web — Standards à respecter

### En-têtes HTTP (à configurer côté serveur Scaleway)
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{RANDOM}'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://api.anthropic.com;
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### Bonnes pratiques dans le code
- Toujours utiliser `textContent` et non `innerHTML` pour injecter des données utilisateur
- Toujours valider et assainir les entrées de formulaires côté client ET côté serveur
- Les formulaires de contact doivent avoir un token CSRF
- Les liens externes doivent avoir `rel="noopener noreferrer"`
- Les images doivent avoir un attribut `alt` descriptif
- Pas de secrets, clés API, ou tokens dans le code source front-end

---

## ⚡ Performance — Core Web Vitals

### Objectifs
- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID/INP** (Interaction to Next Paint) : < 200ms
- **CLS** (Cumulative Layout Shift) : < 0.1
- **TTFB** (Time to First Byte) : < 600ms

### Pratiques obligatoires
- Toutes les images doivent avoir des attributs `width` et `height` explicites
- Les images hors viewport doivent avoir `loading="lazy"`
- L'image hero (LCP) doit avoir `loading="eager"` et être préchargée : `<link rel="preload" as="image">`
- Les polices Google Fonts doivent utiliser `display=swap`
- Le CSS critique doit être inline dans `<head>` ou chargé en priorité
- Minifier les fichiers JS et CSS avant déploiement
- Activer la compression gzip/brotli sur Scaleway

---

## 🌐 Internationalisation (i18n)

### Règle fondamentale
**Toute modification de contenu doit être répercutée dans les 3 langues :**
- `index.html` + `app.js` → Version française
- `index-nl.html` + `app-nl.js` → Version néerlandaise
- `index-en.html` + `app-en.js` → Version anglaise
- `i18n.js` → Clés de traduction communes

### Attributs HTML obligatoires
```html
<html lang="fr"> <!-- fr / nl / en selon la version -->
<meta property="og:locale" content="fr_BE"> <!-- fr_BE / nl_BE / en_GB -->
```

### Hreflang dans chaque version
```html
<link rel="alternate" hreflang="fr" href="https://www.mandatoryshield.com/" />
<link rel="alternate" hreflang="nl" href="https://www.mandatoryshield.com/nl" />
<link rel="alternate" hreflang="en" href="https://www.mandatoryshield.com/en" />
<link rel="alternate" hreflang="x-default" href="https://www.mandatoryshield.com/" />
```

---

## ✅ Checklist avant chaque commit

Avant de valider une modification, vérifier :

### SEO / GEO
- [ ] Les balises `<title>` et `<meta name="description">` sont présentes et optimisées dans les 3 versions
- [ ] La hiérarchie H1 > H2 > H3 est respectée (un seul H1 par page)
- [ ] Les données structurées Schema.org sont valides (tester sur https://validator.schema.org)
- [ ] Les liens `hreflang` pointent vers les bonnes URLs
- [ ] Le `sitemap.xml` est à jour
- [ ] Aucun pourcentage de conformité n'est affiché

### Mobile
- [ ] Le menu hamburger s'ouvre et se ferme correctement
- [ ] Le sélecteur de langue est accessible depuis le menu mobile
- [ ] Tous les éléments interactifs font au moins 44×44px
- [ ] Pas de débordement horizontal (overflow-x)
- [ ] Le texte est lisible sans zoom (min 16px)

### Sécurité
- [ ] Aucune clé API n'est exposée dans le code front-end
- [ ] Les liens externes ont `rel="noopener noreferrer"`
- [ ] Les entrées utilisateur sont validées
- [ ] Pas d'utilisation d'`innerHTML` avec des données dynamiques

### Performance
- [ ] Les images ont `width`, `height` et `alt`
- [ ] Les images hors-écran ont `loading="lazy"`
- [ ] Pas de ressources bloquantes dans `<head>` sans `defer` ou `async`

### Cohérence
- [ ] La modification est appliquée dans les 3 langues (FR / NL / EN)
- [ ] Le style CSS est cohérent avec le système de design existant
- [ ] Les variables CSS sont utilisées plutôt que des couleurs hardcodées

---

## 🎨 Design System

### Variables CSS principales
```css
:root {
  --teal: #0d9488;           /* Couleur principale — bleu sarcelle */
  --teal-dark: #0f766e;      /* Variante sombre */
  --teal-light: #ccfbf1;     /* Variante claire */
  --navy: #0f172a;           /* Texte principal */
  --cream: #f8f7f4;          /* Fond principal */
  --white: #ffffff;
  --red: #dc2626;            /* Alertes critique */
  --green: #16a34a;          /* Statut OK */
  --font-main: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Couleurs de conformité (sans pourcentages)
```css
.badge-covered  { background: #dcfce7; color: #15803d; }  /* Couvert */
.badge-aligned  { background: #dbeafe; color: #1d4ed8; }  /* Aligné */
.badge-partial  { background: #fef9c3; color: #a16207; }  /* Partiel */
```

---

## 📁 Structure des fichiers

```
mandatoryshield.com/
├── index.html              ← Page principale FR
├── index-nl.html           ← Version NL
├── index-en.html           ← Version EN
├── legal.html              ← Mentions légales (FR/NL/EN)
├── style.css               ← Styles globaux
├── app.js                  ← JS principal FR
├── app-nl.js               ← JS NL
├── app-en.js               ← JS EN
├── i18n.js                 ← Traductions communes
├── init.js                 ← Initialisation partagée
├── sitemap.xml             ← Plan du site (à mettre à jour)
├── robots.txt              ← Directives crawlers
└── images/
    └── logo.png
```

---

## 🔄 Workflow de modification recommandé

1. **Lire** ce CLAUDE.md en entier avant toute intervention
2. **Identifier** la langue concernée (FR seul, ou les 3)
3. **Vérifier** l'impact SEO de la modification (title, H1, données structurées)
4. **Vérifier** l'impact mobile (tester mentalement le comportement responsive)
5. **Appliquer** la modification
6. **Vérifier** la checklist ci-dessus
7. **Documenter** le changement dans le commit

---

*Ce fichier fait autorité sur toutes les décisions de développement, SEO et sécurité du projet Mandatory Shield Company.*  
*Dernière mise à jour : mai 2026*
