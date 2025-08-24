// Mermaid initialization for MkDocs Material
document.addEventListener('DOMContentLoaded', function() {
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
            themeCSS: '.node rect { fill: #fff; }',
            fontFamily: 'Roboto, sans-serif'
        });
    }
});

// Re-initialize mermaid when navigating with instant loading
document.addEventListener('DOMContentLoaded', function() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                var mermaidElements = document.querySelectorAll('.mermaid');
                if (mermaidElements.length > 0 && typeof mermaid !== 'undefined') {
                    mermaid.init(undefined, mermaidElements);
                }
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
