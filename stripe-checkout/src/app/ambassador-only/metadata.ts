import { Metadata } from 'next';
import { ambassadorOnlyMetadata, ambassadorSchema } from '../index';

// Export metadata for the ambassador-only page
export const metadata: Metadata = ambassadorOnlyMetadata;

// Export schema for structured data
export const generateMetadata = () => {
  return {
    jsonLd: ambassadorSchema,
  };
}; 