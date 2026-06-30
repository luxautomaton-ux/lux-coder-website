import { writeFileSync } from 'node:fs';

const navItems = [
  ['index.html', 'Home', 'home'],
  ['features.html', 'Features', 'features'],
  ['comparison.html', 'Compare', 'comparison'],
  ['download.html', 'Download', 'download'],
  ['pricing.html', 'Pricing', 'pricing'],
  ['usb.html', 'Agent USB', 'usb'],
  ['partners.html', 'Partners', 'partners']
];

const allLinks = [
  ['coder.html', 'Lux Coder'],
  ['features.html', 'Features'],
  ['feature-lana-jarvis.html', 'LANA + Jarvis'],
  ['feature-model-switcher.html', 'Model Switcher'],
  ['feature-mindmap.html', '3D Mindmap'],
  ['feature-apps-built-preview.html', 'Apps Built Preview'],
  ['feature-skills.html', 'Skills'],
  ['feature-loops.html', 'Loops'],
  ['comparison.html', 'Comparison'],
  ['download.html', 'Download'],
  ['pricing.html', 'Pricing'],
  ['usb.html', 'Agent USB'],
  ['packs.html', 'Success Packs'],
  ['license.html', 'License Lookup'],
  ['affiliate.html', 'Affiliate'],
  ['partners.html', 'Partners']
];

const featureCards = [
  ['LANA + Jarvis integration', 'Two-way assistant guidance, voice handoff, approvals, and project-aware build support.'],
  ['Model Switcher', 'Route work through OpenRouter, Claude, Gemini, GPT, or local options with health and fallback visible.'],
  ['3D Mindmap', 'See code, docs, sources, issues, agents, and decisions as one connected build graph.'],
  ['Apps Built Preview', 'Review app previews, browser QA, screenshots, and customer-ready build evidence before handoff.'],
  ['Skills', 'Specialist skill packs cover UI, docs, security, data, deployments, reports, and agent workflows.'],
  ['Loops', 'Run, inspect, verify, and report every important step before shipping it.'],
  ['LuxWiki memory', 'Save decisions, sources, specs, and project notes into a private knowledge layer.'],
  ['Files and repos', 'Upload source packs, docs, screenshots, PDFs, and handoff notes before a run begins.']
];

const standoutFeatures = [
  {
    file: 'feature-lana-jarvis.html',
    title: 'LANA + Jarvis',
    label: 'Voice and agent companion',
    text: 'LANA sits beside the workspace while Jarvis-style voice control gives builders a hands-free command path for questions, approvals, and status.',
    pageTitle: 'LANA + Jarvis keeps the build moving.',
    pageCopy: 'A visible assistant presence, talk controls, run details, and approval-first prompts keep your agent work conversational without losing engineering discipline.',
    image: 'lux-visual-lana-command.png',
    visual: 'signal',
    points: ['Two-way voice direction', 'Run detail awareness', 'Approval-first actions', 'Project-aware responses'],
    steps: ['Speak or type the request', 'LANA confirms the build context', 'Jarvis-style voice flow reads status', 'You approve the next action']
  },
  {
    file: 'feature-model-switcher.html',
    title: 'Model Switcher',
    label: 'Choose the right brain',
    text: 'Switch between providers, compare readiness, watch health signals, and keep fallback choices visible before a run.',
    pageTitle: 'Model Switcher gives every task the right model.',
    pageCopy: 'Keep provider choice, health state, free-model options, context size, and fallback paths visible before you ask the agent to work.',
    image: 'lux-visual-model-switcher.png',
    visual: 'routing',
    points: ['OpenRouter and direct providers', 'Free-model visibility', 'Provider health indicators', 'Fallback before failure'],
    steps: ['Review provider status', 'Pick a model set', 'Route the task', 'Watch readiness and token usage']
  },
  {
    file: 'feature-mindmap.html',
    title: '3D Mindmap',
    label: 'See the system',
    text: 'Map projects, sources, agents, APIs, docs, tests, and decisions so complex builds become inspectable.',
    pageTitle: '3D Mindmap turns project context into a visible graph.',
    pageCopy: 'Trace how source files, tasks, agents, APIs, docs, tests, decisions, and delivery proof connect across the build.',
    image: 'lux-visual-mindmap.png',
    visual: 'orbit',
    points: ['Agent-Reach research view', 'Source relationship graph', 'Decision and task nodes', 'Workflow-level visibility'],
    steps: ['Load sources', 'Map relationships', 'Inspect connected nodes', 'Drive follow-up loops']
  },
  {
    file: 'feature-apps-built-preview.html',
    title: 'Apps Built Preview',
    label: 'Proof before delivery',
    text: 'Preview built apps, capture screenshots, inspect browser state, and keep customer-ready evidence close to the chat.',
    pageTitle: 'Apps Built Preview shows what shipped.',
    pageCopy: 'Keep local previews, app screenshots, browser QA, and handoff evidence in one place so delivery is visible before it is promised.',
    image: 'lux-visual-apps-preview.png',
    visual: 'previews',
    points: ['Live app preview lanes', 'Screenshot evidence', 'Browser QA hooks', 'Customer-ready handoff'],
    steps: ['Run the build', 'Open preview', 'Capture proof', 'Attach delivery notes']
  },
  {
    file: 'feature-skills.html',
    title: 'Skills',
    label: 'Specialists on demand',
    text: 'Use focused skills for UI, documents, data, security, GitHub, testing, deployments, and repeatable workflows.',
    pageTitle: 'Skills give Lux Coder specialist muscle.',
    pageCopy: 'Purpose-built skills guide the agent through frontend builds, documents, data, security scans, GitHub work, browser QA, and deployment workflows.',
    image: 'lux-visual-skills.png',
    visual: 'skills',
    points: ['Frontend and browser QA', 'Docs and data workflows', 'Security and GitHub help', 'Repeatable expert patterns'],
    steps: ['Select the task type', 'Load the right skill', 'Follow the expert workflow', 'Verify the result']
  },
  {
    file: 'feature-loops.html',
    title: 'Loops',
    label: 'Verified execution',
    text: 'Every build can move through run, inspect, decide, act, verify, and report cycles with approval-first guardrails.',
    pageTitle: 'Loops make agent work trustworthy.',
    pageCopy: 'Lux Coder treats serious work as a loop: orient, inspect, decide, act, verify, and report with visible evidence at every step.',
    image: 'lux-visual-loops.png',
    visual: 'loops',
    points: ['Run and inspect cycle', 'Verification-first delivery', 'Approval gates', 'Traceable reports'],
    steps: ['Orient', 'Inspect', 'Decide', 'Act', 'Verify', 'Report']
  }
];

const workflow = [
  ['Base', 'Set the project foundation, model roster, memory, and access rules.'],
  ['Upload', 'Bring in files, repos, notes, screenshots, and product assets.'],
  ['Inflow', 'Let the agent create structure, context, tasks, and next steps.'],
  ['Loop', 'Execute, test, inspect, and refine in verified feedback loops.'],
  ['Drive', 'Ship with confidence, monitor outcomes, and improve the system.']
];

const comparisonRows = [
  ['Private AI workspace', 'Yes', 'Cloud / CLI', 'Terminal-first', 'Editor-first', 'Agent platform'],
  ['Integrated agent system', 'Yes', 'Yes', 'Yes', 'Partial', 'Yes'],
  ['Chat, code, files, apps', 'Yes', 'Code + tasks', 'Code + terminal', 'Editor + agent', 'Editor + browser'],
  ['LANA + Jarvis voice layer', 'Yes', 'No', 'No', 'No', 'No'],
  ['Approval browser / terminal bridge', 'Yes', 'Task approval', 'Terminal tools', 'Editor tools', 'Browser agent'],
  ['LuxWiki / memory layer', 'Yes', 'Partial', 'Project context', 'Rules / context', 'Memory / artifacts'],
  ['3D mindmaps', 'Yes', 'No', 'No', 'No', 'No'],
  ['Model switching', 'Yes', 'OpenAI-first', 'Claude-first', 'Multi-model', 'Gemini-first'],
  ['Apps Built Preview', 'Yes', 'Task evidence', 'Terminal output', 'Preview possible', 'Artifacts'],
  ['Skills', 'Yes', 'Skills', 'Commands / MCP', 'Plugins / skills', 'Plugins'],
  ['Verified loops', 'Yes', 'Reviewable tasks', 'Manual checks', 'Agent flow', 'Plan / execute / verify'],
  ['Branded reports / exports', 'Yes', 'Limited', 'Limited', 'Limited', 'Artifacts'],
  ['USB / offline direction', 'Yes', 'No', 'No', 'No', 'No']
];

const pricingPlans = [
  ['Free', '$0', 'For learners and hobby projects.', ['One workspace', 'Basic models', 'Community support', 'Public repo workflows'], 'Get Started'],
  ['Pro', '$15', 'For individual developers.', ['Unlimited workspaces', 'All models', 'Private repos', 'Priority support'], 'Start Pro'],
  ['Team', '$29', 'For growing teams.', ['Everything in Pro', 'Team workspaces', 'Role and access control', 'Audit logs'], 'Start Team'],
  ['Enterprise', 'Custom', 'For organizations with scale.', ['SSO and SCIM', 'Advanced security', 'On-prem or VPC', 'SLA and support'], 'Contact Sales']
];

const downloadCards = [
  ['macOS', 'Universal build for Intel and Apple Silicon.', 'lux-coder-suite-2.3.0.vsix', 'Download VSIX'],
  ['Windows', 'Use the VSIX package or request the desktop installer.', 'lux-coder-suite-2.3.0.vsix', 'Download VSIX'],
  ['Linux', 'Install the extension package on compatible editors.', 'lux-coder-suite-2.3.0.vsix', 'Download VSIX']
];

function header(active) {
  const nav = navItems.map(([href, label, key]) => {
    const current = key === active ? ' aria-current="page"' : '';
    return `<li><a href="${href}"${current}>${label}</a></li>`;
  }).join('\n                    ');

  return `<header id="main-header">
        <div class="nav-shell">
            <a class="brand" href="index.html" aria-label="Lux Coder Suite home">
                <img src="lux-coder-logo.jpeg" alt="">
                <span>Lux Coder Suite</span>
            </a>
            <nav aria-label="Primary navigation">
                <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
                <ul class="nav-links" id="nav-links">
                    ${nav}
                </ul>
            </nav>
            <a class="nav-cta" href="download.html">Get Suite</a>
        </div>
    </header>`;
}

