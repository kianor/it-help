/**
 * Nederlands (nl-BE) — brontaal. De teksten volgen de briefing:
 * korte zinnen, mensentaal, met hier en daar een Vlaamse knipoog.
 * Dit bestand bepaalt ook het type van de andere talen.
 */

const nl = {
  locale: "nl",
  meta: {
    home: {
      title: "RitsIT | Computerhulp, PC builds & console care in Herent en Leuven",
      description:
        "Game-pc laten bouwen, laptop herstellen, console reinigen of IT-hulp voor je zaak. Vaste prijzen vooraf, uitleg in mensentaal, iemand uit de buurt. Herent en Leuven.",
    },
    pc: {
      title: "Game-PC laten bouwen in Leuven | vaste prijs vanaf €130",
      description:
        "Custom game-pc laten bouwen in Herent of Leuven. Jij bestelt de onderdelen zelf zonder tussenmarge, ik bouw, test en lever speelklaar af. Vaste prijzen vanaf €130.",
    },
    herstel: {
      title: "Computerhulp aan huis Herent en Leuven",
      description:
        "PC of laptop herstellen, computerhulp aan huis of remote hulp via schermdeling in Herent en Leuven. Vaste prijzen, uitleg in mensentaal, eerlijk advies.",
    },
    consoles: {
      title: "PlayStation of controller herstellen Leuven",
      description:
        "Console reinigen, Joy-Con drift herstellen, controller deep clean of ouderlijk toezicht instellen. Vaste prijzen, vaak dezelfde dag klaar. Herent en Leuven.",
    },
    zaken: {
      title: "IT-support voor kleine ondernemingen Leuven",
      description:
        "IT-support voor kappers, garages, praktijken en andere kleine zaken in Herent en Leuven. Vast maandbedrag, gratis IT-check, reactie dezelfde werkdag.",
    },
    prijzen: {
      title: "Alle vaste prijzen op één pagina",
      description:
        "De volledige prijslijst: pc builds, herstel, consoles, hulp aan huis en pakketten voor zaken. Vaste prijzen vooraf, geen verrassingen. Herent en Leuven.",
    },
    contact: {
      title: "Contact | bel, app of stuur een bericht",
      description:
        "Neem contact op voor computerhulp, pc builds of console-herstel in Herent en Leuven. Bel, stuur een WhatsApp of gebruik het formulier. Reactie dezelfde werkdag.",
    },
    afspraak: {
      title: "Maak online een afspraak",
      description: "Kies zelf een moment voor computerhulp, een pc-build of consoleherstel in Herent of Leuven. Bevestiging per mail, gratis verzetten tot 24 uur vooraf.",
    },
    account: {
      title: "Mijn RitsIT",
      description: "Volg je herstellingen en afspraken op één plek. Inloggen zonder wachtwoord, via een veilige e-maillink.",
    },
    volg: { title: "Volg je herstelling", description: "Volg live de status van je herstelling met je volgcode." },
    privacy: {
      title: "Privacyverklaring",
      description: "Hoe deze site met je gegevens omgaat, uitgelegd in gewone mensentaal.",
    },
    voorwaarden: {
      title: "Algemene voorwaarden",
      description: "De algemene voorwaarden, kort en in gewone mensentaal.",
    },
  },

  nav: {
    pc: "PC bouwen",
    herstel: "Herstel",
    consoles: "Consoles",
    zaken: "Voor zaken",
    prijzen: "Prijzen",
    contact: "Contact",
    afspraak: "Afspraak",
    account: "Mijn RitsIT",
  },

  common: {
    callCta: "Bel of app me",
    whatsappCta: "Stuur een WhatsApp",
    callMe: "Bel me",
    sendMessage: "Stuur een bericht",
    moreInfo: "Meer info →",
    viewPrices: "Bekijk vaste prijzen",
    toHome: "Naar de homepagina",
    skipToContent: "Ga naar inhoud",
    gameMode: "Game-modus",
    menuOpen: "Menu openen",
    menuClose: "Menu sluiten",
    travel: "Gratis binnen 10 km van Herent, daarbuiten €0,40/km.",
    travelLabel: "Verplaatsing",
    responsePromise:
      "Reactie dezelfde werkdag, eerste hulp op afstand 's avonds, ter plaatse binnen 48 uur.",
    openingInfo: "Bereikbaar op weekdagen 's avonds en op zaterdag",
    region: "Herent, Leuven en deelgemeenten",
    from: "vanaf",
  },

  promo: {
    label: "Launch-actie:",
    // {total}, {left} en {slots} worden live ingevuld
    template:
      "Nog {left} {slots} vrij →",
    one: "plek",
    many: "plekken",
  },

  home: {
    kicker: "RitsIT · ritsvlug hersteld",
    heroTitle: "Computerhulp uit je eigen buurt.",
    heroAccent: "Vaste prijzen, geen verrassingen.",
    heroSub:
      "Game-pc laten bouwen, trage laptop, luide PlayStation of een zaak zonder IT'er? Ik los het op en leg uit wat er gebeurd is, in gewone mensentaal.",
    blocks: [
      {
        title: "PC laten bouwen",
        text: "Jij kiest je budget, ik zoek de onderdelen, jij bestelt zelf. Geen tussenmarge, alle garantie bij de winkel.",
        price: "vanaf €130",
      },
      {
        title: "PC & laptop herstel",
        text: "Trage laptop, virus of wifi die hapert? Aan huis of remote, met uitleg in gewone mensentaal.",
        price: "vanaf €25",
      },
      {
        title: "Consoles & controllers",
        text: "Luide PlayStation, driftende Joy-Con of plakkende controller. Vaak dezelfde dag klaar.",
        price: "vanaf €25",
      },
      {
        title: "Voor zaken",
        text: "Geen eigen IT'er? Voor een vast bedrag per maand hou ik alles draaiende. Start met een gratis IT-check.",
        price: "gratis IT-check",
      },
    ],
    howTitle: "Hoe het werkt",
    stepLabel: "stap",
    steps: [
      { title: "Neem contact op", text: "Bel, app of gebruik het formulier. Je krijgt vandaag nog antwoord." },
      { title: "Vaste prijs vooraf", text: "Je weet exact wat het kost vóór ik begin. Geen verrassingen achteraf." },
      { title: "Opgelost, met uitleg", text: "Ik los het op en leg rustig uit wat er aan de hand was en hoe je het voorkomt." },
    ],
    whyTitle: "Waarom bij mij?",
    why: [
      { title: "Vaste prijzen", text: "Elke dienst heeft een vaste prijs die vooraf vastligt. Die vind je gewoon op deze site." },
      { title: "Uit de buurt", text: "Ik woon en werk in Herent, Leuven en deelgemeenten. Geen callcenter, geen wachtmuziek." },
      { title: "Mensentaal", text: "Je krijgt uitleg waar je iets aan hebt, zonder jargon en zonder verkooppraatje." },
      { title: "Eerlijk advies", text: "Loont herstellen niet meer? Dan zeg ik dat eerlijk en help ik je kiezen wat wel slim is." },
    ],
    reviewsTitle: "Reviews van klanten",
    reviewsText:
      "Ik ben pas gestart, dus de eerste reviews komen eraan. Word jij een van mijn eerste vijf klanten? Dan krijg je -50%, in ruil voor één eerlijke Google-review. Jij betaalt de helft, ik krijg mijn eerste sterren. Iedereen content.",
    ctaTitle: "Iets kapot, iets traag of grote plannen?",
    ctaText:
      "Bel of app me en je weet vandaag nog waar je aan toe bent. Actief in Herent, Leuven en deelgemeenten.",
  },

  pcPage: {
    title: "PC laten bouwen",
    intro:
      "Droom je van een game-pc maar zie je op tegen het bouwen? Jij kiest je budget, ik zoek de beste onderdelen, jij bestelt ze gewoon zelf online. Zo betaal je geen tussenmarge en hou je alle garantie bij de winkel. Daarna bouw ik alles vakkundig in elkaar, getest en speelklaar. Vanaf 130 euro.",
    stepsTitle: "Zo werkt het, in 7 stappen",
    steps: [
      { title: "Kennismaking", text: "We overlopen je budget, je games en je wensen. Gratis en vrijblijvend." },
      { title: "Onderdelenlijst op maat", text: "Je krijgt een lijst met de beste onderdelen voor jouw budget, met bestellinks." },
      { title: "Jij bestelt zelf", text: "Rechtstreeks bij de winkel. Geen tussenmarge, en de volledige fabrieksgarantie staat op jouw naam." },
      { title: "Ik bouw", text: "Zorgvuldige montage met degelijk kabelmanagement." },
      { title: "Windows en BIOS", text: "Installatie, BIOS/EXPO-instellingen en alle drivers up-to-date." },
      { title: "Stresstest en testrapport", text: "Je pc wordt getest op temperatuur en stabiliteit. Je krijgt het rapport erbij." },
      { title: "30 dagen nazorg", text: "Vraagje of probleempje in de eerste maand? Ik help je gratis verder." },
    ],
    faqTitle: "Veelgestelde vragen",
    faq: [
      {
        q: "Waarom bestel ik de onderdelen zelf?",
        a: "Zo betaal je geen tussenmarge en staat de fabrieksgarantie van elk onderdeel op jouw naam bij de winkel. Gaat er binnen de garantie iets stuk, dan regel je dat rechtstreeks, zonder tussenpersoon. Ik help je uiteraard als je niet weet hoe.",
      },
      {
        q: "Wat als een onderdeel kapot aankomt?",
        a: "Dat merk ik tijdens de build of de stresstest. Je stuurt het gewoon terug naar de winkel en ik bouw verder zodra het vervangstuk er is.",
      },
      {
        q: "Hoe lang duurt een build?",
        a: "Zodra alle onderdelen binnen zijn meestal enkele dagen, afhankelijk van mijn agenda. Je krijgt vooraf een duidelijke afspraak.",
      },
      {
        q: "Bouw je ook pc's voor videobewerking of kantoor?",
        a: "Zeker. Het proces is hetzelfde: jouw budget en gebruik bepalen de onderdelenlijst.",
      },
      {
        q: "Kan ik mijn oude pc upgraden in plaats van een nieuwe te kopen?",
        a: "Vaak wel, en dat is meestal goedkoper. Met een upgrade-sessie (€55) kijk ik wat zinvol is. Loont het niet, dan zeg ik dat eerlijk.",
      },
    ],
    ctaTitle: "Klaar om te bouwen?",
    ctaText: "Vertel me je budget en je favoriete games, dan doe ik een voorstel.",
  },

  herstelPage: {
    title: "PC & laptop herstel, ook bij jou thuis",
    intro:
      "Trage laptop, wifi die hapert of een printer die weer eens ambetant doet? Ik kom langs, los het op en leg rustig uit wat er aan de hand was. Loont herstellen niet meer, dan zeg ik dat eerlijk en help ik je kiezen wat wel slim is.",
    repairTitle: "Herstel & onderhoud",
    homeTitle: "Hulp aan huis & extra's",
    homeIntro:
      "Liever hulp op afstand? Via veilige schermdeling los ik veel op zonder verplaatsing, ideaal voor snelle vragen.",
    ctaTitle: "Vandaag nog weten waar je aan toe bent?",
    ctaText: "Bel of app me en beschrijf kort het probleem. Je krijgt meteen een vaste prijs.",
  },

  consolesPage: {
    title: "Consoles & controllers",
    intro:
      "Blaast je PlayStation als een straaljager? Drift je Joy-Con? Plakt je controller nog van dat ene glas cola? Ik maak consoles vanbinnen weer proper en stil en herstel controllers. Vaste prijzen, vaak dezelfde dag klaar.",
    galleryTitle: "Voor en na",
    galleryIntro:
      "Echte toestellen van echte klanten. Sleep de schuif en zie het verschil: zo komt een console binnen, en zo gaat hij weer buiten.",
    before: "Voor",
    after: "Na",
    sliderLabel: "Vergelijk voor en na",
    parentsTitle: "Voor ouders",
    parentsText:
      "Wil je schermtijd en aankopen op de console van je kinderen onder controle? Ik stel ouderlijk toezicht in op console, telefoon en wifi, en leg je uit hoe je het daarna zelf beheert.",
    ctaTitle: "Console of controller kapot?",
    ctaText: "App me een foto of filmpje van het probleem, dan weet je meteen de vaste prijs.",
  },

  zakenPage: {
    title: "IT voor je zaak, zonder eigen IT'er",
    intro:
      "Geen eigen IT'er maar wel computers, een kassa en mail die gewoon moeten werken? Voor een vast bedrag per maand hou ik alles up-to-date, controleer ik je back-ups en ben ik je eerste hulplijn.",
    checkKicker: "gratis en vrijblijvend",
    checkTitle: "De gratis IT-check",
    checkText:
      "In een half uur ter plaatse weet je waar je zaak risico loopt: back-ups, beveiliging, updates en netwerk. Je krijgt een rapport op één A4, in mensentaal. Daarna beslis jij zelf wat je ermee doet, zonder verplichting.",
    checkCta: "Vraag de gratis IT-check aan",
    packagesTitle: "Pakketten en tarieven",
    promiseLabel: "Mijn reactiebelofte",
  },

  prijzenPage: {
    title: "Alle prijzen, gewoon op tafel",
    intro:
      "Vaste prijzen, vooraf gekend. Twijfel je welke dienst je nodig hebt? Bel of app me, dan zeg ik eerlijk wat het wordt, en wat níet nodig is.",
    notFoundTitle: "Staat jouw probleem er niet tussen?",
    notFoundText: "Vraag het gewoon. Kan ik het niet, dan verwijs ik je eerlijk door.",
  },

  contactPage: {
    title: "Neem contact op",
    intro:
      "Bellen of appen is het snelst, zeker 's avonds. Een bericht via het formulier kan ook: je hoort vandaag nog van me.",
    form: {
      name: "Naam *",
      phone: "Telefoon *",
      email: "E-mail (optioneel, voor een bevestiging)",
      service: "Waarover gaat het? *",
      servicePlaceholder: "Kies een dienst",
      message: "Je bericht *",
      messagePlaceholder:
        "Beschrijf kort het probleem of je plannen. Merk en type van het toestel helpt ook.",
      send: "Verstuur je aanvraag",
      sending: "Versturen...",
      sentTitle: "Verstuurd.",
      sentText: "Ik bel of app je vandaag nog terug.",
      error: "Er ging iets mis. Bel of app me gerust rechtstreeks.",
      privacyNote: "Je gegevens worden alleen gebruikt om je te helpen. Zie de",
      privacyLink: "privacyverklaring",
    },
    serviceOptions: [
      "PC laten bouwen",
      "PC of laptop herstellen",
      "Console of controller",
      "Hulp aan huis",
      "Voor mijn zaak (gratis IT-check)",
      "Iets anders",
    ],
    aside: {
      regionLabel: "Werkgebied",
      expectLabel: "Wat je mag verwachten",
      newsletterLabel: "Af en toe een slimme tip?",
      newsletterText:
        "Geen spam, hooguit één mail per maand met tips en acties. Uitschrijven kan altijd met één klik.",
    },
  },

  volgPage: {
    title: "Volg je herstelling",
    intro:
      "Vul de volgcode in die je van mij kreeg (die staat ook in je mails). Zo zie je precies hoe het met je toestel staat.",
    search: "Zoek op",
    notFound: "Geen herstelling gevonden met die code. Kijk de code even na, of bel of app me op {phone}.",
    deviceLabel: "Toestel",
    codeLabel: "Volgcode",
    priceLabel: "Afgesproken prijs",
    updatesLabel: "Updates",
    now: "← nu",
    questions: "Vragen over je herstelling? Bel of app me op",
    statuses: {
      ontvangen: "Ontvangen",
      "diagnose bezig": "Diagnose bezig",
      "wacht op onderdelen": "Wacht op onderdelen",
      "in herstel": "In herstel",
      "klaar voor ophaling": "Klaar voor ophaling",
      afgerond: "Afgerond",
    } as Record<string, string>,
  },

  newsletter: {
    placeholder: "jouw@mailadres.be",
    submit: "Hou me op de hoogte",
    busy: "Bezig...",
    done: "Bijna klaar. Check je mailbox en klik op de bevestigingslink.",
    error: "Lukte niet. Probeer straks nog eens.",
    confirmOkTitle: "Je bent ingeschreven!",
    confirmOkText:
      "Bedankt. Je krijgt af en toe een mail met tips en acties, hooguit één per maand. Uitschrijven kan altijd met één klik.",
    confirmFailTitle: "Deze link werkt niet meer",
    confirmFailText:
      "Misschien ben je al ingeschreven, of is de link verlopen. Schrijf je gerust opnieuw in via de contactpagina.",
    unsubOkTitle: "Je bent uitgeschreven",
    unsubOkText: "Je krijgt geen mails meer van mij. Bedankt dat je erbij was.",
    unsubFailTitle: "Deze link werkt niet",
    unsubFailText: "De link is niet geldig. Mail me gerust, dan schrijf ik je handmatig uit.",
  },

  footer: {
    servicesLabel: "Diensten",
    practicalLabel: "Praktisch",
    links: {
      pc: "PC laten bouwen",
      herstel: "PC & laptop herstel",
      consoles: "Consoles & controllers",
      zaken: "Voor zaken",
      volg: "Volg je herstelling",
      afspraak: "Maak een afspraak",
      prijzen: "Alle vaste prijzen",
      voorwaarden: "Algemene voorwaarden",
      privacy: "Privacyverklaring",
      reviews: "Google-reviews",
    },
    kboPending: "KBO-nummer in aanvraag",
    kboPrefix: "KBO",
    exemption: "Bijzondere vrijstellingsregeling kleine ondernemingen",
  },


  calculator: {
    title: "Wat voor pc heb ik nodig?",
    intro: "Schuif en kies, en zie meteen welk pakket bij je past. Vrijblijvend, gewoon handig.",
    budgetLabel: "Budget voor onderdelen",
    useLabel: "Waarvoor ga je hem gebruiken?",
    uses: ["Competitief gamen (shooters, hoge fps)", "AAA-games en singleplayer", "School, bureau en surfen", "Video, streaming en creatie"],
    resLabel: "Op welke resolutie?",
    verdictLabel: "Mijn advies",
    tierLow: "Daar bouw ik een vlotte, stille machine mee voor alledaags gebruik.",
    tierMid: "Daar bouw je een sterke 1080p/1440p-gamer mee die jaren meegaat.",
    tierHigh: "Daarmee zit je aan high-end: hoge fps, strak op 1440p of 4K.",
    warn4k: "Voor comfortabel 4K-gamen raad ik minstens €1500 aan onderdelen aan.",
    packageLabel: "Passend pakket",
    partsLabel: "onderdelen (jij bestelt zelf, zonder tussenmarge)",
    cta: "Bespreek dit voorstel met mij",
  },
  reviewsSection: {
    title: "Wat klanten zeggen",
    empty: "Ik ben pas gestart, dus de eerste reviews komen eraan. Word jij een van mijn eerste vijf klanten? Dan krijg je -50%, in ruil voor één eerlijke review. Iedereen content.",
    basedOn: "{count} reviews · gemiddeld {avg}/5",
    readAll: "Lees alle reviews op Trustpilot",
    write: "Schrijf zelf een review",
    via: "via",
  },
  socialSection: {
    title: "Volg de werkbank",
    intro: "Ik film hoe ik consoles uitkuis en pc's bouw. Voor en na, zonder blabla.",
  },
  afspraakPage: {
    title: "Maak een afspraak",
    intro: "Kies een moment dat jou past. Ik bevestig per mail, en verzetten kan gratis tot 24 uur vooraf.",
    chooseDay: "Kies een dag",
    chooseSlot: "Kies een uur",
    noSlots: "Momenteel zijn alle plekken bezet. Bel of app me, dan vinden we wel een gaatje.",
    submit: "Vraag deze afspraak aan",
    sending: "Bezig...",
    sentTitle: "Aangevraagd!",
    sentText: "Je krijgt zo snel mogelijk een bevestiging per mail. Pas dan ligt de afspraak vast.",
    slotTakenError: "Dat moment is net ingenomen. Kies een ander uur.",
    yourSlot: "Jouw keuze",
  },
  accountPage: {
    title: "Mijn RitsIT",
    loginTitle: "Inloggen zonder wachtwoord",
    loginIntro: "Vul je e-mailadres in en je krijgt een inloglink. Geen wachtwoord om te onthouden, niets om te lekken.",
    emailLabel: "Je e-mailadres",
    sendLink: "Stuur mijn inloglink",
    linkSent: "Check je mailbox! De link werkt 15 minuten.",
    verifyFail: "Deze inloglink is verlopen of al gebruikt. Vraag hieronder een nieuwe aan.",
    hello: "Ingelogd als",
    jobsTitle: "Mijn herstellingen",
    jobsEmpty: "Nog geen herstellingen op dit e-mailadres. Breng je iets binnen, dan verschijnt het hier automatisch.",
    apptsTitle: "Mijn afspraken",
    apptsEmpty: "Nog geen afspraken.",
    newApptCta: "Maak een afspraak",
    newsletterTitle: "Nieuwsbrief",
    newsletterOn: "Je bent ingeschreven.",
    newsletterOff: "Je bent niet ingeschreven.",
    logout: "Uitloggen",
    track: "Bekijk status",
    statusWord: "status",
  },

  konami: {
    title: "Speler 2 gevonden!",
    text: "Jij kent de klassiekers. Zeg of typ 'KONAMI' bij je aanvraag en krijg €5 extra korting op eender welke dienst.",
    close: "Verder spelen",
  },

  services: {
    pcBouwen: {
      slug: "pc-bouwen",
      title: "PC bouwen",
      services: [
        { name: "Bouwadvies op maat", price: "€40", note: "Onderdelenlijst + bestellinks, verrekend bij build" },
        { name: "Custom PC Build", price: "€130", note: "Montage, Windows, BIOS/EXPO, stresstest, testrapport, 30 dagen nazorg" },
        { name: "Custom PC Build Pro", price: "€170", note: "+ BIOS-tuning, premium cable management, RGB, software-inrichting" },
        { name: "Gaming Setup Totaal", price: "€199", note: "Build Pro + volledige bureau-setup en kabelmanagement" },
        { name: "Upgrade-sessie", price: "€55", note: "GPU/RAM/SSD/voeding, incl. advies en test. +€20 per extra component" },
      ],
    },
    herstel: {
      slug: "herstel",
      title: "PC & laptop herstel",
      services: [
        { name: "Diagnose", price: "€25", note: "Verrekend bij herstel" },
        { name: "Herstelling / hardware vervangen", price: "€45/u" },
        { name: "Grote onderhoudsbeurt", price: "€59", note: "Reiniging, koelpasta, Windows opschonen, meting voor en na" },
        { name: "Laptop-upgrade SSD/RAM", price: "€59", note: "Incl. kloon van Windows en data" },
        { name: "Nieuwe pc/laptop instapklaar + data-overzet", price: "€69", note: "+€20 oud toestel veilig wissen" },
      ],
    },
    consoles: {
      slug: "consoles",
      title: "Consoles & controllers",
      services: [
        { name: "Console grote reiniging", price: "€45", note: "Stof, ventilator, geluids- en tempcheck" },
        { name: "Reiniging + nieuwe koelpasta", price: "€59", note: "PS4/Xbox One-generatie" },
        { name: "Controller deep clean", price: "€25", note: "Plakkende knoppen of triggers" },
        { name: "Joy-Con drift herstel", price: "€29", note: "Nieuwe stickmodule inbegrepen. €49 per paar" },
        { name: "Controller batterij vervangen", price: "€25", note: "Incl. batterij" },
        { name: "Nieuwe console speelklaar", price: "€40", note: "Accounts, updates, data-overdracht" },
        { name: "Ouderlijk toezicht instellen", price: "€49", note: "Console + telefoon + wifi" },
        { name: "Console of pc verkoopklaar maken", price: "€39", note: "Wissen, reinigen, foto's, zoekertjestekst" },
      ],
      footnote:
        "Toestellen die nog fabrieksgarantie hebben maak ik niet open. Dan verwijs ik je eerlijk door naar de fabrikant, dat is gratis voor jou.",
    },
    aanHuis: {
      slug: "aan-huis",
      title: "Hulp aan huis & extra's",
      services: [
        { name: "Hulp aan huis", price: "€49", note: "Wifi, printer, mail, virussen, uitleg. Eerste uur, daarna €40/u" },
        { name: "Remote hulp via schermdeling", price: "€25", note: "Per half uur" },
        { name: "Streaming starter setup", price: "€79", note: "OBS, mic, camera, testopname" },
        { name: "Mechanisch toetsenbord deep clean", price: "€29" },
        { name: "Thuisserver / NAS / Plex setup", price: "vanaf €69" },
      ],
    },
    voorZaken: {
      slug: "voor-zaken",
      title: "Voor zaken",
      services: [
        { name: "Gratis IT-check", price: "€0", note: "30 min ter plaatse + rapport op één A4" },
        { name: "Zorgeloos Basis", price: "€95/maand", note: "Tot 3 toestellen: updates, back-upcontrole, beveiliging, remote support, 1u ter plaatse per kwartaal" },
        { name: "Zorgeloos Plus", price: "€145/maand", note: "4 tot 8 toestellen + netwerkbeheer + kwartaalbezoek + inventaris" },
        { name: "Eenmalige onboarding", price: "€150", note: "Inventaris, back-ups opzetten, documentatie" },
        { name: "Projecten", price: "€55/u", note: "Netwerk, werkposten, Microsoft 365/Google Workspace, NAS" },
      ],
    },
  },

  privacy: {
    title: "Privacyverklaring",
    updated: "Laatst bijgewerkt: juli 2026",
    sections: [
      {
        h: "In het kort",
        ps: [],
        list: [
          "Ik vraag alleen gegevens die nodig zijn om je te helpen.",
          "Ik verkoop of deel je gegevens nooit voor reclame.",
          "Deze site gebruikt geen reclame- of trackingcookies. Daarom zie je ook geen cookiebanner.",
          "Je mag altijd vragen welke gegevens ik van je heb, en vragen om ze aan te passen of te wissen.",
        ],
      },
      {
        h: "Wie ben ik?",
        ps: [
          "RitsIT, Herent, Leuven en deelgemeenten. Je bereikt me via {phone} of {email}. Ik ben de verwerkingsverantwoordelijke voor de gegevens op deze site.",
        ],
      },
      {
        h: "Welke gegevens verzamel ik, en waarom?",
        ps: [
          "Contactformulier: je naam, telefoonnummer, eventueel je e-mailadres en je bericht. Die heb ik nodig om je terug te bellen of te mailen en je te helpen. Rechtsgrond: de stappen die nodig zijn om tot een overeenkomst te komen.",
          "Herstellingen: je naam, contactgegevens en gegevens over je toestel, plus een volgcode waarmee je de status kan opvolgen. Rechtsgrond: uitvoering van de overeenkomst.",
          "Nieuwsbrief: alleen je e-mailadres, en alleen als je je inschrijving zelf bevestigt via de mail die je krijgt (dubbele opt-in). Rechtsgrond: jouw toestemming. Uitschrijven kan altijd met één klik onderaan elke mail.",
          "E-mails: bevestigingen en statusupdates verstuur ik via Resend (Resend Inc.), een e-maildienst. Je e-mailadres passeert daarbij langs hun servers, uitsluitend om de mail te bezorgen.",
        ],
      },
      {
        h: "Wat doe ik niet?",
        ps: [],
        list: [
          "Geen reclamecookies of tracking van je surfgedrag.",
          "Geen doorverkoop of delen van gegevens met derden voor marketing.",
          "Geen profielen of geautomatiseerde beslissingen.",
        ],
      },
      {
        h: "Gegevens op je toestel zelf",
        ps: [
          "Herstel ik je pc, laptop of console, dan blijf ik van je bestanden af, behalve als het voor de herstelling nodig is en we dat vooraf afspreken (bijvoorbeeld bij een data-overzet). Wil je een toestel verkoopklaar laten maken, dan wis ik het veilig en definitief.",
        ],
      },
      {
        h: "Hoe lang bewaar ik je gegevens?",
        ps: [
          "Aanvragen en herstelgegevens bewaar ik zo lang als nodig voor de opdracht en de wettelijke verplichtingen (zoals facturatie), daarna wis ik ze. Nieuwsbriefgegevens bewaar ik tot je je uitschrijft.",
        ],
      },
      {
        h: "Jouw rechten",
        ps: [
          "Je mag altijd vragen om je gegevens in te kijken, te verbeteren, te wissen of over te dragen, en je mag bezwaar maken tegen het gebruik ervan. Eén mailtje naar {email} of een belletje volstaat. Ben je niet tevreden met hoe ik daarmee omga, dan kan je terecht bij de Gegevensbeschermingsautoriteit (gegevensbeschermingsautoriteit.be).",
        ],
      },
    ],
  },

  voorwaarden: {
    title: "Algemene voorwaarden",
    updated: "Laatst bijgewerkt: juli 2026",
    sections: [
      {
        h: "1. Wie",
        ps: [
          "RitsIT, Herent, Leuven en deelgemeenten. Kleine onderneming onderworpen aan de bijzondere vrijstellingsregeling, btw niet toepasselijk.",
        ],
      },
      {
        h: "2. Vaste prijzen, vooraf afgesproken",
        ps: [
          "Elke opdracht start pas nadat we samen de prijs hebben vastgelegd. Duikt er tijdens het werk iets onverwachts op dat de prijs zou veranderen, dan stop ik en overleg ik eerst met jou. Jij beslist of ik verder ga.",
        ],
      },
      {
        h: "3. Onderdelen en garantie",
        ps: [
          "Bij pc-builds bestel jij de onderdelen zelf: de fabrieksgarantie staat dan volledig op jouw naam bij de winkel. Op mijn werk zelf (montage, herstelling) krijg je 30 dagen nazorg: loopt er in die periode iets mis dat aan mijn werk ligt, dan los ik het gratis op. Toestellen die nog fabrieksgarantie hebben maak ik niet open; ik verwijs je dan door naar de fabrikant.",
        ],
      },
      {
        h: "4. Jouw data",
        ps: [
          "Maak zelf een back-up van belangrijke bestanden vóór je een toestel binnenbrengt, of vraag me om er samen één te maken. Ik werk zorgvuldig, maar bij een herstelling is dataverlies nooit volledig uit te sluiten. Voor het omgaan met persoonsgegevens: zie de privacyverklaring.",
        ],
      },
      {
        h: "5. Aansprakelijkheid",
        ps: [
          "Ik ben verzekerd voor beroepsaansprakelijkheid. Mijn aansprakelijkheid is beperkt tot het bedrag van de opdracht, behalve bij opzet of grove fout. Voor onrechtstreekse schade (zoals verlies van gegevens waarvan geen back-up bestond) ben ik niet aansprakelijk.",
        ],
      },
      {
        h: "6. Betalen en annuleren",
        ps: [
          "Betalen kan cash of via overschrijving/Payconiq na afloop van de opdracht, tenzij anders afgesproken. Een afspraak kosteloos verzetten of annuleren kan tot 24 uur vooraf. Maandpakketten voor zaken zijn maandelijks opzegbaar.",
        ],
      },
      {
        h: "7. Niet opgehaalde toestellen",
        ps: [
          "Haal je een toestel na herhaalde verwittiging drie maanden niet op, dan mag ik het beschouwen als afgestaan. Uiteraard verwittig ik je ruim vooraf voor het zover komt.",
        ],
      },
      {
        h: "8. Geschillen",
        ps: [
          "Komen we er samen niet uit (dat zou me verbazen), dan is het Belgisch recht van toepassing en zijn de rechtbanken van Leuven bevoegd. Als consument kan je ook terecht bij de Consumentenombudsdienst (consumentenombudsdienst.be).",
        ],
      },
    ],
  },
};

export default nl;
export type Dict = typeof nl;
