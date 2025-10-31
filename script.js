// плавное появление секций при прокрутке
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
faders.forEach(el => observer.observe(el));

// смена заголовка при уходе со страницы
document.addEventListener('visibilitychange', () => {
  document.title = document.hidden
    ? '☕ Viktoriia is waiting...'
    : 'Viktoriia — Between Light & Motion';
});

// фуллскрин просмотр изображений
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.mood img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('show');
  });
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target === lightboxImg || e.target === lightbox) {
    lightbox.classList.remove('show');
  }
});
