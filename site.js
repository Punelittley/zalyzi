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
if (stack) stack.addEventListener('click', () => stack.classList.toggle('spread'));

// --- PRODUCT CATALOG & MODAL LOGIC ---
const productsData = {
  'jaluzi-perforated': {
    id: 'jaluzi-perforated',
    title: 'Горизонтальные перфорированные жалюзи',
    badge: 'Хит продаж · Скидка',
    price: 'от 1 800 ₽/м²',
    oldPrice: '2 700 ₽',
    desc: `
      <p><strong>Непрозрачные алюминиевые ламели</strong> обладают жестким каркасом, полностью защищая помещение от лучей солнца.</p>
      <p>В том случае, если не требуется отгородиться от окружающего мира, отличным решением становятся перфорированные жалюзи. У таких жалюзи ламели наделены перфорацией, которая создает в помещении уникальное освещение.</p>
      <div class="modal-notice-box">
        <strong>Точную цену</strong> Вы можете узнать после замера окна нашим специалистом.
      </div>
    `,
    phone: '+79681144004',
    phoneFormatted: '+7 968 11 44 004',
    waText: 'Здравствуйте! Интересуют горизонтальные перфорированные жалюзи. Хочу вызвать замерщика.',
    images: [
      './img/jaluzi-perf-1.png',
      './img/jaluzi-perf-2.png',
      './img/jaluzi-perf-3.jpg',
      './img/jaluzi-perf-4.png',
      './img/jaluzi-perf-5.jpg'
    ]
  },
  'bambook-jaluzi': {
    id: 'bambook-jaluzi',
    title: 'Бамбуковые горизонтальные жалюзи',
    badge: 'Эко-стиль · Премиум',
    price: '9 000 ₽/м²',
    oldPrice: '',
    desc: `
      <p><strong>Эко-стиль в интерьере</strong> сейчас чрезвычайно популярен. Люди стремятся к тому, чтобы обставить свой дом в максимально экологичном ключе, и эта тенденция не меняется несколько лет подряд.</p>
      <p>Бамбуковые жалюзи в интерьере представляют собой модернизированный вариант обычных жалюзи. Они состоят из ламелей, вырезанных из натурального бамбука, напоминают по виду деревянные жалюзи, однако выгодно отличаются от них двумя свойствами — <strong>более лёгким весом</strong> и <strong>разнообразием палитры цветов</strong>.</p>
      <p style="font-weight: 700; color: var(--orange); margin-top: 0.5rem;">Цена: 9 000 ₽ за кв. метр</p>
      <div class="modal-notice-box">
        <strong>Точную цену</strong> Вы можете узнать после замера окна нашим специалистом.<br/>
        Пригласить замерщика можно по телефону или написав нам в WhatsApp.
      </div>
    `,
    phone: '+79681144004',
    phoneFormatted: '+7 968 11 44 004',
    waText: 'Здравствуйте! Интересуют бамбуковые горизонтальные жалюзи. Хочу вызвать замерщика.',
    images: [
      './img/bambook-jaluzi-1.png',
      './img/bambook-jaluzi-2.png',
      './img/bambook-jaluzi-3.png',
      './img/bambook-jaluzi-4.png'
    ]
  },
  'rimskie-shtory': {
    id: 'rimskie-shtory',
    title: 'Римские тканевые шторы',
    badge: 'Популярное · 238 просмотров',
    price: '12 000 ₽',
    oldPrice: '',
    desc: `
      <p><strong>Римские шторы</strong> — это цельное тканевое полотно, в которое через равные промежутки вшиты специальные планки. Именно они образуют красивые ровные складки при подъеме полотна, что стильным образом подчеркивает современный интерьер вашего помещения.</p>
      <p>Можно выбрать ткань однотонную или с рисунком, подобрать более фактурную, плотную или наоборот невесомую — в зависимости от ваших предпочтений и дизайна интерьера.</p>
      <p style="font-weight: 700; color: var(--orange); margin-top: 0.5rem;">Цена: от 12 000 ₽</p>
      <div class="modal-notice-box">
        <strong>Точную цену</strong> Вы можете узнать после замера окна нашим специалистом.<br/>
        Вызвать замерщика Вы можете по телефону или через WhatsApp.
      </div>
    `,
    phone: '+79681144004',
    phoneFormatted: '+7 968 11 44 004',
    waText: 'Здравствуйте! Интересуют римские тканевые шторы. Хочу вызвать замерщика.',
    images: [
      './img/rimskie-shtory-1.png'
    ]
  }
};

