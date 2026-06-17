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
       PRICING TOGGLE
       ═══════════════════════════════════════════════════ */
    const toggleBtns = document.querySelectorAll('.pricing-toggle button');
    const monthlyPriceEl = document.getElementById('monthly-price');
    const annualPriceEl = document.getElementById('annual-price');
    const lifetimePriceEl = document.getElementById('lifetime-price');

    let billingInterval = 'annual';

    if (toggleBtns.length > 0) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                billingInterval = btn.dataset.interval;

                if (billingInterval === 'monthly') {
                    if (monthlyPriceEl) monthlyPriceEl.innerHTML = '$20 <span>/ month</span>';
                    if (annualPriceEl) annualPriceEl.innerHTML = '$15 <span>/ month</span>';
                    if (lifetimePriceEl) lifetimePriceEl.innerHTML = '$300 <span>one-time</span>';
                } else {
                    if (monthlyPriceEl) monthlyPriceEl.innerHTML = '$240 <span>/ year</span>';
                    if (annualPriceEl) annualPriceEl.innerHTML = '$149 <span>/ year</span>';
                    if (lifetimePriceEl) lifetimePriceEl.innerHTML = '$300 <span>one-time</span>';
                }
            });
        });
    }

    /* ═══════════════════════════════════════════════════
       CHECKOUT MODAL & STRIPE ACTION REDIRECTS
       ═══════════════════════════════════════════════════ */
    const modal = document.getElementById('checkout-modal');
    const ctaBtns = document.querySelectorAll('.btn-pricing-cta');
    const closeBtn = document.querySelector('.modal-close');
    const payBtn = document.getElementById('btn-pay-simulate');
    const checkoutSuccess = document.getElementById('checkout-success');
    const checkoutForm = document.getElementById('checkout-form');
    const planName = document.getElementById('checkout-plan-name');
    const licenseKeyText = document.getElementById('license-key');

    // Handle checkout buttons
    ctaBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plan = btn.dataset.plan;
            const priceKey = btn.dataset.priceKey;

            // If we are not on index.html (meaning checkout modal isn't present), redirect to index.html
            if (!modal) {
                e.preventDefault();
                window.location.href = `index.html?plan=${encodeURIComponent(plan)}&price_key=${encodeURIComponent(priceKey)}`;
                return;
            }

            // Otherwise, trigger the local pricing modal
            planName.textContent = plan + ` Plan (${billingInterval.toUpperCase()})`;
            modal.classList.add('active');
            checkoutForm.style.display = 'block';
            checkoutSuccess.style.display = 'none';
        });
    });

    // Auto-open modal on pricing.html load if parameters are present
    if (modal) {
        const urlParams = new URLSearchParams(window.location.search);
        const autoPlan = urlParams.get('plan');
        const autoPriceKey = urlParams.get('price_key');

        if (autoPlan && autoPriceKey) {
            planName.textContent = decodeURIComponent(autoPlan) + ` Plan (ANNUAL)`;
            modal.classList.add('active');
            checkoutForm.style.display = 'block';
            checkoutSuccess.style.display = 'none';
        }
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) {
            modal.classList.remove('active');
        }
    });

    if (payBtn) {
        payBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Animate button
            payBtn.textContent = 'Processing...';
            payBtn.disabled = true;

            setTimeout(() => {
                if (checkoutForm) checkoutForm.style.display = 'none';
                if (checkoutSuccess) checkoutSuccess.style.display = 'block';
                payBtn.textContent = 'Complete Purchase';
                payBtn.disabled = false;

                // Generate license key
                const segments = Array.from({ length: 3 }, () =>
                    Math.random().toString(36).substring(2, 7).toUpperCase()
                );
                if (licenseKeyText) {
                    licenseKeyText.textContent = `LUX-${segments[0]}-${segments[1]}-${segments[2]}-ZEN`;
                }
            }, 1200);
        });
    }

    /* ═══════════════════════════════════════════════════
       COPY LICENSE KEY
       ═══════════════════════════════════════════════════ */
    const copyLicenseBtn = document.getElementById('btn-copy-license');
    if (copyLicenseBtn && licenseKeyText) {
        copyLicenseBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(licenseKeyText.textContent).then(() => {
                const original = copyLicenseBtn.textContent;
                copyLicenseBtn.textContent = 'Copied!';
                copyLicenseBtn.style.color = '#34d399';
                setTimeout(() => {
                    copyLicenseBtn.textContent = original;
                    copyLicenseBtn.style.color = '';
                }, 2000);
            });
        });
    }

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
