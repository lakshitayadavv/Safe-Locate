"use client";

import { useState, useEffect, useCallback } from 'react';

function getValueFromLocalStorage<T>(key: string, initialValue: T | (() => T)): T {
  if (typeof window === 'undefined') {
    return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : (typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue);
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => getValueFromLocalStorage(key, initialValue));

  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (value) => {
      setStoredValue(prevValue => {
        const newValue = typeof value === 'function' ? (value as (prevState: T) => T)(prevValue) : value;
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(key, JSON.stringify(newValue));
          } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
          }
        }
        return newValue;
      });
    },
    [key]
  );
  
  useEffect(() => {
    // Initialize value from localStorage if not already done server-side (though useState handles initial)
    // This ensures client-side hydration picks up the correct localStorage value.
    const valueFromStorage = getValueFromLocalStorage(key, initialValue);
    if (JSON.stringify(valueFromStorage) !== JSON.stringify(storedValue)) {
       setStoredValue(valueFromStorage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);


  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
           console.warn(`Error parsing storage change for key "${key}":`, error);
        }
      } else if (event.key === key && event.newValue === null) {
        // Handle item removal
        setStoredValue(typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);


  return [storedValue, setValue];
}
