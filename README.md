# 🚗 Bilio - Svenska Bilanalysplattformen

**Professionell bilanalys och jämförelse för den svenska marknaden**

En komplett Next.js-applikation som erbjuder detaljerad bilanalys, kostnadskalkylering och marknadsinsikter via registreringsnummer. Perfekt för bilhandlare, köpare och bilfirman som behöver djup fordonsintelligens.

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Swedish](https://img.shields.io/badge/Language-Swedish-yellow?style=flat-square)

## 🎯 **Vad är Bilio?**

Bilio är Sveriges ledande plattform för bilanalys och jämförelse. Med bara ett registreringsnummer får du omfattande fordonsrapporter, kostnadskalkyler och marknadsanalys. Plattformen är byggd specifikt för den svenska marknaden med professionell svensk design och användargränssnitt.

## ✨ **Huvudfunktioner**

### **🏠 Startsida**
- **Modern svensk design** med lila Bilio-logotyp
- **Intuitiv navigation**: Jämför och Om Bilio
- **Hero-sektion**: "Jämför och analysera bilar via registreringsnumret"
- **6 funktionskort**: Översikt över alla tjänster
- **Prismodell**: 149 kr för analys, 199 kr för jämförelse
- **Dubbel registreringsnummerformulär**: Snabb sökning

### **📊 Omfattande fordonsanalys**
- **Komplett fordonsrapport**: Förvandla registreringsnummer till detaljerade fordonsprofiler
- **Bilhälsometer**: Visuell hälsostatus för fordon
- **Prisanalys**: Jämför marknadsvärde med aktuella priser
- **Bildkarusell**: Visuell presentation av fordon

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
- Grundläggande fordonsdata
- Tekniska specifikationer  
- Marknadsanalys
- Prishistorik
- Säkerhetsbetyg
- Miljöinformation
- Skadehistorik
- Serviceinformation
- Värdeprognos
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
- **Fordonsöversiktskort** med bildkarusell
- **Bilhälsometer** med visuell hälsostatus
- **Prisanalys** med marknadsvärde
- **Interaktiv kostnadskalkylator** med realtidsuppdateringar
- **Expanderbar kostnadsfördelning** med animationer

## 🛠 **Teknisk Stack**

### **Frontend**
- **Next.js 15.3.5** - React-ramverk med App Router
- **TypeScript** - Typsäker utveckling
- **Tailwind CSS v4** - Modern utility-first styling
- **React 18** - Senaste React-funktioner

### **Komponenter & Arkitektur**
- **Modulär arkitektur** med återanvändbara komponenter
- **Header.tsx** - Global navigation med smart routing
- **Footer.tsx** - Konsekvent sidfot
- **Responsiv design** för alla skärmstorlekar

### **Backend & API**
- **Next.js API Routes** - Serverlösa API-endpoints
- **Vehicle Service** - Integrerad fordonstjänst
- **TypeScript-typning** - Fullständig typsäkerhet

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
│   │   └── page.tsx               # Resultatsida med kalkylator
│   └── api/
│       └── vehicle/
│           └── route.ts           # Vehicle API endpoint
├── components/
│   ├── Header.tsx                 # Global navigation
│   ├── Footer.tsx                 # Global sidfot
│   └── ui/                        # Återanvändbara UI-komponenter
├── config/
│   └── data-sources.ts           # Datakällkonfiguration
├── services/
│   └── vehicle-service.ts        # Fordonstjänst
├── types/
│   └── vehicle.ts                # TypeScript-gränssnitt
└── utils/
    └── vehicle-transformers.ts   # Hjälpfunktioner
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
3. Visa resultat på resultatssidan med detaljerad information

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
- **Primär**: Lila (#6366f1) för logotyp och accenter
- **Sekundär**: Orange för sliders och premiumfunktioner
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

## 🔌 **API-integration**

### **Vehicle Service**
- **Demo-endpoint** för utveckling och test
- **Fullständig TypeScript-stöd** för API-svar
- **Intelligent felhantering** med användarvänliga meddelanden
- **Realtidsdata** för aktuell fordonsinformation

## 📊 **Funktionalitet**

### **Kostnadskalkylering**
- **Dynamiska beräkningar** baserade på användarinput
- **Fyra kostnadskategorier**:
  - Värdeminskning (fast beräkning)
  - Bränsle (baserat på körsträcka)
  - Försäkring (fast månadsbelopp)
  - Service & reparationer (fast årskostnad)

### **Interaktiva element**
- **Anpassade CSS-sliders** med orange styling
- **Expanderbara sektioner** med animationer
- **Bildkarusell** för fordonsbilder
- **Hover-effekter** för förbättrad användarupplevelse

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

## 🔮 **Framtida förbättringar**

### **Planerade funktioner**
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

**Byggt med ❤️ för den svenska bilmarknaden**
