# Mock Data Documentation

This directory contains comprehensive mock data for the CNMI Supply Chain Arbitrage App, designed to support development, testing, and demonstration purposes.

## File Structure

```
src/data/
├── mockData.ts              # Core mock data for all entities
├── additionalMockData.ts    # Extended mock data with more scenarios
├── testScenarios.ts         # Business test scenarios and use cases
├── index.ts                 # Combined exports and data summaries
└── README.md                # This documentation file
```

## Data Overview

### Core Entities

#### Users
- **Total**: 5 users (3 staff, 2 admin)
- **Roles**: Staff can create/edit items and shipments; Admin can edit rate tables, tax tables, and users
- **Credentials**: All users have demo passwords for testing

#### Suppliers
- **Total**: 8 suppliers
- **Types**: Local CNMI, Guam, Hawaii, Asian, European, Seafood
- **Contact Info**: Full contact details including addresses and notes

#### Items
- **Total**: 20 items
- **Categories**: Foodstuff, Beverages, Tobacco, Cosmetics, Construction, Luxury Goods, Vehicles, Aviation Fuel
- **Sources**: Import (Guam, Hawaii, Asia, Europe) and CNMI Local
- **Features**: SKUs, barcodes, case sizes, weights, tax categories, expiration dates

#### Shippers
- **Total**: 5 shippers
- **Types**: Ocean freight, Air cargo, USPS, Local delivery
- **Rate Modes**: Per pound, per cubic foot, flat rate, minimum charges

#### Tax Categories
- **Total**: 25 categories
- **Types**: Ad valorem, per volume, per pack, hybrid
- **Rates**: From 1% (Foodstuff) to 60% (Tobacco)
- **Special**: Container fees, EBT exemptions

#### System Settings
- **EBT Rate**: 0.42% (Environmental Beautification Tax)
- **Container Fee**: $0.05 per container
- **Expiration Warning**: 30 days

## Mock Data Features

### Realistic Business Scenarios
- **Seasonal Trends**: Monthly shipment and revenue patterns
- **Supplier Metrics**: Performance ratings, delivery times, quality scores
- **Risk Management**: Expiring items, compliance tracking, audit findings
- **Performance KPIs**: Growth rates, targets, cost savings

### Comprehensive Tax Coverage
- **CNMI Tax Catalog**: All 25 tax categories with correct rates
- **Tax Application Rules**: Source logic, EBT exemptions, container fees
- **Calculation Examples**: Detailed tax breakdowns for each scenario

### Multi-Currency Support
- **Foreign Invoices**: JPY, EUR, USD examples
- **FX Rates**: Realistic conversion rates
- **Currency Conversion**: Tools for ml↔L↔fl oz↔gal, kg↔lb

## Test Scenarios

### 1. Foodstuff Import (No EBT)
- **Purpose**: Test food items exempt from Environmental Beautification Tax
- **Tax**: 1% ad valorem only
- **Expected**: No EBT, no container fees

### 2. Beverage Import (EBT + Container Fee)
- **Purpose**: Test soft drinks with both EBT and container fees
- **Tax**: $0.005 per fl oz + container fee + EBT
- **Expected**: Volume-based tax + $0.05 per container + 0.42% EBT

### 3. Tobacco Import (High Tax Rate)
- **Purpose**: Test high-value items with 60% ad valorem tax
- **Tax**: 60% ad valorem + EBT
- **Expected**: Significant tax impact on pricing

### 4. Luxury Goods Import
- **Purpose**: Test high-value luxury items
- **Tax**: 5.75% ad valorem + EBT
- **Expected**: Moderate tax rate for jewelry and luxury goods

### 5. Vehicle Import
- **Purpose**: Test large, high-value items
- **Tax**: 5.75% ad valorem + EBT
- **Expected**: High absolute tax amounts due to item value

### 6. CNMI Local Source
- **Purpose**: Test local items with no import taxes
- **Tax**: Local tax only (1% for foodstuff)
- **Expected**: No EBT, no import excise taxes

### 7. Mixed Shipment
- **Purpose**: Test shipments with multiple tax categories
- **Tax**: 5% ad valorem + EBT
- **Expected**: Standard tax treatment for mixed goods

### 8. Expiring Items Alert
- **Purpose**: Test expiration warning system
- **Alert**: 30-day warning for perishable items
- **Expected**: System flags items approaching expiration

### 9. Currency Conversion
- **Purpose**: Test foreign currency invoices
- **Currency**: Japanese Yen (JPY)
- **Expected**: FX conversion to USD for tax calculations

### 10. USPS Flat Rate
- **Purpose**: Test USPS shipments with flat rate allocation
- **Method**: Weight-based allocation
- **Expected**: Fixed shipping cost regardless of value

