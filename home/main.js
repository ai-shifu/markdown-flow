(function() {
    const STORAGE_KEY = 'markdownflow_language';

    function detectLanguage() {
        const path = window.location.pathname;
        if (path.startsWith('/zh/')) {
            return 'zh';
        }
        return 'en';
    }

    function initializePage() {
        const currentLang = detectLanguage();
        const t = translations[currentLang];

        // Update document title and lang attribute
        document.title = t.title;
        document.documentElement.lang = t.lang;

        // Update navigation
        const languageSwitcher = document.getElementById('language-switcher');
        if (languageSwitcher) {
            languageSwitcher.textContent = t.languageSwitcher;
            languageSwitcher.href = t.languageSwitcherUrl;
        }

        const docsLink = document.querySelector('.github-link[href*="docs"]');
        if (docsLink) {
            docsLink.textContent = t.navigation.documentation;
            docsLink.href = currentLang === 'zh' ? '/docs/zh/' : '/docs/';
        }

        const playgroundLink = document.querySelector('.playground-link');
        if (playgroundLink) {
            playgroundLink.textContent = t.navigation.playground;
        }

        // Update hero section
        const heroTitle = document.querySelector('.hero h2');
        if (heroTitle && t.hero && t.hero.title) {
            // Save text for typewriter effect
            heroTitle.setAttribute('data-text', t.hero.title);

            // Set content directly if not a typewriter element
            if (!heroTitle.classList.contains('typewriter')) {
                heroTitle.textContent = t.hero.title;
            }
        }

        const heroDescription = document.querySelector('.hero p');
        if (heroDescription) {
            heroDescription.innerHTML = t.hero.description;
        }

        // Update features
        const features = document.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            if (t.features[index]) {
                const icon = feature.querySelector('.feature-icon');
                const title = feature.querySelector('h3');
                const description = feature.querySelector('p');

                if (icon) icon.textContent = t.features[index].icon;
                if (title) title.textContent = t.features[index].title;
                if (description) description.textContent = t.features[index].description;
            }
        });

        // Update playground section
        const playgroundCta = document.querySelector('.playground-section .playground-cta');
        if (playgroundCta) {
            playgroundCta.innerHTML = t.playground.cta;
        }

        const playgroundSubtext = document.querySelector('.playground-section .playground-subtext');
        if (playgroundSubtext) {
            playgroundSubtext.textContent = t.playground.subtext;
        }

        // Update projects section
        const projectsTitle = document.querySelector('.api-section:last-of-type h3');
        if (projectsTitle) {
            projectsTitle.textContent = t.projects.title;
        }

        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            if (t.projects.items[index]) {
                const name = card.querySelector('.project-name');
                const type = card.querySelector('.project-type');
                const description = card.querySelector('.project-description');

                if (name) name.textContent = t.projects.items[index].name;
                if (type) {
                    type.textContent = t.projects.items[index].type;
                    type.className = `project-type ${t.projects.items[index].typeClass}`;
                }
                if (description) description.textContent = t.projects.items[index].description;
            }
        });

        // Update footer
        const footer = document.querySelector('footer p');
        if (footer) {
            footer.textContent = t.footer;
        }
    }

    function setupLanguageDetection() {
        const currentLang = detectLanguage();
        const savedLanguage = localStorage.getItem(STORAGE_KEY);

        if (!savedLanguage) {
            // First time visitor - detect browser language
            const browserLang = navigator.language || navigator.languages[0];
            const isChineseUser = browserLang.startsWith('zh');

            // Auto-redirect Chinese users to Chinese version if they're on English page
            if (isChineseUser && currentLang !== 'zh') {
                localStorage.setItem(STORAGE_KEY, 'zh');
                window.location.href = '/zh/';
                return false; // Redirect will happen
            }

            // Save detected language
            localStorage.setItem(STORAGE_KEY, currentLang);
        } else if (savedLanguage !== currentLang) {
            // User previously chose a different language, redirect
            const targetUrl = savedLanguage === 'zh' ? '/zh/' : '/';
            window.location.href = targetUrl;
            return false; // Redirect will happen
        }

        return true; // No redirect needed
    }

    function setupLanguageSwitcher() {
        const languageSwitcher = document.getElementById('language-switcher');
        if (languageSwitcher) {
            languageSwitcher.addEventListener('click', function(e) {
                e.preventDefault();
                const currentLang = detectLanguage();
                const targetLang = currentLang === 'en' ? 'zh' : 'en';
                const targetUrl = targetLang === 'zh' ? '/zh/' : '/';

                localStorage.setItem(STORAGE_KEY, targetLang);

                // Add smooth transition effect
                document.body.style.opacity = '0.8';
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 150);
            });
        }
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            const shouldProceed = setupLanguageDetection();
            if (shouldProceed) {
                initializePage();
                setupLanguageSwitcher();
                initializeAnimations();
            }
        });
    } else {
        const shouldProceed = setupLanguageDetection();
        if (shouldProceed) {
            initializePage();
            setupLanguageSwitcher();
            initializeAnimations();
        }
    }

    function initializeAnimations() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            return;
        }

        setupScrollAnimations();
        setupRippleEffects();
        initializeTypewriter();

        // Remove skeleton loading after content loads
        setTimeout(removeSkeletonLoading, 1000);
    }

    function setupScrollAnimations() {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Add staggered delay for multiple elements
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements with reveal classes
        document.querySelectorAll('.reveal, .scale-reveal, .code-reveal').forEach(element => {
            revealObserver.observe(element);
        });
    }

    function setupRippleEffects() {
        document.querySelectorAll('.ripple').forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                `;

                this.appendChild(ripple);

                // Remove ripple after animation
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });

        // Add ripple animation keyframes if not present
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    function initializeTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        if (typewriterElements.length === 0) {
            return;
        }

        // Process each typewriter element
        typewriterElements.forEach((typewriterElement, index) => {
            // Get text from data attribute or current content
            let text = typewriterElement.getAttribute('data-text');
            if (!text) {
                text = typewriterElement.textContent.trim();
            }

            if (!text || text.length === 0 || text === 'undefined') {
                return;
            }

            // Clear content and keep cursor blinking
            typewriterElement.textContent = '';

            // Force visibility (fixes fade-in-up animation conflict)
            typewriterElement.style.opacity = '1';
            typewriterElement.style.transform = 'translateY(0)';

            // Start typewriter effect after delay
            setTimeout(() => {
                let charIndex = 0;
                // Detect language and adjust typing speed
                const isChinesePage = document.documentElement.lang === 'zh';
                const typingSpeed = isChinesePage ? 100 : 50; // Chinese: 100ms, English: 50ms

                const typeInterval = setInterval(() => {
                    if (charIndex < text.length) {
                        typewriterElement.textContent += text[charIndex];
                        charIndex++;
                    } else {
                        clearInterval(typeInterval);
                        // Remove cursor immediately after completion
                        typewriterElement.classList.add('typing-complete');
                    }
                }, typingSpeed); // Dynamic typing speed based on language
            }, 500 + (index * 300)); // Stagger multiple typewriters
        });
    }

    function removeSkeletonLoading() {
        document.querySelectorAll('.skeleton').forEach(element => {
            element.classList.remove('skeleton');
        });
    }

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Performance optimization for animations
    function optimizeAnimationPerformance() {
        const animatedElements = document.querySelectorAll('.reveal, .scale-reveal, .code-reveal');

        const performanceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.willChange = 'transform, opacity';
                } else {
                    entry.target.style.willChange = 'auto';
                }
            });
        }, {
            rootMargin: '100px 0px'
        });

        animatedElements.forEach(element => {
            performanceObserver.observe(element);
        });
    }

    // Initialize performance optimizations
    setTimeout(optimizeAnimationPerformance, 100);
})();
