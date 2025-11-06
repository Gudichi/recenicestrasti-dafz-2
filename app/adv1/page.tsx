import type { Metadata } from "next";
import styles from "./Adv1.module.css";

export const metadata: Metadata = {
  title: "Smijali su se kad sam rekla da mi svakog dana barem jedan dečko priđe na ulici",
  description:
    "ALI onda sam im otkrila TAJNU. Prijateljice. Kolegice. Čak i sestra. Iskreno? Vjerojatno bih i ja isto rekla da nisam prošla kroz... ono što sam prošla.",
  openGraph: {
    title: "Smijali su se kad sam rekla da mi svakog dana barem jedan dečko priđe na ulici",
    description:
      "ALI onda sam im otkrila TAJNU. Prijateljice. Kolegice. Čak i sestra.",
    type: "article",
    publishedTime: new Date().toISOString(),
  },
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("hr-HR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const latestNews = [
  { category: "Lifestyle", title: "5 znakova da je vrijeme za promjenu", time: "12 min" },
  { category: "Savjeti", title: "Kako prepoznati pravu priliku", time: "25 min" },
  { category: "Odnosi", title: "Što muškarci stvarno žele", time: "1h" },
  { category: "Psihologija", title: "Neverbalna komunikacija u praksi", time: "2h" },
  { category: "Lifestyle", title: "10 načina kako poboljšati samopouzdanje", time: "3h" },
  { category: "Savjeti", title: "Kako se osjećati sigurno u bilo kojoj situaciji", time: "5h" },
  { category: "Odnosi", title: "Tajna uspješnih veza", time: "1 dan" },
];

export default function Adv1Page() {
  const publishDate = new Date();

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.headline}>
            Smijali su se kad sam rekla da mi svakog dana barem jedan dečko priđe na ulici — dok im nisam otkrila TAJNU zbog koje se to događa!
          </h1>
          <div className={styles.byline}>
            <span className={styles.category}>Lifestyle</span>
            <time dateTime={publishDate.toISOString()}>
              {formatDate(publishDate)}
            </time>
          </div>
        </header>

        <figure className={styles.heroImage}>
          <div className={styles.imagePlaceholder}>
            <span>Ilustracija</span>
          </div>
          <figcaption className={styles.caption}>Ilustracija</figcaption>
        </figure>

        <div className={styles.content}>
          <p className={styles.lead}>
            <strong>ALI onda sam im otkrila TAJNU.</strong>
          </p>

          <p>
            "Ma daj... ne živiš u filmu."
            <br />
            "To ti je sigurno neki čudak."
            <br />
            "U Zagrebu? Da ti priđe normalan muškarac – svaki dan? Daj, budi realna."
          </p>

          <p>
            To su mi rekli. Prijateljice. Kolegice. Čak i sestra.
            <br />
            Iskreno? Vjerojatno bih i ja isto rekla da nisam prošla kroz... ono što sam prošla.
          </p>

          <figure className={styles.inlineImage}>
            <div className={styles.imagePlaceholder}>
              <span>Ilustracija</span>
            </div>
            <figcaption className={styles.caption}>Ilustracija</figcaption>
          </figure>

          <p>
            Jer prije 3 mjeseca, osjećala sam se totalno suprotno.
            <br />
            Kao da sam postala — <em>prozirna.</em>
          </p>

          <hr className={styles.divider} />

          <h2>Znaš ono kad se središ... i ništa se ne dogodi?</h2>

          <figure className={styles.inlineImage}>
            <div className={styles.imagePlaceholder}>
              <span>Ilustracija</span>
            </div>
            <figcaption className={styles.caption}>Ilustracija</figcaption>
          </figure>

          <p>
            Obuješ one čizme koje ti dobro stoje.
            <br />
            Osmijeh na licu, držiš se lijepo. Čak se uhvatiš da ga pogledaš...
            <br />
            ...i opet ništa.
          </p>

          <p>
            Nitko ne reagira. Nitko ne prilazi.
            <br />
            Osjećaš se kao ukras u pozadini scene.
          </p>

          <p>
            Mislila sam: "Možda je do mene."
            <br />
            Ali kad sam počela pričati s drugim ženama, shvatila sam — <em>nismo mi problem.</em>
            <br />
            Problem je što su muškarci — pogubljeni.
          </p>

          <hr className={styles.divider} />

          <h2>Što se dogodilo muškarcima?</h2>

          <figure className={styles.inlineImage}>
            <div className={styles.imagePlaceholder}>
              <span>Ilustracija</span>
            </div>
            <figcaption className={styles.caption}>Ilustracija</figcaption>
          </figure>

          <p>
            Mobiteli. Strah od odbijanja. "Šta ako mi kaže da od*ebem?"
            <br />
            #MeToo paranoja. "Uredu je biti džentlmen" pretvorilo se u "najbolje da šutim".
          </p>

          <p>
            Ali ono što većina žena ne zna...
            <br />
            Muškarac ne prilazi zato što <strong>želi</strong>, nego zato što <strong>osjeti da smije</strong>.
          </p>

          <p>
            I 99% žena tog signala više — <strong>ne šalje.</strong>
          </p>

          <p>
            Ne zato što je glupa. Ili nezanimljiva. Ili ne zna flertati.
            <br />
            Nego zato što ju je <em>život naučio da se zatvori.</em>
          </p>

          <hr className={styles.divider} />

          <h2>A ja? Ja sam otkrila kako ponovno "upaliti svjetlo"</h2>

          <p>
            Nisam otišla na <em>makeover.</em>
            <br />
            Nisam <em>učila nikakve rečenice ili glumila samopouzdanje</em>.
            <br />
            Nisam <em>čak ni gledala one cringe videe na TikToku o "feminine energy."</em>
          </p>

          <p>
            Umjesto toga, netko mi je pokazao <strong><em>7 neverbalnih signala</em></strong> — <em>koje muški mozak prepoznaje kao</em>
          </p>

          <p className={styles.quote}>
            <em>"Otvorena je. Sigurno je. Smiješ joj prići."</em>
          </p>

          <p>
            Bilo je... smiješno jednostavno.
            <br />
            I da — prvi <strong>put kad sam to pokušala</strong>, <em>prišao mi je</em> <strong><em>netko normalan.</em></strong>
          </p>

          <h2>Drugi dan, opet ista stvar.</h2>

          <p>
            Bila sam u pekari.
            <br />
            Samo sam stajala, <em>držala tijelo kako mi je pokazano</em> — <em>i pogledala na točno određeni način.</em>
          </p>

          <p>Tip iza mene rekao je:</p>

          <p className={styles.quote}>
            <em>"Iskreno... mislim da sam vas već negdje vidio. Ili mi se samo čini?"</em>
          </p>

          <p>
            <em>Nisam znala što odgovoriti.</em>
            <br />
            <strong>Ali nisam ni morala.</strong> <em>Jer nije bila poanta u tome da budem brza, pametna ili zabavna.</em>
            <br />
            Poanta je bila — <em>da se opet osjećam... primijećeno.</em>
          </p>

          <hr className={styles.divider} />

          <h2>I tako sam počela koristiti aplikaciju koja ti <em>svaki dan kaže</em> <em>što</em> <em>da napraviš</em> — i <em>gdje</em>.</h2>

          <p>
            Zove se <strong>Signali strasti.</strong>
          </p>

          <p>
            Nije <strong>aplikacija za dejtanje.</strong>
            <br />
            Nije <strong>trening za flert.</strong>
            <br />
            I ne uči te <strong>kako "uhvatiti frajera."</strong>
          </p>

          <p>
            Uči te <em>kako ponovno aktivirati svoju stvarnu prisutnost.</em>
          </p>

          <p>
            Ne online. Ne kroz izgled.
            <br />
            Nego kroz mikro-signale koje tvoje tijelo već zna — samo su ti ih izgasili.
          </p>

          <hr className={styles.divider} />

          <h2>💡 Kako funkcionira?</h2>

          <p>
            <em>U aplikaciji svaki dan dobiješ:</em>
          </p>

          <p>
            ✅ 1 signal (trajanje: 60 sekundi ili manje)
            <br />
            ✅ psihološko objašnjenje zašto djeluje na muški mozak
            <br />
            ✅ savjet koji signal odabrati ovisno o lokaciji (kafić, posao, teretana...)
            <br />
            ✅ mentorsku podršku ako želiš provjeru ili samo podijeliti što ti se dogodilo
          </p>

          <p>
            <em>I iskreno?</em>
            <br />
            <strong><em>Većina žena ne stigne ni do 3. dana, a da se nešto ne dogodi.</em></strong>
            <br />
            <em>Pogled više. Osmijeh. Prilazak. Ili samo...</em> <em>osjećaj da nisi duh u prostoru.</em>
          </p>

          <hr className={styles.divider} />

          <div className={styles.sponsoredBlock}>
            <div className={styles.sponsoredBadge}>Sponzorirano</div>
            <h3>Najbolji osjećaj? Kad te prvi put pita: <em>"Hej, oprosti... poznajemo li se?"</em></h3>
            <p>
              Ne moraš <em>promijeniti izgled.</em>
              <br />
              Ne moraš <em>mijenjati svoj stil komunikacije.</em>
              <br />
              I ne moraš <em>"glumiti otvorenost"</em> — <em>jer ona već postoji u tebi.</em>
            </p>
            <p>
              <em>Samo je zatrpana pravilima, stresom, sramom i godinama u kojima te nitko nije gledao onako.</em>
            </p>
            <a href="/lp1" className={styles.ctaButton} role="button" aria-label="Otvori vodič">
              Otvori vodič
            </a>
          </div>

          <hr className={styles.divider} />

          <h2>I što sam otkrila?</h2>

          <p>
            <strong>Otkrila sam da se</strong> <em><strong>vidljivost ne događa slučajno.</strong></em>
            <br />
            Događa se kad pošalješ signal.
            <br />
            A sada znam — <strong>koji.</strong>
          </p>

          <p>Zato kad mi kažu:</p>

          <p className={styles.quote}>
            <strong>"Ma daj, nije moguće da ti svaki dan neko priđe..."</strong>
          </p>

          <hr className={styles.divider} />

          <p>
            ➡️ Ako i ti želiš osjetiti kako je to — kad netko <em>primijeti baš tebe</em>,
            <br />
            probaj prvi signal već danas.
          </p>

          <p>
            Bez obveze. Bez glume.
            <br />
            Samo ti — kako te muškarci još nisu vidjeli.
          </p>

          <p>
            [Otvori Signale Strasti ovdje]
            <br />
            (<em>i vidi što se dogodi sljedeći put kad uđeš u kafić.</em>)
          </p>
        </div>
      </article>

      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Najnovije</h3>
        <ul className={styles.latestList}>
          {latestNews.map((item, index) => (
            <li key={index} className={styles.latestItem}>
              <a href="#" className={styles.latestLink}>
                <span className={styles.latestCategory}>{item.category}</span>
                <span className={styles.latestTitle}>{item.title}</span>
                <span className={styles.latestTime}>{item.time}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

