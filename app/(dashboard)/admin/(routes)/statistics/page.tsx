'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import EcoTrackTable from "@/components/data-table";
import { Bell } from "lucide-react";
import { ResponsiveBar } from '@nivo/bar';
import AlertsTab from "@/components/alert_tab";

export default function Dashboard() {
    const [ecoData, setEcoData] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortAsc, setSortAsc] = useState(true);

    useEffect(() => {
        fetch("/data.json")
            .then((res) => res.json())
            .then(setEcoData)
            .catch((err) => console.error("Failed to fetch data:", err));
    }, []);

    // Filter function
    function filterEcoData(data: any[], status: string) {
        if (status === "all") return data;
        return data.filter((item: { Status: any; }) => item.Status === status);
    }

    // Sort function
    function sortEcoData(data: any, ascending = true) {
        return [...data].sort((a, b) => {
            const aVal = parseFloat(a["Waste Level (%)"]);
            const bVal = parseFloat(b["Waste Level (%)"]);
            return ascending ? aVal - bVal : bVal - aVal;
        });
    }

    const filteredData = filterEcoData(ecoData, filterStatus);
    const filteredAndSortedData = sortEcoData(filteredData, sortAsc);

    // Transform ecoData for chart
    const chartData = ecoData.map((item: any, index: number) => ({
        bin: item["Bin ID"] || `Bin ${index + 1}`,
        fill: parseFloat(item["Waste Level (%)"]) || 0,
    }));

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-300">Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <Button>Download Report</Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                    <TabsTrigger value="routes">Routes</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <div className="grid md:grid-cols-4 gap-6 mt-4">
                        <Card>
                            <CardHeader><CardTitle>Total Bins</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">120</p>
                                <p className="text-sm text-muted-foreground">+5% since last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Bins 80%+ Full</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">15</p>
                                <p className="text-sm text-muted-foreground">Critical to collect</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Offline Sensors</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">3</p>
                                <p className="text-sm text-muted-foreground">Needs attention</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Optimized Routes</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">7</p>
                                <p className="text-sm text-muted-foreground">Today</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <Card>
                            <CardHeader><CardTitle>Bin Fill Level Overview</CardTitle></CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveBar
                                    data={chartData}
                                    keys={["fill"]}
                                    indexBy="bin"
                                    margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                                    padding={0.3}
                                    colors={{ scheme: 'category10' }}
                                    axisBottom={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: 'Bins',
                                        legendPosition: 'middle',
                                        legendOffset: 40
                                    }}
                                    axisLeft={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: 'Fill Level (%)',
                                        legendPosition: 'middle',
                                        legendOffset: -50
                                    }}
                                    labelSkipWidth={12}
                                    labelSkipHeight={12}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Recent Alerts</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Bell className="h-4 w-4 text-red-500" />
                                        <span>Bin 2 almost full</span>
                                    </div>
                                    <Button size="sm" variant="outline">View</Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Bell className="h-4 w-4 text-yellow-400" />
                                        <span>Bin 5 sensor offline</span>
                                    </div>
                                    <Button size="sm" variant="outline">View</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="analytics">
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4 text-white">Daily Bin Data</h2>

                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <label htmlFor="statusFilter" className="text-white">Filter by Status:</label>
                                <select
                                    id="statusFilter"
                                    className="px-3 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="Collected">Collected</option>
                                    <option value="Not Collected">Not Collected</option>
                                </select>

                            </div>

                            <Button onClick={() => setSortAsc(prev => !prev)}>
                                Sort by Waste Level {sortAsc ? "↑" : "↓"}
                            </Button>
                        </div>

                        <EcoTrackTable data={filteredAndSortedData} />
                    </div>
                </TabsContent>

                <AlertsTab />
            </Tabs>
        </div>
    );
}
