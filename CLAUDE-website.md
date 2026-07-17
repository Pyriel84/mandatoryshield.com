# CLAUDE.md — Mandatory Shield Company Website
## Instructions pour Claude Code (VSCode)

---

## 🏢 Contexte du projet

**Produit** : ShieldAD™ — plateforme d'audit Active Directory
**Société** : Mandatory Shield Company (MSC)
**Fondateurs** : Pierre-Antoine Rouhaud (CEO) & Raphaël Berki (CTO)
**Site** : https://mandatoryshield.com
**Copyright** : © 2026 Mandatory Shield Company

### Stack technique
Le site est en **HTML statique** avec CSS inline/externe et JavaScript vanilla.
3 fichiers de langue à maintenir **en parfaite synchronisation** :
- `index.html` → version EN (anglais)
- `index-fr.html` → version FR (français) — langue principale
- `index-nl.html` → version NL (néerlandais)

Autres fichiers : `legal.html`, `images/logo-opt.png`, `qrcode_min.js`

### Règle absolue
**Toute modification appliquée à `index.html` doit être répercutée dans `index-fr.html` et `index-nl.html`** avec la traduction appropriée. Ne jamais modifier une seule langue sans les autres.

---

## ✅ PARTIE 1 — Corrections factuelles urgentes

Ces erreurs sont présentes dans les 3 fichiers. À corriger en priorité absolue.

### 1.1 Nombre de contrôles : 197 → 270

Remplacer **toutes** les occurrences de `197` par `270` (215 on-prem + 55 cloud) :

| Emplacement | Ancien texte | Nouveau texte |
|---|---|---|
| `<meta name="description">` | `197 security controls` | `270 security controls` |
| `<meta property="og:description">` | `197 security controls` | `270 security controls` |
| `<meta name="twitter:description">` | `197 security controls` | `270 security controls` |
| Hero section — compteur | `197` | `270` |
| Hero section — texte | `197 security controls compliant with NIS2...` | `270 security controls compliant with NIS2...` |
| FAQ — Q1 | `197 control points cover 20 distinct domains` | `270 control points cover 26 on-prem domains and 7 cloud groups` |
| FAQ — Q5 (NIS2/ISO) | `197 controls` | `270 controls` |

**Version FR** : remplacer `197 contrôles` / `197 points de contrôle` partout.
**Version NL** : idem en néerlandais.

### 1.2 Nombre de domaines : 20+ → 26 on-prem + 7 cloud

| Emplacement | Ancien | Nouveau |
|---|---|---|
| Hero counter | `20+` / `Domains analyzed` | `26` / `On-prem domains` + ajouter badge `7` / `Cloud groups` |
| FAQ Q1 | `20 distinct domains` | `26 on-prem domains + 7 cloud groups` |

### 1.3 Copyright : 2025 → 2026

Dans le footer des 3 fichiers :
```html
<!-- AVANT -->
© 2025 Mandatory Shield Company
<!-- APRÈS -->
© 2026 Mandatory Shield Company
```

### 1.4 Liste des 7 rapports — corriger partout

La liste actuelle dans la FAQ et la section produit est incorrecte. La remplacer par la liste réelle :

1. Rapport Direction Générale (CEO)
2. Rapport IT Manager
3. Rapport DPO / RGPD
4. Rapport Remédiation (guide sysadmin avec commandes PowerShell)
5. Rapport Scoring détaillé (par domaine, pondération CIS/ISO/NIS2/DORA)
6. Rapport Tendance (évolution dans le temps, comparaison scans précédents)
7. Rapport Forêt AD (multi-domaines, trusts, topologie)

Remplacer partout *"Azure AD report, QR Code verifiable attestation"* par la vraie liste ci-dessus. L'attestation QR Code est une feature intégrée aux rapports, pas un rapport distinct.

### 1.5 Twitter card title

