'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Bell } from "lucide-react";
import { ResponsiveBar } from '@nivo/bar';

const data = [
    { bin: "Bin 1", fill: 20 },
    { bin: "Bin 2", fill: 80 },
    { bin: "Bin 3", fill: 50 },
    { bin: "Bin 4", fill: 90 },
];

export default function Dashboard() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
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
                            <CardHeader>
                                <CardTitle>Total Bins</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">120</p>
                                <p className="text-sm text-muted-foreground">+5% since last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Bins 80%+ Full</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">15</p>
                                <p className="text-sm text-muted-foreground">Critical to collect</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Offline Sensors</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">3</p>
                                <p className="text-sm text-muted-foreground">Needs attention</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Optimized Routes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">7</p>
                                <p className="text-sm text-muted-foreground">Today</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Bin Fill Level Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveBar
                                    data={data}
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
                            <CardHeader>
                                <CardTitle>Recent Alerts</CardTitle>
                            </CardHeader>
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
            </Tabs>
        </div>
    );
}