function footer() {
  const links = allLinks.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('\n                        ');
  return `<footer class="site-footer">
        <div class="footer-grid">
            <div>
                <a class="brand footer-brand" href="index.html">
                    <img src="lux-coder-logo.jpeg" alt="">
                    <span>Lux Coder Suite</span>
                </a>
                <p>A private AI coding workspace from Lux Automaton. Build apps, dashboards, automations, and client systems with verified agent loops.</p>
            </div>
            <div>
                <h3>Website</h3>
                <ul>${links}</ul>
            </div>
            <div>
                <h3>Actions</h3>
                <ul>
                    <li><a href="download.html">Download Suite</a></li>
                    <li><a href="pricing.html">View Pricing</a></li>
                    <li><a href="license.html">Lookup License</a></li>
                    <li><a href="mailto:sales@luxautomaton.com">Contact Sales</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <span>Lux Automaton</span>
            <span>Automate | Innovate | Accelerate</span>
        </div>
    </footer>`;
}

function layout(page) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title}</title>
    <meta name="description" content="${page.description}">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/jpeg" href="lux-coder-logo.jpeg">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:image" content="lux-coder-share.png">
    <meta property="og:type" content="website">
</head>
<body data-page="${page.active}">
    ${header(page.active)}
    <main>
${page.body}
    </main>
    ${footer()}
    <script src="script.js"></script>
