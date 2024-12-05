document.addEventListener('DOMContentLoaded', () => {
  const switchButton = document.getElementById('switch-button');

  if (switchButton) {
      switchButton.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent default navigation
          
          // Target URL
          const targetPage = this.dataset.target;

          // Fetch the new page content
          fetch(targetPage)
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.text(); // Get the response as text
              })
              .then(html => {
                  // Create a temporary DOM element to parse the HTML
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = html;

                  // Replace the current content with new content
                  const newContent = tempDiv.querySelector('#content');
                  const currentContent = document.querySelector('#content');

                  // Replace the current content with the new content
                  if (newContent) {
                      currentContent.innerHTML = newContent.innerHTML;
                  }

                  // Update the button's target to allow switching back
                  const newButton = tempDiv.querySelector('#switch-button');
                  if (newButton) {
                      switchButton.dataset.target = newButton.dataset.target;
                      switchButton.textContent = newButton.textContent;
                  }
              })
              .catch(error => {
                  console.error('Error fetching the page:', error);
              });
      });
  }
});