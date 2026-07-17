# Refactoring Site Web — Mandatory Shield Company
**ShieldAD v3.4.0 — Mai 2026**
*Pierre-Antoine Rouhaud (CEO) & Raphaël Berki (CTO)*

> Ce document est le référentiel unique pour la mise à jour des trois versions linguistiques du site (FR / EN / NL). Chaque section indique : ce qui est incorrect aujourd'hui, la valeur correcte à appliquer, et si la correction vaut pour les 3 langues.

---

## 1. Données produit — Chiffres à corriger partout

Ces valeurs apparaissent sur les pages d'accueil, pages produit, pages tarifs et FAQ. Toute incohérence entre les trois langues sur ces points est une erreur critique.

### 1.1 Nombre de contrôles

| Emplacement probable | Valeur incorrecte | Valeur correcte | Langues |
|---|---|---|---|
| Hero / tagline | "110 contrôles" | **286 contrôles** | FR / EN / NL |
| Hero / tagline | "~165 contrôles" | **286 contrôles** | FR / EN / NL |
| Hero / tagline | "192 contrôles" | **286 contrôles** | FR / EN / NL |
| Page produit — on-prem | "165 contrôles on-prem" | **196 contrôles on-prem** | FR / EN / NL |
| Page produit — cloud | "27 contrôles cloud" | **90 contrôles cloud (AADS)** | FR / EN / NL |
| Page produit — total | toute valeur < 286 | **286 contrôles total** | FR / EN / NL |

**Décompte officiel v3.4 :**
- 196 contrôles on-prem (190 automatiques + 6 INFO documentaires DORA)
- 90 contrôles cloud AADS (55 Entra ID + 15 AADS + 12 EXO + 8 SPO)
- **Total : 286 contrôles**

### 1.2 Nombre de domaines de contrôle

| Emplacement probable | Valeur incorrecte | Valeur correcte | Langues |
|---|---|---|---|
| Page produit | "22 domaines" | **26 domaines** | FR / EN / NL |

> v3.4 a ajouté 4 nouveaux domaines : PER (Persistance), HDC (Hardening DC), FGPP, RODC.

### 1.3 Nombre de rapports

| Emplacement probable | Valeur incorrecte | Valeur correcte | Langues |
|---|---|---|---|
| Page produit / tarifs | "4 rapports" | **7 rapports** | FR / EN / NL |

**Les 7 rapports officiels :**
1. Rapport CEO / Direction
2. Rapport IT Manager
3. Rapport Auditeur (NIS2 / ISO / DORA)
4. Rapport DPO (RGPD)
5. Rapport RSSI
6. Rapport Remédiation (SysAdmin)
7. Rapport Scoring (SCO)

> Rapport Forêt consolidé généré en supplément si multi-domaines détecté.

### 1.4 Version du logiciel

| Emplacement | Valeur incorrecte | Valeur correcte | Langues |
|---|---|---|---|
| Partout | "v3.3", "v3.2", "v3.1" | **v3.4.0** | FR / EN / NL |

---

## 2. Tarifs — Page pricing

### 2.1 Structure tarifaire officielle (réunion 25/05/2026)

| Plan | Prix annuel HT | Prix mensuel HT | Engagement |
|---|---|---|---|
| **One-Shot** | **2 400 €** | — | Ponctuel, sans abonnement |
| **Essential** | **6 900 €** | 575 € | 12 mois minimum |
| **Professional** | **14 900 €** | 1 242 € | 12 mois minimum |

**Modalités de paiement à afficher :**
- Acompte : 10 %
- Solde : 50 % à la livraison des premiers rapports + 50 % à la livraison des rapports finaux
- Délai de paiement : 30 jours fin de mois
- Facturation abonnement : **trimestrielle**

### 2.2 Contenu des plans

**One-Shot**
- Scan complet on-prem + Azure (AADS)
- Tous les rapports (7)
- Support multi-domaines / forêt
- Livraison unique, pas d'abonnement

**Plan Essential**
- One-Shot + rapport de tendance (évolution dans le temps)
- Accès aux mises à jour du logiciel
- Cible : PME 20–200 utilisateurs

**Plan Professional**
- Tout Essential
- ShieldConnect : 6 connecteurs SIEM automatiques (export JSON/CEF)
- Accès premium aux mises à jour produit
- Cible : ETI 200–800 utilisateurs + PME avancées