</body>
</html>
`;
}

function hero({ title, copy, actions = [], media = true, compact = false }) {
  const actionHtml = actions.map(([href, label, variant = 'primary']) => `<a class="btn btn-${variant}" href="${href}">${label}</a>`).join('\n                    ');
  const mediaHtml = media ? `<div class="hero-product">
                    <div class="product-window">
                        <div class="window-bar"><span></span><span></span><span></span><strong>Lux Coder Suite</strong></div>
                        <img src="lux-visual-lana-command.png" alt="Lana guiding the Lux Coder Suite command center">
                        <div class="preview-stats">
                            <span>1.32M tokens</span>
                            <span>98% ready</span>
                            <span>Ask approval</span>
                        </div>
                    </div>
                    <aside class="launch-panel">
                        <img src="lux-coder-logo.jpeg" alt="">
                        <h2>Launch Workspace</h2>
                        <p>Enter your license to launch Lux Coder Suite.</p>
                        <input value="LUX-CODER-XXXX-XXXX-XXXX" aria-label="Demo license key">
                        <a class="btn btn-primary" href="download.html">Download Suite</a>
                        <a class="btn btn-secondary" href="license.html">Lookup License</a>
                        <small>Secure | Private | Local-first</small>
                    </aside>
                </div>` : '';
  return `<section class="hero ${compact ? 'hero-compact' : ''}">
            <div class="hero-grid">
                <div class="hero-copy reveal">
                    <h1>${title}</h1>
                    <p>${copy}</p>
                    ${actions.length ? `<div class="hero-actions">${actionHtml}</div>` : ''}
                    <div class="trust-row">
                        <span>Integrated with Lux Agent</span>
                        <span>Local-first and private</span>
                        <span>Verified loops</span>
                        <span>Premium workspace</span>
                    </div>
                </div>
                ${mediaHtml}
            </div>
        </section>`;
}

function workflowStrip() {
  return `<section class="workflow-strip reveal" aria-label="Lux Coder workflow">
            ${workflow.map(([title, text], index) => `<article>
                <span class="step-index">${String(index + 1).padStart(2, '0')}</span>
                <h3>${title}</h3>
                <p>${text}</p>
            </article>`).join('\n            ')}
        </section>`;
}

const bridgeTools = [
  {
    key: 'browser',
    title: 'Browser',
    label: 'Inspect preview',
    status: 'Clean browser ready for inspect, click, resize, screenshot, and console checks.',
    image: 'lux-visual-browser-terminal.png',
    points: ['Open local previews', 'Inspect DOM and logs', 'Capture proof']
  },
  {
    key: 'terminal',
    title: 'Terminal',
    label: 'Run command',
    status: 'Terminal runs stay approval-first, traced, and ready for verification.',
    image: 'lux-visual-browser-terminal.png',
    points: ['Run approved commands', 'Read build output', 'Attach run evidence']
  },
  {
    key: 'scanner',
    title: 'Project Scanner',
    label: 'Map context',
    status: 'Project scanner reads repos, branches, files, and source relationships before action.',
    image: 'lux-visual-bridge-cockpit.png',
    points: ['Scan repo structure', 'Map source context', 'Find handoff gaps']
  },
  {
    key: 'files',
    title: 'Files',
    label: 'Route assets',
    status: 'Files, photos, docs, source packs, and screenshots stay close to the agent run.',
    image: 'lux-visual-bridge-cockpit.png',
    points: ['Attach photos', 'Review documents', 'Package delivery']
  },
  {
    key: 'harness',
    title: 'Harness',
    label: 'Verify loop',
    status: 'Lux Harness records orient, inspect, decide, act, verify, and report evidence.',
    image: 'lux-visual-bridge-cockpit.png',
    points: ['Trace changes', 'Run verification', 'Report result']
  }
];

function bridgeCockpitSection() {
  const first = bridgeTools[0];
  return `<section class="section bridge-cockpit-section">
            <div class="section-head align-left">
                <h2>Interactive approval bridge.</h2>
                <p>Click each tool lane to see how Lana and the agent team move through browser, terminal, scanner, files, and harness verification without losing operator control.</p>
            </div>
            <div class="bridge-cockpit reveal" data-bridge-panel data-active-bridge="${first.key}">
                <div class="bridge-stage">
                    <img data-bridge-image src="${first.image}" alt="Lux Agent bridge cockpit visual">
                    <div class="bridge-stage-overlay">
                        <span class="live-dot"></span>
                        <strong data-bridge-stage-label>${first.title}</strong>
                        <small data-bridge-stage-status>${first.status}</small>
                    </div>
                </div>
                <div class="bridge-control">
                    <div class="bridge-tabs" role="tablist" aria-label="Bridge tools">
                        ${bridgeTools.map((tool, index) => `<button type="button" role="tab" aria-selected="${index === 0 ? 'true' : 'false'}" data-bridge-tool="${tool.key}" data-bridge-image="${tool.image}" data-bridge-status="${tool.status}"><span>${tool.title}</span><small>${tool.label}</small></button>`).join('\n                        ')}
                    </div>
                    <div class="bridge-views">
                        ${bridgeTools.map((tool, index) => `<article class="bridge-view ${index === 0 ? 'active' : ''}" data-bridge-view="${tool.key}" ${index === 0 ? '' : 'hidden'}>
                            <h3>${tool.title}</h3>
                            <p>${tool.status}</p>
                            <ul>${tool.points.map(point => `<li>${point}</li>`).join('')}</ul>
                        </article>`).join('\n                        ')}
                    </div>
                    <div class="bridge-runner">
                        <div class="bridge-progress" aria-hidden="true"><span></span></div>
                        <p data-bridge-status-line>Approval mode: Ask before tool use.</p>
                        <button class="btn btn-primary" type="button" data-bridge-run>Approve Next Step</button>
                    </div>
                </div>
            </div>
        </section>`;
}

function photoRibbon() {
  return `<section class="section photo-ribbon-section">
            <div class="section-head">
                <h2>More of the workspace, less imagination required.</h2>
                <p>Photos and product visuals show the bridge, Lana, browser control, terminal runs, and verification cockpit as one connected operating surface.</p>
            </div>
            <div class="photo-ribbon">
                ${[
                  ['lux-agent-usb-lana.jpeg', 'Lana holding Lux Agent USB'],
                  ['lux-visual-browser-terminal.png', 'Browser and terminal cockpit'],
                  ['lux-visual-bridge-cockpit.png', 'Approval bridge cockpit'],
                  ['lux-visual-lana-command.png', 'Lana command center']
                ].map(([src, alt]) => `<figure class="photo-tile reveal"><img src="${src}" alt="${alt}"><figcaption>${alt}</figcaption></figure>`).join('\n                ')}
            </div>
        </section>`;
}

function featureGrid() {
  return `<div class="feature-grid">
            ${featureCards.map(([title, text]) => `<article class="feature-card reveal">
                <span class="card-icon"></span>
                <h3>${title}</h3>
                <p>${text}</p>
            </article>`).join('\n            ')}
        </div>`;
}

function standoutSection() {
  return `<section class="section standout-section" id="standout-features">
            <div class="section-head">
                <h2>Standout features built into Lux Coder.</h2>
                <p>These are the signature capabilities that make the suite feel different from a normal chat box or editor plugin.</p>
            </div>
            <div class="standout-grid">
                ${standoutFeatures.map((feature, index) => `<a class="standout-card reveal" href="${feature.file}">
                    <span class="standout-index">${String(index + 1).padStart(2, '0')}</span>
                    <div>
                        <h3>${feature.title}</h3>
                        <strong>${feature.label}</strong>
                        <p>${feature.text}</p>
                    </div>
                </a>`).join('\n                ')}
            </div>
        </section>`;
}

function matrix() {
  return `<div class="matrix-wrap reveal">
            <table class="matrix-table">
                <thead>
                    <tr><th>Capability</th><th>Lux Coder Suite</th><th>Codex</th><th>Claude Code</th><th>Cursor</th><th>Antigravity</th></tr>
                </thead>
                <tbody>
                    ${comparisonRows.map(row => `<tr>${row.map((cell, i) => `<td${i === 1 ? ' class="lux-col"' : ''}>${cell}</td>`).join('')}</tr>`).join('\n                    ')}
                </tbody>
            </table>
        </div>`;
}

function pricingGrid(includeToggle = false) {
  return `${includeToggle ? `<div class="billing-toggle" role="group" aria-label="Billing period">
            <button class="active" data-billing="monthly">Monthly</button>
            <button data-billing="annual">Annual</button>
        </div>` : ''}
        <div class="pricing-grid">
            ${pricingPlans.map(([name, price, desc, items, cta], index) => `<article class="pricing-card reveal ${index === 1 ? 'featured' : ''}" data-plan="${name}">
                <h3>${name}</h3>
                <div class="price" data-monthly="${price}" data-annual="${price === '$0' || price === 'Custom' ? price : '$' + Math.max(1, Math.round(Number(price.replace(/[^0-9]/g, '')) * 10))}">${price}</div>
                <p>${desc}</p>
                <ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>
                <a class="btn ${index === 1 ? 'btn-primary' : 'btn-secondary'}" href="${name === 'Enterprise' ? 'mailto:sales@luxautomaton.com?subject=Lux%20Coder%20Enterprise' : 'download.html'}">${cta}</a>
            </article>`).join('\n            ')}
        </div>`;
}

function pageHeader(title, copy, sideTitle = 'Suite Ready', sideItems = ['Private workspace', 'Lux Agent connected', 'Model freedom']) {
  return `<section class="page-header">
            <div>
                <h1>${title}</h1>
                <p>${copy}</p>
            </div>
            <aside class="context-panel">
                <h2>${sideTitle}</h2>
                <ul>${sideItems.map(item => `<li>${item}</li>`).join('')}</ul>
            </aside>
        </section>`;
}

function animatedGraphic(kind) {
  const graphics = {
    signal: `<div class="animated-graphic graphic-signal" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span>
                    <div class="signal-core">LANA</div>
                </div>`,
    routing: `<div class="animated-graphic graphic-routing" aria-hidden="true">
                    <div class="route-line"></div><div class="route-line"></div><div class="route-line"></div>
                    <span>GPT</span><span>Claude</span><span>Gemini</span><strong>Best fit</strong>
                </div>`,
    orbit: `<div class="animated-graphic graphic-orbit" aria-hidden="true">
                    <div class="orbit-ring"></div><div class="orbit-ring"></div>
                    <span class="node node-a">Code</span><span class="node node-b">Docs</span><span class="node node-c">APIs</span><span class="node node-d">Tests</span>
                    <strong>Lux Graph</strong>
                </div>`,
    previews: `<div class="animated-graphic graphic-previews" aria-hidden="true">
                    <div></div><div></div><div></div><strong>QA ready</strong>
                </div>`,
    skills: `<div class="animated-graphic graphic-skills" aria-hidden="true">
                    <span>UI</span><span>Docs</span><span>Data</span><span>Security</span><span>GitHub</span><span>QA</span>
                </div>`,
    loops: `<div class="animated-graphic graphic-loops" aria-hidden="true">
                    <span>Orient</span><span>Inspect</span><span>Decide</span><span>Act</span><span>Verify</span><span>Report</span>
                </div>`
  };
  return graphics[kind] || graphics.signal;
}

function featureRail(currentFile) {
  return `<nav class="feature-rail" aria-label="Feature pages">
            ${standoutFeatures.map(feature => `<a href="${feature.file}"${feature.file === currentFile ? ' aria-current="page"' : ''}>${feature.title}</a>`).join('\n            ')}
        </nav>`;
}

function featureDetailPage(feature) {
  return `
        <section class="feature-detail-hero">
            <div class="feature-detail-grid">
                <div class="feature-detail-copy reveal">
                    <h1>${feature.pageTitle}</h1>
                    <p>${feature.pageCopy}</p>
                    <div class="hero-actions">
                        <a class="btn btn-primary" href="download.html">Download Suite</a>
                        <a class="btn btn-secondary" href="features.html#standout-features">All Features</a>
                    </div>
                </div>
                <div class="feature-media reveal">
                    <img class="feature-photo" src="${feature.image}" alt="${feature.title} visual">
                    ${animatedGraphic(feature.visual)}
                </div>
            </div>
        </section>
        ${featureRail(feature.file)}
        <section class="section feature-proof-section">
            <div class="section-head">
                <h2>Why it stands out.</h2>
                <p>${feature.text}</p>
            </div>
            <div class="feature-proof-grid">
                ${feature.points.map(point => `<article class="mini-card reveal"><h3>${point}</h3><p>Built into the Lux Coder command center so the feature stays visible during real project work.</p></article>`).join('\n                ')}
            </div>
        </section>
        <section class="section">
            <div class="section-head">
                <h2>How ${feature.title} works.</h2>
                <p>A simple path from context to action, with the operator still in control.</p>
            </div>
            <div class="feature-step-grid">
                ${feature.steps.map((step, index) => `<article class="feature-step reveal"><span>${String(index + 1).padStart(2, '0')}</span><h3>${step}</h3></article>`).join('\n                ')}
            </div>
        </section>
        <section class="cta-band">
            <h2>Put ${feature.title} into your next build.</h2>
            <p>Download Lux Coder Suite, explore the full feature catalog, or compare it against the tools you already use.</p>
            <div><a class="btn btn-primary" href="download.html">Download Suite</a><a class="btn btn-secondary" href="comparison.html">Compare Systems</a></div>
        </section>`;
}

const pages = {
  'index.html': {
    active: 'home',
    title: 'Lux Coder Suite | Private AI Coding Workspace',
    description: 'Lux Coder Suite is a private AI coding workspace with chat, code, files, apps, LuxWiki, 3D mindmaps, model switching, and verified agent loops.',
    body: `
        ${hero({
          title: 'Build a self&#8209;improving <span>coding system.</span>',
          copy: 'Lux Coder Suite turns chat, code, files, apps, LuxWiki, 3D mindmaps, model switching, and verified loops into one private AI software workspace.',
          actions: [['download.html', 'Download Suite'], ['comparison.html', 'Compare Systems', 'secondary']]
        })}
        ${workflowStrip()}
        ${standoutSection()}
        <section class="section" id="features">
            <div class="section-head">
                <h2>Everything in one private AI workspace.</h2>
                <p>One coherent command center for planning, coding, inspecting, testing, and shipping real software.</p>
            </div>
            ${featureGrid()}
        </section>
        <section class="section split-section" id="comparison">
            <div class="section-head">
                <h2>Compare systems. Choose with confidence.</h2>
                <p>Lux Coder is designed around the whole builder workflow, not one narrow assistant lane.</p>
            </div>
            ${matrix()}
        </section>
        <section class="section media-section" id="agent-integration">
            <div>
                <h2>Lux Agent USB plugs into the coding loop.</h2>
                <p>Connect Lux Agent USB so Lana and the agent team can use the browser, terminal, project scanner, files, and verified harness tools through one approval-controlled bridge.</p>
                <ul class="check-list">
                    <li>Browser control with approval gates</li>
                    <li>Terminal runs and verified command output</li>
                    <li>Project scanner and file context</li>
                    <li>Harness trace and verify tools</li>
                </ul>
                <div class="inline-actions"><a class="btn btn-primary" href="usb.html">Explore Agent USB</a><a class="btn btn-secondary" href="https://luxautomaton-ux.github.io/lux-agent-website/">Open Lux Agent Site</a></div>
            </div>
            <img class="wide-media" src="lux-agent-usb-lana.jpeg" alt="Lana holding Lux Agent USB">
        </section>
        ${bridgeCockpitSection()}
        ${photoRibbon()}
        <section class="section" id="pricing">
            <div class="section-head">
                <h2>Simple pricing. Full control.</h2>
                <p>Start free, upgrade when the workspace is part of your daily build system, or bring Lux into your team.</p>
            </div>
            ${pricingGrid(false)}
        </section>`
  },
  'features.html': {
    active: 'features',
    title: 'Features | Lux Coder Suite',
    description: 'Explore Lux Coder Suite features: AI-native workspace, unified context, agent workflows, verification loops, deployment support, LuxWiki, and more.',
    body: `
        ${pageHeader('Powerful features for modern development.', 'Everything you need to plan, code, test, and ship with confidence from one private AI coding workspace.', 'Feature Stack', ['AI-native workspace', 'Unified context', 'Agent workflows', 'Verification and safety'])}
        ${standoutSection()}
        <section class="section">
            <div class="section-head align-left">
                <h2>Core capabilities.</h2>
                <p>Each capability is designed to reduce context switching and give the agent better project memory.</p>
            </div>
            <div class="capability-list">
                ${[
                  ['Chat and Code', 'Natural language to code and explanations with multi-model support.', 'GPT-4o, Claude 3.5, Gemini'],
                  ['Context Engine', 'Understands your codebase, docs, and project decisions.', 'Embeddings, RAG, graph'],
                  ['Agent Workflows', 'Automate tasks with reusable agent workflows.', 'Builder, triggers, steps'],
                  ['Code Intelligence', 'Refactor, generate tests, fix bugs, and optimize.', 'Refactor, tests, lint'],
                  ['Verification Loops', 'Run, verify, and iterate until confidence is high.', 'Checks, reports, audits'],
                  ['Deploy and Integrate', 'Ship to your stack with integrations and handoff notes.', 'CI/CD, APIs, webhooks']
                ].map(([a,b,c]) => `<article class="capability-row reveal"><h3>${a}</h3><p>${b}</p><span>${c}</span></article>`).join('\n                ')}
            </div>
        </section>
        <section class="section">
            <div class="section-head">
                <h2>Interface gallery.</h2>
                <p>Real Lux Coder Suite surfaces for command center work, source management, and readiness checks.</p>
            </div>
            <div class="gallery-grid">
                <img src="lux-visual-lana-command.png" alt="Lana guiding the Lux Coder command center">
                <img src="lux-visual-model-switcher.png" alt="Model Switcher routing visual">
                <img src="lux-visual-apps-preview.png" alt="Apps Built Preview visual">
                <img src="lux-visual-loops.png" alt="Lux Coder verification loop visual">
            </div>
        </section>
        <section class="section">
            <div class="section-head">
                <h2>From idea to working software.</h2>
                <p>The native developer loop, powered by context, actions, and verification.</p>
            </div>
            ${workflowStrip()}
        </section>
        <section class="cta-band">
            <h2>Ready to build smarter?</h2>
            <p>Download the suite or compare it against the tools you already use.</p>
            <div><a class="btn btn-primary" href="download.html">Download Suite</a><a class="btn btn-secondary" href="comparison.html">Compare Systems</a></div>
        </section>`
  },
  'comparison.html': {
    active: 'comparison',
    title: 'Comparison | Lux Coder vs Codex, Claude Code, Cursor, Antigravity',
    description: 'A transparent feature-by-feature comparison of Lux Coder Suite with major AI coding tools, with focus on context, control, memory, and model choice.',
    body: `
        ${pageHeader('See how Lux Coder Suite compares.', 'Compare features, models, context, pricing posture, and control before you commit your workflow.', 'More models. More context.', ['Unified workspace', 'Agent workflows', 'Verified loops', 'Enterprise-ready'])}
        <section class="section">
            <div class="section-head align-left">
                <h2>Capability matrix.</h2>
                <p>Lux Coder focuses on the complete coding operating system: files, memory, apps, approvals, and delivery.</p>
            </div>
            ${matrix()}
        </section>
        <section class="section">
            <div class="compare-cards">
                ${[
                  ['Codex', 'Powerful agentic coding path, but not a branded Lux workspace.'],
                  ['Claude Code', 'Strong terminal-first coding agent with deep codebase and git workflow support.'],
                  ['Cursor', 'Excellent AI editor experience with agents, rules, plugins, skills, and MCP direction.'],
                  ['Antigravity', 'Agent-first development platform for planning, executing, verifying, and producing artifacts.'],
                  ['Lux Coder Suite', 'A branded, local-first coding command center with memory, apps, workflows, and Lux Agent integration.']
                ].map(([title, text], index) => `<article class="compare-card reveal ${index === 4 ? 'winner' : ''}"><h3>${title}</h3><p>${text}</p></article>`).join('\n                ')}
            </div>
        </section>
        <section class="section media-section">
            <div>
                <h2>Why Lux wins for builders.</h2>
                <p>It keeps your context and workflow together. That matters when you are building actual products, client systems, and repeatable automation.</p>
                <ul class="check-list">
                    <li>Model choice instead of provider lock-in</li>
                    <li>Memory and sources stay near the work</li>
                    <li>App, browser, and file controls in one place</li>
                    <li>Reports and proof for client delivery</li>
                </ul>
            </div>
            <img src="lux-visual-model-switcher.png" alt="Lux Coder model freedom visual">
        </section>
        <section class="cta-band"><h2>Stop renting someone else's workflow.</h2><p>Own your coding command center, choose your models, and keep your memory.</p><div><a class="btn btn-primary" href="download.html">Download Suite</a><a class="btn btn-secondary" href="features.html">Explore Features</a></div></section>`
  },
  'download.html': {
    active: 'download',
    title: 'Download | Lux Coder Suite',
    description: 'Download Lux Coder Suite packages and get started with the private AI coding workspace.',
    body: `
        ${pageHeader('Download Lux Coder Suite.', 'Choose your platform package and get started in minutes. All builds are designed for secure, aligned, and verified work.', 'System requirements', ['Modern macOS, Windows, or Linux', '8GB RAM minimum', '4GB disk space', 'Internet for model providers'])}
        <section class="section">
            <div class="download-grid">
                ${downloadCards.map(([name, desc, href, cta]) => `<article class="download-card reveal"><h2>${name}</h2><p>${desc}</p><a class="btn btn-primary" href="${href}" download>${cta}</a><small>Version 2.3.0</small></article>`).join('\n                ')}
            </div>
        </section>
        <section class="section split-section">
            <div class="command-card">
                <h2>Prefer CLI?</h2>
                <p>Install the lightweight command package when you want terminal-first workflows.</p>
                <div class="copy-line"><code>npm i -g lux-coder-suite</code><button class="copy-btn" data-copy="npm i -g lux-coder-suite">Copy</button></div>
            </div>
            <div class="command-card">
                <h2>Install notes.</h2>
                <ul class="check-list"><li>Keep your provider keys private</li><li>Verify extension permissions</li><li>Run a smoke test before production work</li><li>Use license lookup for seat status</li></ul>
            </div>
        </section>
        <section class="cta-band"><h2>Need help choosing?</h2><p>Compare plans or ask for a custom setup path.</p><div><a class="btn btn-secondary" href="pricing.html">Compare Plans</a><a class="btn btn-primary" href="mailto:sales@luxautomaton.com">Contact Sales</a></div></section>`
  },
  'pricing.html': {
    active: 'pricing',
    title: 'Pricing | Lux Coder Suite',
    description: 'Simple Lux Coder pricing for individuals, teams, agencies, and enterprise deployments.',
    body: `
        ${pageHeader('Simple, transparent pricing.', 'Start free. Upgrade when you are ready. All plans include core features and regular updates.', 'Plan benefits', ['BYOK model control', 'Core workspace features', 'Upgrade when ready', 'Custom enterprise support'])}
        <section class="section">
            ${pricingGrid(true)}
        </section>
        <section class="section">
            <div class="section-head"><h2>Other Lux paths.</h2><p>Pair the coding suite with USB systems, success packs, and custom setup services.</p></div>
            <div class="cards-3">
                <article class="mini-card"><h3>Lux Agent USB</h3><p>Portable private workspace and local-first operating direction.</p><a href="usb.html">Explore USB</a></article>
                <article class="mini-card"><h3>Success Packs</h3><p>Curated setup kits for business launches, automations, and client delivery.</p><a href="packs.html">View Packs</a></article>
                <article class="mini-card"><h3>Custom Buildout</h3><p>Done-for-you setup for agencies and operators with specific workflows.</p><a href="mailto:sales@luxautomaton.com">Contact Sales</a></article>
            </div>
        </section>`
  },
  'coder.html': {
    active: 'home',
    title: 'Lux Coder App | Suite Overview',
    description: 'A focused overview of the Lux Coder app experience: desktop workspace, extension package, workflows, and agent-ready context.',
    body: `
        ${pageHeader('Lux Coder is the builder workspace.', 'Run the coding system as a focused app surface for projects, source context, agent loops, and delivery proof.', 'App modes', ['Desktop workspace', 'VS Code extension package', 'CLI direction', 'Lux Agent bridge'])}
        <section class="section media-section">
            <div>
                <h2>Built for serious build sessions.</h2>
                <p>Keep the conversation, files, model controls, browser tools, benchmarks, and run notes in one durable workspace.</p>
                <ul class="check-list"><li>Chat and code in one flow</li><li>Project and source panels</li><li>Agent readiness meters</li><li>Model and provider controls</li></ul>
            </div>
            <img src="lux-visual-lana-command.png" alt="Lana inside the Lux Coder app command center">
        </section>
        <section class="section"><div class="section-head"><h2>What the app replaces.</h2><p>Less tab juggling. More remembered context.</p></div>${featureGrid()}</section>
        <section class="cta-band"><h2>Install the app package.</h2><p>Start with the VSIX package, then connect your preferred provider keys.</p><div><a class="btn btn-primary" href="download.html">Download Suite</a><a class="btn btn-secondary" href="features.html">See Features</a></div></section>`
  },
  'usb.html': {
    active: 'usb',
    title: 'Lux Agent USB | Portable Private AI Workspace',
    description: 'Lux Agent USB connects Lana and the agent team to browser, terminal, project scanner, files, and verified harness tools through one approval-controlled bridge.',
    body: `
        <section class="page-header visual-page-header">
            <div>
                <h1>Lux Agent USB connects Lana and the agent team.</h1>
                <p>Connect Lux Agent USB so Lana and the agent team can use the browser, terminal, project scanner, files, and verified harness tools through one approval-controlled bridge.</p>
            </div>
            <aside class="context-panel media-context">
                <img class="header-photo" src="lux-agent-usb-lana.jpeg" alt="Lana holding Lux Agent USB">
                <h2>Bridge tools</h2>
                <ul><li>Browser control</li><li>Terminal commands</li><li>Project scanner</li><li>Files and sources</li><li>Verified harness</li></ul>
            </aside>
        </section>
        <section class="section media-section">
            <div>
                <h2>One approval-controlled bridge.</h2>
                <p>Lana can coordinate the agent team across browser previews, terminal commands, project scans, files, and harness verification while the operator stays in charge of every sensitive action.</p>
                <ul class="check-list"><li>Browser use for inspect, click, resize, screenshots, and console checks</li><li>Terminal access for approved commands and build verification</li><li>Project scanner for repos, files, sources, and delivery context</li><li>Lux Harness trace and verify tools for accountable runs</li></ul>
                <div class="inline-actions"><a class="btn btn-primary" href="https://luxautomaton-ux.github.io/lux-agent-website/">Open Lux Agent Site</a><a class="btn btn-secondary" href="pricing.html">View USB Pricing</a></div>
            </div>
            <img class="wide-media" src="lux-agent-usb-lana.jpeg" alt="Lana holding Lux Agent USB">
        </section>
        ${bridgeCockpitSection()}
        ${photoRibbon()}
        <section class="section"><div class="section-head"><h2>USB workflow.</h2><p>Start portable, connect context, and keep the operator in control.</p></div>${workflowStrip()}</section>`
  },
  'packs.html': {
    active: 'pricing',
    title: 'Success Packs | Lux Coder Suite',
    description: 'Extend Lux Coder with curated setup packs for developer tools, cloud workflows, data, security, and client delivery.',
    body: `
        ${pageHeader('Extend with Packs.', 'Add capabilities to your workspace with curated packs for common build and business workflows.', 'How packs work', ['Install once', 'Auto updates', 'Built by experts', 'Safe and verified'])}
        <section class="section">
            <div class="pack-grid">
                ${[
                  ['Dev Tools Pack', '$9/mo', 'Boost your daily developer workflow.'],
                  ['Cloud Pack', '$12/mo', 'Deploy and manage in the cloud.'],
                  ['Data Pack', '$9/mo', 'Work with data and analytics.'],
                  ['Security Pack', '$12/mo', 'Scan, assess, and protect.'],
                  ['Client Delivery Pack', '$15/mo', 'Reports, exports, and handoff systems.'],
                  ['Automation Pack', '$15/mo', 'Connect workflows across apps and approvals.']
                ].map(([name, price, text]) => `<article class="pricing-card reveal"><h3>${name}</h3><div class="price">${price}</div><p>${text}</p><a class="btn btn-secondary" href="mailto:sales@luxautomaton.com?subject=${encodeURIComponent(name)}">Add Pack</a></article>`).join('\n                ')}
            </div>
        </section>
        <section class="cta-band"><h2>Need a custom pack?</h2><p>Lux can assemble a custom workflow for your stack.</p><div><a class="btn btn-primary" href="mailto:sales@luxautomaton.com">Request Custom Pack</a></div></section>`
  },
  'license.html': {
    active: 'pricing',
    title: 'License Lookup | Lux Coder Suite',
    description: 'Look up a Lux Coder Suite license key to review status, plan, seats, and support details.',
    body: `
        ${pageHeader('Lookup your license.', 'Enter your license key to view details, status, and entitlements. This static demo keeps the lookup local in your browser.', 'Where to find your key', ['Purchase confirmation email', 'Dashboard receipt', 'USB setup packet', 'Team owner notes'])}
        <section class="section">
            <div class="form-layout">
                <form class="form-panel" id="license-form">
                    <label for="license-key">License Key</label>
                    <input id="license-key" name="license" value="LUXC-ABCD-EFGH-IJKL" autocomplete="off">
                    <button class="btn btn-primary" type="submit">Lookup License</button>
                </form>
                <aside class="result-panel" id="license-result">
                    <h2>License</h2>
                    <dl><dt>Key</dt><dd>LUXC-ABCD-EFGH-IJKL</dd><dt>Status</dt><dd>Active</dd><dt>Plan</dt><dd>Team</dd><dt>Seats</dt><dd>12 / 25</dd><dt>Valid until</dt><dd>June 30, 2027</dd><dt>Support</dt><dd>Priority</dd></dl>
                </aside>
            </div>
        </section>
        <section class="cta-band"><h2>Issues with your license?</h2><p>Contact support and we will help right away.</p><div><a class="btn btn-secondary" href="mailto:support@luxautomaton.com">Contact Support</a></div></section>`
  },
  'affiliate.html': {
    active: 'partners',
    title: 'Affiliate Program | Lux Coder Suite',
    description: 'Join the Lux Coder affiliate program and earn by referring builders, founders, and agencies to private AI coding workflows.',
    body: `
        ${pageHeader('Earn with Lux Coder Suite.', 'Join our affiliate program and refer serious builders to a private AI coding workspace.', 'Program benefits', ['Recurring commission direction', 'Clear referral path', 'Launch assets', 'Marketing resources'])}
        <section class="section">
            <div class="form-layout">
                <form class="form-panel site-form">
                    <label>Full Name<input name="name" placeholder="Your full name"></label>
                    <label>Email Address<input name="email" type="email" placeholder="you@example.com"></label>
                    <label>Website<input name="website" placeholder="https://yourwebsite.com"></label>
                    <label>Why do you want to join?<textarea name="reason" placeholder="Tell us about your audience."></textarea></label>
                    <button class="btn btn-primary" type="submit">Apply Now</button>
                    <p class="form-status" aria-live="polite"></p>
                </form>
                <aside class="context-panel warm">
                    <h2>How it works</h2>
                    <ol class="number-list"><li>Apply</li><li>Get approved</li><li>Share your link</li><li>Earn monthly</li></ol>
                </aside>
            </div>
        </section>
        <section class="section"><div class="section-head"><h2>Good affiliates understand the product.</h2><p>Start by reviewing the comparison and feature pages before you pitch.</p></div><div class="cards-3"><article class="mini-card"><h3>Developers</h3><p>Show how context, memory, and loops reduce repeated setup.</p></article><article class="mini-card"><h3>Agencies</h3><p>Show branded delivery reports and repeatable client workflows.</p></article><article class="mini-card"><h3>Founders</h3><p>Show faster iteration without surrendering provider control.</p></article></div></section>`
  },
  'partners.html': {
    active: 'partners',
    title: 'Partners | Lux Coder Suite',
    description: 'Partner with Lux Coder Suite for integrations, implementation, training, and private AI coding workflows.',
    body: `
        ${pageHeader('Built with great partners.', 'We collaborate with platforms, agencies, trainers, and implementation teams to power private AI workflows.', 'Become a partner', ['Build integrations', 'Join install network', 'Co-market launches', 'Support operators'])}
        <section class="section">
            <div class="logo-cloud">
                <span>OpenAI</span><span>Anthropic</span><span>AWS</span><span>Vercel</span><span>GitHub</span>
            </div>
        </section>
        <section class="section">
            <div class="cards-3">
                <article class="mini-card"><h3>Integration partners</h3><p>Connect models, storage, automations, and deployment surfaces.</p><a href="mailto:partners@luxautomaton.com">Build with us</a></article>
                <article class="mini-card"><h3>Agency partners</h3><p>Deliver Lux-powered workflows to clients with stronger proof and handoff.</p><a href="affiliate.html">Join affiliate path</a></article>
                <article class="mini-card"><h3>Training partners</h3><p>Teach private AI coding systems with structured packs and examples.</p><a href="mailto:partners@luxautomaton.com">Talk to Lux</a></article>
            </div>
        </section>
        <section class="cta-band"><h2>Ready to build faster with Lux Coder Suite?</h2><p>Join thousands of developers and teams already shipping better software.</p><div><a class="btn btn-primary" href="download.html">Enter Suite</a></div></section>`
  }
};