```html
<!-- AVANT -->
<meta name="twitter:title" content="ShieldAD Report™ | Mandatory Shield">
<!-- APRÈS -->
<meta name="twitter:title" content="Active Directory Security Audit | Mandatory Shield">
```

---

## ✅ PARTIE 2 — Refonte de la section Pricing

### 2.1 Nouvelle structure des offres

L'ancienne structure (Essential / Professional / Enterprise par taille d'utilisateurs) est **entièrement à remplacer** par la nouvelle logique basée sur le mode d'utilisation :

```
ONESHOT      → Intervention unique MSC         → Sur devis
ESSENTIAL    → 4 audits/an MSC                 → Sur devis
PROFESSIONAL → Licence autonome annuelle       → Sur devis
AUDITOR      → Pack de scans (auditeurs ext.)  → Sur devis
```

> Les tarifs €6 900 et €14 900 sont supprimés — la grille tarifaire est en cours de révision. Afficher "Sur devis" / "On quote" / "Op aanvraag".

### 2.2 HTML de la nouvelle section Pricing (EN)

Remplacer l'intégralité de la section `<section id="pricing">` par :

```html
<section id="pricing">
  <div class="section-header">
    <h2>Transparent Pricing</h2>
    <p>Four offers designed around how you work — not your headcount</p>
  </div>

  <div class="pricing-grid">

    <!-- ONESHOT -->
    <div class="pricing-card">
      <div class="plan-badge">One-time</div>
      <h3>Oneshot</h3>
      <p class="plan-tagline">A single MSC-led intervention. You receive the reports, not the software.</p>
      <ul>
        <li>Full on-prem + cloud scan (270 controls)</li>
        <li>All 7 HTML reports delivered</li>
        <li>On-site SHA-256 validated execution</li>
        <li>Expert debrief & report walkthrough</li>
        <li>QR Code verifiable attestation</li>
      </ul>
      <div class="plan-price">On quote</div>
      <a href="#contact" class="btn-secondary">Book a meeting</a>
    </div>

    <!-- ESSENTIAL -->
    <div class="pricing-card">
      <div class="plan-badge">Annual</div>
      <h3>Essential</h3>
      <p class="plan-tagline">4 MSC-led audits per year. Full compliance tracking across quarters.</p>
      <ul>
        <li>Everything in Oneshot × 4/year</li>
        <li>Trend report — track progress over time</li>
        <li>Guided remediation follow-up per audit</li>
        <li>Full compliance: NIS2, ISO 27001, GDPR, CIS, DORA, ANSSI</li>
        <li>Email support included</li>
      </ul>
      <div class="plan-price">On quote</div>
      <a href="#contact" class="btn-secondary">Book a meeting</a>
    </div>

    <!-- PROFESSIONAL -->
    <div class="pricing-card featured">
      <div class="plan-badge recommended">Recommended</div>
      <h3>Professional</h3>
      <p class="plan-tagline">Your team runs ShieldAD autonomously. Annual license, unlimited scans.</p>
      <ul>
        <li>Unlimited scans during subscription period</li>
        <li>All 270 controls + 7 reports</li>
        <li>Multi-domain Active Directory</li>
        <li>Shield modules available as add-ons</li>
        <li>Priority phone + email support</li>
      </ul>
      <div class="plan-price">On quote</div>
      <a href="#contact" class="btn-primary">Book a meeting</a>
      <div class="shield-addons">
        <p>Available Shield add-ons:</p>
        <span class="badge">ShieldConnect — SIEM</span>
        <span class="badge">ShieldGraph — Attack paths</span>
        <span class="badge">ShieldPredict — Simulation</span>
        <span class="badge">ShieldBrand — Custom branding</span>
      </div>
    </div>

    <!-- AUDITOR -->
    <div class="pricing-card">
      <div class="plan-badge">Per scan</div>
      <h3>Auditor</h3>
      <p class="plan-tagline">For external auditors & pentesters. NIS2, ISO 27001. Pay per scan pack.</p>
      <ul>
        <li>Scan packs: 5, 10 or 20 scans</li>
        <li>Full scan + all 7 reports per audit</li>
        <li>Multi-client use</li>
        <li>QR Code verifiable attestation per client</li>
        <li>Pack valid up to 18 months</li>
      </ul>
      <div class="plan-price">On quote</div>
      <a href="#contact" class="btn-secondary">Book a meeting</a>
    </div>

  </div>

  <div class="pricing-legal">
    ✓ All prices are ex-VAT — VAT applies as per applicable legislation<br>
    ✓ Annual subscription — invoiced upon signing<br>
    ✓ Auto-renewal with 30-day notice<br>
    ✓ Enterprise custom quote within 48h<br>
    ✓ Special conditions for public sector and associations
  </div>
</section>
```

