"use client";

import { LucideIcon, AlertTriangle, AlertOctagon, Info, Bell, Wrench } from "lucide-react";
import clsx from "clsx";

interface AlertCardProps {
    type: "overheat" | "pollution" | "gas" | "sos" | "fault";
    message: string;
    timestamp: string;
}

export default function AlertCard({ type, message, timestamp }: AlertCardProps) {
    let Icon = Info;
    let colorClass = "text-blue-500 bg-blue-500/10 border-blue-500/20";

    switch (type) {
        case "overheat":
        case "sos":
            Icon = AlertOctagon;
            colorClass = "text-error bg-error/10 border-error/20";
            break;
        case "pollution":
        case "gas":
            Icon = AlertTriangle;
            colorClass = "text-warning bg-warning/10 border-warning/20";
            break;
        case "fault":
            Icon = Wrench;
            colorClass = "text-orange-500 bg-orange-500/10 border-orange-500/20";
            break;
    }

    return (
        <div className={clsx("flex items-start gap-4 p-4 rounded-xl border mb-3 last:mb-0 transition-all hover:bg-white/5", colorClass, "border-white/5")}>
            <div className={clsx("p-2 rounded-lg", colorClass)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-medium text-white text-sm">{message}</h4>
                <span className="text-xs text-stone-500">{timestamp}</span>
            </div>
        </div>
    );
}
