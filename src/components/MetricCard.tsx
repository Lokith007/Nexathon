"use client";

import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface MetricCardProps {
    title: string;
    value: string | number;
    unit: string;
    status?: "normal" | "warning" | "critical";
    icon: LucideIcon;
    trend?: string;
}

export default function MetricCard({ title, value, unit, status = "normal", icon: Icon, trend }: MetricCardProps) {
    return (
        <div className={clsx(
            "relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 hover:shadow-lg group",
            "bg-surface/50 backdrop-blur-sm border-white/5",
            status === "warning" && "hover:border-warning/50",
            status === "critical" && "hover:border-error/50",
            status === "normal" && "hover:border-primary/50"
        )}>
            <div className="flex justify-between items-start mb-4">
                <div className={clsx(
                    "p-3 rounded-xl",
                    status === "normal" ? "bg-primary/10 text-primary" :
                        status === "warning" ? "bg-warning/10 text-warning" : "bg-error/10 text-error"
                )}>
                    <Icon className="w-6 h-6" />
                </div>
                {status !== "normal" && (
                    <span className={clsx(
                        "px-2 py-1 rounded-full text-xs font-medium border",
                        status === "warning" ? "bg-warning/10 border-warning/20 text-warning" : "bg-error/10 border-error/20 text-error"
                    )}>
                        {status.toUpperCase()}
                    </span>
                )}
            </div>

            <div>
                <h3 className="text-stone-400 text-sm font-medium mb-1">{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
                    <span className="text-sm text-stone-500 font-medium">{unit}</span>
                </div>
                {trend && (
                    <p className="text-xs text-stone-500 mt-2">
                        {trend}
                    </p>
                )}
            </div>

            {/* Decorative gradient blob */}
            <div className={clsx(
                "absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none",
                status === "normal" ? "bg-primary" :
                    status === "warning" ? "bg-warning" : "bg-error"
            )} />
        </div>
    );
}
