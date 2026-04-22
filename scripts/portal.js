const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const dashboard = document.getElementById('dashboard');
const projectList = document.getElementById('projectList');
const profile = document.getElementById('profile');
let token = localStorage.getItem('portalToken') || '';

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
  return response;
}

async function loadDashboard() {
  if (!token) return;
  const res = await api('/api/projects/me');
  if (!res.ok) return;
  const data = await res.json();
  dashboard.classList.remove('hidden');
  profile.textContent = `Logged in as ${data.user.name} (${data.user.email})`;
  projectList.innerHTML = data.projects.map((project) => `
    <article class="card">
      <h4>${project.businessName}</h4>
      <p><strong>ID:</strong> ${project._id}</p>
      <p><strong>Status:</strong> ${project.status}</p>
      <p><strong>Budget Tier:</strong> ${project.budgetTier}</p>
      <p><strong>Last Update:</strong> ${new Date(project.updatedAt).toLocaleString()}</p>
    </article>
  `).join('');
}

registerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(registerForm).entries());
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  alert(data.message || 'Registered');
});

loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(loginForm).entries());
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) return alert(data.message || 'Login failed');
  token = data.token;
  localStorage.setItem('portalToken', token);
  loadDashboard();
});

document.getElementById('noteForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(e.target).entries());
  const res = await api(`/api/projects/${payload.projectId}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note: payload.note })
  });
  alert(res.ok ? 'Note saved' : 'Could not save note');
  loadDashboard();
});

document.getElementById('uploadForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const projectId = formData.get('projectId');
  const res = await api(`/api/uploads/${projectId}`, { method: 'POST', body: formData });
  alert(res.ok ? 'Asset uploaded' : 'Upload failed');
});

loadDashboard();
