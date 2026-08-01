# Additional Features

This document describes optional features you can add to enhance your bookstore.

## 1. Password Reset

**Files**: `server/src/routes/auth.ts` (add endpoints)

### Setup
1. Add crypto import: `import crypto from 'crypto';`
2. Add `/forgot-password` and `/reset-password` routes
3. Integrate email service (see below)
4. Create ResetPassword page in frontend

### Usage
```typescript
// Request reset
await axios.post('/api/auth/forgot-password', { email })

// Reset password
await axios.post('/api/auth/reset-password', { 
  token, 
  email, 
  password 
})
```

## 2. Email Notifications

**Files**: `server/src/utils/email.ts`

### Dependencies
```bash
npm install nodemailer @types/nodemailer
```

### Environment Variables
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=Bookstore <noreply@bookstore.com>
```

### Usage
```typescript
import { sendEmail, sendOrderConfirmation } from './utils/email';

// Send order confirmation
await sendOrderConfirmation(user.email, order);

// Send password reset
await sendPasswordReset(email, resetUrl);
```

## 3. Wishlist Feature

**Files**: 
- `server/src/models/Wishlist.ts`
- `server/src/routes/wishlist.ts`
- `client/src/pages/Wishlist.tsx` (create)

### API Endpoints
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist/books/:bookId` - Add book
- `DELETE /api/wishlist/books/:bookId` - Remove book

### Frontend Integration
```typescript
// Add to BookDetails page
const addToWishlist = async () => {
  await axios.post('/wishlist/books/' + id);
  alert('Added to wishlist!');
};
```

## 4. Payment Integration (Stripe)

**Files**: `server/src/routes/payment.ts`

### Dependencies
```bash
npm install stripe @types/stripe
```

### Environment Variables
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Frontend Integration
Use `@stripe/stripe-js` and `@stripe/react-stripe-js`

```typescript
// Install
npm install @stripe/stripe-js @stripe/react-stripe-js

// Wrap app with Elements
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripe = loadStripe(process.env.VITE_STRIPE_KEY);

<Elements stripe={stripe}>
  <CheckoutForm />
</Elements>
```

## 5. Book Recommendations

**Files**: `client/src/components/Recommendations.tsx`

### Usage
```typescript
import Recommendations from '../components/Recommendations';

// In BookDetails
<Recommendations 
  currentBookId={book._id}
  categories={book.categories}
  limit={4}
/>
```

## 6. Rate Limiting (Security)

**Files**: `server/src/middleware/rateLimiter.ts`

### Usage in server.ts
```typescript
import { rateLimiter } from './middleware/rateLimiter';

// Apply to auth routes
app.use('/api/auth', rateLimiter(10, 60000)); // 10 requests per minute
app.use('/api', rateLimiter(100, 60000)); // 100 requests per minute
```

## 7. Analytics Dashboard

**Files**: `client/src/pages/admin/Analytics.tsx`

### Features
- Total orders count
- Revenue tracking
- Pending orders
- Book inventory
- User statistics

### Add to Admin Routes
```typescript
// In main.tsx
<Route path="admin/analytics" element={<Analytics />} />
```

## 8. Advanced Search

Add to Home page:
- Full-text search
- Author filter
- Price range slider
- Category multi-select
- Rating filter
- Sort by multiple criteria

## 9. Reviews Enhancement

- Add helpful/not helpful votes
- User can edit/delete own reviews
- Sort reviews by rating/date/helpful
- Verified purchase badge

## 10. Inventory Alerts

- Low stock notifications for admin
- Email when book stock < threshold
- Auto-restock reminders

## Implementation Priority

### High Priority
1. ✅ Email notifications
2. ✅ Password reset
3. ✅ Rate limiting
4. ✅ Wishlist

### Medium Priority
5. Payment integration
6. Advanced search
7. Analytics dashboard

### Nice to Have
8. Review enhancements
9. Inventory alerts
10. Book recommendations

---

**Next Steps**: Choose features based on your needs and implement them one at a time.
