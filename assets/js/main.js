/**
 * portfolio/assets/js/main.js
 * Data-driven page renderer.
 * To update content, edit the JSON files in /data — no HTML or CSS changes needed.
 */

/* ─── helpers ─────────────────────────────────────────────────────────── */
const $ = (sel) => document.querySelector(sel);

async function loadJSON(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(`Failed to load ${path}: ${r.status}`);
  return r.json();
}

// "2026-05" -> "May 2026"; leaves already-formatted strings untouched
function formatMonth(dateStr) {
  const m = /^(\d{4})-(\d{2})$/.exec(dateStr);
  if (!m) return dateStr;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m[2], 10) - 1]} ${m[1]}`;
}

// Real brand marks (simple-icons paths) with their real brand colors,
// so links read as recognizable logos rather than generic outline glyphs.
function svgIcon(name) {
  const icons = {
    email: `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>`,
    linkedin: `<svg class="brand-icon" width="13" height="13" fill="#0A66C2" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    github: `<svg class="brand-icon" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    rg: `<svg class="brand-icon" width="13" height="13" viewBox="0 0 24 24" fill="#00CCBB"><path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z"/></svg>`,
    orcid: `<svg class="brand-icon" width="13" height="13" fill="#A6CE39" viewBox="0 0 24 24"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947-.946-.431-.946-.947.421-.947.946-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.434h2.297c3.272 0 3.872-2.412 3.872-3.722 0-2.016-1.284-3.712-3.816-3.712h-2.353z"/></svg>`,
    cv: `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    external: `<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    chevron: `<svg class="chevron" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>`,
  };
  return icons[name] || '';
}

/* ─── PROFILE / SIDEBAR ────────────────────────────────────────────────── */
function renderProfile(data) {
  const navName = $('#nav-name');
  if (navName) navName.textContent = data.name;

  const photo = $('#sidebar-photo');
  if (photo) { photo.src = data.photo; photo.alt = data.name; }

  const nameEl = $('#sidebar-name');
  if (nameEl) nameEl.textContent = data.name;

  const roleEl = $('#sidebar-role');
  if (roleEl) roleEl.innerHTML = `${data.role}<br>${data.affiliation}<br>${data.location}`;

  const linksEl = $('#sidebar-links');
  if (linksEl) {
    linksEl.innerHTML = data.links.map(l => `
      <a class="sidebar-link" href="${l.href}" target="${l.href.startsWith('mailto') ? '_self' : '_blank'}" rel="noopener">
        ${svgIcon(l.icon)}
        ${l.label}
      </a>
    `).join('');
  }

  const aboutEl = $('#about-text');
  if (aboutEl) aboutEl.innerHTML = data.about;

  const footerEl = $('footer');
  if (footerEl) footerEl.textContent = `© ${new Date().getFullYear()} ${data.name}`;
}

/* ─── EDUCATION ─────────────────────────────────────────────────────────── */
function renderEducation(items) {
  const container = $('#education-list');
  if (!container) return;
  container.innerHTML = items.map((e, i) => `
    <div class="edu-item">
      <div class="edu-logo">
        <img src="${e.logo}" alt="${e.university}" onerror="this.parentElement.textContent='${e.university.slice(0,2).toUpperCase()}'">
      </div>
      <div class="edu-body">
        <div class="edu-header">
          <span class="edu-degree">${e.degree}</span>
          <span class="edu-period">${e.period}</span>
        </div>
        <p class="edu-uni">${e.university}</p>
        <p class="edu-meta">
          ${e.honor ? `<span class="edu-honor">${e.honor}</span>` : ''}
          ${e.gpa ? `<span class="edu-gpa">GPA ${e.gpa}</span>` : ''}
        </p>
        <button class="detail-toggle" data-target="edu-detail-${i}" aria-expanded="false">
          <span class="detail-toggle-label">Show details</span>${svgIcon('chevron')}
        </button>
        <div class="detail-panel" id="edu-detail-${i}" hidden>
          <p class="edu-focus">${e.focus}</p>
          <p class="edu-thesis"><span class="edu-thesis-label">Thesis</span>${e.thesis}</p>
        </div>
      </div>
    </div>
  `).join('');
}

/* ─── EXPERIENCE ────────────────────────────────────────────────────────── */
function renderExperience(items) {
  const container = $('#experience-list');
  if (!container) return;
  container.innerHTML = items.map((e, i) => `
    <div class="exp-item">
      <div class="exp-logo">
        <img src="${e.logo}" alt="${e.org}" onerror="this.parentElement.textContent='•'">
      </div>
      <div class="exp-body">
        <p class="exp-period">${e.period}</p>
        <p class="exp-role">${e.role}</p>
        <p class="exp-org">${e.org}</p>
        <button class="detail-toggle" data-target="exp-detail-${i}" aria-expanded="false">
          <span class="detail-toggle-label">Show details</span>${svgIcon('chevron')}
        </button>
        <div class="detail-panel" id="exp-detail-${i}" hidden>
          <p class="exp-desc">${e.desc}</p>
        </div>
      </div>
    </div>
  `).join('');
}

/* ─── DETAIL TOGGLES (education / experience) ──────────────────────────── */
function initDetailToggles() {
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.detail-toggle');
    if (!btn) return;
    const panel = document.getElementById(btn.dataset.target);
    if (!panel) return;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
    btn.querySelector('.detail-toggle-label').textContent = expanded ? 'Show details' : 'Hide details';
  });
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

/* ─── NEWS — rendered as a blog feed ───────────────────────────────────── */
function renderNews(items) {
  const container = $('#news-list');
  if (!container) return;
  // already sorted newest-first in JSON; just render
  container.innerHTML = items.map(n => `
    <article class="blog-post">
      <p class="blog-post-date">${formatMonth(n.date)}</p>
      <div class="blog-post-body">${n.html}</div>
    </article>
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

/* ─── THEME TOGGLE ──────────────────────────────────────────────────────── */
function initThemeToggle() {
  const html  = document.documentElement;
  const btn   = document.getElementById('theme-toggle');
  const label = document.getElementById('toggle-label');

  // data-theme was already set synchronously in <head> to avoid a flash;
  // just sync the button label to whatever is active now.
  const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  label.textContent = current === 'dark' ? 'light' : 'dark';

  btn.addEventListener('click', () => {
    const now  = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = now === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    label.textContent = next === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', next);
  });
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
    initThemeToggle();
    initDetailToggles();
  } catch (err) {
    console.error('Portfolio load error:', err);
  }
}

document.addEventListener('DOMContentLoaded', init);
