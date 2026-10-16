const members = ['Центр розвитку та співпраці громад', 'Надія є!', 'Видимі жінки', 'Зелене серце', 'Народний молодіжний театр «АСКАЛ»', 'ЮФО СТІМ ХАБ', 'ЯМаріуполь.Кременчук', 'Європейський клуб', 'Жіночий бізнес-інкубатор', 'Жіночий Хаб 2.0', 'Перспектива', 'NOVA UNITED', 'Дівчата', 'Молоді-Є', 'Бодаква: відродження', 'ЛадДа', 'Пліч-о-пліч', 'Платформа саморозвитку та неформальної освіти', 'Платформа Спільної Дії', 'Вирішальне. КРОК'];
const grid = document.querySelector('#members');
members.forEach((name, index) => { const item = document.createElement('div'); item.className = `member${index >= 8 ? ' extra hidden' : ''}`; const number = document.createElement('span'); number.textContent = String(index + 1).padStart(2, '0'); item.append(number, document.createTextNode(name)); grid.append(item); });
document.querySelector('#members-toggle').addEventListener('click', e => { const button = e.currentTarget; const open = button.getAttribute('aria-expanded') !== 'true'; button.setAttribute('aria-expanded', String(open)); document.querySelectorAll('.extra').forEach(el => el.classList.toggle('hidden', !open)); button.innerHTML = open ? 'Показати менше <span>↑</span>' : 'Усі підписанти меморандуму <span>↓</span>'; });
const toggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('nav');
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }));
document.querySelector('#year').textContent = new Date().getFullYear();

// Decorative artwork remains separate from the brand mark and inaccessible to focus.
for (const [selector, positions] of [
  ['.hero', ['left', 'right']],
  ['.about', ['left']],
  ['.directions', ['right']],
  ['.community', ['left', 'right']],
  ['.events', ['right']],
  ['.join', ['left', 'right']],
]) {
  const section = document.querySelector(selector);
  const decoration = document.createElement('div');
  decoration.className = 'botanical-layer';
  decoration.setAttribute('aria-hidden', 'true');
  for (const position of positions) {
    const image = document.createElement('img');
    image.src = new URL('./assets/dill-flowering.svg', import.meta.url).href;
    image.alt = '';
    image.className = `dill-spray ${position}`;
    decoration.append(image);
  }
  section.prepend(decoration);
}
