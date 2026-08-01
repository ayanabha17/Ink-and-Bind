# 📧 Email Notifications Setup Guide

Complete guide to setting up email notifications for your bookstore.

## Why Email Notifications?

- Order confirmations
- Password reset
- Shipping updates
- Welcome emails
- Promotional emails

## Step 1: Choose Email Provider

### Option A: Gmail (Free, Easy)

**Pros**: Free, easy setup
**Cons**: 500 emails/day limit, requires app password

### Option B: SendGrid (Recommended for Production)

**Pros**: 100 free emails/day, reliable, analytics
**Cons**: Requires account setup

### Option C: AWS SES

**Pros**: Very cheap, scalable
**Cons**: More complex setup

### Option D: Mailgun

**Pros**: Good free tier, developer-friendly
**Cons**: Requires verification

## Step 2: Setup Gmail (Quickest)

### Create App Password

1. Go to Google Account: https://myaccount.google.com
2. Security → 2-Step Verification (enable if not enabled)
3. App passwords → Select app: Mail → Select device: Other
4. Enter name: "Bookstore"
5. Copy the 16-character password

### Add to `.env`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
SMTP_FROM=Bookstore <your-email@gmail.com>
```

## Step 3: Setup SendGrid (Production)

### Create Account

1. Go to https://sendgrid.com
2. Sign up for free account
3. Verify email

### Create API Key

1. Settings → API Keys
2. Create API Key
3. Name: "Bookstore"
4. Permissions: Full Access
5. Copy API key

### Add to `.env`

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SMTP_FROM=Bookstore <noreply@yourdomain.com>
```

## Step 4: Install Dependencies

```bash
cd server
npm install nodemailer @types/nodemailer
```

## Step 5: Test Email Sending

### Create test email script

Create `server/src/utils/test-email.ts`:

```typescript
import { sendEmail } from './email';

async function testEmail() {
  try {
    await sendEmail({
      to: 'your-email@gmail.com',
      subject: 'Test Email from Bookstore',
      html: '<h1>Success!</h1><p>Email is working.</p>'
    });
    console.log('✓ Test email sent!');
  } catch (error: any) {
    console.error('✗ Test failed:', error.message);
  }
}

testEmail();
```

Run:
```bash
npx ts-node src/utils/test-email.ts
```

## Step 6: Integrate with App

### User Signup

In `server/src/routes/auth.ts`:

```typescript
import { sendWelcomeEmail } from '../utils/email';

router.post('/signup', [
  // ... validation
], async (req, res, next) => {
  try {
    // ... create user

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name)
      .catch(console.error); // Don't fail signup if email fails

    res.json({ /* user data */ });
  } catch (error) {
    next(error);
  }
});
```

### Order Confirmation

In `server/src/routes/orders.ts`:

```typescript
import { sendOrderConfirmation } from '../utils/email';

router.post('/', [
  authMiddleware,
  // ... validation
], async (req: AuthRequest, res, next) => {
  try {
    // ... create order

    // Send confirmation email
    const user = await User.findById(order.user);
    await sendOrderConfirmation(user.email, order, user)
      .catch(console.error);

    res.json({ /* order data */ });
  } catch (error) {
    next(error);
  }
});
```

### Password Reset

In `server/src/routes/auth.ts`:

```typescript
import crypto from 'crypto';
import { sendPasswordReset } from '../utils/email';

router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: 'If email exists, reset link sent' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&email=${email}`;

    // Send email
    await sendPasswordReset(email, resetUrl, user.name);

    res.json({ message: 'If email exists, reset link sent' });
  } catch (error) {
    next(error);
  }
});
```

## Step 7: Email Templates

### Customizing Templates

All email templates are in `server/src/utils/email.ts`:

- `sendOrderConfirmation()` - Order confirmation email
- `sendPasswordReset()` - Password reset email
- `sendOrderShipped()` - Shipping notification
- `sendWelcomeEmail()` - Welcome email

### Customization Tips

1. **Branding**: Add your logo to header
2. **Colors**: Match your brand colors
3. **Content**: Customize message tone
4. **Links**: Add social media links
5. **Footer**: Add unsubscribe link

### Adding Logo

```html
<div class="header">
  <img src="https://yourdomain.com/logo.png" alt="Bookstore" style="width: 150px;">
  <h1>Order Confirmed!</h1>
