// Function to extract address components from Google Places API response
export function parseAddressComponents(place: google.maps.places.PlaceResult) {
  const addressComponents = place.address_components || [];
  
  // Initialize an object to store the parsed components
  const parsedAddress: {
    streetNumber: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  } = {
    streetNumber: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  };

  // Map the Google address components to our format
  addressComponents.forEach(component => {
    const types = component.types;

    if (types.includes('street_number')) {
      parsedAddress.streetNumber = component.long_name;
    } else if (types.includes('route')) {
      parsedAddress.street = component.long_name;
    } else if (types.includes('locality')) {
      parsedAddress.city = component.long_name;
    } else if (types.includes('administrative_area_level_1')) {
      parsedAddress.state = component.short_name;
    } else if (types.includes('postal_code')) {
      parsedAddress.postalCode = component.long_name;
    } else if (types.includes('country')) {
      parsedAddress.country = component.long_name;
    }
  });

  // Combine street number and street name for the full street address
  const streetAddress = [parsedAddress.streetNumber, parsedAddress.street]
    .filter(Boolean)
    .join(' ');

  return {
    streetAddress,
    city: parsedAddress.city,
    state: parsedAddress.state,
    postalCode: parsedAddress.postalCode,
    country: parsedAddress.country,
  };
} 