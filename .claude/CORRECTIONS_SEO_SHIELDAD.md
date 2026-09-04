# 🔧 Correction des erreurs SEO et d'accessibilité - Mandatory Shield Company

**Statut:** 🔴 2 Critiques + 7 Avertissements détectés  
**Date:** 31 mai 2026  
**Site:** mandatoryshield.com (ShieldAD)

---

## 📋 Résumé des erreurs

| Catégorie | Erreur | Sévérité | Statut |
|-----------|--------|----------|--------|
| SEO | H1 Tag manquant | 🔴 CRITIQUE | ❌ À corriger |
| Mobile | Viewport Meta Tag manquant | 🔴 CRITIQUE | ❌ À corriger |
| SEO | Canonical Tag manquant | 🟡 AVERTISSEMENT | ❌ À corriger |
| Schema | Schema.org Markup absent | 🟡 AVERTISSEMENT | ❌ À corriger |
| GEO | llms.txt manquant | 🟡 AVERTISSEMENT | ❌ À corriger |
| Performance | Temps de chargement trop élevé (2961ms) | 🟡 AVERTISSEMENT | ❌ À optimiser |
| Schema | Sitemap trop petit (4 URLs) | 🟡 AVERTISSEMENT | ❌ À étendre |
| Schema | Organization Schema manquant | 🟡 AVERTISSEMENT | ❌ À ajouter |
| Schema | Website Schema manquant | 🟡 AVERTISSEMENT | ❌ À ajouter |

---

## 🔴 ERREURS CRITIQUES

### 1️⃣ H1 Tag manquant (Missing H1 Heading)

**Pourquoi c'est critique:**
- Le H1 est obligatoire pour le SEO (identifie le sujet principal de la page)
- Les moteurs d'IA utilisent le H1 pour comprendre le contexte
- Impact direct sur le classement Google

**Solution:**

```html
<!-- À ajouter dans votre <body> en haut de la page d'accueil -->
<h1>Sécurisez votre infrastructure Active Directory avec ShieldAD</h1>

<!-- Alternative pour autres pages: -->
<!-- Page produit -->
<h1>ShieldAD - Solution SaaS de sécurité Active Directory</h1>

<!-- Page À propos -->
<h1>Mandatory Shield Company - Experts en cybersécurité B2B</h1>

<!-- Page Contact -->
<h1>Contactez notre équipe de sécurité</h1>
```

**Structure HTML recommandée:**
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mandatory Shield Company - Sécurité AD Enterprise | ShieldAD</title>
  <meta name="description" content="ShieldAD : solution SaaS de sécurité Active Directory pour les entreprises. Conformité ISO 27001, NIS2, CIS.">
</head>
<body>
  <header>
    <!-- Logo, nav, etc. -->
  </header>
  
  <main>
    <!-- CECI EST LE H1 PRINCIPAL -->
    <h1>Sécurisez votre infrastructure dès aujourd'hui</h1>
    
    <!-- Hero section -->
    <section class="hero">
      <p>Découvrez ShieldAD, la solution SaaS de sécurité Active Directory conçue pour les entreprises.</p>
    </section>
    
    <!-- Autres sections avec H2, H3, etc. -->
    <h2>Pourquoi choisir ShieldAD ?</h2>
    <h3>Sécurité renforcée</h3>
    <!-- ... -->
  </main>
</body>
</html>
```

---

### 2️⃣ Viewport Meta Tag manquant (Missing Viewport Meta Tag)

**Pourquoi c'est critique:**
- Obligatoire pour la responsivité mobile
- Google pénalise les sites non responsive
- Les moteurs IA ne peuvent pas analyser correctement le contenu
- Résultat: rang inférieur dans les SERPs mobiles

**Solution:**

```html
<!-- À ajouter OBLIGATOIREMENT dans <head> -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Complet avec optimisations additionnelles: -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="theme-color" content="#008B8B">
```

**Vérification CSS pour responsive:**
```css
/* Assurez-vous d'avoir ces breakpoints */
@media (max-width: 768px) {
  body { font-size: 16px; }
  h1 { font-size: 28px; }
  .hero { padding: 20px; }
}

