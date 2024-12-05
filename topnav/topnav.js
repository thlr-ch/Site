// Function to dynamically load and include the topnav
document.addEventListener('DOMContentLoaded', () => {
    fetch('topnav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch topnav');
            }
            return response.text();
        })
        .then(data => {
            // Create a container div for the topnav
            const topnavContainer = document.createElement('div');
            topnavContainer.innerHTML = data;

            // Prepend the topnav to the body (or add it to a specific element)
            document.body.insertBefore(topnavContainer, document.body.firstChild);
        })
        .catch(error => {
            console.error('Error including the topnav:', error);
        });
});
