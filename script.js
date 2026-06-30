document.addEventListener('DOMContentLoaded', () => {
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
