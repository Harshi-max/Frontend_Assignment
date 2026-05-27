# Tax Loss Harvesting Tool

A modern, interactive web application for calculating tax savings through strategic loss harvesting on cryptocurrency holdings. Built with Next.js 16, React 19, and Tailwind CSS with full dark/light mode support.

## Overview

Tax loss harvesting is an investment strategy that involves selling securities at a loss to offset capital gains and reduce tax liability. This tool helps users visualize how selecting specific holdings with losses can reduce their effective capital gains, displaying the potential tax savings in real-time.

## Features

### Core Functionality
- **Pre-Harvesting Analysis**: View your current capital gains/losses breakdown by short-term and long-term categories
- **Dynamic Post-Harvesting Calculation**: Instantly see updated capital gains when selecting holdings to harvest
- **Real-time Savings Display**: Watch your potential tax savings update as you select/deselect holdings
- **Interactive Holdings Table**: Sortable table with checkboxes for selecting which assets to harvest

### User Interface
- **Dark/Light Mode Toggle**: Switch between dark and light themes with persistent preference storage
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens
- **Hover Tooltips**: "How it works?" tooltip explaining tax loss harvesting strategies
- **Expandable Disclaimers**: Important tax and regulatory disclaimers with expand/collapse functionality
- **Visual Indicators**: Color-coded gains (green) and losses (red) for easy scanning

### Table Functionality
- **Sortable Columns**: Click "Short-term" or "Long-term" headers to sort holdings by gain amounts
- **Select All/Deselect All**: Master checkbox to quickly select or deselect all visible holdings
- **Pagination**: "View all" button to expand or collapse the holdings table
- **Dynamic Updates**: Post-harvesting calculations update instantly when selections change

## Technical Stack

### Framework & Libraries
- **Next.js 16**: React framework with App Router and SSR capabilities
- **React 19**: Latest React version with concurrent rendering
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS v4**: Utility-first CSS framework with native dark mode
- **Radix UI**: Accessible component primitives for form controls and interactive elements

### Architecture
- **State Management**: React Context API with custom hooks
- **Mock APIs**: Promise-based functions simulating real API calls
- **Component-Based**: Modular, reusable components following React best practices
- **Responsive**: Mobile-first design approach using Tailwind's responsive utilities

## Project Structure

