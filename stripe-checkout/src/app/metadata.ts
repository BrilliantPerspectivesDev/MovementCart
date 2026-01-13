import { Metadata } from 'next';

// Base metadata that applies to all pages
export const defaultMetadata: Metadata = {
  title: {
    default: 'Brilliant Movement',
    template: '%s | Brilliant Movement'
  },
  description: 'Join Brilliant Movement and cultivate an extraordinary relationship with God through community, resources, and direct learning.',
  keywords: ['Brilliant Movement', 'Graham Cooke', 'Faith Community', 'Spiritual Growth', 'Kingdom Living', 'Christian Fellowship'],
  authors: [{ name: 'Graham Cooke', url: 'https://www.brilliantperspectives.com' }],
  creator: 'Brilliant Perspectives LLC',
  publisher: 'Brilliant Perspectives LLC',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  metadataBase: new URL('https://brilliantmovement.com/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brilliantmovement.com',
    siteName: 'Brilliant Movement',
    title: 'Brilliant Movement - Making Kingdom Normal',
    description: 'Join Brilliant Movement and cultivate an extraordinary relationship with God through community, resources, and direct learning.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brilliant Movement',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brilliant Movement - Making Kingdom Normal',
    description: 'Join Brilliant Movement and cultivate an extraordinary relationship with God through community, resources, and direct learning.',
    creator: '@brilliantmvmt',
    images: ['/twitter-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/Brilliant_ICON_Full-Color.png', sizes: 'any' },
      { url: '/Brilliant_ICON_Full-Color.png', type: 'image/png' },
    ],
    apple: [
      { url: '/Brilliant_ICON_Full-Color.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'placeholder-for-google-verification-code',
  },
};

// Home page specific metadata
export const homeMetadata: Metadata = {
  ...defaultMetadata,
  title: 'Brilliant Movement - A Simple, Relational Way of Being with God',
  description: 'Join Brilliant with Graham Cooke and become a member of the global movement experiencing God\'s love every day with an exclusive app, gatherings, and global small groups. Discover a simple, relational approach to faith without religious performance.',
  keywords: ['Brilliant Movement', 'Graham Cooke', 'Faith Community', 'Spiritual Growth', 'Kingdom Living', 'Christian Fellowship', 'Prayer App', 'Spiritual App', 'Christian Meditation', 'Faith Journey', 'Relationship with God', 'Christian Community'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    ...defaultMetadata.openGraph as any,
    title: 'Brilliant Movement - A Simple, Relational Way of Being with God',
    description: 'Join Brilliant with Graham Cooke and become a member of the global movement experiencing God\'s love every day with an exclusive app, gatherings, and global small groups. Discover a simple, relational approach to faith without religious performance.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brilliant Movement - A simple, relational way of being with God',
        type: 'image/jpeg',
      },
      {
        url: '/Final-Mockups-Medium.png',
        width: 700,
        height: 700,
        alt: 'Brilliant App Interface',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brilliant Movement - A Simple, Relational Way of Being with God',
    description: 'Join Brilliant with Graham Cooke and become a member of the global movement experiencing God\'s love every day with an exclusive app, gatherings, and global small groups.',
    creator: '@brilliantmvmt',
    images: ['/og-image.jpg'],
  },
};

// Ambassador page specific metadata
export const ambassadorMetadata: Metadata = {
  ...defaultMetadata,
  title: 'Become an Ambassador | Brilliant Movement',
  description: 'Join the Brilliant Ambassador program and share the movement while growing your impact and income through exclusive benefits and training.',
  alternates: {
    canonical: '/ambassador',
  },
  openGraph: {
    ...defaultMetadata.openGraph as any,
    title: 'Become an Ambassador | Brilliant Movement',
    description: 'Join the Brilliant Ambassador program and share the movement while growing your impact and income through exclusive benefits and training.',
    images: [
      {
        url: '/ambassador-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Brilliant Movement Ambassador Program',
      },
    ],
  },
};

// Checkout page specific metadata
export const checkoutMetadata: Metadata = {
  ...defaultMetadata,
  title: 'Join Brilliant Movement | Membership Checkout',
  description: 'Complete your Brilliant Movement membership registration and unlock access to exclusive content, gatherings, and community.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/checkout',
  },
};

// Blog/Article schema for structured data
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime: string;
  authors: string[];
  imageUrl: string;
  url: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.imageUrl,
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime,
    author: article.authors.map(author => ({
      '@type': 'Person',
      name: author,
    })),
    publisher: {
      '@type': 'Organization',
      name: 'Brilliant Perspectives LLC',
      logo: {
        '@type': 'ImageObject',
        url: 'https://brilliantmovement.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
};

// Organization schema for structured data
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Brilliant Perspectives LLC',
  url: 'https://brilliantmovement.com',
  logo: 'https://brilliantmovement.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-800-351-7541',
    contactType: 'customer service',
    email: 'help@brilliantperspectives.com',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.facebook.com/brilliantperspectives',
    'https://www.instagram.com/brilliant_perspectives',
    'https://twitter.com/brilliantmvmt',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '735 State St. #517',
    addressLocality: 'Santa Barbara',
    addressRegion: 'CA',
    postalCode: '93101',
    addressCountry: 'US',
  },
};

