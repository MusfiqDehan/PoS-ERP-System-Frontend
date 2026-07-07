/**
 * Maps frontend route paths to backend feature keys and required permission levels.
 * Covers both tenant and platform routes.
 *
 * When a route is not listed here it is treated as unrestricted (any authenticated
 * user may access it).  Add an entry whenever a new page is created.
 */

import type { PermissionLevel } from "@/hooks/usePermission";

export type RoutePermission = {
  featureKey: string;
  level: PermissionLevel;
};

export const ROUTE_PERMISSIONS: Record<string, RoutePermission> = {
  // ── Core ──────────────────────────────────────────────────────────────
  "/admin-dashboard": { featureKey: "dashboard", level: "view" },
  "/sales-dashboard": { featureKey: "dashboard", level: "view" },
  "/dashboard": { featureKey: "dashboard", level: "view" },
  "/pos": { featureKey: "pos", level: "edit" },
  "/pos-2": { featureKey: "pos", level: "edit" },
  "/pos-3": { featureKey: "pos", level: "edit" },
  "/pos-4": { featureKey: "pos", level: "edit" },
  "/pos-5": { featureKey: "pos", level: "edit" },
  "/orders": { featureKey: "orders", level: "view" },

  // ── Inventory ─────────────────────────────────────────────────────────
  "/product-list": { featureKey: "products", level: "view" },
  "/product-details": { featureKey: "products", level: "view" },
  "/edit-product": { featureKey: "products", level: "edit" },
  "/add-product": { featureKey: "add_product", level: "edit" },
  "/expired-products": { featureKey: "expired_products", level: "view" },
  "/low-stocks": { featureKey: "low_stocks", level: "view" },
  "/category-list": { featureKey: "categories", level: "view" },
  "/sub-categories": { featureKey: "sub_categories", level: "view" },
  "/brand-list": { featureKey: "brands", level: "view" },
  "/units": { featureKey: "units", level: "view" },
  "/variant-attributes": { featureKey: "variant_attributes", level: "view" },
  "/warranty": { featureKey: "warranties", level: "view" },
  "/barcode": { featureKey: "barcodes", level: "view" },
  "/qrcode": { featureKey: "qrcodes", level: "view" },

  // ── Stock ─────────────────────────────────────────────────────────────
  "/manage-stocks": { featureKey: "manage_stocks", level: "view" },
  "/stock-adjustment": { featureKey: "stock_adjustment", level: "view" },
  "/stock-transfer": { featureKey: "stock_transfer", level: "view" },

  // ── Sales ─────────────────────────────────────────────────────────────
  "/online-orders": { featureKey: "online_orders", level: "view" },
  "/pos-orders": { featureKey: "pos_orders", level: "view" },
  "/invoice": { featureKey: "invoices", level: "view" },
  "/invoice-details": { featureKey: "invoices", level: "view" },
  "/sales-returns": { featureKey: "sales_returns", level: "view" },
  "/quotation-list": { featureKey: "quotations", level: "view" },

  // ── Promo ─────────────────────────────────────────────────────────────
  "/coupons": { featureKey: "coupons", level: "view" },
  "/gift-cards": { featureKey: "gift_cards", level: "view" },
  "/discount": { featureKey: "discounts", level: "view" },
  "/discount-plan": { featureKey: "discounts", level: "view" },

  // ── Purchases ─────────────────────────────────────────────────────────
  "/purchase-list": { featureKey: "purchases", level: "view" },
  "/purchase-order-report": { featureKey: "purchase_orders", level: "view" },
  "/purchase-returns": { featureKey: "purchase_returns", level: "view" },

  // ── Finance & Accounts ────────────────────────────────────────────────
  "/expense-list": { featureKey: "expenses", level: "view" },
  "/expense-category": { featureKey: "expenses", level: "view" },
  "/income": { featureKey: "income", level: "view" },
  "/income-category": { featureKey: "income", level: "view" },
  "/account-list": { featureKey: "bank_accounts", level: "view" },
  "/money-transfer": { featureKey: "money_transfer", level: "view" },
  "/balance-sheet": { featureKey: "balance_sheet", level: "view" },
  "/trial-balance": { featureKey: "trial_balance", level: "view" },
  "/cash-flow": { featureKey: "cash_flow", level: "view" },
  "/account-statement": { featureKey: "account_statement", level: "view" },

  // ── People ────────────────────────────────────────────────────────────
  "/customers": { featureKey: "customers", level: "view" },
  "/billers": { featureKey: "billers", level: "view" },
  "/suppliers": { featureKey: "suppliers", level: "view" },
  "/branch-list": { featureKey: "branches", level: "view" },
  "/warehouse": { featureKey: "warehouses", level: "view" },

  // ── HRM ───────────────────────────────────────────────────────────────
  "/employees-grid": { featureKey: "employees", level: "view" },
  "/employees-list": { featureKey: "employees", level: "view" },
  "/add-employee": { featureKey: "employees", level: "edit" },
  "/edit-employee": { featureKey: "employees", level: "edit" },
  "/employee-details": { featureKey: "employees", level: "view" },
  "/department-grid": { featureKey: "departments", level: "view" },
  "/department-list": { featureKey: "departments", level: "view" },
  "/designation": { featureKey: "designations", level: "view" },
  "/shift": { featureKey: "shifts", level: "view" },
  "/attendance-employee": { featureKey: "attendance", level: "view" },
  "/attendance-admin": { featureKey: "attendance", level: "view" },
  "/leaves-employee": { featureKey: "leaves", level: "view" },
  "/leaves-admin": { featureKey: "leaves", level: "view" },
  "/leave-types": { featureKey: "leaves", level: "view" },
  "/holidays": { featureKey: "holidays", level: "view" },
  "/employee-salary": { featureKey: "payroll", level: "view" },
  "/payslip": { featureKey: "payroll", level: "view" },

  // ── Reports ───────────────────────────────────────────────────────────
  "/sales-report": { featureKey: "sales_report", level: "view" },
  "/best-seller": { featureKey: "sales_report", level: "view" },
  "/purchase-report": { featureKey: "purchase_report", level: "view" },
  "/inventory-report": { featureKey: "inventory_report", level: "view" },
  "/stock-history": { featureKey: "inventory_report", level: "view" },
  "/sold-stock": { featureKey: "inventory_report", level: "view" },
  "/invoice-report": { featureKey: "invoice_report", level: "view" },
  "/supplier-report": { featureKey: "supplier_report", level: "view" },
  "/supplier-due-report": { featureKey: "supplier_report", level: "view" },
  "/customer-report": { featureKey: "customer_report", level: "view" },
  "/customer-due-report": { featureKey: "customer_report", level: "view" },
  "/product-report": { featureKey: "product_report", level: "view" },
  "/product-expiry-report": { featureKey: "product_report", level: "view" },
  "/product-quantity-report": { featureKey: "product_report", level: "view" },
  "/expense-report": { featureKey: "expense_report", level: "view" },
  "/income-report": { featureKey: "income_report", level: "view" },
  "/tax-report": { featureKey: "tax_report", level: "view" },
  "/profit-loss-report": { featureKey: "profit_loss", level: "view" },
  "/annual-report": { featureKey: "annual_report", level: "view" },

  // ── User Management ──────────────────────────────────────────────────
  "/users": { featureKey: "users", level: "view" },
  "/roles-permissions": { featureKey: "permissions", level: "view" },
  "/permissions": { featureKey: "permissions", level: "view" },
  "/delete-account": { featureKey: "user_management", level: "view" },

  // ── Billing ───────────────────────────────────────────────────────────
  "/billing": { featureKey: "billing", level: "view" },

  // ── Settings ──────────────────────────────────────────────────────────
  "/general-settings": { featureKey: "general_settings", level: "view" },
  "/security-settings": { featureKey: "general_settings", level: "view" },
  "/notification": { featureKey: "general_settings", level: "view" },
  "/connected-apps": { featureKey: "general_settings", level: "view" },
  "/system-settings": { featureKey: "website_settings", level: "view" },
  "/company-settings": { featureKey: "website_settings", level: "view" },
  "/localization-settings": { featureKey: "website_settings", level: "view" },
  "/prefixes": { featureKey: "website_settings", level: "view" },
  "/preference": { featureKey: "website_settings", level: "view" },
  "/appearance": { featureKey: "website_settings", level: "view" },
  "/social-authentication": { featureKey: "website_settings", level: "view" },
  "/language-settings": { featureKey: "website_settings", level: "view" },
  "/invoice-settings": { featureKey: "app_settings", level: "view" },
  "/invoice-template": { featureKey: "app_settings", level: "view" },
  "/printer-settings": { featureKey: "app_settings", level: "view" },
  "/pos-settings": { featureKey: "pos", level: "view" },
  "/custom-fields": { featureKey: "app_settings", level: "view" },
  "/email-settings": { featureKey: "system_settings", level: "view" },
  "/email-template": { featureKey: "system_settings", level: "view" },
  "/sms-gateway": { featureKey: "system_settings", level: "view" },
  "/sms-settings": { featureKey: "system_settings", level: "view" },
  "/sms-templates": { featureKey: "system_settings", level: "view" },
  "/otp-settings": { featureKey: "system_settings", level: "view" },
  "/gdpr-settings": { featureKey: "system_settings", level: "view" },
  "/payment-gateway-settings": { featureKey: "financial_settings", level: "view" },
  "/bank-settings-grid": { featureKey: "financial_settings", level: "view" },
  "/bank-settings-list": { featureKey: "financial_settings", level: "view" },
  "/tax-rates": { featureKey: "financial_settings", level: "view" },
  "/currency-settings": { featureKey: "financial_settings", level: "view" },
  "/storage-settings": { featureKey: "general_settings", level: "view" },
  "/ban-ip-address": { featureKey: "general_settings", level: "view" },

  // ── Platform ──────────────────────────────────────────────────────────
  "/vendor-dashboard": { featureKey: "platform.dashboard", level: "view" },
  "/companies": { featureKey: "platform.tenants", level: "view" },
  "/subscription": { featureKey: "platform.subscriptions", level: "view" },
  "/packages": { featureKey: "platform.packages", level: "view" },
  "/software-products": { featureKey: "platform.products", level: "view" },
  "/domain": { featureKey: "platform.domain", level: "view" },
  "/invoices": { featureKey: "platform.invoices", level: "view" },

  // ── Platform CMS ─────────────────────────────────────────────────────
  "/pages": { featureKey: "platform.pages", level: "view" },
  "/all-blog": { featureKey: "platform.blogs", level: "view" },
  "/blog-tag": { featureKey: "platform.blogs", level: "view" },
  "/blog-categories": { featureKey: "platform.blogs", level: "view" },
  "/blog-comments": { featureKey: "platform.blogs", level: "view" },
  "/blog-details": { featureKey: "platform.blogs", level: "view" },
  "/countries": { featureKey: "platform.locations", level: "view" },
  "/states": { featureKey: "platform.locations", level: "view" },
  "/cities": { featureKey: "platform.locations", level: "view" },
  "/testimonials": { featureKey: "platform.testimonials", level: "view" },
  "/faq": { featureKey: "platform.faq", level: "view" },
};

/** Look up the permission requirement for a given pathname. */
export function getRoutePermission(pathname: string): RoutePermission | null {
  return ROUTE_PERMISSIONS[pathname] ?? null;
}
