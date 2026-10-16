const members = ['Центр розвитку та співпраці громад', 'Надія є!', 'Видимі жінки', 'Зелене серце', 'Народний молодіжний театр «АСКАЛ»', 'ЮФО СТІМ ХАБ', 'Європейський клуб', 'Жіночий бізнес-інкубатор', 'Жіночий Хаб 2.0', 'Перспектива', 'NOVA UNITED', 'Дівчата', 'Молоді-Є', 'Бодаква: відродження', 'Пліч-о-пліч', 'Платформа саморозвитку та неформальної освіти', 'Платформа Спільної Дії', 'Вирішальне. КРОК'].map(name => ({ name, logo: null }));
const grid = document.querySelector('#members');
members.forEach(({ name, logo }, index) => {
  const item = document.createElement('div');
  item.className = `member${index >= 8 ? ' extra hidden' : ''}`;
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
  grid.append(item);
});
document.querySelector('#members-toggle').addEventListener('click', e => { const button = e.currentTarget; const open = button.getAttribute('aria-expanded') !== 'true'; button.setAttribute('aria-expanded', String(open)); document.querySelectorAll('.extra').forEach(el => el.classList.toggle('hidden', !open)); button.innerHTML = open ? 'Показати менше <span>↑</span>' : 'Уся спільнота <span>↓</span>'; });
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
