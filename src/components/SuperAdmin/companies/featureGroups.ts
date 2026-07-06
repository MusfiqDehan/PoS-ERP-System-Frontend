/**
 * Mirror of the backend TENANT_REGISTRY for feature selection UI.
 * Keep in sync with Sortorium_Backend/apps/tenancy/feature_registry.py.
 */

export type FeatureItem = { key: string; name: string };
export type FeatureGroup = { group: string; children: FeatureItem[] };

export const TENANT_FEATURE_GROUPS: FeatureGroup[] = [
  {
    group: "Core",
    children: [
      { key: "dashboard", name: "Dashboard" },
      { key: "pos", name: "Point of Sale" },
      { key: "orders", name: "Orders" },
    ],
  },
  {
    group: "Inventory",
    children: [
      { key: "products", name: "Products" },
      { key: "add_product", name: "Create Product" },
      { key: "expired_products", name: "Expired Products" },
      { key: "low_stocks", name: "Low Stocks" },
      { key: "categories", name: "Category" },
      { key: "sub_categories", name: "Sub Category" },
      { key: "brands", name: "Brands" },
      { key: "units", name: "Units" },
      { key: "variant_attributes", name: "Variant Attributes" },
      { key: "warranties", name: "Warranties" },
      { key: "barcodes", name: "Print Barcode" },
      { key: "qrcodes", name: "Print QR Code" },
    ],
  },
  {
    group: "Stock",
    children: [
      { key: "manage_stocks", name: "Manage Stock" },
      { key: "stock_adjustment", name: "Stock Adjustment" },
      { key: "stock_transfer", name: "Stock Transfer" },
    ],
  },
  {
    group: "Sales",
    children: [
      { key: "online_orders", name: "Online Orders" },
      { key: "pos_orders", name: "POS Orders" },
      { key: "invoices", name: "Invoices" },
      { key: "sales_returns", name: "Sales Return" },
      { key: "quotations", name: "Quotation" },
    ],
  },
  {
    group: "Promo",
    children: [
      { key: "coupons", name: "Coupons" },
      { key: "gift_cards", name: "Gift Cards" },
      { key: "discounts", name: "Discount" },
    ],
  },
  {
    group: "Purchases",
    children: [
      { key: "purchases", name: "Purchases" },
      { key: "purchase_orders", name: "Purchase Order" },
      { key: "purchase_returns", name: "Purchase Return" },
    ],
  },
  {
    group: "Finance",
    children: [
      { key: "expenses", name: "Expenses" },
      { key: "income", name: "Income" },
      { key: "bank_accounts", name: "Bank Accounts" },
      { key: "money_transfer", name: "Money Transfer" },
      { key: "balance_sheet", name: "Balance Sheet" },
      { key: "trial_balance", name: "Trial Balance" },
      { key: "cash_flow", name: "Cash Flow" },
      { key: "account_statement", name: "Account Statement" },
    ],
  },
  {
    group: "People",
    children: [
      { key: "customers", name: "Customers" },
      { key: "billers", name: "Billers" },
      { key: "suppliers", name: "Suppliers" },
      { key: "stores", name: "Stores" },
      { key: "warehouses", name: "Warehouses" },
    ],
  },
  {
    group: "HRM",
    children: [
      { key: "employees", name: "Employees" },
      { key: "departments", name: "Departments" },
      { key: "designations", name: "Designations" },
      { key: "shifts", name: "Shifts" },
      { key: "attendance", name: "Attendance" },
      { key: "leaves", name: "Leaves" },
      { key: "holidays", name: "Holidays" },
      { key: "payroll", name: "Payroll" },
    ],
  },
  {
    group: "Reports",
    children: [
      { key: "sales_report", name: "Sales Report" },
      { key: "purchase_report", name: "Purchase Report" },
      { key: "inventory_report", name: "Inventory Report" },
      { key: "invoice_report", name: "Invoice Report" },
      { key: "supplier_report", name: "Supplier Report" },
      { key: "customer_report", name: "Customer Report" },
      { key: "product_report", name: "Product Report" },
      { key: "expense_report", name: "Expense Report" },
      { key: "income_report", name: "Income Report" },
      { key: "tax_report", name: "Tax Report" },
      { key: "profit_loss", name: "Profit & Loss" },
      { key: "annual_report", name: "Annual Report" },
    ],
  },
  {
    group: "User Management",
    children: [
      { key: "users", name: "Users" },
      { key: "user_management", name: "Delete Account Request" },
    ],
  },
  {
    group: "Billing",
    children: [{ key: "billing", name: "Billing" }],
  },
  {
    group: "Settings",
    children: [
      { key: "general_settings", name: "General Settings" },
      { key: "website_settings", name: "Website Settings" },
      { key: "app_settings", name: "App Settings" },
      { key: "system_settings", name: "System Settings" },
      { key: "financial_settings", name: "Financial Settings" },
    ],
  },
  {
    group: "Administration",
    children: [{ key: "permissions", name: "Permissions" }],
  },
];

export function allFeatureKeys(): string[] {
  return TENANT_FEATURE_GROUPS.flatMap((g) => g.children.map((c) => c.key));
}
