# Finance Dashboard UI - Architecture

## Tech Stack

- **Framework:** React 18
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **State Management:** React Context + useReducer
- **Build Tool:** Vite
- **Language:** TypeScript

## Folder Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   └── Select.tsx
│   ├── dashboard/
│   │   ├── SummaryCards.tsx
│   │   ├── BalanceChart.tsx
│   │   ├── SpendingChart.tsx
│   │   └── Insights.tsx
│   ├── transactions/
│   │   ├── TransactionList.tsx
│   │   ├── TransactionItem.tsx
│   │   ├── TransactionFilters.tsx
│   │   └── TransactionForm.tsx
│   └── layout/
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       └── Layout.tsx
├── context/
│   ├── AppContext.tsx
│   └── types.ts
├── data/
│   └── mockData.ts
├── hooks/
│   ├── useTransactions.ts
│   └── useFilters.ts
├── pages/
│   ├── Dashboard.tsx
│   └── Transactions.tsx
├── utils/
│   ├── formatters.ts
│   └── calculations.ts
├── App.tsx
└── main.tsx
```

## Component Breakdown

### Layout Components
- **Layout:** Main wrapper with sidebar and header
- **Sidebar:** Navigation menu with role-based visibility
- **Header:** Role switcher, page title, user info

### Dashboard Components
- **SummaryCards:** Total Balance, Income, Expenses cards
- **BalanceChart:** Line chart showing balance trend over time
- **SpendingChart:** Pie/Donut chart for category breakdown
- **Insights:** Stat cards with calculated insights

### Transaction Components
- **TransactionList:** Paginated list with sorting
- **TransactionItem:** Individual row with date, amount, category, type
- **TransactionFilters:** Filter by category, type, date range
- **TransactionForm:** Add/Edit form (Admin only)

### Common Components
- **Card:** Reusable container
- **Button:** Primary, secondary, danger variants
- **Badge:** Category/type indicators
- **Select:** Dropdown for filters and role switch

## State Management

### AppContext (Global State)
```typescript
{
  // User & Role
  currentRole: 'admin' | 'viewer',
  setRole: (role) => void,
  
  // Transactions
  transactions: Transaction[],
  addTransaction: (tx) => void,
  updateTransaction: (id, tx) => void,
  deleteTransaction: (id) => void,
  
  // Filters
  filters: FilterState,
  setFilters: (filters) => void,
  resetFilters: () => void,
  
  // Computed
  totalBalance: number,
  totalIncome: number,
  totalExpenses: number,
  filteredTransactions: Transaction[],
}
```

### State Updates
- Role change → UI elements show/hide based on permissions
- Transaction add/edit → Recalculate totals and charts
- Filter change → Update displayed transactions

## Data Flow

```
User Action → Context Dispatch → State Update → Components Re-render
```

1. **Initialization:** Load mock data into context on app mount
2. **Filtering:** Apply filters → computed filteredTransactions
3. **Calculations:** Derived values computed from filtered data
4. **Charts:** Receive computed data as props

## Role Behavior

### Viewer Role
- Read-only access to dashboard and transactions
- Can apply filters and sort transactions
- Cannot add, edit, or delete transactions
- Transaction form hidden

### Admin Role
- Full access to all features
- Can add new transactions via form
- Can edit existing transactions
- Can delete transactions
- Role toggle in header for demo

## Data Models

### Transaction
```typescript
{
  id: string,
  date: string,
  amount: number,
  category: string,
  type: 'income' | 'expense',
  description: string
}
```

### FilterState
```typescript
{
  search: string,
  category: string | null,
  type: 'income' | 'expense' | null,
  dateRange: { start: string, end: string } | null,
  sortBy: 'date' | 'amount',
  sortOrder: 'asc' | 'desc'
}
```

## Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "recharts": "^2.10.0",
  "tailwindcss": "^3.4.0",
  "lucide-react": "^0.300.0"
}
```