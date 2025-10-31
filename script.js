// ==== Анимация появления ====
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: "120px 0px" });
faders.forEach(el => observer.observe(el));

// ==== Title при уходе ====
document.addEventListener('visibilitychange', () => {
  document.title = document.hidden
    ? '☕ Viktoriia is offline'
    : 'Viktoriia — Visual Creator';
});

// ==== Lightbox ====
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('.mood img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('show');
  });
});
lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target === lightboxImg) {
    lightbox.classList.remove('show');
  }
});

// ==== Light-layer scroll ====
const lightLayer = document.querySelector('.hero .light');
if (lightLayer) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY || 0;
    lightLayer.style.transform = `translateY(${Math.min(y * 0.06, 18)}px)`;
    lightLayer.style.opacity = String(0.4 - Math.min(y / 1200, 0.2));
  }, { passive: true });
}

// ==== Мультиязычность ====
async function setLanguage(lang) {
  const res = await fetch('lang.json');
  const dict = await res.json();
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[lang] && dict[lang][key]) {
      el.innerHTML = dict[lang][key];
    }
  });
  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang');
  const userLang = navigator.language.startsWith('ru') ? 'ru' : 'en';
  setLanguage(saved || userLang);
});

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    setLanguage(lang);
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// при загрузке отметить активную
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang');
  const userLang = navigator.language.startsWith('ru') ? 'ru' : 'en';
  const current = saved || userLang;
  setLanguage(current);
  const activeBtn = document.querySelector(`.lang-btn[data-lang="${current}"]`);
  if (activeBtn) activeBtn.classList.add('active');
});


// ==== THEME TOGGLE ====
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.textContent = '🌞';
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-theme');
  themeToggle.textContent = isDark ? '🌞' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ==== QUOTE OF THE DAY (multi-language) ====
async function loadQuote() {
  const res = await fetch('quotes.json');
  const quotes = await res.json();

  const lang = localStorage.getItem('lang') || (navigator.language.startsWith('ru') ? 'ru' : 'en');
  const saved = localStorage.getItem('quoteOfDay');
  const savedDate = localStorage.getItem('quoteDate');
  const today = new Date().toISOString().slice(0,10);

  let index;
  if (saved && savedDate === today) {
    index = parseInt(saved);
  } else {
    index = Math.floor(Math.random() * quotes.length);
    localStorage.setItem('quoteOfDay', index);
    localStorage.setItem('quoteDate', today);
  }

  const q = quotes[index][lang] || quotes[index]['en'];
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');

  quoteText.textContent = `“${q.text}”`;
  quoteAuthor.textContent = q.author ? `— ${q.author}` : '';

  // плавное появление
  const quoteSection = document.querySelector('.quote');
  setTimeout(() => quoteSection.classList.add('visible'), 200);
}

document.addEventListener('DOMContentLoaded', loadQuote);

// при смене языка обновляем цитату
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setTimeout(loadQuote, 200));
});
