# ShieldAD™ v3.4 — Description Complète & Infrastructure
## Mandatory Shield Company © 2026
**Fondateurs : Pierre-Antoine Rouhaud (CEO) & Raphaël Berki (CTO)**  
**mandatoryshield.com — Document confidentiel interne R&D**  
**Dernière vérification du code : 2026-06-11**

---

## TABLE DES MATIÈRES

1. [Présentation générale](#1-présentation-générale)
2. [Inventaire des fichiers](#2-inventaire-des-fichiers)
3. [Architecture & flux d'exécution](#3-architecture--flux-dexécution)
4. [Interface WPF — ShieldAD.ps1](#4-interface-wpf--shieldadps1)
5. [Moteur de scan on-prem — ShieldAD-Worker.ps1 (195 contrôles)](#5-moteur-de-scan-on-prem--195-contrôles)
6. [Module cloud — ShieldAD-AADS.ps1 (149 contrôles)](#6-module-cloud--149-contrôles)
7. [Rapports HTML générés (7 rapports)](#7-rapports-html-générés)
8. [Modules de support](#8-modules-de-support)
9. [Sécurité & cryptographie](#9-sécurité--cryptographie)
10. [Couverture réglementaire](#10-couverture-réglementaire)
11. [Localisation FR/EN/NL](#11-localisation-frenni)
12. [Variables globales](#12-variables-globales)
13. [Scalabilité garantie](#13-scalabilité-garantie)
14. [Disclaimer obligatoire](#14-disclaimer-obligatoire)

---

## 1. Présentation générale

ShieldAD est un outil d'audit de sécurité **Active Directory** et **Microsoft 365/Azure** développé en PowerShell/WPF pour Windows. Il effectue une analyse en **lecture strictement non destructive** de l'infrastructure AD et génère des rapports HTML professionnels multi-audience.

**Chiffres clés (vérifiés sur le code source) :**

| Métrique | Valeur |
|----------|--------|
| Contrôles on-prem (Worker.ps1) | **195** |
| Contrôles cloud (AADS.ps1) | **149** |
| **Total contrôles** | **344** |
| Rapports HTML générés | 7 |
| Langues supportées | 3 (FR / EN / NL) |
| Certifications couvertes | NIS2, ISO 27001, DORA, ANSSI, RGPD, CIS v8, CyFun (4 niveaux) |
| Environnement cible | Windows Server 2016+ avec RSAT |
| Volumétrie garantie | 50 000+ utilisateurs, scan < 10 min |

**4 états par contrôle :** `PASS` | `WARN` | `FAIL` | `NOT_APPLICABLE`

---

## 2. Inventaire des fichiers

### Fichiers PowerShell

| Fichier | Taille | Lignes | Rôle |
|---------|--------|--------|------|
| `ShieldAD.ps1` | 144 KB | 2 444 | Interface WPF principale |
| `ShieldAD-Worker.ps1` | 941 KB | 9 276 | Moteur de scan AD + génération rapports |
| `ShieldAD-AADS.ps1` | 265 KB | 2 722 | Module cloud Azure Entra ID / M365 |
| `ShieldAD-LAUNCHER.ps1` | 2 018 KB | 242 | Lanceur sécurisé (auto-généré par BUILD) |
| `ShieldAD-BUILD.ps1` | 38 KB | 687 | Script compilation + packaging EXE |
| `ShieldAD-Lang.ps1` | 82 KB | 811 | Table de localisation FR/EN/NL |
| `ShieldAD-LangSelector.ps1` | 16 KB | 348 | Sélecteur de langue WPF |
| `ShieldAD-ProfileLoader.ps1` | 15 KB | 302 | Chargeur profil client JSON |
| `ShieldAD-PrereqCheck.ps1` | 31 KB | 493 | Vérification prérequis système |
| `ShieldAD-ComplianceWizard.ps1` | 21 KB | 356 | Sélection certifications (v3.6.0) |
| `ShieldAD-ScoringCalculator.ps1` | 11 KB | 231 | Moteur scoring dual |
| `ShieldAD-ReportFilter.ps1` | 6 KB | 138 | Filtrage contrôles par standard |
| `ShieldAD-CertificationMapping.ps1` | 21 KB | 508 | Mapping contrôles ↔ certifications |
| `ShieldAD-License.ps1` | 11 KB | 225 | Gestion licences AES-256 |
| `ShieldAD-LicenseGen.ps1` | 10 KB | 197 | Générateur de licences (interne) |
| `ShieldAD-Encrypt.ps1` | 33 KB | 762 | Chiffrement rapports (.adsec) |
| `ShieldAD-ProofGenerator.ps1` | 17 KB | 286 | Horodatage RFC 3161 |

### Fichiers de configuration

| Fichier | Taille | Rôle |
|---------|--------|------|
| `ShieldAD_ClientProfile.json` | 7,5 KB | Profil contexte client (optionnel) |
| `ShieldAD-Connect.json` | 3,3 KB | Config SIEM/SOAR/webhooks |
| `ShieldAD-Exclusions.json` | 12,6 KB | Risk acceptance + seuils personnalisés |

### Autres fichiers

| Fichier | Taille | Rôle |
|---------|--------|------|
| `ShieldAD.exe` | 2 182 KB | Exécutable compilé (PS2EXE) |
| `ShieldAD.ico` | 131 KB | Icône application |
| `ShieldAD-START.bat` | 2,6 KB | Point d'entrée utilisateur |
| `qrcode.min.js` | 19,5 KB | Génération QR Code dans les rapports |
| `ShieldAD_Questionnaire_Tool_v1.html` | 97,4 KB | Outil questionnaire pre-assessment |
| `docs/ShieldAD_Dossier_Client_MSC.pdf` | 44 KB | Livrable client professionnel |

---

## 3. Architecture & flux d'exécution

```
ShieldAD-START.bat
  └─► powershell.exe → ShieldAD-LAUNCHER.ps1
        ├─ [1] Valide PowerShell 5.1+
        ├─ [2] Vérifie SHA-256 de TOUS les modules
        ├─ [3] Déchiffre payload AES-256-CBC
        ├─ [4] Extrait .ps1 en répertoire temp
        ├─ [5] Valide licence (shieldad.lic)
        └─► powershell.exe -STA (nouveau process)
              └─► ShieldAD.ps1 (fenêtre WPF principale)
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
                    └─► Fenêtre WPF principale
                          │
                          └─► [Bouton Scan]
                                │
                                ├─► Start-Process → ShieldAD-Worker.ps1
                                │     ├─ Collecte AD via DirectorySearcher/LDAP
                                │     ├─ 195 contrôles on-prem (PASS/WARN/FAIL/N.A.)
                                │     ├─ Calcul scores + risk_level
                                │     └─► Génère 7 rapports HTML
                                │
                                └─► [Si Azure coché] → ShieldAD-AADS.ps1 (async)
                                      ├─ Device Code Flow → Microsoft Graph
                                      ├─ 149 contrôles cloud
                                      └─► Rapport AADS fusionné
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

## 5. Moteur de scan on-prem — 195 contrôles

**Fichier :** `ShieldAD-Worker.ps1` | 9 276 lignes | 941 KB

**Exécution :** Process séparé (`Start-Process`), communique via fichier XML d'état (`ScanState`).

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
| A-14 | Comptes actifs avec pwdLastSet=0 |
| A-15 | Comptes DA avec PasswordNeverExpires sans FGPP compensatoire |
| A-16 | Comptes user standard avec SPN + PasswordNeverExpires (Kerberoasting) |
| A-17 | Membres inattendus dans Administrators local du DC |

---

### Famille ADCS — PKI / Certificats (13 contrôles)

| ID | Titre |
|----|-------|
| ADCS-01 | Templates ADCS vulnérables ESC1 (SAN libre) |
| ADCS-02 | CA sur DC (ANSSI PKI) + Templates ESC2 (Any Purpose EKU) |
| ADCS-03 | Web Enrollment ADCS en HTTP (ESC8) |
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

### Famille C — Configuration générale (16 contrôles)

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
| C-09 | Print Spooler désactivé sur tous les DC (PrintNightmare) |
| C-10 | WDigest authentication désactivé |
| C-11 | Credential Roaming (attributs ms-PKI) présent |
| C-12 | LLMNR actif (vecteur capture hash NTLMv2 via Responder) |
| C-13 | NetBIOS over TCP/IP actif sur les interfaces DC |
| C-14 | mDNS (Multicast DNS / Bonjour) actif sur le DC |
| C-15 | IPv6 actif sans DHCPv6 officiel (vecteur mitm6) |
| C-16 | Coercition d'authentification PetitPotam/PrinterBug non corrigée |

---

### Famille DC — Domain Controllers (9 contrôles)

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

### Famille DORA-T — Résilience financière DORA (6 contrôles)

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

### Famille FIL — Filtrage SID (1 contrôle)

| ID | Titre |
|----|-------|
| FIL-01 | Filtrage SID sur les trusts (SID Filtering) |

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

### Famille J — Journalisation (5 contrôles)

| ID | Titre |
|----|-------|
| J-01 | Taille journal Sécurité Windows |
| J-02 | Taille journal Système Windows |
| J-03 | PowerShell Script Block Logging activé |
| J-04 | PowerShell Transcription activée |
| J-05 | Redondance des Domain Controllers |

---

### Famille K — Kerberos (10 contrôles)

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

---

### Famille LAT — Mouvement latéral (2 contrôles)

| ID | Titre |
|----|-------|
| LAT-01 | Détection techniques de mouvement latéral (Pass-the-Hash/Ticket) |
| LAT-02 | Comptes avec même hash local exposés (LAPS absent) |

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

### Famille NPS — RADIUS/NPS (8 contrôles)

| ID | Titre |
|----|-------|
| NPS-01 | Service NPS (RADIUS) présent et actif dans le domaine |
| NPS-02 | Journalisation NPS activée (Succès + Échecs — Events 6272/6273) |
| NPS-03 | Méthode EAP forte (EAP-TLS ou PEAP/EAP-TLS) |
| NPS-04 | Clients RADIUS enregistrés avec secrets forts (>= 22 chars) |
| NPS-05 | Extension Azure MFA NPS installée et active |
| NPS-06 | Politiques NPS restreintes à des groupes AD spécifiques |
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

### Famille SEC — Sécurité avancée (23 contrôles)

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
| SV-07 | GenericAll/WriteDACL sur groupes privilégiés |
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

## 6. Module cloud — 149 contrôles

**Fichier :** `ShieldAD-AADS.ps1` | 2 722 lignes | 265 KB

**Authentification :** Device Code Flow → Microsoft Graph  
**Permissions requises :** User.ReadAll, Directory.ReadAll, Policy.ReadAll, AuditLog.ReadAll  
**Score hybride :** On-prem 65% + Cloud 35%

---

### Famille AZ-01 — Administrateurs Entra ID (11 contrôles)

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

---

### Famille AZ-02 — Conditional Access & MFA (12 contrôles)

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

---

### Famille AZ-03 — AD Connect / Hybride (8 contrôles)

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

---

### Famille AZ-04 — Applications & Service Principals (10 contrôles)

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

### Famille AZ-DOC — Documentaires Entra ID (8 contrôles INFO)

| ID | Titre |
|----|-------|
| AZ-DOC-01 | Politique de gouvernance des identités cloud formalisée |
| AZ-DOC-02 | Access Reviews Entra ID — planification et résultats documentés |
| AZ-DOC-03 | Procédure de gestion des comptes Break-Glass documentée et testée |
| AZ-DOC-04 | Politique d'utilisation acceptable des ressources cloud M365 communiquée |
| AZ-DOC-05 | Registre des applications Entra ID et permissions — revue semestrielle documentée |
| AZ-DOC-06 | Politique MFA d'entreprise rédigée, approuvée et communiquée |
| AZ-DOC-07 | Procédure de dérogation aux Conditional Access Policies documentée |
| AZ-DOC-08 | Procédure de restauration accès tenant en cas de perte GA documentée et testée |

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

### Famille AADS — Azure Entra Domain Services (15 contrôles)

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

ShieldAD génère **7 rapports HTML** autonomes (CSS intégré, QR Code footer, hash SHA-256).

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

### New-ReportIT — Rapport Technique
**Audience :** DSI, RSSI, équipe IT  
**Contenu :** Tous les contrôles par domaine, statut exclusions, steps de remédiation détaillés

### New-ReportDPO — Rapport Conformité
**Audience :** DPO, Compliance Officer, auditeur  
**Sections :**
- Sections 1-11 : Conformité RGPD/NIS2 par article + CIS Controls v8 + Azure
- Section 12 : Annexes CSV exportées automatiquement (DPO_Annexes_[date]/)
- Section 13 : Échantillon IAM anonymisé (Art.5(1)(c) RGPD)
- Section 14 : Checklist 19 items "Prêt pour audit"
- Section 15 : Evidence Certificateur — 8 blocs (logs, rétention, SIEM, sauvegardes...)
- Hash SHA-256 intégrité rapport

### New-ReportREM — Rapport Remédiation
**Audience :** Équipe IT, chef de projet sécurité  
**Contenu :** Plan de remédiation priorisé, estimation effort, impact risque par contrôle

### New-ReportSCO — Rapport Scoring
**Audience :** RSSI, auditeur interne  
**Contenu :** Décomposition scoring détaillée, evidence quality par domaine, risk exposure

### New-ReportTREND — Rapport Tendance
**Audience :** Direction, RSSI  
**Contenu :** Évolution vs scan précédent, indicateurs de progrès, régression détectée

### New-ReportFOREST — Rapport Topologie
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

### ShieldAD-ProofGenerator.ps1 — Horodatage RFC 3161

- TSA par défaut : Certum (QTSP européen) — `http://time.certum.pl`
- Alternatif : DigiCert — `http://timestamp.digicert.com`
- Preuve d'existence du rapport à une date précise (RGPD, NIS2, ISO)

### ShieldAD-License.ps1 — Gestion licences

| Type | Description |
|------|-------------|
| INTERNAL | Usage interne MSC — tous modules |
| AUDITOR | Nombre de scans limité, restrictions modules |
| STANDARD | Modules d'audit de base |
| ENTERPRISE | Tous modules + ShieldConnect |

Chiffrement : AES-256-CBC | Signature : HMAC-SHA256

### ShieldAD-Connect.json — Intégrations SIEM/SOAR

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

### ShieldAD-Exclusions.json — Risk Acceptance

Trois sections :
1. **ExcludedControls** — Exception par contrôle (ControlID, Reason, ApprovedBy, TicketRef, ExpiresOn)
2. **ExcludedAccounts** — Comptes de service légitimes avec ControlID ou `"*"` (wildcard)
3. **CustomThresholds** — Seuils personnalisés par contrôle (ex: `MaxDomainAdmins: 5`)

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

---

## 10. Couverture réglementaire

| Standard | Contrôles couverts | Niveau |
|---------|-------------------|--------|
| **NIS2** (EU 2022/2555) | ~80 contrôles | Art. 15-18 entités essentielles & importantes |
| **ISO/IEC 27001:2022** | ~45 contrôles | A.6, A.9, A.10, A.13 |
| **CIS Controls v8** | ~40 contrôles | IG1, IG2, IG3 |
| **ANSSI** | ~35 contrôles | R1, R33, R65, R72, R81 |
| **RGPD** (EU 2018/679) | ~20 contrôles | Art. 5, 32, 33, 34 |
| **DORA** (EU 2022/2554) | 6 contrôles (100%) | Art. 9, 10 |
| **CyFun Small** | ~8-10 contrôles | Micro-organisations |
| **CyFun Basic** | ~45-50 contrôles | Toutes entreprises |
| **CyFun Important** | ~80-90 contrôles | PME/ETI secteurs standards |
| **CyFun Essential** | ~130+ contrôles | Grandes entreprises, OIV |

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

Toutes les chaînes visibles sont dans `ShieldAD-Lang.ps1` (811 lignes, 82 KB).

```powershell
Get-LangString "MA_CLE"       # Via fonction publique
$T["maCle"][$lg]              # Via table interne dans rapports
```

La langue est sélectionnée une fois au démarrage (`LangSelector.ps1`) et ne change plus pendant la session via `$Global:ShieldADLang`.

---

## 12. Variables globales

| Variable | Défini par | Rôle |
|----------|-----------|------|
| `$Global:ShieldADLang` | LangSelector | Langue active (FR/EN/NL) |
| `$Global:ClientProfile` | ProfileLoader | Objet JSON profil client ou `$null` |
| `$Global:ComplianceSelection` | ComplianceWizard | `@{NIS2=$true; ISO27001=$false; ...}` |
| `$Global:ComplianceMapping` | ProfileLoader | Mapping standards personnalisé |
| `$Global:PrereqPassed` | PrereqCheck | Booléen — prérequis critiques OK |
| `$Global:PrereqAborted` | PrereqCheck | Booléen — utilisateur a annulé |
| `$Global:ShieldADLicense` | License.ps1 | Objet licence (type, modules, expiry, scans) |
| `$Global:ScanProc` | ShieldAD.ps1 | Process Worker en cours |
| `$Global:AADSRunning` | ShieldAD.ps1 | Booléen — scan Azure en cours |
| `$Global:LatestAADS` | ShieldAD.ps1 | Chemin dernier rapport AADS |
| `$Global:TempFilesToClean` | ShieldAD.ps1 | `List[string]` — registre suppression sécurisée |
| `$Global:LauncherWorkerPath` | LAUNCHER | Chemin Worker.ps1 injecté depuis payload |
| `$Global:LauncherLangPath` | LAUNCHER | Chemin Lang.ps1 injecté |
| `$Global:LauncherAADSPath` | LAUNCHER | Chemin AADS.ps1 injecté |

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

> ShieldAD™ v3.4 | Mandatory Shield Company © 2026 | Fondateurs : Pierre-Antoine Rouhaud & Raphael Berki. Ce rapport fournit des preuves de contrôles techniques et ne constitue pas une certification NIS2, ISO 27001 ou RGPD. La conformité réglementaire requiert une évaluation documentaire complémentaire par un auditeur qualifié et accrédité. mandatoryshield.com

**Important :** NIS2 ne définit aucun score sur 100. Le seuil 70/100 est une **convention interne MSC** — jamais présenté comme "seuil NIS2 requis".

---

*Document confidentiel — The Mandatory Shield Company SRL — Bruxelles — mandatoryshield.com*  
*Pierre-Antoine Rouhaud (CEO) & Raphaël Berki (CTO) — © 2026*  
*344 contrôles vérifiés sur code source le 2026-06-11 (195 on-prem + 149 cloud)*
