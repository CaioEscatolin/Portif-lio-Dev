// ── CURSOR ──
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function raf() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(raf);
})();

// ── SCROLL PROGRESS ──
const pb = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const p = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  pb.style.width = p + '%';
});

// ── FADE ON SCROLL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── SKILL BARS ──
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        const t = +bar.dataset.target;
        bar.style.width = t + '%';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const sb = document.getElementById('skillsBlock');
if (sb) skillObs.observe(sb);

// ── RING PROGRESS ──
const ringObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const pct = 90;
      const circumference = 251.2;
      const offset = circumference - (pct / 100) * circumference;
      document.getElementById('ringCircle').style.strokeDashoffset = offset;
      ringObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
const rw = document.getElementById('ringWrap');
if (rw) ringObs.observe(rw);

// ── TYPEWRITER ──
const words = ['Estudante.', 'Programador.', 'Pesquisador.', 'Criador.'];
let wi = 0, ci = 0, deleting = false;
const target = document.getElementById('typeTarget');
function type() {
  if (!target) return;
  const w = words[wi];
  if (!deleting) {
    target.textContent = w.slice(0, ++ci);
    if (ci === w.length) { deleting = true; setTimeout(type, 1800); return; }
    setTimeout(type, 90);
  } else {
    target.textContent = w.slice(0, --ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 300); return; }
    setTimeout(type, 45);
  }
}
type();

// ── MOBILE MENU ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
