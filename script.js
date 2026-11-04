// =========================================================
// Les pas de l'espoir – script commun à toutes les pages
// =========================================================

// ----- En-tête commun (logo + menu) -----
// Pour changer le menu partout : modifiez uniquement la liste ci-dessous.
const MENU = [
  { label: 'Qui sommes-nous', href: 'qui-sommes-nous.html' },
  { label: 'Nos activités',   href: 'nos-activites.html' },
  { label: 'Tarifs',          href: 'tarifs.html' },
  { label: 'Actualités',      href: 'actualites.html' },
  { label: 'Galerie',         href: 'galerie.html' },
  { label: 'Contact',         href: 'contact.html' },
  { label: 'Adhérer',         href: 'adherer.html', accent: true },
];

const header = document.getElementById('site-header');
if (header) {
  const current = location.pathname.split('/').pop();   // ex. "tarifs.html"
  const links = MENU.map(m => `
          <li><a class="btn${m.accent ? ' btn-accent' : ''}" href="${m.href}"${current === m.href ? ' aria-current="page"' : ''}>${m.label}</a></li>`).join('');

  header.innerHTML = `
    <div class="header-inner">
      <!-- Logo cliquable : retour à l'accueil -->
      <a class="logo" href="index.html" aria-label="Les pas de l'espoir – retour à l'accueil">
        <img src="images/logo.png" alt="Logo Les pas de l'espoir – Association">
      </a>

      <button class="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="menu">
        <span></span><span></span><span></span>
      </button>

      <nav id="menu" class="main-nav" aria-label="Navigation principale">
        <ul>${links}
        </ul>
      </nav>
    </div>`;
}

// ----- Pied de page commun -----
// Pour le modifier partout, changez uniquement ce bloc.
const footer = document.getElementById('site-footer');
if (footer) {
  footer.innerHTML = `
    <div class="footer-inner">
      <a class="btn-don" href="don.html">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.8 6.2 4.5c2-.2 3.9.8 5.8 3 1.9-2.2 3.8-3.2 5.8-3 3.5.3 5.3 3.9 3.8 7.3C19.5 16.4 12 21 12 21z"/></svg>
        Faire un don
      </a>
      <p class="footer-contact">
        <a href="tel:+33769506878">07 69 50 68 78</a>
        <a href="mailto:lespasdelespoir92@gmail.com">lespasdelespoir92@gmail.com</a>
        <span>66 avenue Jean Moulin, Villeneuve-la-Garenne</span>
      </p>
      <p class="footer-copy">© ${new Date().getFullYear()} Les pas de l’espoir – Association</p>
    </div>`;
}

// ----- Menu mobile -----
const toggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');

if (toggle && menu) {
  const setMenu = open => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
}

// ----- Bouton son on/off de la vidéo (page d'accueil uniquement) -----
const video = document.getElementById('hero-video');
const soundBtn = document.getElementById('sound-btn');

if (video && soundBtn) {
  const soundLabel = soundBtn.querySelector('.sound-label');

  const updateSoundButton = () => {
    const soundOn = !video.muted;
    soundBtn.setAttribute('aria-pressed', soundOn);
    soundBtn.setAttribute('aria-label', soundOn ? 'Couper le son de la vidéo' : 'Activer le son de la vidéo');
    soundLabel.textContent = soundOn ? 'Son : activé' : 'Son : désactivé';
  };

  soundBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    if (!video.muted) {
      video.volume = 1;
      video.play().catch(() => {});
    }
    updateSoundButton();
  });

  // La vidéo démarre muette (obligatoire pour la lecture automatique des navigateurs)
  video.muted = true;
  updateSoundButton();
  video.play().catch(() => { /* lecture auto bloquée : le visiteur pourra lancer via le bouton */ });
}
