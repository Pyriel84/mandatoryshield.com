# 🛠️ Tâche pour Claude (VS Code) — Corrections juridiques & factuelles du site

**Dépôt :** Pyriel84/mandatoryshield.com
**Fichiers concernés :** `index.html` (EN), `index-fr.html` (FR), `index-nl.html` (NL), `legal.html` (FR), `legal-en.html` (EN), `legal-nl.html` (NL)
**Contexte :** la société est **en cours de création**. Aucune vente avant immatriculation officielle. Ces corrections visent à supprimer les claims contestables et une erreur factuelle, avant lancement.

> ⚠️ Appliquer chaque correction dans **les 3 langues**. Le texte ci-dessous donne l'exact EN/FR ; pour le NL, trouver l'équivalent dans `index-nl.html` / `legal-nl.html` et appliquer la même logique.
> ⚠️ Ne PAS toucher au code JS/CSS ni à la structure. Uniquement le texte des contenus.

---

## ✅ Déjà OK (ne rien faire)
- Nombre de contrôles cohérent (286 partout) ✓
- Aucune fausse note client (`aggregateRating` absent) ✓
- Numéros de directives corrects (NIS2 = 2022/2555, DORA = 2022/2554, RGPD = 2016/679) ✓
- Hébergeur Scaleway (France/UE) mentionné ✓

---

## 🟠 FIX 1 — Erreur factuelle : numérotation ISO 27001:2022 (PRIORITAIRE)

**Problème :** le site cite les annexes `A.8, A.9, A.12, A.18` en les attribuant à **ISO 27001:2022**. Or cette numérotation est celle de la version **2013**. La révision **2022** a restructuré l'Annexe A en **93 contrôles / 4 thèmes** : `A.5` (Organisationnel), `A.6` (Humain), `A.7` (Physique), `A.8` (Technologique). Les `A.9 / A.10 / A.12 / A.16 / A.18` **n'existent plus**.

> 💡 Le produit possède déjà sa vraie cartographie ISO 27001:2022 en interne (c'est ce que mappent les 286 contrôles). **Utiliser cette cartographie réelle.** Les références ci-dessous sont des équivalences correctes à vérifier.

### 1a. FAQ — réponse conformité (3 langues)

**EN — `index.html`**
- Chercher : `and to Annexes A.8, A.9, A.12, A.18 of ISO 27001:2022`
- Remplacer par : `and to the relevant Annex A controls of ISO/IEC 27001:2022 (93 controls across the Organizational, People, Physical and Technological themes — A.5 to A.8)`

**FR — `index-fr.html`**
- Chercher : `Annexes A.8, A.9, A.12, A.18 d'ISO 27001:2022`
- Remplacer par : `aux contrôles pertinents de l'Annexe A d'ISO/IEC 27001:2022 (93 mesures réparties en 4 thèmes — Organisationnel, Humain, Physique et Technologique, A.5 à A.8)`

**NL — `index-nl.html`**
- Chercher : `A.8, A.9, A.12, A.18 van ISO 27001:2022`
- Remplacer par l'équivalent NL : `de relevante Bijlage A-maatregelen van ISO/IEC 27001:2022 (93 maatregelen verdeeld over de thema's Organisatorisch, Mensen, Fysiek en Technologisch — A.5 t/m A.8)`

### 1b. Cartes de la section « Conformité / Compliance » (3 langues)

Remplacer les références 2013 par les équivalents 2022 (à confirmer avec la cartographie interne) :

| Libellé | Avant (2013) | Après (2022) |
|---------|--------------|--------------|
| Access control / Contrôle d'accès | `(A.9)` | `(A.5.15)` |
| Cryptography / Cryptographie | `(A.10)` | `(A.8.24)` |
| Operations security / Sécurité de l'exploitation | `(A.12)` | `(A.8.15–A.8.16)` |
| Incident management / Gestion des incidents | `(A.16)` | `(A.5.24)` |

> EN : `Access control (A.9)` → `Access control (A.5.15)`, `Cryptography (A.10)` → `Cryptography (A.8.24)`, `Operations security (A.12)` → `Operations security (A.8.15–A.8.16)`, `Incident management (A.16)` → `Incident management (A.5.24)`.
> Appliquer la même substitution en FR et NL.
> ✅ Vérif : `grep -E "A\.(9|10|12|16|18)\)" index*.html` ne doit plus rien retourner pour les contrôles ISO.

---

## 🟠 FIX 2 — Claim de conformité « is compliant? Yes »

**Problème :** un logiciel ne « est » pas conforme NIS2 / certifié ISO 27001 (c'est un statut d'organisation, pas de produit). Le « Yes » peut être lu comme trompeur.

**Action (3 langues) :** reformuler la **question** de la FAQ et le **début de réponse**.

**EN — `index.html`**
- Question — chercher : `Is ShieldAD NIS2 and ISO 27001 compliant?`
  remplacer par : `Does ShieldAD help with NIS2 and ISO 27001 compliance?`
- Réponse — chercher le `Yes.` en tête de cette réponse,
  remplacer par : `Yes. ShieldAD helps you build your compliance evidence:` (puis la suite « Each of ShieldAD's 286 controls is mapped... » est conservée)
- **Ajouter à la fin de la réponse** : `ShieldAD does not, by itself, confer NIS2 compliance or ISO 27001 certification — these require an organizational assessment by a qualified auditor.`

**FR — `index-fr.html`**
- Question : `ShieldAD est-il conforme NIS2 et ISO 27001 ?` → `ShieldAD aide-t-il à la conformité NIS2 et ISO 27001 ?`
- Réponse début : `Oui.` → `Oui. ShieldAD vous aide à constituer vos preuves de conformité :`
- Ajouter à la fin : `ShieldAD ne confère pas à lui seul la conformité NIS2 ni la certification ISO 27001 — celles-ci nécessitent une évaluation organisationnelle par un auditeur qualifié.`

**NL — `index-nl.html`** : appliquer l'équivalent (verbe « helpt bij » au lieu de « is conform », + phrase de disclaimer équivalente).

> 💡 Verbes sûrs partout : *helps with / supports / maps to / provides evidence for / aligns with* — au lieu de *is compliant / certified*.

---

## 🟡 FIX 3 — Superlatifs à étayer ou adoucir

**Problème :** claims absolus contestables (publicité trompeuse, Livre VI CDE) si non prouvables.

**Action :** soit conserver SI tu peux les prouver (garder les preuves), soit adoucir comme suit, dans les 3 langues :

| Avant | Après (option prudente) |
|-------|--------------------------|
| `the first European Active Directory audit platform` | `a pioneering European Active Directory audit platform` |
| `la première plateforme européenne d'audit Active Directory` | `une plateforme européenne pionnière d'audit Active Directory` |
| `The only platform combining...` | `One of the few platforms combining...` |
| `La seule plateforme qui combine...` | `L'une des rares plateformes qui combine...` |
| `A market first.` | `An innovative approach.` |
| (NL équivalents) | idem logique |

