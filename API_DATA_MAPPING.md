# API Data Mapping - Car.info Demo API

This document maps the Swedish vehicle data fields to their corresponding Car.info API attributes and extraction status.

## ✅ Successfully Extracted from Real API

| Svenska fält | English Field | API Attribute ID | API Path/Key | Example Value |
|--------------|---------------|------------------|--------------|---------------|
| **Grundläggande Information** |
| Märke | Brand | - | `result.brand` | "Car.info" |
| Modell | Model | - | `result.model` | "Do Not Delete" |
| Variant | Variant | - | `result.series + result.generation` | "Test 1st Generation" |
| Årsmodell | Year | - | `result.model_year` | 2014 |
| Första registrering | First Registration | - | `result.model_year` → `"2014-01-01"` | "2014-01-01" |
| Färg | Color | 122, g13 | `attributes → "Colour"` | "Orange" |
| **Motor & Prestanda** |
| Motoreffekt | Engine Power | 151, 152 | `result.horsepower` | 136 hp |
| Bränsletyp | Fuel Type | - | `result.engine_type` | "Plug-in Hybrid Diesel" |
| Slagvolym | Engine Size | 148, 2232 | `attributes → "Displacement"` | 2.0 L |
| Cylindrar | Cylinders | 158 | `attributes → "Cylinders"` | 4 |
| Växellåda | Transmission | - | `attributes → "Transmission"` | Various |
| CO₂-utsläpp | CO2 Emissions | 4132 | `attributes → "CO₂"` | 53 g/km |
| Bränsleförbrukning | Fuel Consumption | g479, g480, g481 | `attributes → WLTP profiles` | 8.2 l/100km |
| **Tekniska Specifikationer** |
| Längd | Length | - | `attributes → "Length"` | Various mm |
| Bredd | Width | 2489 | `attributes → "Width"` | 1820 mm |
| Höjd | Height | - | `attributes → "Height"` | Various mm |
| Axelavstånd | Wheelbase | 97 | `attributes → "Wheel Base"` | 2542 mm |
| Luftmotstånd | Drag Coefficient | 268 | `attributes → "Drag Coefficient"` | 2 |
| Tankvolym | Tank Volume | - | `attributes → "Tank Volume"` | Various L |
| Totalvikt | Total Weight | - | `attributes → "Total Weight"` | Various kg |
| **Säkerhet** |
| Euro NCAP | Euro NCAP Rating | 1930 | `attributes → "Overall Score"` | 99 points |
| Vuxen säkerhet | Adult Occupant | 786 | `attributes → "Adult Occupant"` | 89% |
| Barn säkerhet | Child Occupant | 787 | `attributes → "Child Occupant"` | 78% |
| Säkerhetsassistent | Safety Assist | 785 | `attributes → "Safety Assist"` | 42% |
| **Utrustning** |
| Värme i säten | Heated Seats | 949 | `attributes → "Heated Seats"` | "yes" |
| GPS Navigation | GPS | 5360 | `attributes → "GPS: Navigation"` | "yes" |
| Bluetooth | Bluetooth | 469 | `attributes → "Bluetooth: Phone"` | "yes" |
| Farthållare | Cruise Control | 915 | `attributes → "Cruise Control"` | "yes" |
| Parkeringssensorer | Parking Sensors | 368 | `attributes → "Parking Sensors"` | "yes" |
| Apple CarPlay | Apple CarPlay | 524 | `attributes → "Apple CarPlay"` | "yes" |
| Android Auto | Android Auto | 525 | `attributes → "Android Auto"` | "yes" |

## 🔴 Still Using Mock Data (Not Available in Demo API)

| Svenska fält | English Field | Reason |
|--------------|---------------|---------|
| **Ekonomi** |
| Utropspris | Price | Not available in demo API |
| Marknadsvärde | Market Value | Not available in demo API |
| Marknadsposition | Market Position | Requires market analysis API |
| Säljbarhet | Sellability | Requires market analysis API |
| **Fordonshistorik** |
| Mätarställning | Mileage | Not available in demo API |
| Taxi-historik | Taxi History | Requires vehicle history API |
| Hyrbils-historik | Rental History | Requires vehicle history API |
| Importerad | Import Status | Requires vehicle history API |
| Skadehistorik | Damage History | Requires vehicle history API |
| Senaste besiktning | Last Inspection | Not available in demo API |
| **Återförsäljare** |
| Bilhandlare | Dealer Name | Not available in demo API |
| **Framtidsvärdering** |
| Framtidsvärde | Future Value | Requires predictive analytics API |
| Kända problem | Known Issues | Requires maintenance database API |
| **Driftskostnader** |
| Årlig skatt | Annual Tax | Enhanced with real CO₂ data |
| Försäkringsgrupp | Insurance Group | Calculated from power data |
| Underhållskostnad | Maintenance Cost | Estimated |

## 🔧 Implementation Notes

### Data Extraction Strategy
1. **Primary Sources**: Use direct API result fields (`result.brand`, `result.horsepower`, etc.)
2. **Attribute Search**: Search attributes array using multiple search terms (ID, English name, Swedish name)
3. **Fallback Values**: Provide reasonable defaults when data is missing
4. **Type Safety**: All extractions are type-safe with proper validation

### Search Patterns
```typescript
// Example: Finding color data
const colorSearchTerms = [
  'Colour', 'Color', 'Färg',  // Multiple language support
  '122',                      // Specific attribute ID for Orange
  'g13'                       // Color group ID
];
```

### Equipment Detection
Equipment is detected using specific attribute IDs and translated to Swedish names:
- Real detection based on "yes"/"optional" values
- Comprehensive list of modern vehicle features
- Swedish translations for better UX

### Enhanced Mock Data
Mock data is now enhanced with real API data where possible:
- **Tax calculation**: Uses real CO₂ emissions data
- **Dealer names**: Include real vehicle color
- **Price estimation**: Based on real engine power and year

## 🚀 Benefits

1. **Significantly More Real Data**: From ~8 fields to ~20+ fields from real API
2. **Better User Experience**: Real color, emissions, fuel consumption visible
3. **Accurate Equipment Lists**: Specific detection of actual vehicle features
4. **Enhanced Mock Data**: Even mock calculations use real data inputs
5. **Future-Ready**: Easy to switch mock fields to real data when APIs become available 