# CLAUDE.md — ADSecure v4.0 (Tauri)
# Mandatory Shield Company — Projet adsecurev4
# Fondateurs : Pierre-Antoine Rouhaud & Raphaël Berki
# © 2026 Mandatory Shield Company — Confidentiel

> Ce fichier est le contexte principal de Claude Code pour le projet ADSecure v4.
> À placer à la racine de `adsecurev4/` avant toute session Claude Code.
> **Lire intégralement avant toute modification de code.**

---

## 🏢 Identité du projet

| Champ | Valeur |
|---|---|
| Produit | ADSecure™ v4.0 |
| Société | Mandatory Shield Company SRL |
| CEO | Pierre-Antoine Rouhaud |
| CTO | Raphaël Berki |
| Version | 4.0.0 (en développement) |
| Précédente version | v3.8 (PowerShell/WPF/PS2EXE — maintenu en parallèle) |
| Stack | Tauri v2 (Rust) + React 18 + TypeScript + Vite |
| Approche | **Hybride** : UI Tauri + Workers PowerShell existants |

---

## 🎯 Mission de cette version

ADSecure v4 remplace **uniquement la couche UI et le build pipeline** de la v3.x.
Les Workers PowerShell (`ADSecure-Worker.ps1`, `ADSecure-AADS.ps1`) sont **conservés intacts**
et invoqués comme processus enfants depuis Rust via `std::process::Command`.

**Ce qui change en v4 :**
- WPF → React (interface web moderne)
- PS2EXE → `cargo tauri build` (MSI signé Authenticode)
- LAUNCHER.ps1 (AES+SHA256 maison) → `security.rs` (Rust natif) + Authenticode Windows
- START.bat → supprimé (l'EXE Tauri est le point d'entrée)

**Ce qui ne change PAS en v4 :**
- `ADSecure-Worker.ps1` — 204 contrôles on-prem (inchangé)
- `ADSecure-AADS.ps1` — 27 contrôles Azure Entra ID (inchangé)
- `ADSecure-Lang.ps1` — dictionnaire FR/EN/NL (inchangé)
- La logique métier, les seuils PASS/WARN/FAIL, les rapports HTML

---

## 🎨 Charte graphique MSC — Variables CSS officielles

