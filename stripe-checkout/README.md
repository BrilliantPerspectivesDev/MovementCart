# Brilliant Plus Checkout

A Next.js application with Stripe checkout integration for the Brilliant Plus subscription service.

## Features

- Modern, responsive UI with Tailwind CSS
- Stripe Elements integration for secure payments
- Multi-step checkout process
- Client and server-side validation
- Dynamic pricing options (monthly and annual)
- Free trial period
- Google Places API integration for address autocomplete

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Stripe account (for API keys)
- Google Maps API key (for address autocomplete)

## Setup

1. Clone the repository

```bash
git clone https://github.com/AlarmclockUSA/MomementCart.git
cd MomementCart
```

2. Install dependencies

```bash
npm install
```

3. Environment Variables Setup

Create a `.env.local` file in the root directory with your API keys:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_MONTHLY_PRODUCT_ID=your_stripe_monthly_product_id
STRIPE_ANNUAL_PRODUCT_ID=your_stripe_annual_product_id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**IMPORTANT SECURITY NOTE:**
- Never commit your `.env.local` file to version control
- The `.env.local` file is included in `.gitignore` to prevent accidental exposure
- Use `.env.example` as a reference template for required environment variables
- For production deployments, set these environment variables in your hosting platform

4. Start the development server

```bash
npm run dev
```

## Deployment

The application can be deployed to Vercel, Netlify, or any other Next.js compatible hosting platform. Make sure to set all required environment variables in your hosting provider's dashboard.

## Security Best Practices

- Always use environment variables for API keys and secrets
- Never hardcode API keys in the codebase
- The Stripe secret key should only be used on the server side
- Client-side code should only use the publishable key
- Set up proper CORS policies for production
- Consider implementing rate limiting for API routes

## License

MIT
