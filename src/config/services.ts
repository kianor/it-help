/**
 * Het volledige launch-aanbod uit de briefing.
 * Fase 2/3-diensten (soldeerwerk, PS5-repaste, Hall-effect) staan hier bewust NIET in.
 */

export type Service = {
  name: string;
  price: string;
  note?: string;
};

export type ServiceGroup = {
  slug: string;
  title: string;
  services: Service[];
  footnote?: string;
};

export const pcBouwen: ServiceGroup = {
  slug: "pc-bouwen",
  title: "PC bouwen",
  services: [
    {
      name: "Bouwadvies op maat",
      price: "€40",
      note: "Onderdelenlijst + bestellinks, verrekend bij build",
    },
    {
      name: "Custom PC Build",
      price: "€130",
      note: "Montage, Windows, BIOS/EXPO, stresstest, testrapport, 30 dagen nazorg",
    },
    {
      name: "Custom PC Build Pro",
      price: "€170",
      note: "+ BIOS-tuning, premium cable management, RGB, software-inrichting",
    },
    {
      name: "Gaming Setup Totaal",
      price: "€199",
      note: "Build Pro + volledige bureau-setup en kabelmanagement",
    },
    {
      name: "Upgrade-sessie",
      price: "€55",
      note: "GPU/RAM/SSD/voeding, incl. advies en test. +€20 per extra component",
    },
  ],
};

export const herstel: ServiceGroup = {
  slug: "herstel",
  title: "PC & laptop herstel",
  services: [
    { name: "Diagnose", price: "€25", note: "Verrekend bij herstel" },
    { name: "Herstelling / hardware vervangen", price: "€45/u" },
    {
      name: "Grote onderhoudsbeurt",
      price: "€59",
      note: "Reiniging, koelpasta, Windows opschonen, meting voor en na",
    },
    {
      name: "Laptop-upgrade SSD/RAM",
      price: "€59",
      note: "Incl. kloon van Windows en data",
    },
    {
      name: "Nieuwe pc/laptop instapklaar + data-overzet",
      price: "€69",
      note: "+€20 oud toestel veilig wissen",
    },
  ],
};

export const consoles: ServiceGroup = {
  slug: "consoles",
  title: "Consoles & controllers",
  services: [
    {
      name: "Console grote reiniging",
      price: "€45",
      note: "Stof, ventilator, geluids- en tempcheck",
    },
    {
      name: "Reiniging + nieuwe koelpasta",
      price: "€59",
      note: "PS4/Xbox One-generatie",
    },
    {
      name: "Controller deep clean",
      price: "€25",
      note: "Plakkende knoppen of triggers",
    },
    {
      name: "Joy-Con drift herstel",
      price: "€29",
      note: "Nieuwe stickmodule inbegrepen. €49 per paar",
    },
    { name: "Controller batterij vervangen", price: "€25", note: "Incl. batterij" },
    {
      name: "Nieuwe console speelklaar",
      price: "€40",
      note: "Accounts, updates, data-overdracht",
    },
    {
      name: "Ouderlijk toezicht instellen",
      price: "€49",
      note: "Console + telefoon + wifi",
    },
    {
      name: "Console of pc verkoopklaar maken",
      price: "€39",
      note: "Wissen, reinigen, foto's, zoekertjestekst",
    },
  ],
  footnote:
    "Toestellen die nog fabrieksgarantie hebben maak ik niet open. Dan verwijs ik je eerlijk door naar de fabrikant, dat is gratis voor jou.",
};

export const aanHuis: ServiceGroup = {
  slug: "aan-huis",
  title: "Hulp aan huis & extra's",
  services: [
    {
      name: "Hulp aan huis",
      price: "€49",
      note: "Wifi, printer, mail, virussen, uitleg. Eerste uur, daarna €40/u",
    },
    { name: "Remote hulp via schermdeling", price: "€25", note: "Per half uur" },
    {
      name: "Streaming starter setup",
      price: "€79",
      note: "OBS, mic, camera, testopname",
    },
    { name: "Mechanisch toetsenbord deep clean", price: "€29" },
    { name: "Thuisserver / NAS / Plex setup", price: "vanaf €69" },
  ],
};

export const voorZaken: ServiceGroup = {
  slug: "voor-zaken",
  title: "Voor zaken",
  services: [
    {
      name: "Gratis IT-check",
      price: "€0",
      note: "30 min ter plaatse + rapport op één A4",
    },
    {
      name: "Zorgeloos Basis",
      price: "€95/maand",
      note: "Tot 3 toestellen: updates, back-upcontrole, beveiliging, remote support, 1u ter plaatse per kwartaal",
    },
    {
      name: "Zorgeloos Plus",
      price: "€145/maand",
      note: "4 tot 8 toestellen + netwerkbeheer + kwartaalbezoek + inventaris",
    },
    {
      name: "Eenmalige onboarding",
      price: "€150",
      note: "Inventaris, back-ups opzetten, documentatie",
    },
    {
      name: "Projecten",
      price: "€55/u",
      note: "Netwerk, werkposten, Microsoft 365/Google Workspace, NAS",
    },
  ],
};

export const allGroups: ServiceGroup[] = [pcBouwen, herstel, consoles, aanHuis, voorZaken];

/** Opties voor het "dienst"-veld in het contactformulier */
export const contactServiceOptions = [
  "PC laten bouwen",
  "PC of laptop herstellen",
  "Console of controller",
  "Hulp aan huis",
  "Voor mijn zaak (gratis IT-check)",
  "Iets anders",
] as const;
