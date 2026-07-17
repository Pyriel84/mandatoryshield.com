# 🌐 Switch vers l'anglais comme langue par défaut
**Mandatory Shield Company — mandatoryshield.com**

---

## Vue d'ensemble

Le site utilise actuellement **le français comme langue par défaut**. Ce guide liste chaque modification à effectuer, fichier par fichier, pour passer **l'anglais en langue principale** tout en conservant FR et NL accessibles.

---

## Fichier 1 — `init.js`

C'est le fichier le plus important : il détermine quelle langue est chargée au premier visit.

### Modification

```js
// AVANT
const savedLang = localStorage.getItem('ms_lang') || 'fr';

// APRÈS
const savedLang = localStorage.getItem('ms_lang') || 'en';
```

> **Explication :** Si aucune langue n'est sauvegardée en `localStorage` (premier visiteur), la langue de secours est désormais `'en'` au lieu de `'fr'`.

---

## Fichier 2 — `index.html` (page d'entrée principale)

`index.html` est la page que charge le serveur sur `mandatoryshield.com/`. Elle est actuellement en français. Deux options :

### Option A — Redirection automatique (recommandée SEO)

Remplacer le contenu de `index.html` par une redirection propre vers la version anglaise :

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mandatory Shield — Redirecting…</title>
  <link rel="canonical" href="https://www.mandatoryshield.com/en/">

  <!-- Redirection HTML immédiate -->
  <meta http-equiv="refresh" content="0; url=/index-en.html">

  <!-- Balises hreflang pour les moteurs de recherche -->
  <link rel="alternate" hreflang="en" href="https://www.mandatoryshield.com/index-en.html">
  <link rel="alternate" hreflang="fr" href="https://www.mandatoryshield.com/index-fr.html">
  <link rel="alternate" hreflang="nl" href="https://www.mandatoryshield.com/index-nl.html">
  <link rel="alternate" hreflang="x-default" href="https://www.mandatoryshield.com/index-en.html">
</head>
<body>
  <p>Redirecting to <a href="/index-en.html">English version</a>…</p>
</body>
</html>
```

> **Avantage :** Google voit `x-default` pointant vers EN → il indexe l'anglais comme version principale.

### Option B — Renommer les fichiers (structure propre)

| Fichier actuel | Renommer en |
|---|---|
| `index.html` (FR) | `index-fr.html` |
| `index-en.html` | `index.html` ← **nouvelle page principale** |

Puis dans `index.html` (ex EN), mettre à jour les liens du switcher :

```html
<!-- AVANT dans index-en.html -->
<a href="index.html" class="lang-btn">FR</a>
<a href="index-nl.html" class="lang-btn">NL</a>
<a href="index-en.html" class="lang-btn active">EN</a>

<!-- APRÈS dans index.html (nouvelle page principale EN) -->
<a href="index-fr.html" class="lang-btn">FR</a>
<a href="index-nl.html" class="lang-btn">NL</a>
<a href="index.html" class="lang-btn active">EN</a>
```

> ✅ **Option B recommandée** : plus propre, pas de redirection intermédiaire, meilleur pour les performances.

---

## Fichier 3 — `index-en.html` → devient `index.html`

### Balise `<html lang>`

```html
<!-- Déjà correct -->
<html lang="en">
```

### Balise `<link rel="canonical">`

```html
<!-- AVANT -->
<link rel="canonical" href="https://www.mandatoryshield.com/en">

<!-- APRÈS (si le fichier devient index.html à la racine) -->
<link rel="canonical" href="https://www.mandatoryshield.com/">
```

### Balises `hreflang` à ajouter dans le `<head>`

```html
<link rel="alternate" hreflang="en" href="https://www.mandatoryshield.com/">
<link rel="alternate" hreflang="fr" href="https://www.mandatoryshield.com/index-fr.html">
<link rel="alternate" hreflang="nl" href="https://www.mandatoryshield.com/index-nl.html">
<link rel="alternate" hreflang="x-default" href="https://www.mandatoryshield.com/">
```

> **`x-default`** indique aux moteurs que l'anglais est la version internationale par défaut.

---

## Fichier 4 — `index-fr.html` (ex `index.html`)

Mettre à jour le switcher de langue :

```html
<!-- AVANT -->
<a href="index.html" class="lang-btn active">FR</a>
<a href="index-nl.html" class="lang-btn">NL</a>
<a href="index-en.html" class="lang-btn">EN</a>

