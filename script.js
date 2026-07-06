const screens = [...document.querySelectorAll('[data-screen]')];
const pageButtons = [...document.querySelectorAll('[data-page]')];
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mainNav');
const gallery = document.querySelector('.gallery');
const galleryTitle = document.querySelector('#galleryTitle');
const galleryGrid = document.querySelector('#galleryGrid');
const galleryClose = document.querySelector('.gallery-close');

function showPage(name, updateHistory = true) {
  gallery.classList.remove('active');
  gallery.setAttribute('aria-hidden', 'true');
  screens.forEach(screen => screen.classList.toggle('active', screen.dataset.screen === name));
  pageButtons.forEach(button => button.classList.toggle('active', button.dataset.page === name));
  mobileMenu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
  if (updateHistory) history.pushState({ page: name }, '', `#${name}`);
}

pageButtons.forEach(button => button.addEventListener('click', () => showPage(button.dataset.page)));

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? '메뉴 열기' : '메뉴 닫기');
  mobileMenu.classList.toggle('open', !open);
});

document.querySelectorAll('[data-gallery]').forEach(card => card.addEventListener('click', () => {
  const start = Number(card.dataset.start);
  galleryTitle.textContent = card.dataset.gallery;
  galleryGrid.replaceChildren();
  for (let i = 0; i < 6; i += 1) {
    const number = String(start + i).padStart(2, '0');
    const item = document.createElement('div');
    item.className = 'placeholder';
    item.dataset.number = number;
    item.innerHTML = `<span>IMAGE ${number}</span>`;
    galleryGrid.appendChild(item);
  }
  gallery.classList.add('active');
  gallery.setAttribute('aria-hidden', 'false');
}));

galleryClose.addEventListener('click', () => {
  gallery.classList.remove('active');
  gallery.setAttribute('aria-hidden', 'true');
});

window.addEventListener('popstate', event => showPage(event.state?.page || location.hash.slice(1) || 'home', false));
const initialPage = location.hash.slice(1);
if (screens.some(screen => screen.dataset.screen === initialPage)) showPage(initialPage, false);