> **Attention :** Ne pas afficher les fonctionnalités "ShieldGraph", "ShieldWatch", "ShieldScore+" comme disponibles — ces modules sont en roadmap v4.0 (Q3–Q4 2026), pas encore livrés.

### 2.3 Pack MSP (à afficher sur la page partenaires)

| Package | Audits inclus | Prix HT | Prix / audit | Remise |
|---|---|---|---|---|
| Pack MSP 5 | 5 audits | 9 500 € | 1 900 € | -21 % |
| Pack MSP 10 | 10 audits | 17 000 € | 1 700 € | -29 % |
| Pack MSP 20 | 20 audits | 30 000 € | 1 500 € | -37 % |
| Pack MSP 50 | 50 audits | 62 500 € | 1 250 € | -48 % |

### 2.4 Programme revendeur

| Niveau | Volume annuel | Remise |
|---|---|---|
| Partenaire Silver | 1 à 5 clients/an | 15 % |
| Partenaire Gold | 6 à 15 clients/an | 25 % |
| Partenaire Platinum | 16+ clients/an | 35 % |

---

## 3. Prérequis — Page téléchargement / documentation

La section prérequis doit être entièrement réécrite dans les 3 langues. L'EXE est **auto-suffisant** — le client n'installe rien du code ShieldAD.

### FR — Prérequis (version site)

**Indispensable pour lancer ShieldAD :**
- Windows 10/11 (64 bits) ou Windows Server 2016 / 2019 / 2022
- Windows PowerShell 5.1 (inclus nativement — ne pas confondre avec PowerShell 7)
- Module RSAT — Outils Active Directory :
  - Windows 10/11 : Paramètres › Fonctionnalités facultatives › *RSAT : Services de domaine AD*
  - Windows Server : `Install-WindowsFeature RSAT-AD-PowerShell`
- Poste membre du domaine Active Directory à auditer
- Compte avec droits de lecture AD (Domain Admin recommandé)
- Lancer l'EXE en tant qu'administrateur (demandé automatiquement)

**Pour le scan Azure / Entra ID (optionnel) :**
- Module PowerShell MSAL.PS : `Install-Module MSAL.PS -Scope CurrentUser`
- .NET Framework 4.6.1+ (natif sur Windows 10 / Server 2016+)
- Compte Azure avec permissions Graph en lecture seule sur le tenant

### EN — Prerequisites (website version)

**Required to run ShieldAD:**
- Windows 10/11 (64-bit) or Windows Server 2016 / 2019 / 2022
- Windows PowerShell 5.1 (built-in — do not use PowerShell 7)
- RSAT — Active Directory Tools:
  - Windows 10/11: Settings › Optional features › *RSAT: Active Directory DS Tools*
  - Windows Server: `Install-WindowsFeature RSAT-AD-PowerShell`
- Machine joined to the Active Directory domain to audit
- Account with AD read rights (Domain Admin recommended)
- Run the EXE as administrator (prompted automatically)

**For Azure / Entra ID scan (optional):**
- PowerShell module MSAL.PS: `Install-Module MSAL.PS -Scope CurrentUser`
- .NET Framework 4.6.1+ (built-in on Windows 10 / Server 2016+)
- Azure account with read-only Graph permissions on the tenant

### NL — Vereisten (websiteversie)

**Vereist om ShieldAD te starten:**
- Windows 10/11 (64-bit) of Windows Server 2016 / 2019 / 2022
- Windows PowerShell 5.1 (ingebouwd — geen PowerShell 7 gebruiken)
- RSAT — Active Directory-hulpprogramma's:
  - Windows 10/11: Instellingen › Optionele functies › *RSAT: AD DS-hulpprogramma's*
  - Windows Server: `Install-WindowsFeature RSAT-AD-PowerShell`
- Apparaat lid van het te auditen Active Directory-domein
- Account met AD-leesrechten (Domain Admin aanbevolen)
- EXE uitvoeren als beheerder (wordt automatisch gevraagd)

**Voor Azure / Entra ID-scan (optioneel):**
- PowerShell-module MSAL.PS: `Install-Module MSAL.PS -Scope CurrentUser`
- .NET Framework 4.6.1+ (standaard op Windows 10 / Server 2016+)
- Azure-account met alleen-lezen Graph-machtigingen op de tenant

---

## 4. Couverture réglementaire — Page conformité

### 4.1 Référentiels couverts (à afficher uniformément)

