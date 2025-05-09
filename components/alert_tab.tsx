import { useEffect, useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import BinMap from './binmap';

//bin alert type
type BinAlert = {
    Date: string;
    'Bin ID': string;
    Location: string;
    'Waste Level (%)': number;
    Status: string;
    Latitude: number;
    Longitude: number;
    'Battery (%)': number;
    Temperature: number;
    'Distance from Origin (km)': number;
};

export default function AlertsTab() {
    const [latestAlerts, setLatestAlerts] = useState<BinAlert[]>([]);
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        const fetchLatestAlerts = async () => {
            try {
                const res = await fetch('/data.json');
                console.log('Fetching alerts from:', res);

                const data: BinAlert[] = await res.json();

                const latestDate = data.reduce((latest, current) =>
                    new Date(current.Date) > new Date(latest.Date) ? current : latest
                ).Date;

                const latest = data.filter((entry) => entry.Date === latestDate);
                setLatestAlerts(latest);
            } catch (error) {
                console.error('Failed to fetch alerts:', error);
            }
        };

        fetchLatestAlerts();
    }, []);

    const handleCreateAlert = () => {
        console.log('Creating alert for latest date:', latestAlerts[0]?.Date);
        setShowMap(true);
    };

    return (
        <TabsContent value="alerts" className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">
                    Latest Alerts - {latestAlerts[0]?.Date || 'Loading...'}
                </h2>
                {latestAlerts.length > 0 && (
                    <button
                        onClick={handleCreateAlert}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                        Create Alert
                    </button>
                )}
            </div>

            <div className="space-y-3 ">
                {latestAlerts.map((alert, index) => (
                    <div
                        key={index}
                        className="flex items-start justify-between p-4 border rounded-lg shadow-sm bg-white"
                    >
                        <div className="space-y-1">
                            <p className="font-medium">
                                Bin: {alert['Bin ID']} | Location: {alert.Location}
                            </p>
                            <p className="text-sm text-gray-500">
                                Waste Level: {alert['Waste Level (%)']}% | Battery:{' '}
                                {alert['Battery (%)']}% | Temp: {alert.Temperature}°C
                            </p>
                            <p className={`text-sm  ${alert.Status === 'Collected' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                Status: {alert.Status}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {showMap && <BinMap bins={latestAlerts.filter(bin => bin['Waste Level (%)'] >= 40)} />}
        </TabsContent>
    );
}
