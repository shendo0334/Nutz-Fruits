# architecture.md — Technical & Data Schema

**Project:** Nuts & Fruits E-Commerce Website
**Document:** `architecture.md`
**Version:** 1.0
**Status:** Initial Architecture
**Last Updated:** 2026-09-24

---

# 1. Purpose

This document defines the technical architecture of the Nuts & Fruits e-commerce platform.

It describes:

* Application architecture
* Frontend architecture
* Backend architecture
* Database architecture
* Data models
* API structure
* Authentication
* Payment flow
* File/image storage
* AWS infrastructure
* Security
* Environment configuration
* Deployment
* Project folder structure
* Scalability considerations

The architecture must support the requirements defined in `prd.md`.

---

# 2. Architecture Goals

The system should be:

* Maintainable
* Secure
* Scalable
* Fast
* SEO-friendly
* Mobile-friendly
* Easy to test
* Easy to deploy
* Easy for developers to understand

The architecture should avoid unnecessary complexity during the MVP.

---

# 3. High-Level Architecture

The application follows a layered web architecture.

```text
                         ┌──────────────────────┐
                         │       Customer       │
                         │  Mobile / Desktop    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      CloudFront      │
                         │        CDN           │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  │                                   │
                  ▼                                   ▼
        ┌──────────────────┐                ┌──────────────────┐
        │    Frontend      │                │ Static Assets    │
        │   Web App / SSR  │                │ Images / Files   │
        └────────┬─────────┘                └────────┬─────────┘
                 │                                   │
                 │ API Requests                      │
                 ▼                                   ▼
        ┌──────────────────────────────────────────────────┐
        │                     Backend                      │
        │                                                   │
        │ Authentication │ Products │ Cart │ Orders        │
        │ Payments │ Customers │ Inventory │ Admin         │
        └───────────────────────┬──────────────────────────┘
                                │
              ┌─────────────────┼──────────────────┐
              │                 │                  │
              ▼                 ▼                  ▼
       ┌─────────────┐   ┌─────────────┐   ┌──────────────┐
       │  Database   │   │    Cache    │   │  File Store  │
       │ PostgreSQL  │   │    Redis    │   │     S3       │
       └─────────────┘   └─────────────┘   └──────────────┘
                               
                                │
                 ┌──────────────┼──────────────┐
                 ▼              ▼              ▼
           ┌──────────┐   ┌──────────┐   ┌──────────┐
           │ Payment  │   │  Email   │   │ Analytics│
           │ Gateway  │   │ Service  │   │          │
           └──────────┘   └──────────┘   └──────────┘
```

---

# 4. Recommended Technology Stack

The project should use a modern TypeScript-based stack.

## 4.1 Frontend

Recommended:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Component-based UI architecture

Next.js should handle:

* Page rendering
* Routing
* SEO
* Server-side rendering where required
* Static generation where appropriate
* Frontend application logic

---

# 5. Backend

The backend should provide:

* REST API or server-side API routes
* Authentication
* Product operations
* Cart operations
* Order processing
* Payment verification
* Inventory management
* Customer management
* Admin operations

Recommended approach:

```text
Next.js Application
        │
        ├── Server Components
        ├── Server Actions / API
        └── Backend Services
```

If backend complexity grows significantly, services can later be separated into an independent backend application.

The MVP should avoid splitting the system into microservices prematurely.

---

# 6. Programming Language

The primary programming language should be:

**TypeScript**

TypeScript should be used for:

* Frontend
* Backend
* API types
* Validation schemas
* Shared data types
* Utility functions

Benefits:

* Type safety
* Better developer tooling
* Reduced runtime errors
* Easier refactoring
* Shared types between frontend and backend

---

# 7. Database

## Recommended Database

**PostgreSQL**

PostgreSQL should be the primary relational database.

It is responsible for storing:

* Customers
* Addresses
* Products
* Categories
* Product variants
* Inventory
* Orders
* Order items
* Payments
* Coupons
* Promotions
* Wishlist
* Reviews

---

# 8. ORM

A TypeScript-compatible ORM should be used.

Recommended options:

* Prisma
* Drizzle ORM

The project should select **one ORM** and use it consistently.

For this architecture:

**Prisma is the default recommendation.**

---

# 9. Database Architecture

The database follows a relational model.

