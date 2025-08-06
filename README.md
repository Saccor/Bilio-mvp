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
- **Automatisk användarprofiler** med kreditsaldo
- **Säker session-hantering** med cookies
- **Row Level Security (RLS)** för all data

### **💳 Kreditsystem**
- **Flexibla kreditpaket**: Från enstaka rapporter till bulk-köp
- **Atomiska transaktioner** för säker kredithantering
- **Detaljerad transaktionshistorik** för alla köp och användning
- **Demo-funktion** för testning utan betalning
- **Rapportlåsning** med 1-kredit-systemet

### **📊 Omfattande fordonsanalys med riktiga API-data**
- **Komplett fordonsrapport**: Förvandla registreringsnummer till detaljerade fordonsprofiler
- **Real API-integration**: Car.info API för verklig fordonsdata
- **Bilhälsometer**: Visuell hälsostatus med 10 parametrar (230 poäng max)
- **Prisanalys**: Jämför marknadsvärde med aktuella priser
- **Jämförelseläge**: Parallell analys av två fordon

### **🚗 Detaljerade fordonssektioner**
- **Fordonsstatus**: Teknisk status och kritiska flaggor med API-data
- **Ägarhistorik & Garanti**: Komplett ägarhistorik och garantiinformation
- **Prisutveckling**: Interaktiv linjediagram med 18 månaders pristrend
- **Säkerhetsanalys**: Euro NCAP-betyg och säkerhetsutrustning från API
- **Skade- & Servicehistorik**: Detaljerad timeline för underhåll och skador
- **Säljaresinformation**: Återförsäljarbedömning och kontaktuppgifter
- **Tekniska specifikationer**: Motor, prestanda och dimensioner

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
- **Prismodeller**: 149 kr (analys) / 199 kr (jämförelse)
- **"Vad ingår?"-sektion** med 14 funktioner listade
- **Responsiv design** för alla enheter

### **Resultat (/results) - Huvudanalyssidan**
- **Kreditsystem-integration** med uppgraderingsbanderoll
- **Dynamisk layout**: Enstaka eller jämförelse-vy
- **Låsta sektioner** som kräver 1 kredit för upplåsning
- **Alla komponenter** stöder både enstaka och jämförelseläge
- **Real-time API-data** kombinerat med simulerad data

### **Om Bilio (/om-bilio)**
- **Mörkgradient hero** med statistik (10,000+ jämförelser)
- **"Så fungerar Bilio"**: 3-stegs process med ikoner
- **"Varför Bilio?"**: 4 funktionskort på orange bakgrund
- **Interaktiv FAQ**: 7 vikbara frågor med HTML details/summary

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

## 🏗 **Projektarkitektur**

```
src/
├── app/
│   ├── page.tsx                     # Svensk startsida med sökformulär
│   ├── layout.tsx                   # Root layout med Header/Footer
│   ├── globals.css                  # Globala stilar
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
│           ├── check-access/[regNr]/route.ts # Åtkomstkontroll
│           └── unlock/route.ts     # Rapportupplåsning
├── components/
│   ├── Header.tsx                  # Global navigation med UserButton
│   ├── Footer.tsx                  # Global sidfot
│   ├── UserButton.tsx              # Autentisering & användarmeny
│   ├── CreditBalance.tsx           # Kreditsaldo-visning
│   ├── CreditPackages.tsx          # Kreditpaket-val
│   ├── LockedSection.tsx           # Låst innehåll med upplåsning
│   ├── VehicleCard.tsx             # Fordonsöversikt med API-data
│   ├── HealthMeter.tsx             # Bilhälsometer (10 parametrar)
│   ├── VehicleStatus.tsx           # Teknisk fordonsstatus
│   ├── OwnerHistory.tsx            # Ägarhistorik & garanti
│   ├── PriceDevelopment.tsx        # Prisutveckling med recharts
│   ├── SafetyAnalysis.tsx          # Säkerhetsanalys med API-data
│   ├── VehicleSpecifications.tsx   # Tekniska specifikationer
│   ├── DamageAndService.tsx        # Skade- & servicehistorik
│   ├── PriceAnalysis.tsx           # Prisanalys
│   ├── CostCalculator.tsx          # Kostnadskalkylator
│   └── SellerInformation.tsx       # Återförsäljareinfo
├── lib/
│   └── supabaseClient.ts           # Supabase klient-konfiguration
├── contexts/
│   └── UnlockContext.tsx           # Upplåsningslogik för rapporter
├── services/
│   └── vehicle-service.ts          # Fordonstjänst med API-orchestration
├── types/
│   └── vehicle.ts                  # TypeScript-gränssnitt
├── utils/
│   ├── vehicle-transformers.ts     # API-transformering och mock-data
│   └── health-calculator.ts        # Bilhälsometer-beräkningar
└── config/
    └── data-sources.ts             # Datakällkonfiguration
```

