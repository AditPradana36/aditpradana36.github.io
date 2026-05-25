/**
 * portfolio/assets/js/main.js
 * Data-driven page renderer.
 * To update content, edit the JSON files in /data — no HTML changes needed.
 */

/* ─── helpers ─────────────────────────────────────────────────────────── */
const $ = (sel) => document.querySelector(sel);

async function loadJSON(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`Failed to load ${path}: ${r.status}`);
  return r.json();
}

function svgIcon(name) {
  const icons = {
    email: `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>`,
    linkedin: `<svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    github: `<svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    rg: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 17.5h-2.25v-4.25c0-.966-.784-1.75-1.75-1.75s-1.75.784-1.75 1.75v4.25H8.5V9.5h2.25v1.017C11.314 9.95 12.1 9.5 13 9.5c1.933 0 3.5 1.567 3.5 3.5v4.5z"/></svg>`,
    orcid: `<svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947-.946-.431-.946-.947.421-.947.946-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.434h2.297c3.272 0 3.872-2.412 3.872-3.722 0-2.016-1.284-3.712-3.816-3.712h-2.353z"/></svg>`,
    cv: `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    external: `<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  };
  return icons[name] || '';
}

/* ─── PROFILE / SIDEBAR ────────────────────────────────────────────────── */
function renderProfile(data) {
  // Nav name
  const navName = $('#nav-name');
  if (navName) navName.textContent = data.name;

  // Photo
  const photo = $('#sidebar-photo');
  if (photo) { photo.src = data.photo; photo.alt = data.name; }

  // Name + degree + role
  const nameEl = $('#sidebar-name');
  if (nameEl) nameEl.textContent = data.name;

  const degreeEl = $('#sidebar-degree');
  if (degreeEl) degreeEl.textContent = data.degree;

  const roleEl = $('#sidebar-role');
  if (roleEl) roleEl.innerHTML = `${data.role}<br>${data.affiliation}<br>${data.location}`;

  // Links
  const linksEl = $('#sidebar-links');
  if (linksEl) {
    linksEl.innerHTML = data.links.map(l => `
      <a class="sidebar-link" href="${l.href}" target="${l.href.startsWith('mailto') ? '_self' : '_blank'}" rel="noopener">
        ${svgIcon(l.icon)}
        ${l.label}
      </a>
    `).join('');
  }

  // About text
  const aboutEl = $('#about-text');
  if (aboutEl) aboutEl.innerHTML = data.about;

  // Footer
  const footerEl = $('footer');
  if (footerEl) footerEl.textContent = `© ${new Date().getFullYear()} ${data.name}`;
}

/* ─── EDUCATION ─────────────────────────────────────────────────────────── */
function renderEducation(items) {
  const container = $('#education-list');
  if (!container) return;
  container.innerHTML = items.map(e => `
    <div class="edu-item">
      <div class="edu-logo">
        <img src="${e.logo}" alt="${e.university}" onerror="this.parentElement.textContent='${e.university.slice(0,2).toUpperCase()}'">
      </div>
      <div>
        <div class="edu-header">
          <span class="edu-degree">${e.degree}</span>
          <span class="edu-period">${e.period}</span>
        </div>
        <p class="edu-uni">${e.university}</p>
        ${e.honor ? `<span class="edu-honor">${e.honor}</span>` : ''}
        <p class="edu-focus">${e.focus}</p>
        <p class="edu-thesis"><span class="edu-thesis-label">Thesis</span>${e.thesis}</p>
      </div>
    </div>
  `).join('');
}

/* ─── EXPERIENCE ────────────────────────────────────────────────────────── */
function renderExperience(items) {
  const container = $('#experience-list');
  if (!container) return;
  container.innerHTML = items.map(e => `
    <div class="exp-item">
      <div>
        <p class="exp-period">${e.period}</p>
        <p class="exp-role">${e.role}</p>
        <p class="exp-org">${e.org}</p>
        <p class="exp-desc">${e.desc}</p>
      </div>
      <div class="exp-logo">
        <img src="${e.logo}" alt="${e.org}" onerror="this.parentElement.textContent='•'">
      </div>
    </div>
  `).join('');
}

