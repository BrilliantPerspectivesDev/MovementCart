// Re-export all schema objects and metadata from metadata.ts
export * from './metadata';

// Export default metadata for pages
export { 
  defaultMetadata,
  homeMetadata,
  ambassadorMetadata, 
  checkoutMetadata,
  ambassadorOnlyMetadata
} from './metadata';

// Export schema objects
export { 
  organizationSchema,
  productSchema,
  faqSchema,
  grahamCookeSchema,
  ambassadorSchema
} from './metadata';

// Export utility function for article schema generation
export { generateArticleSchema } from './metadata'; 