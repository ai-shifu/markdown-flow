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
        if (heroTitle) {
            heroTitle.textContent = t.hero.title;
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

        // Update examples section
        const examplesTitle = document.querySelector('.api-section h3');
        if (examplesTitle) {
            examplesTitle.textContent = t.examples.title;
        }

        const exampleItems = document.querySelectorAll('.example-item');
        exampleItems.forEach((item, index) => {
            if (t.examples.items[index]) {
                const title = item.querySelector('h4');
                const code = item.querySelector('code');

                if (title) title.textContent = t.examples.items[index].title;
                if (code) code.textContent = t.examples.items[index].code;
            }
        });

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
                return;
            }

            // Save detected language
            localStorage.setItem(STORAGE_KEY, currentLang);
        } else if (savedLanguage !== currentLang) {
            // User previously chose a different language, redirect
            const targetUrl = savedLanguage === 'zh' ? '/zh/' : '/';
            window.location.href = targetUrl;
            return;
        }
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
            setupLanguageDetection();
            initializePage();
            setupLanguageSwitcher();
            initializeAnimations();
        });
    } else {
        setupLanguageDetection();
        initializePage();
        setupLanguageSwitcher();
        initializeAnimations();
    }

    // Animation enhancements
    function initializeAnimations() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Skip animation setup if user prefers reduced motion
            return;
        }

        // Setup intersection observer for scroll animations
        setupScrollAnimations();

        // Add ripple effect to buttons
        setupRippleEffects();

        // Initialize typewriter effect
        initializeTypewriter();

        // Remove skeleton loading from code examples after content loads
        setTimeout(removeSkeletonLoading, 1000);
    }

    function setupScrollAnimations() {
        // Create intersection observer for reveal animations
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
                // Don't interfere with navigation
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                // Create ripple element
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

        // Add ripple animation keyframes to document if not already present
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
        const typewriterElement = document.querySelector('.typewriter');
        if (typewriterElement) {
            // Get the text content
            const text = typewriterElement.textContent;

            // Clear the content initially
            typewriterElement.textContent = '';
            typewriterElement.style.width = 'auto';

            // Start typewriter effect after a short delay
            setTimeout(() => {
                let charIndex = 0;
                const typeInterval = setInterval(() => {
                    if (charIndex < text.length) {
                        typewriterElement.textContent += text[charIndex];
                        charIndex++;
                    } else {
                        clearInterval(typeInterval);
                        // Remove cursor after typing is complete
                        setTimeout(() => {
                            typewriterElement.style.borderRight = 'none';
                        }, 2000);
                    }
                }, 50); // Adjust typing speed
            }, 500);
        }
    }

    function removeSkeletonLoading() {
        // Remove skeleton class and add actual content
        document.querySelectorAll('.skeleton').forEach(element => {
            element.classList.remove('skeleton');
        });
    }

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add performance optimization for animations
    function optimizeAnimationPerformance() {
        // Add will-change property to animated elements when they're about to animate
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
