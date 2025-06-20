// src/components/MapSelector.jsx
import React, { useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';

export default function MapSelector({ onSelect, role }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 14.5995, lng: 120.9842 }, // Default: Manila
        zoom: 11,
      });

      geocoderRef.current = new window.google.maps.Geocoder();

      map.addListener('click', async (e) => {
        const latlng = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };

        if (markerRef.current) {
          markerRef.current.setPosition(latlng);
        } else {
          markerRef.current = new window.google.maps.Marker({
            position: latlng,
            map,
          });
        }

        geocoderRef.current.geocode({ location: latlng }, async (results, status) => {
          let address;
          if (status === 'OK' && results[0]) {
            address = results[0].formatted_address;
          } else {
            address = `Lat: ${latlng.lat}, Lng: ${latlng.lng}`;
          }

          // Get or generate session_id
          let session_id = localStorage.getItem('chat_session_id');
          if (!session_id) {
            session_id = crypto.randomUUID();
            localStorage.setItem('chat_session_id', session_id);
          }
          // Log to Supabase
          await supabase.from('chat_locations').insert([
            {
              session_id,
              role,
              address
            }
          ]);

          onSelect(address);
        });
      });
    };

    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, [onSelect, role]);

  return (
    <div className="w-full h-[75vh]">
      <div ref={mapRef} className="w-full h-full rounded-xl shadow" />
    </div>
  );
}