```css
/* Extraites de mandatoryshield.com/style.css — NE PAS modifier */
:root {
  --msc-primary:       #0D9488;   /* Teal — couleur principale MSC */
  --msc-primary-dark:  #0F766E;   /* Teal foncé — hover, sidebar */
  --msc-primary-light: rgba(13, 148, 136, 0.1); /* Teal transparent */
  --msc-bg:            #F0FDFA;   /* Fond teal très clair */
  --msc-bg2:           #CCFBF1;   /* Fond teal léger */
  --msc-success:       #10B981;   /* Vert — PASS */
  --msc-success-light: rgba(16, 185, 129, 0.1);
  --msc-warning:       #F59E0B;   /* Ambre — WARN */
  --msc-warning-light: rgba(245, 158, 11, 0.1);
  --msc-danger:        #EF4444;   /* Rouge — FAIL */
  --msc-danger-light:  rgba(239, 68, 68, 0.1);
  --msc-text:          #0F172A;   /* Slate-900 — texte principal */
  --msc-text-2:        #475569;   /* Slate-600 — texte secondaire */
  --msc-muted:         #64748B;   /* Slate-500 — texte muted */
  --msc-border:        #E2E8F0;   /* Slate-200 — bordures */
  --msc-terminal:      #111827;   /* Gray-900 — fond terminal ShieldGraph */
  --msc-terminal-txt:  #cbd5e1;   /* Slate-300 — texte terminal */
  --msc-purple:        #7c3aed;   /* Violet — ShieldGraph, Azure/Entra */
  --msc-blue:          #2563eb;   /* Bleu — ShieldConnect, bouton secondaire */
  --font-main: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

**Règle absolue : utiliser ces variables, jamais des hex hardcodés dans les composants.**

---

## 🏗️ Architecture technique

```
adsecurev4/
├── src-tauri/                    ← Backend Rust
│   ├── src/
│   │   ├── main.rs               ← Point d'entrée Tauri
│   │   ├── scan.rs               ← Spawn PowerShell + streaming JSONL
│   │   ├── security.rs           ← Vérification SHA-256 des workers
│   │   ├── report.rs             ← Gestion des rapports HTML générés
│   │   ├── profile.rs            ← Chargement profil client JSON
│   │   └── lang.rs               ← Chargement langue depuis Lang.ps1
│   ├── tauri.conf.json           ← Config Tauri (allowlist, window, updater)
│   └── Cargo.toml
├── src/                          ← Frontend React/TypeScript
│   ├── main.tsx
│   ├── App.tsx
│   ├── styles/
│   │   ├── msc-tokens.css        ← Variables CSS MSC (ci-dessus)
│   │   └── global.css
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── ScoreRing.tsx
│   │   ├── DomainBars.tsx
│   │   ├── ControlTable.tsx
│   │   ├── ComplianceBadge.tsx
│   │   ├── RemediationCard.tsx
│   │   ├── ScanProgress.tsx
│   │   └── ShieldGraph.tsx       ← D3.js (v4.1)
│   ├── tabs/
│   │   ├── TabDirection.tsx      ← Vue CEO / Direction
│   │   ├── TabIT.tsx             ← Vue IT Manager
│   │   ├── TabDPO.tsx            ← Vue DPO / Auditeur
│   │   ├── TabRemediation.tsx    ← Vue Remédiation
│   │   ├── TabAzure.tsx          ← Vue Azure / Entra ID
│   │   ├── TabTendance.tsx       ← Vue Tendance / historique
│   │   └── TabShieldGraph.tsx    ← Vue ShieldGraph
│   ├── modules/
│   │   ├── ShieldConnect.tsx     ← Connecteurs SIEM (v4.1)
│   │   └── ShieldPredict.tsx     ← Simulation attaques (v4.2+)
│   ├── hooks/
│   │   ├── useScan.ts            ← Gestion état scan + events Tauri
│   │   ├── useTheme.ts           ← Dark/light mode toggle
│   │   └── useLang.ts            ← FR/EN/NL
│   ├── store/
│   │   └── scanStore.ts          ← Zustand store (résultats scan)
│   └── types/
│       ├── scan.ts               ← Types ScanEvent, ControlResult, etc.
│       └── report.ts
├── workers/                      ← Workers PowerShell (lien symbolique ou copie)
│   ├── ADSecure-Worker.ps1       ← NE PAS MODIFIER (v3.8 original)
│   ├── ADSecure-AADS.ps1
│   └── ADSecure-Lang.ps1
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md                     ← Ce fichier
```

---

## 🔌 Contrat JSONL — Communication Rust ↔ PowerShell

Le Worker émet des lignes JSON sur stdout. Rust lit ligne par ligne via `BufReader`.

### Schéma JSONL v1.0 (à respecter strictement)

```jsonl
// Ouverture de session
{"type":"session_start","schema":"1.0","worker_version":"3.8.0","controls_count":204,"lang":"FR"}

// Progression d'un contrôle
{"type":"control","id":"A-01","status":"PASS","title":"Comptes admin actifs","score":95,"pct":12,"domain":"Comptes"}

// Contrôle avec détail
{"type":"control","id":"K-04","status":"FAIL","title":"Kerberoastable accounts","score":0,"pct":34,"domain":"Kerberos","detail":"3 comptes avec SPN exposé","impact":-12}

// Progression générale
{"type":"progress","pct":45,"message":"Analyse GPO en cours..."}

// Rapport généré
{"type":"report_ready","kind":"CEO","path":"C:\\Users\\...\\ADSecure\\rapport-ceo.html"}

// Fin de scan
{"type":"session_end","score":73,"fail":18,"warn":34,"pass":179,"duration_s":522}

// Erreur
{"type":"error","code":"RSAT_MISSING","message":"Module AD PowerShell introuvable"}
```

### Modification minimale requise dans Worker.ps1

```powershell
# Ajouter EN TÊTE de ADSecure-Worker.ps1 (après les commentaires d'en-tête) :
param(
    [string]$OutputMode = "HTML",   # "JSONL" pour Tauri, "HTML" pour compat v3.x
    [string]$Lang = "FR"
)