</div>
```

## Step 8: Production Setup

### DNS Configuration (SendGrid)

1. SendGrid → Settings → Sender Authentication
2. Authenticate Domain
3. Add DNS records to your domain:
   - CNAME records
   - MX records
   - TXT records

### Verify Sending Domain

1. Settings → Sender Authentication
2. Verify domain
3. Add SPF/DKIM records

### Rate Limiting

```env
# In .env
EMAIL_RATE_LIMIT=100  # emails per hour
```

## Step 9: Monitor Email Delivery

### SendGrid Dashboard

- View sent emails
- Track opens/clicks
- Monitor bounces
- Check spam reports

### Gmail

- Check "Sent" folder
- Monitor "All Mail"
- Watch for bounces

## Step 10: Email Best Practices

### Deliverability

1. **Use verified domain**
2. **Set up SPF/DKIM**
3. **Don't use spammy words**
4. **Include unsubscribe link**
5. **Test spam score**

### Content

1. **Clear subject lines**
2. **Mobile-friendly design**
3. **Plain text alternative**
4. **Test on multiple clients**
5. **Include contact info**

### Security

1. **Never send passwords**
2. **Use tokens for reset links**
3. **Encrypt sensitive data**
4. **Use HTTPS for links**
5. **Validate all inputs**

## Troubleshooting

### "Authentication failed"

```bash
# Check credentials
echo $SMTP_USER
echo $SMTP_PASS

# Test connection
telnet smtp.gmail.com 587
```

### "Connection timeout"

- Check firewall
- Verify port (587 or 465)
- Try different SMTP_HOST

### "Rate limit exceeded"

- Wait 24 hours (Gmail)
- Upgrade to SendGrid
- Implement email queue

### Emails going to spam

- Set up SPF/DKIM
- Verify domain
- Improve content
- Reduce sending frequency

## Testing Email Templates

### Tools

1. **Litmus**: https://litmus.com
2. **Email on Acid**: https://www.emailonacid.com
3. **PutsMail**: https://putsmail.com

### Manual Testing

1. Send to Gmail
2. Send to Outlook
3. Send to Yahoo
4. Test on mobile
5. Test dark mode

## Email Analytics

Track:
- Open rate
- Click rate
- Bounce rate
- Unsubscribe rate
- Spam complaints

### Tools

- SendGrid Analytics
- Google Analytics (UTM parameters)
- Mixpanel

## Advanced Features

### 1. Email Templates

```typescript
// Create reusable templates
const templates = {
  orderConfirmation: (order: any) => `...`,
  passwordReset: (url: string) => `...`,
};
```

### 2. Email Queue

```typescript
// Use Bull/Redis for queue
import Queue from 'bull';

const emailQueue = new Queue('emails');

emailQueue.process(async (job) => {
  await sendEmail(job.data);
});

// Add to queue
emailQueue.add({
  to: 'user@example.com',
  subject: 'Order Confirmation',
  html: '...'
});
```

### 3. Batch Emails

```typescript
// Send to multiple users
const users = await User.find({ role: 'user' });

for (const user of users) {
  await sendWelcomeEmail(user.email, user.name);
  await delay(1000); // Rate limit
}
```

### 4. Scheduled Emails

```typescript
// Send at specific time
const sendAt = new Date('2026-08-01 10:00:00');

emailQueue.add(
  { to: 'user@example.com', subject: 'Sale!' },
  { delay: sendAt.getTime() - Date.now() }
);
```

## Cost Comparison

| Provider | Free Tier | Paid Plan |
|----------|-----------|-----------|
| Gmail | 500/day | Free |
| SendGrid | 100/day | ₹1,200/month |
| Mailgun | 5,000/month | ₹1,000/month |
| AWS SES | 62,000/month | ₹0.70/1000 |

## Email Checklist

Before going live:

- [ ] Test all email templates
- [ ] Verify domain
- [ ] Set up SPF/DKIM
- [ ] Test on multiple email clients
- [ ] Check spam score
- [ ] Add unsubscribe link
- [ ] Set up bounce handling
- [ ] Configure reply-to address
- [ ] Add tracking (optional)
- [ ] Test mobile responsiveness

## Support Resources

- **Nodemailer Docs**: https://nodemailer.com
- **SendGrid Docs**: https://sendgrid.com/docs
- **Gmail SMTP**: https://support.google.com/mail
- **Email Best Practices**: https://www.emailonacid.com/blog

---

**Happy Emailing!** 📧📚