const modal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const modalMainImg = document.getElementById('modalMainImg');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const modalCounter = document.getElementById('modalCounter');
const modalThumbs = document.getElementById('modalThumbs');
const modalBadge = document.getElementById('modalBadge');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalOldPrice = document.getElementById('modalOldPrice');
const modalDesc = document.getElementById('modalDesc');
const modalCallBtn = document.getElementById('modalCallBtn');
const modalCallText = document.getElementById('modalCallText');
const modalWaBtn = document.getElementById('modalWaBtn');
const modalMainView = document.getElementById('modalMainView');

let currentProduct = null;
let currentImgIndex = 0;

function updateModalGallery(idx) {
  if (!currentProduct || !currentProduct.images || !currentProduct.images.length) return;
  currentImgIndex = (idx + currentProduct.images.length) % currentProduct.images.length;
  
  modalMainImg.style.opacity = '0.35';
  modalMainImg.src = currentProduct.images[currentImgIndex];
  modalMainImg.alt = `${currentProduct.title} - фото ${currentImgIndex + 1}`;
  modalCounter.textContent = `${currentImgIndex + 1} / ${currentProduct.images.length}`;

  setTimeout(() => {
    modalMainImg.style.opacity = '1';
  }, 40);

  const thumbs = modalThumbs.querySelectorAll('.modal-thumb');
  thumbs.forEach((th, i) => {
    th.classList.toggle('active', i === currentImgIndex);
    if (i === currentImgIndex) {
      th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });
}

function openProductModal(productId) {
  const prod = productsData[productId];
  if (!prod) return;

  currentProduct = prod;
  currentImgIndex = 0;

  modalTitle.textContent = prod.title;
  modalBadge.textContent = prod.badge || 'В наличии · Под заказ';
  modalPrice.textContent = prod.price;
  modalOldPrice.textContent = prod.oldPrice || '';
  modalDesc.innerHTML = prod.desc;

  if (prod.phone) {
    modalCallBtn.href = `tel:${prod.phone}`;
    modalCallText.textContent = `Вызвать замерщика: ${prod.phoneFormatted || prod.phone}`;
  }

  if (prod.waText) {
    const rawPhone = prod.phone.replace(/[^0-9]/g, '');
    modalWaBtn.href = `https://wa.me/${rawPhone}?text=${encodeURIComponent(prod.waText)}`;
  }

  modalThumbs.innerHTML = '';
  prod.images.forEach((imgSrc, i) => {
    const thumb = document.createElement('div');
    thumb.className = `modal-thumb ${i === 0 ? 'active' : ''}`;
    thumb.innerHTML = `<img src="${imgSrc}" alt="${prod.title} фото ${i + 1}" loading="lazy" />`;
    thumb.addEventListener('click', () => updateModalGallery(i));
    modalThumbs.appendChild(thumb);
  });

  updateModalGallery(0);

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeProductModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

if (modalClose) modalClose.addEventListener('click', closeProductModal);

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProductModal();
  });
}

if (modalPrev) {
  modalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    updateModalGallery(currentImgIndex - 1);
  });
}

if (modalNext) {
  modalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    updateModalGallery(currentImgIndex + 1);
  });
}

window.addEventListener('keydown', (e) => {
  if (!modal || !modal.classList.contains('open')) return;
  if (e.key === 'Escape') closeProductModal();
  if (e.key === 'ArrowLeft') updateModalGallery(currentImgIndex - 1);
  if (e.key === 'ArrowRight') updateModalGallery(currentImgIndex + 1);
});

let touchStartX = 0;
let touchEndX = 0;
if (modalMainView) {
  modalMainView.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modalMainView.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) updateModalGallery(currentImgIndex + 1);
      else updateModalGallery(currentImgIndex - 1);
    }
  }, { passive: true });
}

document.querySelectorAll('[data-product-id]').forEach((el) => {
  el.addEventListener('click', (e) => {
    if (e.target.closest('a') && e.target.closest('a').getAttribute('href').startsWith('tel:')) return;
    const pid = el.dataset.productId;
    if (pid) openProductModal(pid);
  });
});

