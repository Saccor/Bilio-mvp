# 🚗 Bilio - Svenska Bilanalysplattformen

**Professionell bilanalys och jämförelse för den svenska marknaden**

En komplett Next.js-applikation som erbjuder detaljerad bilanalys, kostnadskalkylering och marknadsinsikter via registreringsnummer. Perfekt för bilhandlare, köpare och bilfirman som behöver djup fordonsintelligens.

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Recharts](https://img.shields.io/badge/Recharts-3.x-22d3ee?style=flat-square&logo=recharts)
![Swedish](https://img.shields.io/badge/Language-Swedish-yellow?style=flat-square)

## 🎯 **Vad är Bilio?**

Bilio är Sveriges ledande plattform för bilanalys och jämförelse. Med bara ett registreringsnummer får du omfattande fordonsrapporter, kostnadskalkyler och marknadsanalys. Plattformen är byggd specifikt för den svenska marknaden med professionell svensk design och användargränssnitt.

## ✨ **Huvudfunktioner**

### **🏠 Startsida**
- **Modern svensk design** med blå och vit logotyp
- **Intuitiv navigation**: Jämför och Om Bilio
- **Hero-sektion**: "Jämför och analysera bilar via registreringsnumret"
- **6 funktionskort**: Översikt över alla tjänster
- **Prismodell**: 149 kr för analys, 199 kr för jämförelse
- **Dubbel registreringsnummerformulär**: Snabb sökning

### **📊 Omfattande fordonsanalys med riktiga API-data**
- **Komplett fordonsrapport**: Förvandla registreringsnummer till detaljerade fordonsprofiler
- **Real API-integration**: Car.info API för verklig fordonsdata
- **Minimalistisk design**: Grå ikoner utan färger för professionell look
- **Bilhälsometer**: Visuell hälsostatus för fordon
- **Prisanalys**: Jämför marknadsvärde med aktuella priser
- **Bildkarusell**: Visuell presentation av fordon

### **🚗 Detaljerade fordonssektioner**
- **Fordonsstatus**: Teknisk status och kritiska flaggor med API-data
- **Ägarhistorik & Garanti**: Komplett ägarhistorik och garantiinformation
- **Prisutveckling**: Interaktiv linjediagram med 18 månaders pristrend
- **Säkerhetsanalys**: Euro NCAP-betyg och säkerhetsutrustning från API
- **Skade- & Servicehistorik**: Detaljerad timeline för underhåll och skador
- **Säljaresinformation**: Återförsäljarbedömning och kontaktuppgifter

### **💰 Interaktiv kostnadskalkylator**
- **Kostnadskalkylätorn**: Två orange sliders för årlig körsträcka (1,000-10,000 km) och tidsperiod (1-10 år)
- **Realtidsberäkningar**: Uppdaterar totalkostnad, kostnad per km och kostnad per dag automatiskt
- **Detaljerad kostnadsfördelning**:
  - 🔴 Värdeminskning: 216,000 kr
  - ⛽ Bränsle: Variabel beräkning
  - 🛡️ Försäkring: Fast månadskostnad
  - 🔧 Service & reparationer: 48,000 kr

### **📋 Detaljerad prisjämförelse**
**"Vad ingår?" sektion** med 14 funktioner:
- Grundläggande fordonsdata (från Car.info API)
- Tekniska specifikationer (motor, växellåda, bränsle)
- Marknadsanalys med interaktiva diagram
- Prishistorik med recharts-visualisering
- Säkerhetsbetyg och utrustning
- Miljöinformation (CO₂, bränsleförbrukning)
- Skadehistorik med timeline
- Serviceinformation och underhåll
- Värdeprognos med marknadsanalys
- Återförsäljningsanalys
- Finansieringsalternativ
- Försäkringsrådgivning
- 24/7 kundtjänst
- Jämförelserapport (endast 199 kr-paketet)

## 📄 **Sidor**

### **Hem (/)**
- Hero-sektion med sökformulär
- Funktionskort för alla tjänster
- Prismodeller och funktionsjämförelse
- Responsiv design för alla enheter

### **Om Bilio (/om-bilio)**
- **Mörkgradient hero** med statistik:
  - 10,000+ jämförelser
  - 1,000+ modeller  
  - 5 sekunders analys
- **"Så fungerar Bilio"**: 3-stegs process med ikoner
- **"Varför Bilio?"**: 4 funktionskort på orange bakgrund
- **Interaktiv FAQ**: 7 vikbara frågor med HTML details/summary

### **Resultat (/results)**
- **Tillbaka-knapp** för smidig navigation
- **Lila uppgraderingsbanderoll** för premiumfunktioner
- **Fordonsöversiktskort** med real API-data och bildkarusell
- **Bilhälsometer** med visuell hälsostatus
- **Prisanalys** med marknadsvärde
- **Fordonsstatus** med teknisk analys från API
- **Ägarhistorik & Garanti** med komplett ägarinformation
- **Prisutveckling** med interaktiv recharts-diagram
- **Säkerhetsanalys** med Euro NCAP och säkerhetsutrustning
- **Skade- & Servicehistorik** med detaljerad timeline
- **Säljaresinformation** med återförsäljarbedömning
- **Interaktiv kostnadskalkylator** med realtidsuppdateringar
- **Expanderbar kostnadsfördelning** med animationer

## 🛠 **Teknisk Stack**

### **Frontend**
- **Next.js 15.3.5** - React-ramverk med App Router
- **TypeScript** - Typsäker utveckling
- **Tailwind CSS v4** - Modern utility-first styling
- **React 19** - Senaste React-funktioner
- **Recharts** - Interaktiva diagram och visualiseringar

### **Komponenter & Arkitektur**
- **Modulär arkitektur** med återanvändbara komponenter
- **Minimalistisk design** med grå ikoner och konsekvent spacing
- **Header.tsx** - Global navigation med smart routing
- **Footer.tsx** - Konsekvent sidfot
- **VehicleCard.tsx** - Fordonsöversikt med real API-data
- **VehicleStatus.tsx** - Teknisk fordonsstatus och kritiska flaggor
- **OwnerHistory.tsx** - Ägarhistorik och garantiinformation
- **PriceDevelopment.tsx** - Prisutveckling med recharts-diagram
- **SafetyAnalysis.tsx** - Säkerhetsanalys med API-integration
- **DamageAndService.tsx** - Skade- och servicehistorik
- **HealthMeter.tsx** - Bilhälsometer med visuell status
- **PriceAnalysis.tsx** - Prisanalys och marknadsjämförelse
- **CostCalculator.tsx** - Interaktiv kostnadskalkylator
- **SellerInformation.tsx** - Återförsäljareinfo
- **Responsiv design** för alla skärmstorlekar

### **Backend & API**
- **Next.js API Routes** - Serverlösa API-endpoints
- **Car.info Demo API** - Real fordonsdata via proxy
- **Vehicle Service** - Integrerad fordonstjänst med flera datakällor
- **TypeScript-typning** - Fullständig typsäkerhet
- **CORS-hantering** - Via Next.js API-proxy för säker dataåtkomst

### **Data & Integration**
- **Real API-data**: Brand, model, tekniska specs, säkerhetsutrustning
- **Mock data**: Priser, ägarhistorik, skador (tydligt markerat)
- **Intelligent transformation**: Maximerar dataextraktion från Car.info API
- **Framtidssäker arkitektur**: Redo för ytterligare API-integrationer

## 🏗 **Projektarkitektur**

```
src/
├── app/
│   ├── page.tsx                    # Svensk startsida
│   ├── layout.tsx                  # Root layout med Header/Footer
│   ├── globals.css                 # Globala stilar
│   ├── om-bilio/
│   │   └── page.tsx               # Om Bilio-sida
│   ├── results/
│   │   └── page.tsx               # Resultatsida med alla komponenter
│   └── api/
│       └── vehicle/
│           └── route.ts           # Vehicle API endpoint (proxy)
├── components/
│   ├── Header.tsx                 # Global navigation
│   ├── Footer.tsx                 # Global sidfot
│   ├── VehicleCard.tsx           # Fordonsöversikt med API-data
│   ├── VehicleStatus.tsx         # Teknisk fordonsstatus
│   ├── OwnerHistory.tsx          # Ägarhistorik & garanti
│   ├── PriceDevelopment.tsx      # Prisutveckling med recharts
│   ├── SafetyAnalysis.tsx        # Säkerhetsanalys med API-data
│   ├── DamageAndService.tsx      # Skade- & servicehistorik
│   ├── HealthMeter.tsx           # Bilhälsometer
│   ├── PriceAnalysis.tsx         # Prisanalys
│   ├── CostCalculator.tsx        # Kostnadskalkylator
│   └── SellerInformation.tsx     # Återförsäljareinfo
├── config/
│   └── data-sources.ts           # Datakällkonfiguration
├── services/
│   └── vehicle-service.ts        # Fordonstjänst med API-orchestration
├── types/
│   └── vehicle.ts                # TypeScript-gränssnitt
└── utils/
    └── vehicle-transformers.ts   # API-transformering och mock-data
```

## 🚀 **Komma igång**

### **Förutsättningar**
- Node.js 18.0 eller högre
- npm eller yarn pakethanterare

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

3. **Starta utvecklingsserver**
```bash
npm run dev
```

4. **Öppna applikationen**
Navigera till `http://localhost:3000` i din webbläsare (eller porten som visas i terminalen).

## 📖 **Användarguide**

### **Grundläggande fordonsökning**
1. Ange svenska registreringsnummer (ex. `VVV999`) på startsidan
2. Klicka "Sök fordon" för att hämta fordonsdata
3. Visa resultat på resultatssidan med detaljerad information från Car.info API

### **Utforska fordonsinformation**
- **Fordonsöversikt**: Real tekniska data och specifications
- **Fordonsstatus**: Teknisk bedömning och kritiska flaggor
- **Säkerhetsanalys**: Euro NCAP-betyg och säkerhetsutrustning
- **Prisutveckling**: Interaktiv diagram med 18 månaders trend
- **Ägarhistorik**: Komplett ägar- och garantiinformation
- **Skadehistorik**: Timeline med service och skador

### **Interaktiv kostnadskalkylator**
1. Använd **årlig körsträcka-slider** (1,000-10,000 km)
2. Ställ in **tidsperiod-slider** (1-10 år)
3. Se realtidsuppdateringar av:
   - Total kostnad
   - Kostnad per km
   - Kostnad per dag
4. Expandera "Kostnadsfördelning" för detaljerad uppdelning

### **Navigation**
- **Hem**: Återgå till startsidan och ny sökning
- **Om Bilio**: Läs mer om plattformen och funktioner
- **Jämför**: Huvudfunktion för fordonsanalys

## 🎨 **Design & UX**

### **Färgschema**
- **Primär**: Orange (#f97316) för logotyp och accenter
- **Sekundär**: Grå för neutral navigation och text
- **Minimalistisk**: Grå ikoner (#6b7280) utan färgbakgrunder
- **Bakgrund**: Gradients och moderna färgtoner
- **Text**: Optimal kontrast för läsbarhet

### **Svenskt fokus**
- **Helt svenskt gränssnitt** med naturlig terminologi
- **Svenska registreringsnummer** som huvudinput
- **Lokala marknadsdata** och priser i SEK
- **Svensk typografi** och designprinciper

### **Responsiv design**
- **Mobile-first** approach
- **Tablet-optimering** för mellanstorleksenheter
- **Desktop-enhancement** för större skärmar
- **Touchvänliga** kontroller och interaktioner
- **Konsekvent spacing** (`mb-8`, `mb-4`, `space-y-4`)

## 🔌 **API-integration**

### **Car.info Demo API**
- **Real fordonsdata** för svenskregistrerade fordon
- **Tekniska specifikationer**: Motor, växellåda, bränsle, CO₂
- **Säkerhetsutrustning**: Airbags, ABS, BLIS, assistanssystem
- **Euro NCAP data**: Säkerhetsbetyg när tillgängligt
- **Utrustning**: Detaljerad lista över fordonsutrustning

### **Vehicle Service**
- **Next.js API-proxy** för CORS-hantering
- **Fullständig TypeScript-stöd** för API-svar
- **Intelligent felhantering** med användarvänliga meddelanden
- **Data transformation**: Maximerar extraktion från Car.info API
- **Mock data integration**: Tydligt markerad mock-data för saknade fält

### **Framtida API-integrationer**
- **Carfax**: Skade- och servicehistorik
- **Bilvision**: Ägarhistorik och återkallelser
- **Bilpriser**: Real marknadspriser och värdering
- **Försäkringsdata**: Gruppklassificeringar och premier

## 📊 **Funktionalitet**

### **Real API-data**
- **20+ fält** från Car.info API: brand, model, motor, säkerhet
- **Intelligent parsing**: Extraherar maximal data från attributes
- **Enhanced mock**: Mock-data använder real data för beräkningar
- **Clear marking**: All mock-data markerad med `/** MOCK DATA */`

### **Kostnadskalkylering**
- **Dynamiska beräkningar** baserade på användarinput
- **Fyra kostnadskategorier**:
  - Värdeminskning (fast beräkning)
  - Bränsle (baserat på körsträcka och real förbrukning)
  - Försäkring (fast månadsbelopp)
  - Service & reparationer (fast årskostnad)

### **Interaktiva element**
- **Recharts-diagram**: Professionella prisdiagram
- **Anpassade CSS-sliders** med orange styling
- **Expanderbara sektioner** med animationer
- **Bildkarusell** för fordonsbilder
- **Hover-effekter** för förbättrad användarupplevelse

### **Jämförelseläge**
- **Sida-vid-sida jämförelse** av två fordon
- **Alla komponenter** stöder jämförelseläge
- **Responsiv grid-layout** för optimal presentation
- **Konsekvent spacing** och design

## 🧪 **Utveckling**

### **Tillgängliga skript**
```bash
npm run dev         # Starta utvecklingsserver
npm run build       # Bygg för produktion
npm run start       # Starta produktionsserver
npm run lint        # Kör ESLint
```

### **Kodstil**
- **TypeScript** för alla komponenter
- **Svenska kommentarer** för lokal utveckling
- **Tailwind CSS** för konsekvent styling
- **Modulär arkitektur** för skalbarhet
- **Minimalistisk design** med grå ikoner

### **Data Architecture**
- **Configuration layer**: Centraliserad API-konfiguration
- **Service layer**: Enhetlig dataorkestrering
- **Transformation layer**: Intelligent API-dataextraktion
- **UI transparency**: Tydlig markering av datakällor

## 🔮 **Framtida förbättringar**

### **Planerade funktioner**
- **Real API-integration**: Carfax, Bilvision, Bilpriser
- **Användarautentisering** för personliga fordonssamlingar
- **PDF-rapportgenerering** för exporterbara fordonsrapporter
- **Avancerad analytics** för marknadstrender
- **Mobil-app** för iOS och Android
- **AI-driven rekommendationer** för fordonsköp

### **Tekniska förbättringar**
- **Enhetstestning** med Jest och React Testing Library
- **E2E-testning** med Playwright
- **Performance-optimering** med Next.js-optimeringar
- **PWA-funktioner** för offline-funktionalitet
- **Real-time updates** för marknadsdata

## 🤝 **Bidrag**

1. Forka repositoriet
2. Skapa en feature-branch (`git checkout -b feature/amazing-feature`)
3. Commita dina ändringar (`git commit -m 'Add amazing feature'`)
4. Pusha till branchen (`git push origin feature/amazing-feature`)
5. Öppna en Pull Request

## 📄 **Licens**

Detta projekt är licensierat under MIT-licensen - se [LICENSE](LICENSE)-filen för detaljer.

## 🆘 **Support**

För support, frågor eller funktionsförfrågningar:
- Skapa en issue i repositoriet
- Kontakta utvecklingsteamet
- Kolla dokumentationen

---


















1. Fordonsstatus – Teknisk Poäng
Parameter	Maxpoäng	Regler
Årsmodell	20	0 = äldre än 10 år, 10 = 5–10 år, 20 = under 5 år
Karosstyp / chassi	10	Standard = 5, premium (SUV/crossover/cabriolet) = 10
Motor & drivlina	20	Miljöklass, hybrid, AWD = högre poäng
Fullt utrustad kylsystem	10	5+ kylvätskor identifierade → full poäng
Antal viktiga komponenter (plattform, ABS, anti-roll)	10	2+ = full poäng, 1 = 5, 0 = 0
Total	70	För teknisk hälsopoäng

1. Ägarhistorik & Garanti – Trust Score
Parameter	Maxpoäng	Regler
Antal ägare	20	1 = 20, 2 = 15, 3 = 10, 4+ = 5
Senaste ägarbytet	10	Inom 1 år = 5, 1–3 år = 10
Typ av ägare	5	Privat = 5, Företag = 3
Aktiv garanti	15	Nybilsgaranti = 15, Förlängd = 10, Ingen = 0
Total	50	

1. Prisanalys – Värderingspoäng
Parameter	Maxpoäng	Regler
Prisavvikelse från marknad	20	±0–5 % = 20, ±6–10 % = 10, >10 % = 0
Prisprognos	10	Stabilt värde = 10, snabb värdeminskning = 0
Historik på prissänkningar	10	Flera sänkningar = lägre förtroende
Total	40	

1. Säkerhetsanalys – Skyddspoäng
Parameter	Maxpoäng	Regler
Euro NCAP (om finns)	20	5/5 = 20, 4/5 = 15, 3/5 = 10, saknas = 5
Airbags (alla typer)	10	Alla zoner (fram, sida, gardin, knä) = 10, vissa = 5
BLIS / ABS / ESP etc	10	2–3 system = 10, 1 = 5, 0 = 0
Total	40	

1. Skade- & Servicehistorik – Underhållspoäng
Parameter	Maxpoäng	Regler
Antal servicar	10	≥2 = 10, 1 = 5, 0 = 0
Kända skador	10	Inga = 10, mindre = 5, stora (framkollision etc) = 0
Regelbundenhet	5	Regelbundna = 5, ojämna = 0
Återkallelser	5	Inga = 5, hanterade = 3, öppna = 0
Total	30	