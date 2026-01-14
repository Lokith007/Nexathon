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
    let colorClass = "text-white bg-blue-500 border-blue-500";

    switch (type) {
        case "overheat":
        case "sos":
            Icon = AlertOctagon;
            colorClass = "text-white bg-error border-error";
            break;
        case "pollution":
        case "gas":
            Icon = AlertTriangle;
            colorClass = "text-black bg-warning border-warning";
            break;
        case "fault":
            Icon = Wrench;
            colorClass = "text-white bg-orange-500 border-orange-500";
            break;
    }

    return (
        <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-surface mb-3 last:mb-0 transition-all hover:border-white/20">
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