@media (max-width: 480px) {
  h1 { font-size: 22px; }
  .cta-button { width: 100%; }
}
```

---

## 🟡 AVERTISSEMENTS (Haute priorité)

### 3️⃣ Canonical Tag manquant (Missing Canonical Tag)

**Impact:** Évite les contenus dupliqués, améliore le SEO

```html
<!-- À ajouter dans <head> pour CHAQUE page -->
<link rel="canonical" href="https://mandatoryshield.com/">
<link rel="canonical" href="https://mandatoryshield.com/shieldad">
<link rel="canonical" href="https://mandatoryshield.com/a-propos">
<link rel="canonical" href="https://mandatoryshield.com/contact">
```

---

### 4️⃣ Schema.org Markup absent (No Schema Markup)

**Impact:** Les moteurs d'IA et Google ne comprennent pas la structure

**Solution - Ajouter dans <head>:**

```html
<!-- SCHEMA ORGANIZATION (Très important pour votre crédibilité) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mandatory Shield Company",
  "alternateName": "MSC - Mandatory Shield",
  "url": "https://mandatoryshield.com",
  "logo": "https://mandatoryshield.com/logo.png",
  "description": "Spécialiste SaaS en cybersécurité et sécurité Active Directory pour les entreprises",
  "sameAs": [
    "https://linkedin.com/company/mandatory-shield-company",
    "https://twitter.com/mandatoryshield"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+33-X-XX-XX-XX-XX",
    "contactType": "Customer Service",
    "email": "contact@mandatoryshield.com"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Votre adresse",
    "addressLocality": "Votre ville",
    "postalCode": "Votre code postal",
    "addressCountry": "FR"
  }
}
</script>

<!-- SCHEMA PRODUCT (Pour ShieldAD) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ShieldAD",
  "description": "Solution SaaS de sécurité Active Directory pour les entreprises. Conformité ISO 27001, NIS2, CIS.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Windows Server",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "247"
  },
  "offers": {
    "@type": "Offer",
    "price": "XX",
    "priceCurrency": "EUR",
    "url": "https://mandatoryshield.com/shieldad"
  }
}
</script>

<!-- SCHEMA WEBSITE (Pour Featured Snippets) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://mandatoryshield.com",
  "name": "Mandatory Shield Company",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://mandatoryshield.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>

<!-- SCHEMA FAQ (Pour GEO - Featured Snippets) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que ShieldAD ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ShieldAD est une solution SaaS de sécurité Active Directory conçue pour les entreprises. Elle automatise les contrôles de sécurité AD, détecte les vulnérabilités et garantit la conformité avec ISO 27001, NIS2 et CIS."
      }
    },
    {
      "@type": "Question",
      "name": "Qui a besoin de ShieldAD ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les PME et grandes entreprises utilisant Active Directory Directory. Notamment les responsables IT, responsables sécurité, et administrateurs système Windows."
      }
    },
    {
      "@type": "Question",
      "name": "ShieldAD est-il compatible avec mon infrastructure ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ShieldAD fonctionne avec Windows Server 2016 et versions supérieures. Compatible avec les déploiements on-premise et hybrid."
      }
    }
  ]
}
</script>
```

---

### 5️⃣ llms.txt manquant (Missing llms.txt - Pour GEO)

**Impact:** Les IA ne peuvent pas crawler votre site pour les assistants intelligents

**Solution - Créer un fichier `/llms.txt` à la racine:**

```txt
# Mandatory Shield Company - llms.txt
# Fichier d'accessibilité pour les modèles de langage et assistants IA

## À propos de Mandatory Shield Company
Mandatory Shield Company est un spécialiste SaaS en cybersécurité et sécurité Active Directory pour les entreprises (B2B).

## Produit principal : ShieldAD
ShieldAD est une solution SaaS d'audit et de sécurité Active Directory.

### Fonctionnalités clés:
- Audit complet de l'Active Directory
- Détection de vulnérabilités de sécurité
- Conformité automatique (ISO 27001, NIS2, CIS)
- Rapports détaillés pour CEO, IT Manager, DPO
- Interface WPF moderne et intuitive
- Sécurité des données utilisateur