```text
User
 │
 ├── Addresses
 ├── Orders
 └── Wishlist
       │
       ▼
     Product

Category
   │
   ▼
Product
   │
   ├── ProductVariant
   │       │
   │       └── Inventory
   │
   └── ProductImage

Order
   │
   ├── OrderItem
   │       │
   │       └── ProductVariant
   │
   └── Payment
```

---

# 10. Core Database Entities

The initial database should contain the following entities:

```text
User
Address
Category
Product
ProductVariant
ProductImage
Inventory
Cart
CartItem
Order
OrderItem
Payment
Wishlist
WishlistItem
Coupon
Promotion
Review
```

Additional tables may be introduced when required.

---

# 11. User Schema

## User

Represents a customer or administrator.

```text
User
--------------------------------
id
name
email
phone
passwordHash
role
status
createdAt
updatedAt
```

### Fields

| Field        | Type     | Description      |
| ------------ | -------- | ---------------- |
| id           | UUID     | Unique user ID   |
| name         | String   | Customer name    |
| email        | String   | Email address    |
| phone        | String   | Phone number     |
| passwordHash | String   | Hashed password  |
| role         | Enum     | CUSTOMER / ADMIN |
| status       | Enum     | ACTIVE / BLOCKED |
| createdAt    | DateTime | Creation time    |
| updatedAt    | DateTime | Last update      |

---

# 12. Address Schema

```text
Address
--------------------------------
id
userId
name
phone
addressLine1
addressLine2
city
state
postalCode
country
isDefault
createdAt
updatedAt
```

Relationship:

```text
User 1 ──────── * Address
```

One user can have multiple addresses.

---

# 13. Category Schema

```text
Category
--------------------------------
id
name
slug
description
image
parentId
isActive
sortOrder
createdAt
updatedAt
```

Categories should support hierarchical relationships.

Example:

```text
Dry Fruits
├── Almonds
├── Cashews
└── Pistachios
```

Relationship:

```text
Category
   │
   └── Category
        └── Category
```

This allows unlimited category depth if required.

---

# 14. Product Schema

```text
Product
--------------------------------
id
categoryId
name
slug
description
shortDescription
brand
origin
ingredients
nutritionInfo
storageInfo
shelfLife
isActive
isFeatured
createdAt
updatedAt
```

A product should not directly store a single price if multiple variants exist.

Pricing should belong to the product variant.

---

# 15. Product Variant Schema

```text
ProductVariant
--------------------------------
id
productId
sku
name
weight
weightUnit
price
mrp
isActive
createdAt
updatedAt
```

Example:

```text
Product:
Premium Almonds

Variants:

SKU: ALM-100
Weight: 100g
Price: ₹120

SKU: ALM-250
Weight: 250g
Price: ₹280

SKU: ALM-500
Weight: 500g
Price: ₹520
```

Relationship:

```text
Product 1 ──────── * ProductVariant
```

---

# 16. Product Image Schema

```text
ProductImage
--------------------------------
id
productId
variantId
url
altText
sortOrder
isPrimary
createdAt
```

Images should be stored in object storage rather than inside PostgreSQL.

The database should store only the image metadata and URL/key.

---

# 17. Inventory Schema

```text
Inventory
--------------------------------
id
variantId
quantity
reservedQuantity
lowStockThreshold
updatedAt
```

Available inventory:

```text
availableQuantity =
quantity - reservedQuantity
```

Inventory should be associated with variants rather than only products.

---

# 18. Cart Schema

```text
Cart
--------------------------------
id
userId
sessionId
createdAt
updatedAt
```

A cart may belong to:

* An authenticated user
* A guest session

---

# 19. Cart Item Schema

```text
CartItem
--------------------------------
id
cartId
variantId
quantity
createdAt
updatedAt
```

Relationship:

```text
Cart 1 ──────── * CartItem

CartItem ─────── ProductVariant
```

The final price must always be calculated using trusted server-side product data.

---

# 20. Order Schema

```text
Order
--------------------------------
id
orderNumber
userId
status
paymentStatus
subtotal
discount
shipping
tax
total
currency
shippingAddress
billingAddress
createdAt
updatedAt
```

An order should preserve the address used at the time of purchase.

The system should not depend on the customer's current address record for historical orders.

---

# 21. Order Item Schema

```text
OrderItem
--------------------------------
id
orderId
productId
variantId
productName
variantName
sku
quantity
unitPrice
discount
total
```

Important:

Order items should contain a snapshot of relevant product information.

For example:

```text
productName
variantName
sku
unitPrice
```