for (const feature of standoutFeatures) {
  pages[feature.file] = {
    active: 'features',
    title: `${feature.title} | Lux Coder Suite Feature`,
    description: `${feature.title} in Lux Coder Suite: ${feature.text}`,
    body: featureDetailPage(feature)
  };
}

const css = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600&display=swap');

:root {
    color-scheme: dark;
    --bg: #05080d;
    --bg-deep: #020409;
    --surface: rgba(10, 18, 31, 0.76);
    --surface-strong: rgba(14, 25, 42, 0.92);
    --line: rgba(117, 169, 222, 0.20);
    --line-strong: rgba(48, 202, 255, 0.42);
    --text: #f4f8ff;
    --muted: #a9b7ca;
    --dim: #718096;
    --blue: #246bff;
    --cyan: #2bdcff;
    --green: #41f59b;
    --orange: #f5a623;
    --shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
    --radius: 8px;
    --max: 1420px;
    --font: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; background: var(--bg-deep); }
body {
    margin: 0;
    min-height: 100vh;
    font-family: var(--font);
    background-color: var(--bg);
    background-image:
        linear-gradient(180deg, rgba(5, 8, 13, 0.78), var(--bg) 520px),
        url('lux-visual-site-bg.png'),
        radial-gradient(circle at 76% 12%, rgba(36, 107, 255, 0.13), transparent 36%),
        radial-gradient(circle at 16% 26%, rgba(43, 220, 255, 0.10), transparent 34%);
    background-position: center top, center top, 76% 12%, 16% 26%;
    background-repeat: no-repeat;
    background-size: auto, 100% auto, auto, auto;
    color: var(--text);
    line-height: 1.55;
    overflow-x: hidden;
}
body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
        linear-gradient(rgba(43, 220, 255, 0.026) 1px, transparent 1px),
        linear-gradient(90deg, rgba(43, 220, 255, 0.018) 1px, transparent 1px);
    background-size: 88px 88px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,.8), transparent 76%);
    z-index: -1;
    animation: gridDrift 22s linear infinite;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