## 🗄️ **Databasschema (Supabase)**

### **Tabeller**
- **profiles** - Användarprofiler med kreditsaldo
- **credit_packages** - Tillgängliga kreditpaket
- **credit_transactions** - All kreditaktivitet
- **payments** - Betalningshistorik (framtida)
- **vehicle_reports** - Sparade fordonsrapporter

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
- Konfigurera Google OAuth i Supabase Dashboard

5. **Starta utvecklingsserver**
```bash
npm run dev
```

6. **Öppna applikationen**
Navigera till `http://localhost:3000` i din webbläsare.

## 📖 **Användarguide**

### **Autentisering**
1. Klicka "Logga in" i headern
2. Välj "Logga in med Google"
3. Användarprofil skapas automatiskt med 0 krediter

### **Köpa krediter**
1. Gå till "Köp krediter" från användarmeny eller banderoll
2. Välj kreditpaket (149-1000 krediter)
3. Klicka "Lägg till krediter (Mockup)" för demo

### **Analysera fordon**
1. Ange svenskt registreringsnummer (ex. `VVV999`) på startsidan
2. Valfritt: Lägg till andra bil för jämförelse
3. Klicka "Ange registreringsnummer för att börja"
4. Se förhandsgranskning med alla komponenter
5. Klicka "Lås upp för en kredit" för full åtkomst

### **Jämföra fordon**
- Ange två registreringsnummer för sida-vid-sida-jämförelse
- Alla komponenter visas parallellt
- Kostar 1 kredit för upplåsning av full jämförelse

## 🎨 **Design & UX**

### **Färgschema**
- **Primär**: Orange (#f97316) för logotyp och accenter
- **Sekundär**: Grå toner för neutral navigation och text
- **Säkerhet**: Grön för positiva värden, röd för varningar
- **Bakgrund**: Moderna gradients och vita kort-design

### **Svenskt fokus**
- **Helt svenskt gränssnitt** med naturlig terminologi
- **Svenska registreringsnummer** som huvudinput
- **Lokala marknadsdata** och priser i SEK
- **Svensk typografi** och designprinciper

### **Responsiv design**
- **Mobile-first** approach för alla komponenter
- **Tablet-optimering** för mellanstorleksenheter
- **Desktop-enhancement** för större skärmar
- **Konsekvent spacing** med Tailwind CSS-klasser

## 🔌 **API-integration & Datakällor**

### **Car.info Demo API (Real data)**
- **Tekniska specifikationer**: Motor, växellåda, bränsle, CO₂
- **Säkerhetsutrustning**: Airbags, ABS, BLIS, assistanssystem
- **Utrustningslista**: Detaljerad lista över fordonsutrustning
- **Grundläggande info**: Märke, modell, årsmodell, färg

### **Mock Data (Simulerade värden)**
- **Prisanalys**: Marknadspriser och värdering
- **Ägarhistorik**: Antal ägare och ägarbyten
- **Skadehistorik**: Registrerade skador och service
- **Kostnadskalkyler**: Värdeminskning, försäkring, service

### **Framtida API-integrationer**
- **Bilregister**: Real ägarhistorik och fordonsstatus
- **Försäkringsdata**: Skadehistorik och gruppklassificeringar
- **Marknadsdata**: Real priser och värderingstrender
- **Servicehistorik**: Verklig service och reparationsdata

## 📊 **Kreditsystem & Prissättning**

### **Kreditpaket**
1. **Bilrapport** - 149 krediter (149 kr)
2. **Jämförelse** - 199 krediter (199 kr)  
3. **Value Pack** - 500 krediter (399 kr)
4. **Premium** - 1000 krediter (749 kr)

### **Användning**
- **Enstaka rapport**: 1 kredit för upplåsning
- **Jämförelse**: 1 kredit för parallell analys
- **Alla sektioner**: Låses upp samtidigt per rapport

### **Demo-funktionalitet**
- **Kostnadsfri förhandsgranskning** av alla funktioner
- **Mockup-kreditering** för testning utan betalning
- **Tydlig markering** av simulerad data vs real data

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

### **Dataflöde**
1. **API Layer**: Next.js API routes för CORS-hantering
2. **Service Layer**: vehicle-service.ts för dataorkestrering  
3. **Transform Layer**: vehicle-transformers.ts för API-datakonvertering
4. **Component Layer**: React-komponenter med TypeScript
5. **Context Layer**: UnlockContext för rapportlåsning

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
Kontrollera Supabase-loggar och RLS-policies.

### **API-problem**
Car.info API-fel loggas i browser console och server-loggar.

För support, frågor eller funktionsförfrågningar:
- Skapa en issue i repositoriet
- Kontakta utvecklingsteamet
- Kolla dokumentationen i `/docs` mappen

---

**Bilio** - Gör bilköpet transparent och tryggt för alla svenskar 🚗✨