// Product schema for the Brilliant Plus app
export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Brilliant Plus',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '9.99',
    priceCurrency: 'USD',
    priceValidUntil: '2024-12-31',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    ratingCount: '4000',
    bestRating: '5',
    worstRating: '1',
  },
  description: 'Brilliant Plus is the essential companion to any member of the Brilliant Movement. With over 600 teachings, guided prayer sessions, meditations, soaking sessions and an ever growing library of sleep content.',
  image: 'https://brilliantmovement.com/Final-Mockups-Medium.png',
  downloadUrl: 'https://central.brilliantmovement.com/checkout?ref=movement',
  author: {
    '@type': 'Person',
    name: 'Graham Cooke',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Brilliant Perspectives LLC',
    logo: {
      '@type': 'ImageObject',
      url: 'https://brilliantmovement.com/logo.png',
    },
  },
};

// FAQ Schema for homepage
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Brilliant Movement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Brilliant Movement is a global community led by Graham Cooke dedicated to experiencing a simple, relational way of being with God without the pressure of religious performance.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is included in a Brilliant membership?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Membership includes access to the Brilliant Plus app with over 600 teachings, guided prayer sessions, and meditations, monthly online gatherings, global small groups, and exclusive access to events.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is there a free trial available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer a five-day free trial so you can experience the Brilliant membership before committing.'
      }
    },
    {
      '@type': 'Question',
      name: 'How often are the gatherings held?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monthly gatherings are held on the first Monday of each month with Graham Cooke and the Brilliant community.'
      }
    }
  ]
};

// Person schema for Graham Cooke
export const grahamCookeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Graham Cooke',
  description: 'Internationally recognized author, teacher, and speaker specializing in Christian spiritual growth and transformational teachings.',
  image: 'https://brilliantmovement.com/Graham2.png',
  url: 'https://brilliantmovement.com',
  jobTitle: 'Founder of Brilliant Perspectives LLC',
  worksFor: {
    '@type': 'Organization',
    name: 'Brilliant Perspectives LLC'
  },
  sameAs: [
    'https://www.facebook.com/brilliantperspectives',
    'https://www.instagram.com/brilliant_perspectives',
    'https://twitter.com/brilliantmvmt'
  ],
  knowsAbout: [
    'Spiritual Growth',
    'Christian Meditation',
    'Identity in Christ',
    'Relationship with God',
    'Kingdom Living'
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Author and Speaker',
    description: 'Creator of transformational content focused on spiritual growth and Christian identity',
    occupationLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Santa Barbara',
        addressRegion: 'CA',
        addressCountry: 'US'
      }
    }
  }
};

// Ambassador Only Funnel metadata
export const ambassadorOnlyMetadata: Metadata = {
  title: 'Become a Brilliant Ambassador | Join Our Referral Program',
  description: 'Join the Brilliant Ambassador Program for just $10/year. Earn commissions by sharing Brilliant with others and enjoy exclusive ambassador benefits.',
  keywords: 'Brilliant ambassador program, referral program, earn commissions, Graham Cooke ambassador',
  openGraph: {
    title: 'Become a Brilliant Ambassador | Join Our Referral Program',
    description: 'Join the Brilliant Ambassador Program for just $10/year. Earn commissions by sharing Brilliant with others and enjoy exclusive ambassador benefits.',
    images: [
      {
        url: '/og-image-ambassador.jpg',
        width: 1200,
        height: 630,
        alt: 'Brilliant Ambassador Program',
      },
    ],
    type: 'website',
    url: '/ambassador-only',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Become a Brilliant Ambassador | Join Our Referral Program',
    description: 'Join the Brilliant Ambassador Program for just $10/year. Earn commissions by sharing Brilliant with others and enjoy exclusive ambassador benefits.',
    images: ['/og-image-ambassador.jpg'],
  },
  alternates: {
    canonical: '/ambassador-only',
  },
  robots: 'index, follow',
};

// JSON-LD schema for Ambassador Only page
export const ambassadorSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Brilliant Ambassador Program',
  description: 'Join our ambassador program and earn commissions by sharing Brilliant with others.',
  offers: {
    '@type': 'Offer',
    price: '10.00',
    priceCurrency: 'USD',
    priceValidUntil: '2025-12-31',
    availability: 'https://schema.org/InStock',
    url: 'https://brilliantmovement.com/ambassador-only',
  },
  brand: {
    '@type': 'Brand',
    name: 'Brilliant Perspectives',
  },
  category: 'Affiliate Program',
  material: 'Digital Subscription',
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Subscription Period',
      value: 'Annual',
    },
    {
      '@type': 'PropertyValue',
      name: 'Benefits',
      value: 'Commissions on referrals, ambassador tools, exclusive resources',
    },
  ],
};