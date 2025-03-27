export { default } from '../checkout-original'; 

// Inner form component that has access to Stripe hooks
function CheckoutForm({ selectedFrequency }: { selectedFrequency: string }) {
  const { items } = useCart();
  const { initiateCheckout, isLoading, error } = useCheckout();
  const stripe = useStripe();
  const elements = useElements();
  const pathname = usePathname();

  // Get stored referral code from localStorage
  const [storedPathParam, setStoredPathParam] = useState<string>('');
  
  useEffect(() => {
    // Get the stored path param from localStorage
    const pathParam = localStorage.getItem('pathParam');
    if (pathParam) {
      console.log('Retrieved stored path param:', pathParam);
      setStoredPathParam(pathParam);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded');
      return;
    }

    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Create payment method
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: {
            line1: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: formData.country,
          },
        },
      });

      if (pmError) {
        throw pmError;
      }

      // Initiate checkout with payment method and stored path param
      const response = await initiateCheckout(
        items,
        formData,
        selectedFrequency,
        paymentMethod.id,
        storedPathParam // Pass the stored path param
      );

      if (response.error) {
        throw new Error(response.error);
      }

      // Handle successful checkout
      if (response.subscriptionId) {
        window.location.href = `/success?subscription=${response.subscriptionId}`;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component code ...
} 