```
/app
  layout.tsx              # Root layout with providers wrapper
  page.tsx               # Main Tax Harvesting page
  globals.css            # Global styles and theme variables
  providers.tsx          # Client-side providers (Theme, Harvesting)

/components
  TaxHarvesting.tsx      # Main container component
  PreHarvestingCard.tsx  # Pre-harvesting gains display
  AfterHarvestingCard.tsx # Post-harvesting gains & savings display
  HoldingsTable.tsx      # Interactive holdings table with sorting
  InfoBanner.tsx         # Expandable disclaimers banner
  HowItWorks.tsx         # Hover tooltip explaining how it works

/context
  HarvestingContext.tsx  # State management for harvesting logic
  ThemeContext.tsx       # Dark/light mode state and toggling

/lib
  api.ts                 # Mock API functions for data fetching
  types.ts               # TypeScript interfaces and types
  calculations.ts        # Gain/loss calculation logic

/public
  [Static assets]        # Images, icons, etc.
```

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm/pnpm/yarn
- Git for version control

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd v0-project
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000` to view the application

### Build for Production

```bash
pnpm build
pnpm start
```

## Usage Guide

### Understanding the Interface

#### Pre-Harvesting Card (Dark)
Shows your current capital gains breakdown:
- **Short-term Gains**: Profits and losses from assets held < 1 year
- **Long-term Gains**: Profits and losses from assets held > 1 year
- **Net Capital Gains**: Short-term net + Long-term net
- **Realised Capital Gains**: Total tax-liable gains

#### After-Harvesting Card (Blue)
Dynamically updates as you select holdings:
- Shows updated capital gains after removing selected holdings
- Displays **Effective Capital Gains** (the new total after harvesting)
- Shows **Savings Message**: "🔥 You are going to save upto ₹ X" when tax liability reduces

#### Holdings Table
- **Asset**: Cryptocurrency name and symbol with icon
- **Holdings**: Total amount and average purchase price
- **Current Price**: Market value displayed as rupees
- **Short-term Gain**: Unrealized gain/loss for holdings < 1 year (in ₹)
- **Long-term Gain**: Unrealized gain/loss for holdings > 1 year (in ₹)
- **Amount to Sell**: Populated when row is selected (total holdings to harvest)

### How to Use

1. **Review Current Gains**: Examine your Pre-Harvesting card to see your current tax position

2. **Select Holdings to Harvest**: 
   - Click individual checkboxes next to assets you want to harvest
   - Or click the master checkbox to select/deselect all visible holdings
   - Use "View all" to see more holdings if needed

3. **Monitor Tax Savings**:
   - Watch the After-Harvesting card update in real-time
   - Check if the savings message appears (only shows when tax liability decreases)
   - Note the potential tax savings amount

4. **Sort Holdings** (Optional):
   - Click "Short-term ↑↓" to sort by short-term gains (ascending/descending)
   - Click "Long-term ↑↓" to sort by long-term gains
   - Useful for identifying the most beneficial holdings to harvest

5. **Toggle Theme**:
   - Click the sun/moon icon in the top-right corner to switch between dark and light modes
   - Your preference is saved automatically

6. **Learn More**:
   - Hover over "How it works?" to see a tooltip explaining tax loss harvesting
   - Expand the "Important Notes & Disclaimers" section for regulatory information

## Data Structure

### Capital Gains Object
```typescript
interface CapitalGains {
  stcg: {
    profits: number      // Short-term capital gains (profits)
    losses: number       // Short-term capital losses
  }
  ltcg: {
    profits: number      // Long-term capital gains (profits)
    losses: number       // Long-term capital losses
  }
}
```

### Holding Object
```typescript
interface Holding {
  coin: string                    // Symbol (e.g., "BTC")
  coinName: string               // Full name (e.g., "Bitcoin")
  logo: string                   // Icon/emoji representation
  totalHoldings: number          // Total amount held
  currentPrice: number           // Current market price
  averageBuyPrice: number        // Average purchase price
  stcg: {
    gain: number                 // Short-term unrealized gain/loss
    balance: number              // Holdings amount with ST gains
  }
  ltcg: {
    gain: number                 // Long-term unrealized gain/loss
    balance: number              // Holdings amount with LT gains
  }
}
```

## Key Calculations

### Net Capital Gains
```
Net STCG = Short-term Profits - Short-term Losses
Net LTCG = Long-term Profits - Long-term Losses
```

### Realised Capital Gains
```
Realised Capital Gains = Net STCG + Net LTCG
```

### Savings Calculation
When a holding is selected:
1. Add holding's short-term gain to STCG (profits if positive, losses if negative)
2. Add holding's long-term gain to LTCG (profits if positive, losses if negative)
3. Recalculate net gains
4. Calculate savings = Pre-harvesting RCG - Post-harvesting ECG
5. Display savings only if savings > 0

## Mock API Reference

### fetchCapitalGains()
Returns current capital gains data with a 500ms delay.
```typescript
await fetchCapitalGains()
// Returns: CapitalGains object
```

### fetchHoldingsData()
Returns array of holdings with a 600ms delay.
```typescript
await fetchHoldingsData()
// Returns: Holding[] array with 6 sample holdings
```

## Customization Guide

### Adding New Holdings
Edit `/lib/api.ts` in the `fetchHoldingsData()` function:
```typescript
{
  coin: "SOL",
  coinName: "Solana",
  logo: "◉",
  totalHoldings: 50,
  currentPrice: 25000,
  averageBuyPrice: 15000,
  stcg: { gain: 100000, balance: 2 },
  ltcg: { gain: 300000, balance: 48 },
}
```

### Updating Capital Gains
Edit `/lib/api.ts` in the `fetchCapitalGains()` function:
```typescript
{
  stcg: { profits: 1540, losses: 743 },
  ltcg: { profits: 1200, losses: 650 }
}
```

### Changing Color Scheme
Edit component files (e.g., `PreHarvestingCard.tsx`) to modify:
- Card backgrounds: `bg-slate-900` (dark), `bg-gray-100` (light)
- Text colors: Use Tailwind's `dark:` prefix for theme variants
- Accent colors: Modify blue shades in `AfterHarvestingCard.tsx`

### Adjusting Responsive Breakpoints
Tailwind breakpoints in component classes:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

## Important Disclaimers

⚠️ **Tax Loss Harvesting is Subject to Regulations**

- Tax-loss harvesting strategies vary by country and jurisdiction
- In India, specific regulations apply to when and how losses can be harvested
- This tool is for educational and informational purposes only
- **Always consult a tax professional before implementing loss harvesting strategies**
- Price data sourced from external services and may not reflect real-time exchange prices
- This application does not constitute financial or tax advice

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Mobile 90+

## Performance Optimizations

- Component memoization with React.memo for static parts
- useCallback hooks for event handlers to prevent re-renders
- Efficient state updates with Context API
- Lazy loading of components where applicable
- CSS-in-JS compiled to efficient Tailwind classes

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles for interactive elements
- Keyboard navigation support
- Color contrast meets WCAG AA standards
- Screen reader friendly table structure
- Focus indicators for interactive elements

## Development Notes

### State Management Flow
```
1. TaxHarvesting component loads
2. Fetches initial data from mock APIs
3. Initializes HarvestingContext with data
4. User selects/deselects holdings
5. Context updates selectedHoldings set
6. HarvestingContext recalculates post-harvesting gains
7. Components re-render with new data
8. After-Harvesting card and savings update in real-time
```

### Testing the Application

1. **Test Selection Logic**:
   - Click individual checkboxes and verify calculations update
   - Use master checkbox to select all and verify all rows update
   - Deselect individual items after selecting all

2. **Test Sorting**:
   - Click sort buttons and verify table reorders
   - Click again to reverse sort direction
   - Verify arrow indicators update correctly

3. **Test Theme Toggle**:
   - Click theme button and verify colors change
   - Refresh page and verify theme persists
   - Check both dark and light modes are readable

4. **Test Responsiveness**:
   - Resize browser to different breakpoints
   - Verify layout adapts correctly on mobile/tablet/desktop
   - Check table scrolls horizontally on mobile

## Future Enhancements

- Real API integration with live market data
- User authentication and saved portfolios
- Export functionality (PDF, CSV reports)
- Advanced filtering and search in holdings
- Tax impact projections with multiple scenarios
- Integration with tax software (TurboTax, ClearTax, etc.)
- Historical data and analytics
- Multi-currency support

## Troubleshooting

### App won't load
- Ensure all dependencies are installed: `pnpm install`
- Clear Next.js cache: `rm -rf .next`
- Restart dev server: `pnpm dev`

### Calculations appear incorrect
- Check `/lib/calculations.ts` for calculation logic
- Verify mock data in `/lib/api.ts` matches expected format
- Check HarvestingContext for state updates

### Dark mode not persisting
- Check browser localStorage is enabled
- Verify ThemeContext is wrapping the app in `providers.tsx`
- Check browser console for errors

### Table not sorting
- Verify sort button refs are correct
- Check `HoldingsTable.tsx` for sort handler implementation
- Ensure selectedHoldings state is updating in context

## Contributing

To contribute improvements:

1. Create a feature branch from `main`
2. Make your changes with clear commit messages
3. Test thoroughly on different screen sizes and browsers
4. Submit a pull request with detailed description
5. Ensure all linting passes: `pnpm lint`

## License

This project is provided as-is for educational and informational purposes.

## Support & Questions

For issues, questions, or suggestions:
- Check the troubleshooting section above
- Review component comments in the code
- Consult the technical stack documentation
- Open an issue with detailed reproduction steps

---

**Last Updated**: May 2026  
**Version**: 1.0.0  
**Status**: Production Ready

