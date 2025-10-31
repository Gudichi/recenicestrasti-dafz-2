export const atfList = [
  {
    headline: `Kako Obične Žene Diljem Balkana Čine Muškarce Totalno Zaluđenima - Bez Fizičke Savršenosti, "Igranja Igrica" ili Mijenjanja Sebe`,
    subheadline: `Problem nikad nije bio da nisi dovoljno dobra. U ovom besplatnom 11-minutnom videu otkrit ćeš šokantnu istinu o tome što muškarce stvarno vezuje emotivno - i naučit ćeš kako ga učiniti totalno zaluđenim tobom, čak i ako si sve do sada radila "kako treba".`,
    bulletPointsTitle: "U videu ćeš otkriti:",
    bulletPoints: [
      `<strong>Pravu istinu zašto se odjednom ohladio prema tebi</strong> - Nije zbog izgleda, dosade ili druge žene. Razlog je u njegovom MOZGU - i pokazat ću ti kako to "resetirati" u sljedećih 7 dana`,
      `<strong>Glasovnu poruku od 6 riječi koja je natjerala Gabriela da se vrati Uni nakon što ju je ostavio</strong> - I molio ju je za oprost NA KOLJENIMA, govoreći "ne mogu živjeti bez tebe"`,
      `<strong>Zašto pokušavanje biti "savršena djevojka" zapravo tjera muškarca da pobjegne</strong> - I što umjesto toga učiniti da on trči za tobom kao opsjednut`,
      `<strong>Točnu rečenicu koja ga tjera da te JEDINU vidi</strong> - Dok sve ostale žene u njegovom životu postaju nevidljive (čak i ako je prije gledao za drugim)`,
      `<strong>Kako ga učiniti ovisnim o TEBI, a ne samo o seksu s tobom</strong> - Što ga prisiljavat će da misli na tebe svake večeri prije spavanja i da svaki dan iznova pokušava osvojiti tvoje srce`,
    ],
  },
  {
    headline: `Kako Aktivirati "Tajnu Kemiju" u Njegovom Mozgu Koja Tjera Muškarca da Postane Totalno Lud Za Tobom - Koristeći 21 Rečenicu Koje Znanstvenici Nazivaju "Sjeme Dopamina"`,
    subheadline: `Problem nikad nije bio u tebi - nego u tome što nisi znala KAKO muški mozak funkcionira. U ovom besplatnom 11-minutnom videu otkrit ćeš znanstveno dokazanu tehniku "Sjeme Dopamina" koja ga čini totalno zaluđenim tobom - čak i ako se već počeo udaljavati.`,
    bulletPointsTitle: "U videu ćeš naučiti:",
    bulletPoints: [
      `<strong>Pravi razlog zašto se odjednom "ohladi"</strong> - čak i nakon najljepših trenutaka zajedno - Nije druga žena. Nije dosada. To je neurotransmiter u njegovom mozgu (dopamin) koji je "zaspao" - i pokazat ću ti kako ga "resetirati"`,
      `<strong>21 "Sjeme Dopamina" rečenicu koje pale istu kemiju u njegovoj glavi kao kad se zaljubio u tebe</strong> - Samo što sada TI postaješ jedina na koju on ne može prestati misliti (čak i kada nisi tu)`,
      `<strong>Točnu glasovnu poruku (6 riječi) koja je natjerala muškarca da klekne pred bivšom djevojkom</strong> - Nakon godinu dana prekida, molio ju je da mu se vrati, govoreći "napravio sam najveću grešku u životu"`,
      `<strong>Precizni trenutak kada poslati svaku rečenicu za maksimalni učinak</strong> - Pošalji prerano = ne radi. Pošalji prekasno = propuštena prilika. Pokazat ću ti TOČNO kada (i vidjet ćeš promjenu u roku od 24h)`,
      `<strong>Zašto seks postaje "rutina" koja vas udaljava</strong> - I kako postati njegov JEDINI izvor te tajne kemije (što ga tjera da misli na tebe svake večeri prije spavanja)`,
    ],
  },
];

export type Version = {
  atfIndex: number;
  atf: (typeof atfList)[number];
  videoId: string;
  checkoutVersion: number;
};

export const getVersion = (versionKey: string): Version => {
  if (versionKey) versionKey = versionKey.toLowerCase();
  const v = versions[versionKey as keyof typeof versions] ?? versions["a"];
  return { ...v, atf: atfList[v.atfIndex] };
};

export const versions = {
  a: {
    atfIndex: 0,
    videoId: "g9nfxr9qzj",
    checkoutVersion: 1,
  },
  b: {
    atfIndex: 1,
    videoId: "3tf8mfzu8d",
    checkoutVersion: 2,
  },
  c: {
    atfIndex: 1,
    videoId: "d5s4l5wkz1",
    checkoutVersion: 1,
  },
  d: {
    atfIndex: 1,
    videoId: "gw1rkto4gj",
    checkoutVersion: 2,
  },
  e: {
    atfIndex: 0,
    videoId: "ly5xs7ib89",
    checkoutVersion: 1,
  },
  f: {
    atfIndex: 0,
    videoId: "j41pujrcf2",
    checkoutVersion: 1,
  },
};
