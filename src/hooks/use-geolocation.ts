"use client";

import { useState, useEffect } from 'react';

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

interface GeolocationPosition {
  coords: GeolocationCoordinates;
  timestamp: number;
}

interface GeolocationError {
  code: number;
  message: string;
}

export interface UseGeolocationState {
  loading: boolean;
  coordinates: GeolocationCoordinates | null;
  error: GeolocationError | null;
  timestamp: number | null;
}

const defaultGeolocationOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000, // 10 seconds
  maximumAge: 0, // Force fresh location
};

export function useGeolocation(options: PositionOptions = defaultGeolocationOptions): UseGeolocationState {
  const [state, setState] = useState<UseGeolocationState>({
    loading: true,
    coordinates: null,
    error: null,
    timestamp: null,
  });

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setState(s => ({ ...s, loading: false, error: { code: 0, message: "Geolocation is not supported by your browser." } }));
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        loading: false,
        coordinates: position.coords,
        timestamp: position.timestamp,
        error: null,
      });
    };

    const onError = (error: GeolocationError) => {
      setState(s => ({ ...s, loading: false, error, coordinates: null }));
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    
    // Optional: If you need continuous updates, uncomment the watchPosition part.
    // const watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
    // return () => navigator.geolocation.clearWatch(watchId);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run once on mount. Options could be added if dynamic.

  return state;
}
