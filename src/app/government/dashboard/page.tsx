"use client";

import MetricCard from "@/components/MetricCard";
import PowerChart from "@/components/PowerChart";
import AlertCard from "@/components/AlertCard";
import { Zap, Thermometer, Wind, Activity, Droplets } from "lucide-react";

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
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-stone-400">Real-time monitoring of highway assets.</p>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Power Generated"
                    value="450.5"
                    unit="kWh"
                    icon={Zap}
                    status="normal"
                    trend="+12% vs yesterday"
                />
                <MetricCard
                    title="Temperature"
                    value="28.4"
                    unit="°C"
                    icon={Thermometer}
                    status="warning"
                    trend="High for this hour"
                />
                <MetricCard
                    title="Air Quality (AQI)"
                    value="112"
                    unit="PM2.5"
                    icon={Wind}
                    status="critical"
                    trend="Poor air quality"
                />
                <MetricCard
                    title="Voltage"
                    value="24.1"
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
                    <div className="grid grid-cols-2 gap-6">
                        <MetricCard
                            title="Humidity"
                            value="65"
                            unit="%"
                            icon={Droplets}
                            status="normal"
                        />
                        <MetricCard
                            title="Gas Level"
                            value="12"
                            unit="ppm"
                            icon={Wind}
                            status="normal"
                        />
                    </div>
                </div>

                {/* Alerts Panel */}
                <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5 h-fit">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Recent Alerts</h3>
                        <span className="bg-error/20 text-error px-2 py-1 rounded-md text-xs font-bold animate-pulse">3 Active</span>
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
