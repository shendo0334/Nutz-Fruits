# Rules — Coding & Development Standards

## 1. Purpose

This document defines the coding, architecture, UI, security, testing, and documentation rules for the Nutz e-commerce project.

The purpose is to ensure that:

* Code remains clean and maintainable.
* The project follows the defined architecture.
* UI remains consistent with the approved design system.
* Features are implemented without unnecessary complexity.
* Existing functionality is not accidentally broken.
* Security and performance are considered from the beginning.
* The project remains easy for both humans and AI coding agents to understand.

---

# 2. General Development Principles

Follow these principles for every change:

1. **Understand before changing.**

   * Inspect the existing code before modifying it.
   * Do not assume a file, component, API, or database structure exists.

2. **Prefer simple solutions.**

   * Do not introduce unnecessary abstractions.
   * Do not add libraries when existing project functionality is sufficient.

3. **Follow the existing architecture.**

   * New code must fit the architecture defined in `architecture.md`.
   * Do not create parallel architectures for individual features.

4. **Reuse existing components.**

   * Before creating a new component, check whether an existing component can be reused or extended.

5. **Do not duplicate logic.**

   * Shared functionality should have a single appropriate source of truth.

6. **Keep changes focused.**

   * A feature change should not unnecessarily modify unrelated parts of the application.

7. **Do not break existing functionality.**

   * Existing functionality must be considered before making structural changes.

8. **Do not make assumptions about business rules.**

   * If a requirement is unclear, follow the documented requirement or ask for clarification.

---

# 3. TypeScript Rules

Use TypeScript consistently.

### Required

* Prefer explicit types for important data structures.
* Define reusable interfaces/types for shared models.
* Use strict TypeScript settings.
* Use meaningful type names.
* Prefer union types where appropriate.
* Use type guards when runtime validation is required.

### Avoid

```ts
const data: any = ...
```

Do not use `any` unless there is a documented technical reason.

Prefer:

```ts
type ProductStatus = "active" | "inactive" | "draft";
```

over loosely typed strings.

### Naming

Use:

* `PascalCase` → types, interfaces, classes, React components
* `camelCase` → variables, functions, properties
* `UPPER_SNAKE_CASE` → true global constants where appropriate

Example:

```ts
interface Product {
  id: string;
  name: string;
  price: number;
}
```

---

# 4. React Rules

## Components

Components should have a single clear responsibility.

Prefer:

```text
ProductCard
ProductImage
ProductPrice
AddToCartButton
```

over one extremely large component containing the entire product experience.

### Component rules

* Keep components readable.
* Extract repeated UI.
* Avoid deeply nested component logic.
* Keep business logic outside presentation components where appropriate.
* Prefer reusable components over duplicated markup.

### Props

Props should be:

* Clearly named.
* Properly typed.
* Minimal.
* Relevant to the component.

Avoid passing large unrelated objects when only a few properties are required.

---

# 5. Next.js Rules

Follow the project's established Next.js architecture.

### Server vs Client

Prefer Server Components where client-side interactivity is not required.

Use Client Components only when necessary, such as:

* User interaction
* Browser APIs
* Client-side state
* Event handlers
* Interactive UI

Do not automatically make every component a Client Component.

### Data fetching

Use the architecture defined in `architecture.md`.

Do not:

* Fetch the same data unnecessarily.
* Duplicate API logic across components.
* Put database logic directly inside UI components.

---

# 6. Folder & File Organization

Follow the project's established folder structure.

Organize files according to responsibility rather than convenience.

Typical separation:

```text
components/
features/
lib/
services/
repositories/
types/
utils/
app/
```

Do not create random folders for individual features without considering the existing architecture.

### File naming

Use consistent naming throughout the project.

Examples:

```text
ProductCard.tsx
ProductGrid.tsx
product.service.ts
product.repository.ts
product.types.ts
formatCurrency.ts
```

Avoid inconsistent naming such as:

```text
productcard.tsx
Product_card.tsx
productCardComponent.tsx
```

---

# 7. UI & Design Rules

The UI must follow `frontend.md`.

