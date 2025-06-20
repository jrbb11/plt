// src/utils/rates.js

export function haversineDistance([lat1, lon1], [lat2, lon2]) {
  const toRad = deg => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const fareTable = [
  { min: 1, max: 4, fare: 500 },
  { min: 5, max: 10, fare: 800 },
  { min: 11, max: 15, fare: 1000 },
  { min: 16, max: 20, fare: 1300 },
  { min: 21, max: 25, fare: 1500 },
  { min: 26, max: 30, fare: 1700 },
  { min: 31, max: 35, fare: 2100 },
  { min: 36, max: 40, fare: 2400 },
  { min: 41, max: 45, fare: 2700 },
  { min: 46, max: 50, fare: 3000 },
  { min: 51, max: 55, fare: 3300 },
  { min: 56, max: 60, fare: 3700 },
  { min: 61, max: 65, fare: 4000 },
  { min: 66, max: 70, fare: 4300 }
];

export function calculateFare(distanceKm, vehicleType = 'Car') {
  const km = Math.ceil(distanceKm);

  if (vehicleType === 'Motorcycle') {
      return km <= 15 ? 450 : 450 + (km - 15) * 20;
  }

  // Car logic
  const bracket = fareTable.find(r => km >= r.min && km <= r.max);
  if (bracket) {
      return bracket.fare;
  }

  // For distances above 70 km
  if (km > 70) {
      const baseFare = fareTable.find(r => r.max === 70)?.fare || 4300;
      const extraKm = km - 70;
      const extraBlocks = Math.ceil(extraKm / 5);
      return baseFare + (extraBlocks * 200);
  }

  // Fallback
  return fareTable[fareTable.length - 1].fare;
}