This protects historical order data when the product changes later.

---

# 22. Payment Schema

```text
Payment
--------------------------------
id
orderId
provider
providerPaymentId
amount
currency
status
paidAt
createdAt
updatedAt
```

Possible payment states:

```text
PENDING
AUTHORIZED
PAID
FAILED
REFUNDED
PARTIALLY_REFUNDED
```

The application must not assume payment success based solely on the frontend response.

Payment status must be verified through the payment provider/backend.

---

# 23. Wishlist Schema

```text
Wishlist
--------------------------------
id
userId
createdAt
updatedAt
```

```text
WishlistItem
--------------------------------
id
wishlistId
productId
createdAt
```

Relationship:

```text
User
 │
 ▼
Wishlist
 │
 ▼
WishlistItem
 │
 ▼
Product
```

---

# 24. Coupon Schema

```text
Coupon
--------------------------------
id
code
type
value
minimumOrderValue
maximumDiscount
usageLimit
usedCount
startDate
endDate
isActive
createdAt
updatedAt
```

Coupon types:

```text
PERCENTAGE
FIXED
```

Coupon validation must happen server-side.

---

# 25. Promotion Schema

```text
Promotion
--------------------------------
id
name
type
value
startDate
endDate
isActive
createdAt
updatedAt
```

Promotions may later support:

* Product-specific discounts
* Category-specific discounts
* User-specific promotions
* Seasonal campaigns

---

# 26. Review Schema

```text
Review
--------------------------------
id
userId
productId
orderItemId
rating
title
comment
status
createdAt
updatedAt
```

A review should be associated with a verified purchase when the business chooses to enforce verified reviews.

---

# 27. Database Relationships

High-level relationship map:

```text
User
 │
 ├─────────────── Address
 │
 ├─────────────── Order
 │                    │
 │                    ├──── OrderItem
 │                    │          │
 │                    │          └──── ProductVariant
 │                    │
 │                    └──── Payment
 │
 ├─────────────── Wishlist
 │                    │
 │                    └──── WishlistItem
 │
 └─────────────── Cart
                      │
                      └──── CartItem
                               │
                               └──── ProductVariant


Category
   │
   └──── Product
            │
            ├──── ProductVariant
            │          │
            │          └──── Inventory
            │
            └──── ProductImage
```

---

# 28. API Architecture

The API should follow resource-oriented design.

Example:

```text
/api/products
/api/products/:id
/api/categories
/api/cart
/api/orders
/api/users
/api/addresses
/api/wishlist
/api/payments
```

---

# 29. Product API

### Get products

```http
GET /api/products
```

Supports:

```text
?page=1
&limit=20
&category=almonds
&search=almond
&minPrice=100
&maxPrice=1000
&sort=price_asc
```

### Get product

```http
GET /api/products/:slug
```

### Create product

```http
POST /api/products
```

Admin only.

### Update product

```http
PATCH /api/products/:id
```

Admin only.

### Delete/deactivate product

```http
DELETE /api/products/:id
```

Admin only.

---

# 30. Cart API

### Get cart

```http
GET /api/cart
```

### Add item

```http
POST /api/cart/items
```

### Update quantity

```http
PATCH /api/cart/items/:id
```

### Remove item

```http
DELETE /api/cart/items/:id
```

---

# 31. Order API

### Create order

```http
POST /api/orders
```

### Get customer orders

```http
GET /api/orders
```

### Get order

```http
GET /api/orders/:id
```

### Update order

```http
PATCH /api/orders/:id
```

Admin only.

---

# 32. Authentication Architecture

Authentication should be handled securely.

Possible architecture:

```text
Customer
   │
   ▼
Login
   │
   ▼
Authentication Service
   │
   ▼
Session / Token
   │
   ▼
Protected Routes
```

Authentication should support:

* Registration
* Login
* Logout
* Password reset
* Session expiration
* Protected routes
* Role-based authorization

---

# 33. Authorization

Authentication answers:

> Who is this user?

Authorization answers:

> What is this user allowed to do?

Roles:

```text
CUSTOMER
ADMIN
```

Example:

```text
Customer
 ├── View products
 ├── Manage own cart
 ├── Manage own orders
 └── Manage own addresses

Admin
 ├── Manage products
 ├── Manage inventory
 ├── Manage orders
 ├── Manage customers
 └── Manage promotions
```

Authorization must always be enforced server-side.

---

# 34. Payment Architecture