## Design system

Use the project's defined:

* Colors
* Typography
* Spacing
* Border radius
* Shadows
* Buttons
* Inputs
* Cards
* Icons
* Layout patterns

Do not introduce arbitrary colors or styles when an existing design token exists.

### Colors

Do not hard-code random colors throughout components.

Prefer the project's design tokens or variables.

Bad:

```css
color: #123456;
```

when an appropriate project token already exists.

### Spacing

Use the established spacing system consistently.

Avoid arbitrary values unless there is a specific design requirement.

---

# 8. Responsive Design

Every user-facing page must work across:

* Mobile
* Tablet
* Desktop
* Large desktop screens

Do not design only for desktop.

Consider:

* Navigation
* Product grids
* Images
* Typography
* Buttons
* Forms
* Cart
* Checkout
* Tables
* Modals

Mobile layouts must remain usable rather than simply shrinking the desktop layout.

---

# 9. Accessibility

Accessibility is required for all user-facing features.

Follow basic accessibility principles:

* Use semantic HTML.
* Provide labels for form controls.
* Provide meaningful `alt` text for informative images.
* Ensure keyboard navigation works.
* Maintain visible focus states.
* Do not rely only on color to communicate information.
* Use appropriate ARIA attributes when necessary.
* Buttons must be actual buttons.
* Links must be actual links.

Avoid:

```html
<div onClick={...}>
```

when a button is the correct semantic element.

Prefer:

```html
<button onClick={...}>
```

---

# 10. Forms

Forms must:

* Validate user input.
* Display useful error messages.
* Preserve entered data when appropriate.
* Clearly indicate required fields.
* Prevent invalid submissions.
* Handle loading states.
* Handle server-side validation errors.

Never rely only on client-side validation for security-sensitive data.

---

# 11. API Rules

API endpoints must have:

* Clear responsibilities.
* Proper input validation.
* Appropriate authentication/authorization.
* Consistent response structures.
* Proper error handling.

Never trust client-provided values.

Validate:

* IDs
* Prices
* Quantities
* Discounts
* Addresses
* User input
* Order information
* Payment-related data

---

# 12. Business Logic

Business rules should not be scattered across UI components.

Examples of business logic include:

* Product pricing
* Discounts
* Coupon validation
* Cart calculations
* Inventory checks
* Order totals
* Shipping calculations
* Tax calculations
* Payment status
* Order status

These should have clear and testable sources of truth.

### Important

Never trust values calculated by the browser for critical operations.

For example, the server should independently calculate the final order amount.

---

# 13. Database Rules

Database access must follow the architecture defined in `architecture.md`.

Do not access the database directly from UI components.

### Data integrity

Consider:

* Required fields
* Unique constraints
* Relationships
* Foreign keys
* Indexes
* Transactions
* Race conditions

Critical operations such as order creation should maintain data consistency.

---

# 14. Authentication & Authorization

Authentication and authorization are separate concepts.

Always verify that the current user is authorized to perform an action.

Never assume:

```text
Logged in = Allowed to access everything
```

Examples:

* Customers should only access their own account/order information.
* Administrative operations must require appropriate authorization.
* Protected APIs must validate authentication server-side.

Never expose sensitive authentication information to the client.

---

# 15. Security Rules

Never commit secrets into source code.

Do not place:

* API keys
* Database passwords
* Private tokens
* Payment secrets
* Authentication secrets

directly inside application code.

Use environment variables and the project's approved secret-management approach.

### User input

Treat all external input as untrusted.

Validate and sanitize where appropriate.

Do not directly construct database queries, HTML, commands, or other sensitive operations from untrusted input.

---

# 16. Environment Variables

Environment variables must be clearly separated between:

* Public configuration
* Server-only secrets

Never expose server-only secrets to browser/client code.

Do not hard-code environment-specific values.

---

# 17. Error Handling

Errors must be handled intentionally.

Do not silently ignore errors.

Bad:

```ts
try {
  await something();
} catch {}
```

Instead:

* Handle the error.
* Log useful diagnostic information where appropriate.
* Show a safe user-facing message.
* Preserve security-sensitive information.

### User messages

Do not expose internal errors such as:

```text
Database connection failed at server xyz...
```

Instead:

```text
Something went wrong. Please try again.
```

Detailed technical information should remain in appropriate logs.

---

# 18. Loading & Empty States

Every data-driven UI should consider:

### Loading state

What does the user see while data is loading?

### Empty state

What happens when there is no data?

Examples:

* No search results
* Empty cart
* No orders
* No products in a category

### Error state

What happens when the request fails?

### Success state

What feedback does the user receive after an action succeeds?

Do not leave users staring at a blank screen.

---

# 19. E-commerce Rules

Because this is an e-commerce application, critical flows require extra care.

Important areas include:

* Product browsing
* Product details
* Search
* Filtering
* Cart
* Quantity updates
* Pricing
* Discounts
* Coupons
* Address management
* Shipping
* Checkout
* Payment
* Order creation
* Inventory
* Order history

### Price

Never trust the price sent from the client.

The server must retrieve or verify the actual product price before creating an order.

### Quantity

Validate:

* Minimum quantity
* Maximum quantity
* Available inventory
* Product availability

### Order totals

The server must independently calculate:

```text
Subtotal
+ Shipping
+ Tax
- Discounts
= Final Total
```

The browser's calculated total must not be considered authoritative.

---

# 20. Performance Rules

Performance should be considered during implementation, not only after completion.

Avoid:

* Unnecessary client-side rendering
* Excessive JavaScript
* Duplicate network requests
* Huge images
* Unnecessary dependencies
* Repeated expensive calculations
* Uncontrolled re-renders

For product images:

* Use appropriate image optimization.
* Use suitable dimensions.
* Avoid unnecessarily large source files.

---

# 21. SEO Rules

Public e-commerce pages should consider SEO.

Important pages include:

* Home
* Categories
* Product pages
* Search pages where appropriate
* Informational pages

Use:

* Meaningful page titles
* Useful descriptions
* Semantic HTML
* Appropriate headings
* Descriptive URLs
* Product metadata where applicable
* Appropriate structured data where required

Do not create duplicate or meaningless metadata.

---

# 22. Code Comments

Comments should explain **why**, not simply **what**.

Avoid:

```ts
// Set count to 1
count = 1;
```

Prefer comments explaining non-obvious business or technical reasoning.

Example:

```ts
// Recalculate the total on the server because client-side
// totals cannot be trusted during order creation.
```

Do not leave outdated comments.

---

# 23. Dependencies

Before adding a new dependency:

1. Check whether the functionality already exists.
2. Check whether an existing dependency can solve it.
3. Consider bundle size and performance.
4. Consider maintenance and security.
5. Use the dependency only if it provides meaningful value.

Do not install libraries simply because they are popular.

---

# 24. Refactoring Rules

Refactoring should improve the code without changing intended behavior.

Before a major refactor:

* Understand the existing implementation.
* Identify dependencies.
* Check existing tests.
* Make changes incrementally.
* Verify affected functionality.

Do not rewrite large sections of the application without a clear reason.

---

# 25. Testing Rules

New functionality should include appropriate tests.

Testing should cover, where applicable:

* Utility functions
* Business logic
* Components
* API behavior
* Authentication/authorization
* E-commerce calculations
* Critical user flows

Critical business logic must not rely only on manual testing.

Follow `testing.md` for the project's complete testing strategy.

---

# 26. Bug Handling

When a bug is discovered:

1. Reproduce it.
2. Understand the cause.
3. Fix the underlying problem.
4. Verify the fix.
5. Add or update a regression test when appropriate.
6. Record the bug according to `bugs.md`.

Do not simply hide symptoms without understanding the underlying cause.

---

# 27. Documentation Rules

Important architectural or business decisions should be documented.

Documentation should remain:

* Accurate
* Concise
* Updated
* Consistent with the implementation

When implementation changes significantly, update the relevant documentation.

### Documentation responsibilities

