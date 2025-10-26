import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    question: "Koliko brzo mogu vidjeti rezultate?",
    answer:
      "Već u roku od 24 sata možeš vidjeti prve promjene u njegovom ponašanju. Većina naših klijentica izvještava da je njihov muškarac počeo pokazivati znakove povećane pažnje i zaljubljenosti tijekom prvog dana primjene. Neke čak dobiju poziv ili poruku u roku od nekoliko sati!",
  },
  {
    question: "Mogu li koristiti rečenice ako smo prekinuli kontakt?",
    answer:
      'Apsolutno da! Program uključuje posebne "rečenice povratka" dizajnirane upravo za situacije kada nema kontakta. "Zvjezdana rečenica" od 6 riječi je već pomogla 1847 žena da vrate bivše partnere koji ih nisu kontaktirali mjesecima.',
  },
  {
    question: "Hoće li rečenice funkcionirati na svakom muškarcu?",
    answer:
      'Da, jer se temelje na neuroznanosti i psihologiji muškog mozga. Bez obzira na dob, karakter ili situaciju, svi muškarci imaju iste neurološke reakcije na "sjeme dopamina" rečenice. To je kao da imaš daljinski upravljač za njegov um.',
  },
  {
    question: "Što ako se osjeća dosadno ili nezainteresirano?",
    answer:
      'To je upravo razlog zašto ove rečenice postoje! Program je kreiran specifično za situacije kada muškarac gubi interes. "Afroditina rečenica" će ga natjerati da zaboravi sve druge žene i fokusira se samo na tebe.',
  },
  {
    question: "Mogu li koristiti rečenice preko WhatsApp-a ili poruka?",
    answer:
      "Naravno! Rečenice su dizajnirane da funkcioniraju putem bilo kojeg oblika komunikacije - WhatsApp, SMS, Facebook, uživo ili čak e-mail. Program ti pokazuje koji kanal je najbolji za svaku rečenicu.",
  },
  {
    question: "Što ako nikada nismo bili u vezi?",
    answer:
      'Program funkcionira jednako dobro za privlačenje novog muškarca! "Rečenica pečene banane" je posebno moćna za muškarce koji žele samo seks - pretvara ih u ozbiljne partnere koji traže vezu u roku od 24 sata.',
  },
  {
    question: "Jesam li prestara/premlada da to funkcionira?",
    answer:
      "Dob nije faktor jer se rečenice temelje na biološkim reakcijama. Imamo uspješne priče od žena od 18 do 65 godina. Hormon dopamina djeluje jednako u muškom mozgu bez obzira na tvoju dob.",
  },
  {
    question: "Što ako je već u vezi ili oženjen?",
    answer:
      "Rečenice su toliko moćne da mogu promijeniti i najstabilnije situacije. Mnoge naše klijentkinje su uspješno privukle muškarce koji su bili u dugogodišnjim vezama. Međutim, uvijek preporučujemo etično korištenje programa.",
  },
  {
    question: "Mogu li pretjerati s korištenjem rečenica?",
    answer:
      "Program ti točno objašnjava kada i kako koristiti svaku rečenicu. Postoji precizna formula koja sprječava pretjerivanje. Zapravo, manje je više - jedna dobro izgovorena rečenica može biti moćnija od stotinu običnih.",
  },
  {
    question: "Što ako ne govori srpski/hrvatski/bosanski?",
    answer:
      "Rečenice se mogu prilagoditi bilo kojem jeziku jer se temelje na univerzalnim psihološkim principima. Program uključuje objašnjenja kako adaptirati rečenice za druge jezike zadržavajući njihovu moć.",
  },
  {
    question: "Trebam li biti lijepa ili savršena da bi funkcioniralo?",
    answer:
      "Apsolutno ne! Ove rečenice funkcioniraju na mentalnoj i emocionalnoj razini, ne na fizičkoj. One aktiviraju dijelove mozga odgovorne za vezanost i ljubav, što je puno moćnije od fizičke privlačnosti.",
  },
  {
    question: "Može li postati svjestan da koristim tehnike?",
    answer:
      "Ne, jer rečenice zvuče prirodno i spontano. One su oblikovane da se uklapaju u normalnu konverzaciju. On će samo osjetiti jaku privlačnost prema tebi, ne znajući zašto.",
  },
  {
    question: "Što ako smo već u dobroj vezi?",
    answer:
      "Rečenice će učiniti da te još više voli i cijeni! Mnoge žene koriste program za jačanje postojećih veza i stvaranje dublje emocionalne povezanosti. Tvoj partner će te početi tretirati kao kraljicu.",
  },
  {
    question: "Funkcionira li na mlađim muškarcima (20-30 godina)?",
    answer:
      "Da, jer mlađi muškarci zapravo reagiraju još jače na dopamin! Njihov mozak je u peak stanju za stvaranje ovisnosti. Program uključuje posebne rečenice prilagođene mlađoj populaciji.",
  },
  {
    question: "Što ako je introvert ili jako povučen?",
    answer:
      "Introvertni muškarci često reagiraju najjače jer su emocionalno glađniji. Program uključuje posebne tehnike za povučene tipove ličnosti koji trebaju nježniji pristup.",
  },
  {
    question: "Mogu li koristiti više rečenica odjednom?",
    answer:
      'Program te uči strategiji "layering" - kako kombinirati rečenice za maksimalni učinak. Postoji specifičan redoslijed i timing koji multiplicira njihovu moć eksponencijalno.',
  },
  {
    question: "Što ako živi daleko ili se rijetko viđamo?",
    answer:
      "Udaljenost čini rečenice još moćnijima! Kada nema fizičku blizinu, njegova se pažnja fokusira na tvoje riječi. Distance rečenice u programu su dizajnirane upravo za ovakve situacije.",
  },
  {
    question: "Hoće li prestati funkcionirati nakon nekog vremena?",
    answer:
      "Ne, jer se njegovi neurotransmisiteri resetiraju svaki put! Program uključuje cycle rečenica koje osiguravaju dugotrajne rezultate. Zapravo, s vremenom postaju sve jače jer stvaraju pattern ovisnosti.",
  },
  {
    question: "Što ako je već čuo za ovakve tehnike?",
    answer:
      '99.9% muškaraca ne zna za postojanje "sjeme dopamina" rečenica. Čak i da su čuli o sličnim tehnikama, ove specifične rečenice su toliko suptilne da ih neće prepoznati.',
  },
  {
    question: "Uključuje li program primjere konkretnih situacija?",
    answer:
      "Da, program sadrži preko 50 realnih scenarija s gotovim rečenicama! Od prve poruke nakon prekida do situacija kada ignorira pozive - imaš ready-to-use rečenicu za svaku situaciju.",
  },
  {
    question: "Mogu li koristiti rečenice ako imam problem s komunikacijom?",
    answer:
      "Upravo zato su rečenice savršene! One su kratke, jednostavne i ne zahtijevaju posebne komunikacijske vještine. Program ti daje exact wording koji trebaš koristiti.",
  },
  {
    question: "Što ako se boji obvezivanja?",
    answer:
      '"Rečenica slobode" pretvara commitment-phobe muškarce u one koji traže brak! Program objašnjava psihologiju straha od obvezivanja i kako je neutralizirati jednom rečenicom.',
  },
  {
    question: "Mogu li koristiti rečenice na društvenim mrežama?",
    answer:
      'Apsolutno! Program uključuje "Social Media Module" s rečenicama prilagođenima za Instagram, Facebook, TikTok komentare koje će ga natjerati da te kontaktira privatno.',
  },
  {
    question: "Što ako imam djece iz prethodne veze?",
    answer:
      'Program ima posebnu sekciju za složene obiteljske situacije. "Majčinske rečenice" pokazuju kako koristiti materinstvo kao prednost, a ne prepreku u privlačenju muškarca.',
  },
  {
    question: "Mogu li dobiti povrat novca ako ne funkcionira?",
    answer:
      "Da, imaš 60-dnevno bezuvjetno jamstvo! Ako primijenišš sve rečenice točno kako te učim i ne vidiš rezultate, vraćam ti 100% novca. Ali iskreno, još nismo imali povrat jer program jednostavno funkcionira kada se pravilno koristi.",
  },
];

const FAQListItem = ({
  faq,
}: {
  faq: { question: string; answer: string };
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-accent pr-4">{faq.question}</span>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      {expanded && (
        <div className="px-6 pb-4 border-t border-gray-100">
          <p className="text-left text-gray-700 leading-relaxed pt-4">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
};

export const FAQList = ({
  data = faqData,
}: {
  data?: { question: string; answer: string }[];
}) => {
  return (
    <div className="space-y-4">
      {data?.map((faq, index) => (
        <FAQListItem key={index} faq={faq} />
      ))}
    </div>
  );
};
