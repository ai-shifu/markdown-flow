// Force Mermaid initialization and rendering
(function() {
    function initMermaid() {
        if (typeof mermaid === 'undefined') {
            setTimeout(initMermaid, 100);
            return;
        }

        // Configure mermaid
        mermaid.initialize({
            startOnLoad: false,  // We'll manually trigger
            theme: 'default',
            securityLevel: 'loose',
            fontFamily: 'Roboto, sans-serif',
            flowchart: {
                htmlLabels: true,
                curve: 'basis'
            }
        });

        // Find and render all mermaid diagrams
        renderMermaidDiagrams();
    }

    function renderMermaidDiagrams() {
        const mermaidElements = document.querySelectorAll('.mermaid');
        mermaidElements.forEach(function(element, index) {
            if (!element.hasAttribute('data-processed')) {
                const graphDefinition = element.textContent.trim();
                const graphId = 'mermaid-' + index + '-' + Date.now();

                try {
                    mermaid.render(graphId, graphDefinition, function(svgCode) {
                        element.innerHTML = svgCode;
                        element.setAttribute('data-processed', 'true');
                    });
                } catch (error) {
                    console.error('Mermaid rendering error:', error);
                }
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMermaid);
    } else {
        initMermaid();
    }

    // Handle instant loading navigation
    document.addEventListener('DOMContentLoaded', function() {
        const observer = new MutationObserver(function() {
            setTimeout(renderMermaidDiagrams, 100);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
})();