# Forcer UTF-8 pour Rust
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Emit-Event($obj) {
    if ($OutputMode -eq "JSONL") {
        Write-Output ($obj | ConvertTo-Json -Compress -Depth 3)
    }
}
```

**⚠️ Cette modification ne casse pas la v3.x** — `$OutputMode` vaut `"HTML"` par défaut.

---

## 🦀 Commandes Tauri (src-tauri/src/scan.rs)

```rust
// Pierre-Antoine Rouhaud & Raphaël Berki — Mandatory Shield Company
// scan.rs — Gestion du scan PowerShell + streaming JSONL

use std::process::{Command, Stdio};
use std::io::{BufRead, BufReader};
use tauri::{AppHandle, Emitter};
use serde_json::Value;

#[tauri::command]
pub async fn start_scan(
    app: AppHandle,
    worker_path: String,
    output_dir: String,
    lang: String,
) -> Result<(), String> {
    let mut child = Command::new("powershell")
        .args([
            "-NonInteractive",
            "-NoProfile",
            "-ExecutionPolicy", "Bypass",
            "-File", &worker_path,
            "-OutputMode", "JSONL",
            "-Lang", &lang,
        ])
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|e| format!("Impossible de lancer PowerShell: {e}"))?;

    if let Some(stdout) = child.stdout.take() {
        let reader = BufReader::new(stdout);
        for line in reader.lines().flatten() {
            if let Ok(event) = serde_json::from_str::<Value>(&line) {
                app.emit("scan-event", &event).ok();
            }
        }
    }

    child.wait().map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn stop_scan() -> Result<(), String> {
    // TODO: stocker le child handle dans un Mutex global et le kill
    Ok(())
}
```

---

## 📐 Règles de développement — ABSOLUES

### ❌ NE JAMAIS faire

1. **Ne jamais modifier `ADSecure-Worker.ps1`** sans validation explicite — sauf pour ajouter le bloc `param()` JSONL documenté ci-dessus
2. **Ne jamais utiliser de couleurs hardcodées** dans les composants React — toujours `var(--msc-primary)` etc.
3. **Ne jamais utiliser `localStorage`** — Tauri a son propre système de persistance (`tauri-plugin-store`)
4. **Ne jamais casser la trilingue FR/EN/NL** — tout texte visible passe par `useLang()`
5. **Ne jamais utiliser `innerHTML`** — sécurité XSS, utiliser React JSX uniquement
6. **Ne jamais dépendre d'une connexion Internet** pour les fonctions core — ADSecure est 100% on-prem
7. **Ne jamais afficher de pourcentages de conformité hardcodés** — ils viennent toujours du scan réel
8. **Ne pas construire ShieldGraph** avant que le scan de base fonctionne (v4.0 = parité v3.x d'abord)

### ✅ TOUJOURS faire

1. Typer strictement avec TypeScript (`strict: true`)
2. Nommer les composants en PascalCase, les hooks en `use*`
3. Émettre les événements Tauri côté Rust, écouter avec `listen()` côté React
4. Tester le mode JSONL du Worker sur un vrai AD avant tout commit
5. Garder la v3.9 (PowerShell) en état fonctionnel pendant tout le dev v4

---

## 🖥️ Dashboard — Structure des onglets

### Onglets utilisateurs (tabs/)
| ID | Composant | Contenu clé |
|---|---|---|
| `direction` | `TabDirection.tsx` | Score ring, KPIs FAIL/WARN/PASS/Total, 6 frameworks conformité, top 3 risques |
| `it` | `TabIT.tsx` | Score par domaine (barres), tableau 344 contrôles filtrable PASS/WARN/FAIL |
| `dpo` | `TabDPO.tsx` | Couverture framework par framework, attestation QR, preuves exportables |
| `remediation` | `TabRemediation.tsx` | Actions critiques triées par impact, code PowerShell inline, temps estimé |
| `azure` | `TabAzure.tsx` | Score Entra ID, MFA coverage, auth legacy, 149 contrôles cloud |
| `tendance` | `TabTendance.tsx` | Graphe historique scores, comparaison scans, contrôles résolus |
| `shieldgraph` | `TabShieldGraph.tsx` | Graphe attaque D3.js (v4.1), chemins vers Domain Admin, dark terminal |

### Modules sidebar (modules/)
| Icône | Module | Statut |
|---|---|---|
| `ti-plug` | ShieldConnect | v4.1 — connecteurs SIEM |
| `ti-brain` | ShieldPredict | v4.2 — simulation attaques |

### Sidebar navigation
- Logo MSC (shield SVG blanc sur fond teal foncé)
- Dashboard, Scan, ShieldGraph, ShieldConnect, ShieldPredict
- Séparateur
- Dark mode toggle, Settings

---

## 🌙 Dark mode

Le dark mode est **optionnel** (toggle dans la sidebar et header).
Implémenter via `data-theme="dark"` sur `<html>` et surcharger les variables CSS :

```css
[data-theme="dark"] {
  --msc-bg:       #0f172a;
  --msc-bg2:      #1e293b;
  --msc-text:     #f8fafc;
  --msc-text-2:   #cbd5e1;
  --msc-muted:    #64748b;
  --msc-border:   #334155;
  /* --msc-primary et les couleurs sémantiques restent identiques */
}
```

Persister la préférence avec `tauri-plugin-store` (clé : `"theme"`).

---

## 📦 Dépendances npm cibles

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "zustand": "^4.5.0",
    "@tauri-apps/api": "^2.0.0",
    "@tauri-apps/plugin-store": "^2.0.0"
  },
  "devDependencies": {
    "@tauri-apps/cli": "^2.0.0",
    "typescript": "^5.4.0",
    "vite": "^5.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0"
  }
}
```

