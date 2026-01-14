"use client";

import AlertCard from "@/components/AlertCard";

export default function AlertsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">System Alerts</h1>
                <p className="text-stone-400">History of all system notifications and warnings.</p>
            </div>

            <div className="grid gap-4">
                {/* Mocking a longer list */}
                <AlertCard type="overheat" message="Turbine T-04 Overheating" timestamp="2 mins ago" />
                <AlertCard type="pollution" message="High pollution detected at Pole P-12" timestamp="15 mins ago" />
                <AlertCard type="sos" message="SOS Signal from Pole P-09" timestamp="1 hr ago" />
                <AlertCard type="fault" message="Sensor failure at Station 2" timestamp="3 hrs ago" />
                <AlertCard type="gas" message="Gas leak detected near Sector 4" timestamp="5 hrs ago" />
                <AlertCard type="fault" message="Connection lost with Hub A" timestamp="1 day ago" />
                <AlertCard type="pollution" message="AQI exceeded critical levels at District 1" timestamp="2 days ago" />
            </div>
        </div>
    );
}
