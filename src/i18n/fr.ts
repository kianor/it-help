import type { Dict } from "./nl";

/**
 * Français (fr-BE) — même ton que la source néerlandaise :
 * phrases courtes, langage simple, honnête, sans jargon commercial.
 */
const fr: Dict = {
  locale: "fr",
  meta: {
    home: {
      title: "RitsIT | Aide informatique, PC gaming sur mesure & entretien de consoles à Herent et Louvain",
      description:
        "Montage de PC gaming, réparation d'ordinateurs, nettoyage de consoles et support IT pour petites entreprises. Prix fixes à l'avance, explications claires, quelqu'un du quartier. Herent et Louvain.",
    },
    pc: {
      title: "PC gaming sur mesure à Louvain | prix fixe dès 130 €",
      description:
        "Faites monter un PC gaming sur mesure à Herent ou Louvain. Vous commandez les pièces vous-même sans marge d'intermédiaire ; je monte, teste et livre prêt à jouer. Prix fixes dès 130 €.",
    },
    herstel: {
      title: "Aide informatique à domicile à Herent et Louvain",
      description:
        "Réparation de PC ou laptop, aide informatique à domicile ou dépannage à distance par partage d'écran à Herent et Louvain. Prix fixes, explications claires, conseils honnêtes.",
    },
    consoles: {
      title: "Réparation PlayStation ou manette à Louvain",
      description:
        "Nettoyage de console, réparation du drift des Joy-Con, nettoyage en profondeur de manettes ou contrôle parental. Prix fixes, souvent prêt le jour même. Herent et Louvain.",
    },
    zaken: {
      title: "Support IT pour petites entreprises à Louvain",
      description:
        "Support IT pour coiffeurs, garages, cabinets et autres petites entreprises à Herent et Louvain. Forfait mensuel fixe, check IT gratuit, réponse le jour ouvrable même.",
    },
    prijzen: {
      title: "Tous les prix fixes sur une page",
      description:
        "La liste complète des prix : montages PC, réparations, consoles, aide à domicile et forfaits entreprises. Prix fixes à l'avance, pas de surprises. Herent et Louvain.",
    },
    contact: {
      title: "Contact | appelez, envoyez un WhatsApp ou un message",
      description:
        "Contactez-moi pour de l'aide informatique, un PC sur mesure ou une réparation de console à Herent et Louvain. Appelez, envoyez un WhatsApp ou utilisez le formulaire. Réponse le jour ouvrable même.",
    },
    afspraak: {
      title: "Prendre rendez-vous en ligne",
      description: "Choisissez vous-même un moment pour de l'aide informatique, un montage PC ou une réparation de console à Herent ou Louvain. Confirmation par mail, déplacement gratuit jusqu'à 24 h à l'avance.",
    },
    account: {
      title: "Mon RitsIT",
      description: "Suivez vos réparations et rendez-vous au même endroit. Connexion sans mot de passe, via un lien e-mail sécurisé.",
    },
    volg: { title: "Suivez votre réparation", description: "Suivez en direct l'état de votre réparation avec votre code de suivi." },
    privacy: {
      title: "Déclaration de confidentialité",
      description: "Comment ce site traite vos données, expliqué simplement.",
    },
    voorwaarden: {
      title: "Conditions générales",
      description: "Les conditions générales, courtes et en langage clair.",
    },
  },

  nav: {
    pc: "PC sur mesure",
    herstel: "Réparations",
    consoles: "Consoles",
    zaken: "Entreprises",
    prijzen: "Prix",
    contact: "Contact",
    afspraak: "Rendez-vous",
    account: "Mon RitsIT",
  },

  common: {
    callCta: "Appelez ou envoyez un WhatsApp",
    whatsappCta: "Envoyer un WhatsApp",
    callMe: "Appelez-moi",
    sendMessage: "Envoyer un message",
    moreInfo: "Plus d'infos →",
    viewPrices: "Voir les prix fixes",
    toHome: "Vers la page d'accueil",
    skipToContent: "Aller au contenu",
    gameMode: "Mode gamer",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    travel: "Gratuit dans un rayon de 10 km autour de Herent, au-delà 0,40 €/km.",
    travelLabel: "Déplacement",
    responsePromise:
      "Réponse le jour ouvrable même, première aide à distance en soirée, sur place dans les 48 heures.",
    openingInfo: "Disponible en semaine le soir et le samedi",
    region: "Herent, Louvain et communes voisines",
    from: "dès",
  },

  promo: {
    label: "Offre de lancement :",
    template:
      "Encore {left} {slots} →",
    one: "place",
    many: "places",
  },

  home: {
    kicker: "RitsIT · réparé en un éclair",
    heroTitle: "De l'aide informatique de votre quartier.",
    heroAccent: "Prix fixes, pas de surprises.",
    heroSub:
      "Un PC gaming à monter, un laptop lent, une PlayStation bruyante ou une entreprise sans informaticien ? Je règle le problème et je vous explique ce qui s'est passé, en langage clair.",
    blocks: [
      {
        title: "PC sur mesure",
        text: "Vous fixez le budget, je choisis les pièces, vous les commandez vous-même. Pas de marge d'intermédiaire, garantie complète du magasin.",
        price: "dès 130 €",
      },
      {
        title: "Réparation PC & laptop",
        text: "Laptop lent, virus ou wifi capricieux ? À domicile ou à distance, avec des explications claires.",
        price: "dès 25 €",
      },
      {
        title: "Consoles & manettes",
        text: "PlayStation bruyante, Joy-Con qui drift ou manette collante. Souvent prêt le jour même.",
        price: "dès 25 €",
      },
      {
        title: "Pour les entreprises",
        text: "Pas d'informaticien ? Pour un forfait mensuel fixe, je garde tout en état de marche. Commencez par un check IT gratuit.",
        price: "check IT gratuit",
      },
    ],
    howTitle: "Comment ça marche",
    stepLabel: "étape",
    steps: [
      { title: "Contactez-moi", text: "Appelez, envoyez un WhatsApp ou utilisez le formulaire. Réponse aujourd'hui encore." },
      { title: "Prix fixe à l'avance", text: "Vous savez exactement ce que ça coûte avant que je commence. Pas de surprises après." },
      { title: "Résolu, avec explications", text: "Je règle le problème et je vous explique calmement ce qui n'allait pas et comment l'éviter." },
    ],
    whyTitle: "Pourquoi chez moi ?",
    why: [
      { title: "Prix fixes", text: "Chaque service a un prix fixe, convenu à l'avance. Vous le trouvez simplement sur ce site." },
      { title: "Du quartier", text: "J'habite et je travaille à Herent et Louvain. Pas de call center, pas de musique d'attente." },
      { title: "Langage clair", text: "Des explications qui vous servent vraiment, sans jargon et sans baratin commercial." },
      { title: "Conseils honnêtes", text: "La réparation ne vaut plus la peine ? Je vous le dis franchement et je vous aide à choisir ce qui est malin." },
    ],
    reviewsTitle: "Avis de clients",
    reviewsText:
      "Je viens de me lancer, les premiers avis arrivent. Envie d'être parmi mes cinq premiers clients ? Vous recevez -50%, en échange d'un avis Google honnête. Vous payez la moitié, je reçois mes premières étoiles. Tout le monde y gagne.",
    ctaTitle: "Quelque chose de cassé, de lent, ou de grands projets ?",
    ctaText:
      "Appelez-moi ou envoyez un WhatsApp et vous saurez aujourd'hui encore où vous en êtes. Actif à Herent, Louvain et communes voisines.",
  },

  pcPage: {
    title: "PC sur mesure",
    intro:
      "Vous rêvez d'un PC gaming mais le montage vous fait peur ? Vous fixez votre budget, je cherche les meilleures pièces, et vous les commandez simplement vous-même en ligne. Ainsi vous ne payez aucune marge d'intermédiaire et vous gardez toute la garantie du magasin. Ensuite je monte le tout dans les règles de l'art, testé et prêt à jouer. Dès 130 euros.",
    stepsTitle: "Comment ça marche, en 7 étapes",
    steps: [
      { title: "Prise de contact", text: "On passe en revue votre budget, vos jeux et vos souhaits. Gratuit et sans engagement." },
      { title: "Liste de pièces sur mesure", text: "Vous recevez une liste des meilleures pièces pour votre budget, avec les liens de commande." },
      { title: "Vous commandez vous-même", text: "Directement au magasin. Pas de marge d'intermédiaire, et la garantie constructeur complète est à votre nom." },
      { title: "Je monte", text: "Montage soigné avec un câblage propre." },
      { title: "Windows et BIOS", text: "Installation, réglages BIOS/EXPO et tous les pilotes à jour." },
      { title: "Test de charge et rapport", text: "Votre PC est testé en température et en stabilité. Vous recevez le rapport avec." },
      { title: "30 jours de suivi", text: "Une question ou un petit souci le premier mois ? Je vous aide gratuitement." },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Pourquoi est-ce que je commande les pièces moi-même ?",
        a: "Ainsi vous ne payez pas de marge d'intermédiaire et la garantie constructeur de chaque pièce est à votre nom auprès du magasin. Si quelque chose casse sous garantie, vous le réglez directement, sans intermédiaire. Je vous aide bien sûr si vous ne savez pas comment faire.",
      },
      {
        q: "Et si une pièce arrive cassée ?",
        a: "Je le remarque pendant le montage ou le test de charge. Vous la renvoyez simplement au magasin et je continue dès que la pièce de remplacement arrive.",
      },
      {
        q: "Combien de temps prend un montage ?",
        a: "En général quelques jours une fois toutes les pièces reçues, selon mon agenda. Vous recevez un rendez-vous clair à l'avance.",
      },
      {
        q: "Vous montez aussi des PC pour le montage vidéo ou le bureau ?",
        a: "Bien sûr. Le processus est le même : votre budget et votre usage déterminent la liste de pièces.",
      },
      {
        q: "Puis-je upgrader mon vieux PC au lieu d'en acheter un neuf ?",
        a: "Souvent oui, et c'est généralement moins cher. Avec une session d'upgrade (55 €) je regarde ce qui a du sens. Si ça n'en vaut pas la peine, je vous le dis franchement.",
      },
    ],
    ctaTitle: "Prêt à monter votre PC ?",
    ctaText: "Dites-moi votre budget et vos jeux préférés, et je vous fais une proposition.",
  },

  herstelPage: {
    title: "Réparation PC & laptop, aussi chez vous",
    intro:
      "Un laptop lent, un wifi capricieux ou une imprimante qui fait encore des siennes ? Je passe, je répare et je vous explique calmement ce qui n'allait pas. Si la réparation ne vaut plus la peine, je vous le dis honnêtement et je vous aide à choisir ce qui est malin.",
    repairTitle: "Réparation & entretien",
    homeTitle: "Aide à domicile & extras",
    homeIntro:
      "Vous préférez une aide à distance ? Par partage d'écran sécurisé, je résous beaucoup de choses sans déplacement, idéal pour les questions rapides.",
    ctaTitle: "Envie de savoir aujourd'hui encore où vous en êtes ?",
    ctaText: "Appelez-moi ou envoyez un WhatsApp et décrivez brièvement le problème. Vous recevez tout de suite un prix fixe.",
  },

  consolesPage: {
    title: "Consoles & manettes",
    intro:
      "Votre PlayStation souffle comme un réacteur ? Votre Joy-Con drift ? Votre manette colle encore de ce fameux verre de cola ? Je rends les consoles propres et silencieuses à l'intérieur et je répare les manettes. Prix fixes, souvent prêt le jour même.",
    galleryTitle: "Avant et après",
    galleryIntro:
      "De vrais appareils de vrais clients. Faites glisser le curseur et voyez la différence : voilà comment une console arrive, et voilà comment elle repart.",
    before: "Avant",
    after: "Après",
    sliderLabel: "Comparer avant et après",
    parentsTitle: "Pour les parents",
    parentsText:
      "Vous voulez garder le contrôle du temps d'écran et des achats sur la console de vos enfants ? Je configure le contrôle parental sur la console, le téléphone et le wifi, et je vous explique comment le gérer ensuite vous-même.",
    ctaTitle: "Console ou manette cassée ?",
    ctaText: "Envoyez-moi une photo ou une vidéo du problème par WhatsApp et vous connaissez tout de suite le prix fixe.",
  },

  zakenPage: {
    title: "L'IT pour votre entreprise, sans informaticien",
    intro:
      "Pas d'informaticien, mais des ordinateurs, une caisse et des mails qui doivent simplement fonctionner ? Pour un forfait mensuel fixe, je garde tout à jour, je contrôle vos sauvegardes et je suis votre première ligne d'assistance.",
    checkKicker: "gratuit et sans engagement",
    checkTitle: "Le check IT gratuit",
    checkText:
      "En une demi-heure sur place, vous savez où votre entreprise court un risque : sauvegardes, sécurité, mises à jour et réseau. Vous recevez un rapport d'une page A4, en langage clair. Ensuite vous décidez vous-même quoi en faire, sans obligation.",
    checkCta: "Demander le check IT gratuit",
    packagesTitle: "Forfaits et tarifs",
    promiseLabel: "Ma promesse de réponse",
  },

  prijzenPage: {
    title: "Tous les prix, cartes sur table",
    intro:
      "Des prix fixes, connus à l'avance. Vous hésitez sur le service qu'il vous faut ? Appelez-moi ou envoyez un WhatsApp, et je vous dis honnêtement ce que ce sera, et ce qui n'est pas nécessaire.",
    notFoundTitle: "Votre problème n'est pas dans la liste ?",
    notFoundText: "Demandez simplement. Si je ne peux pas le faire, je vous oriente honnêtement vers quelqu'un qui peut.",
  },

  contactPage: {
    title: "Contactez-moi",
    intro:
      "Appeler ou envoyer un WhatsApp est le plus rapide, surtout le soir. Un message via le formulaire fonctionne aussi : vous aurez de mes nouvelles aujourd'hui encore.",
    form: {
      name: "Nom *",
      phone: "Téléphone *",
      email: "E-mail (facultatif, pour une confirmation)",
      service: "De quoi s'agit-il ? *",
      servicePlaceholder: "Choisissez un service",
      message: "Votre message *",
      messagePlaceholder:
        "Décrivez brièvement le problème ou vos projets. La marque et le modèle de l'appareil aident aussi.",
      send: "Envoyer votre demande",
      sending: "Envoi...",
      sentTitle: "Envoyé.",
      sentText: "Je vous rappelle ou vous envoie un WhatsApp aujourd'hui encore.",
      error: "Quelque chose a mal tourné. N'hésitez pas à m'appeler ou m'envoyer un WhatsApp directement.",
      privacyNote: "Vos données ne servent qu'à vous aider. Voir la",
      privacyLink: "déclaration de confidentialité",
    },
    serviceOptions: [
      "PC sur mesure",
      "Réparation PC ou laptop",
      "Console ou manette",
      "Aide à domicile",
      "Pour mon entreprise (check IT gratuit)",
      "Autre chose",
    ],
    aside: {
      regionLabel: "Zone d'intervention",
      expectLabel: "À quoi vous attendre",
      newsletterLabel: "Un bon conseil de temps en temps ?",
      newsletterText:
        "Pas de spam, au maximum un mail par mois avec des conseils et des offres. Désinscription à tout moment en un clic.",
    },
  },

  volgPage: {
    title: "Suivez votre réparation",
    intro:
      "Entrez le code de suivi que je vous ai donné (il est aussi dans vos mails). Vous voyez ainsi exactement où en est votre appareil.",
    search: "Rechercher",
    notFound: "Aucune réparation trouvée avec ce code. Vérifiez le code, ou appelez-moi ou envoyez un WhatsApp au {phone}.",
    deviceLabel: "Appareil",
    codeLabel: "Code de suivi",
    priceLabel: "Prix convenu",
    updatesLabel: "Mises à jour",
    now: "← maintenant",
    questions: "Des questions sur votre réparation ? Appelez-moi ou envoyez un WhatsApp au",
    statuses: {
      ontvangen: "Reçu",
      "diagnose bezig": "Diagnostic en cours",
      "wacht op onderdelen": "En attente de pièces",
      "in herstel": "En réparation",
      "klaar voor ophaling": "Prêt à récupérer",
      afgerond: "Terminé",
    } as Record<string, string>,
  },

  newsletter: {
    placeholder: "votre@email.be",
    submit: "Tenez-moi au courant",
    busy: "En cours...",
    done: "Presque fini. Vérifiez votre boîte mail et cliquez sur le lien de confirmation.",
    error: "Ça n'a pas marché. Réessayez plus tard.",
    confirmOkTitle: "Vous êtes inscrit !",
    confirmOkText:
      "Merci. Vous recevrez de temps en temps un mail avec des conseils et des offres, au maximum un par mois. Désinscription à tout moment en un clic.",
    confirmFailTitle: "Ce lien ne fonctionne plus",
    confirmFailText:
      "Vous êtes peut-être déjà inscrit, ou le lien a expiré. Réinscrivez-vous simplement via la page contact.",
    unsubOkTitle: "Vous êtes désinscrit",
    unsubOkText: "Vous ne recevrez plus de mails de ma part. Merci d'avoir été là.",
    unsubFailTitle: "Ce lien ne fonctionne pas",
    unsubFailText: "Le lien n'est pas valide. Envoyez-moi un mail et je vous désinscris manuellement.",
  },

  footer: {
    servicesLabel: "Services",
    practicalLabel: "Pratique",
    links: {
      pc: "PC sur mesure",
      herstel: "Réparation PC & laptop",
      consoles: "Consoles & manettes",
      zaken: "Pour les entreprises",
      volg: "Suivez votre réparation",
      afspraak: "Prendre rendez-vous",
      prijzen: "Tous les prix fixes",
      voorwaarden: "Conditions générales",
      privacy: "Déclaration de confidentialité",
      reviews: "Avis Google",
    },
    kboPending: "Numéro d'entreprise (BCE) en cours de demande",
    kboPrefix: "BCE",
    exemption: "Régime de franchise pour petites entreprises",
  },


  calculator: {
    title: "De quel PC ai-je besoin ?",
    intro: "Glissez et choisissez, et voyez tout de suite quel forfait vous convient. Sans engagement, juste pratique.",
    budgetLabel: "Budget pour les pièces",
    useLabel: "Pour quoi allez-vous l'utiliser ?",
    uses: ["Gaming compétitif (shooters, fps élevés)", "Jeux AAA et solo", "École, bureau et navigation", "Vidéo, streaming et création"],
    resLabel: "À quelle résolution ?",
    verdictLabel: "Mon conseil",
    tierLow: "De quoi monter une machine fluide et silencieuse pour un usage quotidien.",
    tierMid: "De quoi monter un PC gaming solide en 1080p/1440p qui tiendra des années.",
    tierHigh: "Là on est dans le haut de gamme : fps élevés, fluide en 1440p ou 4K.",
    warn4k: "Pour jouer confortablement en 4K, je conseille au moins 1500 € de pièces.",
    packageLabel: "Forfait adapté",
    partsLabel: "pièces (vous les commandez vous-même, sans marge d'intermédiaire)",
    cta: "Discuter de cette proposition avec moi",
  },
  reviewsSection: {
    title: "Ce que disent les clients",
    empty: "Je viens de me lancer, les premiers avis arrivent. Envie d'être parmi mes cinq premiers clients ? Vous recevez -50%, en échange d'un avis honnête. Tout le monde y gagne.",
    basedOn: "{count} avis · moyenne {avg}/5",
    readAll: "Lire tous les avis sur Trustpilot",
    write: "Écrire un avis vous-même",
    via: "via",
  },
  socialSection: {
    title: "Suivez l'atelier",
    intro: "Je filme comment je nettoie des consoles et monte des PC. Avant et après, sans blabla.",
  },
  afspraakPage: {
    title: "Prendre rendez-vous",
    intro: "Choisissez un moment qui vous convient. Je confirme par mail, et déplacer est gratuit jusqu'à 24 heures à l'avance.",
    chooseDay: "Choisissez un jour",
    chooseSlot: "Choisissez une heure",
    noSlots: "Tous les créneaux sont pris pour le moment. Appelez-moi ou envoyez un WhatsApp et on trouvera un trou.",
    submit: "Demander ce rendez-vous",
    sending: "En cours...",
    sentTitle: "Demandé !",
    sentText: "Vous recevrez une confirmation par mail dès que possible. Le rendez-vous n'est définitif qu'à ce moment-là.",
    slotTakenError: "Ce créneau vient d'être pris. Choisissez une autre heure.",
    yourSlot: "Votre choix",
  },
  accountPage: {
    title: "Mon RitsIT",
    loginTitle: "Se connecter sans mot de passe",
    loginIntro: "Entrez votre adresse e-mail et vous recevrez un lien de connexion. Pas de mot de passe à retenir, rien à faire fuiter.",
    emailLabel: "Votre adresse e-mail",
    sendLink: "Envoyer mon lien de connexion",
    linkSent: "Vérifiez votre boîte mail ! Le lien fonctionne 15 minutes.",
    verifyFail: "Ce lien de connexion a expiré ou a déjà été utilisé. Demandez-en un nouveau ci-dessous.",
    hello: "Connecté en tant que",
    jobsTitle: "Mes réparations",
    jobsEmpty: "Pas encore de réparations à cette adresse e-mail. Apportez quelque chose et ça apparaîtra ici automatiquement.",
    apptsTitle: "Mes rendez-vous",
    apptsEmpty: "Pas encore de rendez-vous.",
    newApptCta: "Prendre rendez-vous",
    newsletterTitle: "Newsletter",
    newsletterOn: "Vous êtes inscrit.",
    newsletterOff: "Vous n'êtes pas inscrit.",
    logout: "Se déconnecter",
    track: "Voir le statut",
    statusWord: "statut",
  },

  konami: {
    title: "Joueur 2 est entré dans la partie !",
    text: "Vous connaissez les classiques. Dites ou écrivez « KONAMI » avec votre demande et recevez 5 € de réduction supplémentaire sur n'importe quel service.",
    close: "Continuer à jouer",
  },

  services: {
    pcBouwen: {
      slug: "pc-bouwen",
      title: "PC sur mesure",
      services: [
        { name: "Conseil de configuration sur mesure", price: "40 €", note: "Liste de pièces + liens de commande, déduit du montage" },
        { name: "Custom PC Build", price: "130 €", note: "Montage, Windows, BIOS/EXPO, test de charge, rapport de test, 30 jours de suivi" },
        { name: "Custom PC Build Pro", price: "170 €", note: "+ réglage BIOS, câblage premium, RGB, installation logicielle" },
        { name: "Gaming Setup Total", price: "199 €", note: "Build Pro + installation complète du bureau et câblage" },
        { name: "Session d'upgrade", price: "55 €", note: "GPU/RAM/SSD/alimentation, conseil et test inclus. +20 € par composant supplémentaire" },
      ],
    },
    herstel: {
      slug: "herstel",
      title: "Réparation PC & laptop",
      services: [
        { name: "Diagnostic", price: "25 €", note: "Déduit de la réparation" },
        { name: "Réparation / remplacement de matériel", price: "45 €/h" },
        { name: "Grand entretien", price: "59 €", note: "Nettoyage, pâte thermique, nettoyage de Windows, mesures avant/après" },
        { name: "Upgrade laptop SSD/RAM", price: "59 €", note: "Clonage de Windows et de vos données inclus" },
        { name: "Nouveau PC/laptop prêt à l'emploi + transfert de données", price: "69 €", note: "+20 € pour effacer l'ancien appareil en toute sécurité" },
      ],
    },
    consoles: {
      slug: "consoles",
      title: "Consoles & manettes",
      services: [
        { name: "Grand nettoyage de console", price: "45 €", note: "Poussière, ventilateur, contrôle du bruit et des températures" },
        { name: "Nettoyage + nouvelle pâte thermique", price: "59 €", note: "Génération PS4/Xbox One" },
        { name: "Nettoyage en profondeur de manette", price: "25 €", note: "Boutons ou gâchettes qui collent" },
        { name: "Réparation drift Joy-Con", price: "29 €", note: "Nouveau module de stick inclus. 49 € la paire" },
        { name: "Remplacement de batterie de manette", price: "25 €", note: "Batterie incluse" },
        { name: "Nouvelle console prête à jouer", price: "40 €", note: "Comptes, mises à jour, transfert de données" },
        { name: "Configuration du contrôle parental", price: "49 €", note: "Console + téléphone + wifi" },
        { name: "Console ou PC prêt à vendre", price: "39 €", note: "Effacement, nettoyage, photos, texte d'annonce" },
      ],
      footnote:
        "Je n'ouvre pas les appareils encore sous garantie constructeur. Je vous oriente alors honnêtement vers le fabricant, c'est gratuit pour vous.",
    },
    aanHuis: {
      slug: "aan-huis",
      title: "Aide à domicile & extras",
      services: [
        { name: "Aide à domicile", price: "49 €", note: "Wifi, imprimante, mail, virus, explications. Première heure, ensuite 40 €/h" },
        { name: "Aide à distance par partage d'écran", price: "25 €", note: "Par demi-heure" },
        { name: "Setup streaming débutant", price: "79 €", note: "OBS, micro, caméra, enregistrement test" },
        { name: "Nettoyage en profondeur de clavier mécanique", price: "29 €" },
        { name: "Serveur maison / NAS / Plex", price: "dès 69 €" },
      ],
    },
    voorZaken: {
      slug: "voor-zaken",
      title: "Pour les entreprises",
      services: [
        { name: "Check IT gratuit", price: "0 €", note: "30 min sur place + rapport sur une page A4" },
        { name: "Sérénité Basic", price: "95 €/mois", note: "Jusqu'à 3 appareils : mises à jour, contrôle des sauvegardes, sécurité, support à distance, 1h sur place par trimestre" },
        { name: "Sérénité Plus", price: "145 €/mois", note: "4 à 8 appareils + gestion du réseau + visite trimestrielle + inventaire" },
        { name: "Onboarding unique", price: "150 €", note: "Inventaire, mise en place des sauvegardes, documentation" },
        { name: "Projets", price: "55 €/h", note: "Réseau, postes de travail, Microsoft 365/Google Workspace, NAS" },
      ],
    },
  },

  privacy: {
    title: "Déclaration de confidentialité",
    updated: "Dernière mise à jour : juillet 2026",
    sections: [
      {
        h: "En bref",
        ps: [],
        list: [
          "Je ne demande que les données nécessaires pour vous aider.",
          "Je ne vends ni ne partage jamais vos données à des fins publicitaires.",
          "Ce site n'utilise aucun cookie publicitaire ou de suivi. C'est pourquoi vous ne voyez pas de bannière cookies.",
          "Vous pouvez toujours demander quelles données je détiens sur vous, et demander à les corriger ou les supprimer.",
        ],
      },
      {
        h: "Qui suis-je ?",
        ps: [
          "RitsIT, Herent, Louvain et communes voisines. Vous me joignez au {phone} ou via {email}. Je suis le responsable du traitement des données de ce site.",
        ],
      },
      {
        h: "Quelles données je collecte, et pourquoi ?",
        ps: [
          "Formulaire de contact : votre nom, numéro de téléphone, éventuellement votre e-mail et votre message. J'en ai besoin pour vous rappeler ou vous écrire et vous aider. Base légale : les démarches nécessaires à la conclusion d'un contrat.",
          "Réparations : votre nom, vos coordonnées et les informations sur votre appareil, plus un code de suivi pour suivre l'état. Base légale : l'exécution du contrat.",
          "Newsletter : uniquement votre e-mail, et seulement si vous confirmez vous-même votre inscription via le mail que vous recevez (double opt-in). Base légale : votre consentement. Désinscription à tout moment en un clic au bas de chaque mail.",
          "E-mails : les confirmations et mises à jour sont envoyées via Resend (Resend Inc.), un service d'e-mail. Votre adresse passe par leurs serveurs uniquement pour livrer le mail.",
        ],
      },
      {
        h: "Ce que je ne fais pas",
        ps: [],
        list: [
          "Pas de cookies publicitaires ni de suivi de votre navigation.",
          "Pas de revente ni de partage de données avec des tiers à des fins marketing.",
          "Pas de profilage ni de décisions automatisées.",
        ],
      },
      {
        h: "Les données sur votre appareil",
        ps: [
          "Quand je répare votre PC, laptop ou console, je ne touche pas à vos fichiers, sauf si c'est nécessaire pour la réparation et que nous l'avons convenu à l'avance (par exemple un transfert de données). Si vous voulez préparer un appareil à la vente, je l'efface de façon sûre et définitive.",
        ],
      },
      {
        h: "Combien de temps je garde vos données ?",
        ps: [
          "Les demandes et données de réparation sont conservées aussi longtemps que nécessaire pour la mission et les obligations légales (comme la facturation), puis supprimées. Les données de la newsletter sont conservées jusqu'à votre désinscription.",
        ],
      },
      {
        h: "Vos droits",
        ps: [
          "Vous pouvez toujours demander à consulter, corriger, supprimer ou transférer vos données, et vous opposer à leur utilisation. Un mail à {email} ou un coup de fil suffit. Pas satisfait de ma réponse ? Vous pouvez vous adresser à l'Autorité de protection des données (autoriteprotectiondonnees.be).",
        ],
      },
    ],
  },

  voorwaarden: {
    title: "Conditions générales",
    updated: "Dernière mise à jour : juillet 2026",
    sections: [
      {
        h: "1. Qui",
        ps: [
          "RitsIT, Herent, Louvain et communes voisines. Petite entreprise soumise au régime de la franchise, TVA non applicable.",
        ],
      },
      {
        h: "2. Prix fixes, convenus à l'avance",
        ps: [
          "Chaque mission ne démarre qu'après que nous ayons fixé le prix ensemble. Si quelque chose d'imprévu surgit pendant le travail et changerait le prix, je m'arrête et je vous consulte d'abord. C'est vous qui décidez si je continue.",
        ],
      },
      {
        h: "3. Pièces et garantie",
        ps: [
          "Pour les montages PC, vous commandez les pièces vous-même : la garantie constructeur est alors entièrement à votre nom auprès du magasin. Sur mon propre travail (montage, réparation), vous avez 30 jours de suivi : si quelque chose tourne mal durant cette période à cause de mon travail, je le règle gratuitement. Je n'ouvre pas les appareils encore sous garantie constructeur ; je vous oriente alors vers le fabricant.",
        ],
      },
      {
        h: "4. Vos données",
        ps: [
          "Faites vous-même une sauvegarde des fichiers importants avant d'apporter un appareil, ou demandez-moi d'en faire une ensemble. Je travaille soigneusement, mais lors d'une réparation, une perte de données ne peut jamais être totalement exclue. Pour les données personnelles : voir la déclaration de confidentialité.",
        ],
      },
      {
        h: "5. Responsabilité",
        ps: [
          "Je suis assuré en responsabilité professionnelle. Ma responsabilité est limitée au montant de la mission, sauf dol ou faute grave. Je ne suis pas responsable des dommages indirects (comme la perte de données sans sauvegarde).",
        ],
      },
      {
        h: "6. Paiement et annulation",
        ps: [
          "Vous pouvez payer en espèces ou par virement/Payconiq à la fin de la mission, sauf accord contraire. Un rendez-vous peut être déplacé ou annulé sans frais jusqu'à 24 heures à l'avance. Les forfaits mensuels pour entreprises sont résiliables mensuellement.",
        ],
      },
      {
        h: "7. Appareils non récupérés",
        ps: [
          "Si vous ne récupérez pas un appareil dans les trois mois malgré des rappels répétés, je peux le considérer comme abandonné. Je vous préviendrai bien sûr largement avant d'en arriver là.",
        ],
      },
      {
        h: "8. Litiges",
        ps: [
          "Si nous ne trouvons pas de solution ensemble (ça m'étonnerait), le droit belge s'applique et les tribunaux de Louvain sont compétents. En tant que consommateur, vous pouvez aussi vous adresser au Service de médiation pour le consommateur (mediationconsommateur.be).",
        ],
      },
    ],
  },
};

export default fr;