button, input, textarea { font: inherit; }

#main-header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(3, 7, 13, 0.86);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--line);
}
#main-header.scrolled { box-shadow: 0 10px 42px rgba(0,0,0,.36); }
.nav-shell {
    max-width: var(--max);
    min-height: 70px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 24px;
}
.brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-weight: 800;
    letter-spacing: -0.01em;
    white-space: nowrap;
}
.brand img {
    width: 38px;
    height: 38px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid var(--line-strong);
}
.nav-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(14px, 2.1vw, 34px);
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 0.9rem;
    color: var(--muted);
}
.nav-links a {
    display: inline-flex;
    min-height: 40px;
    align-items: center;
    border-bottom: 2px solid transparent;
}
.nav-links a:hover,
.nav-links a[aria-current='page'] {
    color: var(--text);
    border-color: var(--cyan);
}
.nav-cta, .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0 20px;
    border: 1px solid rgba(78, 147, 255, 0.55);
    border-radius: var(--radius);
    background: rgba(21, 35, 57, 0.72);
    color: var(--text);
    font-weight: 750;
    cursor: pointer;
    transition: transform .18s ease, border-color .18s ease, background .18s ease;
}
.btn:hover, .nav-cta:hover { transform: translateY(-1px); border-color: var(--cyan); }
.btn-primary, .nav-cta {
    background: linear-gradient(135deg, #1b72ff, #2b55ff);
    color: white;
    border-color: rgba(43, 220, 255, 0.58);
    box-shadow: 0 18px 44px rgba(36, 107, 255, 0.24);
}
.btn-secondary { background: rgba(17, 29, 48, 0.86); }
.btn-ghost { background: transparent; }
.nav-toggle { display: none; }

main { position: relative; z-index: 1; }
.hero {
    position: relative;
    overflow: hidden;
    min-height: auto;
    padding: clamp(46px, 5.8vw, 74px) 24px 54px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--line);
}
.hero::before {
    content: '';
    position: absolute;
    inset: -40% -20%;
    pointer-events: none;
    background:
        linear-gradient(115deg, transparent 34%, rgba(43, 220, 255, .14), transparent 58%),
        radial-gradient(circle at 74% 42%, rgba(65, 245, 155, .10), transparent 25%);
    opacity: .62;
    transform: translateX(-18%);
    animation: heroSweep 9s ease-in-out infinite;
}
.hero-compact { min-height: auto; }
.hero-grid {
    position: relative;
    z-index: 1;
    max-width: var(--max);
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(500px, .9fr) minmax(620px, 1.35fr);
    gap: clamp(28px, 4vw, 58px);
    align-items: center;
}
.hero-copy h1,
.page-header h1 {
    margin: 0;
    max-width: 720px;
    font-size: clamp(3rem, 5.2vw, 5rem);
    line-height: .96;
    letter-spacing: 0;
    overflow-wrap: normal;
    word-break: normal;
    font-weight: 900;
}
.page-header h1 { font-size: clamp(2.7rem, 5vw, 5.2rem); max-width: 840px; }
.hero-copy h1 span { color: var(--cyan); }
.hero-copy p,
.page-header p,
.section-head p {
    max-width: 640px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: clamp(1.04rem, 1.4vw, 1.25rem);
}
.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin: 32px 0 22px;
}
.inline-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
}
.trust-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px 18px;
    max-width: 620px;
    color: var(--muted);
}
.trust-row span,
.check-list li {
    position: relative;
    padding-left: 24px;
}
.trust-row span::before,
.check-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: .48em;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--cyan);
    box-shadow: 0 0 14px rgba(43, 220, 255, .7);
}
.hero-product {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(246px, 300px);
    gap: 22px;
    align-items: center;
}
.product-window,
.launch-panel,
.context-panel,
.feature-card,
.mini-card,
.pricing-card,
.download-card,
.command-card,
.form-panel,
.result-panel,
.compare-card {
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: linear-gradient(180deg, rgba(13, 25, 43, 0.84), rgba(6, 13, 24, 0.84));
    box-shadow: var(--shadow);
}
.product-window {
    position: relative;
    overflow: hidden;
    isolation: isolate;
}
.product-window::after {
    content: '';
    position: absolute;
    inset: 42px 0 44px;
    pointer-events: none;
    background: linear-gradient(112deg, transparent 18%, rgba(43, 220, 255, .16), transparent 54%);
    mix-blend-mode: screen;
    transform: translateX(-95%);
    animation: screenScan 6.4s ease-in-out infinite;
    z-index: 2;
}
.window-bar {
    height: 42px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 14px;
    border-bottom: 1px solid var(--line);
    color: var(--dim);
    font-size: .78rem;
}
.window-bar span { width: 10px; height: 10px; border-radius: 50%; background: #ff6b6b; }
.window-bar span:nth-child(2) { background: #ffd166; }
.window-bar span:nth-child(3) { background: #38ef7d; }
.window-bar strong { margin-left: auto; font-weight: 600; color: var(--muted); }
.product-window img {
    aspect-ratio: 16 / 9;
    width: 100%;
    object-fit: cover;
    opacity: .94;
    animation: mediaFloat 8.5s ease-in-out infinite;
}
.preview-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid var(--line);
    color: var(--muted);
    font-size: .84rem;
}
.preview-stats span { padding: 13px 14px; border-right: 1px solid var(--line); }
.preview-stats span:last-child { border-right: 0; }
.launch-panel {
    padding: 26px;
    display: grid;
    gap: 14px;
    text-align: center;
}
.launch-panel img { width: 58px; height: 58px; margin: 0 auto; border-radius: 8px; border: 1px solid var(--line-strong); }
.launch-panel h2 { margin: 4px 0 0; font-size: 1.35rem; }
.launch-panel p { margin: 0; color: var(--muted); }
.launch-panel input,
.form-panel input,
.form-panel textarea {
    width: 100%;
    min-height: 44px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: rgba(1, 5, 12, .78);
    color: var(--text);
    padding: 0 12px;
}
.launch-panel small { color: var(--dim); }

.page-header {
    max-width: var(--max);
    margin: 0 auto;
    padding: 112px 24px 42px;
    display: grid;
    grid-template-columns: 1fr minmax(260px, 420px);
    gap: 42px;
    align-items: end;
}
.context-panel { padding: 26px; }
.context-panel h2 { margin: 0 0 14px; font-size: 1.05rem; }
.context-panel ul,
.check-list,
.pricing-card ul,
.site-footer ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.context-panel li,
.pricing-card li {
    color: var(--muted);
    padding: 7px 0;
    border-bottom: 1px solid rgba(117, 169, 222, .09);
}
.context-panel li:last-child, .pricing-card li:last-child { border-bottom: 0; }
.context-panel.warm { border-color: rgba(245, 166, 35, .34); }
.visual-page-header {
    align-items: center;
}
.media-context {
    display: grid;
    gap: 16px;
}
.media-context .header-photo {
    width: 100%;
    aspect-ratio: 2496 / 912;
    object-fit: cover;
    object-position: center;
    border: 1px solid var(--line);
    border-radius: 6px;
    box-shadow: 0 18px 44px rgba(0,0,0,.28);
}

.section {
    max-width: var(--max);
    margin: 0 auto;
    padding: 70px 24px;
}
.section-head {
    display: grid;
    grid-template-columns: minmax(0, .8fr) minmax(320px, .7fr);
    gap: 28px;
    align-items: end;
    margin-bottom: 28px;
}
.section-head.align-left { display: block; }
.section h2,
.section-head h2,
.cta-band h2 {
    margin: 0;
    font-size: clamp(2rem, 4vw, 4rem);
    line-height: .98;
    letter-spacing: 0;
}
.feature-grid,
.cards-3,
.download-grid,
.pack-grid,
.compare-cards,
.pricing-grid {
    display: grid;
    gap: 16px;
}
.feature-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.cards-3, .download-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.pricing-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.pack-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.compare-cards { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.standout-section {
    padding-top: 50px;
}
.standout-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
}
.standout-card {
    min-height: 250px;
    padding: 24px;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 26px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background:
        linear-gradient(135deg, rgba(43, 220, 255, 0.09), transparent 34%),
        linear-gradient(180deg, rgba(13, 25, 43, 0.92), rgba(6, 13, 24, 0.86));
    box-shadow: var(--shadow);
    position: relative;
    overflow: hidden;
}
.standout-card::after {
    content: '';
    position: absolute;
    left: 24px;
    right: 24px;
    top: 72px;
    height: 1px;
    background: linear-gradient(90deg, var(--cyan), transparent);
    opacity: .55;
}
.standout-index {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 8px;
    border: 1px solid var(--line-strong);
    color: var(--cyan);
    font-family: var(--mono);
    font-size: .82rem;
    background: rgba(43, 220, 255, .08);
}
.standout-card h3 {
    margin: 0 0 8px;
    font-size: clamp(1.55rem, 2.1vw, 2.15rem);
    line-height: 1;
    letter-spacing: 0;
}
.standout-card strong {
    display: block;
    margin-bottom: 14px;
    color: var(--green);
    font-size: .9rem;
    text-transform: uppercase;
    letter-spacing: .06em;
}
.standout-card p {
    margin: 0;
    color: var(--muted);
}
.feature-detail-hero {
    max-width: var(--max);
    margin: 0 auto;
    padding: 104px 24px 42px;
}
.feature-detail-grid {
    display: grid;
    grid-template-columns: minmax(360px, .78fr) minmax(560px, 1.22fr);
    gap: 34px;
    align-items: center;
}
.feature-detail-copy h1 {
    margin: 0;
    font-size: clamp(3rem, 5.4vw, 5.8rem);
    line-height: .94;
    letter-spacing: 0;
    font-weight: 900;
}
.feature-detail-copy p {
    max-width: 680px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: clamp(1.05rem, 1.4vw, 1.24rem);
}
.feature-media {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(230px, .44fr);
    gap: 16px;
    align-items: stretch;
}
.feature-photo,
.animated-graphic {
    min-height: 390px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: linear-gradient(180deg, rgba(13, 25, 43, .9), rgba(4, 9, 18, .92));
    box-shadow: var(--shadow);
}
.feature-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    animation: mediaFloat 9s ease-in-out infinite;
}
.animated-graphic {
    position: relative;
    overflow: hidden;
    display: grid;
    place-items: center;
    isolation: isolate;
}
.animated-graphic::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
        linear-gradient(rgba(43,220,255,.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(43,220,255,.035) 1px, transparent 1px);
    background-size: 34px 34px;
    opacity: .65;
}
.animated-graphic::after {
    content: '';
    position: absolute;
    inset: 14%;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(65,245,155,.13), transparent 62%);
    filter: blur(10px);
    animation: glowOrbit 5.6s ease-in-out infinite;
}
.feature-rail {
    max-width: min(var(--max), calc(100vw - 48px));
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    border: 1px solid var(--line);
    border-radius: var(--radius);
    overflow: hidden;
    background: rgba(5, 12, 22, .86);
}
.feature-rail a {
    min-height: 58px;
    display: grid;
    place-items: center;
    padding: 12px;
    color: var(--muted);
    font-weight: 800;
    text-align: center;
    border-right: 1px solid var(--line);
}
.feature-rail a:last-child { border-right: 0; }
.feature-rail a:hover,
.feature-rail a[aria-current='page'] {
    color: var(--text);
    background: rgba(43, 220, 255, .08);
}
.feature-proof-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
}
.feature-step-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px;
}
.feature-step {
    min-height: 132px;
    padding: 20px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: rgba(7, 15, 27, .78);
}
.feature-step span {
    display: block;
    margin-bottom: 18px;
    color: var(--cyan);
    font-family: var(--mono);
}
.feature-step h3 {
    margin: 0;
    font-size: 1.05rem;
}
.graphic-signal span {
    position: absolute;
    bottom: 86px;
    width: 10px;
    height: 58px;
    border-radius: 999px;
    background: linear-gradient(var(--cyan), var(--blue));
    animation: voicePulse 1.1s ease-in-out infinite;
}
.graphic-signal span:nth-child(1) { left: 24%; animation-delay: 0s; }
.graphic-signal span:nth-child(2) { left: 34%; animation-delay: .12s; }
.graphic-signal span:nth-child(3) { left: 44%; animation-delay: .24s; }
.graphic-signal span:nth-child(4) { left: 54%; animation-delay: .36s; }
.graphic-signal span:nth-child(5) { left: 64%; animation-delay: .48s; }
.signal-core {
    z-index: 1;
    width: 96px;
    height: 96px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--line-strong);
    background: rgba(43,220,255,.08);
    color: var(--text);
    font-weight: 900;
}
.graphic-routing .route-line {
    position: absolute;
    left: 18%;
    right: 18%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--cyan), transparent);
    animation: routeFlow 1.9s linear infinite;
}
.graphic-routing .route-line:nth-child(1) { top: 34%; }
.graphic-routing .route-line:nth-child(2) { top: 50%; animation-delay: .35s; }
.graphic-routing .route-line:nth-child(3) { top: 66%; animation-delay: .7s; }
.graphic-routing span,
.graphic-routing strong {
    z-index: 1;
    padding: 9px 12px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: rgba(5, 12, 22, .92);
}
.graphic-routing span:nth-of-type(1) { position: absolute; left: 10%; top: 28%; }
.graphic-routing span:nth-of-type(2) { position: absolute; left: 10%; top: 44%; }
.graphic-routing span:nth-of-type(3) { position: absolute; left: 10%; top: 60%; }
.graphic-routing strong { position: absolute; right: 12%; top: 45%; color: var(--green); }
.graphic-orbit .orbit-ring {
    position: absolute;
    width: 70%;
    aspect-ratio: 1;
    border: 1px solid rgba(43,220,255,.28);
    border-radius: 50%;
    animation: orbitSpin 8s linear infinite;
}
.graphic-orbit .orbit-ring:nth-child(2) { width: 46%; animation-direction: reverse; }
.graphic-orbit strong {
    z-index: 1;
    color: var(--green);
    font-weight: 900;
}
.node {
    position: absolute;
    z-index: 1;
    padding: 8px 10px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: rgba(5, 12, 22, .9);
    color: var(--muted);
}
.node-a { top: 20%; left: 42%; }
.node-b { top: 46%; right: 12%; }
.node-c { bottom: 18%; left: 38%; }
.node-d { top: 46%; left: 12%; }
.graphic-previews div {
    position: absolute;
    width: 68%;
    height: 38%;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: rgba(14, 25, 42, .94);
    animation: previewLift 3.2s ease-in-out infinite;
}
.graphic-previews div:nth-child(1) { top: 18%; left: 14%; }
.graphic-previews div:nth-child(2) { top: 30%; left: 20%; animation-delay: .25s; }
.graphic-previews div:nth-child(3) { top: 42%; left: 26%; animation-delay: .5s; }
.graphic-previews strong { z-index: 2; margin-top: 190px; color: var(--green); }
.graphic-skills {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    padding: 42px;
}
.graphic-skills span {
    z-index: 1;
    min-height: 58px;
    display: grid;
    place-items: center;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: rgba(43,220,255,.07);
    font-weight: 900;
    animation: skillGlow 2.8s ease-in-out infinite;
}
.graphic-skills span:nth-child(2n) { animation-delay: .35s; }
.graphic-loops {
    grid-template-columns: 1fr;
    align-content: center;
    gap: 10px;
    padding: 34px;
}
.graphic-loops span {
    z-index: 1;
    padding: 12px 14px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: rgba(5,12,22,.88);
    animation: loopStep 3.2s ease-in-out infinite;
}
.graphic-loops span:nth-child(2) { animation-delay: .2s; }
.graphic-loops span:nth-child(3) { animation-delay: .4s; }
.graphic-loops span:nth-child(4) { animation-delay: .6s; }
.graphic-loops span:nth-child(5) { animation-delay: .8s; }
.graphic-loops span:nth-child(6) { animation-delay: 1s; }
@keyframes voicePulse {
    0%, 100% { transform: scaleY(.45); opacity: .55; }
    50% { transform: scaleY(1.35); opacity: 1; }
}
@keyframes routeFlow {
    0% { opacity: .2; transform: translateX(-12px); }
    50% { opacity: 1; }
    100% { opacity: .2; transform: translateX(12px); }
}
@keyframes orbitSpin { to { transform: rotate(360deg); } }
@keyframes previewLift {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}
@keyframes skillGlow {
    0%, 100% { border-color: var(--line); box-shadow: none; }
    50% { border-color: var(--line-strong); box-shadow: 0 0 24px rgba(43,220,255,.18); }
}
@keyframes loopStep {
    0%, 100% { border-color: var(--line); color: var(--muted); }
    50% { border-color: var(--green); color: var(--text); }
}
@keyframes gridDrift {
    to { background-position: 88px 88px, 88px 88px; }
}
@keyframes heroSweep {
    0%, 100% { transform: translateX(-18%) rotate(0deg); opacity: .36; }
    50% { transform: translateX(18%) rotate(2deg); opacity: .78; }
}
@keyframes screenScan {
    0%, 30% { transform: translateX(-95%); opacity: 0; }
    48% { opacity: .72; }
    70%, 100% { transform: translateX(95%); opacity: 0; }
}
@keyframes mediaFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-6px) scale(1.012); }
}
@keyframes glowOrbit {
    0%, 100% { transform: translate3d(-6%, -4%, 0) scale(.86); opacity: .42; }
    50% { transform: translate3d(7%, 5%, 0) scale(1.08); opacity: .78; }
}
.feature-card,
.mini-card,
.download-card,
.command-card,
.compare-card {
    padding: 24px;
}
.feature-card h3,
.mini-card h3,
.download-card h2,
.compare-card h3,
.pricing-card h3 {
    margin: 0 0 10px;
    font-size: 1.1rem;
}
.feature-card p,
.mini-card p,
.download-card p,
.command-card p,
.compare-card p,
.pricing-card p,
.media-section p {
    margin: 0;
    color: var(--muted);
}
.card-icon {
    display: block;
    width: 34px;
    height: 34px;
    margin-bottom: 18px;
    border-radius: 8px;
    border: 1px solid var(--line-strong);
    background: linear-gradient(135deg, rgba(43, 220, 255, .18), rgba(36, 107, 255, .22));
}
.workflow-strip {
    max-width: min(1180px, calc(100vw - 48px));
    margin: -18px auto 36px;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: rgba(5, 12, 22, .84);
    box-shadow: var(--shadow);
    overflow: hidden;
}
.workflow-strip article {
    min-height: 150px;
    padding: 24px;
    border-right: 1px solid var(--line);
}
.workflow-strip article:last-child { border-right: 0; }
.step-index {
    display: block;
    font-family: var(--mono);
    color: var(--cyan);
    font-size: .82rem;
    margin-bottom: 12px;
}
.workflow-strip h3 { margin: 0 0 8px; font-size: 1.15rem; }
.workflow-strip p { margin: 0; color: var(--muted); font-size: .95rem; }

