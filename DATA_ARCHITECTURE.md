# Data Architecture & Best Practices

## Overview

This document outlines the data architecture implemented for the vehicle analysis application, following best practices for managing multiple API sources and mock data.

## Architecture Components

### 1. **Configuration Layer** (`src/config/data-sources.ts`)

Centralized configuration that defines:
- Which data comes from which APIs
- API endpoints and their status (enabled/disabled)
- Clear mapping of data fields to their sources

**Benefits:**
- Easy to enable/disable data sources
- Clear visibility of what's real vs mock data
- Single source of truth for API configuration

### 2. **Service Layer** (`src/services/vehicle-service.ts`)

Unified service that:
- Orchestrates multiple API calls
- Handles fallbacks and error states
- Provides consistent interface to UI components
- Tracks which data sources were successfully used
- Uses Next.js API routes to avoid CORS issues

**Benefits:**
- UI components don't need to know about multiple APIs
- Easy to add new data sources
- Centralized error handling
- Clear data source attribution
- Handles browser security restrictions (CORS)

### 3. **Data Transformation** (`src/utils/vehicle-transformers.ts`)

Specialized functions that:
- Extract maximum data from Car.info API's extensive attributes array
- Transform raw API responses to our Vehicle type
- Generate intelligent mock data when needed
- Handle data parsing and validation

**Benefits:**
- Maximizes data extraction from available APIs
- Type-safe transformations
- Consistent data structure regardless of source
- Easy to extend with new fields

### 4. **UI Transparency** (`src/components/DataSourceStatus.tsx`)

Component that shows users:
- Which data sources are live vs mock
- Clear visual indicators
- Educational transparency

## Current Data Sources

### **Live Data** (Car.info API)
- ✅ Vehicle brand, model, variant
- ✅ First registration date
- ✅ Vehicle color
- ✅ Engine specifications (power, displacement, cylinders)
- ✅ CO₂ emissions (g/km)
- ✅ Fuel consumption (WLTP data)
- ✅ Technical dimensions (length, width, height, etc.)
- ✅ Safety ratings (Euro NCAP scores)
- ✅ Equipment and features (Heated seats, GPS, Bluetooth, etc.)
- ✅ Fuel type and transmission

### **Mock Data** (Generated)
- 🔴 Pricing information
- 🔴 Market value analysis
- 🔴 Vehicle history (taxi, rental, imported)
- 🔴 Current mileage
- 🔴 Dealer information
- 🔴 Operating costs (enhanced with real CO₂ data)
- 🔴 Future value predictions
- 🔴 Known issues

## Benefits of This Architecture

### 1. **Scalability**
- Easy to add new API sources
- Minimal code changes required
- Configuration-driven approach

### 2. **Maintainability**
- Clear separation of concerns
- Single responsibility principle
- Easy to test individual components

### 3. **Transparency**
- Users know what data is real vs demo
- Developers can easily track data sources
- Clear documentation of capabilities

### 4. **Flexibility**
- Can switch between demo and production modes
- Gradual rollout of new data sources
- Fallback mechanisms for API failures

### 5. **Type Safety**
- TypeScript throughout
- Compile-time checks for data structure
- IDE support and autocompletion

## Implementation Best Practices

### ✅ **Do's**
- Use the service layer for all data access
- Mark mock data clearly in UI
- Implement proper error handling
- Use TypeScript interfaces consistently
- Document data source limitations

### ❌ **Don'ts**
- Don't make direct API calls from UI components
- Don't mix real and mock data without clear indicators
- Don't hardcode API endpoints in multiple places
- Don't assume data availability without checking

## Future Implementation

### Adding New APIs

1. **Update Configuration**
   ```typescript
   // Add to src/config/data-sources.ts
   NEW_API: {
     baseUrl: 'https://api.example.com',
     enabled: true
   }
   ```

2. **Extend Service**
   ```typescript
   // Add method to VehicleService
   private async getNewApiData(params: VehicleLookupParams) {
     // Implementation
   }
   ```

3. **Update Data Combination**
   ```typescript
   // Modify combineVehicleData method
   ...(newApiData && {
     newField: newApiData.value
   })
   ```

### Switching from Mock to Real Data

1. Enable API in configuration
2. Implement API method in service
3. Update data combination logic
4. Data source status automatically updates

## Testing Strategy

- **Unit Tests**: Test individual transformation functions
- **Integration Tests**: Test service layer with mock APIs
- **E2E Tests**: Test full data flow with real APIs
- **Mock Tests**: Ensure fallbacks work correctly

## Monitoring & Observability

- Track API response times and success rates
- Monitor data quality and completeness
- Alert on API failures or degraded service
- Log data source usage for analytics

## Security Considerations

- API keys stored securely in environment variables
- Rate limiting for external API calls
- Input validation for all user-provided data
- Error messages don't expose internal details

## CORS & Browser Restrictions

### The Problem
Modern browsers block direct API calls to external domains (CORS policy). Trying to call Car.info API directly from the browser will result in:
```
Error: Failed to fetch
```

### The Solution
We use **Next.js API routes as proxies**:

1. **Client-side service** calls `/api/vehicle` (same domain ✅)
2. **Server-side API route** calls external APIs (no CORS restrictions ✅)
3. **Data flows back** to client through the proxy

### Implementation Pattern
```typescript
// ❌ This fails due to CORS:
fetch('https://api.car.info/v2/app/demo/...')

// ✅ This works (via Next.js API route):
fetch('/api/vehicle?type=license-plate&country=S&id=ABC123')
```

### Future API Integration
When adding new external APIs:
1. Create new API route in `/pages/api/` or `/app/api/`
2. Make external calls server-side
3. Service layer calls your API route
4. No CORS issues! 