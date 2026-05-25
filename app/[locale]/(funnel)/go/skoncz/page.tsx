import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Skończ to co Zaczynasz — 30-Dniowy Sprint",
  description:
    "30-dniowy sprint domykania dla dorosłych, którzy zaczynają pięć rzeczy i kończą zero. Bez wstawania o 5, bez siły woli, bez papierka od psychiatry.",
  robots: { index: false, follow: false },
}

const ORDER_HREF = "#zamow"
const CONTACT_EMAIL = "hello@yellows.one"

function CTAButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={ORDER_HREF}
      className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-gray-900 px-8 py-5 text-base sm:text-lg font-bold text-white no-underline transition-all hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg"
    >
      {children}
    </a>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
      {children}
    </h2>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 mb-4 leading-snug">
      {children}
    </h3>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-lg leading-relaxed text-gray-700">{children}</p>
}

function Bonus({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
        Bonus {number}
      </p>
      <H3>{title}</H3>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

function StackRow({ label, price }: { label: string; price: string }) {
  return (
    <li className="flex items-start justify-between gap-6 py-4 border-b border-gray-200 last:border-b-0">
      <span className="flex-1">
        <span className="text-green-600 mr-2" aria-hidden="true">✓</span>
        {label}
      </span>
      <span className="shrink-0 font-medium text-gray-900 whitespace-nowrap">{price}</span>
    </li>
  )
}

export default function SkonczLanding() {
  return (
    <article lang="pl" className="bg-white text-gray-700">
      {/* HERO */}
      <section className="pt-16 sm:pt-24 pb-12">
        <div className="mx-auto max-w-2xl px-5 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-6">
            30-Dniowy Sprint
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-8">
            Skończ to co Zaczynasz — bez wstawania o 5 i bez siły woli
          </h1>
          <P>
            Dla dorosłych, którzy zaczynają pięć rzeczy i kończą zero. 30-dniowy sprint
            domykania, oparty na 2 metodach z terapii ADHD klinicznie udowodnionych przy
            domykaniu zadań.
          </P>
          <div className="mt-10 space-y-4 text-lg text-gray-700">
            <P>
              W 30 dni domkniesz pierwszą rzecz, która od miesięcy się wlecze, i przerwiesz
              pętlę wstydu &bdquo;zaczynam, nie kończę, znowu się obwiniam&rdquo;.
            </P>
            <P>I to...</P>
            <ul className="space-y-2 pl-1">
              {[
                "bez wstawania o 5 rano",
                'bez "weź się w garść"',
                "bez kolejnego planera, który porzucisz po 2 tygodniach",
                "bez papierka od psychiatry",
                "bez czekania rok w kolejce do NFZ",
                "bez konfiguracji Notion z 50 bazami, którą porzucasz po 1 dniu",
                "bez rezygnacji z kawy, scrollowania i hiperfokusów",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gray-400 select-none">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <P>Do tego wystarczy:</P>
            <ul className="mt-4 space-y-2 pl-1">
              {[
                "5 do 15 minut dziennie (nie godzina, nie 2 godziny)",
                "Drukarka albo Apple Notes / Notion (na gotowe szablony, NIE blank canvas)",
                "1 wlokąca się rzecz, którą wybierasz na 30 dni",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gray-400 select-none">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <P>
              Po prostu odpalasz protokół, idziesz po kawę, a Sprint pracuje. I przez 30 dni
              dostajesz:
            </P>
            <ul className="mt-4 space-y-2 pl-1">
              {[
                "wybrany projekt domknięty i odhaczony w trackerze",
                "14-dniową serię Start-Anchor bez przerwy (twardy dowód, że pętla się przerwała)",
                'wieczorne rozliczenie bez myśli "lista znowu pełna, znowu nie zrobiłem"',
                "pierwszy konkretny dowód że potrafisz domknąć to, co zaczynasz",
                "jedną górę zaległości oczyszczoną w 90 minut (maile, rachunki, papiery, sam wybierasz)",
                "2-zdaniowy skrypt przerywający spirale wstydu w 30 sekund",
                "4 reguły kierowania kawą, scrollowaniem i hiperfokusem (jako paliwo, nie wróg)",
                "osobisty mnożnik czasu po 24 godzinach (przestajesz planować 4x za dużo)",
                "miejsce wśród 200+ osób w identycznej sytuacji (Klub Niezdiagnozowani)",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gray-400 select-none">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <CTAButton>Zdobądź Sprint 30 Dni za 997 zł</CTAButton>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 space-y-8">
          <H2>Skończ z planowaniem &bdquo;od poniedziałku na poważnie&rdquo;</H2>

          <P>Wiesz dokładnie co masz zrobić. I dalej tego nie robisz.</P>
          <P><strong className="text-gray-900">Skończ z tym.</strong></P>

          <P>Po tygodniu unikania zaczynasz pięć rzeczy naraz, kończysz zero?</P>
          <P><strong className="text-gray-900">Skończ z tym.</strong></P>

          <P>
            Wieczorem rozliczasz się z dnia myślą &bdquo;lista znowu pełna, znowu nie
            zrobiłem&rdquo;?
          </P>
          <P><strong className="text-gray-900">Zapomnij o tym.</strong> Sprint 30 Dni robi to za ciebie.</P>

          <P>
            W niedzielę wieczór panika &bdquo;znowu tydzień zmarnowany, w poniedziałek na
            poważnie&rdquo;?
          </P>
          <P>
            <strong className="text-gray-900">Nie musisz tego znosić.</strong> Sprint
            zaczyna w poniedziałek za ciebie, 2-minutowym mikro-rytuałem.
          </P>

          <P>
            Próbowałeś już Pomodoro, BuJo, Atomowych Nawyków, planerów z Empiku, Notion z 50
            bazami, Habiticę, Forest? I każdy padł po 2 tygodniach?
          </P>
          <P>
            To nie była twoja wina. Kolejny system po prostu nie zadziałał na twój mózg.
          </P>

          <P>
            Coachingowy &bdquo;kołcz&rdquo; za 500 zł godzina, który mówi &bdquo;wystarczy
            się postarać&rdquo;?
          </P>
          <P>
            <strong className="text-gray-900">Nie potrzebujesz go.</strong> Sprint pracuje
            na 2 evidence-based metodach klinicznych, nie na pozytywnym myśleniu.
          </P>

          <P>
            Klasyczna samodyscyplina, &bdquo;wstawanie o 5 plus siła woli plus 12 tyg.
            dyscypliny&rdquo;, wykończyła cię już 5 razy?
          </P>
          <P>
            <strong className="text-gray-900">Skończ z tym.</strong> Sprint pracuje z twoim
            mózgiem, nie przeciw niemu.
          </P>

          <P>
            Konfigurowałeś Notion z 50 bazami danych w hiperfokusie w sobotę i porzuciłeś
            po 1 dniu?
          </P>
          <P>
            <strong className="text-gray-900">Można zapomnieć.</strong> Sprint to 2 strony
            PDF, nie 50 baz danych w Notion.
          </P>

          <P>
            Boisz się kupić, bo &bdquo;jeśli nie skończę, to kolejny dowód że jestem do
            niczego&rdquo;?
          </P>
          <P>
            Tu jest hamulec spirali wstydu w 30 sekund (Bonus 4). Plus Gwarancja
            Bezterminowa Bez Pytań. Plus brak wymogu ukończenia czegokolwiek żeby zwrócić.
          </P>

          <P>Nie wiesz, czy masz ADHD? I nie musisz wiedzieć.</P>
          <P>
            Sprint działa na <strong className="text-gray-900">OBJAWIE</strong>{" "}
            (&bdquo;nie kończę&rdquo;), nie na etykiecie.
          </P>

          <div className="pt-4">
            <P>Nie musisz dłużej...</P>
            <ul className="mt-4 space-y-2 pl-1">
              {[
                "Otwierać aplikacji bankowej z duszą na ramieniu (rachunki, deklaracje, papiery)",
                'Płacić 300-500 zł za sesję coachingu ADHD, żeby usłyszeć "wystarczy się postarać"',
                "Czekać rok w kolejce NFZ na diagnozę, żeby zacząć działać",
                "Wydawać 600-1500 zł na prywatną diagnostykę i potem nie wiedzieć co dalej",
                "Zaczynać 5-ty rok z rzędu z planerem, który porzucisz w 3-cim tygodniu stycznia",
                'Zamykać oczy na zaległości, bo "góra za duża"',
                "Udawać w pracy że ogarniasz, kiedy w środku panika",
                "Zwracać klientowi 8 000 zł zaliczki, bo nie skończyłeś projektu w terminie",
                "Konfigurować 50 baz Notion w hiperfokusie i porzucać po 24h",
                'Słuchać "ale ty masz taki potencjał, tylko jesteś leniwy"',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gray-400 select-none">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <P>Możesz zapomnieć o tym wszystkim raz na zawsze. Sprint 30 Dni robi wszystko sam.</P>
        </div>
      </section>

      {/* VEHICLE / HOW */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 space-y-8">
          <H2>Wreszcie pętla wstydu i poczucia winy nie hamuje już twojego życia</H2>

          <ul className="space-y-3 text-lg text-gray-700">
            <li>
              <strong className="text-gray-900">Pilnuje startu sam.</strong>
            </li>
            <li>
              <strong className="text-gray-900">Chroni hiperfokus sam.</strong>
            </li>
            <li>
              <strong className="text-gray-900">Domyka projekt sam.</strong>
            </li>
          </ul>

          <P>
            Już nie potrzebujesz nikogo, kto za 500 zł godzinę powie ci &bdquo;musisz się
            postarać&rdquo;. Sprint sam pokazuje ci, gdzie postawić stopę, krok po kroku, na
            gotowych szablonach.
          </P>
          <P>
            A coacha, psychoterapeutkę i partnerkę, która wciąż powtarza &bdquo;weź się w
            garść&rdquo;, można na chwilę odstawić. Do tej pracy nie są potrzebni.
          </P>

          <H3>Jak to działa?</H3>
          <ol className="space-y-4 list-decimal pl-6 text-lg text-gray-700">
            <li>
              <strong className="text-gray-900">Wybierasz 1 wlokącą się rzecz</strong>{" "}
              (mała lub większa, sam decydujesz). Mail do banku od 4 miesięcy. Sklep Shopify
              w 30%. Kurs Udemy zaczęty rok temu. Twój wybór.
            </li>
            <li>
              <strong className="text-gray-900">Włączasz 2-minutowy Start-Anchor</strong>{" "}
              (gotowy szablon &bdquo;jeśli-to&rdquo; Implementation Intentions, NIE blank
              Notion).
            </li>
            <li>
              <strong className="text-gray-900">Drukujesz 2-stronicowy ADHD Daily Frame</strong>{" "}
              i kładziesz obok kawy (pole &bdquo;Co JEDNO zamykam dziś&rdquo; zamiast 47 to-do).
            </li>
            <li>
              <strong className="text-gray-900">Idziesz po kawę</strong>, a Sprint 30 Dni
              pracuje.
            </li>
            <li>
              <strong className="text-gray-900">Po 30 dniach:</strong> projekt domknięty i
              odhaczony, 14-dniowa seria w trackerze, pętla wstydu przerwana na dobre.
            </li>
          </ol>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 space-y-6">
          <H2>Co konkretnie dostajesz w Sprincie?</H2>
          <H3>Protokół 30 Dni: Start, Mid-Lock, Finisz</H3>
          <P>
            Trzyfazowy system zbudowany na 2 klinicznych metodach (Behavioral Activation +
            Implementation Intentions Gollwitzera, RCT-evidence: 2-3x wyższe ukończenie
            zadań u dorosłych z ADHD).
          </P>
          <P>
            <strong className="text-gray-900">Faza 1, Start-Anchor (2 min):</strong> rytuał
            &bdquo;jeśli-to&rdquo;, który omija paraliż perfekcjonizmu. Nie 25-minutowe
            Pomodoro, nie godzinna sesja deep work — 2 minuty pre-fillowane.
          </P>
          <P>
            <strong className="text-gray-900">Faza 2, Mid-Lock (3 reguły):</strong>{" "}
            zabezpiecza bieżący projekt przed dopaminergic sabotage. Kiedy nowy pomysł rzuca
            ci się przed oczy o 21:00 (&bdquo;nowy startup, ten zadziała&rdquo;), Mid-Lock
            przekierowuje ten strzał dopaminy na bieżący projekt, nie pozwala mu zabić tego,
            co prawie domknięte.
          </P>
          <P>
            <strong className="text-gray-900">Faza 3, Finisz-Lane (4 reguły):</strong>{" "}
            domyka ostatnie 30% projektu, gdzie projekty zwykle giną. Tu większość kursów
            się kończy. Tu nasze się zaczyna.
          </P>
          <P>
            12 modułów wideo (łącznie 90 min, nie 20 godzin teorii). 3 jednostronicowe
            szablony PDF (po jednym na fazę). Tracker time-stamped do logowania 14-dniowej
            serii Start-Anchor. Dożywotni dostęp w panelu kursanta.
          </P>
        </div>
      </section>

      {/* PRICE PREP */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 space-y-6">
          <H2>Ile kosztuje Sprint 30 Dni?</H2>
          <P>Ile zapłaciłeś już, próbując domknąć cokolwiek samodzielnie?</P>
          <ul className="space-y-2 text-lg text-gray-700 pl-1">
            <li>Atomowe Nawyki: 39 zł.</li>
            <li>Tracy &bdquo;Samodyscyplina dla opornych&rdquo;: 49 zł.</li>
            <li>Habitica premium roczny: 240 zł.</li>
            <li>Calm + Forest premium: 240 zł.</li>
            <li>Notion ADHD-OS od freelancera: 350 zł.</li>
            <li>Książki ADHD (Otsuka, Hallowell, Bernau): 200 zł.</li>
          </ul>
          <P>
            <strong className="text-gray-900">Suma: około 1 100 zł</strong> utopionych w
            cmentarzysku porzuconych systemów. Bez gwarancji, że którykolwiek zadziała.
          </P>
          <P>A jeśli pójdziesz do coacha ADHD?</P>
          <P>
            Tomasz Tajchman, Barbara Górka, MiniCoach ADHD: 350-500 zł za sesję. 4 sesje to
            absolutne minimum, żeby przejść od startu do struktury:{" "}
            <strong className="text-gray-900">1 400 do 2 000 zł.</strong>
          </P>
          <P>
            A diagnostyka ADHD w Centrum ALMA prywatnie: 500-1 500 zł. NFZ: kolejka rok do
            dwóch.
          </P>
          <P>
            Plus rozjeżdża cię to emocjonalnie. Po piątym porzuconym systemie wieczór ma
            jeden smak: &bdquo;znowu nic nie zrobiłem, znowu lista pełna&rdquo;.
          </P>
          <P>
            W każdym razie, robisz to samodzielnie czy z coachem, mniej niż 1 500 zł nie
            wyjdzie.
          </P>
        </div>
      </section>

      {/* WORTH IT? */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 space-y-6">
          <H2>Czy Sprint 30 Dni jest dla ciebie?</H2>
          <P>Zadaj sobie 3 pytania...</P>
          <P>
            Gdybyś za 30 dni domknął jedną rzecz, która od miesięcy się wlecze (mały
            projekt, papiery, deklarację, niedopisaną książkę, zaczęty kurs Udemy, sklep
            Shopify, dowolny twój wybór) i pierwszy raz od lat poczułbyś, że MOŻESZ zaufać
            sobie...
          </P>
          <P>
            <strong className="text-gray-900">Czy byłoby to warte 1 500 zł?</strong>
          </P>
          <P>
            A gdybyś już nigdy nie musiał kupować kolejnego planera, kolejnej apki, kolejnej
            książki o produktywności (i porzucać po 2 tygodniach), bo dostałbyś jeden system,
            który trzyma się 30 dni i dalej?
          </P>
          <P>
            <strong className="text-gray-900">Czy taki system byłby warty 1 500 zł?</strong>
          </P>
          <P>
            A gdybyś dostał jeszcze 7 dodatkowych narzędzi w bonusach (od kierowania kawą po
            skrypt przerywający spirale wstydu w 30 sekund), które same w sobie są warte 3
            830 zł, plus dożywotni dostęp do Klubu Niezdiagnozowani (200+ osób w identycznej
            sytuacji jak ty)?
          </P>
          <P>
            <strong className="text-gray-900">Czy całość nie byłaby warta 6 320 zł?</strong>
          </P>
        </div>
      </section>

      {/* STRATEGIC REASON + PRICE */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 space-y-6">
          <H2>Ale dziś nie wezmę od ciebie 6 320 zł</H2>
          <P>Zrobię mądrzej... Dam ci cały Sprint 6 razy taniej.</P>
          <P>
            Ale nie dlatego, że chcę zrobić ci prezent. Mój cel jest strategiczny. Zrobić
            nie jednorazową sprzedaż, ale zbudować długofalową relację.
          </P>
          <P>
            Sprawić, żebyś został moim fanem, żebyś wracał do mnie z każdym kolejnym
            wyzwaniem przez długie lata. I co więcej... polecać moje produkty znajomym,
            przyjaciołom i bliskim.
          </P>
          <P>
            Bo polecając wartościowy produkt, przyjaciele dziękują właśnie tobie za
            polecenie. A śmieci nikt nie poleca.
          </P>
          <P>
            I żeby osiągnąć mój strategiczny cel, dam ci ten Sprint{" "}
            <strong className="text-gray-900">6 razy taniej</strong>... Żebyś zobaczył, jak
            Sprint upraszcza ci życie. Jak szybko dowozi pierwsze domknięcie.
          </P>
          <P>Oto cała moja strategia.</P>

          <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-10 text-center">
            <p className="text-gray-500 mb-3">Tak więc zamiast 6 320 zł...</p>
            <p className="text-2xl text-gray-400 line-through mb-2">6 320 zł</p>
            <p className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4">997 zł</p>
            <p className="text-gray-600 mb-8">Rabat aż 5 323 zł</p>
            <CTAButton>Zdobądź Sprint 30 Dni za 997 zł</CTAButton>
            <p className="mt-6 text-sm text-gray-500">
              Natychmiast po opłacie na maila dostajesz dostęp.
            </p>
          </div>
        </div>
      </section>

      {/* BONUSES */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 space-y-16">
          <div>
            <H2>Jednak to nie wszystko...</H2>
            <P>
              Jeśli przyjmiesz tę ofertę zanim timer dojdzie do 00:00, w prezencie
              dostajesz:
            </P>
          </div>

          <Bonus number="1" title="ADHD Daily Frame — 2 strony zamiast 25 apek">
            <P>
              Próbowałeś już Pomodoro, BuJo, Atomowych Nawyków, planerów ADHD, Notion z 50
              bazami? Każdy padł po 2 tygodniach? Konfiguracja w hiperfokusie zajęła ci 2
              godziny w sobotni wieczór, porzuciłeś po niedzieli? Można zapomnieć.
            </P>
            <ul className="space-y-2 pl-1">
              {[
                "2-stronicowy szablon z 5 polami pre-fillowanymi, NIE blank canvas Notion",
                'Pole "1 hiperfokus dziennie chroniony" zamiast walki z impulsywnością',
                'Pole "Co JEDNO zamykam dziś" zamiast 47 to-do',
                "3 formaty: papier do druku, gotowy template Notion, gotowy template Apple Notes",
                'Video 12 min "wdrożenie w 15 minut"',
                "Konfiguracja 15 min, codzienne użycie 2 min rano plus 2 min wieczorem",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <span className="text-gray-400 select-none">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <P>
              <strong className="text-gray-900">Rezultat:</strong> Jeden 2-stronicowy system
              zamiast 25 apek równocześnie. Konfiguracja 15 minut zamiast 1-2 godzin.
            </P>
          </Bonus>

          <Bonus number="2" title="Twój Zegar w 24h — Quick-Win Dnia Pierwszego">
            <P>
              Planujesz każdy dzień, kończysz z 70% niezrobione? Myślisz &bdquo;to zajmie
              godzinę&rdquo;, zajmuje 4h? Wieczorem rozliczasz się z dnia myślą &bdquo;lista
              znowu pełna&rdquo;? Skończ z tym.
            </P>
            <P>
              W 24 godziny dostajesz osobisty mnożnik czasu (×2, ×2.5, ×3, twój prawdziwy),
              dzięki czemu pierwszy raz od lat planujesz realistycznie.
            </P>
            <ul className="space-y-2 pl-1">
              {[
                "1-stronicowa karta wizytówkowa do druku z 60-sekundowym protokołem",
                "Tracker (papier, Apple Notes lub Notion template, do wyboru)",
                "Video 8 min wyjaśniające protokół na konkretnych przykładach",
                "Po 24h: pierwszy osobisty mnożnik czasu (twój prawdziwy)",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <span className="text-gray-400 select-none">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <P>
              <strong className="text-gray-900">Rezultat:</strong> Pierwszy mierzalny efekt
              w 24 godziny. Przestajesz codziennie kończyć dzień z myślą &bdquo;lista znowu
              pełna&rdquo;.
            </P>
          </Bonus>

          <Bonus number="3" title="Dopamine Steering — kierować, nie walczyć">
            <P>
              &bdquo;Tylko nie odbierajcie mi kawy. Bez energetyka rano nie funkcjonuję.
              Scrollowanie to moje jedyne źródło dopaminy.&rdquo; Każdy poprzedni kurs
              wymagał rezygnacji? Można zapomnieć.
            </P>
            <P>4 reguły kierowania dopaminą:</P>
            <ul className="space-y-2 pl-1">
              {[
                "Kawa jako trigger Start-Anchor, NIE jako prokrastynacja przed startem",
                "Scroll w 10-min boxie po Start-Anchor, NIE rozproszony przez 9-godzinny dzień",
                "1 hiperfokus dziennie chroniony, kierowany na BIEŻĄCY projekt",
                "Energetyk zarezerwowany na Finisz-Lane (ostatnie 30% projektu)",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <span className="text-gray-400 select-none">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <P>
              <strong className="text-gray-900">Rezultat:</strong> Używasz kawy, scrolla,
              hiperfokusów jako PALIWA pracy, zamiast walczyć z nimi i przegrywać.
            </P>
          </Bonus>

          <Bonus number="4" title="Shame-Loop Interrupt — hamulec spirali wstydu w 30 sekund">
            <P>
              Wieczorem łapiesz się na myśli &bdquo;leń, kretyn, charakter zepsuty&rdquo;?
              Po porażce wpadasz w tydzień scrollowania? Boisz się kupić ten Sprint, bo
              &bdquo;jeśli nie skończę, to kolejny dowód że jestem do niczego&rdquo;?
            </P>
            <P>
              2-zdaniowy skrypt, który przerywa wewnętrznego krytyka w 30 sekund, zanim
              wstyd wciągnie cię na tydzień scrollowania.
            </P>
            <ul className="space-y-2 pl-1">
              {[
                "Audio 8 min psychoedukacji o Compassion-Focused Therapy",
                "2-zdaniowy skrypt: nazwij stan, wybierz najmniejsze działanie",
                "Karta z 4 wzorcami: poranek paraliżu, wieczór winy, porażka publiczna, niedokończony projekt",
                "Zalaminowana wersja karty do portfela",
                "4 case studies absolwentów",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <span className="text-gray-400 select-none">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <P>
              <strong className="text-gray-900">Rezultat:</strong> W 30 sekund przerywasz
              spiralę wstydu, zanim wstyd wciągnie cię na tydzień scrollowania.
            </P>
          </Bonus>

          <Bonus number="5" title="Backlog Burner — 1 góra zaległości w 90 minut">
            <P>
              Maile od miesięcy nieotwierane (4 000? 8 000? 12 000)? Rachunki, deklaracje,
              papiery, których boisz się dotknąć? Aplikacja bankowa zamknięta od tygodni,
              bo &bdquo;lepiej nie widzieć&rdquo;?
            </P>
            <P>
              90-min protokół, który w jeden wieczór likwiduje JEDNĄ górę zaległości.
            </P>
            <ul className="space-y-2 pl-1">
              {[
                "1-stronicowy PDF protokół z 3-koszowym sortowaniem",
                "Audio MP3 90 min do równoległego słuchania (ASMR-style focus track)",
                'Tracker "kategoria oczyszczona, data"',
                "Hard-stop timer 90 min — zamykasz komputer niezależnie od wyniku",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <span className="text-gray-400 select-none">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <P>
              <strong className="text-gray-900">Rezultat:</strong> W jeden wieczór jedna
              góra znika. Dramatyczny dowód &bdquo;ja TO zrobiłem w 90 min&rdquo;.
            </P>
          </Bonus>

          <Bonus number="6" title="Trzecia Droga — działaj na objawie, nie na etykiecie">
            <P>
              &bdquo;Bez papieru od psychiatry nie mam prawa się utożsamiać z ADHD.&rdquo;
              &bdquo;A jeśli pójdę na diagnozę i okaże się, że NIE mam ADHD, to jestem po
              prostu leniwy.&rdquo;
            </P>
            <P>Framework &bdquo;Objaw vs Etykieta&rdquo;: działanie nie wymaga papieru.</P>
            <ul className="space-y-2 pl-1">
              {[
                'Quiz "5 z 7 zachowań" (PDF + interaktywna wersja) jako bramka tożsamościowa',
                '1-stronicowa karta "Objaw vs Etykieta" do codziennego użytku',
                '1 moduł wideo 20 min "Permisja w 20 minut"',
                "Logika decoupling: nie musisz mieć papieru, żeby działać na objawie",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <span className="text-gray-400 select-none">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <P>
              <strong className="text-gray-900">Rezultat:</strong> Dajesz sobie zezwolenie
              działać NA OBJAWIE, nie na etykiecie. W trakcie kolejki NFZ albo zamiast
              wydawania 1 500 zł na diagnostykę.
            </P>
          </Bonus>

          <Bonus number="7" title="Klub Niezdiagnozowani — wspólnota bez papieru (dożywotnio dla founding 50)">
            <P>
              FB-grupy &bdquo;Dorosłe ADHD&rdquo; są dla zdiagnozowanych. A ty jesteś sam z
              myślą &bdquo;czy ja w ogóle wolno mi tu być, jeśli nie mam papieru?&rdquo;
            </P>
            <P>
              Pierwsza polskojęzyczna społeczność specyficznie dla podejrzewających ADHD bez
              diagnozy.
            </P>
            <ul className="space-y-2 pl-1">
              {[
                "Zamknięty kanał Telegram (NIE Facebook, bo FB triggeruje scrollowanie u ADHD)",
                '3 stałe wątki: "Skończone w tym tygodniu", "Pytania bez papieru", "Diagnoza w trakcie"',
                "Moderacja 1h dziennie przez twórcę kursu",
                "200+ osób w identycznej sytuacji",
                "12 mies. dostępu dla zwykłych klientów",
                "DOŻYWOTNIO dla pierwszych 50 founding members",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <span className="text-gray-400 select-none">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <P>
              <strong className="text-gray-900">Rezultat:</strong> Masz miejsce, gdzie 200+
              osób w identycznej sytuacji dzieli się postępem każdego tygodnia.
            </P>
          </Bonus>
        </div>
      </section>

      {/* VALUE STACK */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 space-y-6">
          <H2>Podsumujmy</H2>
          <ul className="text-base sm:text-lg text-gray-700">
            <StackRow label="Protokół 30 Dni: Start, Mid-Lock, Finisz" price="2 490 zł" />
            <StackRow label="BONUS 1: ADHD Daily Frame" price="490 zł" />
            <StackRow label="BONUS 2: Twój Zegar w 24h" price="290 zł" />
            <StackRow label="BONUS 3: Dopamine Steering" price="390 zł" />
            <StackRow label="BONUS 4: Shame-Loop Interrupt" price="490 zł" />
            <StackRow label="BONUS 5: Backlog Burner" price="290 zł" />
            <StackRow label="BONUS 6: Trzecia Droga" price="590 zł" />
            <StackRow
              label="BONUS 7: Klub Niezdiagnozowani (dożywotnio dla founding 50)"
              price="1 290 zł"
            />
          </ul>
          <div className="flex items-center justify-between pt-4 text-lg">
            <span className="font-semibold text-gray-900">ŁĄCZNA WARTOŚĆ</span>
            <span className="font-bold text-gray-900">6 320 zł</span>
          </div>

          <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-10 text-center">
            <p className="text-gray-500 mb-3">Ale dziś nie musisz płacić tej sumy.</p>
            <p className="text-2xl text-gray-400 line-through mb-2">6 320 zł</p>
            <p className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6">997 zł</p>
            <CTAButton>Zabierz wszystko po specjalnej cenie</CTAButton>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 space-y-6">
          <H2>Gwarancja Bezterminowa Bez Pytań</H2>
          <P>Biorę całe ryzyko na siebie.</P>
          <P>
            Wiem, jak to bywa. Czytasz opis, myślisz: &bdquo;Wygląda nieźle... ale co jeśli
            nie zadziała dla mnie?&rdquo;, &bdquo;A jeśli zapłacę i okaże się to kolejnym
            infoproduktem-śmieciem?&rdquo;
          </P>
          <P>
            Doskonale cię rozumiem. Dlatego znoszę całe ryzyko i biorę całą odpowiedzialność
            na siebie.
          </P>
          <H3>3 obietnice w jednej:</H3>
          <div className="space-y-5">
            <P>
              <strong className="text-gray-900">1. Bezterminowa.</strong> Nie ma 30 dni, 90
              dni, 365 dni. Możesz zwrócić rok, pięć lat, kiedykolwiek.
            </P>
            <P>
              <strong className="text-gray-900">2. Bezwarunkowa.</strong> Nie musisz nic
              udowodnić, niczego ukończyć, niczego rozpisywać.
            </P>
            <P>
              <strong className="text-gray-900">3. Każda złotówka.</strong> Wpłaciłeś 997
              zł, dostajesz z powrotem 997 zł. Bez &bdquo;opłat manipulacyjnych&rdquo;.
            </P>
          </div>
          <P>
            Jeśli w dowolnym momencie zechcesz zrobić zwrot, po prostu napisz 1 zdanie na{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-gray-900 underline underline-offset-4 hover:opacity-70"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            i dostaniesz 100% pieniędzy z powrotem bez pytań.
          </P>
          <P>Albo dostajesz potężny Sprint, albo nie płacisz złotówki.</P>
        </div>
      </section>

      {/* URGENCY */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 space-y-6">
          <H2>Uwaga: ograniczona oferta</H2>
          <P>Zostało tylko 50 founding member miejsc.</P>
          <P>
            Jeśli czytasz to teraz, masz jeszcze szansę zabrać wszystko za{" "}
            <strong className="text-gray-900">997 zł</strong>, z dożywotnim dostępem do
            Klubu Niezdiagnozowani i gwarancją niepodnoszenia ceny przy wersji v2.0.
          </P>
          <P>Ale po wyczerpaniu 50 miejsc oferta wygaśnie:</P>
          <ul className="space-y-2 pl-1">
            {[
              "Cena rośnie z 997 zł do 1 497 zł",
              "Klub Niezdiagnozowani zostaje, ale tylko jako 12-miesięczny dostęp",
              "Gwarancja niepodnoszenia ceny v2.0 znika",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-gray-700">
                <span className="text-gray-400 select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <P>Lepiej nie odkładaj.</P>
        </div>
      </section>

      {/* P.S. */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 space-y-6">
          <H3>P.S.</H3>
          <P>Po opłacie 997 zł dostajesz:</P>
          <ul className="space-y-2 pl-1">
            {[
              "Protokół 30 Dni: Start, Mid-Lock, Finisz",
              "BONUS 1: ADHD Daily Frame",
              "BONUS 2: Twój Zegar w 24h",
              "BONUS 3: Dopamine Steering",
              "BONUS 4: Shame-Loop Interrupt",
              "BONUS 5: Backlog Burner",
              "BONUS 6: Trzecia Droga",
              "BONUS 7: Klub Niezdiagnozowani (dożywotnio dla founding 50)",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-gray-700">
                <span className="text-gray-400 select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <P>
            <strong className="text-gray-900">P.P.S.</strong> Jesteś chroniony Gwarancją
            Bezterminową Bez Pytań. Zwrot kiedykolwiek, bez warunków, bez pytań, każda
            złotówka.
          </P>
          <P>
            <strong className="text-gray-900">P.P.P.S.</strong> Zostało tylko 50 founding
            miejsc. Po wyczerpaniu miejsc cena rośnie do 1 497 zł, Klub staje się 12-mies.
            dostępem, gwarancja niepodnoszenia ceny v2.0 znika.
          </P>
        </div>
      </section>

      {/* ORDER */}
      <section id="zamow" className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Zamów Sprint 30 Dni
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Gotów żeby skończyć to co zaczynasz?
          </h2>
          <p className="text-xl sm:text-2xl text-gray-400 line-through mb-1">6 320 zł</p>
          <p className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-8">997 zł</p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Sprint%2030%20Dni%20%E2%80%94%20Zam%C3%B3wienie&body=Cze%C5%9B%C4%87%2C%20chc%C4%99%20zam%C3%B3wi%C4%87%20Sprint%2030%20Dni%20za%20997%20z%C5%82.`}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-gray-900 px-6 sm:px-10 py-4 sm:py-5 text-sm sm:text-lg font-bold text-white no-underline transition-all hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg break-all"
          >
            Napisz: {CONTACT_EMAIL}
          </a>
          <p className="mt-8 text-sm text-gray-500">
            Po opłacie natychmiast dostajesz dostęp na maila. Gwarancja Bezterminowa Bez
            Pytań.
          </p>
        </div>
      </section>
    </article>
  )
}