<!-- APRÈS -->
<a href="index-fr.html" class="lang-btn active">FR</a>
<a href="index-nl.html" class="lang-btn">NL</a>
<a href="index.html" class="lang-btn">EN</a>
```

Ajouter les balises `hreflang` dans le `<head>` :

```html
<link rel="alternate" hreflang="fr" href="https://www.mandatoryshield.com/index-fr.html">
<link rel="alternate" hreflang="en" href="https://www.mandatoryshield.com/">
<link rel="alternate" hreflang="nl" href="https://www.mandatoryshield.com/index-nl.html">
<link rel="alternate" hreflang="x-default" href="https://www.mandatoryshield.com/">
```

---

## Fichier 5 — `index-nl.html`

Mettre à jour le switcher de langue :

```html
<!-- AVANT -->
<a href="index.html" class="lang-btn">FR</a>
<a href="index-nl.html" class="lang-btn active">NL</a>
<a href="index-en.html" class="lang-btn">EN</a>

<!-- APRÈS -->
<a href="index-fr.html" class="lang-btn">FR</a>
<a href="index-nl.html" class="lang-btn active">NL</a>
<a href="index.html" class="lang-btn">EN</a>
```

Ajouter les balises `hreflang` dans le `<head>` :

```html
<link rel="alternate" hreflang="nl" href="https://www.mandatoryshield.com/index-nl.html">
<link rel="alternate" hreflang="en" href="https://www.mandatoryshield.com/">
<link rel="alternate" hreflang="fr" href="https://www.mandatoryshield.com/index-fr.html">
<link rel="alternate" hreflang="x-default" href="https://www.mandatoryshield.com/">
```

---

## Fichier 6 — `sitemap.xml`

Mettre à jour les priorités pour refléter l'anglais comme langue principale :

```xml
<url>
  <loc>https://www.mandatoryshield.com/</loc>           <!-- EN = racine -->
  <priority>1.0</priority>
  <hreflang>en</hreflang>
</url>
<url>
  <loc>https://www.mandatoryshield.com/index-fr.html</loc>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://www.mandatoryshield.com/index-nl.html</loc>
  <priority>0.8</priority>
</url>
```

---

## Fichier 7 — `robots.txt`

Aucune modification obligatoire, mais vérifier que le sitemap pointe bien vers la bonne URL :

```txt
Sitemap: https://www.mandatoryshield.com/sitemap.xml
```

---

## Résumé des actions (checklist)

```
[ ] 1. init.js          → changer 'fr' en 'en' (ligne 3)
[ ] 2. index.html       → renommer en index-fr.html
[ ] 3. index-en.html    → renommer en index.html
[ ] 4. index.html       → mettre à jour canonical + hreflang + switcher
[ ] 5. index-fr.html    → mettre à jour switcher + hreflang
[ ] 6. index-nl.html    → mettre à jour switcher + hreflang
[ ] 7. sitemap.xml      → mettre à jour les priorités
[ ] 8. Tester sur navigateur en navigation privée (cache vide)
[ ] 9. Valider avec Google Search Console après déploiement
```

---

## Test rapide après déploiement

1. Ouvrir `mandatoryshield.com` en **navigation privée** → doit afficher la version anglaise
2. Cliquer sur **FR** → doit basculer en français et sauvegarder le choix
3. Rafraîchir → doit rester en français (localStorage)
4. Vérifier dans les DevTools (F12 → Application → Local Storage) la clé `ms_lang`

---

*Document généré pour Mandatory Shield Company — Mai 2026*
