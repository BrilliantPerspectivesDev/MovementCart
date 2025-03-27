# Next.js Stripe Checkout Demo

This project demonstrates how to implement a Stripe checkout process in a Next.js application. It includes products listing, shopping cart functionality, and Stripe payment processing.

## Features

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Responsive design (mobile-friendly)
- Shopping cart with localStorage persistence
- Stripe Checkout integration
- Product listing and details

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A Stripe account (for API keys)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nextjs-stripe-checkout.git
cd nextjs-stripe-checkout
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Stripe API keys:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js application code
  - `api/` - API routes
  - `components/` - Reusable UI components
  - `context/` - React context for state management
  - `data/` - Sample data
  - `hooks/` - Custom React hooks
  - `types/` - TypeScript types

## Deployment

The project can be deployed using [Vercel](https://vercel.com/) or any other hosting provider that supports Next.js applications.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Stripe](https://stripe.com/)
- [Tailwind CSS](https://tailwindcss.com/) 