.matrix-wrap {
    overflow-x: auto;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: rgba(5, 12, 22, .82);
}
.matrix-table {
    width: 100%;
    min-width: 1040px;
    border-collapse: collapse;
}
.matrix-table th,
.matrix-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid rgba(117, 169, 222, .12);
    border-right: 1px solid rgba(117, 169, 222, .10);
}
.matrix-table th {
    color: var(--muted);
    font-size: .78rem;
    text-transform: uppercase;
    letter-spacing: .06em;
}
.matrix-table td { color: var(--muted); }
.matrix-table td:first-child { color: var(--text); font-weight: 700; }
.matrix-table .lux-col { color: var(--green); background: rgba(65, 245, 155, .035); }
.compare-card.winner { border-color: rgba(65, 245, 155, .42); }

.media-section {
    display: grid;
    grid-template-columns: minmax(0, .76fr) minmax(420px, 1fr);
    gap: 32px;
    align-items: center;
}
.media-section > img {
    aspect-ratio: 16 / 9;
    width: 100%;
    object-fit: cover;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    background: var(--surface);
    animation: mediaFloat 9s ease-in-out infinite;
}
.media-section > img.wide-media {
    aspect-ratio: 2496 / 912;
    object-position: center;
}
.bridge-cockpit-section {
    max-width: none;
    padding: 82px max(24px, calc((100vw - var(--max)) / 2 + 24px));
    background:
        linear-gradient(180deg, rgba(2,4,9,.40), rgba(2,4,9,.84)),
        url('lux-visual-browser-terminal.png') center / cover no-repeat;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
}
.bridge-cockpit {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(360px, .72fr);
    gap: 18px;
    align-items: stretch;
}
.bridge-stage,
.bridge-control,
.photo-tile {
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: linear-gradient(180deg, rgba(7, 15, 27, .88), rgba(3, 8, 16, .9));
    box-shadow: var(--shadow);
}
.bridge-stage {
    position: relative;
    overflow: hidden;
    min-height: 520px;
    isolation: isolate;
}
.bridge-stage::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        linear-gradient(rgba(43,220,255,.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(43,220,255,.035) 1px, transparent 1px);
    background-size: 42px 42px;
    mix-blend-mode: screen;
    z-index: 2;
}
.bridge-stage img {
    width: 100%;
    height: 100%;
    min-height: 520px;
    object-fit: cover;
    opacity: .88;
    transition: opacity .22s ease, transform .35s ease;
    animation: mediaFloat 10s ease-in-out infinite;
}
.bridge-stage-overlay {
    position: absolute;
    left: 22px;
    right: 22px;
    bottom: 22px;
    z-index: 3;
    display: grid;
    gap: 8px;
    padding: 18px;
    border: 1px solid var(--line-strong);
    border-radius: var(--radius);
    background: rgba(3, 8, 16, .82);
    backdrop-filter: blur(14px);
}
.bridge-stage-overlay strong {
    font-size: clamp(1.25rem, 2vw, 2rem);
    line-height: 1;
}
.bridge-stage-overlay small {
    color: var(--muted);
    font-size: .94rem;
}
.live-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 18px rgba(65,245,155,.75);
}
.bridge-control {
    padding: 18px;
    display: grid;
    gap: 16px;
}
.bridge-tabs {
    display: grid;
    gap: 10px;
}
.bridge-tabs button {
    width: 100%;
    min-height: 70px;
    display: grid;
    gap: 4px;
    text-align: left;
    padding: 14px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    color: var(--text);
    background: rgba(6, 14, 26, .78);
    cursor: pointer;
    transition: border-color .18s ease, background .18s ease, transform .18s ease;
}
.bridge-tabs button:hover,
.bridge-tabs button[aria-selected='true'] {
    border-color: var(--line-strong);
    background: linear-gradient(135deg, rgba(36,107,255,.22), rgba(43,220,255,.08));
    transform: translateY(-1px);
}
.bridge-tabs span {
    font-weight: 850;
}
.bridge-tabs small {
    color: var(--muted);
}
.bridge-view {
    min-height: 220px;
    padding: 20px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: rgba(2, 7, 14, .72);
}
.bridge-view h3 {
    margin: 0 0 10px;
    font-size: clamp(1.45rem, 2vw, 2rem);
}
.bridge-view p {
    margin: 0 0 16px;
    color: var(--muted);
}
.bridge-view ul {
    display: grid;
    gap: 9px;
    margin: 0;
    padding: 0;
    list-style: none;
}
.bridge-view li {
    position: relative;
    padding-left: 22px;
    color: var(--muted);
}
.bridge-view li::before {
    content: '';
    position: absolute;
    left: 0;
    top: .56em;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 14px rgba(65,245,155,.62);
}
.bridge-runner {
    display: grid;
    gap: 12px;
}
.bridge-progress {
    height: 9px;
    border-radius: 999px;
    overflow: hidden;
    background: rgba(117,169,222,.16);
}
.bridge-progress span {
    display: block;
    width: var(--bridge-progress, 22%);
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--cyan), var(--green));
    transition: width .28s ease;
}
.bridge-runner p {
    margin: 0;
    color: var(--muted);
    min-height: 1.5em;
}
.photo-ribbon-section {
    padding-top: 54px;
}
.photo-ribbon {
    display: grid;
    grid-template-columns: 1.25fr .9fr .9fr 1.05fr;
    gap: 14px;
    align-items: stretch;
}
.photo-tile {
    position: relative;
    overflow: hidden;
    min-height: 250px;
}
.photo-tile img {
    width: 100%;
    height: 100%;
    min-height: 250px;
    object-fit: cover;
    transition: transform .45s ease, opacity .25s ease;
}
.photo-tile:hover img {
    transform: scale(1.035);
}
.photo-tile figcaption {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 12px;
    padding: 10px 12px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: rgba(3,8,16,.78);
    color: var(--text);
    font-weight: 800;
    backdrop-filter: blur(12px);
}
.check-list { display: grid; gap: 10px; margin: 22px 0 28px; color: var(--muted); }