| Référentiel | Couverture v3.4 | Langues |
|---|---|---|
| NIS2 (Art. 21) | ~90 % | FR / EN / NL |
| ISO/IEC 27001:2022 | ~78 % | FR / EN / NL |
| CIS Controls v8 | ~83 % | FR / EN / NL |
| ANSSI | ~75 % | FR / EN / NL |
| RGPD (Art. 32) | Évalué (10 articles scorés) | FR / EN / NL |
| DORA (EU 2022/2554) | ~55 % (auto) | FR / EN / NL |

> **DORA** : applicable aux entités financières UE uniquement. Ne pas présenter comme couverture universelle.

### 4.2 Formulation légale obligatoire (disclaimer à conserver sur toutes les pages)

**FR :** "ShieldAD fournit des preuves de contrôles techniques et ne constitue pas une certification NIS2, ISO 27001 ou RGPD. La conformité réglementaire requiert une évaluation documentaire complémentaire par un auditeur qualifié."

**EN :** "ShieldAD provides evidence of technical controls and does not constitute NIS2, ISO 27001 or GDPR certification. Regulatory compliance requires additional documentary assessment by a qualified auditor."

**NL :** "ShieldAD levert bewijs van technische controles en vormt geen NIS2-, ISO 27001- of AVG-certificering. Regelgevende conformiteit vereist aanvullende documentaire beoordeling door een gekwalificeerde auditor."

---

## 5. Informations entreprise — Vérifications à faire

### 5.1 Données légales

| Champ | Valeur correcte | À vérifier |
|---|---|---|
| Nom légal | The Mandatory Shield Company SRL | Cohérence FR/EN/NL |
| Statut | SRL (en cours de constitution) | Mettre à jour dès immatriculation |
| Pays | Belgique — Région de Bruxelles-Capitale | — |
| Email contact | contact@mandatoryshield.eu | Vérifier l'email affiché (certains documents montrent `.com`) |
| Site | mandatoryshield.com | Cohérence — ne pas mélanger `.com` et `.eu` |
| Fondateurs | Pierre-Antoine Rouhaud (CEO) & Raphaël Berki (CTO) | Orthographe avec accent : **Raphaël** |

> **Point critique :** Certains documents internes utilisent `legal@mandatoryshield,com` (virgule au lieu du point). Corriger partout sur le site en `contact@mandatoryshield.eu`.

### 5.2 Orthographe des noms — règle universelle

| Nom | Orthographe correcte | Erreurs fréquentes à corriger |
|---|---|---|
| Raphaël Berki | **Raphaël** (avec tréma) | "Raphael" sans tréma |
| Pierre-Antoine Rouhaud | **Pierre-Antoine** (avec tiret) | "Pierre Antoine" sans tiret |

---

## 6. Page "À propos" / "About" / "Over ons"

### 6.1 Description de l'activité — version trilingue officielle

**FR :**
Mandatory Shield Company développe ShieldAD, la première solution d'audit Active Directory conçue pour les PME et ETI européennes. ShieldAD génère en moins de 5 minutes un rapport complet couvrant 286 contrôles de sécurité, aligné NIS2, ISO 27001, CIS et RGPD, avec des scripts de remédiation PowerShell prêts à l'emploi. Aucune donnée ne quitte l'infrastructure du client — tout fonctionne en local, en lecture seule.

**EN :**
Mandatory Shield Company develops ShieldAD, the first Active Directory audit solution designed for European SMEs and mid-sized companies. ShieldAD produces a complete report in under 5 minutes covering 286 security controls, aligned with NIS2, ISO 27001, CIS and GDPR, including ready-to-use PowerShell remediation scripts. No data leaves the client's infrastructure — everything runs locally, in read-only mode.

**NL :**
Mandatory Shield Company ontwikkelt ShieldAD, de eerste Active Directory-auditoplossing ontworpen voor Europese kmo's en middelgrote bedrijven. ShieldAD genereert in minder dan 5 minuten een volledig rapport met 286 beveiligingscontroles, afgestemd op NIS2, ISO 27001, CIS en AVG, inclusief kant-en-klare PowerShell-herstelscripts. Geen gegevens verlaten de infrastructuur van de klant — alles werkt lokaal, in alleen-lezen modus.

---

## 7. Page Produit — Fonctionnalités

### 7.1 Fonctionnalités disponibles en v3.4 (à afficher)

