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

document.addEventListener('visibilitychange', () => {
  document.title = document.hidden
    ? '☕ Viktoriia is offline'
    : 'Viktoriia — Visual Creator';
});

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

const lightLayer = document.querySelector('.hero .light');
if (lightLayer) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY || 0;
    lightLayer.style.transform = `translateY(${Math.min(y * 0.06, 18)}px)`;
    lightLayer.style.opacity = String(0.4 - Math.min(y / 1200, 0.2));
  }, { passive: true });
}