**Adapter en FR** (Oneshot / Essential / Professionnel / Auditeur) et **en NL**.

### 2.3 Mettre à jour le formulaire de contact — champ "Area of interest"

```html
<!-- AVANT (EN) -->
<option>Essential plan</option>
<option>Professional plan</option>
<option>Enterprise plan</option>

<!-- APRÈS (EN) -->
<option>Oneshot intervention</option>
<option>Essential plan (4 audits/year)</option>
<option>Professional license</option>
<option>Auditor pack</option>
<option>Shield modules (add-ons)</option>
<option>Other</option>
```

Adapter en FR et NL.

---

## ✅ PARTIE 3 — Nouvelles sections à créer

### 3.1 Section "Why Not a Free Tool?" — Tableau comparatif

À insérer **entre la section "Why choose ShieldAD?" et la section "Compliance"**.

```html
<section id="vs-competitors">
  <div class="section-header">
    <h2>Why ShieldAD instead of a free tool?</h2>
    <p>PingCastle and BloodHound are excellent — for technical experts. ShieldAD is built for organizations.</p>
  </div>

  <div class="comparison-table">
    <table>
      <thead>
        <tr>
          <th>Capability</th>
          <th>Free tools<br><small>(PingCastle, BloodHound)</small></th>
          <th>ShieldAD™</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Security controls</td>
          <td>~100</td>
          <td><strong>270 (215 on-prem + 55 cloud)</strong></td>
        </tr>
        <tr>
          <td>Reports for management</td>
          <td>Technical only</td>
          <td><strong>7 reports (CEO, DPO, IT Manager…)</strong></td>
        </tr>
        <tr>
          <td>Guided PowerShell remediation</td>
          <td>❌</td>
          <td><strong>✅ Step-by-step per control</strong></td>
        </tr>
        <tr>
          <td>NIS2 / ISO 27001 / DORA mapping</td>
          <td>Partial</td>
          <td><strong>✅ Every control mapped</strong></td>
        </tr>
        <tr>
          <td>On-site SHA-256 validated execution</td>
          <td>❌</td>
          <td><strong>✅ Chain of custody guaranteed</strong></td>
        </tr>
        <tr>
          <td>Verifiable QR Code attestation</td>
          <td>❌</td>
          <td><strong>✅ Legal-grade audit evidence</strong></td>
        </tr>
        <tr>
          <td>Zero data transmitted</td>
          <td>Varies</td>
          <td><strong>✅ Architectural guarantee, not contractual</strong></td>
        </tr>
        <tr>
          <td>Expert-guided report walkthrough</td>
          <td>❌</td>
          <td><strong>✅ Included in all plans</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

**Version FR** : titre *"Pourquoi ShieldAD plutôt qu'un outil gratuit ?"*, intro *"PingCastle et BloodHound sont excellents — pour les experts techniques. ShieldAD est conçu pour les organisations."*

**Version NL** : adapter de même.

### 3.2 Bloc "QR Code Attestation" mis en avant

Actuellement mentionné uniquement dans la FAQ. Ajouter un bloc visuel fort dans la section produit (6e ou 7e argument dans "Why choose ShieldAD?") :

```html
<div class="feature-card highlight">
  <div class="feature-icon">🔏</div>
  <h3>Verifiable Legal Attestation</h3>
  <p>Every ShieldAD scan generates a timestamped, tamper-proof QR Code attestation — verifiable in real time at <a href="https://verify.mandatoryshield.com" target="_blank">verify.mandatoryshield.com</a>. Admissible as due-diligence evidence in audits, insurance claims, and regulatory inspections. <strong>A market first.</strong></p>
