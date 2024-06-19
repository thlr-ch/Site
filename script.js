document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;

    const response = await fetch('https://<your-worker-url>', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action: 'subscribe' })
    });

    const result = await response.text();
    alert(result);
});
// JavaScript code to handle navigation without page refresh

// Select all navigation links that should load content dynamically
document.addEventListener('DOMContentLoaded', function() {
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
});

// Function to fetch and display content based on URL
function fetchPage(url) {
    fetch(url + '.html') // Append .html to fetch the correct file
        .then(response => response.text())
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
