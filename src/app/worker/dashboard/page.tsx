"use client";

import MetricCard from "@/components/MetricCard";
import { ClipboardList, AlertCircle, CheckCircle } from "lucide-react";

export default function WorkerDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Worker Dashboard</h1>
                <p className="text-stone-400">Welcome back, John.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Assigned Tasks"
                    value="2"
                    unit="Pending"
                    icon={ClipboardList}
                    status="warning"
                />
                <MetricCard
                    title="Completed Today"
                    value="4"
                    unit="Tasks"
                    icon={CheckCircle}
                    status="normal"
                />
                <MetricCard
                    title="Active Alerts"
                    value="1"
                    unit="Nearby"
                    icon={AlertCircle}
                    status="critical"
                />
            </div>

            <div className="bg-surface/50 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4">Current Priority Task</h3>
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/5 border border-primary/20">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-lg text-white">Repair Sensor Node #404</h4>
                            <p className="text-stone-400 text-sm mt-1">Location: Highway Section B2</p>
                        </div>
                        <span className="bg-primary text-black px-3 py-1 rounded-full text-xs font-bold">
                            HIGH PRIORITY
                        </span>
                    </div>
                    <div className="mt-4 flex gap-3">
                        <button className="flex-1 bg-primary text-black font-bold py-2 rounded-lg hover:bg-primary-600 transition-colors">
                            Mark Complete
                        </button>
                        <button className="flex-1 bg-white/10 text-white font-medium py-2 rounded-lg hover:bg-white/20 transition-colors">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
