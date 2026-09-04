# ShieldAD™ v4.0.0 — Description Complète & Infrastructure
## Mandatory Shield Company © 2026
**Fondateurs : Pierre-Antoine Rouhaud (CEO) & Raphaël Berki (CTO)**  
**mandatoryshield.com — Document confidentiel interne R&D**  
**Dernière vérification du code : 2026-09-03** (comptages contrôles ré-extraits directement du code source par grep/parsing — voir méthodologie en fin de document ; ajout du §15 ShieldGraph/Tauri le 2026-07-17 suite à la migration WPF → Tauri v2 constatée dans l'arbre de travail ; mise à jour 2026-07-22 : +26 contrôles techniques, correction de l'anomalie de duplication `ShieldAD.ps1`, unification de version résolue ; mise à jour 2026-08-04 : comptage des contrôles désormais automatisé (AST) — voir §1ter —, retrait du prototype ShieldGraph autonome, retrait de l'ancien schéma de licence par clé/checksum, nouveau module IAM — Access Governance, nouveau module ShieldConnect côté Tauri, voir encart et §1ter ci-dessous ; **mise à jour 2026-08-17 : licence RSA-4096 portée nativement en Rust avec gating par module (remplace/complète la vérification `.lic` du launcher v3.x), module de mise à jour applicatif (infra Scaleway, signature Authenticode), dette de test ShieldGraph soldée contre un vrai domaine AD (fix ACL + sur-classification ATT&CK 57→6 chemins), exposition financière réglementaire chiffrée en euros, trilingue complété sur les 152 contrôles cloud, rollback pour 6 contrôles AD réversibles, +3 contrôles CVE (`ADCS-23`, `ADCS-24`, `K-15`) — voir §1quater ci-dessous** ; **mise à jour 2026-08-25 : audit de complétude CVE dédié à ShieldGraph (6 phases / 11 commits, 36 → 55 règles ATT&CK, `ATTCK-037` à `ATTCK-055`), +13 contrôles Worker (`ADCS-25`, `ADCS-26`, `K-16`, `K-17`, `C-17`, `LDAP-01` (nouvelle famille), `DC-12` à `DC-19`) et +1 contrôle cloud (`AZ-04m`, protection SyncJacking), passage de la licence à l'import self-service (retrait du build par client), nouvel outil interne ShieldAD License Manager, build démo (`npm run build:demo`), carte de risque exposée en JSONL pour le Top 3 risques Direction, assignation de remédiation par département — voir §1quinquies ci-dessous** ; **mise à jour 2026-09-03 : remédiation guidée + ShieldPredict v1 (sandbox multi-nœuds, §1sexies-a), nouveau module ShieldGraph confiance/preuve par arête + dead ends + choke points pondérés + collecte AdminTo (§1sexies-c, complète §15.6), deux nouveaux modules de scan license-gated et non comptés dans le total ci-dessous — LDAP/OpenLDAP/FreeIPA (**59 contrôles**, `ShieldAD-LDAP.ps1`, §17) et AWS IAM multicloud (**89 contrôles**, `ShieldAD-AWS-IAM.ps1`, usage interne non commercialisé, §18) —, 22+2 tickets UI/UX livrés (palette de commandes, Trust Page, navigation clavier, etc., §1sexies-e), +15 contrôles cloud non annoncés dans leur commit (`AZ-01l..o`/`AZ-02m..o`/`AZ-03i`/`AZ-04n..q`/nouvelle famille `AZ-15`, 153→168, §1sexies-j), correctifs (crash `SV-05`, prérequis MSAL/Graph, Device Code Flow Azure, sidebar tronquée, rapport Azure absent du menu, onglets Direction/IT vides sur scan Azure seul), fermeture de l'app remplacée par un export explicite vers un dossier choisi — voir §1sexies ci-dessous**)

> ℹ️ **Unification de version (2026-07-22).** Le moteur partagé (`ShieldAD-Worker.ps1`, `ShieldAD.ps1`, `ShieldAD-BUILD.ps1`, `ShieldAD-LAUNCHER.ps1`, `ShieldAD-CertificationMapping.ps1`, `ShieldAD-ComplianceMapper.ps1`, `ShieldAD-ComplianceWizard.ps1`) suit désormais **4.0.0**, le même numéro que l'app Tauri (`package.json`) — décision explicite : plus de sous-lignée `3.x` séparée pour ce moteur. Avant cette unification, une vraie collision de numérotation existait (`ShieldAD.ps1` à 3.8.0, `ShieldAD-Worker.ps1`/`ShieldAD-CertificationMapping.ps1` à 3.9.1 en interne, `CHANGELOG.md` ayant réutilisé "3.9.0"/"3.10.0" — déjà pris par le Worker pour un tout autre changement — pour désigner les 26 nouveaux contrôles ci-dessous). C'est corrigé : `Set-Version.ps1` a été exécuté manuellement (les 4 fichiers qu'il gère + les 3 fichiers hors périmètre qu'il ne synchronise pas), `WorkerExpectedHash` (`ShieldAD.ps1`) et `$WorkerHash` (`ShieldAD-LAUNCHER.ps1`, second contrôle d'intégrité séparé et jusque-là jamais resynchronisé par l'outil) recalculés depuis le `ShieldAD-Worker.ps1` final, et `CHANGELOG.md` consolidé en une seule entrée `[4.0.0]`. `ShieldAD.exe` compilé sur disque reste horodaté 2026-07-17 — antérieur à tous les changements de cette mise à jour — un rebuild (`ShieldAD-BUILD.ps1`) est nécessaire avant tout livrable client.

---

## TABLE DES MATIÈRES

1. [Présentation générale](#1-présentation-générale)
   - [1bis. Nouveautés depuis la dernière vérification (2026-07-17 → 2026-07-22)](#1bis-nouveautés-depuis-la-dernière-vérification-2026-07-17--2026-07-22)
   - [1ter. Nouveautés depuis la dernière vérification (2026-07-22 → 2026-08-04)](#1ter-nouveautés-depuis-la-dernière-vérification-2026-07-22--2026-08-04)
   - [1quater. Nouveautés depuis la dernière vérification (2026-08-04 → 2026-08-17)](#1quater-nouveautés-depuis-la-dernière-vérification-2026-08-04--2026-08-17)
   - [1quinquies. Nouveautés depuis la dernière vérification (2026-08-17 → 2026-08-24)](#1quinquies-nouveautés-depuis-la-dernière-vérification-2026-08-17--2026-08-24)
   - [1sexies. Nouveautés depuis la dernière vérification (2026-08-24 → 2026-09-03)](#1sexies-nouveautés-depuis-la-dernière-vérification-2026-08-24--2026-09-03)
2. [Inventaire des fichiers](#2-inventaire-des-fichiers)
3. [Architecture & flux d'exécution](#3-architecture--flux-dexécution)
4. [Interface WPF — ShieldAD.ps1](#4-interface-wpf--ShieldADps1)
5. [Moteur de scan on-prem — ShieldAD-Worker.ps1 (310 contrôles)](#5-moteur-de-scan-on-prem--310-contrôles)
6. [Module cloud — ShieldAD-AADS.ps1 (168 contrôles)](#6-module-cloud--168-contrôles)
7. [Rapports HTML générés (8 rapports)](#7-rapports-html-générés)
8. [Modules de support](#8-modules-de-support)
9. [Sécurité & cryptographie](#9-sécurité--cryptographie)
10. [Couverture réglementaire](#10-couverture-réglementaire)
11. [Localisation FR/EN/NL](#11-localisation-frenni)
12. [Variables globales](#12-variables-globales)
13. [Scalabilité garantie](#13-scalabilité-garantie)
14. [Disclaimer obligatoire](#14-disclaimer-obligatoire)
15. [ShieldGraph — Cartographie des chemins d'attaque (intégré à l'app Tauri v4)](#15-shieldgraph--cartographie-des-chemins-dattaque-intégré-à-lapp-tauri-v4)
16. [Module IAM — Access Governance (nouveau, 2026-08-04)](#16-module-iam--access-governance-nouveau-2026-08-04)
17. [Module LDAP / OpenLDAP / FreeIPA (nouveau, 2026-08-26)](#17-module-ldap--openldap--freeipa-nouveau-2026-08-26)
18. [Module AWS IAM — multicloud, usage interne (nouveau, 2026-08-31)](#18-module-aws-iam--multicloud-usage-interne-nouveau-2026-08-31)

---

## 1. Présentation générale

ShieldAD est un outil d'audit de sécurité **Active Directory** et **Microsoft 365/Azure** développé en PowerShell/WPF pour Windows. Il effectue une analyse en **lecture strictement non destructive** de l'infrastructure AD et génère des rapports HTML professionnels multi-audience.

**Chiffres clés (vérifiés directement sur le code source, pas sur les commentaires de changelog internes qui se sont révélés incohérents entre eux — voir §5) :**

| Métrique | Valeur |
|----------|--------|
| Contrôles on-prem (Worker.ps1) | **310** (255 `New-Ctrl` statiques + 55 contrôles documentaires générés dynamiquement en boucle — voir §1ter/§1quater/§1quinquies, méthode automatisée qui remplace le décompte manuel `Invoke-ADQuery` utilisé jusqu'au 2026-07-22 ; inchangé depuis le 2026-08-24 malgré le fix de crash `SV-05` du 2026-09-01, §1sexies-i) |
| Contrôles cloud (AADS.ps1) | **168** (décompte propre via `New-AADSCtrl "ID"`, aucun doublon ; 153 au 2026-08-24 (dont AZ-04k, AZ-04l, AZ-04m, AADS-16 — trilingue FR/EN/NL complété le 2026-08-14, §1quater-d) **+15 le 2026-09-02** — `AZ-01l..o`, `AZ-02m..o`, `AZ-03i`, `AZ-04n..q`, nouvelle famille `AZ-15` (Unités administratives) — ajoutés incidemment par un commit de correctif Device Code Flow, non annoncés dans son message, voir §1sexies-j) |
| Contrôles AWS (AWS-IAM.ps1, nouveau) | **89** (`New-AwsCtrl`, décompte automatisé — module interne, license-gated `SHIELDAWS`, **non commercialisé à ce jour**, voir §18/§1sexies-h) |
| Contrôles LDAP/OpenLDAP/FreeIPA (nouveau) | **59** (vérifié par grep direct des `-Id`/`Id=` dans `ShieldAD-LDAP.ps1` — ⚠️ **pas encore couvert par l'outil de comptage AST** (`scripts/Count-ShieldADControls.ps1` ne référence que Worker/AADS/AWS-IAM), donc absent de `docs/CONTROL-COUNTS.generated.md` et du total ci-dessous ; license-gated `SHIELDLDAP`, voir §17/§1sexies-b) |
| **Total contrôles (calculé automatiquement)** | **567** (310 on-prem + 168 cloud + 89 AWS) — ⚠️ **chiffre à ne plus recopier tel quel** : le total exact et à jour est calculé automatiquement à chaque commit touchant un Worker (`docs/CONTROL-COUNTS.generated.md`, `npm run count-controls`, régénéré le 2026-09-03 11:05:55) — voir §1ter/§1quater/§1quinquies/§1sexies. **N'inclut pas les 59 contrôles LDAP** (outil non étendu, voir ligne ci-dessus) — total réel incluant LDAP : 626, non vérifié par tooling |
| Rapports HTML générés | 8 (dont Utilisateurs à Risque ; le rapport PME/Quick Wins a été fusionné dans le rapport CEO — historiquement en interne "v3.9.0", cf. §7) |
| Langues supportées | 3 (FR / EN / NL) |
| Certifications couvertes | NIS2, ISO 27001/27002, DORA, ANSSI, RGPD, CIS v8 (+ Implementation Groups IG1/IG2/IG3 — désormais des Standards sélectionnables à part entière, pas seulement des champs de traçabilité, voir §1bis), CyFun (4 niveaux) |
| Environnement cible | Windows Server 2016+ avec RSAT |
| Volumétrie garantie | 50 000+ utilisateurs, scan < 10 min |
| Version produit shippée | **4.0.0** (`$AppVersion` dans `ShieldAD.ps1`/`ShieldAD-Worker.ps1`/`ShieldAD-BUILD.ps1`/`ShieldAD-LAUNCHER.ps1`/`ShieldAD-AADS.ps1`/`ShieldAD-CertificationMapping.ps1`/`ShieldAD-ComplianceMapper.ps1`/`ShieldAD-ComplianceWizard.ps1`, unifiés le 2026-07-22 — voir encart ci-dessus). `ShieldAD.exe` compilé sur disque reste antérieur à cette unification (build du 2026-07-17) — rebuild requis avant tout livrable |

**4 états par contrôle :** `PASS` | `WARN` | `FAIL` | `NOT_APPLICABLE`

**Note méthodologique :** un fichier `CHANGELOG.md` (format Keep a Changelog) existe désormais à la racine du dépôt et documente l'historique de version de 3.3.0 à 4.0.0 (consolidé le 2026-07-22, voir encart de versioning ci-dessus). C'est la source la plus fiable pour l'historique **fonctionnel** (quoi a été ajouté et pourquoi) — les commentaires "NOUVEAUTES" en en-tête de `ShieldAD-Worker.ps1` couvrent la même période mais leurs totaux cumulés d'une version à l'autre ne sont pas toujours cohérents entre eux (ex. l'entrée v3.4 affiche "~171 → 234" puis l'entrée v3.5 repart de "204 → 209"). Les chiffres de ce document sont **recomptés directement dans le code** (`New-Ctrl` / `New-AADSCtrl`), pas recopiés depuis les changelogs.

**Note version cloud (résolue le 2026-07-22) :** l'en-tête de `ShieldAD-AADS.ps1` affichait `Version : 3.6.0`, dérivé silencieusement depuis longtemps car `Set-Version.ps1` ne couvre pas ce fichier (toujours vrai — seuls Worker/ShieldAD/BUILD/LAUNCHER le sont). Resynchronisé manuellement à 4.0.0 avec le reste du moteur lors de l'unification de version ; à recaler manuellement à chaque `Set-Version.ps1` futur tant que le script ne le couvre pas nativement.

---

## 1bis. Nouveautés depuis la dernière vérification (2026-07-17 → 2026-07-22)

Cinq changements distincts constatés directement dans le code, tous non commités dans git à l'heure de cette relecture (`git status` : fichiers renommés `ADSecure-*` → `ShieldAD-*` non stagés/commités, voir aussi §15) :

### a) +26 contrôles techniques on-prem (`ShieldAD-Worker.ps1`)

Vérifiés par grep direct des appels `New-Ctrl` (aucune branche conditionnelle sur ces 26 IDs — contrairement à des contrôles plus anciens comme NPS-01, chacun n'apparaît qu'une seule fois dans le code) :

| Domaine | IDs ajoutés | Nombre | Thème |
|---|---|---|---|
| **ADCS** (extension 13→22) | `ADCS-14` à `ADCS-22` | 9 | ESC9 à ESC17 (Certipy 2.0+) — voir détail §5 famille ADCS |
| **TRUST** (nouveau domaine) | `TRUST-001` à `TRUST-006` | 6 | BloodHound v8 Trust Edges (SpecterOps, juin 2025) |
| **K** (extension 10→14) | `K-GHOSTSPN-001/002/003`, `K-RC4-001` | 4 | Ghost SPNs + Kerberos Reflection (CVE-2025-58726), dépréciation RC4 (CVE-2026-20833) |
| **DMSA** (nouveau domaine) | `DMSA-001` | 1 | BadSuccessor — dMSA Windows Server 2025 (Akamai, juillet 2026) |
| **ADFS** (nouveau domaine) | `ADFS-001/002/003` | 3 | Farm AD FS, CVE-2026-56155, ACL du conteneur DKM |
| **SEC** (extension 23→26) | `SEC-SHADOW-CREDS-001/002`, `SEC-ADSITE-ACL-001` | 3 | Shadow Credentials (`msDS-KeyCredentialLink`), ACL du conteneur AD Sites |

Chaque ID a sa traduction EN/NL (`$script:CtrlI18n`) et son libellé CEO (`$script:CEONames`). Mapping conformité mis à jour dans `ShieldAD-CertificationMapping.ps1` (v4.0.0 en interne) : les 26 IDs ajoutés à `CIS_IG3` ; `ADCS-14..22`, `TRUST-002/003/004`, `DMSA-001`, `ADFS-001..003`, `SEC-ADSITE-ACL-001` ajoutés à `ANSSI` (+17 IDs) ; `DMSA-001`, `K-GHOSTSPN-001`, `ADFS-002` ajoutés à `NIS2` (+3 IDs). Détail des 26 contrôles dans les tableaux de familles au §5.

Trois cas restent volontairement partiels (documentés comme tels dans le code, statut `INFO`/`WARN` avec renvoi vers revue manuelle ou ShieldGraph) : ESC12/`ADCS-17` (accès shell CA — énumération des administrateurs locaux + détection best-effort de HSM, pas un contrôle d'accès physique/réseau complet), ESC17/`ADCS-22` (synthèse des résultats ADCS-01..21 du même scan, pas une modélisation de graphe multi-CA/template/SPN/trust), `TRUST-005` (liste les Claims Transformation Policies existantes via `Get-ADClaimTransformPolicy`, l'analyse fine des règles reste manuelle).

### b) ISO 27002 et CIS IG1/IG2/IG3 promus en Standards sélectionnables à part entière

Jusqu'ici, `iso27002_ref` et `cis_ig` (§5) étaient de simples champs de traçabilité sur chaque contrôle, invisibles du Compliance Wizard et du Compliance Mapper. Ce n'est plus le cas :
- `ShieldAD-ComplianceWizard.ps1` (492 → 585 lignes) : cases à cocher dédiées `ISO27002`, `CIS_IG1`, `CIS_IG2`, `CIS_IG3` dans `$Global:ComplianceSelection`, en plus de `ISO27001`/`CIS` déjà existants
- `ShieldAD-ComplianceMapper.ps1` (605 → 676 lignes) : ces 4 clés deviennent filtrables comme n'importe quel autre standard (`NormFilter`), avec calcul de couverture % dédié
- `ShieldAD-Worker.ps1` : `ISO27002` tague désormais les ~13 contrôles techniques enrichis (§5, note famille ISO-DOC) + les 24 `ISO-DOC-*` (même pool de preuves qu'ISO27001, étiquette séparée) ; `CIS_IG1/IG2/IG3` sont cumulatifs — un contrôle IG1 compte aussi pour IG2 et IG3 — et dérivés du `cis_ig` déjà calculé en v3.8.0 (aucun nouveau calcul, juste une nouvelle exposition du champ existant)

### c) Anomalie de duplication de `ShieldAD.ps1` corrigée

La note de bas de page¹ du §2 (versions précédentes de ce document) signalait un bloc de ~4 500 lignes dupliqué octet pour octet dans `ShieldAD.ps1` (9 612 lignes affichées, ~4 900 lignes de contenu réel). **C'est corrigé** : le fichier fait maintenant 4 907 lignes / 230 KB (contre 9 612 lignes / 435 KB), `$AppVersion` n'apparaît plus qu'une seule fois dans le fichier. Cohérent avec l'estimation de contenu unique de la version précédente de ce document.

### d) ShieldGraph — moteur ATT&CK enrichi (voir détail §15)

`ShieldGraph_ATTCK_Rules.json` passe de la version 1.1 à 1.3 : +5 règles `ATTCK-017` à `ATTCK-021` (BadSuccessor, Ghost SPN/Kerberos Reflection, AD FS DKM, Shadow Credentials, AD Sites ACL Abuse — alignées sur le point (a) ci-dessus) puis +10 règles `ATTCK-022` à `ATTCK-031` (ESC9-ESC17, Trust Account Attack), pour un total de **31 règles** (`ATTCK-001` à `ATTCK-031`) au lieu des 12 citées dans la version précédente de ce document — ce chiffre de 12 était déjà obsolète au 07-17 (le fichier en comptait alors 16).

### e) Renommage global `ADSecure-*` → `ShieldAD-*`

Tous les fichiers du dépôt (scripts, JSON, dossiers `skills/`) ont été renommés du préfixe `ADSecure-` vers `ShieldAD-` depuis la dernière vérification — cohérent avec le nom de marque `ShieldAD™` déjà utilisé partout dans ce document. Renommage confirmé par `git status` (ancien préfixe en `AD`/supprimé, nouveau préfixe en `??`/non suivi) plutôt que par un commit — rien de tout cela n'est encore committé dans git au moment de cette relecture.

---

## 1ter. Nouveautés depuis la dernière vérification (2026-07-22 → 2026-08-04)

Contexte git : 2 commits sur `adsecurev3.7` depuis le point précédent (`fcafd1f` puis `c88d881`), suivis d'un gros lot de changements **non commités** dans l'arbre de travail actuel (nouveaux modules IAM et ShieldConnect notamment). Cette section documente les deux commits et l'arbre de travail ensemble.

### a) Comptage des contrôles entièrement automatisé — le vrai total était déjà 293/152, pas 222/153 (commit `c88d881`)

Le nombre de contrôles se désynchronisait silencieusement entre le code, l'appli et la doc : `CLAUDE.md` annonçait encore 222/153 alors que le code réel en comptait déjà **293 on-prem / 152 cloud** au moment du commit. Corrigé par un mécanisme entièrement automatisé, qui **remplace** la méthode `Invoke-ADQuery` (222) utilisée jusqu'ici dans ce document (§5) — celle-ci sous-comptait, car elle ignorait les contrôles documentaires générés dynamiquement en boucle (CIS-DOC, DORA, ISO-DOC, NIS2-DOC, RGPD, RGPD-DOC) :

- `Get-ShieldADRealControlCount` (`ShieldAD-Worker.ps1:13425`) / `Get-ShieldADRealCloudControlCount` (`ShieldAD-AADS.ps1:550`) : chaque Worker s'auto-analyse via l'AST PowerShell (`[System.Management.Automation.Language.Parser]::ParseFile` sur son propre `$PSCommandPath`), recense tous les appels `New-Ctrl`/`New-AADSCtrl` à ID littéral **et** les appels dynamiques (`$x.ID` dans une boucle `foreach`, tableau source résolu et compté), avec repli défensif sur le catalogue statique si le parsing échoue. C'est cette valeur qui alimente `controls_count` dans les événements JSONL `session_start`/`azure_session_start` — plus fiable qu'un regex ou qu'un catalogue statique partiel.
- `scripts/Count-ShieldADControls.ps1` (+ `npm run count-controls`) : même logique AST, exposée en outil externe, régénère `docs/CONTROL-COUNTS.generated.md` et `docs/control-counts.generated.json` (source de vérité à consulter pour le chiffre exact à tout instant — voir aussi l'encart correspondant dans `CLAUDE.md`).
- `.githooks/pre-commit` : relance ce comptage et l'embarque automatiquement dès qu'un commit touche `ShieldAD-Worker.ps1` ou `ShieldAD-AADS.ps1` (échec du comptage → commit annulé). Actif uniquement après `git config core.hooksPath .githooks` (à faire une fois par clone).
- Frontend : `AzureSessionStartEvent` expose désormais `controls_count` (`azureControlsCount` dans `scanStore`), en miroir du scan on-prem.

Détail du nouveau total (`docs/CONTROL-COUNTS.generated.md`, régénéré le 2026-08-04) :

| Périmètre | Détail | Valeur |
|---|---|---|
| On-prem | `New-Ctrl` statiques (IDs uniques) | 238 |
| On-prem | Dynamiques (boucles documentaires : `cisDocCtrl`=5, `doraCtrl`=6, `isoDocCtrl`=24, `nis2DocCtrl`=7, `rgpdCtrl`=8, `rgpdDocCtrl`=5) | 55 |
| **On-prem TOTAL** | | **293** |
| Cloud | `New-AADSCtrl` statiques | 152 |
| **TOTAL GÉNÉRAL** | | **445** |

⚠️ La somme des tableaux par famille du §5 (comptés manuellement lors des relectures précédentes) atteint ~291, pas exactement 293 — écart mineur non résolu dans cette mise à jour (pas de nouvel ID identifié dans le diff `ShieldAD-Worker.ps1` non commité, voir point c). Le tableau par famille du §5 reste une cartographie qualitative utile (quels contrôles existent, par thème) mais **le total exact et à jour se lit désormais uniquement dans `docs/CONTROL-COUNTS.generated.md`**, jamais recopié en dur — conformément à la règle absolue ajoutée dans `CLAUDE.md` (« Ne jamais hardcoder un nombre de contrôles »). Côté cloud, le chiffre automatisé (152) est également inférieur d'une unité au chiffre manuellement vérifié précédemment (153) — écart non investigué contrôle par contrôle ici.

### b) Retrait du prototype ShieldGraph autonome (commit `fcafd1f`)

Le dossier `ShieldGraph/` — sous-projet Tauri v2 indépendant (`shieldgraph.exe` séparé) documenté en détail à l'ancien §15 de ce document — **a été supprimé du dépôt**. Il est remplacé intégralement par le port déjà intégré dans l'app principale, `src/shieldgraph/` (livré depuis la v4.0, voir §15 réécrit). Conséquences en cascade, toutes constatées dans l'arbre de travail non commité :

- `ShieldAD.ps1` : `Show-ShieldGraphTauriWindow` (~110 lignes — lancement du scan en runspace puis démarrage de `shieldgraph.exe` externe) est remplacée par un simple `MessageBox` indiquant que ShieldGraph est désormais intégré à l'onglet du même nom dans l'application principale.
- `ShieldAD-PrereqCheck.ps1` : retrait complet du prérequis « SHIELDGRAPH UI (Tauri) » (détection `shieldgraph.exe`/WebView2 Runtime par GUID registre) et du scriptblock `install_tauri` (installation Node.js/Rust via winget + `npm run tauri build`).
- `src-tauri/src/onboarding.rs` (-184 lignes) : retrait miroir des fonctions `shieldgraph_exe_dir`/`webview2_version`/`TAURI_BUILD_SCRIPT`.
- `src-tauri/Cargo.toml` : dépendance `winreg = "0.52"` retirée (registre Windows plus interrogé pour détecter un `shieldgraph.exe` qui n'existe plus).

Le même commit retire aussi **l'ancien schéma de licence B** (clé + checksum HMAC-SHA256, `ShieldAD-LicenseValidator.ps1`) — voir point c) ci-dessous pour le nettoyage des derniers appelants, réalisé dans l'arbre de travail non commité qui suit ce retrait.

### c) Nettoyage des derniers appelants du schéma de licence B — suite de `fcafd1f`

`ShieldAD-LicenseValidator.ps1` (fichier embarqué, validation clé/checksum HMAC) a été supprimé par `fcafd1f` ; les changements non commités qui suivent nettoient ses derniers appelants, expliquant une bonne partie du -253 net sur `ShieldAD.ps1` et du -88 net sur `ShieldAD-DatabaseManager.ps1` :

- `ShieldAD.ps1` : dot-sourcing de `$_licValidatorPath` retiré ; le bloc de vérification au clic Scan (`Test-LicenseValidity`, ~43 lignes) devient `$licOk = $true` inconditionnel (commentaire : le `.lic` RSA-4096, schéma A, est déjà vérifié par le launcher au démarrage, pas besoin de revalider) ; le bouton « Activer licence » de `Show-LicenseManager` (~55 lignes de validation par clé/checksum) est remplacé par un message informatif ; `Update-LicenseWidget` reflète le nouveau texte.
- `ShieldAD-DatabaseManager.ps1` : retrait de `Save-LicenseToDB` (~46 lignes), `Update-LicenseScanCount` (~22 lignes) et `Add-LicenseAuditLog` (~19 lignes) — persistance dédiée au schéma B. `Get-LicenseFromDB`/`Get-LicenseHistory` sont conservées.

**Conséquence sur §8/§9 de ce document (mis à jour) :** l'unique mécanisme de licence actif est désormais le fichier `.lic` signé RSA-4096 vérifié au lancement par le launcher (déjà la position officielle de `CLAUDE.md` § Licence logicielle) — les tableaux « Types de licence » et « Chiffrement AES-256-CBC / HMAC-SHA256 » de l'ancien §8 décrivaient encore le schéma B actif ; à lire désormais comme historique.

### d) Nouveau module IAM — Access Governance (non commité, greenfield v4)

Nouvel onglet complet « Inventaire IAM » — voir **§16** (nouvelle section dédiée) pour le détail. Fichiers ajoutés : `ShieldAD-IAM.ps1` (333 lignes, worker embarqué comme Worker/AADS, JSONL pur — sans équivalent v3.x), `src-tauri/src/iam.rs` (114 lignes, commandes `start_iam_scan`/`stop_iam_scan`), `src/tabs/TabIAM.tsx` (298 lignes), `src/components/IamUserDetailModal.tsx` (219 lignes), `src/store/iamStore.ts` (74 lignes), `src/types/iam.ts` (77 lignes). Côté cloud, `Invoke-IamEntraInventory` (nouvelle fonction, `ShieldAD-AADS.ps1:1090-1305`, ~231 des +231 lignes du fichier) réutilise la session Graph déjà authentifiée du scan Azure existant plutôt que d'ouvrir une session dédiée. Le document de conception source est `ADSECU~1.MD` (voir point i).

### e) Nouveau module ShieldConnect côté Tauri — orchestrateur autour des scripts existants (non commité)

`src-tauri/src/shieldconnect.rs` (463 lignes) + `src/tabs/TabShieldConnect.tsx` (387 lignes) + `src/store/shieldConnectStore.ts` (145 lignes) + `src/types/shieldconnect.ts` (34 lignes). **Ce n'est pas une réimplémentation** : Rust orchestre les scripts PowerShell déjà décrits au §8 (`ShieldAD-Connect.ps1`/`ShieldAD-ConnectVault.ps1`, désormais également embarqués comme les Workers) via des scripts-pont temporaires dot-sourcés. 5 commandes Tauri : `get_shieldconnect_config`, `get_shieldconnect_config_path`, `save_shieldconnect_config`, `test_shieldconnect_connector`, `send_shieldconnect_now`. Le chantier a mis au jour et corrigé **trois bugs de schéma jamais exercés en v3.x** (donc jamais détectés) :

1. `ShieldAD-Connect.ps1` lisait des chemins de config plats (`$Config.splunk.token`) alors que `ShieldAD-Connect-Config.json` imbrique tout sous `connectors.splunk.*` → chaque `Send-To*` recevait des champs `$null` silencieusement.
2. `ShieldAD-ConnectVault.ps1` chiffrait des noms de champ PascalCase (ex. `Sentinel.PrimaryKey`, `Wazuh.Password`) qui ne correspondaient à aucune propriété réelle du JSON → le chiffrement DPAPI des secrets ne s'appliquait jamais.
3. Le JSON réellement écrit par `ShieldAD-Worker.ps1` (enveloppe `{SHA256, Scan:{GlobalScore, Controls[].id/status/title/severity}}`, PascalCase) ne correspond pas au schéma attendu par les convertisseurs `Send-To*`/`ConvertTo-*` (`summary.score`, `controls[].name/value/expected/nis2_article`, snake_case) — pont assuré côté Rust par `build_siem_results` (`shieldconnect.rs:378-422`) via `onboarding::load_scan_snapshot`.

La sidebar/l'app v4 ne doivent donc plus présenter ShieldConnect comme un module « à venir » : il est déjà fonctionnel côté Tauri au 2026-08-04 (l'entrée « ti-plug ShieldConnect — v4.1 » de `CLAUDE.md` est en retard sur ce point précis, à corriger séparément dans ce fichier).

### f) `cleanup.rs` — nettoyage sécurisé porté vers Rust pour l'app v4 (non commité)

Nouveau module `src-tauri/src/cleanup.rs` (223 lignes) : port Rust natif de `Invoke-SecureDelete`/`Invoke-SecureDeleteFolder`/`Invoke-FullCleanup`/`Register-LogoffCleanupTask` (§4/§9, WPF v3.x) — jusqu'ici **jamais porté côté Tauri v4** (aucun hook de fermeture, `%TEMP%` s'accumulait en usage réel). Ces fonctions **restent inchangées dans `ShieldAD.ps1`** (v3.x) : `cleanup.rs` est un module parallèle propre à l'app v4, pas un retrait côté v3.x — cohérent avec la coexistence des deux apps documentée dans `CLAUDE.md`. Détail au §9 (mis à jour).

### g) Corrections de bugs transverses relevées au passage (non commité)

- `src-tauri/src/scan.rs` — `init_state_file()` n'écrivait auparavant que les champs de polling (`Progress`/`Done`/`Running`), jamais les cases `RegNIS2Ess`/`RegISO27001`/etc. issues du choix de certifications à l'onboarding : **aucune section certifiée ne s'affichait jamais dans les rapports HTML**, quel que soit le choix client fait au wizard. Corrigé par transmission d'un nouveau type `ScanCertifications` au StateFile.
- `src-tauri/src/shieldgraph.rs` (+50 lignes) — `run_shieldgraph_scan` émettait le résultat d'un coup en fin de process (UI figée sans signe de vie sur un scan ACL/ADCS de plusieurs minutes) ; émet désormais un événement `shieldgraph-scan-progress` ligne par ligne.
- `ShieldAD-Worker.ps1` — deux occurrences `$h += "..."` remplacées par `[void]$_hSb.Append(...)` dans `New-ReportDPO` : `$h` n'étant assigné qu'en toute fin de fonction, ces lignes n'avaient jamais eu d'effet sur le rapport HTML généré.
- `src/lib/compliance.ts` — `computeFrameworkCoverage()` accepte un second paramètre optionnel `selection?: ComplianceSelection` filtrant les référentiels affichés sur ceux effectivement cochés à l'onboarding (branché depuis `TabDPO.tsx`/`TabDirection.tsx`), miroir de la nouvelle section « Couverture par référentiel » du rapport DPO (point h).

### h) Restructuration du rapport DPO + retrait d'une jurisprudence APD non vérifiée (`ShieldAD-Worker.ps1`, `New-ReportDPO`)

`New-ReportDPO` passe de 15 sections organisées par référentiel à **13 « points » regroupés par thème** (retour client) — détail : 1. Couverture par référentiel (nouveau, miroir de `computeFrameworkCoverage`) + responsabilités + sécurité du rapport ; 2. Synthèse RGPD ; 3. Synthèse des autres certifications sélectionnées (nouveau, cartes par référentiel) ; 4. Plan d'action DPO ; 5. Post-Quantique ; 6. Analyse par article/domaine regroupée ; 7. Contrôles documentaires ; 8. Jurisprudence/Annexes/IAM ; 9. Checklist prêt-audit ; 10. Evidence Certificateur ; 11. Matrice de traçabilité ; 12. Registre CAPA ; 13. Périmètre d'audit. `$_dpoISO` et `$_dpoCIS` sont élargis pour couvrir respectivement `reg_iso27001 -or reg_iso27002` et `reg_cis -or reg_cis_ig1/ig2/ig3` (avant : une seule des deux variantes par famille).

Un bloc « Jurisprudence APD Belgique » citant 7 décisions numérotées (APD 18/2022, 91/2021, 22/2022, CNIL 2023-008, APD Reco 01/2020, EDPB Guidelines 05/2022 et 07/2020) a été **retiré**, avec un commentaire explicite dans le code : aucune de ces références n'a résisté à la vérification sur `autoriteprotectiondonnees.be`/`edpb.europa.eu`/`legifrance.gouv.fr` — numéros introuvables ou associés à des faits sans rapport. Règle inscrite dans le code pour la suite : ne pas réintroduire de jurisprudence numérotée sans vérification décision par décision.

### i) Ménage documentaire

Trois fichiers `.md` suivis par git ont été supprimés à la racine : `ADSecure-Veille-Juillet-2026-Nouveaux-Controles.md` et `Veille_ShieldGraph_2026-08-03.md` sont en réalité **déplacés à l'identique** vers `.claude/` (contenu strictement inchangé, non suivis à leur nouvel emplacement) ; `ShieldAD-Reference-Complète.md` (943 lignes) est **supprimé sans remplaçant** — aucune copie retrouvée ailleurs dans l'arbre de travail, probablement jugé redondant avec le présent document. Un fichier `ADSECU~1.MD` (697 lignes, non suivi, créé le 2026-08-03) est apparu à la racine sous un nom tronqué au format court Windows 8.3 — ce n'est pas une copie d'un fichier supprimé mais le cahier des charges de conception du module IAM (« ADSecure — Onglet IAM : Access Governance Dashboard », point d) ; à renommer avec un nom long explicite et à classer (ex. dans `.claude/`) plutôt qu'à laisser tel quel à la racine.

---

## 1quater. Nouveautés depuis la dernière vérification (2026-08-04 → 2026-08-17)

Contexte git : tout le chantier IAM/ShieldConnect décrit au §1ter comme « non commité » a été committé le 2026-08-12 (checkpoint `01a9060`) — les statuts « non commité » qui subsistent ailleurs dans ce document (§8, §16) datent de cette relecture-là et sont obsolètes. Depuis, 25 commits (2026-08-14 puis 2026-08-17) plus un dernier commit réalisé au moment de cette mise à jour (`cd8d48f`) font l'objet de cette section.

### a) Licence RSA-4096 portée nativement en Rust, avec gating par module (`c07796f`)

Port natif Rust du modèle de `ShieldAD-License.ps1` (v3.x) : même clé publique embarquée, même format `ShieldAD.lic`, même compteur de scans AUDITOR — les licences déjà émises par `ShieldAD-LicenseGen.ps1` restent valables sans réémission. `check_license()` / `increment_license_usage()` (`src-tauri/src/license.rs`, 437 lignes) exposées comme commandes Tauri, 9 tests unitaires. `LicenseGate.tsx` bloque l'app au lancement (avant l'onboarding) si la licence est invalide/expirée/quota dépassé ; `Sidebar.tsx` grise ShieldConnect/ShieldGraph si le module correspondant n'est pas inclus dans la licence.

**Faille corrigée par rapport à la v3.x :** l'absence de fichier `.lic` ouvrait un accès total et illimité (mode `INTERNAL`), y compris sur un exe distribué à un client. Ce repli n'existe plus qu'en build de développement (`cfg(debug_assertions)`) — un build release sans `.lic` valide est désormais bloqué, même pour un poste MSC (vérifié empiriquement sur un binaire compilé en `--release`, pas seulement via les tests qui compilent toujours avec `debug_assertions` actif). `npm run build:client-license` embarque optionnellement `resources_license/ShieldAD.lic` dans l'installateur NSIS ; le build par défaut reste inchangé et n'exige rien.

Deux correctifs immédiats ont suivi :
- **`59c0fad`** (fix BOM) : `ShieldAD-LicenseGen.ps1` écrit via `[System.Text.Encoding]::UTF8`, qui préfixe systématiquement un BOM (`EF BB BF`, `U+FEFF`). `U+FEFF` n'a pas la propriété Unicode `White_Space` : `str::trim()` ne le retire pas côté Rust, et `serde_json` refuse un JSON commençant par ce caractère — toute vraie licence générée par le keygen échouait donc au parsing, avant même la vérification de signature RSA (reproduit sur la VM du client : écran de blocage générique malgré un `.lic` correctement placé). Corrigé via un `strip_bom()` appliqué aux trois points de lecture (`ShieldAD.lic` ×2, `ShieldAD.usage`), avec un test qui vérifie explicitement que la même chaîne échoue **sans** le fix.
- **`70cad47`** (vue Paramètres) : nouvelle section en tête de `SettingsView.tsx` — type d'abonnement, client, n° de licence, date d'expiration (en rouge si dépassée), quota de scans AUDITOR (en rouge si atteint), multi-domaine, statut par module (`SHIELDCONNECT`/`SHIELDGRAPH`/`SHIELDPREDICT`/`SHIELDBRAND`) avec bouton de revérification. Consomme l'état déjà récupéré par `LicenseGate.tsx`, aucun nouvel appel Rust.

**Conséquence sur §8/§9 de ce document :** le mécanisme `.lic` RSA-4096 décrit au §8 (vérifié jusqu'ici uniquement par `ShieldAD-LAUNCHER.ps1` côté v3.x) a désormais un **second vérificateur indépendant côté v4 Tauri** (`license.rs`), au format de fichier identique mais avec sa propre logique de gating par module — les deux coexistent, un seul fichier `.lic` sert aux deux applications.

### b) Module de mise à jour ShieldAD (`1c9c062`)

Backend Rust (`src-tauri/src/updater.rs`, 445 lignes) : `check_for_update()`, `download_update()`, `verify_and_install_update()`, `import_update_manual()`, exposées comme commandes Tauri. Vérification/téléchargement/installation d'un `.msi` signé via **Authenticode** (empreinte épinglée dans le binaire), plutôt que le schéma minisign du plugin `tauri-plugin-updater` — réutilise le certificat EV déjà requis pour la signature des MSI. Frontend : `UpdateSummary.tsx` (131 lignes) + `updateStore.ts` — bouton « Vérifier les mises à jour » dans Paramètres, avec import manuel hors-ligne pour les sites sans accès Internet (cohérent avec la contrainte « 100% on-prem » du produit, §📐 Règles de développement de `CLAUDE.md`).

Infrastructure (`infra/scaleway-updates/`, Terraform) : bucket Object Storage privé (bucket policy lecture publique / écriture déléguée), identité IAM dédiée, pipeline Edge Services (WAF, cache, TLS managé, domaine personnalisé) — **déployé et validé de bout en bout** sur le Project `shieldad-updates`. Pipeline CI (`.github/workflows/release.yml`, 166 lignes) : build + signature SSL.com eSigner + publication sur Scaleway à chaque tag `vX.Y.Z`.

### c) ShieldGraph — dette de test soldée contre un vrai domaine AD (série de commits, 08-14)

Première validation réelle de la chaîne Worker → ShieldGraph → collecte ACL (VM `test.com`, 58 nœuds / 55 objets) — tout n'avait tourné qu'en mode démo jusqu'ici, les données synthétiques étaient trop propres pour révéler ces bugs :

- **`5bf222c`** (4 bugs ACL) : test bitmask `-band` seul au lieu de `-band ... -eq` sur `GenericAll`/`GenericWrite` (droits composés) — n'importe quelle ACE avec un simple `ReadProperty` remontait comme « contrôle total » (921/939 arêtes mal classées, mesuré) ; repli `ObjectType -eq SGGuid_Zero` trop large sur `AddKeyCredentialLink`/`AddMember` ; Key Admins/Enterprise Key Admins absents de la liste d'exclusion (80 fausses arêtes Shadow Credentials mesurées, alors que ces groupes intégrés ont par défaut `WriteProperty` sur `msDS-KeyCredentialLink` par conception Windows Hello for Business) ; `ShieldGraph_ATTCK_Rules.json` jamais copié/embarqué (glob `.ps1` uniquement dans `stage-workers.mjs`) — le mapping MITRE ATT&CK était silencieusement ignoré sur tout scan réel de l'app compilée. Résultat revalidé sur le même domaine : 939 → 57 arêtes ACL credibles.
- **`f1b4a6f`** (sur-classification ATT&CK, 57 → 6 chemins) : l'onglet ShieldGraph affichait 56 chemins CRITICAL sur 57, avec des sources très variées (Guest, krbtgt, Backup Operators, Print Operators, DnsAdmins…) pointant toutes vers « AdminSDHolder Backdoor » en 1 saut. Cause : `ATTCK-008` ne filtrait que par `NodeType [User, Group]` + `ControlFailed [DC-05, A-03]` — `ControlFailed` est un fait *global au domaine*, pas une propriété de l'objet évalué : dès qu'un des deux contrôles échoue une seule fois, tous les User/Group du domaine matchaient. Audit systémique : **18 des 33 règles** avaient ce même défaut structurel ; sur les 5 à risque réel d'explosion (`NodeType` User/Computer/ServiceAccount), `ATTCK-008` corrigé (ajout `Properties.AdminCount=1`, retrait de `Group` de `NodeType`), `ATTCK-020` (Shadow Credentials) corrigé (remplace `ControlFailed` par `OrEdgeExists="AddKeyCredentialLink"`, arête déjà collectée), `ATTCK-027` (ESC14) corrigé partiellement, `ATTCK-005`/`ATTCK-017`/`ATTCK-018` documentés non-bugués ou hors périmètre d'un fix JSON. Résultat revalidé : 57 → 6 chemins d'attaque (56 CRITICAL → 4 CRITICAL + 2 HIGH).
- **`125354b`** : même bug bitmask sur `ForceChangePassword` (oublié du fix `GenericAll`/`GenericWrite` initial), extraction d'un helper `Test-SGRightsExact` ; garde ajoutée sur `pathIdentityKey()` (`ScanHistoryModal.tsx`) pour un JSON de scan ancien/étranger sans `nodeIds`.
- **`8fa1881`** : clé de diff d'historique basée sur la séquence complète de node IDs plutôt que sur les seuls labels source/cible (qui confondaient deux chemins structurellement différents) ; timeout de simulation de 60s (déjà présent côté backend `shieldgraph.rs`) rendu visible côté UI (`SimulationModal.tsx`, compteur de secondes écoulées).
- **`1e7a91e`** (unification) : les 2 fichiers de règles ATT&CK (backend PowerShell + copie frontend indépendante, divergents sur 6/33 conditions de matching et sur `RemediationOptions`) fusionnés en un seul fichier canonique `ShieldGraph/ShieldGraph_ATTCK_Rules.json` — `attck-rules.ts` l'importe désormais directement. `scripts/stage-workers.mjs` généralisé du glob `.ps1` à `ShieldGraph_*` (même angle mort que le bug JSON de `5bf222c`) ; `embedded_workers.rs` gagne un test (`all_staged_files_are_embedded`) qui échoue à `cargo test` si un fichier stagé côté Node n'a pas d'entrée `include_str!` correspondante côté Rust.
- **`36be425`** : derniers tests réels (pathfinding libre, historique/diff) validés dans l'app compilée — clôture la dette de test ShieldGraph. **`291f635`** : `STATUS.md` nettoyé (bandeau signalant l'architecture Tauri autonome retirée le 2026-08-04 comme obsolète).

### d) Trilingue FR/EN/NL complété pour les 152 contrôles cloud (`f6a8e5e`)

`New-AADSCtrl` n'avait aucun mécanisme de localisation : `title`/`detail`/`remediation` étaient toujours émis en français dans le JSONL, quelle que soit `-Language` (le paramètre n'était jamais lu pour le texte des contrôles) — un utilisateur EN/NL voyait donc du français intégral sur tout l'onglet Azure. Ajout de `$script:AadsCtrlNames` (152 titres EN/NL) et `$script:AadsCtrlI18n` (152 entrées Desc/Rem EN/NL, reprises de `$script:CtrlI18n` où elles existaient déjà côté rapport DPO mais jamais utilisées par le flux JSONL temps réel) ; `Get-AadsCtrlText` est le miroir local de `Get-CtrlText` (code dupliqué, pas partagé : `AADS.ps1` et `Worker.ps1` s'exécutent en processus séparés). Vérifié par script : les 152 contrôles résolvent bien title+detail+remediation dans les 2 langues, aucun repli FR résiduel.

### e) Exposition financière réglementaire et remédiation chiffrée en euros (`e1174aa`, `1ba03ee`)

Onglet IT : calcul des plafonds légaux théoriques RGPD (Art. 83) et NIS2 (loi belge du 26/04/2024) à partir du CA du profil client chargé (`SessionInfo.revenue_eur`) — DORA volontairement exclu (pourcentage belge non vérifié). Planning de remédiation : jours-homme saisis manuellement par ligne, chiffrés en euros via un nouveau champ `SessionInfo.it_cost_per_day_eur`. Nouveaux fichiers `FinancialExposurePanel.tsx` (67 lignes) et `financialRisk.ts` (98 lignes). Fix suivant (`1ba03ee`) : `computeRegulatoryExposure()` retournait des libellés de tier (« Plafond supérieur », « Entité essentielle »…) en texte français fixe, contournant le système trilingue — trouvé lors d'un audit complet de l'app demandé par l'utilisateur ; les tiers/frameworks retournent désormais des clés `DashboardDictKey` résolues via `t()`.

### f) Onglet IT/Remédiation regroupés par domaine, assignation IAM et notification email (`b640bf1`, `34bead4`)

Retour utilisateur sur un vrai scan `test.com` (293 contrôles à l'époque) : la table plate de ~300 lignes était trop longue à parcourir. `ControlTable.tsx`/`RemediationPlanner.tsx` (+432 lignes) regroupent désormais par domaine (mêmes catégories que « Score par domaine ») en accordéon natif — les domaines contenant au moins un FAIL/CRITIQUE s'ouvrent par défaut. Le champ « assigné » de `RemediationPlanner.tsx` était une saisie libre pure : ajout d'une liste déroulante alimentée par le dernier scan IAM (comptes actifs avec email connu), repli sur saisie libre si aucune donnée IAM. Bouton « Notifier » par ligne : email ciblé (1 contrôle, 1 destinataire) via le connecteur SMTP déjà configuré dans ShieldConnect — nouvelle fonction `Send-RemediationNotification` (`ShieldAD-Connect.ps1`, distincte de `Send-ToSmtp`) + commande Tauri `send_remediation_notification` (`shieldconnect.rs`). Bandeau ajouté (`34bead4`) au-dessus du planning, visible uniquement quand SMTP n'est pas configuré — l'explication n'était visible qu'au survol du bouton désactivé, pas assez découvrable.

### g) Fix de la règle « rien coché = tout prendre en compte » pour les frameworks de conformité (`5265665`)

Retour utilisateur : l'onglet DPO était entièrement vide sur un vrai scan `test.com`. Quand aucun framework n'est coché à l'onboarding (bouton Skip), `computeFrameworkCoverage` (`src/lib/compliance.ts`) retournait un tableau vide au lieu de « tout prendre en compte » — et `TabDPO.tsx` affiche un placeholder pour toute la page dès que ce tableau est vide. Règle documentée et déjà correcte côté ancien moteur PowerShell (`ShieldAD-ComplianceMapper.ps1`) et annoncée à l'écran pendant l'onboarding, mais jamais correctement portée côté TypeScript ni dans `New-ReportDPO` (qui avait été écrit en miroir de la version TS déjà buguée) : 16 portes de contenu corrigées dans `New-ReportDPO` (`ShieldAD-Worker.ps1`, modification validée explicitement par l'utilisateur, hors du bloc JSONL habituel).

### h) Fix de la checklist DPO 9a et nettoyage des textes obsolètes associés (`edc776a`, `bfbfc8f`)

La checklist « Prêt pour audit » affirmait toujours « Fourni » pour A-01/A-04/P-01/J-01/G-01 dès que le texte statique commençait par « Annexe », sans vérifier que le CSV avait réellement été exporté (l'export ne se déclenchait que si le contrôle était FAIL/WARN). Ces 5 contrôles exportent désormais toujours leur annexe. Corrige aussi 2 statuts erronés (A-04 affichait le statut d'A-01 ; la ligne LDAP/LDAPS affichait celui d'un contrôle S-01 sans rapport) et remplace des lookups flous (`-like` + `Select -First 1`) par des lookups précis par ID. Commit suivant : 3 commentaires/textes décrivant encore l'ancien comportement (garde `report_ready`, fallback du Bloc 8, commentaire `annexReport` dans `TabDPO.tsx`) mis à jour pour refléter la réalité actuelle — aucun changement de logique.

### i) Lexique de vulgarisation pour l'onglet Direction (`b14d8e2`)

Retour utilisateur sur un vrai scan `test.com` : le « Top 3 risques » de `TabDirection.tsx` (public CEO/Direction) affichait le texte technique brut des contrôles (« AdminCount=1 », « ACL verrouillé », « SPN », « Kerberoasting », « gMSA »…) sans vulgarisation. Plutôt que de réécrire les ~445 contrôles (risque de perdre en précision technique pour l'onglet IT, qui partage le même champ `title`/`detail`), ajout d'une couche d'annotation : `src/i18n/security-glossary.ts` (28 termes choisis par fréquence réelle d'apparition dans `ShieldAD-Worker.ps1`, FR/EN/NL) + `src/lib/glossary.tsx` (`annotateGlossary()`, détection des termes les plus longs en premier pour éviter les coupures, ex. « Kerberoastable » avant « Kerberoast »), appliquée uniquement dans `TabDirection.tsx` (tooltip natif au survol, soulignement pointillé) — aucune donnée brute du scan ni aucun autre onglet touché.

### j) Nettoyage de fichiers orphelins et corrigés (`0fc838e`)

Suppression de `ShieldAD/sha.txt` (hash isolé sans contexte, jamais référencé) et `ShieldAD-ProofGenerator.ps1` (horodatage RFC 3161, jamais chargé par `ShieldAD.ps1` — `ShieldAD-Worker.ps1` a sa propre implémentation indépendante de `Get-Rfc3161Timestamp`, doublon superflu — §8 mis à jour en conséquence dans cette même révision du document). Renommage de 4 fichiers dont le nom avait été corrompu en format court Windows 8.3 lors d'un commit antérieur (`ADSECU~1.MD`, `CEO_PM~1.MD`, `CEO_DA~1.MD` — voir aussi §1ter-i) ou qui portaient une extension `.ps1` alors qu'il s'agit de documentation Markdown ; contenu inchangé, uniquement le nom/emplacement corrigé.

### k) CLAUDE.md mis à jour, comptage régénéré, hook pre-commit activé (`96d2f43`)

`CLAUDE.md` corrigé (arborescence des workers, pipeline `stage-workers.mjs`, onglets IAM/ShieldConnect/ShieldGraphReport documentés comme livrés plutôt que « pas encore créés ») ; `docs/CONTROL-COUNTS.generated.md` régénéré (périmé depuis les modifs du checkpoint IAM/ShieldConnect) ; hook `pre-commit` local activé (`core.hooksPath`) pour éviter que ça se reproduise — c'est ce hook qui a régénéré le comptage automatiquement lors du commit `cd8d48f` du point (l) ci-dessous.

### l) +3 contrôles pour des CVE critiques ADCS/Kerberos d'août 2026 (`cd8d48f`, committé au moment de cette mise à jour)

- **`ADCS-23`** — CVE-2026-62818 : vulnérabilité *use-after-free* dans AD CS permettant à un attaquant authentifié à faibles privilèges d'exécuter du code arbitraire sur le serveur CA via une requête réseau forgée, sans interaction utilisateur (CVSS 8.8). Correctif publié le 11 août 2026 (Patch Tuesday, KB5120242) ; aucune exploitation active confirmée à ce jour ; exploit public non confirmé (maturité « unproven » au 17/08/2026).
- **`ADCS-24`** (« Certighost ») — CVE-2026-54121 : permet à un attaquant authentifié disposant d'un simple compte de domaine standard de manipuler l'enrollment de certificat pour obtenir un certificat portant l'identité d'un contrôleur de domaine légitime, puis d'en abuser via PKINIT pour extraire le hash NT de ce DC — compromission totale du domaine sans privilège préalable. Correctif publié le 14 juillet 2026 (KB5099540) ; preuve de concept publique diffusée le 24 juillet 2026 (chercheurs H0j3n et Aniq Fakhrul).
- **`K-15`** — CVE-2025-60704 : faille du KDC Windows dans l'extension S4U2self (Protocol Transition) — une étape de validation cryptographique manquante permet, lorsque l'échange Kerberos dégrade vers RC4, de contourner la vérification du checksum `PA-S4U-X509-USER` et de forger l'identité de l'utilisateur usurpé sur un service en délégation contrainte. Corrigé par la mise à jour cumulative du 11 novembre 2025 (KB5068787).

Les trois numéros de KB exacts (`KB5120242`, `KB5099540`, `KB5068787`) doivent être confirmés pour chaque build via le Microsoft Security Update Guide — signalé explicitement dans le texte de remédiation de chaque contrôle plutôt que présenté comme définitif, cohérent avec la règle de vérification des sources ajoutée au §1ter-h. Trilingue FR/EN/NL immédiat (`$script:CEONames`/`_EN`/`_NL`), ajoutés à `CIS_IG3` et à la liste principale de contrôles `NIS2` (`$Global:CertificationMapping['NIS2'].Controls` — pas les items documentaires `NIS2-DOC-*`, `ShieldAD-CertificationMapping.ps1`). 2 nouvelles règles ATT&CK `ATTCK-034` (T1210, Lateral Movement, sur `ADCS-23`) et `ATTCK-035` (T1649, Privilege Escalation, sur `ADCS-24`) avec narratif EN/NL (`rule-narrative.ts`) — `ShieldGraph_ATTCK_Rules.json` passe de la version 1.4 à 1.5 (33 → 35 règles, `ATTCK-001` à `ATTCK-035`).

Comptage régénéré automatiquement par le hook pre-commit : **293 → 296** contrôles on-prem (241 `New-Ctrl` statiques + 55 dynamiques), **445 → 448** au total général — voir tableau des chiffres clés au §1.

**Complément apporté en parallèle par un autre commit (`bb700bc`, committé pendant la rédaction de cette section — non attribuable à cette session) :** `K-15` n'avait initialement pas de règle ATT&CK dédiée, laissant croire à un simple contrôle de patch domain-wide sans propriété de nœud exploitable — un audit des 4 chaînes d'attaque prévues dans les brouillons de veille `.claude/maj-*-170826.md` (désormais supprimés, leur contenu ayant été traité) a montré que 3 chaînes sur 4 étaient déjà modélisées (`ATTCK-032`/`034`/`035` pour Coercion→Relay→ADCS→DA et ADCS RCE, `ATTCK-019` pour DKM ACL via `ADFS-003`) mais que la chaîne Kerberos Constrained Delegation MitM (CVE-2025-60704) n'avait aucun chemin remontant dans le graphe malgré un FAIL sur `K-15`. Nouvelle règle `ATTCK-036` (T1558, Credential Access, HIGH) ajoutée sur ce modèle — `ShieldGraph_ATTCK_Rules.json` passe à la version 1.6 (**36 règles**, `ATTCK-001` à `ATTCK-036`). Le chantier « 4 chaînes d'attaque v4.1 » évoqué au point (m) ci-dessous est donc désormais clos.

### m) Ce qui n'a volontairement pas été fait

`92eac58` documente sans corriger un risque de performance architectural dans `Find-AttackPaths` (BFS relancé pour chaque paire source×cible au lieu d'un seul BFS multi-source par cible — pourrait ne pas tenir la contrainte `<5min/50k users` sur un grand domaine, non mesuré, le lab de test ne stresse pas ce point) : réécrire l'algorithme central sans pouvoir le valider à l'échelle réelle risquerait un bug de correction silencieux, pire qu'une lenteur mesurée. `ATTCK-017`/`ATTCK-018` (même audit systémique que le point c) restent non corrigées, faute de collecte de données (`msDS-ManagedAccountPrecededByLink`, détection SPN fantôme) côté Worker. Les 4 chaînes d'attaque ShieldGraph des brouillons de veille `.claude/maj-shieldad-170826.md`/`maj-shieldgraph-170826.md` ont finalement toutes été traitées (voir le complément au point l) — les deux fichiers ont été supprimés une fois leur contenu absorbé ; seul le volet CVE plus large de ces brouillons (au-delà des 3 contrôles du point l) reste non implémenté à ce jour.

---

## 1quinquies. Nouveautés depuis la dernière vérification (2026-08-17 → 2026-08-24)

Contexte git : 21 commits sur `adsecurev3.7` depuis le point précédent (`fafa6fa`, clôture du §1quater), jusqu'à `ba44f20` (24/08, documentation de session dans `ShieldGraph/STATUS.md`). Onze de ces commits forment un audit de complétude CVE dédié à ShieldGraph, mené en 6 phases (points i à q ci-dessous) ; les dix autres sont des ajouts produit indépendants (points a à h).

### a) Carte de risque exposée en JSONL pour le Top 3 risques Direction (`38541d0`)

`New-ReportCEO` (rapport HTML v3.x) calculait déjà, par contrôle FAIL/WARN, un impact métier (`Get-CtrlBizImpact`/`$bizDict`) et une estimation d'effort/coût de remédiation (`Get-CtrlRemediationEstimate`/`$RemMatrix`) — jamais exposés dans le flux JSONL temps réel v4. Les deux fonctions sont hissées en portée script et réutilisées à la fois par le rapport CEO et par `Emit-Event` dans `New-Ctrl`, sans duplication ni donnée inventée : c'est ce qui alimente les champs `biz_impact`/`estimated_days_min`/`estimated_days_max`/`estimated_role`/`estimated_cost_min_eur`/`estimated_cost_max_eur` du contrat JSONL (voir `CLAUDE.md`, exemple `K-04`). **Ce commit ne livre que le backend** — seul `ShieldAD-Worker.ps1` et `docs/CONTROL-COUNTS.generated.md` sont modifiés ; le composant frontend consommateur (`RiskCard.tsx`, Dashboard Direction) reste noté « v4.1+ » dans `CLAUDE.md`, donc pas encore construit à cette date.

### b) Colonne « CVE associée » dans le tableau des risques ShieldGraph (`2a43d2e`)

`RiskTable` (onglet ShieldGraph) affiche désormais l'ID CVE + un mécanisme résumé pour les règles ATT&CK adossées à une CVE réelle et patchable (à l'origine `ATTCK-018/019/028/032/034/035/036`, liste étendue mécaniquement par les nouvelles règles des points i-q ci-dessous) ; tiret + infobulle pour les règles restantes, qui sont des faiblesses de configuration AD par nature sans CVE. Nouveau fichier `src/shieldgraph/data/cve-mapping.ts`, volontairement séparé du JSON canonique (`ShieldGraph_ATTCK_Rules.json`) pour ne pas en modifier le schéma — chaque explication est extraite fidèlement des champs `Why`/`Fix` déjà présents dans ce JSON, en FR/EN/NL.

### c) `ADCS-25` (Shadow Certificates LDAP) + encarts d'explication de calcul du rapport CEO (`e75ccb8`)

`ADCS-25` détecte les certificats injectés directement dans `userCertificate` (hors PKI normale) sur les comptes Domain/Enterprise Admins et les DC — complémentaire à `ADCS-19` (mapping `altSecurityIdentities`) et `ADCS-24` (patch Certighost, CVE-2026-54121), mais volontairement **non rattaché à une CVE précise** puisque le vecteur est une écriture LDAP directe et non un abus d'enrollment ADCS. Portée restreinte à ces comptes pour éviter les faux positifs sur des certificats S/MIME légitimes. Document de spécification d'origine conservé (`.claude/ADCS-14_Shadow-Certificates_ClaudeCode.md`, déplacé depuis la racine) avec les écarts trouvés à l'implémentation (ID réel `ADCS-25`, pas de CVE canonique, périmètre réduit). En parallèle, `New-DowntimeBlock`/`New-RevLossBlock`/`New-RemCostBlock`/`New-FinancialSection` et le bloc « Risk Exposure » du rapport CEO gagnent un encart « calc-explain » détaillant la formule et les compteurs utilisés pour chaque estimation financière/risque, en FR/EN/NL. Comptage régénéré au passage : 241 → **242** `New-Ctrl` statiques on-prem.

### d) Assignation de remédiation par département (`82c8e81`)

Le select « Assigné à » de `RemediationPlanner.tsx` regroupe désormais les candidats IAM par département (optgroup) et propose une option « tout le département » en tête de chaque groupe non vide, pour les cas où le responsable exact n'est pas encore identifié. Nouveau champ `PlanningEntry.assigneeDepartment`, mutuellement exclusif avec `assigneeEmail`.

### e) Fix de la documentation licence (`1d84e61`)

`resources_license/README.md` recommandait `npm run tauri build` pour embarquer `ShieldAD.lic`, mais `tauri.conf.json` (chargé par cette commande) n'a jamais eu de `bundle.resources` — c'est `npm run build:client-license` (`tauri.license.conf.json`) qui embarquait réellement le fichier. Confusion vérifiée en pratique (licence déposée dans `resources_license/` mais toujours invalide après build). Corrigé juste avant que ce flux ne soit lui-même retiré au point g).

### f) Build démo — `npm run build:demo` (`57974d5`, `9bb0d68`)

Troisième type de build, en plus du build universel et de l'ancien build par client (retiré au point g) : active la feature Cargo `demo_mode`, qui débloque tous les modules sans fichier `.lic`, y compris en release, pour les démonstrations commerciales. `DemoWatermark.tsx` affiche un bandeau permanent dès que `license.type === "DEMO"`, pour qu'un installateur de démo ne soit jamais confondu avec une licence payante. **Ce build ne doit jamais être livré à un client final.** Correctif suivant (`9bb0d68`) : `build:demo` et `tauri build`/`tauri dev` partageaient le même `src-tauri/target/`, s'écrasant silencieusement l'un l'autre en cas d'enchaînement — `build:demo` compile désormais dans `src-tauri/target-demo/` (`CARGO_TARGET_DIR`, via `cross-env`) ; contrepartie assumée : pas de cache incrémental partagé entre les deux dossiers.

### g) Passage de la licence à l'import self-service, retrait du build par client (`9e0aa49`)

L'utilisateur importe désormais lui-même son fichier `.lic` au premier lancement (`LicenseGate.tsx`) ou pour un renouvellement (`LicenseSummary.tsx`), via le même sélecteur de fichier natif que l'import manuel de mise à jour. Retire `npm run build:client-license`/`tauri.license.conf.json`/`resources_license/` : un seul installateur universel désormais, plus besoin de recompiler par client ni de risquer de perdre la licence à chaque mise à jour (le dossier d'installation est souvent recréé par l'installateur, un `.lic` embarqué n'y survivait pas forcément). Côté Rust, nouvelle commande `import_license` (`license.rs`) qui vérifie la signature RSA-4096 avant toute écriture disque, et persiste dans `app_data_dir()` plutôt qu'à côté de l'exécutable — la licence survit désormais aux mises à jour/réinstallations du binaire. **C'est ce commit qui rend obsolète l'ancien modèle « build par client » décrit dans les versions précédentes de ce document et dans `CLAUDE.md` avant cette date.**

### h) ShieldAD License Manager — nouvel outil interne (`2e94cd5`)

Remplace le flux `Read-Host` en console de `ShieldAD-LicenseGen.ps1` (fichier toujours présent dans le dépôt, mais dont l'usage interne bascule vers ce nouvel outil) par une app Tauri séparée, `license-manager/` — projet indépendant de `ShieldADv4/`, sans dépendance de build dans un sens ni dans l'autre, seuls le format `.lic` et la clé publique embarquée sont partagés. Formulaire, sélecteur de fichier pour la clé privée et le `.lic` de sortie, historique local des licences émises depuis le poste. Même cryptographie (RSA-4096 PKCS1v15-SHA256) et mêmes règles métier PROFESSIONAL/AUDITOR que le script d'origine. `license_gen.rs` copie volontairement `canonical_json()` de `license.rs` (isolation de sécurité : cet outil manipule la clé privée MSC, ShieldAD lui-même ne connaît que la clé publique) ; un test d'interopérabilité signe avec une paire de clés éphémère et vérifie avec la même primitive que `license.rs`, comblant un point jusqu'ici non testé côté produit.

### i) Audit de complétude CVE ShieldGraph — vue d'ensemble (6 phases / 11 commits, `ShieldGraph/STATUS.md`)

Point de départ : le mapping ATT&CK de ShieldGraph avait été enrichi au fil des sessions précédentes par des veilles ponctuelles (§1bis-a, §1quater-l), sans jamais faire l'objet d'une revue systématique croisant l'intégralité des CVE déjà citées dans le Worker, puis l'intégralité des CVE AD référencées par le NVD. Cette session comble ce trou méthodologique en 6 phases, résumées dans une nouvelle entrée de session `ShieldGraph/STATUS.md` (`ba44f20`) : complétude des règles ATT&CK déjà existantes (point j), raccordement Worker → ShieldGraph des CVE déjà connues (point k), balayage NVD ciblé sur les produits AD (point l), revue complète des 385 CVE AD référencées par NVD (point m), volet cloud/Azure AD en deux passes (point n), volet Windows Server au sens large (points o-q). Résultat global : `ShieldGraph_ATTCK_Rules.json` passe de **36 à 55 règles** (`ATTCK-001` à `ATTCK-055`, version finale **1.16**, `LastUpdated: 2026-08-24` — vérifié directement dans le fichier) et le Worker gagne **13 contrôles** on-prem (`K-16`, `K-17`, `DC-12` à `DC-19`, `LDAP-01`, `ADCS-26`, `C-17`, en plus d'`ADCS-25` du point c) ainsi qu'un contrôle cloud (`AZ-04m`, point q).

### j) Phase 1 — complétude des règles ATT&CK existantes + KerberLoss/ResetNightmare (`8d1d713`)

Ajoute les CVE manquantes à 3 règles déjà existantes (BadSuccessor rattachée à CVE-2025-53779 ; ESC9/ESC10 rattachées à Certifried, CVE-2022-26923) et crée `ATTCK-037`/`ATTCK-038` avec leurs contrôles Worker `K-16`/`K-17`, pour deux CVE Kerberos non couvertes : KerberLoss (CVE-2026-25177) et ResetNightmare (CVE-2026-27912).

### k) Phase 2 — raccordement Worker → ShieldGraph des CVE déjà connues du Worker (`639a372`)

Inventaire complet des CVE déjà citées dans `ShieldAD-Worker.ps1` : 7 contrôles avec CVE réelle (PrintNightmare, PetitPotam/PrinterBug, noPac, Zerologon, 2 RCE AD DS récentes) n'avaient aucune règle ShieldGraph correspondante — ajoutées en `ATTCK-039` à `ATTCK-044`. **Bug corrigé au passage :** deux numéros de KB inexistants (`KB5040855`/`KB5040856`, présents avant cette session) faisaient échouer en permanence `DC-10`/`DC-11`, même sur un DC réellement patché. `K-RC4-001` (CVE-2026-20833) volontairement laissé de côté : la condition porterait sur une propriété par objet que le graphe ne collecte pas encore, l'ajouter sans filtre reproduirait le bug de sur-classification déjà rencontré sur « AdminSDHolder Backdoor » (§1quater-c).

### l) Phase 3 — balayage NVD ciblé sur les CVE AD non encore connues du Worker (`1e2ce78`)

Requêtes API NVD filtrées par produit (AD DS/CS/FS, Kerberos, Netlogon, LDAP), distinctes de la revue du point k qui ne faisait que raccorder des CVE déjà citées dans le Worker. 3 nouveaux contrôles + règles ShieldGraph (`ATTCK-045` à `ATTCK-047`) : `DC-12` (CVE-2026-49164, RCE AD DS non authentifiée), `LDAP-01` (CVE-2025-26663/26670, RCE LDAP non authentifiée « wormable » — **nouvelle famille de contrôles**), `ADCS-26` (CVE-2025-27740, authentification ADCS faible vers Domain Admin). Beaucoup de CVE écartées comme non pertinentes (produits tiers, vulnérabilités obsolètes pré-2015, DoS pur). Omission de la session précédente corrigée au passage : `K-16`/`K-17` n'étaient pas taggés `CIS_IG3` comme leurs contrôles-frères (`K-15`, `DC-10`/`DC-11`, `ADCS-23`/`ADCS-24`/`ADCS-25`).

### m) Phase 4 — revue complète des 385 CVE AD référencées par NVD (`6c50c28`)

Recherche NVD par mot-clé « active directory » (385 CVE confirmées), filtrage programmatique (CVSS ≥ 7, Microsoft, non couvert, 2020+, hors Azure/AD FS-DoS) : 44 candidats, 27 réellement Microsoft on-prem après exclusion des faux positifs (produits tiers mentionnant l'AD en contexte). 2 nouveaux contrôles + règles : `C-17`/`ATTCK-048` (CVE-2025-21293, Network Configuration Operators), `DC-13`/`ATTCK-049` (CVE-2026-49179 — `ADCS-23` ne couvrait que les serveurs CA, pas l'ensemble des DC). 4 CVE rattachées à des règles existantes plutôt que dupliquées, déjà couvertes par un contrôle déjà vérifié : CVE-2020-0665 (cause racine d'`ATTCK-015`), CVE-2025-29810 (variante SID History, `ATTCK-014`), CVE-2021-42282/42291 (mêmes KB que noPac), CVE-2026-49178/55001/54115/58529 (même cumulatif que `DC-12`). Volet Azure/Entra et cluster DoS AD FS volontairement laissés hors périmètre de cette passe (traités au point n).

### n) Phase 4bis — volet cloud/Azure AD : aucun ajout, impossibilité structurelle (`2853d6c`)

Les 6 CVE Azure AD/Entra remontées par le balayage NVD ont été vérifiées une par une. 5 concernent le service cloud lui-même, patché côté serveur par Microsoft sans artefact local à vérifier — pas de KB, pas de version, rien qu'un contrôle ShieldAD puisse inspecter. La 6ᵉ (CVE-2021-36949, AAD Connect) est actionnable en principe, mais `ShieldAD-AADS.ps1` fonctionne entièrement via Microsoft Graph API (aucun accès WinRM/local) : la vérifier demanderait une nouvelle capacité de collecte, non justifiée pour une CVE de 2021 sur un composant qui se met à jour automatiquement par défaut. Documenté explicitement pour ne pas refaire cette recherche plus tard.

### o) Phase 5 — volet Windows Server au sens large (`174f99b`, `e1b356d`, `1835a38`, `48775aa`)

Les recherches des points l/m filtraient sur « active directory », mais un DC est un serveur Windows complet : toute RCE critique sur un service co-localisé compromet le domaine tout autant.
- **`174f99b`** : `DC-14`/`ATTCK-050` (SIGRed, CVE-2020-1350, RCE DNS Server non authentifiée, CVSS 10.0, jamais couverte malgré sa notoriété — branche N/A pour Server 2022+ dont le RTM postdate le correctif) ; `ATTCK-051`/`ATTCK-052` rattachées aux contrôles Worker existants `C-02`/`C-06` (EternalBlue/WannaCry, BlueKeep) — même lacune que PrintNightmare/noPac au point k, le contrôle et sa mitigation existaient déjà, juste sans règle ShieldGraph. SMBGhost (CVE-2020-0796) écartée : ne touche que Windows Server 1903/1909, hors support depuis 2020-2021, pas les versions LTSC en usage réel.
- **`e1b356d`** : `DC-15`/`ATTCK-053` (CVE-2022-26809, RPC Runtime RCE non authentifiée, CVSS 9.8, wormable, comparée à EternalBlue) ; `DC-16`/`ATTCK-054` (CVE-2023-21554, MSMQ QueueJumper, CVSS 9.8, wormable — MSMQ n'étant pas installé par défaut sur un DC, le contrôle vérifie d'abord la présence du service avant de tester le patch, même logique `NOT_APPLICABLE` qu'`ADCS-23`/`24`/`26`). CVE-2021-31166 (http.sys) et CredSSP (CVE-2018-0886) écartées avec justification (versions hors LTSC / nécessite une position MITM préalable).
- **`1835a38`** : CVE-2025-29824 (élévation de privilèges locale via le pilote CLFS, exploitée activement par le groupe Storm-2460/PipeMagic dans des campagnes de ransomware depuis avril 2025) rattachée au narratif d'`ATTCK-046` plutôt qu'à une nouvelle règle/contrôle — même cumulatif du 8 avril 2025 que `LDAP-01`. Écartées avec justification : MS14-068/CVE-2014-6324 (12 ans, Server 2012+ vulnérable seulement à une variante bien plus difficile), HiveNightmare/CVE-2021-36934 (surtout Windows 10 client), Drop the MIC/CVE-2019-1040 (déjà couverte thématiquement par `K-07`/`K-08`).
- **`48775aa`** : `DC-17`/`ATTCK-055` (CVE-2019-0626, RCE DHCP Server — rôle fréquemment co-localisé avec AD DS sur les DC des PME/ETI, jamais vérifié jusqu'ici, même garde de présence de service que `DC-16`). Balayage NVD final (Windows Server + CVSS Critical, ~99 CVE passées en revue) : aucun autre candidat pertinent au-delà de ce qui est déjà couvert, ce qui clôture le volet Windows Server.

### p) Phase 6 — durcissement hors-CVE : synchronisation horaire et Windows Update sur les DC (`d6fe59e`)

`DC-18` : vérifie la synchronisation horaire (W32Time) des contrôleurs de domaine — Kerberos tolère une dérive maximale de 5 min (`MaxClockSkew`) par défaut, au-delà l'authentification échoue sur tout le domaine ; vérifie que le PDC Emulator pointe vers une source externe (`Type=NTP`) et que les autres DC suivent la hiérarchie du domaine. `DC-19` : vérifie que les mises à jour automatiques Windows Update sont réellement actives sur les DC plutôt que de le supposer — complémentaire à tous les contrôles de patch CVE de cette session (`DC-10` à `DC-17`, `K-15` à `K-17`, `ADCS-23`/`24`/`26`, `LDAP-01`, `C-17`), dont la valeur dépend justement de ce mécanisme. Classés `CIS_IG1` (hygiène de base) comme `DC-03`/`DC-06`, pas `IG3`. Pas de nouvelle règle ShieldGraph : ce sont des contrôles d'hygiène/fiabilité, pas des techniques d'attaque exploitables (même catégorie que `DC-06`/`AUD-01`/`SEC-21`). **Bug corrigé au passage :** `DC-17` n'avait pas d'entrée dans le dictionnaire NL (`CEONames_NL`), contrairement à FR/EN déjà présents.

### q) Protection SyncJacking côté cloud — `AZ-04m` (`f127338`)

Recherche des nouveautés côté Entra ID des deux derniers mois. CVE-2026-69836 (CVSS 10.0, RCE Entra ID, alerte du 21/08/2026) vérifiée puis écartée : Microsoft indique explicitement « fully mitigated… no action for users of this service to take » — même raisonnement structurel qu'au point n, rien qu'un client ne puisse inspecter ou corriger. SyncJacking (recherche Semperis 2026), en revanche, est actionnable : abus du hard/soft matching d'Entra Connect, permettant à un attaquant disposant d'un accès en écriture sur un objet AD on-prem de prendre le contrôle d'un compte cloud synchronisé — y compris Global Admin — en falsifiant `sourceAnchor`. Nouveau contrôle `AZ-04m` vérifiant `blockCloudObjectTakeoverThroughHardMatchEnabled`/`blockSoftMatchEnabled` (Graph API bêta), avec la réserve documentée que Microsoft/Semperis considèrent cette protection insuffisante seule — le MFA généralisé (`AZ-02c`, déjà existant) reste la seule mitigation pleinement efficace. Nouvelle permission Graph en lecture seule ajoutée au scope OAuth (`OnPremDirectorySynchronization.Read.All`) : nécessitera un reconsentement admin au prochain scan pour les tenants déjà connectés.

### r) Comptage régénéré, totaux finaux de la session

Comptage régénéré automatiquement par le hook pre-commit à chaque commit touchant un Worker, valeur finale le 2026-08-24 16:25 (`docs/CONTROL-COUNTS.generated.md`, hash source `D2F8B0E8C8FC-11DB8D03ADE6`) : **255** `New-Ctrl` statiques on-prem (241 → 242 au point c, → 244 au point j, → 247 au point l, → 249 au point m, → 250 au point o/`174f99b`, → 252 au point o/`e1b356d`, → 253 au point o/`48775aa`, → 255 au point p) + 55 dynamiques = **310** on-prem ; **153** cloud (152 + `AZ-04m`) ; **463** au total général — contre 296/152/448 à la clôture du §1quater. `ShieldGraph_ATTCK_Rules.json` : **55** règles, version **1.16** — contre 36/v1.6 à la clôture du §1quater.

### s) Ce qui n'a volontairement pas été fait

`92eac58` (risque de performance architectural dans `Find-AttackPaths` — BFS relancé pour chaque paire source×cible au lieu d'un seul BFS multi-source par cible, §1quater-m) reste non corrigé et non mesuré cette session, faute de lab à grande échelle. `K-RC4-001` (point k), SMBGhost/CredSSP/http.sys (point o), MS14-068/HiveNightmare/Drop the MIC (point o) et les 5 CVE Azure AD non actionnables + AAD Connect CVE-2021-36949 (point n) restent des exclusions **documentées et justifiées**, pas des oublis — voir le détail de chaque point ci-dessus plutôt qu'une nouvelle recherche.

---

## 1sexies. Nouveautés depuis la dernière vérification (2026-08-24 → 2026-09-03)

Contexte git : 50 commits sur `chore/logo-and-cleanup` entre `ba44f20` (clôture du §1quinquies) et `a136198` (HEAD actuel), plus un lot de changements **non commités** au moment de cette relecture (point o). Deux modules de scan entièrement nouveaux (LDAP/OpenLDAP/FreeIPA, AWS IAM) reçoivent leur propre section dédiée sur le modèle de §15/§16 (§17/§18 respectivement) — ce point n'en résume que l'essentiel avec la date d'apparition. Une bonne partie du travail ShieldGraph du 2026-08-26 (points a/c ci-dessous) a déjà été documentée en détail au **§15.6** par une relecture précédente ; ce point s'y réfère plutôt que de la dupliquer, et corrige un point inexact qui s'y trouvait (point c).

### a) Remédiation guidée + ShieldPredict v1 (`ad2af9a`, 2026-08-25)

24 fichiers, +5845/-46 lignes. Deux livraisons dans un même commit :

- **Remédiation guidée** : nouvelle commande Tauri `remediation::get_remediation_affected_objects(control_id, ad_domain)` (`src-tauri/src/remediation.rs`, 252 lignes) — écrit l'un de 5 scripts PowerShell embarqués en constantes (`A01_SCRIPT`/`K03_SCRIPT`/`K04_SCRIPT`/`A06_SCRIPT`/`A11_SCRIPT`, sélectionnés par `script_for()`) dans un fichier temporaire, l'exécute via `hidden_powershell()`, parse le JSON stdout. Requêtes `Get-AD*` strictement lecture seule (`Get-ADGroupMember`, `Get-ADUser`/`Get-ADComputer` filtrés LDAP), domaine passé via `-DomainParam` (jamais interpolé dans le corps du script), plafonné à 50 objets avec drapeau `truncated`. Nouveau composant `src/components/AffectedObjectsPanel.tsx` (169 lignes) affiche ces objets AD réels en regard de chaque contrôle FAIL. `src/data/remediationGuides.ts` (617 lignes) documente 7 contrôles (`A-01`, `K-03`, `K-04`, `A-06`, `A-11`, `P-01`, `P-07`) en FR/EN/NL, mais seuls les 5 premiers ont un script de collecte live associé — `P-01`/`P-07` n'ont qu'un guide texte.
- **ShieldPredict v1** : `src/tabs/TabShieldPredict.tsx` (599 lignes, remplace un placeholder) — sandbox de sélection multi-nœuds (Group/User/ServiceAccount/HybridUser) agrégeant plusieurs appels à `run_shieldgraph_simulation` (commande pré-existante, lecture seule) via `aggregateBatch()` (`src/lib/shieldPredictAggregate.ts`, 142 lignes) : buckets de sévérité avant/après, chemins fermés dédupliqués par ID, somme des jours de remédiation, impact métier maximal. Gaté par la licence : nouveau module `"SHIELDPREDICT"` dans `license.rs`, champ `allow_predict` dérivé (`lic.modules.iter().any(|m| m == "SHIELDPREDICT")`), exposé `allowPredict` côté TypeScript — cohérent avec la mention déjà présente dans `CLAUDE.md` (`TabShieldPredict.tsx`, gaté `allowPredict`).

### b) LDAP/OpenLDAP/FreeIPA — nouveau module de scan (`a5dd845`, 2026-08-26) — voir §17

Support de scan pour des annuaires LDAP génériques (OpenLDAP, FreeIPA, tout LDAPv3) distincts d'Active Directory — troisième famille de scan aux côtés d'on-prem/Azure, pas une extension du Worker AD. Détail architecture/contrôles au §17 nouvellement créé ; retenir ici : **59 contrôles** vérifiés par comptage direct (10 catégories), non couverts par `scripts/Count-ShieldADControls.ps1` (qui référence en dur seulement `ShieldAD-Worker.ps1`/`ShieldAD-AADS.ps1`/`ShieldAD-AWS-IAM.ps1`) — absent de `docs/CONTROL-COUNTS.generated.md` et du total général §1, à corriger séparément si ce module devient commercialisé. Licence : module `"SHIELDLDAP"` (`allow_ldap`) — absent de `ShieldAD.lic` livré en dépôt à ce jour (même constat qu'AWS, point h). Document de conception source `SHIELDAD_LDAP_HYBRID_TAURI_v4.md` (724 lignes) déplacé vers `.claude/` le même jour (`ec5ef21`, renommage pur, 0 ligne modifiée) — son propre commit d'implémentation (`a5dd845`) note que la réalisation diverge de ce plan sur le staging du worker, la gestion des identifiants et le canal d'événements.

### c) ShieldGraph : confiance/preuve, dead ends, choke points, collecte AdminTo, corrections de simulation (`d093d7b`, `47b4bb7`, `53c1dc2`, 2026-08-26)

Le détail technique de la session Confidence/Evidence/ShieldPredict du 2026-08-26 est déjà documenté au **§15.6** (chaîne de confiance par arête, classification `CONFIRMED`/`CONDITIONAL`/`THEORETICAL`, dead ends, choke points pondérés). Trois compléments à noter ici :

- **`d093d7b`** corrige 3 bugs distincts dans la simulation ShieldPredict/ShieldGraph : `-Server $Domain` utilisait un libellé d'affichage de l'onboarding plutôt qu'un vrai nom de serveur (échec systématique) ; `Compare-Object`/JSON reconstruit renvoie un objet scalaire dont `.Count` vaut `$null` en PowerShell 5.1 sur un résultat à un seul élément (échec silencieux des tests `-gt 0`) ; et surtout, `BufReader::lines()` strict-UTF8 côté Rust (`scan.rs`, lecteurs stdout/stderr de `start_scan`/`start_azure_scan`) abandonnait **tout le reste de la lecture** dès la première ligne contenant un octet non-UTF8 (accents émis hors console PowerShell) — corrigé par un nouvel helper partagé `read_lines_lossy()` (`src-tauri/src/winproc.rs`, +32 lignes). Le même commit ajoute la collecte **AdminTo** (arête ShieldGraph, équivalent BloodHound/SharpHound) via `ShieldAD-ShieldGraph-LocalAdmin.ps1` (nouveau, 348 lignes) — analyse GPO Restricted Groups/GPP `Groups.xml` toujours active, énumération ADSI live optionnelle (`-IncludeLiveLocalAdmin`).
- **`53c1dc2`** clarifie l'UX de l'onglet ShieldPredict (encart explicatif permanent, légende des choke points, mention explicite « action simulée, lecture seule » par résultat) — pur texte/copie, aucune logique modifiée.
- **`47b4bb7`** — **correctif à apporter au §15.6** : son propre message de commit affirme que « ShieldPredict renvoie un vrai pourcentage de réduction de risque », et §15.6 (rédigé par une relecture précédente) reprend cette formulation telle quelle. Vérification faite pour cette mise à jour : `RiskReductionPercent`/`CriticalPathsClosed` (fonction partagée `Get-RiskReductionStats`) atteignent bien `SimulationModal.tsx`/`BlastRadius.tsx` **dans l'onglet ShieldGraph**, mais **pas** `src/lib/shieldPredictAggregate.ts` ni `TabShieldPredict.tsx` — l'onglet ShieldPredict continue d'agréger uniquement via un compte de chemins fermés dédupliqués (`closedAttackPaths`), sans utiliser ce nouveau pourcentage. L'enrichissement a bien atterri dans ShieldGraph, pas dans l'onglet ShieldPredict lui-même malgré le nom de la fonction/le message de commit.

### d) Fix du chemin de sortie de `npm run build:demo` (`455c4e2`, 2026-08-26)

`CARGO_TARGET_DIR=src-tauri/target-demo` (via `cross-env`) est interprété relativement au répertoire de travail réel de `cargo` pendant `tauri build`, qui est `src-tauri/` et non la racine du dépôt — produisait donc `src-tauri/src-tauri/target-demo/`, un niveau d'imbrication en trop, jamais nettoyé par le `.gitignore` (`src-tauri/target-demo/`, qui ne matchait donc jamais). Corrigé en `CARGO_TARGET_DIR=target-demo` (relatif à `src-tauri/`).

### e) 22+2 tickets UI/UX livrés (`328e7d7` → `c070662`, `1066c8b`, `2d34366`, `b3cfd65`, 2026-08-27)

Deux documents de spécification committés — `ShieldAD_Tickets_UIUX_ClaudeCode.md` (940 lignes, 23 tickets T01-T23) et `ShieldAD_Tickets_UIUX_ClaudeCode_Theme03_SansIA.md` (137 lignes, T24-T25, thème explicitement « sans IA » : contenu déterministe, aucun appel LLM) — puis leur implémentation, un ticket par commit. **24 tickets livrés sur 25** (T06 écarté : `AffectedObjectsPanel.tsx` + `remediation.rs::get_remediation_affected_objects`, point a ci-dessus, couvraient déjà le besoin réel ; T12 partiel : seule la moitié « copier la commande avec coloration syntaxique » a été construite, le bouton de navigation croisée contrôle→nœud ShieldGraph a été explicitement différé faute de correspondance dans le modèle de données) :

| Ticket | Résumé | Fichier(s) clé(s) |
|---|---|---|
| T01 | Palette de commandes (Ctrl+K) | `CommandPalette.tsx`, `store/commandPaletteStore.ts` (nouveaux) |
| T02 | Icônes de sidebar + labels | `Sidebar.tsx`, `icons/NavIcons.tsx` (nouveau) |
| T03 | Raccourcis clavier de remédiation | `hooks/useKeyboardShortcuts.ts`, `ShortcutsHelpModal.tsx` (nouveaux) |
| T04 | Structure à trois paliers pour les listes de contrôles | `ControlTable.tsx` (refonte), `lib/controlSeverity.ts` (nouveau) |
| T05 | Normalisation des échelles entre graphiques | `lib/scoreThresholds.ts` (nouveau), `DomainBars.tsx`, `ScoreRing.tsx`, `TrendChart.tsx` |
| T06 | *Écarté* — déjà couvert par `AffectedObjectsPanel.tsx` | — |
| T07 | Presets de vue par rôle (Rapide/Standard/Experte) | `store/viewPreferenceStore.ts` (nouveau) |
| T08 | Mémorisation du dernier filtre/contexte | `lib/persistedFilters.ts` (nouveau) |
| T09 | Rayon d'impact (blast radius) ShieldGraph | `shieldgraph/data/pathfinding.ts` (nouveau), `AttackGraph.tsx` |
| T10 | Page de synthèse « Posture » multi-scans | `shieldgraph/components/PostureOverview.tsx` (nouveau) |
| T11 | Onboarding contextuel 1er lancement ShieldGraph | `shieldgraph/components/OnboardingTour.tsx` (nouveau) |
| T12 *(partiel)* | Copier la commande avec coloration syntaxique | `components/RemediationCommand.tsx` (nouveau) |
| T13 | États de suivi persistants entre scans | `store/planningStore.ts`, `StatusBadge.tsx` (nouveau) |
| T14 | Trust Page — génération backend et anonymisation | `src-tauri/src/trustpage.rs` (nouveau) |
| T15 | Trust Page — interface de configuration et partage | `TrustPageSettings.tsx`, `lib/trustPageHtml.ts` (nouveaux) |
| T16 | Trust Page — branding et filtre par référentiel | `TrustPageSettings.tsx`, `trustpage.rs` |
| T17 | États vides actionnables partout | `components/EmptyState.tsx` (nouveau), ~9 onglets |
| T18 | Micro-confirmations variées en fin de scan | `lib/scanResultMessages.ts` (nouveau) |
| T19 | Assistant de première config ShieldConnect | `onboarding/ShieldConnectFirstRun.tsx` (nouveau) |
| T20 | Cartes ShieldConnect adaptatives + logos | `TabShieldConnect.tsx` |
| T21 | Badge d'état persistant par connecteur | `lib/relativeTime.ts` (nouveau) |
| T22 | Jamais la couleur seule (audit + correctifs sévérité) | `LicenseSummary.tsx`, `AttackGraph.tsx`, `msc-tokens.css` |
| T23 | Navigation clavier complète + focus visible | `shieldgraph/components/AccessibleNodeList.tsx` (nouveau) |
| T24 | Narratif automatique étendu à tous les onglets | `lib/risk-narrative.ts` (+86), `NarrativeCard.tsx` (nouveau) |
| T25 | Bouton « Explique ce contrôle » (statique, sans chatbot) | `components/StandardsBadges.tsx` (nouveau), `ControlTable.tsx` |

Décisions produit actées pendant ce chantier : T09/T10 gatés sous le flag de licence existant `allowGraph` (pas de palier de licence dédié) ; T13 — un contrôle « Corrigé » qui redevient FAIL/WARN au scan suivant repasse automatiquement à « Non traité » avec un marqueur « réapparu » ; T14 — la Trust Page n'expose que des agrégats par référentiel (liste blanche explicite), jamais le détail contrôle par contrôle ni la liste des contrôles PASS ; T14/T15 — hébergement en export HTML statique côté client uniquement, aucun service hébergé MSC (aucune infra serveur dans ce dépôt). T23 (test lecteur d'écran NVDA) n'a pas pu être vérifié en environnement CI, signalé explicitement dans le commit plutôt que revendiqué comme fait. T24 confirmé strictement dérivé de champs déjà émis par le Worker (`status`/`severity`, jamais le texte libre `detail`, pour ne pas casser la localisation EN/NL) ; T25 confirmé statique — aucun texte généré à la volée, uniquement `biz_impact`/`cis_ig`/`standards` déjà présents dans le JSONL.

### f) Export groupé de l'historique des scans + ShieldGraph vers le Bureau (`7a8e56f`, 2026-08-27)

Nouvelle commande Tauri `export_scan_bundle` (`src-tauri/src/onboarding.rs`, +97 lignes) déclenchée par un bouton « Exporter le scan » dans `ScanForm.tsx` : regroupe l'historique on-prem (`ShieldAD_History_*.json` + dernier `ShieldAD_Scan_*.json`) et les scans ShieldGraph de la session courante (`ShieldGraph_Data_*.json`) dans un seul JSON, écrit directement sur le Bureau (`app.path().desktop_dir()`, sans boîte de dialogue). **Cette même commande sera réutilisée et étendue le 2026-09-03** (point m) pour le nouveau flux de fermeture d'application.

### g) Polish visuel — logo, couleurs de sévérité, clarification remédiation (`a984f1a`, `b49f7b5`, `adc38d7`, 2026-08-28)

- **`a984f1a`** : `src/assets/logo-msc.png` redimensionné 1408×768 → 560×305 px (872 Ko → 86 Ko, confirmé par le diff binaire) — affiché à seulement 28 px de haut dans `Header.tsx`/168 px de large max dans `Sidebar.tsx`, aucune raison de conserver le fichier source pleine résolution.
- **`b49f7b5`** : consolide des maps de couleur de sévérité dupliquées dans **7 fichiers** (`RiskCard.tsx`, `TabDirection.tsx`, `TabRemediation.tsx`, `IamUserDetailModal.tsx`, `TabIAM.tsx`, `AffectedObjectsPanel.tsx`, `TabShieldPredict.tsx`) vers un nouveau module partagé `src/lib/severityColors.ts` (36 lignes, même schéma que `scoreThresholds.ts` déjà existant) — trois maps distinctes (`CONTROL_SEVERITY_COLOR`, `IAM_RISK_COLOR`/`IAM_RISK_BG`, `GENERIC_RISK_COLOR`) selon le domaine, aucun changement de comportement (import aliasé pour préserver les noms locaux existants à chaque site d'appel).
- **`adc38d7`** : `TabRemediation.tsx` gagne un titre/sous-titre expliquant que cet écran est une vue lecture seule filtrable par sévérité, avec un lien direct vers IT > Planning de remédiation (`RemediationPlanner.tsx`) pour l'assignation/le suivi de statut — clarifie un chevauchement jusque-là non expliqué entre les deux écrans de remédiation (seul `RemediationPlanner` a un suivi de statut, depuis T13).

### h) Module AWS IAM — multicloud v4, usage interne (`30af098`, 2026-08-31) — voir §18

21 fichiers, +2136/-24 lignes. Nouveau module de scan **AWS IAM** (`ShieldAD-AWS-IAM.ps1`, 1 553 lignes) — troisième produit de la famille multicloud aux côtés d'Azure/Entra ID et (point b) LDAP générique, mais d'une nature différente : il ne parle ni LDAP ni Kerberos, c'est un modèle d'identité entièrement distinct (IAM AWS). **89 contrôles** vérifiés (95 appels `New-AwsCtrl`, dont 6 paires mutuellement exclusives valeur réelle/repli `INFO`, donc 89 IDs uniques par scan), 13 familles (ROOT, USERS, GROUPS, ROLES, POLICY, KEYS, MFA, PWDPOL, IDP, LOG, ORG, POSTURE, DOC). Architecture détaillée au §18.

**Décision produit (confirmée) : ce module reste un projet interne, non proposé aux clients.** Construit et testé de bout en bout (module de licence `"SHIELDAWS"`/`allow_aws`, commandes Tauri `start_aws_scan`/`stop_aws_scan`, onglet `TabAws.tsx`), mais volontairement tenu à l'écart de l'offre commerciale : Entra ID, LDAP et le module IAM on-prem restent dans la famille AD/annuaire (Entra ID *est* de l'AD dans le cloud ; LDAP parle le même langage protocolaire), alors qu'AWS IAM n'a ni LDAP, ni Kerberos, ni GPO, ni trusts — le commercialiser maintenant engagerait implicitement ShieldAD vers un positionnement « plateforme de sécurité des identités » plutôt que « outil de sécurité Active Directory », une décision que MSC préfère prendre délibérément plutôt que par accumulation. Le module reste disponible immédiatement si un signal de demande client se matérialise (`ShieldAD.lic` livré en dépôt aujourd'hui ne contient ni `SHIELDAWS` ni `SHIELDLDAP` dans ses `Modules`, seulement `SHIELDCONNECT`/`SHIELDGRAPH`/`SHIELDPREDICT`/`SHIELDBRAND`). Document de plan source : `IMPLEMENT_MULTICLOUD_SHIELDAD.md` (859 lignes, ajouté à la racine par `fba0f7b` le 2026-09-02, déplacé vers `.claude/` en fin de session non commitée — point o) — signale l'identité GCP comme feuille de route uniquement, non implémentée.

### i) Correctifs — crash `SV-05`, prérequis MSAL/Graph bloqués et peu fiables (`ee22d10`, `dad2890`, `9a1e17a`, 2026-09-01/02)

- **`ee22d10`** : le contrôle `SV-05` (DCSync, `ShieldAD-Worker.ps1`) plantait sur `NTAccount + NTAccount` (`op_Addition` non défini) dès que `($dcsyncFail | Select-Object -Exp IdentityReference)` ne retournait qu'un seul résultat — `Select-Object -ExpandProperty` déballe alors un pipeline à un seul élément en scalaire plutôt qu'en tableau, cassant la concaténation `+`. Corrigé en enveloppant les deux côtés dans `@(...)`.
- **`dad2890`** : le bouton « Corriger » de l'onboarding (prérequis MSAL/Graph) restait bloqué indéfiniment sur « Installation... » — `Install-Module`/`Install-PackageProvider`, même en `-NonInteractive`, peut lever une confirmation `ShouldContinue` (bootstrap du fournisseur NuGet, dépôt PSGallery non approuvé) que rien ne peut valider, suspendant le process enfant pour toujours. Corrigé par un timeout (`run_ps_script` gagne un paramètre `Duration`, boucle de sondage `try_wait`/kill), `$ConfirmPreference='None'` + `Set-PSRepository PSGallery -InstallationPolicy Trusted` forcés dans les scripts de correctif, exécution via `spawn_blocking`.
- **`9a1e17a`** : même après une installation réussie, la détection post-installation de MSAL/Az/Graph échouait silencieusement sur les postes dont le `PSModulePath` par défaut exclut le dossier CurrentUser Modules (cible de `Install-Module -Scope CurrentUser`) — le process de sonde, lancé séparément, ne voyait pas le module fraîchement installé. Corrigé en préfixant explicitement `Documents\WindowsPowerShell\Modules` dans `$env:PSModulePath` (sonde + scripts de correctif), avec une erreur explicite (plutôt qu'un échec silencieux) si le module reste introuvable malgré tout.

### j) Device Code Flow Azure cassé + retrait des compteurs figés + 15 contrôles cloud non annoncés (`9516af0`, 2026-09-02)

Le message de commit ne couvre que deux points, mais le diff en contient trois :

1. **Device Code Flow cassé** : `ShieldAD-AADS.ps1` résolvait `ShieldAD-Connect.json` (ClientId de l'App Registration MSC) via `$PSScriptRoot`, introuvable une fois le worker matérialisé par `embedded_workers.rs` dans son dossier temporaire — l'authentification Azure échouait avant même l'ouverture de la fenêtre Device Code Flow, silencieusement. Corrigé par un nouveau paramètre `-ConnectJsonPath`, alimenté depuis Rust (`azure_connect_json_path()`/`ensure_azure_connect_json_exists()`, `scan.rs` +46 lignes) qui lit/écrit `Documents\ShieldAD\ShieldAD-Connect.json` (survit aux réinstallations, réamorcé depuis `include_str!` si absent). `-LogFile` est désormais également transmis au worker (`Write-AADSLog` était un no-op jusqu'ici, faute de valeur).
2. **Retrait des compteurs de contrôles en dur** : `ScanForm.tsx` affichait des sous-titres avec des nombres littéraux (`204`/`149`), déjà périmés au moment du commit — remplacés par une lecture directe de `docs/control-counts.generated.json` (règle `CLAUDE.md` : jamais de nombre de contrôles figé).
3. **⚠️ +15 contrôles cloud non mentionnés dans le message de commit** : le diff de `ShieldAD-AADS.ps1` ajoute `AZ-01l` (redondance Global Admin), `AZ-01m` (compte à privilège avec boîte mail active), `AZ-01n` (utilisateurs cloud-only éligibles PIM), `AZ-01o` (rôles personnalisés à risque), `AZ-02m` (persistance de session MFA), `AZ-02n` (Named Location IP privée), `AZ-02o` (protection mots de passe personnalisée, INFO), `AZ-03i` (rôle Directory Synchronization Accounts), `AZ-04n` (enregistrement d'applications restreint), `AZ-04o` (création de tenants restreinte), `AZ-04p` (consentements délégués à risque), `AZ-04q` (autorités CBA inventoriées, INFO) et une **nouvelle famille `AZ-15`** — Unités administratives (`AZ-15a/b/c`, 3 contrôles). Le commentaire d'en-tête du fichier les attribue à une analyse d'écart type Purple Knight/PingCastle. C'est ce lot, pas un commit dédié, qui fait passer le comptage cloud de 153 à **168** — tableaux de familles mis à jour au §6.

### k) Branding — icône de l'app, réorganisation documentaire, plan multicloud (`fba0f7b`, `99d087d`, `ef090d7`, 2026-09-02/03)

- **`fba0f7b`** : déplace les deux catalogues de tickets UI/UX vers `.claude/` (renommage pur) et ajoute `IMPLEMENT_MULTICLOUD_SHIELDAD.md` (859 lignes) à la racine — document de plan ayant guidé le module AWS IAM (point h), notant l'identité GCP comme non implémentée/feuille de route uniquement.
- **`99d087d`** puis **`ef090d7`** : remplace l'icône par défaut de l'app par le logo MSC (16 fichiers icônes Tauri régénérés depuis `src/assets/logo-msc.png`), puis corrige un défaut de la première régénération — la marge transparente du PNG source était recopiée telle quelle dans le carré final, rendant le bouclier minuscule à l'affichage (icône bureau notamment). Corrigé par un recadrage sur le contenu non transparent avant le remplissage carré.

### l) Sidebar tronquée + rapport Azure absent du menu Rapports (`62b2e2d`, 2026-09-03)

Deux bugs distincts dans le même commit :

- **Sidebar tronquée** : `Sidebar.tsx` — le `<nav>` (`flex: 1, overflowY: "auto"`) n'avait pas `minHeight: 0` ; dans un conteneur flex colonne, un enfant flex garde par défaut `min-height: auto`, ce qui l'autorise à grandir selon son contenu et neutralise le rétrécissement attendu de `flex: 1` — dès que la liste d'onglets s'allongeait, la nav refusait de défiler en interne et repoussait « Mode sombre »/« Paramètres » hors de l'écran visible.
- **Rapport Azure absent du menu Rapports** : `ShieldAD-AADS.ps1` écrivait son rapport HTML sur disque mais n'émettait jamais l'événement JSONL `report_ready` après coup (contrairement à `ShieldAD-Worker.ps1`) — `ReportsMenu.tsx` se peuple exclusivement depuis ce flux d'événements, donc le rapport existait sur disque sans jamais apparaître dans le menu.

### m) Fermeture de l'application : d'un simple rappel à un export explicite (`cd0a71b` → `a136198`, 2026-09-03)

Deux commits successifs le même jour, le second remplaçant le premier plutôt que le complétant :

- **`cd0a71b`** ajoute une interception Rust du `WindowEvent::CloseRequested` (`lib.rs`) : au premier événement, un état `CloseConfirmed(AtomicBool)` à `false` déclenche `api.prevent_close()` et émet `"close-requested"` côté frontend au lieu de fermer ; une nouvelle commande `confirm_app_close` positionne le flag à `true` puis referme la fenêtre, qui traverse cette fois le handler existant (arrêt des workers PowerShell actifs, purge des fichiers temporaires — §8, `cleanup.rs`) sans blocage. `CloseConfirmModal.tsx` (nouveau) affiche un texte indiquant que l'historique du scan est « déjà sauvegardé » dans le dossier de sortie.
- **`a136198`** (dernier commit, HEAD) **corrige une erreur factuelle** de ce texte : le dossier de sortie est **toujours** purgé à la fermeture (`cleanup::purge_output_dir`, quel que soit le dossier choisi par l'utilisateur — « ShieldAD est un outil d'audit, pas un espace de stockage », dixit le message de commit) — rien n'y est donc jamais « déjà sauvegardé ». Le mécanisme d'interception `CloseRequested`/`confirm_app_close` de `cd0a71b` est conservé tel quel ; `export_scan_bundle` (la même commande que le point f, `7a8e56f`) est étendu d'un paramètre optionnel `dest_dir : Option<String>` — absent (comme au site d'appel existant de `ScanForm.tsx`), le comportement est inchangé (Bureau par défaut) ; fourni, le bundle est écrit dans ce dossier à la place. `CloseConfirmModal.tsx` propose désormais un choix à trois voies : **« Exporter et fermer… »** (sélecteur de dossier natif `tauri-plugin-dialog`, puis `export_scan_bundle` avec le dossier choisi, puis `confirm_app_close`), **« Fermer sans exporter »** (comportement de secours identique à avant) et **« Annuler »**. C'est ce comportement, pas celui de `cd0a71b`, qui fait foi à la date de ce document.

### n) Onglets Direction/IT vides sur un scan Azure seul (`1950298`, 2026-09-03)

`TabDirection.tsx`/`TabIT.tsx` conditionnaient leur `EmptyState` (placeholder « aucun scan ») uniquement sur `status === "idle"` — le statut du scan **on-prem**. Un utilisateur n'ayant lancé qu'un scan Azure (jamais de scan on-prem) avait donc `status === "idle"` en permanence, même avec des contrôles Azure déjà présents dans le store partagé, et voyait un onglet vide malgré des données réelles. Corrigé en exigeant `status === "idle" && azureStatus === "idle" && ldapStatus === "idle"` avant d'afficher le placeholder. `TabDirection.tsx` corrige au passage ses KPI (score/pass/warn/fail), qui ne dérivaient jusqu'ici que du `summary` on-prem (toujours à 0 sur un scan Azure seul) : calculés désormais directement depuis `controlList` (déjà fusionné AD+Azure+LDAP), avec un score global moyenné et pondéré par le nombre de contrôles de chaque scan terminé (`summary`/`azureSummary`/`ldapSummary`) — le score lui-même reste calculé côté serveur (pondéré par sévérité dans le Worker PowerShell) et ne peut pas être recalculé côté client à partir des seuls contrôles bruts.

### o) Barre de progression Azure + réorganisation documentaire (`34d9983`, `c176eaa`, 2026-09-03)

Décrit au moment de la relecture comme non encore commité — commité depuis sur `chore/logo-and-cleanup` en deux temps (code d'un côté, documentation de l'autre) :

- **`ShieldAD-AADS.ps1`** : le scan Azure n'émettait jusqu'ici aucun événement de progression (`"type":"progress"`, réservé au scan on-prem) — `Set-AADSState` réutilise désormais les ~25 points d'appel `Progress` déjà répartis dans le script pour émettre `"azure_progress"` en JSONL, avec le dernier `StatusMsg` connu comme message. Deuxième correctif dans le même fichier : `Invoke-IamEntraInventory` (module IAM, §16) appelait `Get-MgUser -All -Property "...,signInActivity,..."` sans `-ConsistencyLevel eventual` (exigence Graph dès que `signInActivity` figure dans `-Property` — requête rejetée sinon) et sans repli si le tenant n'a pas de licence Entra ID P1/P2 (requise pour `signInActivity`, sinon 403 bloquant tout l'inventaire) — un `try/catch` retente désormais sans `signInActivity` dans ce cas, journalisé plutôt que silencieux.
- **`src/types/scan.ts`/`src/store/scanStore.ts`/`src/hooks/useScan.ts`** : nouveau type `AzureProgressEvent` + champs `azureProgressPct`/`azureProgressMessage` (séparés de `progressPct`/`progressMessage` on-prem, pour que les deux scans affichent chacun leur propre barre sans s'écraser). Bug corrigé au passage, plus impactant : `stop_scan`/`stop_azure_scan`/`stop_ldap_scan`/`stop_aws_scan`/`stop_iam_scan` tuent le process worker (`TerminateProcess`), qui n'a donc jamais l'occasion d'émettre son propre `session_end` — rien ne remettait alors `status`/`azureStatus`/etc. à `"idle"`, laissant les boutons Démarrer/Arrêter bloqués indéfiniment après un arrêt manuel. Chaque `stop*` appelle désormais son `reset*()` explicitement. Nouvelle fonction `resetOnPrem()` (distincte de `reset()`, qui effaçait aussi les scans Azure/LDAP/AWS en cours) répare un bug symétrique : démarrer un scan on-prem faisait jusqu'ici disparaître tout scan satellite déjà affiché.
- **`src/components/ScanForm.tsx`/`ScanProgress.tsx`** : `ScanProgress` accepte désormais une prop `variant="onprem" | "azure"`, une seconde instance affichée sous la section Azure de `ScanForm.tsx` (jusqu'ici, seul le scan on-prem avait une barre de progression visible).
- **Déplacement (`c176eaa`) de `IMPLEMENT_MULTICLOUD_SHIELDAD.md`** de la racine (ajoutée par `fba0f7b`, point k) vers `.claude/` — contenu identique, confirmé par diff.
- **Nouveau fichier `.claude/Veille_ShieldGraph_2026-08-31.md`** : veille technologique hebdomadaire (CVE ADCS/Kerberos, techniques SpecterOps/BloodHound Scentry) — matériau de recherche pour une future vague de contrôles, rien n'en a encore été implémenté à la date de ce document.

### p) Ce qui n'a volontairement pas été fait, ou reste ouvert

Le mapping conformité (`ShieldAD-CertificationMapping.ps1`, NIS2/ANSSI/CIS_IG) n'a pas été vérifié pour les nouveaux contrôles de cette période (15 `AZ-*`/`AZ-15*` du point j, 89 AWS, 59 LDAP) — même lacune déjà signalée pour le lot du 2026-08-17→24 au §10, non résolue ici, à traiter séparément. `92eac58` (risque de performance `Find-AttackPaths`, §1quater-m) reste non mesuré. Le volet CVE plus large des veilles `.claude/Veille_ShieldGraph_2026-08-31.md` (point o) et l'identité GCP (`IMPLEMENT_MULTICLOUD_SHIELDAD.md`, point h) restent des pistes non implémentées, documentées comme telles plutôt que passées sous silence.

---

## 2. Inventaire des fichiers

### Fichiers PowerShell — cœur applicatif

| Fichier | Taille | Lignes | Rôle |
|---------|--------|--------|------|
| `ShieldAD.ps1` | 215 KB | 4 716¹ | Interface WPF principale — **-191 lignes** depuis le 07-22 : derniers appels au schéma de licence B retirés + lanceur ShieldGraph Tauri autonome remplacé par un message informatif (§1ter-b/c) |
| `ShieldAD-Worker.ps1` | 1 470 KB | 13 786 | Moteur de scan AD + génération rapports — **+430 lignes** : comptage AST automatisé (§1ter-a), refonte `New-ReportDPO` en 13 points + retrait d'une jurisprudence APD non vérifiée (§1ter-h) |
| `ShieldAD-AADS.ps1` | 318 KB | 3 934 | Module cloud Azure Entra ID / M365 — **+314 lignes** : comptage AST automatisé + `Invoke-IamEntraInventory`/`Get-IamEntraRisk` pour le module IAM (§1ter-a/d, §16) |
| `ShieldAD-IAM.ps1` | 14,8 KB | 333 | **Nouveau, committé le 2026-08-12.** Worker embarqué greenfield v4 (JSONL pur, sans équivalent v3.x) : inventaire IAM / gouvernance des accès on-prem (comptes stale, à privilèges, âge mot de passe). Voir §16 |
| `ShieldAD-Crypto-Core.ps1` | 4,3 KB | 86 | **Nouveau, committé le 2026-08-12.** Mutualise `Protect-BytesAes`/`Unprotect-BytesAes` (AES-256-CBC + HMAC-SHA256, Encrypt-then-MAC) entre `ShieldAD-BUILD.ps1` et `ShieldAD-LAUNCHER.ps1` — auparavant dupliquées en dur dans chacun des deux fichiers. Sans rapport avec le module IAM malgré la proximité temporelle d'ajout ; ne remplace pas `ShieldAD-Encrypt.ps1` (rôle distinct) |
| `ShieldAD-LAUNCHER.ps1` | 15 270 KB | 631 | Lanceur sécurisé (auto-généré par BUILD, payload chiffré auto-extractible) |
| `ShieldAD-BUILD.ps1` | 80 KB | 1 348 | Script compilation + packaging EXE |
| `ShieldAD-Lang.ps1` | 95 KB | 1 028 | Table de localisation FR/EN/NL |
| `ShieldAD-LangSelector.ps1` | 18 KB | 428 | Sélecteur de langue WPF |
| `ShieldAD-ProfileLoader.ps1` | 24 KB | 544 | Chargeur profil client JSON |
| `ShieldAD-PrereqCheck.ps1` | 40 KB | 753 | Vérification prérequis système — **-97 lignes** : retrait du prérequis « SHIELDGRAPH UI (Tauri) »/`install_tauri` (détection `shieldgraph.exe`/WebView2, installation Node.js/Rust), devenu obsolète avec le retrait du prototype autonome (§1ter-b) |
| `ShieldAD-ComplianceWizard.ps1` | 31 KB | 585 | Sélection certifications — **+93 lignes** depuis le 07-17 : cases à cocher `ISO27002`/`CIS_IG1`/`CIS_IG2`/`CIS_IG3` (§1bis-b) |
| `ShieldAD-ReportFilter.ps1` | 12 KB | 302 | Filtrage contrôles par standard |
| `ShieldAD-CertificationMapping.ps1` | 40 KB | 853 | Mapping contrôles ↔ certifications — v4.0.0 en interne |
| `ShieldAD-License.ps1` | 17 KB | 369 | Gestion licences AES-256 |
| `ShieldAD-LicenseGen.ps1` | 14 KB | 302 | Générateur de licences (interne) — flux `Read-Host` console, toujours présent dans le dépôt mais dont l'usage interne bascule vers **ShieldAD License Manager**, outil Tauri séparé (`license-manager/`, hors périmètre `ShieldADv4/`) depuis le 2026-08-24, §1quinquies-h |
| `ShieldAD-Encrypt.ps1` | 40 KB | 901 | Chiffrement rapports (.adsec) — v3.5.2 inchangée, +10 lignes mineures |
| `ShieldAD-ConnectVault.ps1` | 13,8 KB | 323 | Protection DPAPI des secrets ShieldAD-Connect.json — **désormais embarqué à la compilation** (§1ter-e). Bug corrigé le 2026-08-04 : chiffrait des noms de champ PascalCase (ex. `Wazuh.Password`) sans rapport avec les propriétés réelles du JSON — le chiffrement DPAPI ne s'appliquait donc jamais, silencieusement |
| `ShieldAD-ReportHelpers.ps1` | 21 KB | 373 | Helpers présentationnels partagés entre tous les New-Report* |
| `ShieldAD-ProofGenerator.ps1` | 23 KB | 493 | Horodatage RFC 3161 |
| `Set-Version.ps1` | 4,8 KB | 105 | Utilitaire : synchronisation version + recalcul `WorkerExpectedHash` (ne couvre pas AADS.ps1/CertificationMapping.ps1/ComplianceMapper.ps1/ComplianceWizard.ps1, ni le `$WorkerHash` séparé de `ShieldAD-LAUNCHER.ps1`, ni `$script:_rptVer` — cf. §14). Ré-exécuté manuellement le 2026-07-22 pour l'unification de version 4.0.0 après être resté sur 3.8.0 pendant trois vagues de changements de `ShieldAD-Worker.ps1` |

¹ **Anomalie structurelle résolue depuis le 2026-07-17 (voir §1bis-c) :** les versions précédentes de ce document signalaient un bloc de ~4 500 lignes dupliqué octet pour octet dans `ShieldAD.ps1` (9 612 lignes affichées pour ~4 900 lignes de contenu réel). Le fichier vérifié aujourd'hui fait 4 907 lignes — la duplication a été supprimée et `$AppVersion` n'apparaît plus qu'une fois dans le fichier.

### Fichiers PowerShell — modules embarqués/chiffrés dans l'EXE

Ces modules sont compilés en payload AES chiffré directement dans `ShieldAD.exe` par `ShieldAD-BUILD.ps1`, au même titre que Worker/AADS/Lang, et chargés en mémoire par `ShieldAD.ps1` au démarrage :

| Fichier | Taille | Lignes | Rôle |
|---------|--------|--------|------|
| `ShieldAD-DatabaseManager.ps1` | 20,4 KB | 524 | v1.1.0 "JSON Edition — zéro dépendance externe". Couche de persistance locale centrale (tables JSON dans `%APPDATA%\Mandatory Shield\ShieldAD\DB\` : licences, scans, findings, rapports, tâches de remédiation, logs d'audit). Chargé en tout premier — tous les autres modules embarqués lisent/écrivent via lui. **-87 lignes** depuis le 07-22 : retrait de `Save-LicenseToDB`/`Update-LicenseScanCount`/`Add-LicenseAuditLog`, dédiées à l'ancien schéma de licence B (§1ter-c) |
| ~~`ShieldAD-LicenseValidator.ps1`~~ | — | — | **Supprimé (commit `fcafd1f`, §1ter-b/c).** Ancien validateur clé/checksum HMAC (schéma de licence B) — remplacé par la vérification unique du fichier `.lic` signé RSA-4096 (schéma A) au lancement, par le launcher. Ses derniers appelants dans `ShieldAD.ps1`/`ShieldAD-DatabaseManager.ps1` ont été nettoyés dans la foulée |
| `ShieldAD-ScoringCalculator.ps1` | 18 KB | 440 | v3.6.0 (chaîne de log encore littéralement affichée telle quelle — à corriger). Calcule le scoring "dual" : score Absolu (jeu de contrôles fixe, pour comparaisons de tendance) + score Contextuel (filtré par les standards sélectionnés via `$Global:ComplianceSelection`). Son commentaire d'en-tête cite encore "343 contrôles" comme base absolue — obsolète depuis longtemps, et d'autant plus depuis le passage au comptage automatisé (§1ter-a) : le total réel exact se lit désormais dans `docs/CONTROL-COUNTS.generated.md`, plus dans un commentaire figé ici. |
| `ShieldAD-ComplianceMapper.ps1` | 31 KB | 676 | v4.0.0 en interne (l'ancienne mention "v2.0.0" de ce document était son propre historique de version applicative, distinct — et maintenant supplanté par — l'en-tête `# Version` du fichier), **+71 lignes** depuis le 07-17. Modal WPF (`Show-ComplianceMapperModule`) qui lit les findings depuis la DB et calcule le % de conformité par standard (NIS2/ISO27002/CIS/ANSSI/DORA/CIS_IG1-3) par correspondance de mots-clés sur `affected_norms` — `ISO27002` et `CIS_IG1/IG2/IG3` sont désormais des standards filtrables à part entière, pas de simples alias (§1bis-b). |
| `ShieldAD-Remediation.ps1` | 36 KB | 797 | v2.0.0. Modal WPF (`Show-RemediationModule`) : lit les findings en FAIL depuis la DB, permet d'assigner/suivre/exporter des tâches de remédiation. |

### Fichiers PowerShell — intégrations SIEM/SOAR (nouveaux, fichiers en clair non embarqués)

| Fichier | Taille | Lignes | Rôle |
|---------|--------|--------|------|
| `ShieldAD-Connect.ps1` | 28,3 KB | 886 | v1.0.0 "ShieldConnect". **Depuis le 2026-08-04, embarqué à la compilation** (`include_str!`, comme Worker/AADS/IAM) — n'est plus dot-sourcé depuis disque en clair, réutilisé par le nouvel orchestrateur Tauri `shieldconnect.rs` (§1ter-e). Envoie les résultats de scan vers SIEM/SOAR externes (Sentinel, Splunk, Elastic, Wazuh, Graylog, QRadar, Teams, Slack, SMTP, STIX 2.1) via des convertisseurs de format (`ConvertTo-CEF`, `ConvertTo-GELF`, `ConvertTo-ECS`, `ConvertTo-STIX`) et des expéditeurs dédiés (`Send-ToSentinel`, etc.). Bug de schéma corrigé le 2026-08-04 : lisait `$Config.splunk.token` au lieu du vrai chemin imbriqué `$Config.connectors.splunk.token` — chaque `Send-To*` recevait des champs `$null` silencieusement (§1ter-e) |
| `ShieldAD-ShieldConnectors.ps1` | 27 KB | 722 | v1.0.0, `#Requires -RunAsAdministrator`. Fenêtre WPF de configuration/test des identifiants de connecteurs SIEM que `ShieldAD-Connect.ps1` utilise ensuite pour l'envoi effectif. |
| `ShieldAD-ShieldConnectors-Integration-Examples.ps1` | 28 KB | 732 | **Ce n'est pas du code exécutable** malgré l'extension `.ps1` — c'est un guide développeur en Markdown (démarre par `# 🛡️ ShieldAD — Exemples d'intégration SHIELD CONNECTORS`) montrant comment câbler les deux fichiers ci-dessus dans l'UI principale. N'est chargé par aucun autre script. |

### Fichiers PowerShell — annexes / hors chaîne principale

| Fichier | Taille | Lignes | Rôle |
|---------|--------|--------|------|
| `ShieldAD-BloodHound-OpenGraph.ps1` | 27 KB | 828 | v1.0.0 (2026-06-09). Script autonome (son propre bloc `param()`), **non référencé dans `ShieldAD.ps1` ni `ShieldAD-BUILD.ps1`** — s'exécute indépendamment de l'application principale. Interroge l'API OpenGraph de BloodHound pour analyser les chemins d'attaque de mouvement latéral (Domain Admins, comptes Kerberoastables, délégation contrainte, ACL sortantes) et génère ses propres rapports HTML/CSV/Neo4j-JSON. Fonctions clés : `Get-AttackPaths`, `Get-KerberoastableAccounts`, `Analyze-AttackPaths`, `New-BloodHoundBridgeReport`, `Export-ToNeoJson`. |
| `ShieldAD-KeyGen.ps1` | 6 KB | 135 | Usage R&D interne uniquement ("NE PAS DISTRIBUER"), absent de `ShieldAD-BUILD.ps1` — non livré au client. Génère les clés de licence (`New-LicenseKey`) via un HMAC-SHA256 partagé avec `ShieldAD-LicenseValidator.ps1`. |

### Fichiers PowerShell — modules multicloud/LDAP (nouveaux, non embarqués dans le total §1)

| Fichier | Taille | Lignes | Rôle |
|---------|--------|--------|------|
| `ShieldAD-LDAP.ps1` | — | 1 503 | **Nouveau, `a5dd845`, 2026-08-26 (§1sexies-b, §17).** Worker embarqué de scan LDAP/OpenLDAP/FreeIPA générique — 59 contrôles (10 catégories), via `System.DirectoryServices.Protocols` (pas l'ADSI classique). Non couvert par `scripts/Count-ShieldADControls.ps1` : absent du total §1 |
| `ShieldAD-AWS-IAM.ps1` | 188 KB | 1 553 | **Nouveau, `30af098`, 2026-08-31 (§1sexies-h, §18).** Worker embarqué de scan AWS IAM — 89 contrôles, via les modules `AWS.Tools.*` (pas la CLI `aws`). Usage interne, non commercialisé — voir §18 |

### Fichiers de configuration

| Fichier | Taille | Rôle |
|---------|--------|------|
| `ShieldAD_ClientProfile.json` | 7,7 KB | Profil contexte client (optionnel) |
| `ShieldAD-Connect.json` | 3,7 KB | Config SIEM/SOAR/webhooks (secrets protégés DPAPI via ConnectVault) |
| `ShieldAD-Connect-Config.json` | 7,8 KB | **Nouveau, non documenté précédemment.** Config par défaut lue par `ShieldAD-Connect.ps1` / `ShieldAD-ShieldConnectors.ps1` (paramètre `-ConfigPath`) |
| `ShieldAD-Exclusions.json` | 12,8 KB | Risk acceptance + seuils personnalisés |

### Autres fichiers

| Fichier | Taille | Rôle |
|---------|--------|------|
| `ShieldAD.exe` | 3 662 KB (3,6 MB) | Exécutable compilé (PS2EXE) — a quasiment doublé de taille depuis la dernière version documentée (2 182 KB) du fait des 5 nouveaux modules embarqués (DatabaseManager, LicenseValidator, ScoringCalculator, ComplianceMapper, Remediation) |
| `ShieldAD.ico` | 131 KB | Icône application |
| `ShieldAD-START.bat` | 2,6 KB | Point d'entrée utilisateur |
| `qrcode.min.js` | 19,5 KB | Génération QR Code dans les rapports |
| `ShieldAD_Questionnaire_Tool_v1.html` | 97,4 KB | Outil questionnaire pre-assessment |
| `docs/ShieldAD_Dossier_Client_MSC.pdf` | 44 KB | Livrable client professionnel |
| `CHANGELOG.md` | — | **Nouveau.** Historique de version formel (Keep a Changelog / SemVer), 3.3.0 → 4.0.0 |

### Dossier `ShieldGraph/` — moteur PowerShell uniquement depuis le 2026-08-04 (voir §15)

**Changement important (commit `fcafd1f`, §1ter-b) :** l'UI desktop Tauri v2 autonome qui vivait ici (`ShieldGraph/src-tauri/`, `ShieldGraph/src/`, son propre `package.json`/build Vite+Tauri, binaire `shieldgraph.exe` séparé) **a été supprimée du dépôt**. Il ne reste dans `ShieldGraph/` que le moteur PowerShell lecture-seule (`ShieldAD-ShieldGraph.ps1`, `-Run`, `-ACL`, `-ADCS`, `-ATTCK`, `-Sim`, `STATUS.md`, `ShieldGraph_ATTCK_Rules.json`), désormais utilisé comme simple **dossier source** : `scripts/stage-workers.mjs` y glob tous les `ShieldAD-ShieldGraph*.ps1` pour les copier en staging, et `src-tauri/src/embedded_workers.rs` les embarque à la compilation (`include_str!`) au même titre que Worker/AADS/IAM/Connect. C'est l'onglet intégré `src/shieldgraph/` de l'app principale (livré depuis la v4.0, jamais un binaire externe) qui les invoque désormais via `shieldgraph.rs`. Détail complet, y compris l'état antérieur du chantier documenté par `STATUS.md` (parties non testées, fichiers reconstruits après perte accidentelle — toujours pertinent pour le moteur PowerShell lui-même, qui n'a pas changé) : **§15 (réécrite le 2026-08-04)**.

---

## 3. Architecture & flux d'exécution

```
ShieldAD-START.bat
  └─► powershell.exe → ShieldAD-LAUNCHER.ps1
        ├─ [1] Valide PowerShell 5.1+
        ├─ [2] Vérifie SHA-256 de TOUS les modules
        ├─ [3] Déchiffre payload AES-256-CBC
        ├─ [4] Extrait .ps1 en répertoire temp
        ├─ [5] Valide licence (ShieldAD.lic)
        └─► powershell.exe -STA (nouveau process)
              └─► ShieldAD.ps1 (fenêtre WPF principale)
                    │
                    ├─► [Étape 0] DatabaseManager.ps1 + LicenseValidator.ps1
                    │     └─ Ouverture DB JSON locale, validation licence en base
                    │
                    ├─► [Étape 1] LangSelector.ps1
                    │     └─ Sélection FR/EN/NL → $Global:ShieldADLang
                    │
                    ├─► [Étape 2] ProfileLoader.ps1
                    │     └─ Chargement ShieldAD_ClientProfile.json → $Global:ClientProfile
                    │
                    ├─► [Étape 3] PrereqCheck.ps1
                    │     └─ Vérification RSAT, DC, droits AD → $Global:PrereqPassed
                    │
                    ├─► [Étape 4] ComplianceWizard.ps1
                    │     └─ Sélection certifications → $Global:ComplianceSelection
                    │
                    ├─► [Chargement modules embarqués] ScoringCalculator, ComplianceMapper, Remediation
                    │
                    └─► Fenêtre WPF principale
                          │
                          ├─► [Bouton Scan]
                          │     │
                          │     ├─► Start-Process → ShieldAD-Worker.ps1
                          │     │     ├─ Collecte AD via DirectorySearcher/LDAP
                          │     │     ├─ 310 contrôles on-prem (PASS/WARN/FAIL/N.A.)
                          │     │     ├─ Calcul scores (Absolu + Contextuel) + risk_level
                          │     │     └─► Génère 8 rapports HTML (CEO/DPO/IT/REM/SCO/TREND/UsersAtRisk/Forest)
                          │     │
                          │     └─► [Si Azure coché] → ShieldAD-AADS.ps1 (async)
                          │           ├─ Device Code Flow → Microsoft Graph
                          │           ├─ 153 contrôles cloud
                          │           └─► Rapport AADS fusionné
                          │
                          ├─► [Bouton Remédiation] → Show-RemediationModule (modal WPF, lit la DB)
                          ├─► [Bouton Compliance Mapper] → Show-ComplianceMapperModule (modal WPF, lit la DB)
                          └─► [Bouton ShieldConnect] → ShieldAD-Connect.ps1 (envoi SIEM/SOAR, si configuré via ShieldConnectors)
```

---

## 4. Interface WPF — ShieldAD.ps1

**Fenêtre :** 1 100 × 680 px (minimum 920 × 620), thème sombre `#0F1117`

**Composants UI :**
- Indicateur connexion AD (point rouge/vert)
- Affichage domaine courant + badge version
- 5 KPI cards : Score Global | FAIL | WARN | PASS | INFO
- Checkbox Azure (active le scan AADS)
- Champs IT Contact + Échéance (pré-remplis depuis ClientProfile)
- Barre de progression + console de logs en temps réel
- Panneau étapes modules (LangSelector → ProfileLoader → PrereqCheck → Scan)
- Boutons de rapport : CEO | IT | DPO | REM | SCO | TREND | Forest | Utilisateurs à Risque
- Boutons modules : Remédiation | Compliance Mapper | ShieldConnect
- Badges footer : ISO 27001 | NIS2 | CIS v8

**Fonctions de sécurité interne :**

| Fonction | Rôle |
|----------|------|
| `Test-WorkerIntegrity` | Validation SHA-256 du Worker avant exécution |
| `Invoke-SecureDelete` | Suppression par écrasement bytes (anti-forensic) |
| `Invoke-SecureDeleteFolder` | Suppression récursive sécurisée |
| `Invoke-FullCleanup` | Destruction complète de la piste d'audit session |
| `Register-LogoffCleanupTask` | Tâche Windows pour cleanup forcé post-session |
| `Remove-PreviousSessionRemnants` | Nettoyage fichiers orphelins sessions précédentes |

---

## 5. Moteur de scan on-prem — 310 contrôles

**Fichier :** `ShieldAD-Worker.ps1` | 13 786 lignes | 1 470 KB | Version interne : 4.0.0

**Exécution :** Process séparé (`Start-Process`), communique via fichier XML d'état (`ScanState`).

**Méthode de comptage (changée le 2026-08-04, voir §1ter-a) :** auto-analyse AST via `Get-ShieldADRealControlCount` (`ShieldAD-Worker.ps1:13425`) — 255 appels `New-Ctrl` statiques (241 au 2026-08-17, +14 le 2026-08-17→24 : `ADCS-25`, `ADCS-26`, `K-16`, `K-17`, `C-17`, `LDAP-01`, `DC-12`..`DC-19` — voir §1quinquies) + 55 contrôles documentaires générés dynamiquement en boucle = **310**. Cette méthode **remplace** l'ancien décompte manuel via le wrapper `Invoke-ADQuery` (qui donnait 222 et sous-comptait les familles documentaires générées en boucle) et est désormais recalculée automatiquement à chaque commit touchant ce fichier (`.githooks/pre-commit` → `docs/CONTROL-COUNTS.generated.md`, régénéré la dernière fois le 2026-08-24 16:25), plutôt que vérifiée manuellement par le CTO. C'est cette valeur qui est aussi injectée dans `controls_count` de l'événement JSONL `session_start`. ⚠️ Les tableaux par famille ci-dessous n'ont pas été intégralement rejoués contrôle par contrôle pour cette mise à jour — pour le chiffre exact à un instant T, se référer à `docs/CONTROL-COUNTS.generated.md`, jamais à une valeur recopiée dans ce document.

**Nouveau champ v3.8.0 :** chaque contrôle porte désormais un champ `cis_ig` (`"IG1"` | `"IG2"` | `"IG3"` | `""`) correspondant aux CIS Controls v8 Implementation Groups — IG1 (~70 contrôles, hygiène de base) est utilisé par le rapport Remédiation pour prioriser les corrections.

---

### Famille A — Comptes (17 contrôles)

| ID | Titre |
|----|-------|
| A-01 | Membres Domain Admins |
| A-02 | Enterprise & Schema Admins |
| A-03 | Dérivés AdminCount orphelins (sdprop) |
| A-04 | Comptes utilisateurs dormants (>90j) |
| A-05 | Comptes désactivés dans groupes sensibles |
| A-06 | Comptes avec PasswordNeverExpires |
| A-07 | Mots de passe non changés depuis >365j |
| A-08 | Comptes sans mot de passe requis |
| A-09 | Chiffrement réversible activé |
| A-10 | Comptes désactivés récemment (30j) |
| A-11 | Comptes Kerberoastables (SPN) |
| A-12 | Comptes avec SIDHistory |
| A-13 | Groupe Pre-Windows 2000 Compatible Access |
| A-14 | Comptes actifs avec mot de passe jamais changé (pwdLastSet=0) |
| A-15 | Comptes DA avec PasswordNeverExpires sans FGPP compensatoire |
| A-16 | Comptes User standard avec SPN + PasswordNeverExpires (cible Kerberoasting) |
| A-17 | Membres inattendus dans Administrators local du DC |

---

### Famille ADCS — PKI / Certificats (26 contrôles)

> **+9 contrôles ajoutés le 2026-07-22** (ADCS-14 à ADCS-22, source Certipy 2.0+/ESC9-ESC17 — voir §1bis-a). Numérotés `ADCS-14`..`ADCS-22` plutôt que `ADCS-009`..`ADCS-017` (numérotation de la veille source) pour éviter toute confusion visuelle avec `ADCS-13` déjà existant. **+2 contrôles ajoutés le 2026-08-17** (ADCS-23, ADCS-24 — CVE-2026-62818 et CVE-2026-54121 « Certighost », voir §1quater-l). **+2 contrôles ajoutés le 2026-08-21/24** (ADCS-25 — Shadow Certificates LDAP, sans CVE canonique ; ADCS-26 — CVE-2025-27740, authentification ADCS faible vers Domain Admin — voir §1quinquies-c/l).

| ID | Titre |
|----|-------|
| ADCS-01 | Templates ADCS vulnérables ESC1 (SAN libre) |
| ADCS-02 | CA sur DC (ANSSI PKI) + Templates ESC2 (Any Purpose EKU) |
| ADCS-03 | Web Enrollment ADCS en HTTP sur les CA enregistrées (ESC8) |
| ADCS-04 | Certificats CA expirant dans 30 jours |
| ADCS-05 | Certificats dans NTAuthCertificates |
| ADCS-06 | Protocol Transition S4U2Self non contraint |
| ADCS-07 | Templates ADCS vulnérables ESC3 (Enrollment Agent) |
| ADCS-08 | Contrôle des objets PKI par des non-admins (ESC5) |
| ADCS-09 | CA avec EDITF_ATTRIBUTESUBJECTALTNAME2 activé (ESC6) |
| ADCS-10 | ESC4 — Templates ADCS modifiables par non-admins (WritePKIEnrollmentFlag) |
| ADCS-11 | ESC7 — Officiers d'enregistrement CA non restreints (ManageCA) |
| ADCS-12 | Templates ADCS permettant MFA bypass (ESC10-like) |
| ADCS-13 | Enrollment Rights — Templates ouvertes à Domain Users / Authenticated Users |
| ADCS-14 *(nouveau)* | ESC9 — Templates avec NO_SECURITY_EXTENSION exploitable |
| ADCS-15 *(nouveau)* | ESC10 — StrongCertificateBindingEnforcement non appliqué |
| ADCS-16 *(nouveau)* | ESC11 — RPC Enrollment sans chiffrement forcé (IF_ENFORCEENCRYPTICERTREQUEST) |
| ADCS-17 *(nouveau)* | ESC12 — Accès local à la CA et absence de HSM (vol de clé privée) |
| ADCS-18 *(nouveau)* | ESC13 — Issuance Policy liée à un groupe avec enrollment ouvert |
| ADCS-19 *(nouveau)* | ESC14 — altSecurityIdentities mappé sur un compte Domain Admin |
| ADCS-20 *(nouveau)* | ESC15 (EKUwu) — Templates schéma V1 avec EKU injectable (CVE-2024-49019) |
| ADCS-21 *(nouveau)* | ESC16 — Extension de sécurité SID désactivée globalement sur la CA |
| ADCS-22 *(nouveau)* | ESC17 — Surface d'attaque combinée du graphe PKI (synthèse ADCS-01..21 du même scan) |
| ADCS-23 *(nouveau, 08-17)* | CVE-2026-62818 — Patch AD CS RCE (use-after-free) |
| ADCS-24 *(nouveau, 08-17)* | CVE-2026-54121 « Certighost » — Patch AD CS usurpation Domain Controller |
| ADCS-25 *(nouveau, 08-21)* | Shadow Certificates — certificat suspect injecté directement dans `userCertificate` (comptes DA/EA/DC) |
| ADCS-26 *(nouveau, 08-24)* | CVE-2025-27740 — Patch authentification ADCS faible vers Domain Admin |

---

### Famille ADFS — Active Directory Federation Services (3 contrôles, nouveau 2026-07-22)

| ID | Titre |
|----|-------|
| ADFS-001 | AD FS — Farm détecté (conteneur DKM présent) |
| ADFS-002 | CVE-2026-56155 — Patch AD FS DKM (exploitation active confirmée CISA KEV) |
| ADFS-003 | AD FS DKM — ACL least-privilege |

*Les trois contrôles se dégradent en `INFO`/`N.A.` si aucun farm AD FS n'est détecté (ADFS-001 négatif) — cohérent avec la politique du scanner de ne jamais faire échouer un contrôle sur une brique absente de l'infrastructure du client.*

---

### Famille PQ — PQ-Readiness / Post-Quantum Cryptography (7 contrôles)

> ⚠️ Domaine d'anticipation réglementaire (NIS2, FIPS 140-2 → Historical le 21 sept. 2026, NSA CNSA 2.0 le 1er janv. 2027), pas de vulnérabilité exploitable aujourd'hui — voir disclaimer §14.

| ID | Titre |
|----|-------|
| PQ-01 | Provider cryptographique CA — CNG (KSP) requis |
| PQ-02 | Certificats racine/signature longue durée sans plan de rotation |
| PQ-03 | Algorithme de signature de la CA racine |
| PQ-04 | Templates avec taille de clé RSA insuffisante (< 3072 bits) |
| PQ-05 | Dépendance TSA RFC 3161 — algorithme non-PQC (INFO) |
| PQ-06 | Plan de migration cryptographique post-quantique documenté (INFO) |
| PQ-07 | Classification des données à durée de confidentialité longue — HNDL (INFO) |

---

### Famille AUD — Politique d'audit (6 contrôles)

| ID | Titre |
|----|-------|
| AUD-01 | Audit Logon/Logoff (Succès ET Échecs) |
| AUD-02 | Audit User Account Management |
| AUD-03 | Audit Directory Service Changes (modifications AD) |
| AUD-04 | Audit Sensitive Privilege Use |
| AUD-05 | Audit Process Creation (ligne de commande) |
| AUD-06 | Audit modifications Schema AD — DS Changes actif (ANSSI R65) |

---

### Famille C — Configuration générale (17 contrôles)

> **+1 contrôle ajouté le 2026-08-24** (C-17 — CVE-2025-21293, Network Configuration Operators — voir §1quinquies-m).

| ID | Titre |
|----|-------|
| C-01 | Membres Backup Operators |
| C-02 | SMBv1 désactivé sur les DC |
| C-03 | Trusts Active Directory sans SID filtering |
| C-04 | Ordinateurs dormants (>90j) |
| C-05 | Group Policy Creator Owners |
| C-06 | RDP avec NLA obligatoire |
| C-07 | Mots de passe dans le champ Description |
| C-08 | Membres Account Operators |
| C-09 | Print Spooler désactivé sur tous les DC (PrintNightmare multi-DC) |
| C-10 | WDigest authentication désactivé |
| C-11 | Credential Roaming (attributs ms-PKI) présent |
| C-12 | LLMNR actif (vecteur capture hash NTLMv2 via Responder) |
| C-13 | NetBIOS over TCP/IP actif sur les interfaces DC |
| C-14 | mDNS (Multicast DNS / Bonjour) actif sur le DC |
| C-15 | IPv6 actif sans DHCPv6 officiel (vecteur mitm6) |
| C-16 | Coercition d'authentification PetitPotam/PrinterBug non corrigée |
| C-17 *(nouveau, 08-24)* | CVE-2025-21293 — Patch élévation de privilèges Network Configuration Operators |

---

### Famille CIS-DOC — Documentaires CIS Controls v8 (5 contrôles INFO)

| ID | Titre |
|----|-------|
| CIS-DOC-01 | Inventaire des comptes autorisés documenté et revu trimestriellement (CIS 5.1) |
| CIS-DOC-02 | Programme de formation et sensibilisation sécurité annuel documenté (CIS 14.1) |
| CIS-DOC-03 | Plan de réponse aux incidents AD formalisé et testé (CIS 17.4) |
| CIS-DOC-04 | Tests de restauration des sauvegardes AD documentés avec résultats (CIS 11.4) |
| CIS-DOC-05 | Politique de gestion des vulnérabilités et patch management documentée (CIS 7.1) |

---

### Famille DC — Domain Controllers (17 contrôles)

> **+8 contrôles ajoutés le 2026-08-24** (DC-12 à DC-19 — audit de complétude CVE ShieldGraph + durcissement hors-CVE, voir §1quinquies-l/m/o/p). `DC-10`/`DC-11` (patch AD DS RCE) existaient déjà avant cette vague — un bug de KB inexistants (`KB5040855`/`KB5040856`) les faisait échouer en permanence, corrigé au même moment (§1quinquies-k).

| ID | Titre |
|----|-------|
| DC-01 | Niveau fonctionnel du domaine |
| DC-02 | Niveau fonctionnel de la forêt |
| DC-03 | LAPS (Local Admin Password Solution) déployé |
| DC-04 | Protected Users Security Group utilisé |
| DC-05 | AdminSDHolder ACL inhabituelles |
| DC-06 | OS des Domain Controllers en fin de support (EoL) |
| DC-07 | DC en Desktop Experience (Server Core recommandé — ANSSI R33) |
| DC-08 | Sites AD avec DC unique (SPOF local d'authentification) |
| DC-09 | Séparation FSMO (PDC/RID/Infrastructure) sur DC différents (ANSSI R72) |
| DC-10 | CVE-2026-45648 — Patch AD DS RCE activement exploitée |
| DC-11 | CVE-2026-33826 — Patch AD DS RCE |
| DC-12 *(nouveau, 08-24)* | CVE-2026-49164 — Patch AD DS RCE non authentifiée |
| DC-13 *(nouveau, 08-24)* | CVE-2026-49179 — Patch AD DS (couverture DC hors serveurs CA) |
| DC-14 *(nouveau, 08-24)* | CVE-2020-1350 « SIGRed » — Patch DNS Server RCE non authentifiée (N/A si Server 2022+) |
| DC-15 *(nouveau, 08-24)* | CVE-2022-26809 — Patch RPC Runtime RCE non authentifiée (wormable) |
| DC-16 *(nouveau, 08-24)* | CVE-2023-21554 « QueueJumper » — Patch MSMQ RCE (N/A si MSMQ absent) |
| DC-17 *(nouveau, 08-24)* | CVE-2019-0626 — Patch RCE DHCP Server (N/A si rôle DHCP absent) |
| DC-18 *(nouveau, 08-24)* | Synchronisation horaire (W32Time) des contrôleurs de domaine |
| DC-19 *(nouveau, 08-24)* | Mises à jour automatiques Windows Update actives sur les DC |

---

### Famille DEL — Délégations AD (7 contrôles)

| ID | Titre |
|----|-------|
| DEL-01 | Délégation Kerberos sans contrainte (non-DC) |
| DEL-02 | Comptes admin sans protection anti-délégation |
| DEL-03 | Configurations RBCD — présence sur objets AD |
| DEL-04 | WriteProperty sur le compte krbtgt |
| DEL-05 | ForceChangePassword sur comptes Domain Admins |
| DEL-06 | Shadow Credentials — msDS-KeyCredentialLink sur comptes DA/EA |
| DEL-07 | noPac / CVE-2021-42278 — MAQ > 0 + absence patch KB5008380 |

---

### Famille DMSA — Delegated Managed Service Accounts (1 contrôle, nouveau 2026-07-22)

| ID | Titre |
|----|-------|
| DMSA-001 | BadSuccessor — dMSA avec lien de succession (msDS-ManagedAccountPrecededByLink) actif |

*Windows Server 2025 uniquement (attribut `msDS-ManagedAccountPrecededByLink` inexistant avant). Se dégrade en `N.A.` avec message explicite ("dMSA non supporté") sur les forêts en dessous de ce niveau fonctionnel — technique BadSuccessor publiée par Akamai en juillet 2026.*

---

### Famille DNS — Sécurité DNS (8 contrôles)

| ID | Titre |
|----|-------|
| DNS-01 | Zones DNS avec mise à jour dynamique non sécurisée |
| DNS-02 | Sites AD et subnets configurés |
| DNS-03 | Erreurs de réplication AD entre DC |
| DNS-04 | Zones DNS intégrées AD (ForestDns/DomainDns) |
| DNS-05 | Service DNS actif sur le DC local |
| DNS-06 | DNSSEC non configuré sur les zones DNS primaires |
| DNS-07 | Enregistrements DNS obsolètes (stale records > 90j) |
| DNS-08 | ADIDNS Hijacking — ACL CreateChild larges sur zones DNS AD |

---

### Famille DORA — Documentaires DORA Art.9-10 (6 contrôles INFO)

> Distincte de la famille technique **DORA-T** ci-dessous — celle-ci couvre les exigences documentaires/organisationnelles DORA (entités financières EU 2022/2554), tandis que DORA-T couvre les contrôles techniques automatisés.

| ID | Titre |
|----|-------|
| DORA-01 | DORA Art.9(2) — Politique de sécurité AD documentée et approuvée |
| DORA-02 | DORA Art.9(4)a — Contrôle des accès privilégiés AD (IAM) |
| DORA-03 | DORA Art.9(4)b — Journalisation et traçabilité des accès privilégiés |
| DORA-04 | DORA Art.9(4)c — Protection de la continuité AD (sauvegardes et restauration) |
| DORA-05 | DORA Art.10(1) — Détection des incidents liés à l'AD (monitoring actif) |
| DORA-06 | DORA Art.10(3) — Plan de réponse aux incidents AD (playbook documenté) |

---

### Famille DORA-T — Résilience financière DORA, technique (6 contrôles)

| ID | Titre |
|----|-------|
| DORA-T01 | Sauvegarde System State DC (wbadmin < 24h) |
| DORA-T02 | Redondance DC (minimum 2 DC actifs) |
| DORA-T03 | Journal Security DC >= 4 Go (rétention DORA 12 mois) |
| DORA-T04 | WEF (Windows Event Forwarding) configuré vers collecteur |
| DORA-T05 | Revue accès DA — MDP > 90 jours sans rotation |
| DORA-T06 | MachineAccountQuota = 0 (moindre privilège DORA Art.9(4)a) |

---

### Famille EL — Environnement & Log (7 contrôles)

| ID | Titre |
|----|-------|
| EL-01 | Groupes avec imbrications excessives (> 3 niveaux) |
| EL-02 | Machines actives avec OS en fin de support |
| EL-03 | Domain Admins avec connexions récentes (30j) — risque PAW |
| EL-04 | Politique de restriction des périphériques USB |
| EL-05 | Segmentation réseau Sites AD (Tier0 DC vs Postes) |
| EL-06 | Groupes AD avec imbrications circulaires |
| EL-07 | Groupes de sécurité orphelins (vides, inutilisés) |

---

### Famille FGPP — Fine-Grained Password Policies (2 contrôles)

| ID | Titre |
|----|-------|
| FGPP-01 | FGPP (PSO) absentes ou ne couvrant pas les DA/EA |
| FGPP-02 | FGPP (PSO) moins restrictive que la politique principale (régression) |

---

### Famille FIL — Fichiers critiques / NTDS.dit (1 contrôle)

> ⚠️ Cette famille couvrait auparavant le SID Filtering dans une ancienne version de ce document — c'était une erreur de recopie. Dans le code (commentaire "DOMAINE 27 — NTDS & FICHIERS CRITIQUES"), FIL porte exclusivement sur les permissions du fichier NTDS.dit. Le SID Filtering est couvert par les familles **C-03**, **SEC-11** et **TR-01/03**.

| ID | Titre |
|----|-------|
| FIL-01 | Permissions du fichier NTDS.dit sur Domain Controllers |

---

### Famille G — GPO & Sécurité de base (6 contrôles)

| ID | Titre |
|----|-------|
| G-01 | GPO totalement désactivées |
| G-02 | GPO orphelines (sans lien) |
| G-03 | GPO vides (sans paramètre) |
| G-04 | Politique d'audit avancée (GPO) |
| G-05 | Compte Administrateur intégré renommé |
| G-06 | ACL SYSVOL et NETLOGON — écriture restreinte aux admins (ANSSI R81) |

---

### Famille HDC — Durcissement DC (5 contrôles)

| ID | Titre |
|----|-------|
| HDC-01 | PowerShell Constrained Language Mode non actif sur le DC |
| HDC-02 | Secure Boot UEFI actif sur le DC |
| HDC-03 | Credential Guard non actif sur le DC |
| HDC-04 | AMSI bypassé ou désactivé sur le DC (clé AmsiEnable=0 détectée) |
| HDC-05 | MaxTokenSize Kerberos insuffisant (risque d'échec auth silencieux) |

---

### Famille ISO-DOC — Documentaires ISO/IEC 27001:2022 & 27002:2022 (24 contrôles INFO)

> Étendue de 8 à 24 contrôles en v3.7.1 pour couvrir les 4 thèmes officiels de l'Annexe A / 27002:2022 (Organisationnel, Personnes, Physique, Technologique) au lieu de 2. Chaque contrôle porte une référence croisée `iso27002_ref` — 27001 Annexe A et 27002 partagent le même catalogue depuis 2022, un seul pool de preuves sert donc les deux référentiels.

| ID | Titre |
|----|-------|
| ISO-DOC-01 | Politique de contrôle d'accès formalisée et approuvée (ISO A.5.15) |
| ISO-DOC-02 | Procédure de gestion du cycle de vie des comptes AD documentée (ISO A.5.18) |
| ISO-DOC-03 | Registre des accès privilégiés AD — revue trimestrielle documentée (ISO A.8.2) |
| ISO-DOC-04 | Politique de gestion des mots de passe communiquée aux utilisateurs (ISO A.5.17) |
| ISO-DOC-05 | Procédure de classification des actifs informationnels documentée (ISO A.5.12) |
| ISO-DOC-06 | Politique de télétravail et accès à distance documentée (ISO A.6.7) |
| ISO-DOC-07 | Accords de confidentialité (NDA) signés par les administrateurs AD (ISO A.6.6) |
| ISO-DOC-08 | Résultats du dernier test de restauration AD documentés (ISO A.8.13) |
| ISO-DOC-09 | Rôles et responsabilités sécurité formalisés — RSSI ou référent désigné (ISO A.5.2) |
| ISO-DOC-10 | Règles d'usage acceptable des actifs informationnels documentées (ISO A.5.10) |
| ISO-DOC-11 | Politique de sécurité des services cloud documentée (ISO A.5.23) |
| ISO-DOC-12 | Plan de préparation TIC pour la continuité d'activité testé (ISO A.5.30) |
| ISO-DOC-13 | Procédure de filtrage avant embauche pour les postes à privilèges IT (ISO A.6.1) |
| ISO-DOC-14 | Clauses de sécurité dans les contrats de travail des administrateurs et du personnel IT (ISO A.6.2) |
| ISO-DOC-15 | Programme de sensibilisation et formation sécurité formalisé (ISO A.6.3) |
| ISO-DOC-16 | Procédure de fin ou de changement de contrat — révocation des accès (ISO A.6.5) |
| ISO-DOC-17 | Périmètres de sécurité physique définis — salle serveurs et datacenter des DC (ISO A.7.1) |
| ISO-DOC-18 | Contrôles d'entrée physique documentés — badge, biométrie, registre (ISO A.7.2) |
| ISO-DOC-19 | Surveillance physique en place — vidéosurveillance salle serveurs (ISO A.7.4) |
| ISO-DOC-20 | Politique de sécurité des équipements hors site — laptops des administrateurs (ISO A.7.9) |
| ISO-DOC-21 | Procédure de gestion et destruction sécurisée des supports de stockage (ISO A.7.10) |
| ISO-DOC-22 | Gestion de configuration documentée — baseline GPO et durcissement (ISO A.8.9) |
| ISO-DOC-23 | Activités de surveillance et monitoring formalisées — SOC, alerting (ISO A.8.16) |
| ISO-DOC-24 | Politique d'usage de la cryptographie documentée (ISO A.8.24) |

---

### Famille J — Journalisation (5 contrôles)

| ID | Titre |
|----|-------|
| J-01 | Taille journal Sécurité Windows |
| J-02 | Taille journal Système Windows |
| J-03 | PowerShell Script Block Logging activé |
| J-04 | PowerShell Transcription activée |
| J-05 | Redondance des Domain Controllers |

---

### Famille K — Kerberos (17 contrôles)

> **+4 contrôles ajoutés le 2026-07-22** — Ghost SPNs / Kerberos Reflection (CVE-2025-58726) et dépréciation RC4 (CVE-2026-20833), voir §1bis-a. **+1 contrôle ajouté le 2026-08-17** (K-15 — CVE-2025-60704, contournement checksum S4U2self, voir §1quater-l). **+2 contrôles ajoutés le 2026-08-24** (K-16 — KerberLoss, CVE-2026-25177 ; K-17 — ResetNightmare, CVE-2026-27912 — voir §1quinquies-j).

| ID | Titre |
|----|-------|
| K-01 | Durée de vie des tickets Kerberos |
| K-02 | Ancienneté du mot de passe krbtgt |
| K-03 | Délégation Kerberos sans contrainte |
| K-04 | Comptes AS-REP Roastables |
| K-05 | Niveau LAN Manager (NTLMv1/LM) |
| K-06 | Chiffrement DES Kerberos activé |
| K-07 | Signature LDAP obligatoire |
| K-08 | LDAP Channel Binding |
| K-09 | AS-REP Roasting élargi — objets non-user sans pré-auth Kerberos |
| K-10 | Durée de vie TGT excessive (MaxTicketAge > 10h) |
| K-GHOSTSPN-001 *(nouveau)* | Ghost SPNs — SPN mappés sur des hostnames non-résolvables |
| K-GHOSTSPN-002 *(nouveau)* | SMB Signing non appliqué sur les contrôleurs de domaine |
| K-GHOSTSPN-003 *(nouveau)* | Permissions DNS Write non-restreintes (création d'enregistrements) |
| K-RC4-001 *(nouveau)* | Comptes de service Kerberos sans restriction AES-only (RC4 possible) |
| K-15 *(nouveau, 08-17)* | CVE-2025-60704 — Patch Kerberos S4U2self (contournement de checksum, délégation contrainte) |
| K-16 *(nouveau, 08-24)* | CVE-2026-25177 « KerberLoss » — Patch Kerberos |
| K-17 *(nouveau, 08-24)* | CVE-2026-27912 « ResetNightmare » — Patch Kerberos (réinitialisation de mot de passe) |

---

### Famille LAT — Mouvement latéral (2 contrôles)

| ID | Titre |
|----|-------|
| LAT-01 | GPO Abuse — WriteProperty/WriteDacl sur objets GPO par non-admins |
| LAT-02 | Comptes service extractibles — sans gMSA ni Credential Guard |

---

### Famille LDAP — Sécurité du service d'annuaire (1 contrôle, nouveau 2026-08-24)

| ID | Titre |
|----|-------|
| LDAP-01 | CVE-2025-26663/26670 — Patch RCE LDAP non authentifiée « wormable » |

---

### Famille LX — Linux/Non-Windows (5 contrôles)

| ID | Titre |
|----|-------|
| LX-01 | Inventaire machines non-Windows jointes au domaine |
| LX-02 | Rotation MDP comptes machines non-Windows (< 30j) |
| LX-03 | SPN en double sur machines non-Windows (risque Kerberoasting) |
| LX-04 | Machines non-Windows dans des groupes AD privilégiés |
| LX-05 | Machines non-Windows dormantes (> 90j sans connexion AD) |

---

### Famille MSA — Managed Service Accounts (5 contrôles)

| ID | Titre |
|----|-------|
| MSA-01 | gMSA (Group Managed Service Accounts) déployés |
| MSA-02 | Comptes de service dans groupes admins |
| MSA-03 | Version LAPS déployée |
| MSA-04 | BitLocker activé sur le DC local |
| MSA-05 | Comptes service avec mdp > 180 jours |

---

### Famille NIS2-DOC — Documentaires NIS2 (7 contrôles INFO)

| ID | Titre |
|----|-------|
| NIS2-DOC-01 | Politique de sécurité SI formalisée et approuvée par la direction |
| NIS2-DOC-02 | Analyse de risques cyber documentée réalisée dans les 12 derniers mois |
| NIS2-DOC-03 | Plan de continuité AD (PCA/PRA) documenté, testé et validé |
| NIS2-DOC-04 | Procédure de notification d'incidents cyber documentée (72h autorité compétente) |
| NIS2-DOC-05 | Programme de sensibilisation et formation sécurité du personnel documenté |
| NIS2-DOC-06 | Politique de sécurité de la chaîne d'approvisionnement (fournisseurs IT) documentée |
| NIS2-DOC-07 | Inventaire des actifs critiques (dont DC) formalisé et maintenu à jour |

---

### Famille NPS — RADIUS/NPS (8 contrôles)

| ID | Titre |
|----|-------|
| NPS-01 | Service NPS (RADIUS) présent et actif |
| NPS-02 | Journalisation NPS activée (Succès + Échecs) |
| NPS-03 | Méthode EAP forte (EAP-TLS ou PEAP/EAP-TLS) |
| NPS-04 | Clients RADIUS enregistrés avec secrets forts (>= 22 chars) |
| NPS-05 | Extension Azure MFA NPS installée et active |
| NPS-06 | Politiques NPS filtrées par groupes AD (pas domaine entier) |
| NPS-07 | NPS isolé sur serveur dédié (pas sur DC) |
| NPS-08 | Serveur NPS enregistré dans AD (groupe RAS and IAS Servers) |

---

### Famille P — Politiques de mots de passe (7 contrôles)

| ID | Titre |
|----|-------|
| P-01 | Longueur minimale du mot de passe |
| P-02 | Complexité des mots de passe activée |
| P-03 | Historique des mots de passe |
| P-04 | Durée maximale du mot de passe |
| P-05 | Durée minimale du mot de passe |
| P-06 | Seuil de verrouillage de compte |
| P-07 | Fenêtre d'observation du verrouillage |

---

### Famille PER — Persistance (4 contrôles)

| ID | Titre |
|----|-------|
| PER-01 | WMI Event Subscriptions permanentes non-Microsoft (backdoor WMI) |
| PER-02 | Tâches planifiées suspectes actives sur le DC (hors Microsoft) |
| PER-03 | Services Windows non-Microsoft actifs sur le DC |
| PER-04 | Clés Run/RunOnce non-Microsoft dans le registre du DC |

---

### Famille R — RGPD & Conformité documentaire, historique (8 contrôles INFO)

> "DOMAINE 09" du code — préexistant, distinct des familles **RGPD** (technique, ajoutée v3.7.3) et **RGPD-DOC** (documentaire, ajoutée v3.4) ci-dessous. Certains intitulés se recoupent conceptuellement (ex. R-01 "Registre des traitements AD documenté" vs RGPD-DOC-01 "Registre des activités de traitement Art.30") mais ce sont trois chemins de code distincts et actifs — à clarifier/fusionner en interne si une consolidation éditoriale est souhaitée, ce document se limite à documenter l'existant.

| ID | Titre |
|----|-------|
| R-01 | Registre des traitements AD documenté |
| R-02 | Procédure de désactivation des départs documentée |
| R-03 | Politique de gestion des habilitations formalisée |
| R-04 | Plan de réponse aux incidents de sécurité AD |
| R-05 | Sauvegardes AD testées et documentées |
| R-06 | Revue des accès privilégiés (access review) |
| R-07 | Documentation des délégations AD |
| R-08 | Sensibilisation cybersécurité des admins AD |

---

### Famille RGPD — RGPD technique automatisé (8 contrôles, nouveau v3.7.3)

| ID | Titre |
|----|-------|
| RGPD-01 | Comptes inactifs (>60j) avec accès à des groupes sensibles (RH/Finance/Médical/DPO) |
| RGPD-02 | Audit "Directory Service Access" activé (auditpol) |
| RGPD-03 | Chiffrement en transit — LDAP Signing + Channel Binding |
| RGPD-04 | ACL Write sur les OU sensibles (RH/DRH/Finance/Direction/Médical/Paie) |
| RGPD-05 | Comptes de service membres de groupes privilégiés |
| RGPD-06 | Rétention estimée du journal de sécurité (30j RGPD / 90j recommandé) |
| RGPD-07 | Comptes Domain Admins hors groupe Protected Users |
| RGPD-08 | Délégation Kerberos non contrainte (risque exfiltration de données) |

---

### Famille RGPD-DOC — Documentaires RGPD (5 contrôles INFO)

| ID | Titre |
|----|-------|
| RGPD-DOC-01 | Registre des activités de traitement (Art.30) incluant les traitements AD |
| RGPD-DOC-02 | Procédure de notification de violation de données documentée et testée (RGPD Art.33) |
| RGPD-DOC-03 | Contrats DPA (Data Processing Agreement) signés avec les sous-traitants ayant accès AD |
| RGPD-DOC-04 | Politique de durée de conservation des logs et données AD documentée (RGPD Art.5) |
| RGPD-DOC-05 | DPIA réalisée pour les traitements AD à risque élevé (RGPD Art.35) |

---

### Famille RODC — Read-Only DC (2 contrôles)

| ID | Titre |
|----|-------|
| RODC-01 | RODC Password Replication Policy trop large |
| RODC-02 | Hashes de comptes DA/EA en cache sur un RODC |

---

### Famille S — Services DC (5 contrôles)

| ID | Titre |
|----|-------|
| S-01 | Connexions interactives sur les DC |
| S-02 | Comptes de service sur le DC local |
| S-03 | Windows Firewall activé sur le DC |
| S-04 | Credential Guard activé |
| S-05 | Secure Boot activé sur le DC |

---

### Famille SEC — Sécurité avancée (26 contrôles)

> **+3 contrôles ajoutés le 2026-07-22** (Shadow Credentials + ACL AD Sites, voir §1bis-a). `SEC-SHADOW-CREDS-001/002` recoupent conceptuellement **DEL-06** (Shadow Credentials sur comptes DA/EA) — DEL-06 est un contrôle plus ancien et plus étroit (présence sur DA/EA uniquement), les deux nouveaux couvrent respectivement la présence sur *tout* compte et l'ACL Write elle-même sur les comptes Domain Admins ; chemins de code distincts et actifs, non fusionnés à ce jour (même remarque de consolidation potentielle que pour R / RGPD-DOC, §"Famille R").

| ID | Titre |
|----|-------|
| SEC-01 | Compte Invité désactivé |
| SEC-02 | Durée max ticket Kerberos (10h) |
| SEC-03 | Membres groupe DnsAdmins |
| SEC-04 | RestrictRemoteSAM activé |
| SEC-05 | LSASS Protection (RunAsPPL) |
| SEC-06 | Windows Defender/Antivirus actif sur DC |
| SEC-07 | NetBIOS désactivé sur les interfaces réseau |
| SEC-08 | LLMNR désactivé (Link-Local Multicast) |
| SEC-09 | WinRM — configuration sécurisée |
| SEC-10 | Corbeille AD (AD Recycle Bin) activée |
| SEC-11 | Trusts externes sans SID filtering ou auth sélective |
| SEC-12 | SMB Signing obligatoire sur DC |
| SEC-13 | Rétention journal Sécurité >= 90 jours |
| SEC-14 | Privileged Access Management (PAM Trust) |
| SEC-15 | Filtre mots de passe compromis (HIBP/bannedpasswords) |
| SEC-16 | MachineAccountQuota non restreint (MAQ > 0) |
| SEC-17 | Mot de passe krbtgt renouvelé (< 180j) |
| SEC-18 | Secure Channel Signing — RequireSignOrSeal (résiduel Zerologon) |
| SEC-19 | Solution PAM/PIM intégrée à l'AD (ANSSI PAM / Zero Trust) |
| SEC-20 | LSA Protection (RunAsPPL) actif sur le DC |
| SEC-21 | ASR (Attack Surface Reduction) — règles critiques non en mode Block |
| SEC-22 | Groupe Schema Admins non vide (doit l'être hors opération de schema) |
| SEC-23 | Membres de Protected Users actifs sans connexion depuis > 180j |
| SEC-SHADOW-CREDS-001 *(nouveau)* | Shadow Credentials — msDS-KeyCredentialLink présent sur des comptes |
| SEC-SHADOW-CREDS-002 *(nouveau)* | ACL Write sur msDS-KeyCredentialLink des comptes Domain Admins non-restreinte |
| SEC-ADSITE-ACL-001 *(nouveau)* | ACL permissives sur le conteneur AD Sites (CN=Sites,Configuration) |

---

### Famille SV — SYSVOL / ACL / Réplication (8 contrôles)

| ID | Titre |
|----|-------|
| SV-01 | Permissions SYSVOL — écriture non restreinte |
| SV-02 | Fichiers exécutables dans NETLOGON |
| SV-03 | GPO modifiées dans les 7 derniers jours |
| SV-04 | Réplication SYSVOL DFS-R vs FRS legacy |
| SV-05 | Droits DCSync non autorisés (DS-Replication) |
| SV-06 | ACL suspectes sur OU Domain Controllers |
| SV-07 | GenericAll/WriteDACL/WriteMember sur groupes privilégiés |
| SV-08 | WriteDACL/WriteOwner sur racine du domaine |

---

### Famille TIER — Tiering AD (5 contrôles)

| ID | Titre |
|----|-------|
| TIER-01 | Connexions DA (Tier 0) sur machines Tier 2 (EID 4624 — 7j) |
| TIER-02 | GPO Deny Logon par Tier (DenyInteractiveLogon / DenyRemoteInteractiveLogon) |
| TIER-03 | OU de séparation Tier 0/1/2 présentes dans l'AD |
| TIER-04 | Comptes DA/EA membres de groupes multi-tiers simultanément |
| TIER-05 | PAW / Jumphosts documentés dans l'AD (PAW*, JUMP*, BASTION*) |

---

### Famille TR — Trusts (3 contrôles)

| ID | Titre |
|----|-------|
| TR-01 | Trusts bidirectionnels sans SID Filtering |
| TR-02 | Inventaire des domaines et forêts AD |
| TR-03 | Trusts externes sans authentification sélective |

---

### Famille TRUST — BloodHound v8 Trust Edges (6 contrôles, nouveau 2026-07-22)

> Source : SpecterOps, juin 2025. Distincte de la famille **TR** ci-dessus (contrôles de configuration trust plus anciens et plus génériques) — TRUST couvre spécifiquement les chemins d'abus identifiés par BloodHound v8 sur les objets de trust (principals étrangers, comptes de trust, claims transformation).

| ID | Titre |
|----|-------|
| TRUST-001 | Inventaire des trusts de forêt bidirectionnels |
| TRUST-002 | Principals étrangers imbriqués dans un groupe privilégié local |
| TRUST-003 | Trust Account Attack — Domain Admins distants imbriqués dans un groupe privilégié local |
| TRUST-004 | Permissions non-admin sur SYSVOL combinées à un trust sans SID Filtering (croise G-06 du même scan) |
| TRUST-005 | ClaimSpecialIdentity — Politiques de transformation de claims across trust |
| TRUST-006 | Inventaire des trusts — direction, type et transitivité |

*Trois précisions d'implémentation par rapport à la veille source : TRUST-003 matche par SID plutôt que par sous-chaîne de DN ; TRUST-005 a été réimplémenté car le pseudo-code source (filtrage de `objectSID` de groupe sur un pattern de SID bien connu) n'a pas de sens pour des groupes AD classiques — il liste désormais les Claims Transformation Policies existantes via `Get-ADClaimTransformPolicy`, l'analyse fine des règles restant manuelle.*

---

## 6. Module cloud — 168 contrôles

**Fichier :** `ShieldAD-AADS.ps1` | 318 KB+ | Version interne affichée : 3.6.0 (obsolète, voir avertissement §1) — **+314 lignes depuis le 07-22**, +1 nouveau `New-AADSCtrl` le 2026-08-24 (`AZ-04m`, protection SyncJacking — comptage AST automatisé + module IAM Entra `Invoke-IamEntraInventory`, voir §1ter-a/d, §1quinquies-q), **+369 lignes le 2026-09-02** (`9516af0` — fix Device Code Flow **et** 15 nouveaux `New-AADSCtrl` non annoncés dans le message de commit, voir §1sexies-j)

**Authentification :** Device Code Flow → Microsoft Graph — corrigé le 2026-09-02 (`9516af0`, §1sexies-j) : la résolution du `ClientId` via `$PSScriptRoot` échouait silencieusement une fois le worker matérialisé en dossier temporaire par `embedded_workers.rs` ; lit désormais `Documents\ShieldAD\ShieldAD-Connect.json` via un nouveau paramètre `-ConnectJsonPath`  
**Permissions requises :** User.ReadAll, Directory.ReadAll, Policy.ReadAll, AuditLog.ReadAll, `OnPremDirectorySynchronization.Read.All` *(nouveau 2026-08-24, `AZ-04m` — nécessite un reconsentement admin sur les tenants déjà connectés, §1quinquies-q)*  
**Score hybride :** On-prem 65% + Cloud 35%

**Méthode de comptage :** décompte propre via `New-AADSCtrl "ID"`, aucun doublon, calculé automatiquement par auto-analyse AST (`Get-ShieldADRealCloudControlCount`, `ShieldAD-AADS.ps1:550`, voir §1ter-a) — **168 contrôles** au 2026-09-03 (153 au 2026-08-24 + 15 le 2026-09-02 : `AZ-01l..o`, `AZ-02m..o`, `AZ-03i`, `AZ-04n..q`, nouvelle famille `AZ-15` — Unités administratives, 3 contrôles — issus d'une analyse d'écart type Purple Knight/PingCastle, ajoutés incidemment par un commit de correctif Device Code Flow, §1sexies-j). Le commentaire d'architecture en tête de fichier ("32 contrôles Entra ID, 12 AADS, 5 Teams, 7 Intune, 6 B2B, 8 Logging, 7 Subscriptions, 7 doc") est obsolète — les familles EXO (Exchange Online) et SPO (SharePoint/OneDrive/Teams), soit 28 contrôles au total, n'y figurent même pas. Le tableau ci-dessous fait foi pour la répartition qualitative ; pour le chiffre exact, voir `docs/CONTROL-COUNTS.generated.md`.

---

### Famille AZ-01 — Administrateurs Entra ID (15 contrôles)

> **+4 contrôles ajoutés le 2026-09-02** (`AZ-01l` à `AZ-01o`, analyse d'écart Purple Knight/PingCastle — voir §1sexies-j).

| ID | Titre |
|----|-------|
| AZ-01a | Nombre de Global Administrators |
| AZ-01b | Administrateurs Azure sans MFA configuré |
| AZ-01c | PIM (Privileged Identity Management) activé |
| AZ-01d | Comptes Break-Glass (accès urgence) configurés |
| AZ-01e | Global Admins inactifs depuis > 90 jours |
| AZ-01f | Rôles sensibles hors GA — membres sans MFA |
| AZ-01g | Rôles sensibles — membres synchronisés depuis AD on-prem |
| AZ-01h | Rôles sensibles — membres inactifs depuis > 90 jours |
| AZ-01i | PIM — rôles sensibles avec membres actifs permanents |
| AZ-01j | Rôles sensibles — nombre de membres excessif (> 3) |
| AZ-01k | Comptes de service dans des rôles d'administration |
| AZ-01l *(nouveau, 09-02)* | Au moins 2 Global Administrators actifs (redondance) |
| AZ-01m *(nouveau, 09-02)* | Compte à privilège sans boîte mail active |
| AZ-01n *(nouveau, 09-02)* | Utilisateurs cloud-only éligibles à un rôle privilégié (PIM) |
| AZ-01o *(nouveau, 09-02)* | Rôles personnalisés Entra avec permission à risque |

---

### Famille AZ-02 — Conditional Access & MFA (15 contrôles)

> **+3 contrôles ajoutés le 2026-09-02** (`AZ-02m` à `AZ-02o` — voir §1sexies-j).

| ID | Titre |
|----|-------|
| AZ-02a | Protection accès : Conditional Access ou Security Defaults |
| AZ-02b | Authentification legacy bloquée (CA Policy) |
| AZ-02c | Couverture MFA globale des utilisateurs actifs |
| AZ-02d | Utilisateurs à risque (Entra ID Identity Protection) |
| AZ-02e | CA Policy — exclusions larges (groupe > 50 membres) |
| AZ-02f | CA Policy — blocage connexions pays non autorisés (Named Locations) |
| AZ-02g | CA Policy — conformité device Intune requise |
| AZ-02h | CA Policy — MFA renforcé dédié aux rôles admin |
| AZ-02i | CA Policy — nombre d'exclusions excessif (> 10) |
| AZ-02j | SSPR (Self-Service Password Reset) configuré |
| AZ-02k | Authentication Strengths phishing-resistant configurées |
| AZ-02l | Continuous Access Evaluation (CAE) activé |
| AZ-02m *(nouveau, 09-02)* | CA Policy MFA avec contrôle de persistance de session |
| AZ-02n *(nouveau, 09-02)* | Emplacements nommés CA sans plage IP privée |
| AZ-02o *(nouveau, 09-02, INFO)* | Protection de mots de passe personnalisée (liste bannie) |

---

### Famille AZ-03 — AD Connect / Hybride (9 contrôles)

> **+1 contrôle ajouté le 2026-09-02** (`AZ-03i` — voir §1sexies-j).

| ID | Titre |
|----|-------|
| AZ-03a | AD Connect / Entra Connect — santé synchronisation |
| AZ-03b | Global Admins cloud-only (pas synchronisés depuis AD) |
| AZ-03c | Mode de synchronisation AD Connect (PHS / PTA / ADFS) |
| AZ-03d | Seamless SSO activé (AZUREADSSOACC dans AD on-prem) |
| AZ-03e | Password Writeback activé (vecteur compromission AD on-prem) |
| AZ-03f | Compte de service AD Connect — droits on-prem excessifs |
| AZ-03g | Fréquence synchronisation AD Connect (cible < 30 min) |
| AZ-03h | Staged Rollout actif (migration partielle en cours) |
| AZ-03i *(nouveau, 09-02)* | Rôle Directory Synchronization Accounts limité au compte de service |

---

### Famille AZ-04 — Applications & Service Principals (17 contrôles)

> **+1 contrôle ajouté le 2026-08-24** (AZ-04m — protection SyncJacking Entra Connect, hors périmètre applications/service principals au sens strict mais numéroté dans cette famille par continuité de code — voir §1quinquies-q). **+4 contrôles ajoutés le 2026-09-02** (`AZ-04n` à `AZ-04q` — voir §1sexies-j).

| ID | Titre |
|----|-------|
| AZ-04a | Applications avec permissions Graph à hauts privilèges |
| AZ-04b | Secrets et certificats d'applications expirés ou expirant |
| AZ-04c | Managed Identities avec rôle Owner/Contributor |
| AZ-04d | Service Principals avec secret sans expiration (> 5 ans ou Jamais) |
| AZ-04e | Consentement utilisateur final — admin consent requis |
| AZ-04f | Applications tierces avec permissions Mail.ReadWrite / Files.ReadWrite.All |
| AZ-04g | Applications avec RoleManagement.ReadWrite.Directory |
| AZ-04h | OAuth consent grants sur comptes GA / Privileged Role Admin |
| AZ-04i | Applications avec permissions élevées non utilisées > 90 jours |
| AZ-04j | Applications sans Publisher Verification avec permissions sensibles |
| AZ-04k | Certificats app/Service Principal longue durée sans rotation |
| AZ-04l | Authentification par certificat client (CBA) — exposition future |
| AZ-04m *(nouveau, 08-24)* | Protection hard/soft match Entra Connect (SyncJacking) |
| AZ-04n *(nouveau, 09-02)* | Enregistrement d'applications restreint aux administrateurs |
| AZ-04o *(nouveau, 09-02)* | Création de tenants restreinte aux administrateurs |
| AZ-04p *(nouveau, 09-02)* | Consentements délégués à risque (tous les utilisateurs) |
| AZ-04q *(nouveau, 09-02, INFO)* | Autorités de certification racine CBA inventoriées |

---

### Famille AZ-15 — Unités administratives (3 contrôles, nouveau 2026-09-02)

> Ajoutée par le même commit que les points ci-dessus (`9516af0`, §1sexies-j) — analyse d'écart type Purple Knight/PingCastle.

| ID | Titre |
|----|-------|
| AZ-15a *(INFO)* | Unités administratives utilisées pour la délégation scopée |
| AZ-15b *(INFO)* | Unités administratives à adhésion masquée inventoriées |
| AZ-15c | Unités administratives dynamiques avec règle d'adhésion large |

---

### Famille AZ-05 — Logs & Protection (2 contrôles)

| ID | Titre |
|----|-------|
| AZ-05a | Logs de connexion Entra ID accessibles |
| AZ-05b | Microsoft Defender for Identity (MDI) actif |

---

### Famille AZ-06 — Access Reviews & Score (2 contrôles)

| ID | Titre |
|----|-------|
| AZ-06a | Access Reviews configurées (revues d'accès périodiques) |
| AZ-06b | Microsoft Secure Score tenant Azure |

---

### Famille AZ-07 — Guests, Score & Gouvernance (10 contrôles)

| ID | Titre |
|----|-------|
| AZ-07a | B2B — invitations ouvertes à tous les utilisateurs |
| AZ-07b | Nombre de Guests actifs dans le tenant (seuil d'alerte) |
| AZ-07c | Diagnostic Settings Entra ID — logs de connexion accessibles |
| AZ-07d | Microsoft Secure Score >= 50% du score maximum |
| AZ-07e | Identity Protection — licence P2 et accès actifs |
| AZ-07f | Utilisateurs à risque actif détectés (Identity Protection) |
| AZ-07g | Applications Entra sans propriétaire (orphelines) |
| AZ-07h | Groupes M365 en visibilité Public (accès ouvert) |
| AZ-07i | Security Defaults vs CA Policies — cohérence configuration |
| AZ-07j | Licences Microsoft 365 — état critique détecté |

---

### Famille AZ-09 — Microsoft Teams (5 contrôles)

| ID | Titre |
|----|-------|
| AZ-09a | Accès guest Teams restreint ou désactivé |
| AZ-09b | Réunions Teams — admission automatique externe désactivée |
| AZ-09c | Canaux privés Teams — politique de création restreinte |
| AZ-09d | Applications tierces Teams — politique d'approbation admin |
| AZ-09e | Enregistrements Teams stockés dans tenant (pas sur device local) |

---

### Famille AZ-10 — Intune / MDM (7 contrôles)

| ID | Titre |
|----|-------|
| AZ-10a | Politiques de conformité Intune créées et assignées |
| AZ-10b | Chiffrement BitLocker imposé via Intune |
| AZ-10c | Windows Update for Business configuré (délai max 14 jours) |
| AZ-10d | Devices non conformes bloqués par CA Policy (Intune) |
| AZ-10e | Antivirus Defender activé et à jour via Intune |
| AZ-10f | Taux devices non conformes Intune <= 10% du parc |
| AZ-10g | Politique verrouillage écran (max 5 min) imposée via Intune |

---

### Famille AZ-11 — Guests B2B (6 contrôles)

| ID | Titre |
|----|-------|
| AZ-11a | Comptes Guests actifs > 90 jours sans connexion récente |
| AZ-11b | Guests avec accès à des groupes M365 sensibles |
| AZ-11c | Politique d'invitation Guest restreinte (admin only) |
| AZ-11d | Access Reviews configurés pour les comptes Guests |
| AZ-11e | Cross-Tenant Access Policy (XTAP) configurée |
| AZ-11f | Guests avec licences actives — vérification justification |

---

### Famille AZ-12 — Azure Monitor & Sentinel (8 contrôles)

| ID | Titre |
|----|-------|
| AZ-12a | Diagnostic Settings activés sur Entra ID (Log Analytics) |
| AZ-12b | Microsoft Sentinel connecté et configuré sur le tenant |
| AZ-12c | Alertes : ajout/suppression Global Administrator surveillé |
| AZ-12d | Azure Activity Log — rétention des logs >= 90 jours |
| AZ-12e | Unified Audit Log Microsoft 365 activé |
| AZ-12f | Alertes connexions hors pays autorisés (Identity Protection) |
| AZ-12g | Microsoft Defender for Cloud Apps (MCAS) connecté |
| AZ-12h | Microsoft Defender XDR activé et connecté |

---

### Famille AZ-13 — Azure Subscription & RBAC (7 contrôles)

| ID | Titre |
|----|-------|
| AZ-13a | Subscription Owner : max 3 comptes avec rôle Owner |
| AZ-13b | Azure Defender for Servers activé sur les subscriptions |
| AZ-13c | Key Vault — accès réseau restreint (pas All networks) |
| AZ-13d | Key Vault — purge protection et soft delete activés |
| AZ-13e | Resource Locks configurés sur les ressources critiques Azure |
| AZ-13f | Azure Policy — politiques de conformité assignées aux subscriptions |
| AZ-13g | Pas de compte Legacy Classic Administrator actif |

---

### Famille AZ-14 — Documentaires Azure RBAC (7 contrôles INFO)

| ID | Titre |
|----|-------|
| AZ-14a | Politique de sécurité Azure documentée et approuvée |
| AZ-14b | Revue trimestrielle des rôles privilégiés Azure documentée |
| AZ-14c | Plan de continuité tenant Azure (DR plan) documenté |
| AZ-14d | Procédure de réponse aux incidents cloud documentée |
| AZ-14e | Tests de restauration Azure AD documentés (< 12 mois) |
| AZ-14f | Inventaire des applications SaaS tiers accédant au tenant |
| AZ-14g | Contrat DPA (Data Processing Agreement) avec Microsoft signé |

---

### Famille AADS — Azure Entra Domain Services (16 contrôles)

| ID | Titre |
|----|-------|
| AADS-01 | Groupe AAD DC Administrators — membres et type |
| AADS-02 | OU AADDC Computers et AADDC Users présentes |
| AADS-03 | Comptes synchronisés AADDC Users — hygiène |
| AADS-04 | Cohérence SPN LDAP (impact potentiel sur AADS) |
| AADS-05 | LDAPS configuré sur le domaine Azure Entra Domain Services |
| AADS-06 | Synchronisation Entra ID vers AADS — santé |
| AADS-07 | SKU Azure Entra Domain Services (Standard vs Enterprise) |
| AADS-08 | Politique de mot de passe AADS configurée |
| AADS-09 | Notifications d'alertes AADS configurées |
| AADS-10 | Utilisateurs invités (Guests) dans des groupes privilégiés |
| AADS-11 | Kerberos Armoring (FAST) configuré sur le domaine AADS |
| AADS-12 | NTLM restreint sur le domaine AADS |
| AADS-13 | Fine-Grained Password Policies AADS configurées |
| AADS-14 | Audit logs AADS présents et collectés (Event 4662/5136) |
| AADS-15 | Backup AADS — Snapshots Azure configurés |
| AADS-16 | Dépendance tierce — crypto backend Entra ID / AADS managée par Microsoft (INFO, hors score — voir disclaimer §14) |

### Famille AADS-DOC — Documentaires AADS (3 contrôles INFO)

| ID | Titre |
|----|-------|
| AADS-DOC-01 | Architecture hybride AD on-prem et Entra ID documentée (schéma + flux) |
| AADS-DOC-02 | Plan de bascule documenté en cas d'indisponibilité Azure Entra Domain Services |
| AADS-DOC-03 | Tests de restauration Azure Entra Domain Services documentés et planifiés |

---

### Famille EXO — Exchange Online (12 contrôles)

| ID | Titre |
|----|-------|
| EXO-01 | DKIM configuré sur tous les domaines vérifiés |
| EXO-02 | SPF configuré et restrictif sur tous les domaines |
| EXO-03 | DMARC configuré en mode reject ou quarantine |
| EXO-04 | Auto-forwards externes — Transport Rule de blocage |
| EXO-05 | Anti-phishing Microsoft Defender for Office 365 configuré |
| EXO-06 | Safe Links activé (Microsoft Defender for Office 365) |
| EXO-07 | Safe Attachments activé (Microsoft Defender for Office 365) |
| EXO-08 | Audit boîte mail Exchange Online activé |
| EXO-09 | Basic Auth désactivé Exchange Online (Modern Auth uniquement) |
| EXO-10 | Protocoles legacy EXO désactivés (POP3, IMAP, SMTP Auth) |
| EXO-11 | Shared Mailboxes — connexion directe bloquée |
| EXO-12 | Règles boîte mail suspectes (forward/suppression auto) |

### Famille EXO-DOC — Documentaires Exchange (4 contrôles INFO)

| ID | Titre |
|----|-------|
| EXO-DOC-01 | Politique d'utilisation de la messagerie professionnelle rédigée et signée |
| EXO-DOC-02 | Procédure de réponse à une compromission de messagerie (BEC) documentée |
| EXO-DOC-03 | Politique de rétention des emails documentée (RGPD + obligations légales) |
| EXO-DOC-04 | Simulations de phishing réalisées et résultats documentés (CIS 14.2) |

---

### Famille SPO — SharePoint Online & OneDrive (8 contrôles)

| ID | Titre |
|----|-------|
| SPO-01 | SharePoint — partage externe restreint (pas Anyone) |
| SPO-02 | Expiration des liens de partage anonymes configurée |
| SPO-03 | OneDrive — partage externe restreint |
| SPO-04 | Teams — accès invités (B2B Guests) contrôlé |
| SPO-05 | Teams — partage de fichiers externes restreint |
| SPO-06 | Teams — applications tierces installées (revue) |
| SPO-07 | Sensitivity Labels Microsoft Purview configurés |
| SPO-08 | DLP Policy active sur SharePoint / OneDrive / Exchange |

### Famille SPO-DOC — Documentaires SharePoint (4 contrôles INFO)

| ID | Titre |
|----|-------|
| SPO-DOC-01 | Politique de classification des données M365 documentée et appliquée |
| SPO-DOC-02 | Procédure de révocation d'accès invités (B2B) documentée avec SLA |
| SPO-DOC-03 | Inventaire des sites SharePoint critiques avec propriétaires désignés |
| SPO-DOC-04 | Politique de gestion des appareils non gérés (BYOD) accès M365 documentée |

---

## 7. Rapports HTML générés

ShieldAD génère **8 rapports HTML** autonomes (CSS intégré, QR Code footer, hash SHA-256) — 1 de plus que dans la précédente version de ce document (**Utilisateurs à Risque**). Le rapport PME/Quick Wins, introduit en v3.8.0, a été fusionné dans le rapport CEO en v3.9.0.

### New-ReportCEO — Rapport Direction
**Audience :** PDG, DG, Conseil d'administration  
**Sections :**
- Section 0 : Résumé 30 secondes (Urgence | Tendance | Progress) — nécessite `$PreviousScan`
- Section 1 : Message clé Direction
- Section 2 : Impact financier (source ENISA 2024, Coveware 2024)
- Section 3 : Cartographie des risques
- Section 4 : Technical Control Coverage — Regulatory Mapping (NIS2/ISO/RGPD)
- Section 5 : Indicateurs clés (NTLM, LAPS, SMBv1)
- Section 6 : Plan d'action 30/60/90 jours
- Section 7b : Top 3 langage business + Audit-Safe Readiness
- Section 7 : Responsabilité personnelle dirigeant (NIS2 loi belge 26 avril 2024)
- RFC 3161 : Horodatage cryptographique (Certum/DigiCert)

### New-ReportDPO — Rapport Conformité
**Audience :** DPO, Compliance Officer, auditeur  

> ⚠️ **Restructuré le 2026-08-04** (arbre de travail non commité, §1ter-h) : la structure « Sections 1-15 » ci-dessous décrivait l'organisation par référentiel utilisée jusqu'au 2026-07-22. `New-ReportDPO` est désormais organisé en **13 « points » regroupés par thème** : 1. Couverture par référentiel (nouveau, miroir de `computeFrameworkCoverage`) + responsabilités + sécurité du rapport ; 2. Synthèse RGPD ; 3. Synthèse des autres certifications sélectionnées (nouveau) ; 4. Plan d'action DPO ; 5. Post-Quantique ; 6. Analyse par article/domaine regroupée (RGPD puis NIS2/DORA/CyFun/ISO/CIS/ANSSI) ; 7. Contrôles documentaires ; 8. Jurisprudence/Annexes/IAM ; 9. Checklist prêt-audit ; 10. Evidence Certificateur ; 11. Matrice de traçabilité ; 12. Registre CAPA ; 13. Périmètre d'audit. Un bloc citant 7 décisions APD/CNIL/EDPB numérotées a été retiré du point 8 — aucune n'a résisté à la vérification sur les sources officielles (voir §1ter-h pour le détail et la règle qui en découle : ne jamais réintroduire de jurisprudence numérotée sans vérification décision par décision).

**Ancienne structure (Sections 1-15, historique, avant le 2026-08-04) :**
- Sections 1-11 : Conformité RGPD/NIS2 par article + CIS Controls v8 + Azure
- Section 12 : Annexes CSV exportées automatiquement (DPO_Annexes_[date]/)
- Section 13 : Échantillon IAM anonymisé (Art.5(1)(c) RGPD)
- Section 14 : Checklist 19 items "Prêt pour audit"
- Section 15 : Evidence Certificateur — 8 blocs (logs, rétention, SIEM, sauvegardes...)
- Hash SHA-256 intégrité rapport

### New-ReportIT — Rapport Technique
**Audience :** DSI, RSSI, équipe IT  
**Contenu :** Tous les contrôles par domaine, statut exclusions, steps de remédiation détaillés, texte i18n complet FR/EN/NL depuis v3.7.2

### New-ReportREM — Rapport Remédiation
**Audience :** Équipe IT, chef de projet sécurité  
**Contenu :** Plan de remédiation priorisé, estimation effort, impact risque par contrôle

### New-ReportSCO — Rapport Scoring
**Audience :** RSSI, auditeur interne  
**Contenu :** Décomposition scoring détaillée (score Absolu + score Contextuel), evidence quality par domaine, risk exposure

> **v3.9.0 :** le rapport PME / Quick Wins (`New-ReportPME`, introduit en v3.8.0) a été fusionné dans le rapport CEO (`New-ReportCEO`). Le rapport CEO absorbe désormais la commande de remédiation prête à copier dans son plan d'action Phase 1, et sa cartographie des risques (Section 3) n'affiche plus jamais de description technique brute — toujours du langage métier (dictionnaire `$bizDict` + repli générique par sévérité).

### New-ReportTREND — Rapport Tendance
**Audience :** Direction, RSSI  
**Contenu :** Évolution vs scan précédent, indicateurs de progrès, régression détectée

### New-ReportUsersAtRisk — Rapport Utilisateurs à Risque *(nouveau v3.6)*
**Audience :** DPO, RSSI  
**Contenu :** 8 catégories de risque (comptes issus des contrôles A-02, A-04, A-05, A-06, A-09, A-10, A-11, A-12), tableau filtrable, export CSV audit-proof + métadonnées SHA-256, plan 30/60/90 jours. Généré automatiquement après les rapports principaux (`Export-UsersAtRisk`).

### New-ReportForest — Rapport Topologie
**Audience :** Architecte AD, DSI  
**Contenu :** Topologie multi-domaines, trusts, SID filtering, niveau fonctionnel forêt

---

## 8. Modules de support

### ShieldAD-Encrypt.ps1 — Chiffrement rapports (.adsec)

Format binaire propriétaire :
```
[Magic 6 bytes "ADSEC" + version 1]
[Metadata JSON — algo, kdf, iterations, filename, created]
[Salt 32 bytes aléatoires]
[IV 16 bytes aléatoires]
[Ciphertext AES-256-CBC]
[HMAC-SHA256 sur salt+IV+ciphertext]
```
- KDF : PBKDF2-SHA256 — **310 000 itérations** (OWASP 2024)
- Authentification : HMAC-SHA256 (détecte toute falsification)

### ~~ShieldAD-ProofGenerator.ps1~~ — Horodatage RFC 3161 *(supprimé le 2026-08-14, `0fc838e`, §1quater-j)*

Doublon superflu, jamais chargé par `ShieldAD.ps1` : `ShieldAD-Worker.ps1` a sa propre implémentation indépendante de `Get-Rfc3161Timestamp`. Conservé ici pour mémoire — TSA par défaut : Certum (QTSP européen, `http://time.certum.pl`) ; alternatif DigiCert (`http://timestamp.digicert.com`) ; preuve d'existence du rapport à une date précise (RGPD, NIS2, ISO).

### ShieldAD-License.ps1 — Gestion licences

> ⚠️ **Schéma changé le 2026-08-04 (commit `fcafd1f` + nettoyage non commité, §1ter-b/c).** L'ancien schéma de licence par clé/checksum HMAC (« schéma B », table ci-dessous, `ShieldAD-LicenseValidator.ps1`) est **retiré** — le fichier a été supprimé, ses derniers appelants dans `ShieldAD.ps1` (bouton « Activer licence », revalidation au clic Scan) et `ShieldAD-DatabaseManager.ps1` (`Save-LicenseToDB`/`Update-LicenseScanCount`/`Add-LicenseAuditLog`) ont été nettoyés dans la foulée. **L'unique mécanisme actif est désormais le fichier `.lic` signé RSA-4096** (« schéma A »), vérifié une seule fois au lancement par `ShieldAD-LAUNCHER.ps1` — position déjà officielle dans `CLAUDE.md` § Licence logicielle. Le tableau ci-dessous et la mention `ShieldAD-KeyGen.ps1` qui suit décrivent le **schéma B, historique**, conservés pour mémoire du modèle de licence antérieur.

| Type (schéma B, historique) | Description |
|------|-------------|
| INTERNAL | Usage interne MSC — tous modules |
| AUDITOR | Nombre de scans limité, restrictions modules |
| STANDARD | Modules d'audit de base |
| ENTERPRISE | Tous modules + ShieldConnect |

Ancien mécanisme (schéma B, historique) : Chiffrement AES-256-CBC | Signature HMAC-SHA256, `ShieldAD-LicenseValidator.ps1` (embarqué dans l'exe) validait/parsait les clés au runtime avec le même secret HMAC que `ShieldAD-KeyGen.ps1` (interne, non distribué, toujours présent mais désormais orphelin — absent de `ShieldAD-BUILD.ps1`, non livré au client).

### `src-tauri/src/license.rs` — Vérification RSA-4096 native + gating par module *(nouveau, 2026-08-17, §1quater-a)*

Second vérificateur du même fichier `.lic` signé RSA-4096 (schéma A), cette fois côté app v4 Tauri — même clé publique embarquée, même format de fichier, même compteur de scans AUDITOR que `ShieldAD-License.ps1` côté v3.x ; les licences déjà émises restent valables sans réémission. `check_license()`/`increment_license_usage()` exposées comme commandes Tauri (9 tests unitaires). `LicenseGate.tsx` bloque l'app entière au lancement si la licence est invalide/expirée/quota dépassé (avant même l'onboarding) ; `Sidebar.tsx` grise les modules (ShieldConnect/ShieldGraph) non inclus dans la licence active — c'est ce mécanisme qui introduit le **gating par module**, absent du schéma v3.x. Repli `INTERNAL` (accès total sans fichier `.lic`) limité à `cfg(debug_assertions)` uniquement, jamais en build release. `LicenseSummary.tsx` (vue Paramètres) affiche type d'abonnement, expiration, quota et statut par module. Un bug corrigé le 2026-08-17 (`59c0fad`) : `ShieldAD-LicenseGen.ps1` écrit un BOM UTF-8 que `serde_json` refuse en tête de fichier — `strip_bom()` appliqué aux trois points de lecture Rust.

### `src-tauri/src/updater.rs` — Module de mise à jour applicatif *(nouveau, 2026-08-17, §1quater-b)*

`check_for_update()`/`download_update()`/`verify_and_install_update()`/`import_update_manual()` : vérification/téléchargement/installation d'un `.msi` signé Authenticode (empreinte épinglée), pas le schéma minisign du plugin `tauri-plugin-updater`. `UpdateSummary.tsx` + `updateStore.ts` côté frontend, avec import manuel hors-ligne pour les sites sans accès Internet. Publication via `infra/scaleway-updates/` (Terraform, bucket Object Storage + Edge Services WAF/cache/TLS, déployé et validé sur le Project `shieldad-updates`) et `.github/workflows/release.yml` (build + signature SSL.com eSigner à chaque tag).

### ShieldAD-DatabaseManager.ps1 — Persistance locale

Couche JSON zéro-dépendance (`%APPDATA%\Mandatory Shield\ShieldAD\DB\`) : licences, scans, findings, rapports, tâches de remédiation, logs d'audit. Chargée en tout premier au démarrage — ComplianceMapper et Remediation lisent/écrivent via elle. **-87 lignes le 2026-08-04** : `Save-LicenseToDB`/`Update-LicenseScanCount`/`Add-LicenseAuditLog` (dédiées au schéma de licence B ci-dessus) retirées ; `Get-LicenseFromDB`/`Get-LicenseHistory` conservées.

### ShieldAD-ScoringCalculator.ps1 — Scoring dual *(nouveau)*

Calcule deux scores distincts : **Absolu** (jeu de contrôles fixe, pour comparer des scans dans le temps sans effet de bord lié au choix de standards) et **Contextuel** (filtré selon `$Global:ComplianceSelection`, pour la lecture "conformité perçue" par le client).

### ShieldAD-ComplianceMapper.ps1 / ShieldAD-Remediation.ps1 — Modules WPF embarqués *(nouveaux)*

Deux fenêtres modales additionnelles accessibles depuis l'interface principale : cartographie de conformité par standard (% par NIS2/ISO27002/CIS/ANSSI/DORA) et gestion/suivi des tâches de remédiation issues des contrôles FAIL.

### ShieldAD-Connect.ps1 + ShieldAD-ShieldConnectors.ps1 — Intégrations SIEM/SOAR ("ShieldConnect")

| Plateforme | Protocole |
|-----------|-----------|
| Azure Sentinel | REST API (Log Analytics) |
| Splunk | HEC (HTTP Event Collector) |
| Elastic | REST API + API Key |
| Wazuh | REST API |
| Graylog | GELF UDP/TCP |
| QRadar | Syslog TCP/UDP |
| Microsoft Teams | Webhook |
| Slack | Webhook |
| Email | SMTP avec TLS |
| STIX 2.1 | Export fichier |

`ShieldAD-ShieldConnectors.ps1` fournit l'UI de configuration/test des identifiants (nécessite des droits admin) ; `ShieldAD-Connect.ps1` effectue l'envoi effectif via des convertisseurs de format dédiés (CEF/GELF/ECS/STIX). C'est la voie v3.x (WPF, fenêtres modales).

**Côté v4 Tauri (committé le 2026-08-12, §1ter-e) :** `src-tauri/src/shieldconnect.rs` (463 lignes) orchestre les **mêmes** scripts `ShieldAD-Connect.ps1`/`ShieldAD-ConnectVault.ps1`, désormais embarqués à la compilation comme les Workers, via des scripts-pont temporaires dot-sourcés — ce n'est pas une réimplémentation Rust des connecteurs. 5 commandes Tauri : `get_shieldconnect_config`, `get_shieldconnect_config_path`, `save_shieldconnect_config`, `test_shieldconnect_connector`, `send_shieldconnect_now`, consommées par un nouvel onglet `src/tabs/TabShieldConnect.tsx` (387 lignes) + `src/store/shieldConnectStore.ts` (145 lignes) + `src/types/shieldconnect.ts` (34 lignes). Ce chantier a mis au jour et corrigé trois bugs de schéma jusque-là jamais exercés : `ShieldAD-Connect.ps1` lisait des chemins de config plats (`$Config.splunk.token`) au lieu du vrai schéma imbriqué `connectors.splunk.*` (chaque `Send-To*` recevait `$null` silencieusement) ; `ShieldAD-ConnectVault.ps1` chiffrait des noms de champ PascalCase sans rapport avec le JSON réel (le chiffrement DPAPI ne s'appliquait jamais) ; et un écart de schéma entre le JSON produit par `ShieldAD-Worker.ps1` (PascalCase) et celui attendu par les convertisseurs `Send-To*`/`ConvertTo-*` (snake_case), comblé côté Rust par `build_siem_results` (`shieldconnect.rs:378-422`). ShieldConnect est donc **fonctionnel dans l'app v4** au 2026-08-04, pas seulement « prévu v4.1 ».

### `src-tauri/src/cleanup.rs` — nettoyage sécurisé, portage Rust pour l'app v4 *(nouveau, committé le 2026-08-12)*

Port Rust natif (223 lignes) de `Invoke-SecureDelete`/`Invoke-SecureDeleteFolder`/`Invoke-FullCleanup`/`Register-LogoffCleanupTask` (§4/§9, jusqu'ici WPF v3.x uniquement — jamais porté côté Tauri, `%TEMP%` s'accumulait en usage réel de l'app v4). Fonctions clés : `secure_delete_file`/`secure_delete_dir` (écrasement par blocs de 1 Mo, refuse reparse points/symlinks — même garde-fou que la version PowerShell), `purge_temp_traces()`, `purge_output_dir()`, `full_cleanup()`, `register_logoff_cleanup_task()`/`unregister_logoff_cleanup_task()` (tâche planifiée Windows, action encodée en `-EncodedCommand` Base64). Enregistré dans `src-tauri/src/lib.rs` : purge + tâche de logoff au démarrage (`.setup(...)`), puis `full_cleanup()` + désinscription de la tâche à la fermeture propre de la fenêtre (`.on_window_event(...)` sur `CloseRequested`, qui tue aussi les process Scan/AzureScan/IamScan encore actifs). Les fonctions PowerShell équivalentes restent intactes dans `ShieldAD.ps1` (v3.x) — modules parallèles, pas un retrait côté v3.x. **Depuis le 2026-09-03 (§1sexies-m)**, ce même `CloseRequested` est intercepté une première fois pour proposer un export explicite avant fermeture (`CloseConfirmModal.tsx`) — le nettoyage ci-dessus ne s'exécute qu'après confirmation (`confirm_app_close`), sans changement à sa propre logique.

### ShieldAD-Exclusions.json — Risk Acceptance

Trois sections :
1. **ExcludedControls** — Exception par contrôle (ControlID, Reason, ApprovedBy, TicketRef, ExpiresOn)
2. **ExcludedAccounts** — Comptes de service légitimes avec ControlID ou `"*"` (wildcard)
3. **CustomThresholds** — Seuils personnalisés par contrôle (ex: `MaxDomainAdmins: 5`)

### ShieldAD-BloodHound-OpenGraph.ps1 — Pont BloodHound *(nouveau, hors chaîne principale)*

Script autonome non intégré à l'application principale — s'exécute séparément pour analyser les chemins d'attaque de mouvement latéral via l'API OpenGraph de BloodHound et produit ses propres livrables (HTML/CSV/Neo4j-JSON).

---

## 9. Sécurité & cryptographie

### Intégrité des modules

- SHA-256 de chaque fichier .ps1 embarqué dans `LAUNCHER.ps1`
- Vérification à chaque démarrage avant exécution
- Rebuild obligatoire (`ShieldAD-BUILD.ps1`) après toute modification

### Payload LAUNCHER

- Chiffrement : AES-256-CBC
- Clé régénérée à chaque build
- Tous les modules déchiffrés en temp uniquement, supprimés à la fin de session

### Suppression sécurisée

- `Invoke-SecureDelete` : écrasement par bytes aléatoires avant suppression
- Prévient la récupération forensique des rapports/logs de session
- Tâche Windows planifiée pour cleanup d'urgence en cas de fermeture forcée

### Lecture seule absolue

Les commandes suivantes sont **interdites** dans tout le code :
- `Remove-ADObject`
- `Set-ADUser`
- `Set-ADGroup`
- Toute commande modifiant l'AD

### Licence et mise à jour — vérification native v4 *(nouveau, 2026-08-17, §1quater-a/b — mis à jour 2026-08-24, §1quinquies-f/g/h)*

- **Licence :** signature RSA-4096 vérifiée nativement en Rust (`license.rs`), en plus de la vérification déjà faite par `ShieldAD-LAUNCHER.ps1` côté v3.x — même fichier `.lic`, deux vérificateurs indépendants. Contrairement à la v3.x, l'absence de `.lic` ne se replie sur un accès total (`INTERNAL`) qu'en build de développement (`cfg(debug_assertions)`) ; un build release sans licence valide est bloqué.
- **Mise à jour applicative :** `.msi` vérifié par signature **Authenticode** (empreinte épinglée dans le binaire, pas de clé minisign séparée à gérer) avant installation (`updater.rs`).
- **Distribution *(changé le 2026-08-24, §1quinquies-g)* :** l'ancien build par client (`npm run build:client-license`, `.lic` embarqué à la compilation dans `resources_license/`) est retiré. Un seul installateur universel désormais — l'utilisateur importe lui-même son `.lic` au premier lancement (`LicenseGate.tsx`, commande `import_license`) ou pour un renouvellement (`LicenseSummary.tsx`), persisté dans `app_data_dir()` (survit aux mises à jour/réinstallations du binaire, contrairement à l'ancien embarquement à côté de l'exécutable).
- **Génération des `.lic` côté MSC *(nouveau, 2026-08-24, §1quinquies-h)* :** `ShieldAD-LicenseGen.ps1` (toujours présent dans le dépôt) est remplacé en usage interne par **ShieldAD License Manager**, app Tauri séparée (`license-manager/`, projet indépendant de `ShieldADv4/`) — formulaire, sélecteur de fichier pour la clé privée MSC et le `.lic` de sortie, historique local des licences émises. Même primitive RSA-4096 PKCS1v15-SHA256, mêmes règles métier PROFESSIONAL/AUDITOR.
- **Build démo *(nouveau, 2026-08-24, §1quinquies-f)* :** `npm run build:demo` (feature Cargo `demo_mode`, compilé dans `src-tauri/target-demo/` pour ne pas écraser le build universel) débloque tous les modules sans `.lic`, y compris en release, pour les démonstrations commerciales — bandeau permanent `DemoWatermark.tsx` dès que `license.type === "DEMO"`. **Jamais livré à un client final.**

---

## 10. Couverture réglementaire

| Standard | Contrôles couverts | Niveau |
|---------|-------------------|--------|
| **NIS2** (EU 2022/2555) | ~90 contrôles, **+3 confirmés le 2026-07-22** (`DMSA-001`, `K-GHOSTSPN-001`, `ADFS-002` ajoutés à `$Global:CertificationMapping['NIS2']`), **+3 le 2026-08-17** (`ADCS-23`, `ADCS-24`, `K-15` — §1quater-l). ⚠️ **Aucun des 13 contrôles ajoutés le 2026-08-17→24** (`ADCS-25`/`26`, `K-16`/`17`, `C-17`, `LDAP-01`, `DC-12`..`19` — §1quinquies) **n'a été trouvé dans `$Global:CertificationMapping['NIS2']`** lors de cette mise à jour (grep direct sur `ShieldAD-CertificationMapping.ps1`, aucune occurrence) — mapping NIS2 non étendu pour ce lot, à corriger séparément | Art. 15-18 entités essentielles & importantes |
| **ISO/IEC 27001:2022 / 27002:2022** | ~65 contrôles (dont 24 ISO-DOC) | A.5 à A.8 |
| **CIS Controls v8** | ~45 contrôles mappés directement (champ compliance) + classification IG1/IG2/IG3 sur l'ensemble des contrôles (v3.8.0) — IG1/IG2/IG3 sont désormais des **Standards sélectionnables à part entière** dans le Wizard/Compliance Mapper, pas seulement une classification interne (§1bis-b) ; les 26 contrôles ajoutés le 2026-07-22 sont tous classés `CIS_IG3`, +3 de plus le 2026-08-17 (`ADCS-23`, `ADCS-24`, `K-15` — §1quater-l), **+12 de plus le 2026-08-17→24** (`ADCS-25`, `ADCS-26`, `K-16`, `K-17`, `C-17`, `LDAP-01`, `DC-12` à `DC-17` — vérifié directement dans `$script:_ig3`, `ShieldAD-Worker.ps1:1891-1913` ; `DC-18`/`DC-19` en sont volontairement absents, classés `IG1` comme `DC-03`/`DC-06`, §1quinquies-p) | IG1, IG2, IG3 |
| **ANSSI** | ~35 contrôles, **+17 confirmés le 2026-07-22** (`ADCS-14..22` (9), `TRUST-002/003/004` (3), `DMSA-001`/`ADFS-001..003`/`SEC-ADSITE-ACL-001` (5) ajoutés à `$Global:CertificationMapping['ANSSI']`) → ~52 contrôles. ⚠️ Même constat que NIS2 ci-dessus : aucun des 13 contrôles du 2026-08-17→24 n'a été trouvé dans `$Global:CertificationMapping['ANSSI']` | R1, R33, R41, R65, R72, R81 |
| **RGPD** (EU 2016/679) | ~29 contrôles (R-01..08 + RGPD-01..08 + RGPD-DOC-01..05 + mapping croisé) | Art. 5, 25, 30, 32, 33, 34, 35 |
| **DORA** (EU 2022/2554) | 12 contrôles (DORA-01..06 documentaires + DORA-T01..06 techniques) | Art. 9, 10 |
| **CyFun Small** | ~8-10 contrôles | Micro-organisations |
| **CyFun Basic** | ~45-50 contrôles | Toutes entreprises |
| **CyFun Important** | ~80-90 contrôles | PME/ETI secteurs standards |
| **CyFun Essential** | ~135+ contrôles | Grandes entreprises, OIV |

Les deltas NIS2/ANSSI ci-dessus sont comptés directement dans `ShieldAD-CertificationMapping.ps1` (tableaux `Controls = @(...)` des clés `'NIS2'`/`'ANSSI'`) — mêmes standards que les valeurs "~" préexistantes, méthode de comptage non re-vérifiée dans son intégralité pour cette mise à jour (seul le delta l'a été).

**Contrôles bloquants globaux :** FAIL sur `A-08`, `J-01`, `J-03`, `K-02`, `DORA-T02` → score réglementaire plafonné.

**Vocabulaire imposé Audit-Safe :**

| Interdit | Correct |
|---------|---------|
| compliance score NIS2 | control coverage score |
| certifié conforme | technical control status assessed |
| score de conformité | evidence quality |
| niveau de conformité | evidence completeness |
| non conforme | evidence gap / control FAIL |

---

## 11. Localisation FR/EN/NL

Toutes les chaînes visibles sont dans `ShieldAD-Lang.ps1` (1 033 lignes, 95 KB).

```powershell
Get-LangString "MA_CLE"       # Via fonction publique
$T["maCle"][$lg]              # Via table interne dans rapports
```

La langue est sélectionnée une fois au démarrage (`LangSelector.ps1`) et ne change plus pendant la session via `$Global:ShieldADLang`.

Depuis v3.7.2, la table `$script:CtrlI18n` + fonction `Get-CtrlText` (dans `ShieldAD-Worker.ps1`) localisent également la **description** et la **remédiation** de chaque contrôle (pas seulement son nom et l'UI) sur les 13 points de rendu HTML des rapports CEO/DPO/IT/REM — avec repli silencieux sur le texte FR si une traduction est absente.

---

## 12. Variables globales

Le nombre de variables `$Global:` déclarées dans `ShieldAD.ps1` est passé à **65**, contre 14 dans la précédente version de ce document. Deux variables ont disparu (`$Global:ComplianceMapping`, `$Global:ShieldADLicense` — remplacée par `$Global:CurrentLicense`). Regroupées par domaine :

| Domaine | Variables |
|---------|-----------|
| Langue / profil / conformité | `ShieldADLang`, `ClientProfile`, `ComplianceSelection`, `PrereqPassed`, `PrereqAborted` |
| Licence / base de données | `CurrentLicense`, `DBPath`, `DbConnection` |
| Cycle de vie du scan | `ScanProc`, `ScanAsync`, `ScanJob`, `ScanMode`, `ScanPS`, `ScanResults`, `ScanStartTime`, `ScannedDomain` |
| Cycle de vie AADS (cloud) | `AADSRunning`, `AADSAsync`, `AADSCodeShown`, `AADSLogCount`, `AADSLogFile`, `AADSPS`, `AADSProc`, `AADSStateFile` |
| Rapports générés (un par type) | `LatestCEO`, `LatestDPO`, `LatestFOREST`, `LatestHIST`, `LatestIT`, `LatestREM`, `LatestSCO`, `LatestTREND`, `LatestUSERS`, `LatestAADS` |
| Logging / état worker | `LogFile`, `LogLines`, `WorkerStdErrFile`, `WorkerStdOutFile`, `StateFile`, `WorkerPath` |
| UI divers | `AnimStep`, `ReportFound` |
| ShieldConnect | `ShieldConnectLoaded`, `ShieldGraphDomain` |
| Suppression sécurisée | `TempFilesToClean` |
| Chemins injectés par le LAUNCHER (payload) | `LauncherWorkerPath`, `LauncherAADSPath`, `LauncherAppDir`, `LauncherLangPath`, `LauncherLangSelectorPath`, `LauncherPrereqCheckPath`, `LauncherProfileLoaderPath`, `LauncherComplianceWizardPath`, `LauncherComplianceMapperPath`, `LauncherCertificationMappingPath`, `LauncherReportFilterPath`, `LauncherReportHelpersPath`, `LauncherDatabaseManagerPath`, `LauncherLicenseValidatorPath`, `LauncherScoringCalcPath`, `LauncherRemediationPath`, `LauncherShieldConnectPath`, `LauncherShieldConnectorsPath`, `LauncherShieldGraphDashboardPath`, `LauncherConnectConfigPath` |

---

## 13. Scalabilité garantie

**Règles obligatoires dans tout le code :**

```powershell
# TOUJOURS — LDAPFilter côté serveur AD
Get-ADUser -LDAPFilter "(userAccountControl:1.2.840.113556.1.4.803:=2)"

# JAMAIS — filtre client sur grands volumes
Get-ADUser -Filter * | Where-Object { ... }

# TOUJOURS — DirectorySearcher paginé sans limite
$s = New-Object System.DirectoryServices.DirectorySearcher
$s.PageSize = 1000
$s.FindAll()    # Pas de ResultSetSize
```

**Garantie :** 50 000+ utilisateurs AD | Scan complet < 10 minutes | 0 faux PASS par troncature

---

## 14. Disclaimer obligatoire

Tous les rapports doivent contenir en footer :

> ShieldAD™ v4.0.0 | Mandatory Shield Company © 2026 | Fondateurs : Pierre-Antoine Rouhaud & Raphael Berki. Ce rapport fournit des preuves de contrôles techniques et ne constitue pas une certification NIS2, ISO 27001 ou RGPD. La conformité réglementaire requiert une évaluation documentaire complémentaire par un auditeur qualifié et accrédité. mandatoryshield.com

**Anomalie corrigée le 2026-07-22 :** ce numéro de version affiché dans le footer/disclaimer de **tous** les rapports HTML clients vient d'une constante dédiée, `$script:_rptVer` (`ShieldAD-Worker.ps1` ~ligne 6946), séparée de `$AppVersion` — son propre commentaire dit explicitement "synchroniser avec `$AppVersion` du BUILD" mais elle était restée bloquée à **"3.4.2"**, plusieurs versions en retard, sans jamais être resynchronisée (ni par `Set-Version.ps1`, qui ne la couvre pas, ni manuellement). Tous les rapports générés depuis un certain temps affichaient donc un numéro de version périmé dans un texte contractuel (disclaimer) livré aux clients. Corrigée à `"4.0.0"` en même temps que l'unification de version — à surveiller à chaque future release, cette constante n'est couverte par aucun outil de synchronisation automatique.

**Important :** NIS2 ne définit aucun score sur 100. Le seuil 70/100 est une **convention interne MSC** — jamais présenté comme "seuil NIS2 requis".

### Disclaimer domaine PQ-Readiness (Post-Quantum Cryptography)

Le domaine PQ-Readiness évalue la préparation structurelle de l'organisation à la transition cryptographique post-quantique. Il ne signifie pas qu'un algorithme actuel (RSA, ECDSA, AES-256) est cassé aujourd'hui : aucun ordinateur quantique cryptographiquement pertinent n'est actuellement connu. Ce domaine mesure l'exposition au risque « Harvest Now, Decrypt Later » et l'anticipation réglementaire (NIS2, FIPS 140-2, NSA CNSA 2.0). Les contrôles marqués INFO nécessitent une vérification manuelle et documentaire, pas une correction technique immédiate.

Le contrôle `AADS-16` documente une dépendance vis-à-vis de l'infrastructure cryptographique gérée par Microsoft (backend Entra ID / Azure AD Domain Services) : ShieldAD ne peut ni auditer ni corriger cette brique, et ce contrôle est exclu du calcul de score (statut INFO) pour ne jamais pénaliser un client sur un élément hors de son contrôle.

---

## 15. ShieldGraph — Cartographie des chemins d'attaque (intégré à l'app Tauri v4)

**⚠️ Section entièrement réécrite le 2026-08-04 (§1ter-b).** Les versions précédentes de ce document (§15.1-15.5 jusqu'au 2026-07-22) décrivaient un **prototype Tauri v2 autonome** (`ShieldGraph/src-tauri/`, `ShieldGraph/src/`, binaire `shieldgraph.exe` séparé, sa propre fenêtre lancée depuis `ShieldAD.ps1`). **Ce prototype a été supprimé du dépôt par le commit `fcafd1f`.** ShieldGraph est désormais **exclusivement un onglet intégré** de l'app Tauri v4 principale (`src/shieldgraph/`, chargé via `TabShieldGraph.tsx` → `<ShieldGraphApp/>`, déjà livré depuis la v4.0 selon `CLAUDE.md`) — il n'existe plus de fenêtre/processus séparé à lancer. ShieldGraph reste un outil de **visualisation** des chemins d'attaque (mouvement latéral, escalade vers Domain Admins), pas un scanner de conformité : il n'ajoute aucun contrôle au comptage §1/§5 (**310 on-prem / 153 cloud** au 2026-08-24, voir §1quinquies) — en revanche son propre fichier de règles ATT&CK (`ShieldGraph_ATTCK_Rules.json`, §15.4) est passé de 36 à **55 règles** au cours du même audit de complétude CVE (§1quinquies-i à q).

### 15.1 Principe — le pont JSON (inchangé)

```
POWERSHELL (moteur, inchangé)      FICHIER JSON (pont local)         TAURI + REACT (onglet intégré)
──────────────────────────         ──────────────────────────        ──────────────────────────
ShieldAD-ShieldGraph.ps1      →→   %TEMP%\ShieldGraph_Data_*.json →→ shieldgraph.rs → src/shieldgraph/
  Scan AD lecture seule              (UTF-8 sans BOM)                   D3.js force-directed graph
  ACL/ADCS/ATT&CK, scoring                                              Simulation, pathfinding,
  Export-ShieldGraphJSON                                                historique, i18n FR/EN/NL
```

Le principe du pont JSON local (zéro port réseau ouvert, zéro credential transmis à Tauri — l'authentification AD reste entièrement côté PowerShell/Kerberos) n'a pas changé. Ce qui change : le moteur PowerShell (`ShieldGraph/*.ps1`, §15.2) est désormais **embarqué à la compilation** comme les autres Workers (`scripts/stage-workers.mjs` globbe `ShieldAD-ShieldGraph*.ps1` depuis `ShieldGraph/`, `src-tauri/src/embedded_workers.rs` les compile via `include_str!`), et c'est le binaire principal `ShieldAD.exe`/l'app Tauri v4 qui les invoque via `shieldgraph.rs` — plus de second exécutable `shieldgraph.exe`, plus de bouton `Show-ShieldGraphTauriWindow` dans `ShieldAD.ps1` (remplacé par un simple message renvoyant vers l'onglet intégré, §1ter-b).

### 15.2 Moteur PowerShell (`ShieldGraph/*.ps1`, dossier source) — lecture seule AD

Ces **7 fichiers** vivent toujours physiquement dans `ShieldGraph/` (qui n'est plus qu'un dossier source pour `stage-workers.mjs`, §2). Lignes vérifiées au 2026-08-26 — inclut le module `ShieldAD-ShieldGraph-LocalAdmin.ps1` (absent de la dernière vérification de cette table) et la session Confidence/Evidence/ShieldPredict du même jour (§15.6) :

| Fichier | Lignes | Rôle |
|---------|--------|------|
| `ShieldAD-ShieldGraph.ps1` | 1 355 | Core engine : classes `ShieldGraphNode`/`ShieldGraphEdge`/`ShieldGraphPath` (+ `Confidence`/`ConfidenceSource`/`Evidence*` sur les arêtes, `PathState` sur les chemins, `IsDeadEnd` sur les nœuds, `ChokePointRiskReductionPercent` — §15.6), `Invoke-ShieldGraph`, `Find-AttackPaths` (BFS vers les cibles critiques, `$script:SGCriticalTargets`), `Get-PathState`, `Find-DeadEnds`, `Calculate-ChokePoints`, `Export-ShieldGraphJSON` (écrit le JSON sans BOM consommé par l'UI) |
| `ShieldAD-ShieldGraph-ACL.ps1` | 373 | Collecte les ACL (`nTSecurityDescriptor`) des objets déjà découverts et en déduit des arêtes d'abus de permissions à la BloodHound : `GenericAll`, `GenericWrite`, `WriteOwner`, `WriteDacl`, `ForceChangePassword`, `AddMember`, `AddKeyCredentialLink` (Shadow Credentials), `ReadLAPSPassword`, `AllowedToAct` (RBCD). Capture aussi `EvidenceDN`/`EvidenceAttribute`/`EvidenceRaw` par arête depuis le 2026-08-26 (§15.6). Se dégrade silencieusement si le module `ActiveDirectory` est absent. Désactivable via `-SkipACLScan` |
| `ShieldAD-ShieldGraph-ADCS.ps1` | 221 | Détecte ESC1 ("Certified Pre-Owned") sur les templates de certificats ADCS — 100% lecture LDAP, aucun contact avec le serveur CA. Arêtes marquées `Confidence=0.9`/`ADCS` depuis le 2026-08-26 (accessibilité de la CA non re-vérifiée à distance) |
| `ShieldAD-ShieldGraph-ATTCK.ps1` | 190 | Charge `ShieldGraph_ATTCK_Rules.json` et applique les règles aux nœuds/arêtes pour enrichir l'`ExploitScore` et calculer l'impact de chaque mitigation ("1 fix = N chemins fermés") |
| `ShieldAD-ShieldGraph-LocalAdmin.ps1` | 352 | Collecte les droits d'administration locale → arêtes `AdminTo` : `Invoke-GPOLocalAdminDiscovery` (GPO Restricted Groups/Preferences, LDAP + SYSVOL, toujours actif) et `Invoke-LiveLocalAdminDiscovery` (requête WinNT live par poste, opt-in via `-IncludeLiveLocalAdmin`) |
| `ShieldAD-ShieldGraph-Sim.ps1` | 333 | Répond à "si je supprime/désactive/modifie X, qu'est-ce qui casse ?" — `Test-GroupRemovalImpact` / `Test-AccountDisableImpact` / `Test-ACLRevocationImpact`, lecture seule. Renvoient aussi `RiskReductionPercent`/`CriticalPathsClosed` depuis le 2026-08-26 (§15.6) |
| `ShieldAD-ShieldGraph-Run.ps1` | 124 | Point d'entrée headless (sans WPF) invoqué par le backend Rust : mode scan complet (imprime `SHIELDGRAPH_JSON_PATH=...`) ou mode simulation (recharge le dernier JSON exporté au lieu de rescanner tout l'AD, imprime `SHIELDGRAPH_SIM_RESULT=<json>`) |

### 15.3 Backend Rust (`src-tauri/src/shieldgraph.rs`) — intégré à l'app principale

**4 commandes Tauri** (confirmé dans le code au 2026-08-04 — pas 5 : la commande `get_launch_data_path` du prototype, qui lisait un argument CLI `--data-file` passé par `ShieldAD.ps1` au lancement d'un second exécutable, n'a plus de raison d'être dans un onglet intégré) :

| Commande | Rôle |
|---|---|
| `read_shieldgraph_data` | Lit un JSON donné, retire un BOM UTF-8 résiduel en défense en profondeur |
| `list_shieldgraph_files` | Liste les `ShieldGraph_Data_*.json` disponibles (historique/comparaison) |
| `run_shieldgraph_scan` | Lance `ShieldAD-ShieldGraph-Run.ps1` (scan complet). **Corrigé le 2026-08-04 (+50 lignes, §1ter-g)** : émet désormais un événement `shieldgraph-scan-progress` ligne par ligne pendant l'exécution, au lieu de bufferiser silencieusement jusqu'à la fin du process — corrige une UI qui restait figée sans signe de vie sur un scan ACL/ADCS de plusieurs minutes |
| `run_shieldgraph_simulation` | Lance une simulation d'impact (groupe ou compte) |

### 15.4 Frontend React + D3 (`src/shieldgraph/`) — ~8 200 lignes TypeScript/TSX, ported depuis le prototype

Historique : les composants du prototype avaient été **repris quasiment tels quels** lors du portage du 2026-08-04 (mêmes noms, lignes très proches). Le tableau ci-dessous est remis à jour au 2026-08-26 (lignes vérifiées directement, `wc -l`) ; les deltas "vs prototype" de 2026-08-04 ne sont plus reproduits (trop d'évolutions depuis pour rester lisibles — les fichiers marqués **(§15.6)** ont grossi lors de la session Confidence/Evidence/ShieldPredict de ce jour) :

| Composant/module | Lignes | Rôle |
|---|---|---|
| `ShieldGraphApp.tsx` | 631 | Routing principal, état global, appels `invoke()`. +1 ligne le 2026-08-26 (passe `edges` à `NodeDetail`, §15.6) |
| `components/AttackGraph.tsx` | 555 | Graphe force-directed D3.js — visualisation principale. Arêtes pointillées si `confidence < 1.0`, nœuds `isDeadEnd` grisés depuis le 2026-08-26 (§15.6) |
| `components/NodeDetail.tsx` | 353 | Panneau détail d'un nœud cliqué. +65 lignes le 2026-08-26 : section "Evidence" par arête (nouvelle prop `edges`), bannière dead end (§15.6) |
| `components/ScanHistoryModal.tsx` | 343 | Historique de scans + diff entre deux scans |
| `components/SimulationModal.tsx` | 396 | Simulation d'impact. +7 lignes le 2026-08-26 : stats `riskReductionPercent`/`criticalPathsClosed` (§15.6) |
| `components/ATTCKPanel.tsx` | 240 | Fiche technique MITRE ATT&CK par chemin |
| `components/AttackSimulatorModal.tsx` | 208 | Simulation pas-à-pas d'une compromission depuis un nœud |
| `components/TrendChart.tsx` | 172 | Courbe d'évolution chemins totaux vs critiques |
| `components/PathfinderModal.tsx` | 174 | Recherche libre d'un chemin entre deux nœuds (BFS côté client) |
| `components/RiskTable.tsx` | 181 | Tableau de risques pur (chemin/description/probabilité/impact/gravité/CVE/remédiation) — extrait de `RiskTableModal.tsx` pour être réutilisable sans modale, sert aussi de corps au rapport succinct `TabShieldGraphReport.tsx` (Dashboard principal) |
| `components/RiskTableModal.tsx` | 67 | Modale enveloppant `RiskTable.tsx` |
| `components/Sidebar.tsx` | 167 | Liste des chemins d'attaque + choke points. +14 lignes le 2026-08-26 : badge `PathState` (§15.6) |
| `components/TopPathsModal.tsx` | 148 | Classement des chemins les plus critiques. +29 lignes le 2026-08-26 : filtre `CONFIRMED` par défaut avec bascule (§15.6) |
| `components/Toolbar.tsx` | 161 | Recherche/filtre + accès chemin libre/historique/top chemins |
| `components/Header.tsx` | 109 | Bandeau KPIs + domaine + sélecteur de langue |
| `components/BlastRadius.tsx` | 99 | Vue "blast radius" d'un choke point. +7 lignes le 2026-08-26 : stat `riskReductionPercent` (§15.6) |
| `i18n/translations.ts` + `i18n/useShieldGraphLang.ts` | 769 + 45 | Support FR/EN/NL sans dépendance externe. `translations.ts` +40 lignes le 2026-08-26 (nouvelles clés PathState/Evidence/dead end/réduction de risque, §15.6) |
| `types/shieldgraph.ts` | 266 | Interfaces TypeScript partagées. +18 lignes le 2026-08-26 (`confidence`/`evidence*`/`pathState`/`isDeadEnd`/`riskReductionPercent`, §15.6) |
| `data/simulation.ts` | 207 | Pont IPC simulation d'impact (mapping PascalCase PowerShell → camelCase). +12 lignes le 2026-08-26 (`riskReductionPercent`/`criticalPathsClosed`, §15.6) |
| `data/attck-simulator.ts`, `pathfinding.ts`, `scan-history.ts`, `attck-rules.ts` | 155+84+48+136 | Logique client (simulateur pas-à-pas côté client, pathfinding BFS, chargement historique) ; `attck-rules.ts` charge `ShieldGraph/ShieldGraph_ATTCK_Rules.json` directement (source unique, §15.4 note de fusion ci-dessous) |
| `data/rule-narrative.ts` | 1 801 | Dictionnaire de traduction EN/NL des textes des règles ATT&CK (`why`/`businessImpact`/`condition`/`eventIds`/`tools`/`remediationTitles`), tenu à jour au fil des sessions CVE (§1quinquies) |
| `data/cve-mapping.ts` | 521 | Mapping statique règle ATT&CK ↔ CVE réelle (id + explication), alimenté par les sessions d'audit CVE (§1quinquies) |
| `data/edge-reason.ts` | 135 | Traduction EN/NL du texte `reason` (`Description` PowerShell) déjà envoyé en FR par le moteur, par type d'arête |
| `data/risk-probability.ts` | 18 | Classe le champ `difficulty` (0-100) d'une `ATTCKRule` en 3 paliers `high`/`medium`/`low` pour l'affichage — un indicateur de facilité d'exploitation de la règle, distinct de `Confidence`/`PathState` (§15.6, qui portent sur la certitude de la preuve AD, pas la difficulté théorique de la technique) |

✅ **Point résolu le 2026-08-14 (`1e7a91e`, §1quater-c) :** le fichier `ShieldGraph_ATTCK_Rules.json` existait en double — `ShieldGraph/ShieldGraph_ATTCK_Rules.json` (source moteur PowerShell) et `src/shieldgraph/data/ShieldGraph_ATTCK_Rules.json` (frontend intégré), divergents sur 6/33 conditions de matching et sur `RemediationOptions`. Les deux fichiers ont été fusionnés en un seul fichier canonique (`ShieldGraph/ShieldGraph_ATTCK_Rules.json`, `Condition` du backend + `RemediationOptions` du frontend) ; `attck-rules.ts` l'importe désormais directement — il n'y a plus de copie locale à resynchroniser à la main.

### 15.5 État du chantier — historique du prototype, dette de test soldée le 2026-08-14

Les mises en garde détaillées des versions précédentes de ce document (fichiers du prototype "reconstruits après perte accidentelle", points non testés contre un vrai AD listés par `ShieldGraph/STATUS.md`, icônes placeholder, rien de commité) **portaient sur le code du prototype `ShieldGraph/src-tauri`+`ShieldGraph/src`, aujourd'hui supprimé** — elles ne s'appliquent plus telles quelles. `ShieldGraph/STATUS.md` reste présent dans le dossier source (moteur PowerShell), nettoyé le 2026-08-14 (`291f635`) pour ne plus décrire ce contexte disparu comme actuel.

✅ **Point résolu le 2026-08-14 (§1quater-c) :** cette mise à jour du 2026-08-04 n'avait pas ré-audité l'onglet intégré `src/shieldgraph/` avec la même rigueur (pas de nouvelle session de test contre un AD réel). C'est désormais fait : première validation réelle de la chaîne Worker → ShieldGraph → collecte ACL sur une VM `test.com` (58 nœuds / 55 objets), qui a révélé et corrigé 4 bugs ACL (`5bf222c`) puis une sur-classification massive de 3 règles ATT&CK ramenant les chemins d'attaque affichés de 57 à 6 (`f1b4a6f`), suivie de tests de pathfinding libre et d'historique/diff validés dans l'app compilée (`36be425`) — voir le détail complet au §1quater-c. Seul point encore documenté comme non corrigé : un risque de performance architectural dans `Find-AttackPaths` (BFS répété au lieu d'un seul BFS multi-source, `92eac58`, §1quater-m), non mesuré faute de lab à grande échelle.

### 15.6 Confidence/Evidence, dead ends, choke points pondérés, ShieldPredict enrichi (2026-08-26)

Point de départ : un document de plan externe (`ShieldGraph-Architecture-v2.md`, rédigé hors session
Claude Code, décrivant l'architecture obsolète du prototype autonome retiré le 2026-08-04 — §15.1 —
et proposant comme "à faire" l'unification `ShieldGraph_ATTCK_Rules.json` déjà résolue le 2026-08-14
ci-dessus) a été vérifié contre le code réel avant toute implémentation, puis adapté à
l'architecture effective plutôt qu'exécuté tel quel.

**Chaîne de confiance/preuve par arête.** `ShieldGraphEdge` (`ShieldAD-ShieldGraph.ps1`, §15.2) porte
désormais `Confidence` (0.0-1.0), `ConfidenceSource` (`LDAP`/`ACL`/`ADCS`/`GPO`/`LocalAdmin`),
`EvidenceDN`, `EvidenceAttribute`, `EvidenceRaw`. Rempli à la source : `1.0`/`LDAP` pour les arêtes
natives du moteur (appartenance de groupe, `HasDCSync`, etc.), `1.0`/`ACL` avec la preuve exacte
(DN de l'objet, attribut LDAP observé, ACE/SID brute) pour les arêtes d'abus de permissions
(`ShieldAD-ShieldGraph-ACL.ps1`), `0.9`/`ADCS` pour ESC1 (accessibilité réelle de la CA non
re-vérifiée à distance — seul cas de confiance dégradée aujourd'hui), `1.0`/`GPO` ou `LocalAdmin`
pour l'administration locale (`ShieldAD-ShieldGraph-LocalAdmin.ps1`).

**Classification des chemins.** Nouvelle fonction `Get-PathState` : chaque `ShieldGraphPath` est
classé `CONFIRMED` / `CONDITIONAL` / `THEORETICAL` selon la confiance minimale des arêtes
traversées (lookup arête construit une seule fois par scan, `Build-SGEdgeLookup`, pas recalculé par
chemin). Un chemin synthétique à 1 saut (compte individuellement dangereux sans arête vers une
cible, cf. §15 sur `Invoke-ATTACKMapping`) est toujours `CONFIRMED` — rien à dégrader.

**Dead ends.** Nouvelle fonction `Find-DeadEnds` : marque `IsDeadEnd` sur `ShieldGraphNode` pour
tout nœud avec des arêtes sortantes mais n'apparaissant dans aucun chemin d'attaque réel — utile
pour distinguer un finding qui, dans le graphe, ne mène nulle part aujourd'hui.

**Choke points pondérés par risque réel.** `Calculate-ChokePoints` conservait un comptage brut de
passages (`ChokePointCount`/`IsChokePoint`, toujours présents, inchangés). Nouveau champ
`ChokePointRiskReductionPercent` : pour chaque nœud candidat, `(risque total − risque des chemins
qui ne passent pas par ce nœud) / risque total`, où le risque d'un chemin est son `TotalScore` déjà
calculé. Un garde-fou `-MaxPaths` (défaut 3000, chemins de plus haut score conservés) borne le coût
O(candidats × chemins) sur un grand domaine, sans toucher au BFS de `Find-AttackPaths` lui-même (le
risque de performance de ce dernier, §15.5, reste documenté et non retouché — hors périmètre de
cette session). **Correction d'ordre nécessaire dans `Invoke-ShieldGraph`** : `Calculate-ChokePoints`
tournait historiquement avant que `Get-ScoreForPath` ne remplisse `TotalScore` sur les chemins — sans
incidence pour le comptage brut, mais bloquant pour la pondération par risque ; réordonné (scoring
des chemins d'abord, puis choke points, puis dead ends).

**ShieldPredict — vrai pourcentage de réduction de risque.** `Test-GroupRemovalImpact`,
`Test-AccountDisableImpact`, `Test-ACLRevocationImpact` (`ShieldAD-ShieldGraph-Sim.ps1`, §15.2)
renvoient désormais `RiskReductionPercent` et `CriticalPathsClosed`, via une fonction partagée
`Get-RiskReductionStats` appliquée sur les chemins déjà filtrés par `Get-AffectedAttackPaths` —
aucune ré-exécution de `Find-AttackPaths` nécessaire, donc aucun risque de perf ajouté.

> ⚠️ **Correctif apporté le 2026-09-03 (§1sexies-c) :** le titre de ce paragraphe reprend la
> formulation du message de commit (`47b4bb7`) telle quelle, mais elle prête à confusion.
> Vérification faite : `RiskReductionPercent`/`CriticalPathsClosed` atteignent bien
> `SimulationModal.tsx`/`BlastRadius.tsx` **dans l'onglet ShieldGraph**, mais **pas**
> `src/lib/shieldPredictAggregate.ts` ni `TabShieldPredict.tsx` — l'onglet **ShieldPredict**
> (§1sexies-a) continue d'agréger uniquement via un compte de chemins fermés dédupliqués,
> sans utiliser ce pourcentage. L'enrichissement a atterri dans ShieldGraph, pas dans l'onglet
> ShieldPredict lui-même.

**Frontend.** Tous les nouveaux champs sont **optionnels côté TypeScript** (`types/shieldgraph.ts`)
pour rester rétrocompatibles avec un JSON de scan plus ancien ou le mode démo (`-SimulationMode`,
sans arête donc sans confiance à évaluer — `PathState` y reste non renseigné). Badge `PathState`
(`Sidebar.tsx`), filtre `CONFIRMED` par défaut avec bascule (`TopPathsModal.tsx`), section
"Evidence" par arête entrante/sortante + bannière dead end (`NodeDetail.tsx`, nouvelle prop
`edges`), stat de réduction de risque (`BlastRadius.tsx`, `SimulationModal.tsx`), arêtes pointillées
si `confidence < 1.0` et nœuds `isDeadEnd` grisés (`AttackGraph.tsx`) — voir le détail ligne par
ligne au §15.4.

**Vérifié** : parse PowerShell (`[System.Management.Automation.Language.Parser]::ParseFile`) des 5
fichiers `.ps1` modifiés, `tsc --noEmit` et `npm run build` propres. **Non vérifié** : aucun scan
contre un AD réel dans cette session — les chiffres produits ne sont validés que sur la logique, pas
sur des données réelles (à traiter dans la continuité de la dette de test du §15.5). **Volontairement
hors périmètre** : refonte perf du BFS `Find-AttackPaths` (§15.5, `92eac58`), champs
`Prerequisites`/`IsDynamic` du plan externe (aucune arête ne dépend d'une session non collectée —
zéro collecte de session reste un choix produit assumé), un `PathScore` séparé (réutilise
`TotalScore` existant), tests Pester (aucun harnais Pester dans le dépôt).

---

## 16. Module IAM — Access Governance (nouveau, 2026-08-04)

**Statut : committé le 2026-08-12 (checkpoint `01a9060`), greenfield v4 — voir §1ter-d et §1quater.** Nouvel onglet « Inventaire IAM » de gouvernance des accès, sans équivalent en v3.x. Document de conception source : `ADSECU~1.MD` (697 lignes, « ADSecure — Onglet IAM : Access Governance Dashboard », daté 2026-08-03, à renommer/classer — §1ter-i).

### 16.1 Principe — deux sources fusionnées dans un même canal

ShieldAD ne fait ni écriture ni modification AD (lecture seule stricte, comme le reste du produit — commentaire explicite `ShieldAD-IAM.ps1:31-32`). Deux sources d'utilisateurs alimentent la même table, distinguées par un champ `source` :

| Source | Origine | Déclenchement | `mfaEnabled` |
|---|---|---|---|
| `AD` | `ShieldAD-IAM.ps1` (worker embarqué indépendant, on-prem via LDAP/`DirectorySearcher`) | Carte dédiée « Inventaire IAM » dans l'onglet Scan | Toujours `null` (pas de session Graph côté AD) |
| `ENTRA` | `Invoke-IamEntraInventory` (nouvelle fonction, `ShieldAD-AADS.ps1:1090-1305`) | Automatique pendant le scan Azure existant (réutilise la session Graph déjà authentifiée — pas d'authentification dédiée) | Booléen réel via `Get-MgReportAuthenticationMethodUserRegistrationDetail -All` (un seul appel Graph en masse, pas de N+1 par utilisateur) |

Le coût/les applications SaaS ne sont jamais renseignés (nécessiterait ShieldConnect) — le frontend affiche un badge « ShieldConnect requis » à la place (`ShieldAD-IAM.ps1:28-30`, `src/types/iam.ts:13-15`).

### 16.2 Scoring de risque (0-100, déterministe)

Même formule des deux côtés (`Get-IamRisk` côté AD, `Get-IamEntraRisk` côté Entra, avec pénalité MFA absente en plus côté Entra) :

| Facteur | Pénalité |
|---|---|
| Compte stale (dernière connexion > 90j) | +30 |
| Compte stale (30-89j) | +10 |
| Jamais connecté | +15 |
| Mot de passe > 180j | +20 |
| Mot de passe 90-179j | +10 |
| Âge du mot de passe inconnu | +10 |
| Compte à privilèges (`AdminCount=1` AD / rôle Entra privilégié) | +15 |
| Compte désactivé | -10 |

Buckets de risque : **OK** (< 30), **WARN** (30-59), **CRIT** (≥ 60).

### 16.3 Fichiers

| Fichier | Lignes | Rôle |
|---|---|---|
| `ShieldAD-IAM.ps1` | 333 | Worker embarqué (`include_str!`, comme Worker/AADS/Connect), JSONL pur sur stdout — pas de mode HTML/StateFile v3.x |
| `src-tauri/src/iam.rs` | 114 | Commandes `start_iam_scan` (async, stream JSONL vers l'événement `iam-event`) / `stop_iam_scan`, état isolé `IamScanState` |
| `src/tabs/TabIAM.tsx` | 298 | Table principale de l'onglet |
| `src/components/IamUserDetailModal.tsx` | 219 | Fiche détail d'un utilisateur |
| `src/store/iamStore.ts` | 74 | Fusion additive par `id` — `resetAd()` ne vide que `source==="AD"`, jamais de reset croisé AD/Entra (miroir de `resetAzure()` dans `scanStore.ts`) |
| `src/types/iam.ts` | 77 | Interfaces TypeScript (`riskScore`, `riskBucket`, `staleAccessDays`, `mfaEnabled`, etc. — correspondent au modèle de données d'`ADSECU~1.MD`) |

Côté routage des événements : dans `start_azure_scan` (`scan.rs`), tout événement JSONL dont le `type` est préfixé `iam_` est désormais routé vers le canal `iam-event` plutôt que `scan-event` — c'est ce qui permet aux `iam_user` émis par `Invoke-IamEntraInventory` (source Entra) d'atterrir dans le même store que ceux émis par `ShieldAD-IAM.ps1` (source AD).

---

## 17. Module LDAP / OpenLDAP / FreeIPA (nouveau, 2026-08-26)

**Statut : committé le 2026-08-26 (`a5dd845`), greenfield v4.1 — voir §1sexies-b.** Nouvel onglet de scan pour des annuaires LDAP génériques (OpenLDAP, FreeIPA, tout LDAPv3), distinct d'Active Directory — troisième famille de scan aux côtés d'on-prem/Azure, pas une extension du Worker AD existant. Document de conception source : `SHIELDAD_LDAP_HYBRID_TAURI_v4.md` (724 lignes, déplacé vers `.claude/` le même jour) — la réalisation en diverge sur plusieurs points (staging du worker, gestion des identifiants, canal d'événements).

### 17.1 Principe — protocole et authentification

Utilise `System.DirectoryServices.Protocols` (S.DS.P, `LdapConnection`/`LdapDirectoryIdentifier`) plutôt que le fournisseur ADSI classique (`System.DirectoryServices`) déjà utilisé par le Worker AD — un choix cohérent avec la cible (annuaires non-AD, pas toujours interrogeables via ADSI). Authentification simple bind (`AuthType.Basic`) ou anonyme (`AuthType.Anonymous`) ; chiffrement en transit via StartTLS ou LDAPS direct (port 636). Les identifiants (serveur/port/TLS/base DN/utilisateur/mot de passe) sont sérialisés dans un fichier JSON temporaire (`write_credentials_temp`, `scan_ldap.rs`) et transmis via `-CredentialsJsonPath` — jamais en argument de ligne de commande, jamais persistés, supprimés après le scan (même schéma que le scan Azure).

### 17.2 Contrôles (59, non comptés par l'outil AST)

| Catégorie | Contrôles |
|---|---|
| Comptes | 11 |
| Groupes | 7 |
| TLS / Chiffrement | 7 |
| Sécurité avancée | 9 |
| Journaux | 5 |
| Infrastructure | 7 |
| Kerberos (FreeIPA) | 4 |
| FGPP | 5 |
| Synchronisation AD/LDAP | 2 |
| Méta | 2 |
| **Total** | **59** |

Décompte vérifié directement (grep de tous les `-Id "X"`/`Id="X"` littéraux) plutôt que recopié depuis les commentaires d'en-tête du fichier, qui sont **obsolètes et sous-évaluent** certaines catégories (ex. le commentaire dit « TLS (5) » pour une catégorie qui en compte réellement 7). ⚠️ **`scripts/Count-ShieldADControls.ps1` référence en dur uniquement `ShieldAD-Worker.ps1`/`ShieldAD-AADS.ps1`/`ShieldAD-AWS-IAM.ps1`** — `ShieldAD-LDAP.ps1` n'y a jamais été ajouté : ces 59 contrôles sont absents de `docs/CONTROL-COUNTS.generated.md` et du total général §1, à corriger si ce module devient commercialisé.

### 17.3 Fichiers

| Fichier | Lignes | Rôle |
|---|---|---|
| `ShieldAD-LDAP.ps1` | 1 503 | Worker embarqué (`include_str!`), JSONL pur — 10 catégories, chaque fonction try/catch-isolée (une catégorie en échec n'interrompt pas les autres) |
| `src-tauri/src/scan_ldap.rs` | 190 | Commandes `start_ldap_scan`/`stop_ldap_scan`, état `LdapScanState`, sérialisation des identifiants en JSON temporaire |
| `src/tabs/TabLdap.tsx` | 71 | Onglet principal, filtre `controls` sur `domain.startsWith("LDAP/")` |

Licence : module `"SHIELDLDAP"` → `allow_ldap` (`license.rs`), exposé `allowLdap` côté TypeScript — **absent de `ShieldAD.lic` livré en dépôt à ce jour** (même constat que le module AWS, §18).

---

## 18. Module AWS IAM — multicloud, usage interne (nouveau, 2026-08-31)

**Statut : committé le 2026-08-31 (`30af098`), greenfield v4, usage interne — voir §1sexies-h.** Nouvel onglet de scan IAM AWS (utilisateurs, rôles, policies, clés d'accès, MFA, politique de mots de passe, journalisation). **Décision produit : ce module n'est pas proposé aux clients** (voir §1sexies-h pour le raisonnement complet) — construit et testé de bout en bout, mais volontairement tenu à l'écart de l'offre commerciale tant qu'aucun signal de demande client ne s'est manifesté. Document de plan source : `IMPLEMENT_MULTICLOUD_SHIELDAD.md` (859 lignes) — signale l'identité GCP comme feuille de route uniquement, non implémentée.

### 18.1 Principe — authentification et collecte

Utilise les modules PowerShell officiels **AWS.Tools** (cmdlets typées objet), pas la CLI `aws` — même logique que Microsoft.Graph pour AADS : éviter le parsing fragile de JSON shell. Dix sous-modules auto-installés si absents : `AWS.Tools.Installer`, `.Common`, `.IdentityManagement`, `.SecurityToken`, `.CloudTrail`, `.Organizations`, `.ConfigService`, `.GuardDuty`, `.AccessAnalyzer`, `.SecurityHub`. `-CredentialProfile` (défaut `"default"`) référence un profil déjà configuré dans `~/.aws/credentials` local — jamais de clé/secret brut saisi dans l'app. Lecture seule stricte (`Get-*`, plus `Request-IAMCredentialReport` qui ne fait que déclencher la génération d'un rapport côté serveur). Chaque famille de données est collectée une seule fois puis évaluée par plusieurs contrôles (pas d'appel API redondant par contrôle), chaque collecte isolée en try/catch avec repli `INFO` (jamais un FAIL fabriqué) en cas d'échec. L'en-tête du fichier signale explicitement un caveat « [VERIF] » sur les cmdlets Access Analyzer/Security Hub, écrites sans compte AWS réel disponible pour les tester.

### 18.2 Contrôles (89)

| Famille (`-Section`) | Contrôles |
|---|---|
| ROOT | 7 |
| USERS | 11 |
| GROUPS | 4 |
| ROLES | 10 |
| POLICY | 12 |
| KEYS | 6 |
| MFA | 4 |
| PWDPOL | 11 |
| IDP | 5 |
| LOG | 8 |
| ORG | 6 |
| POSTURE | 6 |
| DOC | 5 |
| **Total** | **89** |

95 appels `New-AwsCtrl`, dont 6 paires mutuellement exclusives (branches if/else valeur réelle vs repli `INFO`/N.A. selon disponibilité des données) — donc 89 IDs uniques par scan, cohérent avec `docs/CONTROL-COUNTS.generated.md`.

### 18.3 Fichiers

| Fichier | Lignes | Rôle |
|---|---|---|
| `ShieldAD-AWS-IAM.ps1` | 1 553 | Worker embarqué (`include_str!`), JSONL pur, trilingue FR/EN/NL comme les autres Workers |
| `src-tauri/src/scan_aws.rs` | 117 | Commandes `start_aws_scan`/`stop_aws_scan`, `AwsScanState`, mêmes patterns que `scan_ldap.rs` |
| `src/tabs/TabAws.tsx` | 81 | Onglet principal |

Pas de store dédié : fusionné dans `src/store/scanStore.ts` (`awsStatus`/`awsControlsCount`/`awsSummary`), même pattern que `azureStatus`/`ldapStatus`. Licence : module `"SHIELDAWS"` → `allow_aws`, exposé `allowAws` côté TypeScript — `internal_license()`/`demo_license()` l'activent toujours (`npm run tauri dev`/`npm run build:demo`), mais **aucune licence client livrée à ce jour ne contient `SHIELDAWS`** (le `ShieldAD.lic` présent en dépôt n'a que `SHIELDCONNECT`/`SHIELDGRAPH`/`SHIELDPREDICT`/`SHIELDBRAND` dans `Modules`).

---

*Document confidentiel — The Mandatory Shield Company SRL — Bruxelles — mandatoryshield.com*  
*Pierre-Antoine Rouhaud (CEO) & Raphaël Berki (CTO) — © 2026*  
*567 contrôles calculés automatiquement par auto-analyse AST au 2026-09-03 (310 on-prem + 168 cloud + 89 AWS — `Get-ShieldADRealControlCount`/`Get-ShieldADRealCloudControlCount`/équivalent AWS, régénérés à chaque commit via `.githooks/pre-commit` → `docs/CONTROL-COUNTS.generated.md`, dernière régénération 2026-09-03 11:05:55), **+59 contrôles LDAP/OpenLDAP/FreeIPA non couverts par cet outil** (§17, total réel 626, non vérifié par tooling) — méthode qui remplace le décompte manuel `Invoke-ADQuery`/`New-AADSCtrl` retenu jusqu'au 2026-07-22 (222 on-prem + 153 cloud = 375, sous-comptait les familles documentaires générées en boucle) ; §15 (ShieldGraph) réécrite le 2026-08-04 suite au retrait du prototype Tauri autonome et à son remplacement par l'onglet intégré `src/shieldgraph/`, déjà livré depuis la v4.0, puis dette de test soldée contre un vrai domaine AD le 2026-08-14 (§1quater-c), puis audit de complétude CVE en 6 phases/11 commits le 2026-08-24 portant `ShieldGraph_ATTCK_Rules.json` de 36 à 55 règles et le Worker de 296 à 310 contrôles on-prem (§1quinquies), puis chaîne de confiance/preuve par arête, classification des chemins, dead ends, choke points pondérés par risque réel et collecte AdminTo le 2026-08-26 (§15.6, §1sexies-c — le gain de risque pondéré atteint ShieldGraph mais pas l'onglet ShieldPredict, correctif noté au §15.6) ; §16 (module IAM) ajoutée le 2026-08-04, committée le 2026-08-12 (checkpoint `01a9060`) ; **§17 (module LDAP/OpenLDAP/FreeIPA) et §18 (module AWS IAM, usage interne non commercialisé) ajoutées le 2026-09-03**, modules respectivement committés le 2026-08-26 (`a5dd845`) et le 2026-08-31 (`30af098`) ; remédiation guidée + ShieldPredict v1 (sandbox multi-nœuds, licence `SHIELDPREDICT`) livrés le 2026-08-25 ; 24 tickets UI/UX livrés le 2026-08-27 (palette de commandes, Trust Page, navigation clavier, etc., §1sexies-e) ; +15 contrôles cloud ajoutés incidemment le 2026-09-02 (153→168, §1sexies-j) ; version unifiée à 4.0.0 le 2026-07-22 sur l'ensemble du moteur partagé et du shell v3.x (voir encart de versioning en tête de document) ; ancien schéma de licence par clé/checksum HMAC retiré le 2026-08-04, fichier `.lic` RSA-4096 désormais vérifié par deux mécanismes indépendants — launcher v3.x et `license.rs` v4 natif avec gating par module, ajouté le 2026-08-17 (§1quater-a) — et complété d'un module de mise à jour applicatif signé Authenticode (§1quater-b), la distribution du `.lic` passant à l'import self-service le 2026-08-24 (retrait du build par client, §1quinquies-g)*

*Dernière vérification du code : 2026-09-03 (couvre les 50 commits jusqu'à `a136198`, HEAD de `chore/logo-and-cleanup`, plus un lot de changements non commités au moment de cette relecture — azure_progress, resetOnPrem, fix Entra IAM signInActivity, voir §1sexies-o) — §1sexies ci-dessus*

