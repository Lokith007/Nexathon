"use client";

import MetricCard from "@/components/MetricCard";
import PowerChart from "@/components/PowerChart";
import AlertCard from "@/components/AlertCard";
import AirQualityCard from "@/components/AirQualityCard";
import WorkerManagementPanel from "@/components/WorkerManagementPanel";
import { Zap, Thermometer, Wind, Activity, Droplets } from "lucide-react";
import { useEffect, useState } from "react";
import { subscribeToData } from "@/lib/db";

// Mock Data
const powerData = [
    { time: '00:00', power: 120 },
    { time: '04:00', power: 150 },
    { time: '08:00', power: 300 },
    { time: '12:00', power: 450 },
    { time: '16:00', power: 380 },
    { time: '20:00', power: 200 },
    { time: '23:59', power: 150 },
];

export default function Dashboard() {
    const [metrics, setMetrics] = useState({
        voltage: 0,
        current: 0.28,
        power: 0,
        temperature: 27.6,
        humidity: 75.7,
        aqi: 45,
        gas: 257,
        pm25: 51,
        pm10: 34,
        no2: 1,
    });

    const [powerHistory, setPowerHistory] = useState<{ time: string, power: number }[]>([]);

    useEffect(() => {
        const unsubscribeVoltage = subscribeToData("highway_system/data/voltage", (val) => setMetrics(prev => ({ ...prev, voltage: Number(val) || 0 })));
        const unsubscribeCurrent = subscribeToData("highway_system/data/current", (val) => setMetrics(prev => ({ ...prev, current: Number(val) || 0 })));

        const unsubscribePower = subscribeToData("highway_system/data/power", (val) => {
            const numVal = Number(val) || 0;
            setMetrics(prev => ({ ...prev, power: numVal }));

            setPowerHistory(prev => {
                const now = new Date();
                const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
                const newEntry = { time: timeString, power: numVal };
                const newHistory = [...prev, newEntry];
                if (newHistory.length > 20) return newHistory.slice(newHistory.length - 20);
                return newHistory;
            });
        });

        const unsubscribeTemp = subscribeToData("highway_system/data/temperature", (val) => setMetrics(prev => ({ ...prev, temperature: Number(val) || 0 })));
        const unsubscribeHumidity = subscribeToData("highway_system/data/humidity", (val) => setMetrics(prev => ({ ...prev, humidity: Number(val) || 0 })));
        const unsubscribeAQI = subscribeToData("highway_system/data/aqi", (val) => setMetrics(prev => ({ ...prev, aqi: Number(val) || 0 })));
        const unsubscribeGas = subscribeToData("highway_system/data/gas", (val) => setMetrics(prev => ({ ...prev, gas: Number(val) || 0 })));

        // Mock subscriptions for detailed air data if they existed
        // const unsubscribePM25 = subscribeToData("highway_system/data/pm25", (val) => setMetrics(prev => ({ ...prev, pm25: Number(val) || 0 })));

        return () => {
            unsubscribeVoltage();
            unsubscribeCurrent();
            unsubscribePower();
            unsubscribeTemp();
            unsubscribeHumidity();
            unsubscribeAQI();
            unsubscribeGas();
        };
    }, []);

    return (
        <div className="space-y-8">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-1">Smart Highway Management</h1>
                    <p className="text-stone-400 font-medium">System Status: <span className="text-primary font-bold">Optimal</span></p>
                </div>
            </div>

            {/* Top Metrics Row - 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Power Generated"
                    value={metrics.power}
                    unit="W"
                    icon={Zap}
                    trend="Live"
                    variant="filled"
                    className="border border-white/50"
                />
                <MetricCard
                    title="Temperature"
                    value={metrics.temperature}
                    unit="°C"
                    icon={Thermometer}
                    status={metrics.temperature > 35 ? "warning" : "normal"}
                    trend="Live"
                    variant="filled"
                />
                <MetricCard
                    title="Voltage"
                    value={metrics.voltage}
                    unit="V"
                    icon={Activity}
                    status="normal"
                    variant="filled"
                    color="secondary"
                />
            </div>

            {/* Main Content Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Charts and Worker Management */}
                <div className="lg:col-span-2 space-y-6">
                    <PowerChart data={powerHistory} />

                    {/* Secondary Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard
                            title="Current"
                            value={metrics.current}
                            unit="A"
                            icon={Zap}
                            status="normal"
                            variant="filled"
                            color="blue"
                        />
                        <MetricCard
                            title="Humidity"
                            value={metrics.humidity}
                            unit="%"
                            icon={Droplets}
                            status="normal"
                            variant="filled"
                            color="cyan"
                        />
                        <MetricCard
                            title="Gas Level"
                            value={metrics.gas}
                            unit="ppm"
                            icon={Wind}
                            status={metrics.gas > 50 ? "warning" : "normal"}
                            variant="filled"
                            color={metrics.gas > 50 ? "rose" : "emerald"}
                        />
                    </div>

                    {/* Worker Management Panel */}
                    <div className="h-[400px]">
                        <WorkerManagementPanel />
                    </div>
                </div>

                {/* Right Column: Air Quality & Alerts */}
                <div className="space-y-6">
                    {/* New Air Quality Card */}
                    <div className="h-auto">
                        <AirQualityCard
                            aqi={metrics.aqi}
                            pm25={metrics.pm25}
                            pm10={metrics.pm10}
                            no2={metrics.no2}

                        // Adding className is not supported by AirQualityCard yet, need to check or modify AirQualityCard directly
                        // The user request implies changing "Air Qualityy" which refers to this component.
                        // I will modify the AirQualityCard implementation instead of passing props, 
                        // as checking AirQualityCard I see it hardcodes styles.
                        // So I will only change PowerGenerated here.
                        />
                    </div>

                    {/* Alerts Panel */}
                    <div className="bg-surface rounded-2xl p-6 border border-white/50 h-fit">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white">Recent Alerts</h3>
                            <span className="bg-error text-white px-2 py-1 rounded-md text-xs font-bold animate-pulse">3 Active</span>
                        </div>

                        <div className="space-y-4">
                            <AlertCard type="overheat" message="Turbine T-04 Overheating" timestamp="2 mins ago" />
                            <AlertCard type="pollution" message="High pollution detected at Pole P-12" timestamp="15 mins ago" />
                            <AlertCard type="sos" message="SOS Signal from Pole P-09" timestamp="1 hr ago" />
                            <AlertCard type="fault" message="Sensor failure at Station 2" timestamp="3 hrs ago" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