> ✅ Vérif : `grep -iE "the only|la seule|market first|première plateforme|first european" index*.html` — ne doit subsister que ce que tu peux prouver.

---

## 🟡 FIX 4 — Claims « données » à nuancer (module Azure)

**Problème :** `Zero data transmitted — 100% on-premise` est vrai pour le scan AD on-premise, mais le **module AADS (Azure / Entra ID)** se connecte à Microsoft Graph (internet requis). Le claim absolu doit être nuancé.

**Action (3 langues) — bullet du hero :**

**EN — `index.html`**
- Chercher : `Zero data transmitted — 100% on-premise`
- Remplacer par : `Zero AD data sent to our servers — on-premise scan`

**FR — `index-fr.html`**
- Chercher : `Zéro donnée transmise - 100% on-premise`
- Remplacer par : `Zéro donnée AD envoyée à nos serveurs — scan on-premise`

**NL — `index-nl.html`** : équivalent (« Geen AD-data naar onze servers — on-premise scan »).

> 💡 Le mot **« guaranteed / garanti »** dans la FAQ (« guaranteed architecturally ») est juridiquement engageant : envisager `by design / par conception`. Optionnel.
> 💡 S'assurer que la FAQ « prérequis » mentionne bien que le module Azure nécessite un accès internet (c'est déjà le cas — à conserver).

---

## 🟡 FIX 5 — Pages légales : remplacer les placeholders par une mention « société en formation »

**Problème :** des placeholders bruts sont visibles publiquement : `[À COMPLÉTER lors de l'acte constitutif]`, `[À compléter avant mise en production commerciale]`, `[To be completed upon incorporation deed]`, `[To be completed before commercial production]`, champs BCE/TVA vides.

**Action — `legal.html` (FR) :**
- Remplacer le bloc identification (numéros vides + placeholders) par :
```
Mandatory Shield SRL (société en formation)
Siège social : Bruxelles, Belgique (Union Européenne)
Numéro d'entreprise BCE : en cours d'attribution
Numéro de TVA : en cours d'attribution
Aucune transaction commerciale ne sera réalisée avant l'immatriculation officielle de la société.
```
- Supprimer toutes les occurrences de `[À COMPLÉTER...]` / `[À compléter...]`.

**Action — `legal-en.html` (EN) :**
```
Mandatory Shield SRL (company in formation)
Registered office: Brussels, Belgium (European Union)
BCE company number: being assigned
VAT number: being assigned
No commercial transaction will be carried out before the company's official registration.
```
- Supprimer toutes les occurrences de `[To be completed...]`.

**Action — `legal-nl.html` (NL) :** équivalent (« vennootschap in oprichting », « wordt toegekend »).

> ✅ Vérif : `grep -rE "\[À COMPLÉTER|\[À compléter|To be completed|XX\.XXX\.XXX|XXX" legal*.html` ne doit plus rien retourner.
> ⚠️ Dès que la société est immatriculée : remplacer « en cours d'attribution » par les vrais numéros BCE + TVA, dans les 3 langues.

---

## 📦 Commit & déploiement

```bash
git add index.html index-fr.html index-nl.html legal.html legal-en.html legal-nl.html
git commit -m "legal: ISO 27001:2022 corrigé, claims conformité reformulés, superlatifs adoucis, claims data nuancés, mentions société en formation"
git push origin main
```

Sur le serveur :
```bash
cd /var/www/mandatoryshield.com && git pull origin main
# (pas de reload nginx nécessaire : seuls des fichiers HTML ont changé)
```

---

## 🔍 Vérifications finales

```bash
# 1. Plus de numérotation ISO 2013
grep -E "A\.(9|10|12|16|18)\)" index*.html
# 2. Plus de placeholders légaux
grep -E "\[À COMPLÉTER|\[À compléter|To be completed|XXX" legal*.html
# 3. Plus de "is compliant" sec
grep -iE "is .{0,15}compliant|est .{0,15}conforme NIS2" index*.html
```
Les 3 commandes ne doivent (presque) plus rien retourner.

> ⚖️ Rappel : ceci couvre les points repérés lors de la relecture. Avant lancement commercial, faire valider l'ensemble (CGV, RGPD, claims) par un **avocat belge** — ce document n'est pas un avis juridique.

---

**Créé le :** 31 mai 2026
