// =========================================================
// Assistant « Les pas de l'espoir » – répond aux questions simples
// Fonctionne sans serveur : les réponses sont écrites ici, à partir des flyers.
// Pour modifier une réponse : cherchez son texte plus bas et changez-le.
// =========================================================
(() => {
  const TEL = '07 69 50 68 78';
  const MAIL = 'lespasdelespoir92@gmail.com';
  const ADRESSE = '66 avenue Jean Moulin, Villeneuve-la-Garenne';

  const lien = (href, texte) => `<a href="${href}">${texte}</a>`;
  const CONTACT = `Téléphone : <a href="tel:+33769506878">${TEL}</a><br>E-mail : <a href="mailto:${MAIL}">${MAIL}</a>`;
  const PRENDRE_CONTACT = `Pour plus de précisions, contactez-nous :<br>${CONTACT}`;

  // ----- Les activités (nom, pôle, information tarif) -----
  const P1 = 'Pôle Accompagnement & Familles';
  const P2 = 'Pôle Thérapie & Bien-être';
  const P3 = 'Pôle Activités, Développement & Inclusion';
  const TARIF_PREF = 'Les adhérents bénéficient d’un tarif préférentiel. Pour le détail, contactez-nous.';
  const TARIF_CONTACT = 'Pour connaître le tarif, contactez-nous.';

  const ACTIVITES = [
    { keys: ['groupe de parole', 'groupes de parole', 'parole'], nom: 'Les groupes de parole', pole: P1, tarif: TARIF_CONTACT },
    { keys: ['repit*'], nom: 'Le répit aidant', pole: P1, tarif: TARIF_PREF },
    { keys: ['parentalite'], nom: 'L’accompagnement à la parentalité', pole: P1, tarif: TARIF_CONTACT },
    { keys: ['soutien*'], nom: 'Le soutien des familles', pole: P1, tarif: TARIF_CONTACT },
    { keys: ['art therapie', 'arttherapie', 'psychotherap*', 'psychologue'], nom: 'L’art-thérapie (ou la psychothérapie)', pole: P2, tarif: 'Elle est <b>incluse</b> avec l’adhésion (50 € / an).' },
    { keys: ['orthopedagog*'], nom: 'L’orthopédagogie', pole: P2, tarif: TARIF_CONTACT },
    { keys: ['snoezelen'], nom: 'Le Snoezelen', pole: P2, tarif: TARIF_CONTACT },
    { keys: ['psio', 'vibroacoustique', 'siege*'], nom: 'Le siège vibroacoustique (PSIO)', pole: P2, tarif: TARIF_CONTACT },
    { keys: ['therapeute*'], nom: 'Les interventions de thérapeutes spécialisés', pole: P2, tarif: TARIF_CONTACT },
    { keys: ['sport*'], nom: 'Les activités sportives adaptées', pole: P3, tarif: TARIF_CONTACT },
    { keys: ['stage*', 'reussite'], nom: 'Le stage de réussite (handicap invisible)', pole: P3, tarif: TARIF_PREF },
    { keys: ['competence*'], nom: 'Le développement des compétences', pole: P3, tarif: TARIF_CONTACT },
    { keys: ['educatif*', 'educatifs'], nom: 'Les ateliers éducatifs', pole: P3, tarif: TARIF_CONTACT },
    { keys: ['sortie*'], nom: 'Les sorties', pole: P3, tarif: TARIF_PREF },
    { keys: ['inclusion*'], nom: 'Les actions d’inclusion sociale', pole: P3, tarif: TARIF_CONTACT },
    { keys: ['sensibilisation*'], nom: 'La sensibilisation au handicap', pole: P3, tarif: TARIF_CONTACT },
    { keys: ['evenement*'], nom: 'L’organisation d’événements', pole: P3, tarif: TARIF_CONTACT },
  ];

  // ----- Les réponses -----
  // keys : mots-clés (accents ignorés). « mot* » = tous les mots qui commencent par « mot ».
  // w    : importance (la réponse la plus pertinente est choisie).
  const INTENTS = [
    { id: 'photo', w: 5, keys: ['photobio*', 'photo bio*', 'casque*', 'lumiere'],
      r: 'Casque de photobiomodulation (séance de 20 min) : <b>40 €</b> avec adhésion, <b>60 €</b> sans adhésion.',
      chips: ['Adhésion', 'Tous les tarifs'] },
    { id: 'oxy', w: 5, keys: ['oxygen*', 'caisson*', 'hyperbar*'],
      r: 'Oxygénothérapie (séance d’1 h) : <b>50 €</b> avec adhésion. Sans adhésion, le caisson hyperbare est à <b>70 €</b> la séance d’1 h.',
      chips: ['Adhésion', 'Tous les tarifs'] },
    { id: 'neuro', w: 5, keys: ['neurofeedback*', 'neuro feedback', 'neuro'],
      r: 'Neurofeedback (séance de 35 min) : <b>40 €</b> avec adhésion, <b>60 €</b> sans adhésion.',
      chips: ['Adhésion', 'Tous les tarifs'] },
    { id: 'admin', w: 5, keys: ['administratif*', 'administrative*', 'paperasse*'],
      r: 'Accompagnement administratif : <b>50 €</b> par consultation avec adhésion, <b>60 €</b> sans adhésion. Il fait partie du ' + P1 + '.',
      chips: ['Adhésion', 'Tous les tarifs'] },
    { id: 'supp', w: 5, keys: ['supplementaire*', 'frere*', 'soeur*', 'accompagnant*'],
      r: 'Pour les adhérents, une personne supplémentaire peut être ajoutée pour <b>+25 €</b>, uniquement avec filiation directe : mère, père, frère, sœur.',
      chips: ['Tous les tarifs'] },
    { id: 'adhesion', w: 4, keys: ['adhesion*', 'adherer', 'adhere*', 'adherent*', 'cotisation*', 'membre*', 'inscri*'],
      r: `L’adhésion coûte <b>50 € par an</b>. Elle inclut l’art-thérapie ou la psychothérapie, et donne droit à des tarifs préférentiels (sorties, répit aidant, stage de réussite, séances).<br>${lien('adherer.html', 'Voir la page Adhérer')}<br><br>${PRENDRE_CONTACT}`,
      chips: ['Tous les tarifs', 'Contact'] },
    { id: 'tarifs', w: 3, keys: ['tarif*', 'prix', 'combien', 'cout*', 'coute*', 'payant*', 'euro*', '€'],
      r: `<b>Adhésion : 50 € / an.</b><br>Avec adhésion : art-thérapie ou psychothérapeute inclus, tarif préférentiel pour les sorties, le répit aidant et le stage de réussite.<br>Sans adhésion : casque de photobiomodulation 60 €, caisson hyperbare 70 €, neurofeedback 60 €, accompagnement administratif 60 €.<br>${lien('tarifs.html', 'Voir tous les tarifs')}`,
      chips: ['Photobiomodulation', 'Neurofeedback', 'Oxygénothérapie', 'Adhésion'] },
    { id: 'activites', w: 3, keys: ['activite*', 'atelier*', 'propose*', 'pole*', 'accompagnement*', 'therapie*', 'prestation*', 'service*', 'programme*'],
      r: `Nos activités sont réparties en trois pôles :<br>• <b>${P1}</b> : groupes de parole, répit aidant, parentalité, soutien des familles, accompagnement administratif<br>• <b>${P2}</b> : art-thérapie, orthopédagogie, neurofeedback, oxygénothérapie, Snoezelen, photobiomodulation, siège vibroacoustique…<br>• <b>${P3}</b> : sport adapté, stages de réussite, ateliers éducatifs, sorties, sensibilisation, événements…<br>${lien('nos-activites.html', 'Voir toutes les activités')}`,
      chips: ['Tarifs', 'Adhésion', 'Contact'] },
    { id: 'adresse', w: 4, keys: ['adresse*', 'ou', 'situe*', 'localis*', 'plan', 'venir', 'trouver', 'itineraire*', 'metro', 'bus', 'carte'],
      r: `Nous sommes au <b>${ADRESSE}</b>.<br>${lien('contact.html', 'Voir la carte')}`,
      chips: ['Contact', 'Horaires'] },
    { id: 'horaires', w: 5, keys: ['horaire*', 'ouvert*', 'ouverture', 'rendez vous', 'rdv', 'reserv*', 'disponib*', 'ferme*'],
      r: `Je n’ai pas les horaires ni les créneaux disponibles. Pour prendre rendez-vous ou connaître les horaires :<br>${CONTACT}`,
      chips: ['Adresse', 'Tarifs'] },
    { id: 'contact', w: 4, keys: ['contact*', 'telephone*', 'tel', 'appeler', 'numero*', 'joindre', 'mail*', 'email*', 'ecrire', 'courriel'],
      r: `Vous pouvez nous joindre :<br>${CONTACT}<br>${lien('contact.html', 'Page Contact')}`,
      chips: ['Adresse', 'Réseaux sociaux'] },
    { id: 'don', w: 4, keys: ['don', 'dons', 'donner', 'faire un don', 'soutenir', 'financer', 'generosite'],
      r: `Merci pour votre générosité ! « Votre soutien transforme des vies. »<br>${lien('don.html', 'Faire un don')}`,
      chips: ['Bénévolat', 'Partenariat'] },
    { id: 'benevolat', w: 5, keys: ['benevol*', 'volontaire*', 'mon temps', 'aider l association'],
      r: `Donnez de votre temps et faites la différence ! Écrivez-nous à ${lien('mailto:' + MAIL + '?subject=Je%20souhaite%20devenir%20b%C3%A9n%C3%A9vole', MAIL)} ou appelez le ${TEL}.`,
      chips: ['Partenariat', 'Faire un don'] },
    { id: 'partenariat', w: 5, keys: ['partenaire*', 'partenariat*', 'sponsor*', 'mecenat', 'entreprise*'],
      r: `Construisons ensemble des projets inclusifs ! Écrivez-nous à ${lien('mailto:' + MAIL + '?subject=Proposition%20de%20partenariat', MAIL)} ou appelez le ${TEL}.`,
      chips: ['Bénévolat', 'Faire un don'] },
    { id: 'reseaux', w: 4, keys: ['reseau*', 'instagram', 'insta', 'facebook', 'tiktok', 'tik tok', 'suivre', 'qr', 'qr code'],
      r: `Suivez-nous : Instagram <b>@les_pas_de_lespoir_</b>, TikTok <b>@les_pas_de_lespoir_</b> et Facebook <b>Asso Les Pas de L’espoir</b>.<br>${lien('contact.html', 'Voir les QR codes')}`,
      chips: ['Contact', 'Galerie'] },
    { id: 'galerie', w: 4, keys: ['galerie', 'photo*', 'image*', 'video*'],
      r: `Retrouvez nos moments forts en images : ${lien('galerie.html', 'la galerie')}.`,
      chips: ['Actualités', 'Activités'] },
    { id: 'actus', w: 4, keys: ['actualite*', 'nouveaute*', 'news', 'evenement*'],
      r: `Les nouvelles de l’association sont sur la page ${lien('actualites.html', 'Actualités')}.`,
      chips: ['Galerie', 'Réseaux sociaux'] },
    { id: 'asso', w: 3, keys: ['association', 'qui etes', 'qui sommes', 'presentation', 'mission*', 'valeur*', 'but', 'objectif*'],
      r: `L’association <b>Les Pas de l’Espoir</b> accompagne les familles et les enfants à besoins spécifiques, à chaque étape de leur parcours, avec bienveillance et expertise.<br>${lien('qui-sommes-nous.html', 'En savoir plus')}`,
      chips: ['Activités', 'Adhésion'] },
    { id: 'sante', w: 6, keys: ['medecin*', 'medical*', 'diagnostic*', 'medicament*', 'douleur*', 'urgence*', 'symptome*', 'guerir', 'guerison', 'efficace*', 'soigner', 'maladie*', 'dangereux', 'effet*'],
      r: `Je ne suis pas un professionnel de santé et je ne peux pas donner d’avis médical. Pour toute question sur une séance ou un accompagnement, contactez l’équipe :<br>${CONTACT}<br>En cas d’urgence, appelez le <b>15</b> (SAMU) ou le <b>112</b>.` },
    { id: 'merci', w: 2, keys: ['merci*'], r: 'Avec plaisir ! N’hésitez pas si vous avez d’autres questions.', chips: ['Tarifs', 'Activités', 'Contact'] },
    { id: 'bye', w: 2, keys: ['au revoir', 'aurevoir', 'a bientot', 'bonne journee', 'bonne soiree'], r: 'À bientôt ! Prenez soin de vous.' },
    { id: 'hello', w: 1, keys: ['bonjour', 'bonsoir', 'salut', 'coucou', 'hello', 'hey'],
      r: 'Bonjour ! Posez-moi une question simple : tarifs, adhésion, activités, adresse…', chips: ['Tarifs', 'Adhésion', 'Activités', 'Contact'] },
  ];

  const FALLBACK = `Je n’ai pas bien compris, désolé. Je réponds aux questions simples (tarifs, adhésion, activités, adresse, contact…).<br><br>${PRENDRE_CONTACT}`;
  const START_CHIPS = ['Tarifs', 'Adhésion', 'Activités', 'Adresse', 'Contact', 'Faire un don'];

  // ----- Moteur de correspondance -----
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, ' ').replace(/[^a-z0-9€ ]/g, ' ').replace(/\s+/g, ' ').trim();

  const hit = (padded, key) => {
    const k = norm(key.replace('*', '')) ;
    return key.endsWith('*') ? padded.includes(' ' + k) : padded.includes(' ' + k + ' ');
  };

  function answer(text) {
    const padded = ' ' + norm(text) + ' ';
    let best = null, bestScore = 0;

    // 1) activités précises (non tarifées dans les flyers)
    for (const a of ACTIVITES) {
      const n = a.keys.filter(k => hit(padded, k)).length;
      if (n && 4 * n > bestScore) {
        bestScore = 4 * n;
        best = { r: `<b>${a.nom}</b> : cela relève du <b>${a.pole}</b>. ${a.tarif}<br>${lien('nos-activites.html', 'Voir nos activités')}`, chips: ['Tarifs', 'Adhésion', 'Contact'] };
      }
    }
    // 2) réponses générales / tarifs
    for (const it of INTENTS) {
      const n = it.keys.filter(k => hit(padded, k)).length;
      if (n && it.w + n - 1 > bestScore) { bestScore = it.w + n - 1; best = it; }
    }
    return best || { r: FALLBACK, chips: START_CHIPS };
  }

  // ----- Interface -----
  const launcher = document.createElement('button');
  launcher.className = 'chat-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Ouvrir l’assistant : poser une question');
  launcher.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg><span>Une question ?</span>';

  const panel = document.createElement('section');
  panel.className = 'chat-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Assistant Les pas de l’espoir');
  panel.innerHTML = `
    <div class="chat-head">
      <img src="images/logo.png" alt="">
      <div><strong>Assistant des Pas de l’espoir</strong><small>Réponses automatiques</small></div>
      <button class="chat-close" type="button" aria-label="Fermer l’assistant">&times;</button>
    </div>
    <div class="chat-log" role="log" aria-live="polite"></div>
    <div class="chat-chips"></div>
    <form class="chat-form" autocomplete="off">
      <input type="text" name="q" placeholder="Écrivez votre question…" aria-label="Votre question" maxlength="200">
      <button type="submit">Envoyer</button>
    </form>`;

  document.body.append(launcher, panel);

  const log = panel.querySelector('.chat-log');
  const chips = panel.querySelector('.chat-chips');
  const form = panel.querySelector('.chat-form');
  const input = form.q;
  let started = false;

  const scroll = () => { log.scrollTop = log.scrollHeight; };

  function addUser(text) {
    const d = document.createElement('div');
    d.className = 'msg msg-user';
    d.textContent = text;                 // texte du visiteur : jamais interprété comme HTML
    log.appendChild(d); scroll();
  }

  function addBot(html) {
    const d = document.createElement('div');
    d.className = 'msg msg-bot';
    d.innerHTML = html;                   // réponses écrites dans ce fichier uniquement
    log.appendChild(d); scroll();
  }

  function setChips(list) {
    chips.innerHTML = '';
    (list || START_CHIPS).forEach(c => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.textContent = c;
      b.addEventListener('click', () => ask(c));
      chips.appendChild(b);
    });
  }

  function ask(text) {
    text = text.trim();
    if (!text) return;
    addUser(text);
    const typing = document.createElement('div');
    typing.className = 'msg msg-bot msg-typing';
    typing.textContent = '•••';
    log.appendChild(typing); scroll();
    const res = answer(text);
    setTimeout(() => {
      typing.remove();
      addBot(res.r);
      setChips(res.chips);
    }, 450);
  }

  function openChat() {
    panel.hidden = false; launcher.hidden = true;
    if (!started) {
      started = true;
      addBot('Bonjour ! Je suis l’assistant automatique de l’association <b>Les pas de l’espoir</b>. Je réponds aux questions simples : tarifs, adhésion, activités, adresse…');
      setChips(START_CHIPS);
    }
    input.focus();
  }
  function closeChat() { panel.hidden = true; launcher.hidden = false; launcher.focus(); }

  launcher.addEventListener('click', openChat);
  panel.querySelector('.chat-close').addEventListener('click', closeChat);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) closeChat(); });
  form.addEventListener('submit', e => { e.preventDefault(); const v = input.value; input.value = ''; ask(v); });
})();
