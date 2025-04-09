// Analytics utility file for tracking custom events

// Define the window object with dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Track a button click in a specific section
 * @param buttonId - Unique identifier for the button
 * @param buttonText - Text displayed on the button
 * @param sectionName - Name of the section containing the button
 * @param position - Position of the button if there are multiple in a section
 */
export const trackButtonClick = (
  buttonId: string,
  buttonText: string,
  sectionName: string,
  position?: string
) => {
  if (typeof window !== 'undefined') {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    
    // Push event to dataLayer
    window.dataLayer.push({
      event: 'button_click',
      buttonId,
      buttonText,
      sectionName,
      position: position || 'not_specified',
      timestamp: new Date().toISOString()
    });
    
    // Also log to Vercel Analytics if available
    try {
      const { track } = require('@vercel/analytics');
      track('button_click', {
        buttonId,
        buttonText,
        sectionName,
        position: position || 'not_specified'
      });
    } catch (error) {
      console.log('Vercel Analytics not available');
    }
  }
};

/**
 * Track form submissions for opt-in rates
 * @param formId - Identifier for the form
 * @param formLocation - Location/section of the form
 * @param formType - Type of form (e.g., 'newsletter', 'contact')
 * @param success - Whether the submission was successful
 */
export const trackFormSubmission = (
  formId: string,
  formLocation: string,
  formType: string,
  success: boolean
) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    
    window.dataLayer.push({
      event: 'form_submission',
      formId,
      formLocation,
      formType,
      success,
      timestamp: new Date().toISOString()
    });
    
    try {
      const { track } = require('@vercel/analytics');
      track('form_submission', {
        formId,
        formLocation,
        formType,
        success
      });
    } catch (error) {
      console.log('Vercel Analytics not available');
    }
  }
};

/**
 * Track purchases/conversions
 * @param orderId - Unique order identifier
 * @param total - Total purchase amount
 * @param currency - Currency code
 * @param items - Array of purchased items
 * @param couponCode - Coupon code if applied
 */
export const trackPurchase = (
  orderId: string,
  total: number,
  currency: string = 'USD',
  items: any[] = [],
  couponCode?: string
) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    
    window.dataLayer.push({
      event: 'purchase',
      ecommerce: {
        transaction_id: orderId,
        value: total,
        currency: currency,
        items: items,
        coupon: couponCode || '',
      },
      timestamp: new Date().toISOString()
    });
    
    try {
      const { track } = require('@vercel/analytics');
      track('purchase', {
        orderId,
        total,
        currency,
        itemCount: items.length,
        couponApplied: !!couponCode
      });
    } catch (error) {
      console.log('Vercel Analytics not available');
    }
  }
};

/**
 * Track page views with additional context
 * @param pageName - Name of the page
 * @param pageType - Type of page (e.g., 'product', 'category', 'checkout')
 * @param referrer - Referring URL if available
 */
export const trackPageView = (
  pageName: string,
  pageType: string,
  referrer?: string
) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    
    window.dataLayer.push({
      event: 'page_view',
      pageName,
      pageType,
      referrer: referrer || document.referrer,
      timestamp: new Date().toISOString()
    });
    
    // Vercel Analytics tracks page views automatically
  }
};

/**
 * Track user engagement/interaction with specific elements
 * @param elementId - Identifier for the element
 * @param elementType - Type of element (e.g., 'video', 'carousel', 'accordion')
 * @param action - Action performed (e.g., 'play', 'next', 'expand')
 * @param sectionName - Section containing the element
 */
export const trackEngagement = (
  elementId: string,
  elementType: string,
  action: string,
  sectionName: string
) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    
    window.dataLayer.push({
      event: 'user_engagement',
      elementId,
      elementType,
      action,
      sectionName,
      timestamp: new Date().toISOString()
    });
    
    try {
      const { track } = require('@vercel/analytics');
      track('user_engagement', {
        elementId,
        elementType,
        action,
        sectionName
      });
    } catch (error) {
      console.log('Vercel Analytics not available');
    }
  }
}; 