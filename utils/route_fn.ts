type Bin = {
    bin_id: string;
    lat: number;
    lng: number;
    fill_level: number;
    status: string;
  };
  
  const haversineDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  
  export function planRoute(bins: Bin[], station: { lat: number, lng: number }) {
    return bins
      .filter(bin => bin.fill_level >= 75 && bin.status === "Not Collected")
      .map(bin => ({
        ...bin,
        distance: haversineDistance(station.lat, station.lng, bin.lat, bin.lng)
      }))
      .sort((a, b) => a.distance - b.distance);
  }
  





 