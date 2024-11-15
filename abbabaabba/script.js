document.addEventListener('DOMContentLoaded', () => {
    const switchButton = document.getElementById('switch-button');
    
    if (switchButton) {
      switchButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default navigation
        
        // Target URL
        const targetPage = this.dataset.target;
        
        // Add fade-out class to body
        document.body.classList.add('fade-out');
        
        // Wait for transition to complete before navigating
        setTimeout(() => {
          window.location.href = targetPage;
        }, 500); // Match the duration of the CSS transition (0.5s)
      });
    }
  });
  