**D3.js** : ajouter uniquement pour `TabShieldGraph` en v4.1 — pas en v4.0.

---

## 🚀 Ordre de développement recommandé (v4.0)

### Phase 1 — Fondations (semaine 1-2)
1. `cargo create-tauri-app adsecurev4 --template react-ts`
2. Configurer `msc-tokens.css` avec toutes les variables
3. Créer `Sidebar.tsx` + `Header.tsx` + structure des onglets (shells vides)
4. Implémenter `scan.rs` + `start_scan` command
5. Tester le streaming JSONL avec un Worker.ps1 modifié en dev

### Phase 2 — Dashboard (semaine 3-4)
6. `TabDirection.tsx` — Score ring + KPIs + frameworks + top risques
7. `TabIT.tsx` — Tableau contrôles avec filtres
8. `ScoreRing.tsx`, `DomainBars.tsx`, `ControlTable.tsx` (composants partagés)
9. `useScan.ts` hook + `scanStore.ts` Zustand

### Phase 3 — Onglets avancés (semaine 5-6)
10. `TabDPO.tsx`, `TabRemediation.tsx`, `TabAzure.tsx`, `TabTendance.tsx`
11. Dark mode (`useTheme.ts`)
12. Multilingue (`useLang.ts`)

### Phase 4 — Build & sécurité (semaine 7)
13. `security.rs` — vérification SHA-256 des workers
14. `tauri.conf.json` — allowlist, CSP, updater
15. Build MSI signé (certificat EV Authenticode requis)
16. Tests de non-régression sur AD réel

---

## 🔒 Sécurité Tauri — tauri.conf.json

```json
{
  "tauri": {
    "allowlist": {
      "shell": {
        "execute": true,
        "sidecar": false,
        "scope": [{ "name": "powershell", "cmd": "powershell" }]
      },
      "fs": {
        "readFile": true,
        "writeFile": true,
        "scope": ["$DOCUMENT/ADSecure/**", "$TEMP/ads_*"]
      },
      "dialog": { "open": true, "save": true }
    },
    "security": {
      "csp": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
    }
  }
}
```

---

## 📋 Checklist avant chaque commit

- [ ] Les couleurs utilisent `var(--msc-*)`, aucun hex hardcodé
- [ ] Les textes UI passent par `useLang()` dans les 3 langues
- [ ] Le Worker PowerShell n'a pas été modifié (sauf bloc JSONL autorisé)
- [ ] Le dark mode ne casse pas l'affichage
- [ ] `cargo tauri build` produit un MSI sans erreur
- [ ] Aucun `console.log` ou `dbg!()` en production
- [ ] Les types TypeScript sont stricts (pas de `any`)

---

*Ce fichier fait autorité sur toutes les décisions techniques d'ADSecure v4.*
*Dernière mise à jour : juillet 2026 — Raphaël Berki, CTO Mandatory Shield Company*