</div>
```

**Version FR** : *"Chaque scan ShieldAD génère une attestation QR Code horodatée et infalsifiable — vérifiable en temps réel sur verify.mandatoryshield.com. Opposable en audit, sinistre ou contrôle réglementaire. Une innovation unique sur le marché."*

### 3.3 Bloc Shield Modules dans la section produit

Après la liste des features actuelles, ajouter un bloc dédié aux modules Shield :

```html
<div class="shield-modules-section">
  <h3>Shield Modules — Professional Add-ons</h3>
  <p>Extend ShieldAD with optional modules designed for advanced security teams.</p>
  <div class="modules-grid">
    <div class="module-card">
      <h4>🔌 ShieldConnect</h4>
      <p>Send scan results to your SIEM in real time. Supports Sentinel, Splunk, Elastic, Wazuh, Graylog, QRadar, Teams and Slack.</p>
    </div>
    <div class="module-card">
      <h4>🕸️ ShieldGraph</h4>
      <p>Visualize Active Directory attack paths dynamically. Identify privilege escalation routes and lateral movement vectors before attackers do.</p>
    </div>
    <div class="module-card">
      <h4>🔮 ShieldPredict</h4>
      <p>Simulate future attack scenarios based on your current AD profile. Prioritize by real exploitability and business impact — not just CVE scores.</p>
    </div>
    <div class="module-card">
      <h4>🎨 ShieldBrand</h4>
      <p>Deliver ShieldAD reports under your own brand. Full logo, colors and company name customization for MSPs and integrators.</p>
    </div>
  </div>
</div>
```

**Adapter en FR et NL.**

> ⚠️ Les Shield modules sont en cours de développement. Utiliser le wording "coming soon" ou "available on request" jusqu'à leur disponibilité effective. Ne pas laisser croire qu'ils sont disponibles immédiatement.

---

## ✅ PARTIE 4 — Section Compliance — Ajouter ANSSI

Dans la grille de conformité (6 badges actuels), ajouter un 7e badge ANSSI :

```html
<div class="compliance-card">
  <div class="compliance-status">Aligned</div>
  <h3>ANSSI</h3>
  <p class="compliance-subtitle">French National Cybersecurity Agency</p>
  <p>ANSSI publishes technical recommendations for Active Directory hardening, widely adopted across French-speaking Europe. ShieldAD maps directly to R33 (Server Core) and R72 (FSMO separation).</p>
  <ul>
    <li>DC hardening (R33)</li>
    <li>FSMO & SPOF separation (R72)</li>
    <li>Tiering model</li>
    <li>PAM recommendations</li>
  </ul>
