const members = ['Центр розвитку та співпраці громад', 'Надія є!', 'Видимі жінки', 'Зелене серце', 'Народний молодіжний театр «АСКАЛ»', 'ЮФО СТІМ ХАБ', 'Європейський клуб', 'Жіночий бізнес-інкубатор', 'Жіночий Хаб 2.0', 'Перспектива', 'NOVA UNITED', 'Дівчата', 'Молоді-Є', 'Бодаква: відродження', 'Пліч-о-пліч', 'Платформа саморозвитку та неформальної освіти', 'Платформа Спільної Дії', 'Вирішальне. КРОК'].map(name => ({ name, logo: null }));
const grid = document.querySelector('#members');
const memberGroup = document.createElement('div');
memberGroup.className = 'member-group';
members.forEach(({ name, logo }) => {
  const item = document.createElement('div');
  item.className = 'member';
  const logoSlot = document.createElement('div');
  logoSlot.className = 'member-logo';
  if (logo) {
    const image = document.createElement('img');
    image.src = logo;
    image.alt = '';
    logoSlot.append(image);
  } else {
    logoSlot.classList.add('member-logo-pending');
    logoSlot.textContent = 'Логотип';
  }
  logoSlot.setAttribute('aria-hidden', 'true');
  const label = document.createElement('h3');
  label.className = 'member-name';
  label.textContent = name;
  item.append(logoSlot, label);
  memberGroup.append(item);
});
grid.append(memberGroup);
const duplicate = memberGroup.cloneNode(true);
duplicate.setAttribute('aria-hidden', 'true');
duplicate.inert = true;
grid.append(duplicate);
const carousel = document.querySelector('.community-carousel');
const pauseButton = document.querySelector('#members-pause');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches;
let hovering = false;
let focused = false;
let touching = false;
let visible = false;
let lastFrame = 0;
let position = 0;
let automaticWrite = false;
function updatePauseButton() {
  pauseButton.textContent = paused ? 'Продовжити' : 'Призупинити';
  pauseButton.setAttribute('aria-pressed', String(paused));
}
updatePauseButton();
pauseButton.addEventListener('click', () => { paused = !paused; updatePauseButton(); });
reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updatePauseButton(); });
carousel.addEventListener('mouseenter', () => { hovering = true; });
carousel.addEventListener('mouseleave', () => { hovering = false; });
carousel.addEventListener('focusin', () => { focused = true; });
carousel.addEventListener('focusout', event => { focused = carousel.contains(event.relatedTarget); });
grid.addEventListener('pointerdown', () => { touching = true; });
window.addEventListener('pointerup', () => { touching = false; position = grid.scrollLeft; });
window.addEventListener('pointercancel', () => { touching = false; });
grid.addEventListener('scroll', () => { if (!automaticWrite && (paused || hovering || focused || touching)) position = grid.scrollLeft; });
function moveMembers(direction) {
  paused = true;
  updatePauseButton();
  const step = memberGroup.firstElementChild.getBoundingClientRect().width + 16;
  const cycle = memberGroup.getBoundingClientRect().width;
  let target = grid.scrollLeft + direction * step;
  if (target < 0) { grid.scrollLeft += cycle; target += cycle; }
  if (target >= cycle) { grid.scrollLeft -= cycle; target -= cycle; }
  grid.scrollTo({ left: target, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
}
document.querySelector('#members-prev').addEventListener('click', () => moveMembers(-1));
document.querySelector('#members-next').addEventListener('click', () => moveMembers(1));
grid.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    moveMembers(event.key === 'ArrowLeft' ? -1 : 1);
  }
});
new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(grid);
function animateMembers(time) {
  const elapsed = Math.min(time - (lastFrame || time), 50);
  lastFrame = time;
  if (!paused && !hovering && !focused && !touching && visible && !document.hidden) {
    const cycle = memberGroup.getBoundingClientRect().width;
    if (cycle > 0) {
      position = (position + elapsed * 0.028) % cycle;
      automaticWrite = true;
      grid.scrollLeft = position;
      automaticWrite = false;
    }
  }
  requestAnimationFrame(animateMembers);
}
requestAnimationFrame(animateMembers);
const toggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('nav');
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }));
document.querySelector('#year').textContent = new Date().getFullYear();

