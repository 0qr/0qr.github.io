
/** Page 1 switch.js **/

const main = document.getElementById('main');

if (main) {

    /** Introductory labels **/

    function showIntroLabels(root) {

        /** Include the root itself if it is a model **/
        if (root.matches?.('.model')) {
            root.classList.add('intro-label');
        }

        /** Include any models contained inside the root **/
        root.querySelectorAll?.('.model').forEach(function(channel) {
            channel.classList.add('intro-label');
        });
    }

    /** Apply introductory labels to existing models **/
    showIntroLabels(main);

    /** Handle models added dynamically **/
    const observer = new MutationObserver(function(mutations) {

        mutations.forEach(function(mutation) {

            mutation.addedNodes.forEach(function(node) {

                if (node.nodeType === Node.ELEMENT_NODE) {
                    showIntroLabels(node);
                }

            });

        });

    });

    observer.observe(main, {
        childList: true,
        subtree: true
    });


    /** Temporary click/tap labels **/

    let activeModel = null;
    let hideTimer = null;

    function showInfo(channel) {

        /** Cancel the previous timer **/
        if (hideTimer) {
            clearTimeout(hideTimer);
        }

        /** Hide the previous label **/
        if (activeModel) {
            activeModel.classList.remove('show-info');
        }

        /** Remove introductory animation **/
        channel.classList.remove('intro-label');

        /** Remove the existing class to restart the animation **/
        channel.classList.remove('show-info');

        /** Force browser to restart the CSS animation **/
        void channel.offsetWidth;

        /** Display the new label **/
        channel.classList.add('show-info');
        activeModel = channel;

        /** Remove the label after the animation finishes **/
        hideTimer = setTimeout(function() {

            channel.classList.remove('show-info');

            activeModel = null;
            hideTimer = null;

        }, 8750);
    }


    /** Click/tap handling **/

    main.addEventListener('click', function(e) {

        const channel = e.target.closest('.model');

        if (!channel || !main.contains(channel)) {
            return;
        }

        const link = e.target.closest('.model a');

        /** Preserve modified clicks and non-left clicks **/
        if (
            link &&
            (
                e.button !== 0 ||
                e.ctrlKey ||
                e.metaKey ||
                e.shiftKey ||
                e.altKey
            )
        ) {
            return;
        }

        /** Second click on an active label allows navigation **/
        if (
            link &&
            channel.classList.contains('show-info')
        ) {
            return;
        }

        /** First click on a link prevents navigation **/
        if (link) {
            e.preventDefault();
        }

        /** Display the label **/
        showInfo(channel);

    });

}