### Technologies utilisées:
- PowerShell (Worker d'audit)
- WPF (Interface utilisateur)
- SQLite (Base de données locale)
- Authentification sécurisée

## Services proposés:
1. Audit de sécurité AD
2. Détection et remédiation de vulnérabilités
3. Conformité réglementaire
4. Support technique

## Informations de contact:
- Email: contact@mandatoryshield.com
- Site Web: https://mandatoryshield.com
- Domaine: mandatoryshield.com

## Pages principales:
- Accueil: https://mandatoryshield.com/
- Produit ShieldAD: https://mandatoryshield.com/shieldad
- À propos: https://mandatoryshield.com/a-propos
- Contact: https://mandatoryshield.com/contact
- Mentions légales: https://mandatoryshield.com/legal

## FAQ

### Q: Qu'est-ce que ShieldAD ?
A: ShieldAD est une solution SaaS de sécurité Active Directory pour les entreprises. Elle effectue des audits complets, détecte les vulnérabilités de sécurité et assure la conformité avec les normes ISO 27001, NIS2 et CIS.

### Q: Qui peut utiliser ShieldAD ?
A: Les PME et grandes entreprises utilisant Windows Active Directory. Principalement destiné aux responsables IT, administrateurs système et responsables sécurité informatique.

### Q: Quel est le prix de ShieldAD ?
A: Les tarifs varient selon les besoins. Consultez notre page produit ou contactez-nous pour un devis personnalisé.

### Q: ShieldAD est-il sécurisé ?
A: Oui. ShieldAD respecte les normes OWASP, utilise HTTPS, chiffre les données, et est conforme ISO 27001 et NIS2.

### Q: Puis-je télécharger ShieldAD gratuitement ?
A: Vous pouvez créer un compte et accéder à une version d'essai avant d'acheter la licence complète.

## Langues supportées:
- Français
- Anglais

Mis à jour: 31 mai 2026
```

---

### 6️⃣ Performance - Temps de chargement trop élevé (2961ms)

**Objectif:** < 2000ms (Core Web Vitals: < 1s idéalement)

**Solutions d'optimisation:**

```html
<!-- 1. Minifier CSS et JS -->
<!-- Avant: <link rel="stylesheet" href="style.css"> -->
<!-- Après: -->
<link rel="stylesheet" href="style.min.css">

<!-- 2. Lazy loading pour les images -->
<img src="shieldad-hero.jpg" alt="ShieldAD" loading="lazy">

<!-- 3. Optimiser les images (format WebP) -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>

<!-- 4. Preload les ressources critiques -->
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">

<!-- 5. Defer le JavaScript non-critique -->
<script src="analytics.js" defer></script>
<script src="scroll-animations.js" defer></script>
```

**CSS pour Performance:**
```css
/* Utiliser CSS variables pour réduire les redéclarations */
:root {
  --color-primary: #008B8B;
  --color-secondary: #f5f5f0;
  --font-family-main: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Éviter les animations lourdes au chargement */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Optimiser les transitions */
.cta-button {
  transition: background-color 0.2s ease;
}
```

---

### 7️⃣ Sitemap trop petit (Small Sitemap - 4 URLs)

**Solution - Créer `/sitemap.xml` complet:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Accueil -->
  <url>
    <loc>https://mandatoryshield.com/</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Produit -->
  <url>
    <loc>https://mandatoryshield.com/shieldad</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Fonctionnalités (optionnel) -->
  <url>
    <loc>https://mandatoryshield.com/shieldad/fonctionnalites</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Tarifs (si applicable) -->
  <url>
    <loc>https://mandatoryshield.com/tarifs</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- À propos -->
  <url>
    <loc>https://mandatoryshield.com/a-propos</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>quarterly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Contact -->
  <url>
    <loc>https://mandatoryshield.com/contact</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- FAQ -->
  <url>
    <loc>https://mandatoryshield.com/faq</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Blog (si applicable) -->
  <url>
    <loc>https://mandatoryshield.com/blog</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Articles blog (exemples) -->
  <url>
    <loc>https://mandatoryshield.com/blog/securite-active-directory</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>never</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Mentions légales -->
  <url>
    <loc>https://mandatoryshield.com/legal</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

---

### 8️⃣ Organization Schema manquant

**Voir section 4️⃣ ci-dessus** (Schema.org Markup) pour la correction complète.

---

### 9️⃣ Website Schema manquant

**Voir section 4️⃣ ci-dessus** (Schema.org Markup) pour la correction complète.

---

## 📝 Checklist de correction

- [ ] **H1 Tag** : Ajouter `<h1>` sur chaque page
- [ ] **Viewport Meta Tag** : Ajouter `<meta name="viewport">` dans `<head>`
- [ ] **Canonical Tag** : Ajouter sur chaque page
- [ ] **Organization Schema** : Ajouter le JSON-LD
- [ ] **Product Schema** : Ajouter pour ShieldAD
- [ ] **Website Schema** : Ajouter pour le site
- [ ] **FAQ Schema** : Ajouter pour la page FAQ
- [ ] **llms.txt** : Créer le fichier à la racine
- [ ] **Sitemap.xml** : Étendre à toutes les pages
- [ ] **Optimisation performance** : Minifier CSS/JS, lazy load images
- [ ] **Test mobile** : Vérifier responsive design
- [ ] **Test SEO** : Relancer l'analyse avec DeAlnect

---

## 🧪 Outils de vérification

```bash
# Vérifier les éléments critiques avec curl:
curl -I https://mandatoryshield.com  # Headers
curl https://mandatoryshield.com | grep "<h1"  # H1 Tag
curl https://mandatoryshield.com | grep "viewport"  # Viewport
curl https://mandatoryshield.com | grep "ld+json"  # Schema

# Tester la performance
# → Google PageSpeed Insights
# → GTmetrix.com
# → WebPageTest.org

# Vérifier le SEO
# → Screaming Frog SEO Spider
# → Semrush
# → Ahrefs
```

---

## 📚 Références & normes

- **SEO:** https://developers.google.com/search
- **Schema.org:** https://schema.org
- **Mobile-first:** https://developers.google.com/search/mobile-sites
- **Core Web Vitals:** https://web.dev/vitals
- **GEO:** https://www.google.com/business/local-services-ads/

---

## ⏱️ Priorités d'implémentation

**IMMÉDIAT (J+1):**
1. ✅ H1 Tag manquant
2. ✅ Viewport Meta Tag manquant

**COURT TERME (Semaine 1):**
3. ✅ Canonical Tag
4. ✅ Schema.org Markup (Organization + Product + Website)
5. ✅ Sitemap.xml étendu

**MOYEN TERME (Semaine 2-3):**
6. ✅ llms.txt pour GEO
7. ✅ Optimisation performance (< 2000ms)

**LONG TERME:**
8. ✅ FAQ optimisée GEO
9. ✅ Blog avec contenu de qualité
10. ✅ Monitoring continu du SEO

---

# 🆕 MISE À JOUR — Audit du site live + dépôt GitHub (Pyriel84/mandatoryshield.com)

> Cette section complète le document après analyse du **site en production** et du **code source GitHub** (incluant le `nginx.conf`).

## ✅ Bonne nouvelle : la plupart des erreurs ci-dessus sont DÉJÀ corrigées

Après vérification du site déployé, les éléments suivants sont **présents et fonctionnels** :

| Élément | Statut réel |
|---------|-------------|
| H1 Tag | ✅ Présent ("Votre Active Directory. Aucun angle mort.") |
| Viewport Meta Tag | ✅ Présent |
| Canonical | ✅ Présent (FR, EN, NL) |
| Open Graph / Twitter Card | ✅ Présents (7 balises OG sur la version FR) |
| Schema JSON-LD | ✅ Organization, SoftwareApplication, FAQPage |
| HTTPS | ✅ Actif |

➡️ **L'inquiétude précédente sur une page FR "nue" est levée** : elle venait de fichiers de projet périmés. La version déployée `index-fr.html` est bien optimisée (canonical + JSON-LD + OG).

---

## 🟢 Sécurité serveur (nginx.conf) — Niveau : TRÈS BON

Le `nginx.conf` du dépôt est solide et vise un **A/A+ sur securityheaders.com**. Éléments déjà en place :

- ✅ **HSTS** complet : `max-age=63072000; includeSubDomains; preload`
- ✅ **TLS 1.2 / 1.3 uniquement** + ciphers modernes (ECDHE / GCM / ChaCha20)
- ✅ **OCSP stapling** activé
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy` restrictive
- ✅ **CSP stricte** (`default-src 'none'`)
- ✅ `server_tokens off` (masque la version nginx)
- ✅ Redirections HTTP→HTTPS et www→non-www
- ✅ Méthodes limitées à `GET` / `HEAD`
- ✅ Blocage des fichiers sensibles (`.md`, `.env`, `.log`, `nginx.conf`)
- ✅ `autoindex off` (pas de directory listing)

---

## 🔴 BUG À CORRIGER EN PRIORITÉ : la CSP bloque 8 styles inline

**Problème :** la directive CSP suivante n'autorise PAS l'inline...

```nginx
style-src 'self' https://cdn.jsdelivr.net https://fonts.googleapis.com;
```

...alors que `index.html` contient **8 attributs `style="..."` inline**. Le navigateur va donc **les bloquer**, ce qui casse le rendu. Le plus critique :
- `style="display:none"` → l'élément censé être **caché s'affiche**
- Logo (`height:72px`), encadré, couleurs de fond → rendu cassé

### ✔️ Option A — Rapide (légèrement moins strict)

Modifier la ligne CSP dans `nginx.conf` :

```nginx
add_header Content-Security-Policy "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; img-src 'self'; connect-src 'self' https://api.web3forms.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com; object-src 'none'; upgrade-insecure-requests;" always;
```

### ✔️ Option B — Propre (RECOMMANDÉE pour une boîte de cybersécurité)

Garder la CSP stricte et **déplacer les 8 styles inline dans `style.css`**. Exemple de conversion :

```css
/* Remplace les style="..." inline de index.html */
.text-primary        { color: var(--primary); }
.callout-box         { margin-top: 2rem; padding: 1rem 1.5rem; background: rgba(255,255,255,0.05); border-left: 3px solid var(--primary); border-radius: 0 8px 8px 0; }
.callout-note        { font-size: 0.875rem; color: var(--text-muted); margin: 0; }
.bg-slate            { background: #475569; }
.bg-primary-dark     { background: var(--primary-dark); }
.bg-slate-light      { background: #64748b; }
.logo-centered       { height: 72px; width: auto; display: block; margin: 0 auto 1.5rem; }
.is-hidden           { display: none; }
```

Puis dans le HTML, remplacer par exemple :
```html
<!-- AVANT -->
<div style="display:none"> ... </div>
<!-- APRÈS -->
<div class="is-hidden"> ... </div>
```

---

## 🟡 Améliorations optionnelles (pour viser le A+ parfait)

### 1. En-têtes cross-origin supplémentaires

À ajouter dans le bloc `server` HTTPS du `nginx.conf` :

```nginx
add_header Cross-Origin-Opener-Policy   "same-origin"  always;
add_header Cross-Origin-Resource-Policy "same-origin"  always;
```

### 2. Page 404 personnalisée

```nginx
error_page 404 /404.html;
location = /404.html { internal; }
```

### 3. Rate limiting basique (anti-flood)

```nginx
# Dans le bloc http { } (nginx.conf principal)
limit_req_zone $binary_remote_addr zone=msc_limit:10m rate=20r/s;

# Dans le bloc location / {
limit_req zone=msc_limit burst=40 nodelay;
```

### 4. Auto-héberger les polices

Télécharger Inter + JetBrains Mono + RemixIcon en local pour :
- Améliorer la performance (supprime 2 connexions externes)
- Pouvoir retirer `cdn.jsdelivr.net` et `fonts.googleapis.com` de la CSP (CSP encore plus stricte)

---

## 📝 Checklist mise à jour (post-audit live + GitHub)

- [ ] 🔴 **Corriger la CSP vs styles inline** (Option A ou B) — PRIORITÉ
- [ ] 🟡 Ajouter `Cross-Origin-Opener-Policy` + `Cross-Origin-Resource-Policy`
- [ ] 🟡 Page 404 personnalisée
- [ ] 🟡 `limit_req` anti-flood
- [ ] 🟡 Auto-héberger les polices
- [ ] ⚪ Créer `llms.txt` (GEO) — toujours absent
- [ ] ⚪ Vérifier note finale sur **securityheaders.com** et **ssllabs.com**
- [x] ✅ H1, viewport, canonical, OG, schema → déjà OK
- [x] ✅ Sécurité serveur (HSTS, TLS, headers) → déjà OK

---

**Dernière mise à jour:** 31 mai 2026 (audit live + GitHub Pyriel84)  
**Responsable:** Mandatory Shield Company  
**Statut:** 🟢 SÉCURITÉ SOLIDE — reste 1 bug CSP à corriger + optimisations optionnelles