- Scan Active Directory on-premise — 196 contrôles, 26 domaines
- Scan hybride Azure / Entra ID — 90 contrôles (EXO, SPO, AADS)
- 7 rapports HTML/PDF : CEO, IT Manager, Auditeur, DPO, RSSI, Remédiation, Scoring
- Rapport consolidé forêt multi-domaines
- Scripts PowerShell de remédiation par contrôle
- Multilingue natif : Français, English, Nederlands
- Aucune installation — 1 seul fichier EXE
- Zéro envoi de données — local uniquement, lecture seule
- Scoring pondéré par sévérité (CRITIQUE / ÉLEVÉE / MOYENNE)
- Historique des scans et rapport de tendance (Essential + Professional)
- Profil client personnalisable (exclusions, seuils, comptes VIP)
- ShieldConnect v1.0 — Export JSON/CEF vers SIEM (Professional uniquement)

### 7.2 Fonctionnalités en roadmap — NE PAS afficher comme disponibles

Ces fonctionnalités sont prévues en v4.0 (Q3–Q4 2026) ou ultérieur :

- ShieldGraph — graphe interactif des chemins d'attaque
- ShieldWatch — surveillance comportementale Event IDs AD
- ShieldScore+ — scoring granulaire par identité / serveur / service métier
- Simulation d'impact (sandbox AD)
- Mode MSP / multi-clients (interface consolidée)
- API REST v1 (intégration ITSM)
- ShieldDORA — rapport DORA complet institutions financières

---

## 8. Terminologie — Cohérence trilingue obligatoire

Utiliser ces traductions de manière uniforme sur tout le site.

| FR | EN | NL |
|---|---|---|
| Audit Active Directory | Active Directory audit | Active Directory-audit |
| Contrôle de sécurité | Security control | Beveiligingscontrole |
| Remédiation | Remediation | Remediatie |
| Conformité | Compliance | Conformiteit |
| Rapport | Report | Rapport |
| Domaine | Domain | Domein |
| Contrôleur de domaine | Domain Controller | Domeincontroller |
| Compte privilégié | Privileged account | Bevoorrecht account |
| Lecture seule | Read-only | Alleen-lezen |
| PME | SME | KMO |
| ETI | Mid-sized company | Middelgroot bedrijf |
| Plan Essential | Essential Plan | Essential Plan |
| Plan Professional | Professional Plan | Professional Plan |
| Scan ponctuel | One-shot audit | Eenmalige audit |
| Données souveraines | Sovereign data | Soevereine gegevens |

---

## 9. Checklist de validation avant mise en ligne

Vérifier chaque point dans les 3 langues avant publication.

### Données produit
- [ ] Nombre de contrôles : **286** affiché partout (FR / EN / NL)
- [ ] Contrôles on-prem : **196** — contrôles cloud : **90**
- [ ] Nombre de domaines : **26**
- [ ] Nombre de rapports : **7**
- [ ] Version : **v3.4.0**

### Tarifs
- [ ] One-Shot : **2 400 €**
- [ ] Essential : **6 900 €/an** — **575 €/mois**
- [ ] Professional : **14 900 €/an** — **1 242 €/mois**
- [ ] Modalités de paiement affichées (acompte 10 %, délai 30j fin de mois)
- [ ] Facturation trimestrielle mentionnée

### Prérequis
- [ ] PS 5.1 et RSAT listés comme requis
- [ ] "Un seul EXE, aucune installation" mentionné
- [ ] Prérequis Azure marqués comme optionnels
- [ ] Traduction correcte dans les 3 langues

### Entreprise
- [ ] Email unifié : **contact@mandatoryshield.eu** (pas de virgule, pas de .com mélangé)
- [ ] "Raphaël" avec tréma partout
- [ ] "Pierre-Antoine" avec tiret partout
- [ ] Disclaimer légal présent sur les pages conformité et produit

### Fonctionnalités
- [ ] ShieldGraph / ShieldWatch / ShieldScore+ absents des pages produit v3.4
- [ ] ShieldConnect marqué "Professional uniquement"
- [ ] DORA marqué "entités financières UE"

### Langue
- [ ] Aucun terme FR laissé dans la version EN
- [ ] Aucun terme FR laissé dans la version NL
- [ ] "KMO" utilisé (NL) et non "PME" ni "SME"
- [ ] "AVG" utilisé (NL) et non "RGPD" ni "GDPR"

---

*Mandatory Shield Company — Pierre-Antoine Rouhaud & Raphaël Berki — © 2026 — CONFIDENTIEL*
*Référentiel de mise à jour site web — v1.0 — Mai 2026*
