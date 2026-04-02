# Finance Dashboard UI

A modern, clean Finance Dashboard UI built with React (Vite) and Tailwind CSS. Features a unique design with smooth animations, role-based UI, and comprehensive financial tracking capabilities.

## Features

- **Dashboard Overview** - Summary cards, balance trend chart, spending breakdown
- **Transactions Management** - List, filter, search, and manage transactions
- **Role-Based UI** - Admin (full access) and Viewer (read-only) roles
- **Insights** - Spending patterns, monthly comparisons, and quick stats
- **Responsive Design** - Works seamlessly on all screen sizes
- **Smooth Animations** - Subtle transitions and micro-interactions

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **State Management:** React Context API
- **Language:** TypeScript

## Design System

### Color Palette
- Primary: Deep Slate `#0F172A`
- Accent: Indigo `#6366F1`
- Success: Emerald `#10B981`
- Danger: Rose `#F43F5E`
- Background: Soft White `#F8FAFC`

### Typography
- Font Family: Inter
- Consistent spacing and sizing throughout

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/        (Card, Button, Badge, Input, Select)
│   │   ├── dashboard/    (SummaryCards, BalanceChart, SpendingChart, Insights)
│   │   ├── transactions/ (TransactionList, TransactionItem, TransactionFilters, TransactionForm)
│   │   └── layout/       (Sidebar, Header, Layout)
│   ├── context/          (AppContext, types)
│   ├── data/             (mockData.ts)
│   ├── services/         (api.ts)
│   ├── hooks/            (useTransactions.ts)
│   ├── pages/            (Dashboard, Transactions)
│   └── utils/            (formatters, calculations)
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Components

### Dashboard
- **SummaryCards** - Four metric cards (Balance, Income, Expenses, Savings Rate)
- **BalanceChart** - Area chart showing 4-month balance trend
- **SpendingChart** - Donut chart for category breakdown
- **Insights** - Quick stats and top transactions

### Transactions
- **TransactionList** - Paginated list with modern card-style items
- **TransactionFilters** - Search, category, type, and sort filters
- **TransactionForm** - Modal form for adding/editing transactions

### Layout
- **Sidebar** - Navigation with collapsible mobile state
- **Header** - Role switcher, notifications, user avatar

## Role-Based UI

### Viewer Role
- View-only access to dashboard and transactions
- Can filter and sort data
- Cannot add, edit, or delete transactions

### Admin Role
- Full access to all features
- Can add new transactions via form
- Can edit existing transactions
- Can delete transactions

## State Management

The application uses React Context API with `useReducer` for state management:

- **Transactions** - CRUD operations with mock API
- **Filters** - Search, category, type, date range, pagination
- **Role** - Admin/Viewer toggle (persisted to localStorage)

## Mock Data

The application includes 35+ sample transactions spanning 3 months with various categories including:
- Food & Dining
- Transport
- Shopping
- Bills & Utilities
- Entertainment
- Salary
- Investment

## Responsive Breakpoints

- **Mobile** (< 640px): Single column, collapsed sidebar
- **Tablet** (640-1024px): 2-column grid, mini sidebar
- **Desktop** (> 1024px): Full layout, expanded sidebar

## Animation & Interactions

- Staggered card animations on page load
- Hover effects with lift and shadow changes
- Smooth transitions on all interactive elements
- Custom scrollbars
- Modal scale-in animation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT# Finance-Dashboard
# Finance-Dashboard