.capability-list { display: grid; gap: 10px; }
.capability-row {
    display: grid;
    grid-template-columns: 190px 1fr auto;
    gap: 22px;
    align-items: center;
    padding: 18px 20px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: rgba(7, 15, 27, .76);
}
.capability-row h3, .capability-row p { margin: 0; }
.capability-row p { color: var(--muted); }
.capability-row span {
    color: var(--muted);
    font-family: var(--mono);
    font-size: .78rem;
}
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
}
.gallery-grid img {
    border: 1px solid var(--line);
    border-radius: var(--radius);
    aspect-ratio: 16 / 9;
    object-fit: cover;
    box-shadow: 0 18px 48px rgba(0,0,0,.32);
    animation: mediaFloat 10s ease-in-out infinite;
}
.gallery-grid img:nth-child(2n) { animation-delay: -2.4s; }

.pricing-card {
    padding: 26px;
    display: grid;
    gap: 16px;
}
.pricing-card.featured {
    border-color: var(--line-strong);
    box-shadow: 0 24px 80px rgba(36, 107, 255, .22);
}
.price {
    font-size: clamp(2rem, 3vw, 3.2rem);
    line-height: 1;
    font-weight: 900;
    letter-spacing: 0;
}
.pricing-card .btn { margin-top: auto; }
.billing-toggle {
    width: fit-content;
    margin: 0 auto 24px;
    padding: 4px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: rgba(5, 12, 22, .82);
    display: flex;
    gap: 4px;
}
.billing-toggle button {
    min-height: 38px;
    padding: 0 18px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    font-weight: 700;
}
.billing-toggle button.active {
    background: rgba(43, 220, 255, .12);
    color: var(--text);
}

.download-card small {
    display: block;
    color: var(--dim);
    margin-top: 12px;
}
.split-section,
.form-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
.command-card { display: grid; gap: 16px; }
.copy-line {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    align-items: center;
}
code {
    display: block;
    overflow-x: auto;
    padding: 14px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: rgba(0, 0, 0, .34);
    font-family: var(--mono);
    color: #d8f6ff;
}
.copy-btn {
    min-height: 44px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: rgba(21, 35, 57, .8);
    color: var(--text);
    padding: 0 14px;
}
.form-panel {
    padding: 26px;
    display: grid;
    gap: 14px;
}
.form-panel label {
    display: grid;
    gap: 8px;
    color: var(--muted);
    font-weight: 650;
}
.form-panel textarea {
    min-height: 110px;
    padding-top: 12px;
    resize: vertical;
}
.result-panel {
    padding: 26px;
}
.result-panel h2 { margin-top: 0; }
.result-panel dl {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 8px 18px;
}
.result-panel dt { color: var(--dim); }
.result-panel dd { margin: 0; color: var(--text); }
.form-status { margin: 0; color: var(--green); min-height: 1.4em; }
.number-list { color: var(--muted); display: grid; gap: 12px; margin: 0; padding-left: 20px; }
.logo-cloud {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    border: 1px solid var(--line);
    border-radius: var(--radius);
    overflow: hidden;
}
.logo-cloud span {
    min-height: 116px;
    display: grid;
    place-items: center;
    border-right: 1px solid var(--line);
    color: var(--muted);
    font-size: 1.3rem;
    font-weight: 800;
}
.logo-cloud span:last-child { border-right: 0; }
.mini-card a {
    display: inline-flex;
    margin-top: 18px;
    color: var(--cyan);
    font-weight: 800;
}

