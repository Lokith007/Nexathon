"use client";

import MetricCard from "@/components/MetricCard";
import PowerChart from "@/components/PowerChart";
import AlertCard from "@/components/AlertCard";
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
        aqi: 45, // Estimated safe value
        gas: 257,
    });

    useEffect(() => {
        // Subscribe to the root 'sensors' node or individual nodes
        // Assuming structure: /sensors/voltage, /sensors/current, etc. OR flat at root
        // For now listening to flat keys as they are likely stored

        const unsubscribeVoltage = subscribeToData("highway_system/data/voltage", (val) => setMetrics(prev => ({ ...prev, voltage: Number(val) || 0 })));
        const unsubscribeCurrent = subscribeToData("highway_system/data/current", (val) => setMetrics(prev => ({ ...prev, current: Number(val) || 0 })));
        const unsubscribePower = subscribeToData("highway_system/data/power", (val) => setMetrics(prev => ({ ...prev, power: Number(val) || 0 })));
        const unsubscribeTemp = subscribeToData("highway_system/data/temperature", (val) => setMetrics(prev => ({ ...prev, temperature: Number(val) || 0 })));
        const unsubscribeHumidity = subscribeToData("highway_system/data/humidity", (val) => setMetrics(prev => ({ ...prev, humidity: Number(val) || 0 })));
        const unsubscribeAQI = subscribeToData("highway_system/data/aqi", (val) => setMetrics(prev => ({ ...prev, aqi: Number(val) || 0 }))); // Assuming AQI might be added or is hidden
        const unsubscribeGas = subscribeToData("highway_system/data/gas", (val) => setMetrics(prev => ({ ...prev, gas: Number(val) || 0 })));

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

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Power Generated"
                    value={metrics.power}
                    unit="W"
                    icon={Zap}
                    status={metrics.power > 0 ? "normal" : "warning"}
                    trend="Live"
                    variant="filled" // Highlight as key metric
                />
                <MetricCard
                    title="Temperature"
                    value={metrics.temperature}
                    unit="°C"
                    icon={Thermometer}
                    status={metrics.temperature > 35 ? "warning" : "normal"}
                    trend="Live"
                    variant="filled" // Highlight as key metric
                />
                <MetricCard
                    title="Air Quality (AQI)"
                    value={metrics.aqi}
                    unit="PM2.5"
                    icon={Wind}
                    status={metrics.aqi > 100 ? "critical" : "normal"}
                    trend="Live"
                    variant="filled" // Highlight as key metric (Purple if critical/secondary logic used)
                />
                <MetricCard
                    title="Voltage"
                    value={metrics.voltage}
                    unit="V"
                    icon={Activity}
                    status="normal"
                />
            </div>

            {/* Charts & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <PowerChart data={powerData} />

                    {/* Secondary Metrics / More Graphs placeholder */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard
                            title="Current"
                            value={metrics.current}
                            unit="A"
                            icon={Zap}
                            status="normal"
                        />
                        <MetricCard
                            title="Humidity"
                            value={metrics.humidity}
                            unit="%"
                            icon={Droplets}
                            status="normal"
                        />
                        <MetricCard
                            title="Gas Level"
                            value={metrics.gas}
                            unit="ppm"
                            icon={Wind}
                            status={metrics.gas > 50 ? "warning" : "normal"}
                        />
                    </div>
                </div>

                {/* Alerts Panel */}
                <div className="bg-surface rounded-2xl p-6 border border-white/5 h-fit">
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
    );
}
