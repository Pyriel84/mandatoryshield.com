# 🛠️ Tâche pour Claude (VS Code) — Corrections `nginx.conf`

**Dépôt :** Pyriel84/mandatoryshield.com
**Fichier à modifier :** `nginx.conf` (un seul fichier)
**Objectif :** corriger 2 problèmes restants après le passage de l'audit securityheaders.com de F → A.

> ⚠️ Ne modifier QUE le fichier `nginx.conf`. Ne pas toucher au HTML/CSS/JS.
> Après les 2 modifications, faire un commit puis suivre la procédure de déploiement en bas.

---

## ✅ Contexte (pour comprendre)

Les 6 en-têtes de sécurité sont désormais bien servis. Restent 2 points :

1. **La CSP bloque les 8 styles `inline` du HTML** : la directive `style-src` n'autorise pas l'inline, donc le navigateur refuse les attributs `style="..."` de `index.html` (notamment un `style="display:none"` → un élément censé être caché s'affiche). La CSP apparaît **2 fois** dans le fichier (bloc `server` ≈ ligne 65, bloc `location ~* \.html$` ≈ ligne 110) et doit être corrigée **aux deux endroits**.

2. **Le `ssl_stapling` génère un warning inutile** : Let's Encrypt a retiré l'OCSP de ses certificats, donc cette directive ne sert plus à rien et affiche un warning à chaque reload.

---

## ✏️ MODIFICATION 1 — Autoriser les styles inline dans la CSP

Dans `nginx.conf`, remplacer **TOUTES les occurrences** (il y en a 2) de :

```
style-src 'self' https://cdn.jsdelivr.net https://fonts.googleapis.com
```

par :

```
style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com
```

> Seul l'ajout de `'unsafe-inline'` change. Le reste de la ligne CSP reste identique.
> ✅ Vérifier après coup : `grep -c "unsafe-inline" nginx.conf` doit retourner **2**.

---

## ✏️ MODIFICATION 2 — Retirer `ssl_stapling` (warning inutile)

Dans `nginx.conf`, **supprimer ces 2 lignes** (dans le bloc `server` HTTPS principal, ≈ lignes 52-53) :

```
    ssl_stapling        on;
    ssl_stapling_verify on;
```

> Laisser les lignes `resolver ...` et `resolver_timeout ...` en place (sans danger).
> ✅ Vérifier après coup : `grep -c "ssl_stapling" nginx.conf` doit retourner **0**.

---

## 📦 Après les modifications — Commit

```bash
git add nginx.conf
git commit -m "fix(nginx): CSP autorise les styles inline + retrait ssl_stapling (OCSP retiré par Let's Encrypt)"
git push origin main
```

---

## 🚀 Déploiement sur le serveur Scaleway (en SSH)

```bash
cd /var/www/mandatoryshield.com
git pull origin main
sudo nginx -t && sudo systemctl reload nginx
```

> Le `nginx.conf` est lié par symlink à `/etc/nginx/sites-available/mandatoryshield`,
> donc le `git pull` suffit — pas besoin de recopier le fichier.

---

## 🔍 Vérification finale

### 1. La CSP servie contient bien `'unsafe-inline'`
```bash
curl -sI https://mandatoryshield.com | grep -i content-security-policy
```
→ doit afficher `... style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net ...`

### 2. Plus de warning au reload
Le message `"ssl_stapling" ignored...` ne doit plus apparaître après `nginx -t`.

### 3. Console navigateur propre
Ouvrir https://mandatoryshield.com → F12 → onglet **Console** :
→ plus aucune erreur `Refused to apply inline style because it violates CSP`.
→ vérifier visuellement que l'élément `display:none` est bien re-caché.

### 4. Re-scanner
→ relancer **https://securityheaders.com** (viser A / A+)
→ optionnel : **https://www.ssllabs.com/ssltest/** (note SSL)

---

## 💡 Alternative plus propre (optionnel — Option B)

Plutôt que `'unsafe-inline'` (qui affaiblit légèrement la CSP), on peut **déplacer les 8 styles inline de `index.html` dans `style.css`** (sous forme de classes) et garder la CSP stricte sans `'unsafe-inline'`. C'est l'idéal pour une entreprise de cybersécurité, mais ça demande de toucher au HTML + CSS. À faire dans un second temps si souhaité.

---

**Créé le :** 31 mai 2026
**Statut attendu après application :** A/A+ sur securityheaders.com + rendu HTML correct
