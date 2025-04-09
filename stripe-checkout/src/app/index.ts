// Re-export all schema objects from metadata.ts to ensure they're available for import
export { 
  organizationSchema,
  productSchema,
  faqSchema,
  grahamCookeSchema,
  ambassadorSchema
} from './metadata';

// Export default metadata for pages
export { 
  defaultMetadata,
  homeMetadata,
  ambassadorMetadata, 
  checkoutMetadata,
  ambassadorOnlyMetadata
} from './metadata';

// Export utility function for article schema generation
export { generateArticleSchema } from './metadata'; 