// Each section has its own botanical composition; brand artwork stays separate.
const botanicalArt = {
  flowering: new URL('./assets/dill-flowering.svg', import.meta.url).href,
  single: new URL('./assets/dill-single.svg', import.meta.url).href,
  meadow: new URL('./assets/dill-meadow.svg', import.meta.url).href,
  leafy: new URL('./assets/dill-leafy.svg', import.meta.url).href,
  seeds: new URL('./assets/dill-seeds.svg', import.meta.url).href,
};
for (const [selector, plants] of [
  ['.hero', [['left', 'leafy'], ['right', 'single']]],
  ['.about', [['left', 'meadow']]],
  ['.directions', [['right', 'seeds']]],
  ['.community', [['left', 'single'], ['right', 'leafy']]],
  ['.events', [['right', 'meadow']]],
  ['.join', [['left', 'leafy'], ['right', 'flowering']]],
]) {
  const decoration = document.createElement('div');
  decoration.className = 'botanical-layer';
  decoration.setAttribute('aria-hidden', 'true');
  for (const [position, variant] of plants) {
    const image = document.createElement('img');
    image.src = botanicalArt[variant];
    image.alt = '';
    image.className = `dill-spray ${position} dill-${variant}`;
    decoration.append(image);
  }
  document.querySelector(selector).prepend(decoration);
}


// Event posts advance on demand so visitors can read at their own pace.
const eventTrack = document.querySelector('#events-track');
const eventCards = [...eventTrack.querySelectorAll('article')];
const eventDots = document.querySelector('.event-dots');
let eventIndex = 0;
const dots = eventCards.map((card, index) => {
  card.setAttribute('role', 'group');
  card.setAttribute('aria-roledescription', 'слайд');
  card.setAttribute('aria-label', `${index + 1} із ${eventCards.length}`);
  const dot = document.createElement('button');
  dot.className = 'event-dot';
  dot.setAttribute('aria-label', `Допис ${index + 1}: ${card.querySelector('h3').textContent.trim()}`);
  dot.setAttribute('aria-controls', 'events-track');
  dot.addEventListener('click', () => showEvent(index));
  eventDots.append(dot);
  return dot;
});
function eventPositions() {
  const max = eventTrack.scrollWidth - eventTrack.clientWidth;
  const start = eventCards[0].getBoundingClientRect().left;
  return eventCards.map(card => Math.min(max, card.getBoundingClientRect().left - start));
}
function syncEventControls() {
  const positions = eventPositions();
  eventIndex = positions.reduce((best, left, index) =>
    Math.abs(left - eventTrack.scrollLeft) < Math.abs(positions[best] - eventTrack.scrollLeft) ? index : best, 0);
  dots.forEach((dot, index) => dot.setAttribute('aria-current', String(index === eventIndex)));
  document.querySelector('.events-counter').textContent = `${eventIndex + 1} / ${eventCards.length}`;
}
function showEvent(index) {
  const next = (index + eventCards.length) % eventCards.length;
  eventTrack.scrollTo({ left: eventPositions()[next], behavior: reducedMotion.matches ? 'instant' : 'smooth' });
}
document.querySelector('#events-prev').addEventListener('click', () => showEvent(eventIndex - 1));
document.querySelector('#events-next').addEventListener('click', () => showEvent(eventIndex + 1));
eventTrack.addEventListener('keydown', event => {
  if (event.target === eventTrack && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
    event.preventDefault();
    showEvent(event.key === 'Home' ? 0 : event.key === 'End' ? eventCards.length - 1 : eventIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
eventTrack.addEventListener('scroll', syncEventControls, { passive: true });
new ResizeObserver(syncEventControls).observe(eventTrack);
syncEventControls();
