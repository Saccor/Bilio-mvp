# 🚗 Bilio MVP - Fordonsanalys & Jämförelse

**Professional Vehicle Analysis Platform for the Swedish Market**

A comprehensive Next.js application that provides detailed vehicle analysis, comparison, and market insights using real-time data from the Car.info API. Perfect for car dealers, buyers, and automotive professionals who need deep vehicle intelligence.

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Car.info API](https://img.shields.io/badge/Car.info-API%20Integration-green?style=flat-square)

## 🎯 **What is Bilio MVP?**

Bilio MVP is a cutting-edge vehicle analysis platform that transforms basic vehicle registration numbers into comprehensive automotive intelligence reports. Built for the Swedish market, it provides everything from basic vehicle information to detailed technical specifications, safety ratings, market analysis, and predictive insights.

## ✨ **Key Features**

### **📊 Comprehensive Vehicle Analysis**
- **Complete Vehicle Reports**: Transform registration numbers into detailed vehicle profiles
- **Real-time Car.info Integration**: Access to extensive automotive database
- **5-Tab Analysis System**: Organized insights across multiple categories
- **Professional Swedish Interface**: Tailored for the Swedish automotive market

### **🔄 Advanced Comparison Tools**
- **Multi-Vehicle Comparison**: Compare multiple vehicles side-by-side
- **Smart Comparison Table**: Key metrics at a glance
- **Dynamic Vehicle Management**: Add/remove vehicles on the fly
- **Visual Comparison**: Easy-to-understand comparison interface

### **📋 Detailed Information Categories**

#### **Grundinformation (Basic Information)**
- Märke, modell, variant
- Första registrering, färg
- Bilhandlare information
- Senaste besiktning

#### **Motor & Prestanda (Engine & Performance)**
- Bränsletyp, motoreffekt
- CO2-utsläpp, bränsleförbrukning
- Motorvolym, växellåda
- Teknisk motordata

#### **Teknisk Data (Technical Specifications)**
- Fordons dimensioner (längd, bredd, höjd)
- Axelavstånd, spårvidd
- Markfrigång, luftmotstånd
- Vikter och kapaciteter

#### **Ekonomi (Financial Analysis)**
- Prisanalys och marknadsvärdering
- Driftkostnader (skatt, försäkring, underhåll)
- Marknadsposition och säljbarhet
- Årlig värdeminskning

#### **Historik (Vehicle History)**
- Importerad, taxi, hyrbil status
- Skadehistorik
- Euro NCAP säkerhetsbetyg
- Säkerhetsspecifikationer

#### **Framtid (Future Insights)**
- Värdeprognos (1, 3, 5 år)
- Kända problem vid aktuell mätarställning
- Underhållsrekommendationer
- Age-specific maintenance advice

## 🛠 **Tech Stack**

### **Frontend**
- **Next.js 15.3.5** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern utility-first styling
- **React 18** - Latest React features and hooks

### **Backend & API**
- **Next.js API Routes** - Serverless API endpoints
- **Axios** - HTTP client for API integration
- **Car.info API** - Comprehensive vehicle database

### **Development Tools**
- **ESLint** - Code linting and quality
- **Turbopack** - Ultra-fast bundling
- **TypeScript Strict Mode** - Enhanced type safety

## 🏗 **Project Architecture**

This project follows modern React/Next.js best practices with a clean, modular architecture:

```
src/
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── api/
│       └── vehicle/
│           └── route.ts      # Vehicle API endpoint
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── StatusBadge.tsx   # Color-coded status indicators
│   │   ├── StatusCard.tsx    # Boolean status with visual indicator
│   │   ├── InfoSection.tsx   # Styled section with title
│   │   ├── InfoRow.tsx       # Key-value pair display
│   │   └── ComparisonRow.tsx # Table row for vehicle comparison
│   ├── tabs/                 # Specialized tab components
│   │   ├── OverviewTab.tsx   # Basic vehicle information
│   │   ├── TechnicalTab.tsx  # Technical specifications
│   │   ├── FinancialTab.tsx  # Pricing and cost analysis
│   │   ├── HistoryTab.tsx    # Vehicle history and safety
│   │   └── FutureTab.tsx     # Future value predictions
│   ├── VehicleOverviewCard.tsx # Vehicle summary card
│   ├── DetailedAnalysis.tsx    # Tabbed analysis interface
│   └── ComparisonTable.tsx     # Side-by-side comparison
├── types/
│   └── vehicle.ts            # TypeScript interfaces
├── utils/
│   └── vehicle-helpers.ts    # Utility functions
└── public/                   # Static assets
```

### **Architecture Benefits**

- **🔧 Modularity**: Each component has a single responsibility
- **♻️ Reusability**: UI components can be used throughout the app
- **🧪 Testability**: Components can be tested in isolation
- **📈 Scalability**: Easy to add new features without affecting existing code
- **👥 Team Collaboration**: Multiple developers can work on different components

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18.0 or higher
- npm or yarn package manager
- Car.info API access (demo available)

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd bilio-mvp-temp
```

2. **Install dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Open Application**
Navigate to `http://localhost:3000` in your browser (or the port shown in terminal).

## 📖 **Usage Guide**

### **Basic Vehicle Lookup**
1. Enter one or more Swedish registration numbers (e.g., `VVV999`)
2. Click "Sök fordon" to fetch vehicle data
3. View summary cards for each vehicle
4. Click on any vehicle card for detailed analysis

### **Detailed Analysis**
- **Översikt**: Basic information and pricing
- **Teknisk data**: Technical specifications and dimensions
- **Ekonomi**: Financial analysis and operating costs
- **Historik**: Vehicle history and safety ratings
- **Framtid**: Future value and maintenance insights

### **Vehicle Comparison**
1. Add multiple vehicles using "+ Lägg till jämförelse"
2. Enter registration numbers for each vehicle
3. View side-by-side comparison in the comparison table
4. Remove vehicles with "Ta bort" button if needed

## 🔌 **API Integration**

### **Car.info API**
The platform integrates with the Car.info API for comprehensive vehicle data:

- **Demo Endpoint**: `https://api.car.info/v2/app/demo/license-plate/S/{registration}`
- **Real Data Extraction**: Extracts real vehicle specifications from API
- **Comprehensive Attributes**: 100+ vehicle specifications
- **Swedish Market Focus**: Optimized for Swedish registration numbers

### **Data Processing**
- **Smart Attribute Parsing**: Extracts relevant data from extensive API response
- **Type-Safe Integration**: Full TypeScript support for API responses
- **Intelligent Fallbacks**: Graceful handling of missing data
- **Error Handling**: User-friendly error messages

## 📊 **Data Coverage**

### **Real Data from Car.info API**
- ✅ Vehicle identification (brand, model, variant)
- ✅ Engine specifications (power, type, fuel)
- ✅ Technical attributes and year information
- ✅ Registration and basic vehicle data

### **Enhanced Mock Data for Demo**
- 🎭 Market pricing and valuations
- 🎭 Operating costs (tax, insurance, maintenance)
- 🎭 Future value predictions
- 🎭 Market position analysis
- 🎭 Technical specifications and dimensions
- 🎭 Safety ratings and vehicle history

## 🧪 **Development**

### **Available Scripts**
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run type-check  # Check TypeScript types
```

### **Adding New Components**
1. Create component in appropriate directory (`ui/`, `tabs/`, or root `components/`)
2. Export from component file
3. Import where needed
4. Follow existing TypeScript patterns

### **Code Style**
- Use TypeScript for all components
- Follow existing naming conventions
- Implement proper prop interfaces
- Use Tailwind CSS for styling
- Include proper error handling

## 🔮 **Future Enhancements**

### **Planned Features**
- **Full Car.info API Integration**: Real pricing and market data
- **Advanced Analytics**: Market trends and insights
- **PDF Report Generation**: Exportable vehicle reports
- **User Authentication**: Personal vehicle collections
- **Mobile Responsiveness**: Enhanced mobile experience
- **API Expansion**: Integration with additional data sources

### **Technical Improvements**
- **Unit Testing**: Jest and React Testing Library
- **Storybook**: Component documentation
- **Error Boundaries**: Better error handling
- **Performance Optimization**: Code splitting and lazy loading
- **PWA Features**: Offline functionality

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

For support, questions, or feature requests, please:
- Create an issue in the repository
- Contact the development team
- Check the documentation in `/docs`

---

**Built with ❤️ for the Swedish automotive market**
