document.addEventListener('DOMContentLoaded', function() {
    // Subscribe form submission handling
    document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;

        try {
            const response = await fetch('https://api.thlr.ch/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, action: 'subscribe' })
            });

            if (response.ok) {
                // Subscription successful, redirect to thanks page
                window.location.href = 'https://www.thlr.ch/thanks';
            } else {
                // Handle subscription failure
                const errorMessage = await response.text();
                alert(`Failed to subscribe: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            alert('Failed to subscribe. Please try again later.');
        }
    });

    // Navigation handling without page refresh
    const navLinks = document.querySelectorAll('a');

    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', function(event) {
            event.preventDefault();

            const href = this.getAttribute('href');
            if (href) {
                // Use history.pushState to update URL without page reload
                history.pushState(null, null, href);

                // Load content dynamically based on the URL
                fetchPage(href);
            }
        });
    });

    // Function to fetch and display content based on URL
    function fetchPage(url) {
        fetch(url + '.html') // Append .html to fetch the correct file
            .then(response => {
                if (!response.ok) {
                    throw new Error('Page not found');
                }
                return response.text();
            })
            .then(html => {
                // Update the main content area with the fetched HTML
                document.querySelector('.content').innerHTML = html;
            })
            .catch(error => console.error('Error fetching page:', error));
    }

    // Function to handle back and forward button navigation
    window.onpopstate = function(event) {
        fetchPage(location.pathname);
    };
});
