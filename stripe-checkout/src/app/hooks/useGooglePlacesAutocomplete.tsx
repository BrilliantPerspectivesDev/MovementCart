import { useEffect, useRef } from 'react';

interface GooglePlacesAutocompleteProps {
  inputId: string;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

export function useGooglePlacesAutocomplete({ 
  inputId, 
  onPlaceSelected 
}: GooglePlacesAutocompleteProps) {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    // Check if Google Maps API is loaded
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      const checkGoogleMapsLoaded = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkGoogleMapsLoaded);
          initAutocomplete();
        }
      }, 100);
      return () => clearInterval(checkGoogleMapsLoaded);
    } else {
      initAutocomplete();
    }

    function initAutocomplete() {
      const inputElement = document.getElementById(inputId) as HTMLInputElement;
      if (!inputElement) return;

      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputElement, {
        types: ['address'],
        fields: ['address_components', 'formatted_address', 'geometry']
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.address_components) {
          onPlaceSelected(place);
        }
      });
    }

    return () => {
      // Clean up the autocomplete when component unmounts
      // Google Maps API doesn't provide a clear way to destroy an autocomplete instance
      // So we remove the listeners if possible
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [inputId, onPlaceSelected]);

  return autocompleteRef;
} 