</div>
```

**Version FR** : *"L'ANSSI publie des recommandations techniques pour le durcissement Active Directory, largement adoptées en Europe francophone. ShieldAD mappe directement aux recommandations R33 (Server Core) et R72 (séparation FSMO)."*

Ajouter aussi `ANSSI R33 R72` dans les `<meta name="keywords">` des 3 fichiers.

---

## ✅ PARTIE 5 — SEO — Meta descriptions

Mettre à jour dans les 3 fichiers :

**EN** (`index.html`) :
```html
<meta name="description" content="European Active Directory audit platform. 270 security controls, 26 domains, 7 regulatory reports. NIS2, ISO 27001, GDPR, DORA, ANSSI & Cyfun compliant. On-site intervention included.">
```

**FR** (`index-fr.html`) :
```html
<meta name="description" content="Plateforme européenne d'audit Active Directory. 270 contrôles de sécurité, 26 domaines, 7 rapports réglementaires. Conformité NIS2, ISO 27001, RGPD, DORA, ANSSI & Cyfun. Intervention sur site incluse.">
```

**NL** (`index-nl.html`) :
```html
<meta name="description" content="Europees Active Directory auditplatform. 270 beveiligingscontroles, 26 domeinen, 7 regelgevende rapporten. NIS2, ISO 27001, AVG, DORA, ANSSI & Cyfun conform. Ter plaatse interventie inbegrepen.">
```

---

## ✅ PARTIE 6 — FAQ — Mises à jour

### 6.1 Réécrire "Which plan is right for my organization?" (EN)

```
We offer four plans designed around how your team works:

**Oneshot** is a one-time MSC-led intervention — ideal for organizations that need a comprehensive security baseline or pre-certification evidence without a recurring commitment.

**Essential** provides four MSC-led audits per year (one per quarter), giving you a full compliance tracking cycle with trend reports and remediation follow-up.

**Professional** gives your team autonomous access to ShieldAD under an annual license with unlimited scans. Shield modules (SIEM connectors, attack path visualization, simulation) can be added à la carte.

**Auditor** is designed for external NIS2 / ISO 27001 auditors and pentesters — purchased as scan packs of 5, 10 or 20 scans, usable across multiple client environments.

Contact us to discuss which plan matches your security maturity and regulatory obligations.
```

### 6.2 Corriger "What is the delivery timeframe?" (EN)

Remplacer *"4 audits per year for Professional"*
Par *"4 audits per year for Essential, unlimited scans for Professional"*

### 6.3 Ajouter FAQ — Shield modules (EN)

```
Q: What are Shield modules?

Shield modules are optional add-ons available on the Professional plan, designed for security teams that need more than audit reports.

ShieldConnect sends scan results directly to your SIEM (Sentinel, Splunk, Elastic, Wazuh, Graylog, QRadar) and messaging tools (Teams, Slack) in JSON or CEF format.

ShieldGraph visualizes Active Directory attack paths dynamically — delegation chains, privilege escalation routes, lateral movement vectors — so you can see what an attacker would target before they do.

ShieldPredict simulates future attack scenarios based on your current AD posture, scoring risks by real exploitability and business impact rather than generic CVE scores.

ShieldBrand allows MSPs and integrators to deliver ShieldAD reports under their own brand identity.

Each module is activated independently in your license. Contact us at contact@mandatoryshield.com to discuss availability and pricing.
```

### 6.4 Ajouter FAQ — Auditor license (EN)

```
Q: Is ShieldAD available for external auditors?

Yes. The Auditor plan is specifically designed for external NIS2, ISO 27001 auditors, and pentesters who need to run AD security assessments across multiple client environments.

Instead of an annual subscription, you purchase a scan pack (5, 10 or 20 scans). Each scan includes the full 270-control analysis and all 7 regulatory reports. Packs are valid for up to 18 months and can be used across different client Active Directories.

The QR Code verifiable attestation — generated per scan and verifiable at verify.mandatoryshield.com — provides your clients with legally admissible audit evidence ready for regulatory inspections.

Contact us at contact@mandatoryshield.com to discuss Auditor pricing.
```

---

## ✅ PARTIE 7 — Section "Company" — Enrichir les fondateurs

Remplacer les biographies actuelles (trop courtes) par des versions enrichies :

**Pierre-Antoine Rouhaud — EN** :
```
Co-Founder & CEO. Expert in securing Windows infrastructures and Active Directory environments. Pierre-Antoine combines strategic business vision with deep technical expertise in identity security. He leads ShieldAD's product direction, commercial strategy, and regulatory compliance positioning across NIS2, ISO 27001 and DORA markets.
```

**Raphaël Berki — EN** :
```
Co-Founder & CTO. Software architect and cybersecurity specialist, Raphaël designs ShieldAD's core engine — 270 security controls covering on-prem Active Directory and Azure Entra ID. His expertise spans Kerberos attack analysis, ADCS vulnerability research (ESC1–ESC7), behavioral detection, and intelligent scoring systems aligned with CIS Controls, ANSSI and DORA frameworks.
```

Adapter en FR et NL.

---

## ✅ PARTIE 8 — Footer

### 8.1 Corriger les liens vides

```html
<!-- AVANT -->
<a href="#">Careers</a>
<a href="#">Partners</a>

