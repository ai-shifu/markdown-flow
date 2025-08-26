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
        });
    } else {
        setupLanguageDetection();
        initializePage();
        setupLanguageSwitcher();
    }
})();
