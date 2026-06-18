document.addEventListener('DOMContentLoaded', () => {

    /* ═══════════════════════════════════════════════════
       HEADER SCROLL EFFECT
       ═══════════════════════════════════════════════════ */
    const header = document.getElementById('main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        if (!header) return;
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    /* ═══════════════════════════════════════════════════
       MOBILE NAV TOGGLE
       ═══════════════════════════════════════════════════ */
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            navToggle.classList.toggle('active');
        });
    }

    /* ═══════════════════════════════════════════════════
       SCROLL REVEAL ANIMATION
       ═══════════════════════════════════════════════════ */
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    /* ═══════════════════════════════════════════════════
       BILLING TOGGLE (MONTHLY / ANNUAL)
       ═══════════════════════════════════════════════════ */
    const billingToggles = document.querySelectorAll('.billing-toggle');

    billingToggles.forEach(toggle => {
        const labels = toggle.querySelectorAll('.toggle-label');
        const noteId = toggle.id.replace('billing-toggle-', 'billing-note-');
        const note = document.getElementById(noteId);

        labels.forEach(label => {
            label.addEventListener('click', () => {
                const billing = label.dataset.billing;

                // Update active state on toggle labels
                labels.forEach(l => l.classList.remove('active'));
                label.classList.add('active');

                // Show/hide savings note
                if (note) {
                    if (billing === 'annual') {
                        note.classList.add('visible');
                    } else {
                        note.classList.remove('visible');
                    }
                }

                // Update all pricing displays on the page
                updatePricingDisplay(billing);
            });
        });
    });

    /**
     * Updates all pricing cards to show monthly or annual pricing.
     * Uses data-monthly and data-annual attributes on .pricing-price elements.
     * Also updates CTA button data-billing and data-price-key attributes.
     */
    function updatePricingDisplay(billing) {
        const priceEls = document.querySelectorAll('.pricing-price[data-monthly]');

        priceEls.forEach(priceEl => {
            // Smooth fade transition
            priceEl.classList.add('fade-out');

            setTimeout(() => {
                if (billing === 'annual') {
                    priceEl.innerHTML = priceEl.dataset.annual;
                } else {
                    priceEl.innerHTML = priceEl.dataset.monthly;
                }
                priceEl.classList.remove('fade-out');
            }, 200);
        });

        // Update CTA buttons billing attribute and price keys
        const ctaButtons = document.querySelectorAll('.btn-pricing-cta[data-billing]');
        ctaButtons.forEach(btn => {
            const currentKey = btn.dataset.priceKey;
            if (!currentKey) return;

            // Only update coder subscription buttons (not packs/usb/setup)
            if (!currentKey.startsWith('coder_')) return;

            // Swap _monthly/_annual suffix
            const baseKey = currentKey.replace(/_monthly$/, '').replace(/_annual$/, '');
            btn.dataset.priceKey = baseKey + '_' + billing;
            btn.dataset.billing = billing;
        });
    }

    /* ═══════════════════════════════════════════════════
       STRIPE CHECKOUT REDIRECT
       ═══════════════════════════════════════════════════ */

    // Stripe test mode price ID map
    // In production, replace these with real Stripe Price IDs
    const STRIPE_PRICE_MAP = {
        // Coder subscriptions — monthly
        'coder_solo_monthly': 'price_test_solo_monthly',
        'coder_pro_monthly': 'price_test_pro_monthly',
        'coder_team_monthly': 'price_test_team_monthly',
        'coder_enterprise_monthly': null, // Contact sales

        // Coder subscriptions — annual
        'coder_solo_annual': 'price_test_solo_annual',
        'coder_pro_annual': 'price_test_pro_annual',
        'coder_team_annual': 'price_test_team_annual',
        'coder_enterprise_annual': null, // Contact sales

        // USB products (one-time)
        'usb_starter': 'price_test_usb_starter',
        'usb_offline': 'price_test_usb_offline',
        'usb_pro': 'price_test_usb_pro',

        // Success Packs (one-time)
        'pack_starter': 'price_test_pack_starter',
        'pack_pro': 'price_test_pack_pro',
        'pack_custom': 'price_test_pack_custom',

        // Setup services (one-time)
        'setup_lite': 'price_test_setup_lite',
        'setup_business': 'price_test_setup_business',
        'setup_dfy': 'price_test_setup_dfy'
    };

    // Get the Stripe publishable key from a data attribute on body
    // e.g. <body data-stripe-key="pk_test_...">
    const stripePublishableKey = document.body.dataset.stripeKey || 'pk_test_placeholder';

    // Success/cancel URLs for Stripe Checkout redirect
    const currentOrigin = window.location.origin;
    const successUrl = currentOrigin + '/success.html?session_id={CHECKOUT_SESSION_ID}';
    const cancelUrl = window.location.href;

    const ctaBtns = document.querySelectorAll('.btn-pricing-cta');

    ctaBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const priceKey = btn.dataset.priceKey;
            const plan = btn.dataset.plan;
            const billing = btn.dataset.billing || 'one-time';

            // Enterprise / Contact Sales — redirect to contact
            if (priceKey && priceKey.includes('enterprise')) {
                window.location.href = 'mailto:sales@luxautomaton.com?subject=' +
                    encodeURIComponent('Enterprise Inquiry: ' + plan);
                return;
            }

            // Custom setup — redirect to contact
            if (priceKey === 'setup_dfy' || priceKey === 'pack_custom') {
                window.location.href = 'mailto:sales@luxautomaton.com?subject=' +
                    encodeURIComponent('Custom Inquiry: ' + plan);
                return;
            }

            // Look up the Stripe Price ID
            const stripePriceId = STRIPE_PRICE_MAP[priceKey];

            if (!stripePriceId) {
                console.warn('No Stripe price ID found for key:', priceKey);
                alert('This plan is not yet available for online checkout. Please contact sales@luxautomaton.com.');
                return;
            }

            // Determine if this is a subscription or one-time payment
            const isSubscription = priceKey.startsWith('coder_');
            const mode = isSubscription ? 'subscription' : 'payment';

            // Redirect to Stripe Checkout
            // In production, you'd create a Checkout Session server-side.
            // For static sites in test mode, we build the redirect URL directly.
            const checkoutUrl = 'https://checkout.stripe.com/pay/' + stripePriceId +
                '?mode=' + mode +
                '&success_url=' + encodeURIComponent(successUrl) +
                '&cancel_url=' + encodeURIComponent(cancelUrl);

            // Show loading state on button
            const originalText = btn.textContent;
            btn.textContent = 'Redirecting to Stripe...';
            btn.disabled = true;

            // Small delay for visual feedback before redirect
            setTimeout(() => {
                window.location.href = checkoutUrl;

                // Reset button in case redirect is blocked
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 3000);
            }, 400);
        });
    });

    /* ═══════════════════════════════════════════════════
       COMPARISON MATRIX TABS
       ═══════════════════════════════════════════════════ */
    const matrixTabs = document.querySelectorAll('.matrix-tab');
    const matrixCards = document.querySelectorAll('.matrix-card');

    matrixTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            matrixTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetId = tab.dataset.target;
            matrixCards.forEach(card => {
                if (card.id === targetId) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });
    });

    /* ═══════════════════════════════════════════════════
       SKILLS ACCORDION
       ═══════════════════════════════════════════════════ */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;

            if (item.classList.contains('active')) {
                item.classList.remove('active');
                content.style.maxHeight = '0';
            } else {
                // Close all others
                document.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.accordion-content').style.maxHeight = '0';
                });

                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    /* ═══════════════════════════════════════════════════
       SMOOTH SCROLL FOR ANCHOR LINKS
       ═══════════════════════════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefVal = this.getAttribute('href');
            if (hrefVal === '#') return;
            
            const target = document.querySelector(hrefVal);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Close mobile nav if open
                if (navLinks && navLinks.classList.contains('mobile-active')) {
                    navLinks.classList.remove('mobile-active');
                    if (navToggle) navToggle.classList.remove('active');
                }
            }
        });
    });

    /* ═══════════════════════════════════════════════════
       PARALLAX EFFECT ON HERO IMAGE
       ═══════════════════════════════════════════════════ */
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(${scrolled * 0.08}px)`;
            }
        }, { passive: true });
    }

    /* ═══════════════════════════════════════════════════
       GALLERY DRAG-TO-SCROLL
       ═══════════════════════════════════════════════════ */
    const galleryScroll = document.querySelector('.gallery-scroll');
    if (galleryScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;

        galleryScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            galleryScroll.style.cursor = 'grabbing';
            startX = e.pageX - galleryScroll.offsetLeft;
            scrollLeft = galleryScroll.scrollLeft;
        });

        galleryScroll.addEventListener('mouseleave', () => {
            isDown = false;
            galleryScroll.style.cursor = '';
        });

        galleryScroll.addEventListener('mouseup', () => {
            isDown = false;
            galleryScroll.style.cursor = '';
        });

        galleryScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - galleryScroll.offsetLeft;
            const walk = (x - startX) * 1.5;
            galleryScroll.scrollLeft = scrollLeft - walk;
        });
    }

    /* ═══════════════════════════════════════════════════
       COUNTER ANIMATION FOR HERO STATS
       ═══════════════════════════════════════════════════ */
    const animateCounters = () => {
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            const text = stat.textContent;
            const num = parseInt(text);
            if (!isNaN(num) && num > 0 && !stat.dataset.animated) {
                stat.dataset.animated = 'true';
                let current = 0;
                const step = Math.ceil(num / 40);
                const suffix = text.replace(/[0-9]/g, '');
                const interval = setInterval(() => {
                    current += step;
                    if (current >= num) {
                        current = num;
                        clearInterval(interval);
                    }
                    stat.textContent = current + suffix;
                }, 30);
            }
        });
    };

    // Trigger counter animation when hero is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(animateCounters, 500);
                heroObserver.disconnect();
            }
        });
        heroObserver.observe(heroSection);
    }

    /* ═══════════════════════════════════════════════════
       AFFILIATE APPLICATION FORM INTERCEPT
       ═══════════════════════════════════════════════════ */
    const affiliateForm = document.getElementById('affiliate-application-form');
    const affiliateSuccessMsg = document.getElementById('affiliate-success-msg');
    
    if (affiliateForm && affiliateSuccessMsg) {
        affiliateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = affiliateForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Submitting application...';
            submitBtn.disabled = true;

            setTimeout(() => {
                affiliateForm.style.display = 'none';
                affiliateSuccessMsg.style.display = 'block';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    /* ═══════════════════════════════════════════════════
       PARTNER APPLICATION FORM INTERCEPT
       ═══════════════════════════════════════════════════ */
    const partnerForm = document.getElementById('partner-application-form');
    const partnerSuccessMsg = document.getElementById('partner-success-msg');
    
    if (partnerForm && partnerSuccessMsg) {
        partnerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = partnerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending credentials...';
            submitBtn.disabled = true;

            setTimeout(() => {
                partnerForm.style.display = 'none';
                partnerSuccessMsg.style.display = 'block';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    /* ═══════════════════════════════════════════════════
       LICENSE LOOKUP PORTAL SIMULATION
       ═══════════════════════════════════════════════════ */
    const lookupForm = document.getElementById('license-lookup-form');
    const lookupLoading = document.getElementById('lookup-loading');
    const lookupResults = document.getElementById('lookup-results');
    const lookupError = document.getElementById('lookup-error');
    const displayEmail = document.getElementById('display-user-email');
    const stripePortalBtn = document.getElementById('btn-stripe-portal');

    if (lookupForm) {
        lookupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('lookup-email').value.trim();

            if (!emailInput) return;

            // Hide previous panels
            if (lookupResults) lookupResults.style.display = 'none';
            if (lookupError) lookupError.style.display = 'none';
            if (lookupLoading) lookupLoading.style.display = 'block';

            setTimeout(() => {
                if (lookupLoading) lookupLoading.style.display = 'none';

                // Check for testing: If email contains "fail" or "error", simulate no subscription found.
                // Otherwise, show active mock licenses.
                if (emailInput.toLowerCase().includes('fail') || emailInput.toLowerCase().includes('error')) {
                    if (lookupError) {
                        const emailPlaceholder = document.getElementById('error-email-placeholder');
                        if (emailPlaceholder) emailPlaceholder.textContent = emailInput;
                        lookupError.style.display = 'block';
                    }
                } else {
                    if (lookupResults) {
                        if (displayEmail) displayEmail.textContent = emailInput;
                        lookupResults.style.display = 'block';
                    }
                }
            }, 1000);
        });
    }

    if (stripePortalBtn) {
        stripePortalBtn.addEventListener('click', () => {
            const emailText = displayEmail ? displayEmail.textContent : "user@example.com";
            alert(`[SIMULATION] Redirecting to Stripe Customer Billing Portal for client: ${emailText}\n\nHere they can review subscription cycles, update cards, and download invoices.`);
        });
    }
    /* ═══════════════════════════════════════════════════
       PODCAST PLAYER
       ═══════════════════════════════════════════════════ */
    const podcastAudio = document.getElementById('podcast-audio');
    const podcastPlayBtn = document.getElementById('podcast-play-btn');
    const podcastProgress = document.getElementById('podcast-progress');
    const podcastCurrent = document.getElementById('podcast-current');
    const podcastDuration = document.getElementById('podcast-duration');

    if (podcastAudio) {
        podcastAudio.addEventListener('loadedmetadata', () => {
            if (podcastDuration) podcastDuration.textContent = formatTime(podcastAudio.duration);
        });

        podcastAudio.addEventListener('timeupdate', () => {
            if (podcastProgress) {
                const pct = (podcastAudio.currentTime / podcastAudio.duration) * 100;
                podcastProgress.style.width = pct + '%';
            }
            if (podcastCurrent) podcastCurrent.textContent = formatTime(podcastAudio.currentTime);
        });

        podcastAudio.addEventListener('ended', () => {
            if (podcastPlayBtn) podcastPlayBtn.textContent = '▶';
        });
    }

    function formatTime(s) {
        if (!s || isNaN(s)) return '0:00';
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return m + ':' + (sec < 10 ? '0' : '') + sec;
    }

    /* ═══════════════════════════════════════════════════
       PODCAST RESPONSIVE GRID
       ═══════════════════════════════════════════════════ */
    const podcastGrid = document.querySelector('#podcast > div[style*="grid-template-columns"]');
    if (podcastGrid) {
        const mql = window.matchMedia('(max-width: 768px)');
        function handlePodcastResize(e) {
            podcastGrid.style.gridTemplateColumns = e.matches ? '1fr' : '1fr 1fr';
        }
        mql.addEventListener('change', handlePodcastResize);
        handlePodcastResize(mql);
    }

});

/* ═══════════════════════════════════════════════════
   GLOBAL PODCAST FUNCTIONS (outside DOMContentLoaded)
   ═══════════════════════════════════════════════════ */
function togglePodcast() {
    const audio = document.getElementById('podcast-audio');
    const btn = document.getElementById('podcast-play-btn');
    if (!audio) return;
    if (audio.paused) {
        audio.play();
        if (btn) btn.textContent = '⏸';
    } else {
        audio.pause();
        if (btn) btn.textContent = '▶';
    }
}

function seekPodcast(e) {
    const audio = document.getElementById('podcast-audio');
    const bar = document.getElementById('podcast-progress-bar');
    if (!audio || !bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
}
