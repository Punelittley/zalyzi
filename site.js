const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const links = document.getElementById('navLinks');

const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  links.classList.toggle('open');
});
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    links.classList.remove('open');
  })
);

const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

const countIO = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (!e.isIntersecting) return;
  countIO.unobserve(e.target);
  const el = e.target;
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || '';
  const start = performance.now();
  const tick = (t) => {
    const p = Math.min((t - start) / 1800, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}), { threshold: 0.4 });
document.querySelectorAll('[data-count]').forEach((el) => countIO.observe(el));

function bindFilter(chipsId, itemsSelector) {
  const chips = document.getElementById(chipsId);
  chips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    chips.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    document.querySelectorAll(itemsSelector).forEach((item) => {
      item.classList.toggle('hide', chip.dataset.f !== 'all' && item.dataset.c !== chip.dataset.f);
    });
  });
}
bindFilter('prodChips', '#prodGrid .prod');
bindFilter('galChips', '#gallery-grid .g');

document.querySelectorAll('.row-head').forEach((head) =>
  head.addEventListener('click', () => {
    const row = head.parentElement;
    const wasOpen = row.classList.contains('open');
    document.querySelectorAll('.row').forEach((r) => r.classList.remove('open'));
    if (!wasOpen) row.classList.add('open');
  })
);

const range = document.getElementById('slRange');
const stem = document.getElementById('slStem');
const line = document.getElementById('slLine');
const setSlider = () => {
  const v = range.value;
  stem.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
  line.style.left = v + '%';
};
range.addEventListener('input', setSlider);
setSlider();

const stack = document.getElementById('stack');
stack.addEventListener('click', () => stack.classList.toggle('spread'));