Payment flow:

```text
Customer
   │
   ▼
Checkout
   │
   ▼
Create Order / Payment Intent
   │
   ▼
Payment Provider
   │
   ▼
Customer Completes Payment
   │
   ▼
Provider Confirmation
   │
   ▼
Backend Verification
   │
   ▼
Update Payment
   │
   ▼
Update Order
   │
   ▼
Order Confirmation
```

The frontend must never be the final authority for payment success.

---

# 35. Inventory Transaction Flow

Inventory should be checked when adding to cart and again during checkout.

```text
Customer
   │
   ▼
Add to Cart
   │
   ▼
Check Availability
   │
   ▼
Checkout
   │
   ▼
Re-check Inventory
   │
   ▼
Reserve / Deduct Inventory
   │
   ▼
Create Order
```

The final inventory operation must be atomic to prevent overselling.

---

# 36. Image and File Storage

Product images should be stored using object storage.

Recommended:

**Amazon S3**

Example structure:

```text
s3://bucket/
│
├── products/
│   ├── almonds/
│   ├── cashews/
│   └── pistachios/
│
├── categories/
│
├── banners/
│
└── uploads/
```

The database stores the corresponding object key/URL.

---

# 37. CDN

A CDN should be used to deliver:

* Images
* Static files
* Frontend assets
* Cached content where appropriate

Recommended AWS service:

**Amazon CloudFront**

High-level flow:

```text
User
  ↓
CloudFront
  ↓
Origin
  ↓
S3 / Application
```

CloudFront should reduce latency for customers in different geographic regions.

---

# 38. AWS Architecture

The initial AWS architecture may use:

```text
                    Internet
                       │
                       ▼
                 CloudFront
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
           S3                 Application
       Static Assets             Server
                                     │
                         ┌───────────┼───────────┐
                         ▼           ▼           ▼
                      Database     Cache      Storage
                    PostgreSQL     Redis        S3
```

The exact compute service may depend on the chosen deployment strategy.

Possible application hosting options include:

* AWS ECS
* AWS App Runner
* AWS Amplify
* Vercel
* Other managed hosting

The final production infrastructure should be selected based on project requirements and operational needs.

---

# 39. Environment Configuration

Environment-specific values must never be hardcoded.

Example:

```text
.env.local
.env.development
.env.production
```

Example variables:

```text
DATABASE_URL=

AUTH_SECRET=

PAYMENT_SECRET_KEY=
PAYMENT_WEBHOOK_SECRET=

AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=

NEXT_PUBLIC_APP_URL=
```

Secrets must never be committed to Git.

---

# 40. Environment Separation

The project should support:

```text
Development
     │
     ▼
Staging
     │
     ▼
Production
```

Each environment should have appropriate:

* Database
* API configuration
* Storage
* Payment configuration
* Authentication secrets

Production credentials must never be used during local development.

---

# 41. Caching

Caching may be introduced for:

* Product listings
* Category data
* Product details
* Static content

Do not cache data blindly.

Frequently changing data such as:

* Inventory
* Payment status
* Order status

requires careful cache handling.

Redis may be introduced when the application requires shared server-side caching or high-performance temporary state.

---

# 42. Search Architecture

Initial search can use database-supported search.

Example:

```text
Customer
   ↓
Search API
   ↓
PostgreSQL
   ↓
Search Results
```

If product volume grows significantly, a dedicated search engine can be introduced later.

Possible future technologies:

* OpenSearch
* Elasticsearch
* Algolia

The MVP should avoid introducing a dedicated search engine unless required.

---

# 43. SEO Architecture

Public pages should use SEO-friendly routes.

Example:

```text
/products/premium-almonds
/category/dry-fruits
/category/nuts
```

The application should generate:

* Page metadata
* Open Graph metadata
* Structured data
* Sitemap
* Robots configuration

Product pages should provide appropriate structured product information.

---

# 44. Frontend Rendering Strategy

Use rendering based on page requirements.

### Static / Cached

Suitable for:

* Categories
* Marketing content
* Some product pages

### Dynamic

Suitable for:

* Cart
* Checkout
* Account
* Orders
* Admin

Example:

```text
Public Product Page
        ↓
Static / Cached Rendering

Customer Account
        ↓
Dynamic Rendering
```

---

# 45. Application Layers

The application should be organized into clear layers.

```text
Presentation Layer
        ↓
Application Layer
        ↓
Domain / Business Logic
        ↓
Data Access Layer
        ↓
Database
```

