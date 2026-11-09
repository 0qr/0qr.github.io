const main = document.getElementById('main');

if (main) {

    let activeModel = null;
    let hideTimer = null;

    // Introductory labels
    function showIntroLabel(channel) {
        if (channel.matches('.model')) {
            channel.classList.add('intro-label');
        }

        channel.querySelectorAll?.('.model').forEach(showIntroLabel);
    }

    main.querySelectorAll('.model').forEach(showIntroLabel);

    // Handle models added dynamically
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    showIntroLabel(node);
                }
            });
        });
    });

    observer.observe(main, { childList: true, subtree: true });


    // Display a temporary label
    function showInfo(channel) {
        if (hideTimer) {
            clearTimeout(hideTimer);
        }

        if (activeModel) {
            activeModel.classList.remove('show-info');
        }

        channel.classList.remove('intro-label');
        channel.classList.remove('show-info');

        // Restart the CSS animation
        void channel.offsetWidth;

        channel.classList.add('show-info');
        activeModel = channel;

        hideTimer = setTimeout(function() {
            channel.classList.remove('show-info');
            activeModel = null;
            hideTimer = null;
        }, 2600);
    }


    // First click shows label; second click navigates
    main.addEventListener('click', function(e) {
        const channel = e.target.closest('.model');
        const link = e.target.closest('.model a');

        if (!channel || !link) return;

        // Preserve modified clicks and non-left clicks
        if (e.button !== 0 || e.ctrlKey || e.metaKey ||
            e.shiftKey || e.altKey) {
            return;
        }

        // Second click: allow normal link navigation
        if (channel.classList.contains('show-info')) {
            return;
        }

        // First click: prevent navigation and show label
        e.preventDefault();
        showInfo(channel);
    });
}