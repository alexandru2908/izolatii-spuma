const menuButton = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('#main-menu');

if (menuButton && mainMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainMenu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  mainMenu.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      mainMenu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}