Example:

```text
UI
 ↓
API / Server Action
 ↓
Order Service
 ↓
Order Repository
 ↓
PostgreSQL
```

Business logic should not be duplicated throughout UI components.

---

# 46. Service Layer

Business operations should be encapsulated in services.

Example:

```text
services/
├── product.service.ts
├── cart.service.ts
├── order.service.ts
├── payment.service.ts
├── inventory.service.ts
├── user.service.ts
└── promotion.service.ts
```

A service should represent a meaningful business operation.

---

# 47. Validation

Input validation must happen on the server.

Recommended validation library:

**Zod**

Example conceptual flow:

```text
Request
   ↓
Schema Validation
   ↓
Business Validation
   ↓
Authorization
   ↓
Database Operation
```

Client-side validation improves UX.

Server-side validation provides security and correctness.

Both should be used.

---

# 48. Error Architecture

Errors should be classified.

```text
Validation Error
Authentication Error
Authorization Error
Not Found Error
Conflict Error
Payment Error
Inventory Error
Database Error
Internal Error
```

API responses should use consistent structures.

Example:

```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_OUT_OF_STOCK",
    "message": "This product is currently out of stock."
  }
}
```

Internal errors should not expose sensitive implementation details.

---

# 49. Logging

The application should log important events.

Examples:

* Authentication failures
* Payment failures
* Order creation failures
* Inventory conflicts
* Server errors
* External API failures

Logs should contain useful context without exposing:

* Passwords
* Authentication secrets
* Payment credentials
* Sensitive personal information

---

# 50. Monitoring

Production monitoring should track:

* Application errors
* API failures
* Response times
* Database failures
* Payment failures
* Availability

A dedicated monitoring service may be integrated later.

---

# 51. Security Architecture

Security principles:

```text
Never trust the client.
Validate all input.
Authorize every protected operation.
Protect secrets.
Use HTTPS.
Hash passwords.
Verify payments server-side.
Validate inventory server-side.
Limit sensitive operations.
```

---

# 52. Database Security

Database access should:

* Use authenticated connections
* Use encrypted connections where supported
* Restrict access
* Use least-privilege credentials
* Avoid exposing the database publicly
* Use backups

Application users should never have direct database access.

---

# 53. API Security

APIs should implement:

* Authentication
* Authorization
* Input validation
* Rate limiting where appropriate
* Request size limits
* Secure headers
* Error sanitization

Admin endpoints require elevated authorization.

---

# 54. Payment Security

The application must:

* Never trust client-provided payment status
* Verify provider responses
* Validate webhook signatures
* Prevent duplicate payment processing
* Use idempotency where supported
* Store payment references rather than sensitive card information

---

# 55. Webhook Architecture

External services may send webhooks.

Example:

```text
Payment Provider
       │
       ▼
POST /api/webhooks/payment
       │
       ▼
Verify Signature
       │
       ▼
Process Event
       │
       ▼
Update Payment
       │
       ▼
Update Order
```

Webhook processing must be idempotent.

The same webhook should not create duplicate orders or payments.

---

# 56. Idempotency

Critical operations should be designed to avoid duplicate processing.

Examples:

* Payment creation
* Order creation
* Payment webhook handling
* Inventory deduction

Example:

```text
Request A
   ↓
Order created

Request A repeated
   ↓
Existing result returned
```

---

# 57. Transaction Management

Database transactions should be used for operations requiring multiple related updates.

Example order creation:

```text
BEGIN TRANSACTION

Validate cart
Validate inventory
Calculate totals
Create order
Create order items
Reserve/deduct inventory
Create payment record

COMMIT
```

If an important operation fails:

```text
ROLLBACK
```

This prevents partially created orders.

---

# 58. Data Consistency

The server is the source of truth for:

* Product prices
* Inventory
* Discounts
* Taxes
* Shipping
* Order totals
* Payment status

The frontend should display data but must not be trusted to determine final values.

---

# 59. Project Folder Structure

Recommended structure:

```text
project-root/
│
├── app/
│   ├── (store)/
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── categories/
│   │   ├── cart/
│   │   └── checkout/
│   │
│   ├── account/
│   │   ├── page.tsx
│   │   ├── orders/
│   │   ├── addresses/
│   │   └── wishlist/
│   │
│   ├── admin/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── customers/
│   │   └── inventory/
│   │
│   └── api/
│       ├── products/
│       ├── cart/
│       ├── orders/
│       ├── payments/
│       └── webhooks/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   └── account/
│
├── services/
│   ├── product.service.ts
│   ├── cart.service.ts
│   ├── order.service.ts
│   ├── payment.service.ts
│   ├── inventory.service.ts
│   └── user.service.ts
│
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   ├── storage.ts
│   ├── payment.ts
│   └── validation/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── types/
│   ├── product.ts
│   ├── order.ts
│   ├── user.ts
│   └── cart.ts
│
├── hooks/
│
├── utils/
│
├── public/
│
├── tests/
│
├── docs/
│   ├── prd.md
│   ├── architecture.md
│   ├── frontend.md
│   ├── rules.md
│   ├── History.md
│   ├── bugs.md
│   └── testing.md
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

# 60. Git Architecture

Git should be treated as part of the development architecture.

Recommended branches:

```text
main
 │
 ├── develop
 │
 ├── feature/homepage
 ├── feature/product-page
 ├── feature/cart
 ├── feature/checkout
 └── fix/cart-total
```

Basic workflow:

```text
Create Branch
      ↓
Develop
      ↓
Test
      ↓
Commit
      ↓
Push
      ↓
Pull Request
      ↓
Review
      ↓
Merge
```

The exact Git workflow and commit standards will be defined in `rules.md`.

---

# 61. Deployment Pipeline

Recommended deployment lifecycle:

```text
Developer
    │
    ▼
Local Development
    │
    ▼
Git Commit
    │
    ▼
GitHub
    │
    ▼
CI / Tests
    │
    ▼
Staging
    │
    ▼
Production
```

Automated tests should run before production deployment.

---

# 62. Backup Strategy

The production database should have:

* Automated backups
* Recovery procedures
* Backup retention
* Periodic restoration testing

Backups are not considered reliable until restoration has been tested.

---

# 63. Scalability Strategy

The initial architecture should scale vertically first and horizontally when necessary.

Potential future improvements:

```text
Single Application
       ↓
Optimized Application
       ↓
Multiple Application Instances
       ↓
Load Balancer
       ↓
Caching
       ↓
Dedicated Services
```

Do not introduce microservices simply because the application is an e-commerce platform.

---

# 64. Future Service Extraction

If the system grows, these areas could become independent services:

```text
Authentication Service
Product Service
Inventory Service
Order Service
Payment Service
Notification Service
Search Service
```

The initial architecture should keep them logically separated even if they run within one application.

---

# 65. Data Flow — Product Browsing

```text
Customer
   ↓
Product Page
   ↓
Frontend
   ↓
Product API
   ↓
Product Service
   ↓
Database
   ↓
Product Data
   ↓
Frontend
   ↓
Customer
```

---

# 66. Data Flow — Add to Cart

```text
Customer
   ↓
Select Variant
   ↓
Add to Cart
   ↓
Server Validation
   ↓
Check Product
   ↓
Check Availability
   ↓
Create/Update Cart Item
   ↓
Return Cart
```

---

# 67. Data Flow — Checkout

```text
Customer
   ↓
Cart
   ↓
Checkout
   ↓
Validate User
   ↓
Validate Address
   ↓
Validate Products
   ↓
Validate Inventory
   ↓
Calculate Price
   ↓
Apply Discount
   ↓
Calculate Shipping
   ↓
Calculate Tax
   ↓
Create Order
   ↓
Payment
   ↓
Payment Verification
   ↓
Confirm Order
```

---

# 68. Data Flow — Order Fulfillment

```text
Order Created
      ↓
Confirmed
      ↓
Processing
      ↓
Packed
      ↓
Shipped
      ↓
