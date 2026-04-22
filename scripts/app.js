const revealNodes = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.18 });
revealNodes.forEach((node) => observer.observe(node));

const form = document.getElementById('intakeForm');
const result = document.getElementById('result');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form).entries());
    formData.personality = formData.personality.split(',').map((item) => item.trim());
    formData.competitors = formData.competitors ? formData.competitors.split(',').map((item) => item.trim()) : [];
    formData.features = formData.features ? formData.features.split(',').map((item) => item.trim()) : [];

    result.innerHTML = 'Generating strategy, sitemap, and conversion blueprint...';
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      result.textContent = 'Generation failed. Please check required fields and retry.';
      return;
    }

    const data = await response.json();
    result.innerHTML = `
      <h3>${data.brandSummary.creativeDirection.theme}</h3>
      <p><strong>Mission:</strong> ${data.brandSummary.mission}</p>
      <p><strong>Voice:</strong> ${data.brandSummary.brandVoice}</p>
      <p><strong>Messaging Angles:</strong> ${data.brandSummary.messagingAngles.join(' | ')}</p>
      <p><strong>Conversion Funnel:</strong> ${data.sitemap.conversionFunnel.join(' → ')}</p>
      <p><strong>Suggested Pages:</strong> ${data.sitemap.pages.map((page) => page.name).join(', ')}</p>
      <details>
        <summary>Generated Website Files</summary>
        <pre>${Object.keys(data.generatedSite.files).join('\n')}</pre>
      </details>
    `;
  });
}
