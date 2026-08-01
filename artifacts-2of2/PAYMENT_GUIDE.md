# 💳 Payment Integration Guide

Complete guide to integrating Stripe payments into your bookstore.

## Prerequisites

- Stripe account (free): https://stripe.com
- Node.js 18+
- MongoDB Atlas (recommended for production)

## Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Click "Sign Up"
3. Complete registration
4. Verify email

## Step 2: Get API Keys

### Test Mode (Development)
1. Login to Stripe Dashboard
2. Go to Developers → API Keys
3. Ensure "Test Mode" is ON (toggle at top)
4. Copy keys:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

### Live Mode (Production)
1. Switch "Test Mode" OFF
2. Complete account verification
3. Get live keys

## Step 3: Install Dependencies

```bash
cd server
npm install stripe @types/stripe

cd client
npm install @stripe/stripe-js @stripe/react-stripe-js
```

## Step 4: Configure Environment

### Server `.env`
```env
STRIPE_SECRET_KEY=sk_test_51H...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Client `.env`
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51H...
```

## Step 5: Setup Webhook (Local Development)

### Install Stripe CLI
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
winget install stripe.stripe-cli

# Linux
curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
sudo apt update
sudo apt install stripe
```

### Login and Setup
```bash
stripe login
stripe listen --forward-to localhost:4000/api/payment/webhook
```

This will show your webhook signing secret. Add it to `.env`:
```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Step 6: Update Backend Routes

### Add to `server/src/server.ts`
```typescript
import paymentRoutes from './routes/payment';
app.use('/api/payment', paymentRoutes);
```

### Create `server/src/routes/payment.ts`
(Already created in your project)

Key features:
- Create payment intent
- Handle webhook events
- Update order payment status

## Step 7: Update Checkout Flow

### Add to Cart.tsx or create Checkout.tsx

```typescript
import PaymentCheckout from '../components/PaymentCheckout';

// In your checkout component
const [showPayment, setShowPayment] = useState(false);
const [order, setOrder] = useState(null);

const handleCheckout = async () => {
  try {
    // Create order first (without payment)
    const res = await axios.post('/orders', { 
      shippingAddress,
      paymentMethod: 'stripe'
    });

    setOrder(res.data);
    setShowPayment(true);
  } catch (err: any) {
    alert(err.response?.data?.error || 'Failed to create order');
  }
};

const handlePaymentSuccess = () => {
  alert('Payment successful!');
  navigate('/orders');
};

// In your render
{showPayment && order ? (
  <PaymentCheckout 
    orderId={order._id}
    amount={order.total}
    onSuccess={handlePaymentSuccess}
    onCancel={() => setShowPayment(false)}
  />
) : (
  <button onClick={handleCheckout}>
    Proceed to Payment
  </button>
)}
```

## Step 8: Test Payment Flow

### Test Card Numbers (Stripe Test Mode)

**Success**:
- Card: 4242 4242 4242 4242
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Decline**:
- Card: 4000 0000 0000 0002

**3D Secure**:
- Card: 4000 0027 6000 3184

### Test Scenarios
1. Add book to cart
2. Go to checkout
3. Click "Proceed to Payment"
4. Use test card details
5. Verify order status updates to "paid"

## Step 9: Handle Webhooks in Production

### Deploy Webhook Endpoint

1. Your endpoint: `https://your-api.com/api/payment/webhook`

2. In Stripe Dashboard:
   - Developers → Webhooks
   - Add endpoint
   - URL: `https://your-api.com/api/payment/webhook`
   - Events to send:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`

3. Get webhook signing secret
4. Add to production `.env`

## Step 10: Production Checklist

- [ ] Use live Stripe keys
- [ ] Enable HTTPS (required for Stripe)
- [ ] Configure webhook endpoint
- [ ] Test with real cards (small amounts)
- [ ] Set up webhook notifications
- [ ] Enable Stripe fraud protection (Radar)
- [ ] Add payment confirmation emails
- [ ] Test refund flow

## Payment Flow Diagram

```
Customer
   ↓
1. Add to Cart
   ↓
2. Checkout
   ↓
3. Create Order (pending)
   ↓
4. Create Payment Intent (Stripe)
   ↓
5. Show Payment Form
   ↓
6. Enter Card Details
   ↓
7. Stripe Processes Payment
   ↓
8. Webhook → Update Order Status
   ↓
9. Send Confirmation Email
   ↓
10. Show Success Page
```

## Error Handling

### Common Errors

**"No such payment_intent"**
- Check payment intent ID is correct
- Verify Stripe keys match environment

**"Invalid API key"**
- Use correct key (test vs live)
- Check for typos in .env

**"Webhook signature verification failed"**
- Verify webhook secret is correct
- Check timestamp (should be recent)

**CORS errors**
- Add payment endpoint to CORS whitelist
- Check CLIENT_URL in .env

## Advanced Features

### 1. Save Cards for Later
```typescript
// Use Stripe Customer + Payment Methods
const customer = await stripe.customers.create({
  email: user.email
});

// Attach payment method to customer
await stripe.paymentMethods.attach(
  paymentMethodId,
  { customer: customerId }
);
```

### 2. Refunds
```typescript
// In routes/payment.ts
router.post('/refund', async (req, res) => {
  const { paymentIntentId, amount } = req.body;

  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount: amount * 100 // Convert to paise
  });

  res.json({ refund });
});
```

### 3. Subscriptions
Use Stripe Billing for book subscriptions:
```typescript
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ plan: 'price_xxx' }],
});
```

### 4. Invoices
Generate PDF invoices:
```typescript
const invoice = await stripe.invoices.create({
  customer: customerId,
});

const pdf = await stripe.invoices.retrieve(
  invoice.id,
  { expand: ['pdf'] }
);
```

## Testing Checklist

- [ ] Test card payment (success)
- [ ] Test card decline
- [ ] Test 3D Secure
- [ ] Test webhook delivery
- [ ] Test order status update
- [ ] Test confirmation email
- [ ] Test mobile payment (Apple Pay/Google Pay)
- [ ] Test refund flow
- [ ] Test webhook retry

## Security Best Practices

1. **Never expose secret keys**
   - Keep in .env
   - Never commit to git
   - Use environment variables in production

2. **Use HTTPS**
   - Required for Stripe in production
   - Use Let's Encrypt for free SSL

3. **Validate webhook signatures**
   - Verify Stripe signature
   - Check timestamp

4. **Idempotency**
   - Handle duplicate webhooks
   - Use idempotency keys

5. **PCI Compliance**
   - Use Stripe Elements (already done)
   - Never store raw card data

## Useful Stripe Features

- **Stripe Radar**: Fraud prevention
- **Stripe Connect**: Marketplace payments
- **Stripe Terminal**: In-person payments
- **Stripe Checkout**: Pre-built payment page
- **Stripe Payment Links**: No-code payment buttons

## Support Resources

- **Stripe Docs**: https://stripe.com/docs
- **API Reference**: https://stripe.com/docs/api
- **Community**: https://support.stripe.com
- **Test Cards**: https://stripe.com/docs/testing

## Cost

Stripe charges:
- **2.9% + ₹2** per successful card transaction
- No setup fees
- No monthly fees
- Free test mode

Example:
- ₹1000 sale = ₹31 fee
- You receive: ₹969

---

**Happy Selling!** 💳📚
