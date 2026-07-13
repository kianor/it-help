import type { Dict } from "./nl";

/**
 * English — same tone as the Dutch source: short sentences, plain language,
 * honest, no marketing speak.
 */
const en: Dict = {
  locale: "en",
  meta: {
    home: {
      title: "RitsIT | Computer help, custom PC builds & console care in Herent and Leuven",
      description:
        "Custom gaming PC builds, laptop repairs, console cleaning and IT support for small businesses. Fixed prices up front, plain-language explanations, someone from your neighbourhood. Herent and Leuven.",
    },
    pc: {
      title: "Custom gaming PC builds in Leuven | fixed price from €130",
      description:
        "Have a custom gaming PC built in Herent or Leuven. You order the parts yourself with no middleman margin; I build, test and deliver it ready to play. Fixed prices from €130.",
    },
    herstel: {
      title: "Computer help at home in Herent and Leuven",
      description:
        "PC or laptop repair, computer help at home or remote support via screen sharing in Herent and Leuven. Fixed prices, plain-language explanations, honest advice.",
    },
    consoles: {
      title: "PlayStation or controller repair in Leuven",
      description:
        "Console cleaning, Joy-Con drift repair, controller deep cleaning or parental controls setup. Fixed prices, often done the same day. Herent and Leuven.",
    },
    zaken: {
      title: "IT support for small businesses in Leuven",
      description:
        "IT support for hairdressers, garages, practices and other small businesses in Herent and Leuven. Fixed monthly fee, free IT check, response the same working day.",
    },
    prijzen: {
      title: "All fixed prices on one page",
      description:
        "The full price list: PC builds, repairs, consoles, help at home and business packages. Fixed prices up front, no surprises. Herent and Leuven.",
    },
    contact: {
      title: "Contact | call, WhatsApp or send a message",
      description:
        "Get in touch for computer help, PC builds or console repair in Herent and Leuven. Call, send a WhatsApp or use the form. Response the same working day.",
    },
    afspraak: {
      title: "Book an appointment online",
      description: "Pick your own moment for computer help, a PC build or console repair in Herent or Leuven. Confirmation by email, free rescheduling up to 24 hours in advance.",
    },
    account: {
      title: "My RitsIT",
      description: "Track your repairs and appointments in one place. Log in without a password, via a secure email link.",
    },
    volg: { title: "Track your repair", description: "Follow the status of your repair live with your tracking code." },
    privacy: {
      title: "Privacy statement",
      description: "How this site handles your data, explained in plain language.",
    },
    voorwaarden: {
      title: "Terms and conditions",
      description: "The terms and conditions, short and in plain language.",
    },
  },

  nav: {
    pc: "PC builds",
    herstel: "Repairs",
    consoles: "Consoles",
    zaken: "For business",
    prijzen: "Prices",
    contact: "Contact",
    afspraak: "Book",
    account: "My RitsIT",
  },

  common: {
    callCta: "Call or WhatsApp me",
    whatsappCta: "Send a WhatsApp",
    callMe: "Call me",
    sendMessage: "Send a message",
    moreInfo: "More info →",
    viewPrices: "See fixed prices",
    toHome: "Back to the homepage",
    skipToContent: "Skip to content",
    gameMode: "Game mode",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    travel: "Free within 10 km of Herent, €0.40/km beyond that.",
    travelLabel: "Travel",
    responsePromise:
      "Response the same working day, first remote help in the evening, on site within 48 hours.",
    openingInfo: "Available weekday evenings and on Saturdays",
    region: "Herent, Leuven and surrounding villages",
    from: "from",
  },

  promo: {
    label: "Launch deal:",
    template:
      "{left} {slots} left →",
    one: "spot",
    many: "spots",
  },

  home: {
    kicker: "RitsIT · fixed in a flash",
    heroTitle: "Computer help from your own neighbourhood.",
    heroAccent: "Fixed prices, no surprises.",
    heroSub:
      "Want a gaming PC built, a slow laptop fixed, a loud PlayStation quieted, or IT help for your business? I sort it out and explain what happened, in plain language.",
    blocks: [
      {
        title: "Custom PC builds",
        text: "You set the budget, I pick the parts, you order them yourself. No middleman margin, full store warranty.",
        price: "from €130",
      },
      {
        title: "PC & laptop repair",
        text: "Slow laptop, virus or flaky wifi? At your home or remotely, with explanations in plain language.",
        price: "from €25",
      },
      {
        title: "Consoles & controllers",
        text: "Loud PlayStation, drifting Joy-Con or sticky controller. Often done the same day.",
        price: "from €25",
      },
      {
        title: "For business",
        text: "No IT person on staff? For a fixed monthly fee I keep everything running. Start with a free IT check.",
        price: "free IT check",
      },
    ],
    howTitle: "How it works",
    stepLabel: "step",
    steps: [
      { title: "Get in touch", text: "Call, WhatsApp or use the form. You'll hear back today." },
      { title: "Fixed price up front", text: "You know exactly what it costs before I start. No surprises afterwards." },
      { title: "Fixed, with an explanation", text: "I solve it and calmly explain what was wrong and how to prevent it." },
    ],
    whyTitle: "Why me?",
    why: [
      { title: "Fixed prices", text: "Every service has a fixed price, agreed in advance. It's right here on this site." },
      { title: "From the neighbourhood", text: "I live and work in Herent and Leuven. No call centre, no hold music." },
      { title: "Plain language", text: "You get explanations you can actually use, without jargon or sales talk." },
      { title: "Honest advice", text: "Not worth repairing anymore? I'll tell you straight and help you choose what is smart." },
    ],
    reviewsTitle: "Customer reviews",
    reviewsText:
      "I've only just started, so the first reviews are on their way. Want to be one of my first five customers? You get -50%, in exchange for one honest Google review. You pay half, I get my first stars. Everybody wins.",
    ctaTitle: "Something broken, something slow, or big plans?",
    ctaText:
      "Call or WhatsApp me and you'll know where you stand today. Active in Herent, Leuven and surrounding villages.",
  },

  pcPage: {
    title: "Custom PC builds",
    intro:
      "Dreaming of a gaming PC but dreading the build? You set your budget, I find the best parts, and you simply order them online yourself. That way you pay no middleman margin and keep the full store warranty. Then I assemble everything properly, tested and ready to play. From €130.",
    stepsTitle: "How it works, in 7 steps",
    steps: [
      { title: "Intro chat", text: "We go over your budget, your games and your wishes. Free and without obligation." },
      { title: "Tailored parts list", text: "You get a list of the best parts for your budget, with order links." },
      { title: "You order yourself", text: "Straight from the store. No middleman margin, and the full manufacturer warranty is in your name." },
      { title: "I build", text: "Careful assembly with proper cable management." },
      { title: "Windows and BIOS", text: "Installation, BIOS/EXPO settings and all drivers up to date." },
      { title: "Stress test and report", text: "Your PC is tested for temperature and stability. You get the report with it." },
      { title: "30 days of aftercare", text: "A question or small issue in the first month? I'll help you for free." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Why do I order the parts myself?",
        a: "That way you pay no middleman margin and the manufacturer warranty on every part is in your name at the store. If something breaks within warranty, you handle it directly, no middleman. I'll help you if you're not sure how, of course.",
      },
      {
        q: "What if a part arrives broken?",
        a: "I'll notice during the build or the stress test. You simply return it to the store and I continue as soon as the replacement arrives.",
      },
      {
        q: "How long does a build take?",
        a: "Usually a few days once all parts are in, depending on my schedule. You get a clear appointment up front.",
      },
      {
        q: "Do you also build PCs for video editing or office work?",
        a: "Absolutely. The process is the same: your budget and use case determine the parts list.",
      },
      {
        q: "Can I upgrade my old PC instead of buying a new one?",
        a: "Often, yes, and it's usually cheaper. With an upgrade session (€55) I check what makes sense. If it's not worth it, I'll tell you straight.",
      },
    ],
    ctaTitle: "Ready to build?",
    ctaText: "Tell me your budget and favourite games, and I'll make a proposal.",
  },

  herstelPage: {
    title: "PC & laptop repair, also at your home",
    intro:
      "Slow laptop, flaky wifi or a printer acting up again? I come by, fix it and calmly explain what was wrong. If a repair isn't worth it anymore, I'll tell you honestly and help you choose what is.",
    repairTitle: "Repair & maintenance",
    homeTitle: "Help at home & extras",
    homeIntro:
      "Prefer remote help? Via secure screen sharing I can solve a lot without travelling, ideal for quick questions.",
    ctaTitle: "Want to know where you stand today?",
    ctaText: "Call or WhatsApp me and briefly describe the problem. You'll get a fixed price right away.",
  },

  consolesPage: {
    title: "Consoles & controllers",
    intro:
      "Does your PlayStation sound like a jet engine? Joy-Con drifting? Controller still sticky from that one glass of cola? I make consoles clean and quiet on the inside and repair controllers. Fixed prices, often done the same day.",
    galleryTitle: "Before and after",
    galleryIntro:
      "Real devices from real customers. Drag the slider and see the difference: this is how a console comes in, and this is how it goes back out.",
    before: "Before",
    after: "After",
    sliderLabel: "Compare before and after",
    parentsTitle: "For parents",
    parentsText:
      "Want to keep screen time and purchases on your kids' console under control? I set up parental controls on the console, phone and wifi, and show you how to manage it yourself afterwards.",
    ctaTitle: "Console or controller broken?",
    ctaText: "WhatsApp me a photo or video of the problem and you'll know the fixed price right away.",
  },

  zakenPage: {
    title: "IT for your business, without an IT person",
    intro:
      "No IT person on staff, but computers, a till and email that simply have to work? For a fixed monthly fee I keep everything up to date, check your backups and act as your first line of support.",
    checkKicker: "free and without obligation",
    checkTitle: "The free IT check",
    checkText:
      "In half an hour on site you'll know where your business is at risk: backups, security, updates and network. You get a one-page report, in plain language. Then you decide what to do with it, no strings attached.",
    checkCta: "Request the free IT check",
    packagesTitle: "Packages and rates",
    promiseLabel: "My response promise",
  },

  prijzenPage: {
    title: "All prices, right on the table",
    intro:
      "Fixed prices, known in advance. Not sure which service you need? Call or WhatsApp me and I'll tell you honestly what it'll be, and what you don't need.",
    notFoundTitle: "Don't see your problem listed?",
    notFoundText: "Just ask. If I can't do it, I'll honestly point you to someone who can.",
  },

  contactPage: {
    title: "Get in touch",
    intro:
      "Calling or WhatsApping is fastest, especially in the evening. A message via the form works too: you'll hear from me today.",
    form: {
      name: "Name *",
      phone: "Phone *",
      email: "Email (optional, for a confirmation)",
      service: "What is it about? *",
      servicePlaceholder: "Choose a service",
      message: "Your message *",
      messagePlaceholder:
        "Briefly describe the problem or your plans. The brand and model of the device helps too.",
      send: "Send your request",
      sending: "Sending...",
      sentTitle: "Sent.",
      sentText: "I'll call or WhatsApp you back today.",
      error: "Something went wrong. Feel free to call or WhatsApp me directly.",
      privacyNote: "Your details are only used to help you. See the",
      privacyLink: "privacy statement",
    },
    serviceOptions: [
      "Custom PC build",
      "PC or laptop repair",
      "Console or controller",
      "Help at home",
      "For my business (free IT check)",
      "Something else",
    ],
    aside: {
      regionLabel: "Service area",
      expectLabel: "What to expect",
      newsletterLabel: "A smart tip now and then?",
      newsletterText:
        "No spam, at most one email a month with tips and deals. Unsubscribe anytime with one click.",
    },
  },

  volgPage: {
    title: "Track your repair",
    intro:
      "Enter the tracking code I gave you (it's also in your emails). You'll see exactly how your device is doing.",
    search: "Look up",
    notFound: "No repair found with that code. Double-check the code, or call or WhatsApp me on {phone}.",
    deviceLabel: "Device",
    codeLabel: "Tracking code",
    priceLabel: "Agreed price",
    updatesLabel: "Updates",
    now: "← now",
    questions: "Questions about your repair? Call or WhatsApp me on",
    statuses: {
      ontvangen: "Received",
      "diagnose bezig": "Diagnosis in progress",
      "wacht op onderdelen": "Waiting for parts",
      "in herstel": "Being repaired",
      "klaar voor ophaling": "Ready for pickup",
      afgerond: "Completed",
    } as Record<string, string>,
  },

  newsletter: {
    placeholder: "your@email.com",
    submit: "Keep me posted",
    busy: "Working...",
    done: "Almost there. Check your inbox and click the confirmation link.",
    error: "That didn't work. Please try again later.",
    confirmOkTitle: "You're subscribed!",
    confirmOkText:
      "Thanks. You'll get the occasional email with tips and deals, at most one a month. Unsubscribe anytime with one click.",
    confirmFailTitle: "This link no longer works",
    confirmFailText:
      "You may already be subscribed, or the link has expired. Feel free to sign up again via the contact page.",
    unsubOkTitle: "You're unsubscribed",
    unsubOkText: "You won't get any more emails from me. Thanks for being here.",
    unsubFailTitle: "This link doesn't work",
    unsubFailText: "The link isn't valid. Email me and I'll unsubscribe you manually.",
  },

  footer: {
    servicesLabel: "Services",
    practicalLabel: "Practical",
    links: {
      pc: "Custom PC builds",
      herstel: "PC & laptop repair",
      consoles: "Consoles & controllers",
      zaken: "For business",
      volg: "Track your repair",
      afspraak: "Book an appointment",
      prijzen: "All fixed prices",
      voorwaarden: "Terms and conditions",
      privacy: "Privacy statement",
      reviews: "Google reviews",
    },
    kboPending: "Company number (KBO) pending",
    kboPrefix: "KBO",
    exemption: "Small business VAT exemption scheme (Belgium)",
  },


  calculator: {
    title: "What kind of PC do I need?",
    intro: "Slide and pick, and instantly see which package fits you. No strings attached, just handy.",
    budgetLabel: "Budget for parts",
    useLabel: "What will you use it for?",
    uses: ["Competitive gaming (shooters, high fps)", "AAA games and singleplayer", "School, office and browsing", "Video, streaming and creation"],
    resLabel: "At which resolution?",
    verdictLabel: "My advice",
    tierLow: "That builds a smooth, quiet machine for everyday use.",
    tierMid: "That builds a strong 1080p/1440p gaming rig that lasts for years.",
    tierHigh: "That's high-end territory: high fps, smooth at 1440p or 4K.",
    warn4k: "For comfortable 4K gaming I recommend at least €1500 in parts.",
    packageLabel: "Matching package",
    partsLabel: "parts (you order them yourself, no middleman margin)",
    cta: "Discuss this proposal with me",
  },
  reviewsSection: {
    title: "What customers say",
    empty: "I've only just started, so the first reviews are on their way. Want to be one of my first five customers? You get -50%, in exchange for one honest review. Everybody wins.",
    basedOn: "{count} reviews · average {avg}/5",
    readAll: "Read all reviews on Trustpilot",
    write: "Write a review yourself",
    via: "via",
  },
  socialSection: {
    title: "Follow the workbench",
    intro: "I film how I clean out consoles and build PCs. Before and after, no fluff.",
  },
  afspraakPage: {
    title: "Book an appointment",
    intro: "Pick a moment that suits you. I confirm by email, and rescheduling is free up to 24 hours in advance.",
    chooseDay: "Pick a day",
    chooseSlot: "Pick a time",
    noSlots: "All slots are taken at the moment. Call or WhatsApp me and we'll find a gap.",
    submit: "Request this appointment",
    sending: "Working...",
    sentTitle: "Requested!",
    sentText: "You'll get a confirmation by email as soon as possible. Only then is the appointment final.",
    emailLabel: "Email * (your confirmation goes here)",
    slotTakenError: "That moment was just taken. Please pick another time.",
    yourSlot: "Your pick",
  },
  accountPage: {
    title: "My RitsIT",
    loginTitle: "Log in without a password",
    loginIntro: "Enter your email address and you'll get a login link. No password to remember, nothing to leak.",
    emailLabel: "Your email address",
    sendLink: "Send my login link",
    linkSent: "Check your inbox! The link works for 15 minutes.",
    verifyFail: "This login link has expired or was already used. Request a new one below.",
    hello: "Logged in as",
    jobsTitle: "My repairs",
    jobsEmpty: "No repairs on this email address yet. Bring something in and it will show up here automatically.",
    apptsTitle: "My appointments",
    apptsEmpty: "No appointments yet.",
    newApptCta: "Book an appointment",
    newsletterTitle: "Newsletter",
    newsletterOn: "You are subscribed.",
    newsletterOff: "You are not subscribed.",
    logout: "Log out",
    newsletterOffCta: "Unsubscribe me",
    track: "View status",
    statusWord: "status",
  },

  consent: {
    text: "May I use anonymous visit statistics via Google Analytics to improve this site? If you decline, only my own cookie-free counting is used.",
    accept: "That's fine",
    decline: "Rather not",
  },

  konami: {
    title: "Player 2 has entered the game!",
    text: "You know the classics. Say or type 'KONAMI' with your request and get €5 extra off any service.",
    close: "Keep playing",
  },

  services: {
    pcBouwen: {
      slug: "pc-bouwen",
      title: "PC builds",
      services: [
        { name: "Tailored build advice", price: "€40", note: "Parts list + order links, deducted from the build" },
        { name: "Custom PC Build", price: "€130", note: "Assembly, Windows, BIOS/EXPO, stress test, test report, 30 days aftercare" },
        { name: "Custom PC Build Pro", price: "€170", note: "+ BIOS tuning, premium cable management, RGB, software setup" },
        { name: "Gaming Setup Total", price: "€199", note: "Build Pro + full desk setup and cable management" },
        { name: "Upgrade session", price: "€55", note: "GPU/RAM/SSD/PSU, incl. advice and testing. +€20 per extra component" },
      ],
    },
    herstel: {
      slug: "herstel",
      title: "PC & laptop repair",
      services: [
        { name: "Diagnosis", price: "€25", note: "Deducted from the repair" },
        { name: "Repair / hardware replacement", price: "€45/h" },
        { name: "Full maintenance service", price: "€59", note: "Cleaning, thermal paste, Windows cleanup, before/after measurements" },
        { name: "Laptop upgrade SSD/RAM", price: "€59", note: "Incl. cloning Windows and your data" },
        { name: "New PC/laptop ready to use + data transfer", price: "€69", note: "+€20 to securely wipe the old device" },
      ],
    },
    consoles: {
      slug: "consoles",
      title: "Consoles & controllers",
      services: [
        { name: "Console deep clean", price: "€45", note: "Dust, fan, noise and temperature check" },
        { name: "Cleaning + new thermal paste", price: "€59", note: "PS4/Xbox One generation" },
        { name: "Controller deep clean", price: "€25", note: "Sticky buttons or triggers" },
        { name: "Joy-Con drift repair", price: "€29", note: "New stick module included. €49 per pair" },
        { name: "Controller battery replacement", price: "€25", note: "Battery included" },
        { name: "New console ready to play", price: "€40", note: "Accounts, updates, data transfer" },
        { name: "Parental controls setup", price: "€49", note: "Console + phone + wifi" },
        { name: "Make a console or PC ready to sell", price: "€39", note: "Wiping, cleaning, photos, listing text" },
      ],
      footnote:
        "I don't open devices that are still under manufacturer warranty. I'll honestly point you to the manufacturer instead — that's free for you.",
    },
    aanHuis: {
      slug: "aan-huis",
      title: "Help at home & extras",
      services: [
        { name: "Help at home", price: "€49", note: "Wifi, printer, email, viruses, explanations. First hour, then €40/h" },
        { name: "Remote help via screen sharing", price: "€25", note: "Per half hour" },
        { name: "Streaming starter setup", price: "€79", note: "OBS, mic, camera, test recording" },
        { name: "Mechanical keyboard deep clean", price: "€29" },
        { name: "Home server / NAS / Plex setup", price: "from €69" },
      ],
    },
    voorZaken: {
      slug: "voor-zaken",
      title: "For business",
      services: [
        { name: "Free IT check", price: "€0", note: "30 min on site + one-page report" },
        { name: "Carefree Basic", price: "€95/month", note: "Up to 3 devices: updates, backup checks, security, remote support, 1h on site per quarter" },
        { name: "Carefree Plus", price: "€145/month", note: "4 to 8 devices + network management + quarterly visit + inventory" },
        { name: "One-time onboarding", price: "€150", note: "Inventory, setting up backups, documentation" },
        { name: "Projects", price: "€55/h", note: "Network, workstations, Microsoft 365/Google Workspace, NAS" },
      ],
    },
  },

  privacy: {
    title: "Privacy statement",
    updated: "Last updated: July 2026",
    sections: [
      {
        h: "In short",
        ps: [],
        list: [
          "I only ask for data that's needed to help you.",
          "I never sell or share your data for advertising.",
          "This site uses no advertising or tracking cookies. That's why you don't see a cookie banner.",
          "You can always ask what data I have about you, and ask me to correct or delete it.",
        ],
      },
      {
        h: "Who am I?",
        ps: [
          "RitsIT, Herent, Leuven and surrounding villages. You can reach me on {phone} or {email}. I am the data controller for the data on this site.",
        ],
      },
      {
        h: "What data do I collect, and why?",
        ps: [
          "Contact form: your name, phone number, optionally your email address and your message. I need those to call or email you back and help you. Legal basis: steps needed to enter into an agreement.",
          "Repairs: your name, contact details and information about your device, plus a tracking code you can use to follow the status. Legal basis: performance of the agreement.",
          "Newsletter: only your email address, and only if you confirm your subscription yourself via the email you receive (double opt-in). Legal basis: your consent. You can unsubscribe anytime with one click at the bottom of every email.",
          "Emails: confirmations and status updates are sent via Resend (Resend Inc.), an email service. Your email address passes through their servers solely to deliver the email.",
        ],
      },
      {
        h: "What I don't do",
        ps: [],
        list: [
          "No advertising cookies or tracking of your browsing.",
          "No selling or sharing data with third parties for marketing.",
          "No profiling or automated decisions.",
        ],
      },
      {
        h: "Data on your device itself",
        ps: [
          "When I repair your PC, laptop or console, I stay out of your files, unless it's needed for the repair and we agree on it beforehand (for example a data transfer). If you want a device made ready to sell, I wipe it securely and permanently.",
        ],
      },
      {
        h: "How long do I keep your data?",
        ps: [
          "Requests and repair data are kept as long as needed for the job and legal obligations (such as invoicing), then deleted. Newsletter data is kept until you unsubscribe.",
        ],
      },
      {
        h: "Your rights",
        ps: [
          "You can always ask to see, correct, delete or transfer your data, and you can object to its use. One email to {email} or a phone call is enough. Not happy with how I handle it? You can contact the Belgian Data Protection Authority (dataprotectionauthority.be).",
        ],
      },
    ],
  },

  voorwaarden: {
    title: "Terms and conditions",
    updated: "Last updated: July 2026",
    sections: [
      {
        h: "1. Who",
        ps: [
          "RitsIT, Herent, Leuven and surrounding villages. Small business under the Belgian VAT exemption scheme; VAT not applicable.",
        ],
      },
      {
        h: "2. Fixed prices, agreed in advance",
        ps: [
          "Every job only starts after we've agreed the price together. If something unexpected comes up during the work that would change the price, I stop and check with you first. You decide whether I continue.",
        ],
      },
      {
        h: "3. Parts and warranty",
        ps: [
          "For PC builds you order the parts yourself: the manufacturer warranty is fully in your name at the store. On my own work (assembly, repair) you get 30 days of aftercare: if something goes wrong in that period that's due to my work, I fix it for free. I don't open devices still under manufacturer warranty; I'll point you to the manufacturer instead.",
        ],
      },
      {
        h: "4. Your data",
        ps: [
          "Make a backup of important files before bringing in a device, or ask me to make one together. I work carefully, but with any repair, data loss can never be fully ruled out. For personal data, see the privacy statement.",
        ],
      },
      {
        h: "5. Liability",
        ps: [
          "I carry professional liability insurance. My liability is limited to the amount of the job, except in case of intent or gross negligence. I am not liable for indirect damage (such as loss of data that wasn't backed up).",
        ],
      },
      {
        h: "6. Payment and cancellation",
        ps: [
          "You can pay cash or by transfer/Payconiq after the job, unless agreed otherwise. You can move or cancel an appointment free of charge up to 24 hours in advance. Monthly business packages can be cancelled monthly.",
        ],
      },
      {
        h: "7. Uncollected devices",
        ps: [
          "If you don't collect a device within three months despite repeated reminders, I may consider it abandoned. Of course I'll warn you well before it comes to that.",
        ],
      },
      {
        h: "8. Disputes",
        ps: [
          "If we can't work it out together (that would surprise me), Belgian law applies and the courts of Leuven have jurisdiction. As a consumer you can also contact the Belgian Consumer Ombudsman (consumerombudsman.be).",
        ],
      },
    ],
  },
};

export default en;
