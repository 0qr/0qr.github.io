// switch.js — page1

const main = document.getElementById('main');

if (main) {

    // Apply the introductory label animation to a channel
    function showIntroLabel(channel) {
        if (channel.matches('.model')) {
            channel.classList.add('intro-label');
        }

        // Also handle any model elements nested inside
        channel.querySelectorAll?.('.model').forEach(showIntroLabel);
    }

    // Handle channels that already exist
    main.querySelectorAll('.model').forEach(showIntroLabel);

    // Handle channels added dynamically later
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    showIntroLabel(node);
                }
            });
        });
    });

    observer.observe(main, {
        childList: true,
        subtree: true
    });
}