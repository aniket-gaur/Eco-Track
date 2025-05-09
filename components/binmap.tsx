'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Bin = {
    'Bin ID': string;
    Latitude: number;
    Longitude: number;
    Location: string;
    'Waste Level (%)': number;
};

const vehicleStation = { lat: 28.5708, lng: 77.3260 };
function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const toRad = (deg: number) => deg * Math.PI / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function BinMap({ bins }: { bins: Bin[] }) {
    // Sort bins by distance from station
    const sortedBins = bins
        .filter(b => b['Waste Level (%)'] >= 40)
        .map(b => ({
            ...b,
            distance: haversineDistance(vehicleStation.lat, vehicleStation.lng, b.Latitude, b.Longitude),
        }))
        .sort((a, b) => a.distance - b.distance);

    const routeCoords = [
        [vehicleStation.lat, vehicleStation.lng],
        ...sortedBins.map(b => [b.Latitude, b.Longitude]),
    ];
    const routeDescription = ['Vehicle Station', ...sortedBins.map(bin => bin.Location)].join(' → ');


    return (
        <>
            <h1 className="text-xl font-bold mt-4 text-center">
                Route: {routeDescription}
            </h1>
            <div className="h-[500px] w-full mt-6 rounded-lg overflow-hidden shadow">
                <MapContainer center={[vehicleStation.lat, vehicleStation.lng]} zoom={3} className="h-full w-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    />

                    <Marker position={[vehicleStation.lat, vehicleStation.lng]}>
                        <Popup>Vehicle Station</Popup>
                    </Marker>

                    {sortedBins.map((bin, i) => (
                        <Marker key={i} position={[bin.Latitude, bin.Longitude]}>
                            <Popup>
                                {bin['Bin ID']} - {bin.Location}<br />
                                Waste: {bin['Waste Level (%)']}%
                            </Popup>
                        </Marker>
                    ))}

                    <Polyline positions={routeCoords as [number, number][]} color="blue" />
                </MapContainer>
            </div>
        </>

    );
}

export default BinMap;
