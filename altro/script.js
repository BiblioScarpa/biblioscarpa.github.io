const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
const menuItems = [
  {
    href: isIndex ? 'index.html' : '../index.html', // no # alla fine
    text: 'Home'
  },
  { href: "#link2", text: "Link 12" },
  { href: "#link3", text: "Link 13" },
  { href: "#link4", text: "Link 14" },
];

function populateMenu() {
  const menu = document.getElementById('menu');
  if (!menu) return;
  const ul = menu.querySelector('ul');
  ul.innerHTML = ''; // svuota contenuto precedente

  menuItems.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.text;
    li.appendChild(a);
    ul.appendChild(li);
  });
}

// Poi nel init o al DOMContentLoaded chiama populateMenu e poi initMenuToggle
window.addEventListener('DOMContentLoaded', () => {
  populateMenu();
  initMenuToggle();
});

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

function toggleMenu() {
  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
    // dopo animazione nascondi display per non lasciare spazio cliccabile
    setTimeout(() => menu.style.display = 'none', 300);
  } else {
    menu.style.display = 'block';
    // permette di far partire la transizione
    setTimeout(() => menu.classList.add('open'), 10);
  }
}

hamburger.addEventListener('click', toggleMenu);

hamburger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

// Chiudi il menu cliccando fuori
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
    if (menu.classList.contains('open')) {
      toggleMenu();
    }
  }
});

menu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (href === '#') {
      event.preventDefault();
    }
    if (menu.classList.contains('open')) {
      toggleMenu();
    }
  })
);