Delivered
```

Every state transition should be validated according to business rules.

---

# 69. Source of Truth

Each type of information should have one authoritative source.

| Data                | Source of Truth                           |
| ------------------- | ----------------------------------------- |
| Product             | Database                                  |
| Product price       | Product Variant                           |
| Inventory           | Inventory table                           |
| Cart                | Cart database/session                     |
| Order               | Order database                            |
| Payment status      | Payment provider + verified backend state |
| Customer            | User database                             |
| Product images      | S3/object storage                         |
| Application code    | Git repository                            |
| Environment secrets | Secret/environment management             |

---

# 70. Architecture Principles

The project should follow these principles:

### Principle 1 — Server Is the Source of Truth

Never trust sensitive client-side values.

### Principle 2 — Keep Business Logic Centralized

Business rules should not be duplicated across UI components.

### Principle 3 — Prefer Simplicity

Do not introduce infrastructure before it is necessary.

### Principle 4 — Design for Change

Products, categories, promotions, and business rules will evolve.

### Principle 5 — Secure by Default

Security should be part of architecture, not an afterthought.

### Principle 6 — Test Critical Flows

Especially:

* Authentication
* Cart
* Checkout
* Payment
* Inventory
* Orders

### Principle 7 — Document Important Decisions

Architectural decisions should be recorded rather than relying on developer memory.

---

# 71. Architecture Decision Records

Significant technical decisions should be documented.

Example:

```text
ADR-001 — Use PostgreSQL
ADR-002 — Use Next.js
ADR-003 — Use TypeScript
ADR-004 — Use S3 for product images
ADR-005 — Use CloudFront for CDN
ADR-006 — Use modular monolith instead of microservices
```

This prevents architectural decisions from becoming undocumented assumptions.

---

# 72. Technology Decision Summary

| Area            | Technology                   |
| --------------- | ---------------------------- |
| Language        | TypeScript                   |
| Frontend        | React / Next.js              |
| Styling         | Tailwind CSS                 |
| Backend         | Next.js server/API layer     |
| Database        | PostgreSQL                   |
| ORM             | Prisma                       |
| Validation      | Zod                          |
| Object Storage  | Amazon S3                    |
| CDN             | Amazon CloudFront            |
| Cache           | Redis when required          |
| Authentication  | Secure session/auth solution |
| Payment         | Payment provider             |
| Version Control | Git                          |
| Repository      | GitHub                       |
| Testing         | Unit + Integration + E2E     |
| Deployment      | Cloud/managed deployment     |
| CI/CD           | GitHub-based pipeline        |

Specific service selections can be finalized before production deployment.

---

# 73. Architecture Boundaries

This document defines **how the system is built**.

It does not define:

* Exact colors
* Typography
* Button appearance
* Spacing
* Visual hierarchy
* Component visual design

Those belong in:

```text
frontend.md
```

Coding conventions belong in:

```text
rules.md
```

Development history belongs in:

```text
History.md
```

Known bugs belong in:

```text
bugs.md
```

Testing strategy belongs in:

```text
testing.md
```

---

# 74. Final Architecture

The intended MVP architecture is:

```text
                         CUSTOMER
                            │
                            ▼
                    ┌───────────────┐
                    │   Next.js     │
                    │   Frontend    │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Application   │
                    │ / API Layer   │
                    └───────┬───────┘
                            │
              ┌─────────────┼──────────────┐
              │             │              │
              ▼             ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ Product  │  │  Order   │  │ Payment  │
        │ Service  │  │ Service  │  │ Service  │
        └────┬─────┘  └────┬─────┘  └────┬─────┘
             │             │              │
             └─────────────┼──────────────┘
                           ▼
                    ┌───────────────┐
                    │   PostgreSQL  │
                    └───────────────┘

                    ┌───────────────┐
                    │      S3       │
                    │ Product Media │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  CloudFront   │
                    └───────────────┘
```

---

# 75. Definition of Done

The architecture is considered sufficiently defined when:

* [ ] Application architecture is documented.
* [ ] Technology stack is selected.
* [ ] Database entities are defined.
* [ ] Relationships are defined.
* [ ] API structure is defined.
* [ ] Authentication architecture is defined.
* [ ] Authorization model is defined.
* [ ] Payment flow is defined.
* [ ] Inventory flow is defined.
* [ ] Storage architecture is defined.
* [ ] AWS infrastructure is defined.
* [ ] Environment strategy is defined.
* [ ] Security principles are documented.
* [ ] Deployment flow is documented.
* [ ] Project folder structure is documented.
* [ ] Git workflow is identified.
* [ ] Scalability strategy is documented.

---

# 76. Next Document

The next document is:

```text
frontend.md
```

It will define the **actual UI system**, including:

* Design principles
* Existing brand/color palette
* Typography
* Layout system
* Responsive breakpoints
* Header
* Navigation
* Homepage
* Product cards
* Product page
* Category pages
* Cart
* Checkout
* Account pages
* Admin UI
* Buttons
* Forms
* Modals
* Toasts
* Loading states
* Empty states
* Error states
* Accessibility
* Component architecture
* UI naming conventions
* Design tokens
* Responsive behavior
