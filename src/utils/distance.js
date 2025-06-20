// src/utils/distance.js

export async function getDrivingDistance(pickupPos, dropoffPos) {
    const [pickupLat, pickupLng] = pickupPos;
    const [dropoffLat, dropoffLng] = dropoffPos;
  
    // TODO: Remove Mapbox API usage. Implement alternative distance calculation if needed.
    // const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLng},${pickupLat};${dropoffLng},${dropoffLat}?geometries=geojson&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`;
  
    const res = await fetch(url);
    const data = await res.json();
  
    if (data.routes && data.routes.length > 0) {
      const meters = data.routes[0].distance;
      return (meters / 1000).toFixed(2);  // Convert meters to km
    } else {
      throw new Error("No route found");
    }
  }
  