## Usage Examples

### Importing Mock Data
```typescript
import { 
  users, 
  suppliers, 
  items, 
  shipments,
  allUsers,
  allSuppliers,
  allItems,
  dataSummary 
} from '../data';

// Use individual data sets
const adminUsers = users.filter(user => user.role === 'admin');

// Use combined data sets
const totalItems = allItems.length;

// Get data summary
console.log(`Total entities: ${dataSummary.totalItems} items, ${dataSummary.totalShipments} shipments`);
```

### Using Test Scenarios
```typescript
import { 
  foodstuffScenario, 
  beverageScenario,
  allTestScenarios 
} from '../data/testScenarios';

// Test specific scenario
const foodTax = foodstuffScenario.expectedTaxes.totalTax;

// Run all scenarios
allTestScenarios.forEach(scenario => {
  console.log(`Testing: ${scenario.name}`);
  console.log(`Expected tax: $${scenario.expectedTaxes.totalTax}`);
});
```

### Using Data Utilities
```typescript
import { 
  filterItemsBySupplier,
  calculateTotalTax,
  formatCurrency,
  exportToCSV 
} from '../utils/dataUtils';

// Filter items by supplier
const supplierItems = filterItemsBySupplier(items, 'supplier-1');

// Calculate taxes
const taxBreakdown = calculateTotalTax(item, taxCategory, 100, 5, systemSettings);

// Format output
const formattedCost = formatCurrency(1234.56);

// Export data
exportToCSV(items, 'items-export');
```

## Data Validation

### Required Fields
- **Items**: name, sku, supplierId, defaultTaxCategoryId
- **Shipments**: shipmentId, shipDate, shipperId, allocationMethod
- **Suppliers**: name, contact, email
- **Users**: email, password, role, name

### Data Integrity
- **Foreign Keys**: All references between entities are valid
- **Dates**: Realistic dates with proper chronological order
- **Numbers**: Positive values for weights, costs, and quantities
- **Strings**: Properly formatted names, addresses, and descriptions

## Performance Considerations

### Data Size
- **Total Records**: ~200+ entities across all types
- **Memory Usage**: Minimal impact on application performance
- **Loading Time**: Instant data access for development

### Scalability
- **Pagination**: Built-in support for large datasets
- **Filtering**: Efficient search and filter operations
- **Caching**: Data can be cached for repeated access

## Development Workflow

### Adding New Data
1. **Identify Entity**: Choose appropriate entity type
2. **Create Record**: Follow existing data structure
3. **Update Index**: Add to combined exports if needed
4. **Test Integration**: Verify data appears in UI

### Modifying Existing Data
1. **Backup**: Keep original data for reference
2. **Update**: Modify specific fields as needed
3. **Validate**: Ensure data integrity is maintained
4. **Test**: Verify changes work as expected

### Creating Test Scenarios
1. **Business Case**: Define realistic business scenario
2. **Data Setup**: Create necessary entities and relationships
3. **Expected Results**: Calculate expected taxes and costs
4. **Documentation**: Document purpose and expected outcomes

## Best Practices

### Data Consistency
- Use consistent naming conventions
- Maintain realistic relationships between entities
- Ensure all required fields are populated

### Testing Coverage
- Cover all tax categories and scenarios
- Include edge cases and error conditions
- Test both import and local source items

### Documentation
- Keep test scenarios up to date
- Document complex tax calculations
- Maintain clear examples for developers

## Troubleshooting

### Common Issues
- **Missing Dependencies**: Ensure all imports are correct
- **Type Errors**: Check TypeScript interfaces match data structure
- **Circular References**: Avoid circular dependencies in data

### Debugging
- **Console Logging**: Use console.log to inspect data structure
- **Data Validation**: Use validation functions to check data integrity
- **Step-by-Step**: Test individual functions with sample data

## Future Enhancements

### Planned Features
- **Dynamic Data Generation**: Random data generation for testing
- **API Integration**: Mock API endpoints for frontend development
- **Data Visualization**: Sample charts and graphs
- **Performance Testing**: Large dataset generation for stress testing

### Integration Points
- **Backend APIs**: Mock endpoints matching real API structure
- **Database**: SQL scripts for database setup
- **External Services**: Mock responses for third-party integrations

## Support

For questions about the mock data or assistance with creating new scenarios, please refer to:
- **Functional Specification**: Detailed business requirements
- **Type Definitions**: TypeScript interfaces in `src/types/`
- **Test Scenarios**: Business use cases and examples
- **Data Utilities**: Helper functions for common operations

---

*This mock data is designed to support the development and testing of the CNMI Supply Chain Arbitrage App. All data is fictional and intended for demonstration purposes only.*
