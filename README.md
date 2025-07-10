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
- **Multi-Vehicle Comparison**: Compare up to 4 vehicles side-by-side
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

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
# Car.info API Configuration
CAR_INFO_API_KEY=your_car_info_api_key_here
CAR_INFO_BASE_URL=https://api.car.info

# Next.js Configuration
NEXT_PUBLIC_IDENTIFIER=your_identifier_here
NEXT_PUBLIC_KEY=your_api_key_here
```

4. **Start Development Server**
```bash
npm run dev
```

5. **Open Application**
Navigate to `http://localhost:3000` in your browser.

## 📖 **Usage Guide**

### **Basic Vehicle Lookup**
1. Enter one or more Swedish registration numbers (e.g., `VVV999`)
2. Click "Analysera fordon" to fetch vehicle data
3. View summary cards for each vehicle
4. Click on any vehicle card for detailed analysis

### **Detailed Analysis**
- **Översikt**: Basic information and pricing
- **Teknisk data**: Technical specifications and dimensions
- **Ekonomi**: Financial analysis and operating costs
- **Historik**: Vehicle history and safety ratings
- **Framtid**: Future value and maintenance insights

### **Vehicle Comparison**
1. Add multiple vehicles using "+ Lägg till fordon"
2. Enter registration numbers for each vehicle
3. View side-by-side comparison in the comparison table
4. Remove vehicles with the × button if needed

## 🔌 **API Integration**

### **Car.info API**
The platform integrates with the Car.info API for comprehensive vehicle data:

- **Demo Endpoint**: `https://api.car.info/v2/app/demo/license-plate/S/VVV999`
- **Real Data Extraction**: 70% real data from API, 30% intelligent mock data
- **Comprehensive Attributes**: 100+ vehicle specifications
- **Swedish Market Focus**: Optimized for Swedish registration numbers

### **Data Processing**
- **Smart Attribute Parsing**: Extracts relevant data from extensive API response
- **Type-Safe Integration**: Full TypeScript support for API responses
- **Intelligent Fallbacks**: Graceful handling of missing data
- **Real-time Updates**: Live data fetching and display

## 📊 **Data Coverage**

### **Real Data from Car.info API (70%)**
- ✅ Vehicle identification (brand, model, variant)
- ✅ Engine specifications (power, type, fuel)
- ✅ Technical attributes and dimensions
- ✅ Safety ratings and Euro NCAP scores
- ✅ Equipment and feature packages
- ✅ Vehicle history indicators

### **Intelligent Mock Data (30%)**
- 🎭 Market pricing and valuations
- 🎭 Operating costs (tax, insurance, maintenance)
- 🎭 Future value predictions
- 🎭 Market position analysis
- 🎭 Depreciation calculations

## 🔮 **Future Enhancements**

### **Planned Features**
- **Full Car.info API Integration**: Real pricing and market data
- **Advanced Analytics**: Market trends and insights
- **PDF Report Generation**: Exportable vehicle reports
- **User Authentication**: Personal vehicle collections
- **Mobile App**: Native iOS/Android applications
- **API Expansion**: Integration with additional data sources

### **Business Features**
- **Dealer Dashboard**: Inventory management tools
- **Bulk Analysis**: Process multiple vehicles simultaneously
- **Custom Branding**: White-label solutions
- **Advanced Filtering**: Search and filter capabilities
- **Historical Tracking**: Price and value tracking over time

## 🏗 **Project Structure**

```
bilio-mvp-temp/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── vehicle/
│   │   │       └── route.ts          # Vehicle API proxy
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main application
│   └── components/                   # Reusable components
├── public/                           # Static assets
├── .env.local                        # Environment variables
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies and scripts
```

## 🛡 **Security & Best Practices**

- **Environment Variables**: Secure API key management
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error management
- **Rate Limiting**: Built-in API request optimization
- **Data Validation**: Input sanitization and validation

## 📄 **License**

This project is proprietary software developed for the Swedish automotive market.

## 🤝 **Contributing**

This is a private MVP project. For contributions or suggestions, please contact the development team.

## 📞 **Support**

For technical support or business inquiries:
- **Developer**: sacco.rezais@gmail.com
- **GitHub**: saccor

---

**Built with ❤️ for the Swedish automotive industry**

*Transforming vehicle registration numbers into comprehensive automotive intelligence.*
