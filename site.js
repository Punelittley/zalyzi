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
bindFilter('galChips', '#gallery-grid .work-card, #gallery-grid .g');

document.querySelectorAll('.row-head').forEach((head) =>
  head.addEventListener('click', () => {
    const row = head.parentElement;
    const wasOpen = row.classList.contains('open');
    document.querySelectorAll('.row').forEach((r) => r.classList.remove('open'));
    if (!wasOpen) row.classList.add('open');
  })
);

const range = document.getElementById('slRange');
if (range) {
  const stem = document.getElementById('slStem');
  const line = document.getElementById('slLine');
  const setSlider = () => {
    const v = range.value;
    if (stem) stem.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
    if (line) line.style.left = v + '%';
  };
  range.addEventListener('input', setSlider);
  setSlider();
}

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
  },
  'zebra-day-night': {
    id: 'zebra-day-night',
    title: 'Рулонные жалюзи «День-ночь» (Зебра)',
    badge: 'Хит продаж · 286 просмотров',
    price: 'от 3 500 ₽',
    oldPrice: '',
    desc: `
      <p><strong>Рулонная штора «День-ночь» (Зебра / Combo)</strong> — современное и практичное решение для пластиковых и стандартных окон.</p>
      <p>Двойное полотно состоит из чередующихся прозрачных и непрозрачных полос ткани. При подъеме или опускании полосы плавно смещаются относительно друг друга, позволяя точно настраивать уровень освещения в комнате.</p>
      <ul style="padding-left: 1.2rem; margin: 0.6rem 0; color: #444; font-size: 0.94rem; line-height: 1.6;">
        <li><strong>Пылеотталкивающие ткани:</strong> антистатическая пропитка защищает от пыли, легко чистится щеткой или влажной губкой.</li>
        <li><strong>Удобное управление:</strong> надежный цепочный механизм с автоматической фиксацией на любой высоте.</li>
        <li><strong>Цены производителя:</strong> изготовление точно под размеры ваших окон.</li>
      </ul>
      <p style="font-weight: 700; color: var(--orange); margin-top: 0.5rem;">Цена: от 3 500 ₽ (за готовое изделие)</p>
      <div class="modal-notice-box">
        <strong>Точную цену</strong> Вы можете узнать после бесплатного замера окна нашим специалистом.<br/>
        Мастер приедет с полным каталогом тканей и образцов!
      </div>
    `,
    phone: '+79681144004',
    phoneFormatted: '+7 968 11 44 004',
    waText: 'Здравствуйте! Интересуют рулонные жалюзи День-ночь (Зебра). Хочу вызвать замерщика.',
    images: [
      './img/zebra-day-night-1.png'
    ]
  },
  'kassetnye-jaluzi': {
    id: 'kassetnye-jaluzi',
    title: 'Кассетные жалюзи (Роллайт)',
    badge: 'Популярное · 274 просмотра',
    price: 'от 2 800 ₽',
    oldPrice: '',
    desc: `
      <p><strong>Кассетная система «Роллайт» (Rollite / Isotra)</strong> — создана специально для пластиковых, деревянных и алюминиевых евроокон (с глубиной штапика от 6 мм).</p>
      <p>Элегантный кассетный короб скрывает рулон ткани, а аккуратные боковые направляющие удерживают полотно вплотную к стеклу. Створка окна свободно открывается и откидывается на проветривание без провисания и колыхания ткани.</p>
      <ul style="padding-left: 1.2rem; margin: 0.6rem 0; color: #444; font-size: 0.94rem; line-height: 1.6;">
        <li><strong>Два типа тканей на выбор:</strong> полупрозрачные (рассеивают свет и защищают от взглядов с улицы) или <strong>100% Блэкаут</strong> (полная светоизоляция для спален и кинозалов).</li>
        <li><strong>Единое целое с окном:</strong> короб и направляющие гармонично сливаются с профилем рамы.</li>
        <li><strong>Широкая палитра:</strong> огромный выбор фактур и цветов под любой интерьер.</li>
      </ul>
      <p style="font-weight: 700; color: var(--orange); margin-top: 0.5rem;">Цена: от 2 800 ₽ (за готовое изделие)</p>
      <div class="modal-notice-box">
        <strong>Точную цену</strong> Вы можете узнать после замера окна нашим специалистом.<br/>
        Позвоните или напишите в WhatsApp, чтобы записаться на бесплатный замер!
      </div>
    `,
    phone: '+79681144004',
    phoneFormatted: '+7 968 11 44 004',
    waText: 'Здравствуйте! Интересуют кассетные жалюзи (Роллайт). Хочу вызвать замерщика.',
    images: [
      './img/kassetnye-jaluzi-1.png'
    ]
  },
  'rulonnye-shtory': {
    id: 'rulonnye-shtory',
    title: 'Рулонные шторы (классические / Мини)',
    badge: 'Популярное · 263 просмотра',
    price: 'от 2 200 ₽',
    oldPrice: '',
    desc: `
      <p><strong>Классические рулонные шторы</strong> — лаконичное и универсальное решение для современных пластиковых окон. Они надежно защищают помещение от яркого солнца и нагрева, занимая в разы меньше места, чем обычные шторы.</p>
      <ul style="padding-left: 1.2rem; margin: 0.6rem 0; color: #444; font-size: 0.94rem; line-height: 1.6;">
        <li><strong>Компактность:</strong> подоконник остается полностью свободным для цветов или полезного пространства.</li>
        <li><strong>Большой каталог тканей:</strong> светопроницаемые, полупрозрачные, светорассеивающие и ткани Blackout (100% блокировка света).</li>
        <li><strong>Надежная фурнитура:</strong> плавный цепочный подъемный механизм.</li>
        <li><strong>Цены от производителя:</strong> без посредников и салонных наценок в Челябинске.</li>
      </ul>
      <p style="font-weight: 700; color: var(--orange); margin-top: 0.5rem;">Цена: от 2 200 ₽ (за готовое изделие)</p>
      <div class="modal-notice-box">
        <strong>Точную цену</strong> Вы можете узнать после бесплатного замера окна нашим специалистом.<br/>
        Позвоните или напишите в WhatsApp, мастер приедет с полным каталогом образцов!
      </div>
    `,
    phone: '+79681144004',
    phoneFormatted: '+7 968 11 44 004',
    waText: 'Здравствуйте! Интересуют рулонные шторы. Хочу вызвать замерщика.',
    images: [
      './img/rulonnye-shtory-1.png',
      './img/rulonnye-shtory-2.png'
    ]
  },
  'gorizontalnye-aluminievye': {
    id: 'gorizontalnye-aluminievye',
    title: 'Горизонтальные алюминиевые жалюзи',
    badge: 'Классика · 171 просмотр',
    price: 'от 2 000 ₽/м²',
    oldPrice: '',
    desc: `
      <p><strong>Классические горизонтальные алюминиевые жалюзи</strong> — практичный и долговечный способ солнцезащиты для любых пластиковых окон в квартире, загородном доме или офисе.</p>
      <ul style="padding-left: 1.2rem; margin: 0.6rem 0; color: #444; font-size: 0.94rem; line-height: 1.6;">
        <li><strong>Прочность и долговечность:</strong> алюминиевые ламели устойчивы к выгоранию, деформации и перепадам температур.</li>
        <li><strong>Влагостойкость:</strong> идеальны для кухонь, балконов, ванных комнат и офисных помещений.</li>
        <li><strong>Удобная регулировка:</strong> поворот ламелей позволяет тонко настраивать освещенность в комнате.</li>
        <li><strong>Цены от производителя:</strong> изготовление под индивидуальные размеры оконного проема.</li>
      </ul>
      <p style="font-weight: 700; color: var(--orange); margin-top: 0.5rem;">Цена: от 2 000 ₽ за кв. метр</p>
      <div class="modal-notice-box">
        <strong>Точную цену</strong> Вы можете узнать после бесплатного замера окна нашим специалистом.<br/>
        Позвоните или напишите в WhatsApp — мастер приедет с каталогом всех расцветок!
      </div>
    `,
    phone: '+79681144004',
    phoneFormatted: '+7 968 11 44 004',
    waText: 'Здравствуйте! Интересуют горизонтальные алюминиевые жалюзи. Хочу вызвать замерщика.',
    images: [
      './img/gorizontalnye-aluminievye-1.jpg',
      './img/gorizontalnye-aluminievye-2.jpg'
    ]
  },
  'vertikalnye-tkani': {
    id: 'vertikalnye-tkani',
    title: 'Вертикальные тканевые жалюзи',
    badge: 'Популярное · 126 просмотров',
    price: 'от 4 000 ₽/м²',
    oldPrice: '',
    desc: `
      <p><strong>Вертикальные тканевые жалюзи</strong> — одно из самых востребованных решений для оформления окон в квартирах, коттеджах, офисах и кабинетах. Стандартная ширина ламелей — 89 мм.</p>
      <ul style="padding-left: 1.2rem; margin: 0.6rem 0; color: #444; font-size: 0.94rem; line-height: 1.6;">
        <li><strong>Визуальный комфорт:</strong> вертикальные линии зрительно увеличивают высоту потолков и придают пространству строгость и уют.</li>
        <li><strong>Универсальное управление:</strong> ламели вращаются вокруг своей оси на 360° и плавно сдвигаются в любую сторону или от центра.</li>
        <li><strong>Пылеотталкивающая пропитка:</strong> ткани обработаны защитным составом, не выгорают и устойчивы к пыли.</li>
        <li><strong>Цены от производителя:</strong> изготовление по точным размерам вашего оконного проема в Челябинске.</li>
      </ul>
      <p style="font-weight: 700; color: var(--orange); margin-top: 0.5rem;">Цена: от 4 000 ₽ за кв. метр</p>
      <div class="modal-notice-box">
        <strong>Точную цену</strong> Вы можете узнать после бесплатного замера окна нашим специалистом.<br/>
        Позвоните или напишите в WhatsApp — специалист приедет с полным каталогом тканей!
      </div>
    `,
    phone: '+79681144004',
    phoneFormatted: '+7 968 11 44 004',
    waText: 'Здравствуйте! Интересуют вертикальные тканевые жалюзи. Хочу вызвать замерщика.',
    images: [
      './img/vertikalnye-tkani-1.jpg',
      './img/vertikalnye-tkani-2.png'
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
  if (e.key === 'Escape') {
    if (privacyModal && privacyModal.classList.contains('open')) {
      closePrivacyModal();
      return;
    }
    if (modal && modal.classList.contains('open')) {
      closeProductModal();
      return;
    }
  }
  if (!modal || !modal.classList.contains('open')) return;
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

// --- PRIVACY POLICY MODAL (152-FZ) ---
const privacyModal = document.getElementById('privacyModal');
const privacyClose = document.getElementById('privacyClose');

function openPrivacyModal() {
  if (privacyModal) {
    privacyModal.classList.add('open');
    privacyModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }
}

function closePrivacyModal() {
  if (privacyModal) {
    privacyModal.classList.remove('open');
    privacyModal.setAttribute('aria-hidden', 'true');
    const prodModal = document.getElementById('productModal');
    if (!prodModal || !prodModal.classList.contains('open')) {
      document.body.classList.remove('modal-open');
    }
  }
}

if (privacyClose) privacyClose.addEventListener('click', closePrivacyModal);
if (privacyModal) {
  privacyModal.addEventListener('click', (e) => {
    if (e.target === privacyModal) closePrivacyModal();
  });
}

document.querySelectorAll('.js-open-privacy').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openPrivacyModal();
  });
});


