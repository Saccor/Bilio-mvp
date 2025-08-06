# 🚗 Bilio - Svenska Bilanalysplattformen

**Professionell bilanalys och jämförelse för den svenska marknaden**

En komplett Next.js-applikation med kreditsystem, OAuth-autentisering och detaljerad bilanalys via registreringsnummer. Perfekt för bilhandlare, köpare och bilföretag som behöver djup fordonsintelligens.

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-2.52.0-3ECF8E?style=flat-square&logo=supabase)
![Swedish](https://img.shields.io/badge/Language-Swedish-yellow?style=flat-square)

## 🎯 **Vad är Bilio?**

Bilio är Sveriges ledande plattform för bilanalys och jämförelse med ett komplett kreditsystem och OAuth-autentisering. Med bara ett registreringsnummer får du omfattande fordonsrapporter, kostnadskalkyler och marknadsanalys. Plattformen är byggd specifikt för den svenska marknaden med professionell svensk design och användargränssnitt.

## ✨ **Huvudfunktioner**

### **🔐 Autentisering & Användarsystem**
- **Google OAuth-inloggning** via Supabase
- **Automatiska användarprofiler** med kreditsaldo
- **Säker session-hantering** med cookies
- **Row Level Security (RLS)** för all data
- **Användardashboard** med tidigare analyser och kredithistorik
- **Mobilvänlig navigation** med förbättrad hamburger-meny och flat dropdown-struktur
- **Responsiv användarupplevelse** utan nested dropdowns eller överlappande element

### **💳 Kreditsystem (MVP)**
- **Nytt kreditsystem**: Varje registreringsnummer-slagning kostar 1 kredit (även tidigare körda)
- **Gratis åtkomst**: Tidigare analyser kan ses gratis via dashboard/konto
- **Real-time uppdateringar**: Kreditsaldo uppdateras omedelbart efter användning
- **Flexibla kreditpaket**: Från enstaka rapporter till bulk-köp
- **Atomiska transaktioner** för säker kredithantering
- **Detaljerad transaktionshistorik** för alla köp och användning
- **Demo-funktion** för testning utan betalning
- **Session-baserat system** för att särskilja nya sökningar från dashboard-åtkomst

### **📊 Omfattande fordonsanalys med riktiga API-data**
- **Komplett fordonsrapport**: Förvandla registreringsnummer till detaljerade fordonsprofiler
- **Real API-integration**: Car.info API för verklig fordonsdata
- **11-kategori Bilhälsometer**: CEO:s exakta viktade poängsystem (A-E betyg)
  - Pris mot marknaden (12%), Fordonsstatus (11%), Körda mil (11%)
  - Antal ägare (9%), Nybilsgaranti (6%), Värdetapp 5 år (11%)
  - Säkerhet Euro-NCAP (11%), Utrustning (11%), Servicebok (7%)
  - Skadehistorik (7%), Kända problem (4%)
- **Prisanalys**: Jämför marknadsvärde med aktuella priser
- **Jämförelseläge**: Parallell analys av två fordon
- **Smart dataåteranvändning**: För demo-ändamål när samma bil jämförs

### **🚗 Detaljerade fordonssektioner med API/MOCK-märkning**
- **Fordonsstatus**: Teknisk status och kritiska flaggor (MOCK)
- **Ägarhistorik & Garanti**: Komplett ägarhistorik och garantiinformation (MOCK)
- **Prisutveckling**: Interaktiv linjediagram med 18 månaders pristrend (MOCK)
- **Säkerhetsanalys**: Euro NCAP-betyg och säkerhetsutrustning (MOCK)
- **Skade- & Servicehistorik**: Detaljerad timeline för underhåll och skador (MOCK)
- **Säljaresinformation**: Återförsäljarbedömning och kontaktuppgifter (MOCK)
- **Tekniska specifikationer**: Motor, prestanda och dimensioner (API + MOCK)
- **Bilhälsometer**: Viktad poängberäkning med real miltal-data (API + MOCK)

### **💰 Interaktiv kostnadskalkylator**
- **Realtidsberäkningar**: Orange sliders för körsträcka (1,000-10,000 km) och tid (1-10 år)
- **Automatiska uppdateringar**: Totalkostnad, kostnad per km och kostnad per dag
- **Detaljerad kostnadsfördelning**:
  - 🔴 Värdeminskning: Beräknat baserat på modell
  - ⛽ Bränsle: Variabel beräkning från real förbrukning
  - 🛡️ Försäkring: Fast månadskostnad
  - 🔧 Service & reparationer: Uppskattade årskostnader

## 📄 **Sidor & Funktionalitet**

### **Hem (/) - Huvudsidan**
- **Hero-sektion** med sökformulär för 1-2 registreringsnummer
- **Funktionskort** som visar alla tjänster
- **Moderniserat tema**: Clean, minimalistisk design
- **"Vad ingår?"-sektion** med alla funktioner listade
- **Perfekt responsiv design** med optimerad mobil funktions-tabell och spacing
- **Touch-optimerad** för mobile-first användarupplevelse

### **Resultat (/results) - Huvudanalyssidan**
- **Kreditsystem-integration** med uppgraderingsbanderoll
- **Dynamisk layout**: Enstaka eller jämförelse-vy
- **Låsta sektioner** som kräver 1 kredit för upplåsning
- **Alla komponenter** stöder både enstaka och jämförelseläge
- **Real-time API-data** kombinerat med simulerad data
- **Smart felhantering**: Graceful fallback för API-begränsningar
- **Session-ID tracking**: Särskiljer nya sökningar från dashboard-åtkomst

### **Dashboard (/dashboard) - Användarprofil**
- **Användaröverstikt**: Profil med email och inloggningsstatus
- **Kreditsaldo**: Aktuellt saldo och total köpt
- **Snabbåtgärder**: Köp krediter och ny analys
- **Tidigare analyser**: Klickbara länkar till alla tidigare rapporter
- **Kredithistorik**: Komplett transaktionshistorik
- **Supabase-integration**: Real data från databas

### **Om Bilio (/om-bilio)**
- **Mörkgradient hero** med statistik (10,000+ jämförelser)
- **"Så fungerar Bilio"**: 3-stegs process med ikoner
- **"Varför Bilio?"**: 4 funktionskort på orange bakgrund
- **Interaktiv FAQ**: 7 vikbara frågor med HTML details/summary
- **Mobil-responsiv**: Optimerad för alla skärmstorlekar

### **Krediter (/credits/purchase)**
- **Kreditpaket-val** med 4 olika nivåer
- **Demo-köp** utan betalning för testning
- **Realtids saldo-visning** med CreditBalance-komponent
- **Mockup-kassa** för MVP-demonstration

### **Autentisering**
- **/login**: Google OAuth-inloggning med felhantering
- **/auth/callback**: OAuth callback-hantering
- **/debug-oauth**: Debug-verktyg för OAuth-konfiguration

## 🛠 **Teknisk Stack**

### **Frontend**
- **Next.js 15.3.5** - React-ramverk med App Router
- **TypeScript** - Typsäker utveckling
- **Tailwind CSS v4** - Modern utility-first styling
- **React 19** - Senaste React-funktioner
- **Recharts** - Interaktiva diagram och visualiseringar
- **Lucide React** - Moderna ikoner

### **Backend & Databas**
- **Supabase** - Backend-as-a-Service med PostgreSQL
- **Row Level Security (RLS)** - Säker dataåtkomst
- **Google OAuth** - Autentisering via Supabase Auth
- **PostgreSQL Functions** - Atomiska kreditoperationer
- **Real-time subscriptions** - Live datauppdateringar

### **API & Externa Tjänster**
- **Car.info Demo API** - Real fordonsdata via proxy
- **Next.js API Routes** - Serverlösa API-endpoints
- **CORS-hantering** - Via Next.js API-proxy för säker dataåtkomst
- **Graceful API fallbacks** - Smart hantering av API-begränsningar

## 🏗 **Projektarkitektur**

```
src/
├── app/
│   ├── page.tsx                     # Svensk startsida med sökformulär
│   ├── layout.tsx                   # Root layout med Header/Footer
│   ├── globals.css                  # Globala stilar
│   ├── dashboard/page.tsx           # Användardashboard med analyser
│   ├── om-bilio/page.tsx           # Om Bilio-sida
│   ├── results/page.tsx            # Resultatsida med alla komponenter
│   ├── login/page.tsx              # Google OAuth-inloggning
│   ├── debug-oauth/page.tsx        # OAuth debug-verktyg
│   ├── credits/purchase/page.tsx   # Kreditköp-sida
│   ├── auth/callback/route.ts      # OAuth callback-hantering
│   └── api/
│       ├── vehicle/route.ts        # Vehicle API endpoint (proxy)
│       ├── credits/
│       │   ├── add-demo/route.ts   # Demo-kreditering
│       │   ├── balance/route.ts    # Saldo-hämtning
│       │   ├── packages/route.ts   # Kreditpaket
│       │   ├── transactions/route.ts # Transaktionshistorik
│       │   └── use/route.ts        # Kreditanvändning
│       └── reports/
│           ├── check-access/[regNr]/route.ts # Åtkomstkontroll med sessionId
│           └── unlock/route.ts     # Rapportupplåsning med comparison_registration
├── components/
│   ├── Header.tsx                  # Responsiv navigation med förbättrad mobil hamburger-meny
│   ├── Footer.tsx                  # Global sidfot utan Priser/Kontakt
│   ├── UserButton.tsx              # Desktop dropdown-meny med Mina sidor/Logga ut
│   ├── CreditBalance.tsx           # Kreditsaldo med real-time uppdateringar
│   ├── CreditPackages.tsx          # Kreditpaket-val
│   ├── LockedSection.tsx           # Låst innehåll med upplåsning
│   ├── VehicleCard.tsx             # Fordonsöversikt med API-märkning
│   ├── HealthMeter.tsx             # 11-kategori viktad bilhälsometer
│   ├── VehicleStatus.tsx           # Teknisk fordonsstatus med MOCK-märkning
│   ├── OwnerHistory.tsx            # Ägarhistorik & garanti med MOCK-märkning
│   ├── PriceDevelopment.tsx        # Prisutveckling med MOCK-märkning
│   ├── SafetyAnalysis.tsx          # Säkerhetsanalys med MOCK-märkning
│   ├── VehicleSpecifications.tsx   # Tekniska specifikationer med API+MOCK-märkning
│   ├── DamageAndService.tsx        # Skade- & servicehistorik med MOCK-märkning
│   ├── PriceAnalysis.tsx           # Prisanalys med MOCK-märkning
│   ├── CostCalculator.tsx          # Kostnadskalkylator med MOCK-märkning
│   └── SellerInformation.tsx       # Återförsäljareinfo med MOCK-märkning
├── lib/
│   └── supabaseClient.ts           # Supabase klient-konfiguration
├── contexts/
│   └── UnlockContext.tsx           # Upplåsningslogik med real-time credit updates
├── services/
│   └── vehicle-service.ts          # Fordonstjänst med API-orchestration
├── types/
│   └── vehicle.ts                  # TypeScript-gränssnitt
├── utils/
│   ├── vehicle-transformers.ts     # API-transformering och mock-data
│   └── health-calculator.ts        # CEO:s exakta 11-kategori poängsystem
└── config/
    └── data-sources.ts             # Datakällkonfiguration
```

## 🗄️ **Databasschema (Supabase)**

### **Tabeller**
- **profiles** - Användarprofiler med kreditsaldo
- **credit_packages** - Tillgängliga kreditpaket
- **credit_transactions** - All kreditaktivitet
- **payments** - Betalningshistorik (framtida)
- **vehicle_reports** - Sparade fordonsrapporter med comparison_registration och sessionId

### **PostgreSQL Functions**
- **add_credits()** - Lägg till krediter atomiskt
- **use_credits()** - Använd krediter med validering
- **handle_new_user()** - Automatisk profilskapande

### **Row Level Security (RLS)**
Alla tabeller har RLS aktiverat där användare endast kan se sin egen data.

## 🚀 **Komma igång**

### **Förutsättningar**
- Node.js 18.0 eller högre
- npm eller yarn pakethanterare
- Supabase-konto för databas och autentisering

### **Installation**

1. **Klona repositoriet**
```bash
git clone <repository-url>
cd bilio-mvp-temp
```

2. **Installera beroenden**
```bash
npm install
```

3. **Konfigurera miljövariabler**
Skapa `.env.local` med:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Konfigurera Supabase**
- Kör SQL-skripten i Supabase SQL Editor:
  - `SUPABASE_SETUP.sql` (grundläggande schema)
  - `SUPABASE_UPDATED_SETUP.sql` (uppdateringar)
  - `MIGRATION_ADD_COMPARISON_FIELD.sql` (jämförelse-stöd)
- Konfigurera Google OAuth i Supabase Dashboard

5. **Starta utvecklingsserver**
```bash
npm run dev
```

6. **Öppna applikationen**
Navigera till `http://localhost:3000` i din webbläsare.

## 📖 **Användarguide**

### **Autentisering**
1. Klicka användarikonen i headern (dropdown-meny)
2. Välj "Logga in med Google" om ej inloggad
3. Användarprofil skapas automatiskt med 0 krediter

### **Köpa krediter**
1. Gå till "Köp krediter" från användarmeny eller banderoll
2. Välj kreditpaket (1-10 analyser)
3. Klicka "Lägg till krediter (Mockup)" för demo

### **Analysera fordon (MVP-systemet)**
1. Ange svenskt registreringsnummer (ex. `VVV999`) på startsidan
2. Valfritt: Lägg till andra bil för jämförelse
3. Klicka "Analysera" - kostar 1 kredit även för tidigare körda bilar
4. Se förhandsgranskning med API/MOCK-märkta sektioner
5. Klicka "Lås upp för en kredit" för full åtkomst
6. Kreditsaldo uppdateras omedelbart

### **Åtkomst till tidigare analyser**
1. Gå till "Mina sidor" från användarmenyn
2. Klicka på tidigare analyser för gratis åtkomst
3. Alla tidigare låsta sektioner är tillgängliga utan extra kostnad

### **Jämföra fordon**
- Ange två registreringsnummer för sida-vid-sida-jämförelse
- Alla komponenter visas parallellt med smart dataåteranvändning
- Kostar 1 kredit för upplåsning av full jämförelse

## 🎨 **Design & UX**

### **Färgschema**
- **Primär**: Orange (#f97316) för logotyp och accenter
- **Sekundär**: Grå toner för neutral navigation och text
- **Säkerhet**: Grön för positiva värden, röd för varningar
- **Bakgrund**: Moderna gradients och vita kort-design

### **Moderniserat tema**
- **Clean minimalistisk design** genomgående
- **Konsekvent shadow-sm** och border-styling
- **Förbättrade kontraster** för bättre läsbarhet
- **Mobilvänlig** responsive design

### **Svenskt fokus**
- **Helt svenskt gränssnitt** med naturlig terminologi
- **Svenska registreringsnummer** som huvudinput
- **Lokala marknadsdata** och priser i SEK
- **Svensk typografi** och designprinciper

### **Responsiv design**
- **Mobile-first** approach för alla komponenter
- **Perfekt mobilnavigation** med fast hamburger-meny och förbättrad dropdown-hantering
- **iPhone X-optimering** med säkra zoner och korrekt viewport-hantering
- **Touch-friendly** interface med 44px minimiknappstorlekar
- **Overflow-säkerhet** - inga horisontella rulllistor eller element utanför skärmen
- **Tablet-optimering** för mellanstorleksenheter
- **Desktop-enhancement** för större skärmar
- **Konsekvent spacing** med Tailwind CSS-klasser

## 🔌 **API-integration & Datakällor**

### **Car.info Demo API (Real data)**
- **Tekniska specifikationer**: Motor, växellåda, bränsle, CO₂
- **Säkerhetsutrustning**: Airbags, ABS, BLIS, assistanssystem
- **Utrustningslista**: Detaljerad lista över fordonsutrustning
- **Grundläggande info**: Märke, modell, årsmodell, färg
- **Miltal-data**: Real körda mil för hälsometerberäkningar

### **Mock Data (Simulerade värden)**
- **Prisanalys**: Marknadspriser och värdering
- **Ägarhistorik**: Antal ägare och ägarbyten
- **Skadehistorik**: Registrerade skador och service
- **Kostnadskalkyler**: Värdeminskning, försäkring, service
- **10 av 11 hälsometerkategorier**: Viktade poängberäkningar

### **Smart API-hantering**
- **Graceful fallbacks**: 500-fel behandlas som demo API-begränsningar
- **Dataåteranvändning**: Samma bil i jämförelse använder samma data
- **Felhantering**: Tydliga meddelanden om API-begränsningar

### **Framtida API-integrationer**
- **Bilregister**: Real ägarhistorik och fordonsstatus
- **Försäkringsdata**: Skadehistorik och gruppklassificeringar
- **Marknadsdata**: Real priser och värderingstrender
- **Servicehistorik**: Verklig service och reparationsdata

## 📊 **Kreditsystem & Prissättning (MVP)**

### **Kreditpaket**
1. **1 Analys** - 1 kredit (149 kr)
2. **3 Analyser** - 3 krediter (399 kr, spara 50 kr)
3. **5 Analyser** - 5 krediter (599 kr, spara 150 kr)
4. **10 Analyser** - 10 krediter (999 kr, spara 500 kr)

### **Användning (MVP-systemet)**
- **Varje ny sökning**: 1 kredit oavsett om regnr körts tidigare
- **Dashboard-åtkomst**: Gratis för tidigare låsta rapporter
- **Alla sektioner**: Låses upp samtidigt per rapport
- **Real-time uppdateringar**: Kreditsaldo uppdateras omedelbart

### **Demo-funktionalitet**
- **Kostnadsfri förhandsgranskning** av alla funktioner
- **Mockup-kreditering** för testning utan betalning
- **Tydlig API/MOCK-märkning** av datakällor

## 🧪 **Utveckling**

### **Tillgängliga skript**
```bash
npm run dev         # Starta utvecklingsserver med Turbopack
npm run build       # Bygg för produktion
npm run start       # Starta produktionsserver
npm run lint        # Kör ESLint
```

### **Kodstil & Arkitektur**
- **TypeScript** för alla komponenter med strikt typning
- **Svenska kommentarer** för lokal utveckling
- **Tailwind CSS** för konsekvent styling
- **Modulär komponentarkitektur** för skalbarhet
- **Service Layer Pattern** för API-orchestration
- **Context API** för global state (UnlockContext)
- **Event-driven credit updates** för real-time UX

### **Dataflöde**
1. **API Layer**: Next.js API routes för CORS-hantering
2. **Service Layer**: vehicle-service.ts för dataorkestrering  
3. **Transform Layer**: vehicle-transformers.ts för API-datakonvertering
4. **Component Layer**: React-komponenter med TypeScript
5. **Context Layer**: UnlockContext för rapportlåsning och credit tracking
6. **Database Layer**: Supabase med RLS för säker datahantering

### **Nyckelfunktioner för utvecklare**
- **Session-ID tracking**: Särskiljer nya sökningar från dashboard-åtkomst
- **Smart error handling**: Graceful degradation för API-fel
- **Real-time credit updates**: Event-driven UI-uppdateringar
- **Responsive design system**: Konsekvent mobilvänlig UX
- **API/MOCK separation**: Tydlig markering av datakällor

## 🔮 **Framtida förbättringar**

### **Planerade funktioner**
- **Real betalningssystem** med Stripe/Klarna integration
- **PDF-rapportgenerering** för exporterbara fordonsrapporter
- **Mobilapp** för iOS och Android
- **AI-driven rekommendationer** för fordonsköp
- **Avancerad analytics** för marknadstrender
- **Real-time marknadsdata** för priser och värdering

### **Tekniska förbättringar**
- **Enhetstestning** med Jest och React Testing Library
- **E2E-testning** med Playwright
- **Performance-optimering** med Next.js-optimeringar
- **PWA-funktioner** för offline-funktionalitet
- **Real API-integrationer** ersätter mock-data

### **Säkerhet & Skalning**
- **Rate limiting** för API-endpoints
- **Cachning** för förbättrad prestanda
- **CDN-distribution** för global tillgänglighet
- **Monitoring & observability** med datadog/sentry
- **Backup & disaster recovery** för kritisk data

## 🤝 **Bidrag**

1. Forka repositoriet
2. Skapa en feature-branch (`git checkout -b feature/amazing-feature`)
3. Commita dina ändringar (`git commit -m 'Add amazing feature'`)
4. Pusha till branchen (`git push origin feature/amazing-feature`)
5. Öppna en Pull Request

## 📄 **Licens**

Detta projekt är licensierat under MIT-licensen - se [LICENSE](LICENSE)-filen för detaljer.

## 🆘 **Support & Debug**

### **OAuth-problem**
Använd `/debug-oauth` för att diagnostisera Google OAuth-konfiguration.

### **Kreditsystem-problem**
Kontrollera Supabase-loggar och RLS-policies. Kreditsaldo uppdateras nu real-time.

### **API-problem**
Car.info API-fel loggas i browser console och server-loggar. Smart fallback hanterar demo API-begränsningar.

### **Jämförelse-problem**
Dashboard-jämförelser använder nu sparad comparison_registration. Samma bil i jämförelse återanvänder data smart.

För support, frågor eller funktionsförfrågningar:
- Skapa en issue i repositoriet
- Kontakta utvecklingsteamet
- Kolla dokumentationen i `/docs` mappen

---

**Bilio** - Gör bilköpet transparent och tryggt för alla svenskar 🚗✨

## 📝 **Senaste uppdateringar (Chat History)**

### **📱 Mobilresponsivitet (Senaste)**
- **Fixad hamburger-meny**: Ingen dubbel-klickning krävs längre
- **Flat navigation**: Eliminerat nested dropdowns som hamnade utanför skärmen
- **Viewport-säkerhet**: Alla element stannar inom skärmgränserna
- **Touch-optimering**: 44px minimum touch targets för alla interaktiva element
- **Smart menu-stängning**: Automatisk stängning vid klick på länkar eller utanför
- **Perfekt alignment**: "Jämför", "Om Bilio", "Mina sidor", "Logga ut" i konsekvent layout
- **Overlay-support**: Bakgrundsdimning för bättre användarupplevelse på mobil

### **🎨 Tema & Design**
- **Moderniserat tema**: Clean, minimalistisk design genomgående
- **Mobiloptimering**: iPhone X-responsiv design för alla komponenter
- **Förbättrade kontraster**: Bättre läsbarhet och användarvänlighet
- **Konsekvent styling**: Shadow-sm och border-styling överallt

### **👤 Användarsystem**
- **Användardashboard**: Komplett profil med tidigare analyser och kredithistorik
- **Dropdown-navigation**: UserButton med "Mina sidor" och "Logga ut"
- **Real-time credit updates**: Omedelbar UI-uppdatering vid kreditanvändning
- **Session-based tracking**: Smart åtskillnad mellan nya sökningar och dashboard-åtkomst

### **💳 MVP Kreditsystem**
- **Nytt modell**: Varje regnr-slagning kostar 1 kredit oavsett tidigare användning
- **Gratis dashboard-åtkomst**: Tidigare analyser tillgängliga utan extra kostnad
- **Event-driven updates**: Real-time kreditsaldo-uppdateringar
- **Smart session tracking**: SessionId särskiljer nya sökningar från återbesök

### **🚗 Bilanalys-förbättringar**
- **CEO:s hälsometer**: Exakt 11-kategori viktad poängsystem (A-E betyg)
- **API/MOCK-märkning**: Tydlig markering av datakällor i alla sektioner
- **Smart jämförelse**: Återanvändning av data för samma bil i jämförelser
- **Graceful API-hantering**: Robust felhantering för demo API-begränsningar

### **🔧 Tekniska förbättringar**
- **Mobil UX-optimering**: Flat navigation structure utan nested dropdowns
- **Responsive layout fixes**: Overflow-kontroll och viewport-säkerhet
- **Header arkitektur**: Separata mobil- och desktop-komponenter för optimal UX
- **Next.js 15 kompatibilitet**: Awaited params i dinamiska routes
- **Hydration fixes**: Säker SSR/client-rendering
- **Improved error handling**: Graceful degradation för alla API-fel
- **Database enhancements**: comparison_registration stöd för jämförelser

.