import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { calculateSunTimes } from '@/data/creatorsCalendar';

interface SunTimes {
  dawn: string;
  sunrise: string;
  solarNoon: string;
  sunset: string;
  dusk: string;
}

interface Location {
  latitude: number;
  longitude: number;
  locationName?: string;
  timezone?: string;
}

export const useSunTimes = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [sunTimes, setSunTimes] = useState<SunTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate sun times when location changes
  useEffect(() => {
    if (location) {
      const times = calculateSunTimes(new Date(), location.latitude, location.longitude);
      setSunTimes(times);
    }
  }, [location, currentTime.toDateString()]);

  // Get user's location from browser
  const getGeolocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLocation: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Try to get location name using reverse geocoding
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLocation.latitude}&lon=${newLocation.longitude}`
          );
          const data = await response.json();
          newLocation.locationName = data.display_name?.split(',').slice(0, 3).join(',') || 'Your Location';
        } catch {
          newLocation.locationName = 'Your Location';
        }

        setLocation(newLocation);
        setLoading(false);

        // Save to database if user is logged in
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase.from('user_locations').upsert({
              user_id: user.id,
              latitude: newLocation.latitude,
              longitude: newLocation.longitude,
              location_name: newLocation.locationName,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            }, { onConflict: 'user_id' });
          }
        } catch {
          // Silently fail - not critical
        }
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
    );
  }, []);

  // Load saved location from database
  const loadSavedLocation = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('user_locations')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setLocation({
            latitude: parseFloat(data.latitude as unknown as string),
            longitude: parseFloat(data.longitude as unknown as string),
            locationName: data.location_name || undefined,
            timezone: data.timezone || undefined,
          });
        }
      }
    } catch {
      // No saved location - that's fine
    }
  }, []);

  // Search for a location by name
  const searchLocation = useCallback(async (query: string): Promise<Location[]> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      
      return data.map((item: { lat: string; lon: string; display_name: string }) => ({
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        locationName: item.display_name,
      }));
    } catch {
      return [];
    }
  }, []);

  // Set location manually by coordinates
  const setCoordinates = useCallback(async (lat: number, lon: number, name?: string) => {
    const newLocation: Location = {
      latitude: lat,
      longitude: lon,
      locationName: name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
    };

    if (!name) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        newLocation.locationName = data.display_name?.split(',').slice(0, 3).join(',') || newLocation.locationName;
      } catch {
        // Keep coordinates as name
      }
    }

    setLocation(newLocation);

    // Save to database if user is logged in
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('user_locations').upsert({
          user_id: user.id,
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
          location_name: newLocation.locationName,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }, { onConflict: 'user_id' });
      }
    } catch {
      // Silently fail
    }
  }, []);

  // Initialize
  useEffect(() => {
    loadSavedLocation();
  }, [loadSavedLocation]);

  return {
    location,
    sunTimes,
    loading,
    error,
    currentTime,
    getGeolocation,
    searchLocation,
    setCoordinates,
    setLocation,
  };
};
