const token = localStorage.getItem('portalToken') || '';
const loadBtn = document.getElementById('loadProjects');
const container = document.getElementById('allProjects');

loadBtn?.addEventListener('click', async () => {
  const res = await fetch('/api/admin/projects', {
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  });
  const data = await res.json();
  if (!res.ok) {
    container.textContent = data.message || 'Access denied';
    return;
  }
  container.innerHTML = data.projects.map((project) => `
    <article class="card">
      <h4>${project.businessName}</h4>
      <p>${project.industry}</p>
      <p>Status: ${project.status}</p>
      <p>Client: ${project.client?.email || 'Unassigned'}</p>
    </article>
  `).join('');
});
