# API Contract — GeekPOS (Django DRF ↔ Next.js)

The frontend already renders these exact shapes from `src/core/json/*`. **Build the DRF serializers to return the same field names**, and the existing antd table columns (`dataIndex`) barely change — that's the whole acceleration strategy.

> Derived by reading the actual fixtures. Field names are **verbatim from the fixtures** (inclhttps://github.com/GeekSSort/geekpos_frontend.gituding quirks/typos like `creadedon`, `Valitidy`, `customer_image`) so the UI needs no column renames. Fix typos later via a serializer `source=` if desired, but ship matching first.

---

## Global conventions (apply to EVERY endpoint)

| Concern                            | Rule                                                                                                                                                                         |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base path                          | `/api/v1/`                                                                                                                                                                   |
| Auth                               | `Authorization: Bearer <JWT>` (SimpleJWT) on all but `/auth/login`, `/auth/refresh`                                                                                          |
| Tenancy                            | every model has a `tenant` FK; a base ViewSet auto-scopes querysets by `request.tenant` (resolved from `X-Tenant` header, **never** trust a spoofed value — see TC-AUTH-011) |
| List shape                         | DRF `PageNumberPagination` → `{ count, next, previous, results: [...] }`                                                                                                     |
| Query params                       | `?search=`, `?ordering=`, `?page=`, `?page_size=` + per-field filters (`django-filter`)                                                                                      |
| CRUD verbs                         | `GET /x/` list · `POST /x/` create · `GET/PUT/PATCH/DELETE /x/{id}/` detail                                                                                                  |
| `id`                               | server PK (int or uuid) — fixtures mix string/number; standardize to one                                                                                                     |
| **currency-string** (`"$550"`)     | model `DecimalField`; **return a number**, let the FE format `$`. (Or return formatted string short-term to change nothing.)                                                 |
| **image-path** (`"assets/img/.."`) | `FileField`/`URLField` → return absolute media URL                                                                                                                           |
| **date** (`"19 Jan 2023"`)         | `DateField`/`DateTimeField` → return ISO 8601; FE formats                                                                                                                    |
| **status-enum**                    | `CharField(choices=...)`                                                                                                                                                     |
| string FKs                         | `category`/`brand`/`unit`/`supplier` are strings in fixtures → model as **FK**, serialize the display name to keep the field shape                                           |

---

## 1. Auth & Tenancy _(not fixture-backed — build fresh)_

| Endpoint          | Method | Returns                                          |
| ----------------- | ------ | ------------------------------------------------ |
| `/auth/login/`    | POST   | `{ access, refresh, user, tenant }`              |
| `/auth/refresh/`  | POST   | `{ access }`                                     |
| `/auth/logout/`   | POST   | 204                                              |
| `/auth/me/`       | GET    | current user + tenant                            |
| tenant resolution | —      | middleware: subdomain → `Tenant`; scope all data |

## 2. Inventory

| Resource                   | Endpoint                            | Fields (verbatim)                                                                                                                                                             |
| -------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Products                   | `/products/`                        | `id, product, productImage, sku, category(FK), brand(FK), price$, unit(FK), qty, createdby, img`                                                                              |
| ↳ alt shape `ProductsData` | (same model)                        | `image, SKU, Product_Name, Category, Brand, Price$, Unit, Qty, Created_By` — **same Product entity**; expose via second serializer or rename in UI. Consolidate to ONE model. |
| Categories                 | `/categories/`                      | `id, category, categoryslug, createdon, status`                                                                                                                               |
| Sub-categories             | `/subcategories/`                   | `id, img, category, parentcategory(FK), categorycode, description, status`                                                                                                    |
| Brands                     | `/brands/`                          | `id, brand, logo, createdon, status`                                                                                                                                          |
| Units                      | `/units/`                           | `id, unit, shortname, noofproducts, createdon, status`                                                                                                                        |
| Variant attributes         | `/variant-attributes/`              | `id, variant, values, createdon, status`                                                                                                                                      |
| Warranties                 | `/warranties/`                      | `id, name, description, duration, status`                                                                                                                                     |
| Barcodes                   | `/products/barcodes/`               | `product, sku, code, qty`                                                                                                                                                     |
| Low stock                  | `/products/low-stock/` _(computed)_ | `img, warehouse, store, product, category, sku, qty, qtyalert`                                                                                                                |
| Expired                    | `/products/expired/` _(computed)_   | `img, product, sku, manufactureddate, expireddate`                                                                                                                            |

## 3. Stock

| Resource       | Endpoint            | Fields                                                                                                        |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| Manage stock   | `/stock/`           | `id, Warehouse, Shop, Product{Name,Image}, Date, Person{Name,Image}, Quantity`                                |
| Stock transfer | `/stock-transfers/` | `fromWarehouse, toWarehouse, noOfProducts, quantityTransferred, refNumber, date`                              |
| Stock history  | `/stock/history/`   | `SKU, Product_Name, img, Initial_Quantity, Added_Quantity, Sold_Quantity, Defective_Quantity, Final_Quantity` |
| Sold stock     | `/stock/sold/`      | `SKU, Product_Name, img, Unit, Quantity, Tax_Value$, Total$`                                                  |

## 4. People

| Resource   | Endpoint       | Fields                                                                                   |
| ---------- | -------------- | ---------------------------------------------------------------------------------------- |
| Customers  | `/customers/`  | `id, CustomerName, Code, Customer, Email, Phone, Country` (+ `image, status`)            |
| Suppliers  | `/suppliers/`  | `id, supplierName, code, email, phone, country, image, status`                           |
| Billers    | `/billers/`    | `id, Code, Biller, Company_Name, Email, Phone, Phone_2, Country, image`                  |
| Warehouses | `/warehouses/` | `id, warehouse, contactPerson, phone, totalProducts, stock, qty, createdOn, status, img` |

## 5. POS _(transactional — builds on Products + Customers)_

| Endpoint                   | Method         | Notes                                                                                     |
| -------------------------- | -------------- | ----------------------------------------------------------------------------------------- |
| `/products/`               | GET            | product grid (reuse Inventory)                                                            |
| `/pos/checkout/`           | POST           | cart items + customer + payment + discount + tax → creates an **Order**; decrements Stock |
| `/pos/hold/`, `/pos/void/` | POST           | held/void orders                                                                          |
| POS orders (`OrdersData`)  | `/orders/` GET | `id, image, Order_ID, Customer, Payment_Type, Amount$, Date_Time, Status`                 |

## 6. Sales

| Resource      | Endpoint          | Fields                                                                                           |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| Sales         | `/sales/`         | `customerName, reference, date, status, grandTotal$, paid$, due$, paymentStatus, biller`         |
| Online orders | `/online-orders/` | `customer, image, reference, date, status, total$, paid$, due$, paymentstatus, biller`           |
| Invoices      | `/invoices/`      | `invoiceno, image, customer, duedate, amount$, paid$, amountdue$, status`                        |
| Quotations    | `/quotations/`    | `Product_image, Product_Name, Custmer_Image, Custmer_Name, Status, Total$`                       |
| Sales returns | `/sales-returns/` | `img, productname, date, customer, customer_image, status, grandtotal, paid, due, paymentstatus` |

## 7. Purchases

| Resource         | Endpoint              | Fields                                                                         |
| ---------------- | --------------------- | ------------------------------------------------------------------------------ |
| Purchases        | `/purchases/`         | `supplierName, reference, date, status, grandTotal$, paid$, due$, createdBy`   |
| Purchase returns | `/purchase-returns/`  | `img, date, supplier, reference, status, grandTotal, paid, due, paymentStatus` |
| Purchase report  | `/reports/purchases/` | `img, productName, productAmount$, productQty, instockQty`                     |

## 8. Promo

| Resource       | Endpoint           | Fields                                                                         |
| -------------- | ------------------ | ------------------------------------------------------------------------------ |
| Coupons        | `/coupons/`        | `Name, Code, Description, Type, Discount, Limit, Valid(date), Status`          |
| Gift cards     | `/gift-cards/`     | `GiftCard, Customer, IssuedDate, ExpiryDate, Amount$, Balance$, Status, Image` |
| Discounts      | `/discounts/`      | `Name, Value, DiscountPlan(FK), Valitidy, Days, Products, Status`              |
| Discount plans | `/discount-plans/` | `PlanName, Customers, Status`                                                  |

## 9. Finance & Accounts

| Resource           | Endpoint                  | Fields                                                                                              |
| ------------------ | ------------------------- | --------------------------------------------------------------------------------------------------- |
| Accounts           | `/accounts/`              | `accountholder, accountno, type, balance$, note, status`                                            |
| Account types      | `/account-types/`         | `Type, Created_Date, Status`                                                                        |
| Account statement  | `/accounts/statement/`    | `Reference_Number, Date, Category, Description, Amount, Transaction_Type, Balance$`                 |
| Balance sheet      | `/reports/balance-sheet/` | `Name, Bank_Account, Credit$, Debit, Balance$`                                                      |
| Cash flow          | `/reports/cash-flow/`     | `Date, Bank_Account, Description, Credit$, Debit, Account_balance$, Total_Balance$, Payment_Method` |
| Money transfers    | `/money-transfers/`       | `Date, Reference_Number, From_Account, To_Account, Amount$`                                         |
| Income             | `/income/`                | `Reference, Date, Store, Category, Notes, Amount$, Payment_Method`                                  |
| Income categories  | `/income-categories/`     | `Code, Category, Added_Date`                                                                        |
| Expenses           | `/expenses/`              | `categoryName, reference, date, status, amount$, description`                                       |
| Expense categories | `/expense-categories/`    | `status, categoryName, description`                                                                 |

## 10. HRM

| Resource           | Endpoint          | Fields                                                                                         |
| ------------------ | ----------------- | ---------------------------------------------------------------------------------------------- |
| Employees          | `/employees/`     | `img, ID, Employee, Designation(FK), Email, Phone, Shift(FK), Status`                          |
| Departments        | `/departments/`   | `department, img, hod, members, totalmembers, creadedon, status`                               |
| Designations       | `/designations/`  | `designation, members, createdon, totalmembers, status`                                        |
| Shifts             | `/shifts/`        | `shiftname, time, weekoff, createdon, status`                                                  |
| Attendance (admin) | `/attendance/`    | `Employee, image, Role, Status, Clock_In, Clock_Out, Production, Break, Overtime, Total_Hours` |
| Attendance (me)    | `/attendance/me/` | `date, clockin, clockout, production, break, overtime, status, totalhours`                     |
| Leaves             | `/leaves/`        | `empname, empid, type, fromdate, todate, days, shift, appliedon, status`                       |
| Leave types        | `/leave-types/`   | `name, leavequota, createdon, status`                                                          |
| Payroll            | `/payroll/`       | `name, role, email, salary$, status, image`                                                    |

## 11. Reports _(read-only; mostly aggregations/filters of core models)_

| Report       | Endpoint                  | Fields                                                                              |
| ------------ | ------------------------- | ----------------------------------------------------------------------------------- |
| Sales        | `/reports/sales/`         | `img, productName, sku, category, brand, soldQty, soldAmount$, instockQty`          |
| Customers    | `/reports/customers/`     | `Reference, Code, Customer, image, Total_Orders, Amount$, Payment_Method, Status`   |
| Customer due | `/reports/customers/due/` | _(same as customers)_                                                               |
| Suppliers    | `/reports/suppliers/`     | `Reference, ID, Supplier, image, Total_Items, Amount$, Payment_Method, Status`      |
| Supplier due | `/reports/suppliers/due/` | _(same)_                                                                            |
| Expenses     | `/reports/expenses/`      | `Expense_Name, Category, Description, Date, Amount$, Status`                        |
| Tax          | `/reports/tax/`           | `Reference, Supplier, Date, Store, Amount$, Payment_Method, Discount$, Tax_Amount$` |
| Products     | `/reports/products/`      | `SKU, Product_Name, image, Category, Brand, Qty, Price$, Total_Ordered, Revenue$`   |
| Best sellers | `/reports/best-sellers/`  | `SKU, Product_Name, img, Brand, Category, Sold_Qty, Sold_Amount$, Instock_Qty`      |

## 12. Dashboard _(aggregations)_

`/dashboard/summary/` (KPI cards) · `/dashboard/recent-sales/` (`orderdetails, payment, status, amount$`) · `/dashboard/recent-products/` · charts data.

## 13. User Management

| Resource            | Endpoint                    | Fields                                                     |
| ------------------- | --------------------------- | ---------------------------------------------------------- |
| Users               | `/users/`                   | `img, username, phone, email, role(FK), createdon, status` |
| Roles & permissions | `/roles/`                   | `rolename, createdon` (+ permission matrix)                |
| Deletion requests   | `/users/deletion-requests/` | `img, username, requisitiondate, deleterequisitiondate`    |

## 14. Settings

| Resource      | Endpoint                   | Fields                                                     |
| ------------- | -------------------------- | ---------------------------------------------------------- |
| Tax rates     | `/settings/tax-rates/`     | `name, taxRate, createdOn`                                 |
| Currencies    | `/settings/currencies/`    | `name, code, symbol, exchangeRate, createdOn`              |
| Languages     | `/settings/languages/`     | `language, code, rtl, total, done, progress, status, flag` |
| Custom fields | `/settings/custom-fields/` | `module, label, type, defaultValue, required, status`      |

## 15. Superadmin _(POST-LAUNCH BACKLOG — manage via Django admin for v1)_

Companies (`companies_details`), Domains (`domain_details`), Packages (`package_list`), Subscriptions (`subscription_details`), Purchase transactions (`purchase_transaction`). Note `domain_details` ≡ `subscription_details` ≡ `purchase_transaction` shape — one `Subscription` model serves all three screens.

---

## Modeling notes for the backend team

1. **Consolidate duplicates:** `productlistdata`↔`ProductsData` = one **Product**. `domain_details`↔`subscription_details`↔`purchase_transaction` = one **Subscription**. `customerreportdata`↔`customerduereportdata` = same data, `?due=true` filter.
2. **Reports are NOT new models** — they're `?ordering`/aggregation views over Products/Sales/Purchases/Expenses. Build core models first; reports fall out.
3. **String→FK:** `category, brand, unit, supplier, customer, designation, shift, role, DiscountPlan, parentcategory` are display strings in fixtures but must be FKs; serialize the name to keep the field shape.
4. **Stock is derived + mutated:** decrement on POS checkout / Sales, increment on Purchases. `low-stock`, `sold-stock`, `stock-history` are computed views.
5. **Keep field names verbatim first** (even typos) so the FE import-swap is mechanical; clean up names in a later pass via serializer `source=`.
6. **Build order = the priority list:** Auth → Products+Categories+Brands+Units → Customers/Suppliers → POS/Orders → Sales/Invoices → Stock → Purchases → … (Superadmin last/ backlog).