/* ─── PROJECTS ──────────────────────────────────────────────────────────── */
function renderProjects(items) {
  const container = $('#projects-grid');
  if (!container) return;
  container.innerHTML = items.map(p => {
    const imgHtml = p.image
      ? `<img class="proj-card-img" src="${p.image}" alt="${p.title}" onerror="this.outerHTML='<div class=proj-card-img-placeholder></div>'">`
      : `<div class="proj-card-img-placeholder"></div>`;
    const linkHtml = p.url
      ? `<a class="proj-link" href="${p.url}" target="_blank" rel="noopener">${svgIcon('external')} View project</a>`
      : '';
    const statusHtml = p.status ? `<span class="proj-status">${p.status}</span>` : '';
    return `
      <div class="proj-card">
        ${imgHtml}
        <div class="proj-card-body">
          <p class="proj-title">${p.title}${statusHtml}</p>
          <p class="proj-desc">${p.desc}</p>
          ${linkHtml}
        </div>
      </div>
    `;
  }).join('');
}

/* ─── PUBLICATIONS ──────────────────────────────────────────────────────── */
function renderPublications(data) {
  const container = $('#publications-list');
  if (!container) return;

  const renderItems = (items) => items.map((p, i) => `
    <div class="pub-item">
      <p class="pub-num">[${i + 1}]</p>
      <div>
        <p class="pub-authors">${p.authors} (${p.year}).</p>
        <p class="pub-title">${p.title}</p>
        <p class="pub-venue">${p.venue}.</p>
        <a class="pub-doi" href="${p.doi}" target="_blank" rel="noopener">${p.doi}</a>
      </div>
    </div>
  `).join('');

  const reviewHtml = data.peerReview.map(r => `
    <div class="review-badge">
      <div class="review-logo">
        <img src="${r.logo}" alt="${r.abbr}" onerror="this.parentElement.textContent='${r.abbr}'">
      </div>
      ${r.journal}
    </div>
  `).join('');

  container.innerHTML = `
    <p class="pub-section-head">Journal Articles</p>
    ${renderItems(data.journal)}
    <p class="pub-section-head">Conference Papers</p>
    ${renderItems(data.conference)}
    <p class="pub-section-head">Peer Review</p>
    <div class="review-list">${reviewHtml}</div>
  `;
}

/* ─── NEWS ──────────────────────────────────────────────────────────────── */
function renderNews(items) {
  const container = $('#news-list');
  if (!container) return;
  // already sorted newest-first in JSON; just render
  container.innerHTML = items.map(n => `
    <div class="news-item">
      <span class="news-date">${n.date}</span>
      <span class="news-text">${n.html}</span>
    </div>
  `).join('');
}

/* ─── NAV HIGHLIGHT ─────────────────────────────────────────────────────── */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 56;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: `-${navH + 10}px 0px -60% 0px` });

  sections.forEach(s => observer.observe(s));
}

/* ─── INIT ──────────────────────────────────────────────────────────────── */
async function init() {
  try {
    const [profile, education, experience, projects, publications, news] = await Promise.all([
      loadJSON('data/profile.json'),
      loadJSON('data/education.json'),
      loadJSON('data/experience.json'),
      loadJSON('data/projects.json'),
      loadJSON('data/publications.json'),
      loadJSON('data/news.json'),
    ]);

    renderProfile(profile);
    renderEducation(education);
    renderExperience(experience);
    renderProjects(projects);
    renderPublications(publications);
    renderNews(news);
    initNavHighlight();
  } catch (err) {
    console.error('Portfolio load error:', err);
  }
}

document.addEventListener('DOMContentLoaded', init);

/* ─── THEME TOGGLE ──────────────────────────────────────────────────────── */
function initThemeToggle() {
  const html    = document.documentElement;
  const btn     = document.getElementById('theme-toggle');
  const label   = document.getElementById('toggle-label');

  // Restore saved preference (default: dark)
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  label.textContent = saved === 'dark' ? 'light' : 'dark';

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    label.textContent = next === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', next);
  });
}

document.addEventListener('DOMContentLoaded', initThemeToggle);