.cta-band {
    max-width: var(--max);
    margin: 30px auto 74px;
    padding: 44px 24px;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    text-align: center;
}
.cta-band p {
    max-width: 620px;
    margin: 14px auto 24px;
    color: var(--muted);
}
.cta-band div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
}

.site-footer {
    border-top: 1px solid var(--line);
    background: rgba(2, 4, 9, .76);
    padding: 46px 24px 24px;
}
.footer-grid {
    max-width: var(--max);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr .8fr .8fr;
    gap: 42px;
}
.footer-brand { margin-bottom: 18px; }
.site-footer p,
.site-footer a,
.site-footer li {
    color: var(--muted);
}
.site-footer h3 {
    margin: 0 0 12px;
    font-size: .92rem;
    text-transform: uppercase;
    letter-spacing: .08em;
    color: var(--dim);
}
.site-footer li { margin: 8px 0; }
.site-footer a:hover { color: var(--cyan); }
.footer-bottom {
    max-width: var(--max);
    margin: 34px auto 0;
    padding-top: 18px;
    border-top: 1px solid rgba(117, 169, 222, .12);
    display: flex;
    justify-content: space-between;
    color: var(--dim);
    font-size: .86rem;
}

.reveal { opacity: 0; transform: translateY(18px); transition: opacity .55s ease, transform .55s ease; }
.reveal.visible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: .01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: .01ms !important;
    }
}

@media (max-width: 1100px) {
    .nav-shell { grid-template-columns: auto auto auto; }
    .nav-toggle {
        display: inline-grid;
        gap: 5px;
        width: 42px;
        height: 42px;
        place-content: center;
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: rgba(14, 25, 42, .86);
    }
    .nav-toggle span { width: 18px; height: 2px; background: var(--text); display: block; }
    .nav-links {
        position: absolute;
        top: 70px;
        left: 16px;
        right: 16px;
        display: none;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        padding: 10px;
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: rgba(3, 7, 13, .98);
    }
    .nav-links.open { display: flex; }
    .nav-links a { padding: 12px; border-bottom: 1px solid rgba(117, 169, 222, .1); }
    .hero-grid,
    .page-header,
    .feature-detail-grid,
    .media-section,
    .bridge-cockpit,
    .split-section,
    .form-layout {
        grid-template-columns: 1fr;
    }
    .hero-product { grid-template-columns: 1fr; }
    .feature-media { grid-template-columns: minmax(0, 1fr) minmax(220px, .5fr); }
    .feature-rail { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .feature-proof-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .feature-step-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .feature-grid,
    .standout-grid,
    .pricing-grid,
    .pack-grid,
    .compare-cards,
    .photo-ribbon { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .workflow-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .workflow-strip article { border-bottom: 1px solid var(--line); }
}

@media (max-width: 760px) {
    .nav-shell { padding: 0 14px; gap: 12px; }
    .brand span { max-width: 132px; overflow: hidden; text-overflow: ellipsis; }
    .nav-cta { padding: 0 14px; min-height: 40px; }
    .hero { padding: 42px 18px 24px; min-height: auto; }
    .hero-copy h1 {
        font-size: clamp(2.1rem, 10vw, 2.8rem);
        line-height: 1.02;
        overflow-wrap: anywhere;
    }
    .page-header h1 {
        font-size: clamp(1.72rem, 7.4vw, 2.05rem);
        line-height: 1.02;
        overflow-wrap: anywhere;
    }
    .page-header p {
        font-size: clamp(.96rem, 3.8vw, 1.08rem);
        overflow-wrap: anywhere;
    }
    .feature-detail-hero {
        padding: 76px 18px 30px;
    }
    .feature-detail-copy h1 {
        font-size: clamp(2.15rem, 11vw, 2.95rem);
        line-height: 1.02;
    }
    .feature-media,
    .feature-rail,
    .feature-proof-grid,
    .feature-step-grid,
    .photo-ribbon {
        grid-template-columns: 1fr;
    }
    .bridge-cockpit-section {
        padding: 54px 18px;
    }
    .bridge-stage,
    .bridge-stage img {
        min-height: 320px;
    }
    .bridge-stage-overlay {
        left: 12px;
        right: 12px;
        bottom: 12px;
        padding: 14px;
    }
    .bridge-tabs {
        grid-template-columns: 1fr;
    }
    .photo-tile,
    .photo-tile img {
        min-height: 210px;
    }
    .feature-photo,
    .animated-graphic {
        min-height: 280px;
    }
    .feature-rail a {
        border-right: 0;
        border-bottom: 1px solid var(--line);
    }
    .feature-rail a:last-child { border-bottom: 0; }
    .standout-card {
        min-height: 0;
        padding: 22px;
    }
    .standout-card h3 {
        font-size: 1.55rem;
        overflow-wrap: anywhere;
    }
    .standout-card strong {
        font-size: .76rem;
        letter-spacing: .04em;
        overflow-wrap: anywhere;
    }
    .standout-card p {
        overflow-wrap: anywhere;
    }
    .hero-actions, .inline-actions, .cta-band div { display: grid; }
    .btn { width: 100%; }
    .trust-row,
    .section-head,
    .feature-grid,
    .standout-grid,
    .cards-3,
    .download-grid,
    .pricing-grid,
    .pack-grid,
    .compare-cards,
    .gallery-grid,
    .logo-cloud,
    .workflow-strip,
    .preview-stats,
    .footer-grid {
        grid-template-columns: 1fr;
    }
    .workflow-strip article,
    .logo-cloud span,
    .preview-stats span {
        border-right: 0;
        border-bottom: 1px solid var(--line);
    }
    .section { padding: 48px 18px; }
    .page-header { padding: 76px 18px 28px; }
    .capability-row { grid-template-columns: 1fr; gap: 8px; }
    .copy-line { grid-template-columns: 1fr; }
    .footer-bottom { display: grid; gap: 8px; }
}
`;

const js = `document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    const setScrolled = () => header && header.classList.toggle('scrolled', window.scrollY > 24);
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const revealItems = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add('visible'));
    }

    document.querySelectorAll('.billing-toggle').forEach(toggle => {
        toggle.addEventListener('click', event => {
            const button = event.target.closest('button[data-billing]');
            if (!button) return;
            toggle.querySelectorAll('button').forEach(item => item.classList.remove('active'));
            button.classList.add('active');
            const billing = button.dataset.billing;
            document.querySelectorAll('.price[data-monthly]').forEach(price => {
                price.textContent = billing === 'annual' ? price.dataset.annual : price.dataset.monthly;
            });
        });
    });

    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(button.dataset.copy || '');
                button.textContent = 'Copied';
                setTimeout(() => { button.textContent = 'Copy'; }, 1400);
            } catch {
                button.textContent = 'Select text';
            }
        });
    });

    const licenseForm = document.getElementById('license-form');
    if (licenseForm) {
        licenseForm.addEventListener('submit', event => {
            event.preventDefault();
            const key = licenseForm.querySelector('input').value.trim() || 'LUXC-ABCD-EFGH-IJKL';
            const result = document.getElementById('license-result');
            if (result) {
                result.innerHTML = '<h2>License</h2><dl><dt>Key</dt><dd>' + key.replace(/[<>]/g, '') + '</dd><dt>Status</dt><dd>Active</dd><dt>Plan</dt><dd>Team</dd><dt>Seats</dt><dd>12 / 25</dd><dt>Valid until</dt><dd>June 30, 2027</dd><dt>Support</dt><dd>Priority</dd></dl>';
            }
        });
    }

    document.querySelectorAll('[data-bridge-panel]').forEach(panel => {
        const image = panel.querySelector('[data-bridge-image]');
        const stageLabel = panel.querySelector('[data-bridge-stage-label]');
        const stageStatus = panel.querySelector('[data-bridge-stage-status]');
        const statusLine = panel.querySelector('[data-bridge-status-line]');
        const runButton = panel.querySelector('[data-bridge-run]');
        const tabs = Array.from(panel.querySelectorAll('[data-bridge-tool]'));
        const views = Array.from(panel.querySelectorAll('[data-bridge-view]'));
        let stepIndex = 0;
        const runSteps = [
            'Approval mode: Ask before tool use.',
            'Browser approved: inspect preview and capture proof.',
            'Terminal approved: run command and read output.',
            'Scanner approved: map project files and sources.',
            'Harness approved: trace, verify, and report.'
        ];

        const activateBridgeTool = button => {
            const key = button.dataset.bridgeTool;
            panel.dataset.activeBridge = key;
            tabs.forEach(tab => tab.setAttribute('aria-selected', String(tab === button)));
            views.forEach(view => {
                const isActive = view.dataset.bridgeView === key;
                view.classList.toggle('active', isActive);
                view.hidden = !isActive;
            });
            if (image && button.dataset.bridgeImage) {
                image.style.opacity = '0.35';
                setTimeout(() => {
                    image.src = button.dataset.bridgeImage;
                    image.style.opacity = '';
                }, 120);
            }
            if (stageLabel) stageLabel.textContent = button.querySelector('span')?.textContent || key;
            if (stageStatus) stageStatus.textContent = button.dataset.bridgeStatus || '';
            if (statusLine) statusLine.textContent = 'Selected: ' + (button.querySelector('span')?.textContent || key) + '. Waiting for approval.';
            panel.style.setProperty('--bridge-progress', '22%');
            stepIndex = 0;
        };

        tabs.forEach(button => button.addEventListener('click', () => activateBridgeTool(button)));

        if (runButton && statusLine) {
            runButton.addEventListener('click', () => {
                stepIndex = (stepIndex + 1) % runSteps.length;
                statusLine.textContent = runSteps[stepIndex];
                panel.style.setProperty('--bridge-progress', Math.min(100, 22 + stepIndex * 19) + '%');
                runButton.textContent = stepIndex === runSteps.length - 1 ? 'Loop Complete' : 'Approve Next Step';
            });
        }
    });

    document.querySelectorAll('.site-form').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const status = form.querySelector('.form-status');
            if (status) status.textContent = 'Application saved locally. Email partners@luxautomaton.com to submit.';
        });
    });
});
`;

for (const [file, page] of Object.entries(pages)) {
  writeFileSync(file, layout(page).replace(/[ \t]+$/gm, ''));
}
writeFileSync('style.css', css.replace(/[ \t]+$/gm, ''));
writeFileSync('script.js', js.replace(/[ \t]+$/gm, ''));

console.log(`Remade ${Object.keys(pages).length} pages plus style.css and script.js`);
