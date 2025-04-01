import { useState, useEffect } from 'react';
import { LoginDetails, LoginResponse } from '../types/login';

interface UseLoginDetailsResult {
  loginDetails: LoginDetails | null;
  isLoading: boolean;
  error: string | null;
}

export function useLoginDetails(
  subscriptionId: string | null,
  endpoint: string,
  timeout: number = 60000 // 1 minute timeout
): UseLoginDetailsResult {
  const [loginDetails, setLoginDetails] = useState<LoginDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 12; // 1 minute with 5-second intervals

  useEffect(() => {
    if (!subscriptionId) {
      setError('No subscription ID provided');
      setIsLoading(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let mounted = true;

    const pollForLoginDetails = async () => {
      try {
        console.log(`Fetching login details from ${endpoint}`, {
          subscriptionId,
          retryCount,
          timestamp: new Date().toISOString()
        });

        const response = await fetch(`${endpoint}?subscriptionId=${subscriptionId}`);
        const data: LoginResponse = await response.json();

        console.log('Received response:', {
          success: data.success,
          hasDetails: !!data.details,
          timestamp: new Date().toISOString()
        });

        if (!mounted) return;

        if (data.success && data.details) {
          setLoginDetails(data.details);
          setIsLoading(false);
          setError(null);
        } else {
          if (retryCount < MAX_RETRIES) {
            console.log(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
            setTimeout(() => {
              if (mounted) {
                setRetryCount(prev => prev + 1);
              }
            }, 5000);
          } else {
            setIsLoading(false);
            setError('Unable to retrieve login details after multiple attempts');
          }
        }
      } catch (error) {
        console.error('Error fetching login details:', error);
        if (!mounted) return;

        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            if (mounted) {
              setRetryCount(prev => prev + 1);
            }
          }, 5000);
        } else {
          setIsLoading(false);
          setError('An error occurred while retrieving your login details');
        }
      }
    };

    // Set timeout for the entire polling process
    timeoutId = setTimeout(() => {
      if (mounted && isLoading) {
        setIsLoading(false);
        setError('Request timed out. Please contact support.');
      }
    }, timeout);

    pollForLoginDetails();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [subscriptionId, retryCount, endpoint, timeout]);

  return { loginDetails, isLoading, error };
} 