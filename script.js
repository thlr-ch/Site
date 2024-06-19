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