| File              | Purpose                               |
| ----------------- | ------------------------------------- |
| `prd.md`          | What the product should do            |
| `architecture.md` | How the system is structured          |
| `frontend.md`     | UI and design system                  |
| `rules.md`        | Coding and development rules          |
| `History.md`      | Project progress and learning history |
| `bugs.md`         | Known and discovered bugs             |
| `testing.md`      | Testing strategy and standards        |

---

# 28. AI Coding Agent Rules

When an AI coding agent works on this project:

### Before coding

The agent should:

1. Read the relevant project documentation.
2. Inspect the existing implementation.
3. Understand dependencies.
4. Identify affected files.
5. Avoid unnecessary changes.

### During coding

The agent should:

* Follow `rules.md`.
* Follow `architecture.md`.
* Follow `frontend.md`.
* Reuse existing patterns.
* Keep changes focused.
* Avoid unrelated refactoring.
* Avoid introducing unnecessary dependencies.

### After coding

The agent should:

1. Review the changed code.
2. Check for obvious errors.
3. Run the appropriate tests/checks when available.
4. Verify the feature against the requirement.
5. Update relevant documentation when necessary.

The agent must not claim that something was tested if it was not actually tested.

---

# 29. Do Not Over-Engineer

Do not introduce complexity before it is necessary.

Avoid unnecessary:

* Abstraction layers
* Design patterns
* Generic frameworks
* State-management libraries
* Utility libraries
* Microservices
* Configuration systems
* Custom infrastructure

Prefer the simplest architecture that satisfies the documented requirements.

Complexity should be justified by an actual project requirement.

---

# 30. Do Not Modify Unrelated Code

If a task is:

> Add a product card

Do not simultaneously:

* Rewrite authentication.
* Change the database architecture.
* Replace the CSS system.
* Refactor unrelated pages.
* Upgrade unrelated dependencies.

Keep the scope controlled.

If an unrelated issue is discovered, document it separately rather than silently expanding the task.

---

# 31. No Fake Implementations

Do not use fake implementations while claiming the feature is complete.

Examples of unacceptable completion:

```ts
return [];
```

when the requirement is to retrieve real products.

```ts
const paymentSuccessful = true;
```

when real payment processing is required.

```ts
// TODO: implement later
```

while presenting the feature as finished.

If something is intentionally mocked for development, clearly identify it as a mock.

---

# 32. No Silent Changes to Requirements

Do not change business requirements simply because another implementation appears easier.

If a requirement conflicts with the current architecture:

1. Identify the conflict.
2. Explain the technical issue.
3. Propose a solution.
4. Wait for the requirement/architecture decision when necessary.

---

# 33. Definition of Done

A feature is considered complete only when:

* The requirement is implemented.
* The implementation follows the architecture.
* The UI follows the design system.
* Responsive behavior has been considered.
* Accessibility has been considered.
* Error/loading/empty states are handled where applicable.
* Security implications have been considered.
* Appropriate tests exist or have been updated.
* Existing functionality has not been unnecessarily affected.
* Documentation has been updated when required.

---

# 34. Golden Rules

Always remember:

1. **Understand before changing.**
2. **Follow the architecture.**
3. **Reuse before creating.**
4. **Keep components focused.**
5. **Keep business logic testable.**
6. **Never trust client-side values for critical operations.**
7. **Validate external input.**
8. **Protect secrets.**
9. **Design for mobile and desktop.**
10. **Build accessibility into the UI.**
11. **Handle loading, empty, error, and success states.**
12. **Test critical functionality.**
13. **Do not over-engineer.**
14. **Do not modify unrelated code.**
15. **Never claim work was completed or tested when it was not.**
16. **Keep documentation consistent with the actual project.**

---

# 35. Git & GitHub

Git and GitHub are intentionally **not part of the agent rules**.

Git/GitHub will be learned and performed manually during development.

The project documentation should not instruct an AI agent to:

* Create commits
* Create branches
* Merge branches
* Push code
* Pull code
* Reset repositories
* Modify Git history
* Manage GitHub repositories

Git operations will be handled separately as part of the developer's learning workflow.