<!-- APRÈS — option A (redirection temporaire) -->
<a href="#contact">Careers</a>
<a href="#contact">Partners</a>

<!-- APRÈS — option B (pages dédiées si créées) -->
<a href="careers.html">Careers</a>
<a href="partners.html">Partners</a>
```

### 8.2 Note sur les réseaux sociaux
Si d'autres comptes existent (Twitter/X, GitHub MSC), les ajouter dans le footer. Actuellement seul LinkedIn est présent.

---

## 📋 Ordre d'exécution recommandé

```
PRIORITÉ 1 — Corrections (30 min)
  [ ] 1.1 Remplacer 197 → 270 dans les 3 fichiers (meta + hero + FAQ)
  [ ] 1.2 Corriger compteur domaines → 26 + 7 (3 fichiers)
  [ ] 1.3 Copyright 2025 → 2026 (3 fichiers)
  [ ] 1.4 Corriger liste des 7 rapports (3 fichiers)
  [ ] 1.5 Twitter card title (3 fichiers)

PRIORITÉ 2 — Pricing (1h)
  [ ] 2.1 Refondre section pricing avec 4 nouvelles offres (3 fichiers)
  [ ] 2.2 Mettre à jour formulaire de contact — "Area of interest" (3 fichiers)

PRIORITÉ 3 — Nouvelles sections (1h30)
  [ ] 3.1 Tableau comparatif vs outils gratuits (3 fichiers)
  [ ] 3.2 Bloc QR Code attestation dans section produit (3 fichiers)
  [ ] 3.3 Bloc Shield Modules avec mention "coming soon" (3 fichiers)

PRIORITÉ 4 — Compliance & SEO (45 min)
  [ ] 4.1 Ajouter badge ANSSI dans grille conformité (3 fichiers)
  [ ] 4.2 Meta descriptions mises à jour (3 fichiers)
  [ ] 4.3 Keywords ANSSI ajoutés (3 fichiers)

PRIORITÉ 5 — FAQ (30 min)
  [ ] 5.1 Réécrire "Which plan" (3 fichiers)
  [ ] 5.2 Corriger "Delivery timeframe" (3 fichiers)
  [ ] 5.3 Ajouter FAQ Shield modules (3 fichiers)
  [ ] 5.4 Ajouter FAQ Auditor license (3 fichiers)

PRIORITÉ 6 — Finitions (20 min)
  [ ] 6.1 Enrichir biographies fondateurs (3 fichiers)
  [ ] 6.2 Corriger liens footer Partners/Careers (3 fichiers)
```

---

## ⚠️ Points d'attention

- **Ne jamais toucher** à `legal.html` sans validation juridique préalable.
- **verify.mandatoryshield.com** est référencé — vérifier que ce sous-domaine est actif avant de le mettre davantage en avant.
- **Les prix** (€6 900, €14 900) sont supprimés — ne pas les remettre sans validation de Pierre-Antoine Rouhaud.
- **Les Shield modules** sont en cours de développement — tout wording doit rester au conditionnel ("available", "coming soon") jusqu'à disponibilité effective.
- **Pas de témoignages** pour l'instant — ne pas ajouter de faux témoignages. Cette section sera créée quand de vrais retours clients seront disponibles.

---

*Mandatory Shield Company — Instructions internes — © 2026*
