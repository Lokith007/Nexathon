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
    variant?: "default" | "filled"; // New prop to control card style
}

export default function MetricCard({ title, value, unit, status = "normal", icon: Icon, trend, variant = "default" }: MetricCardProps) {
    // Determine base colors based on status if filled
    const isFilled = variant === "filled";

    // Default/Dark Card Styles - Professional "Black on Black"
    // Using a subtle border to define the card against the same color background
    let cardBg = "bg-surface border-white/10 shadow-sm hover:border-white/20 hover:bg-white/5";
    let textColor = "text-white";
    let iconBg = "bg-white/5 text-white border border-white/10";
    let unitColor = "text-stone-500";
    let titleColor = "text-stone-400";

    if (isFilled) {
        if (status === "normal") {
            cardBg = "bg-primary border-primary"; // Lime filled
            textColor = "text-black";
            iconBg = "bg-black/20 text-black";
            unitColor = "text-black/60";
            titleColor = "text-black/70";
        } else if (status === "warning") {
            cardBg = "bg-warning border-warning"; // Yellow filled
            textColor = "text-black";
            iconBg = "bg-black/20 text-black";
            unitColor = "text-black/60";
            titleColor = "text-black/70";
        } else if (status === "critical") {
            cardBg = "bg-secondary border-secondary"; // Purple filled (using secondary for critical/outdoor distinction in this context or error)
            // NOTE: Reference image uses Purple for "Outdoor". We might map critical or specific props to Purple. 
            // For now, let's map 'critical' to Purple to match the "Outdoor" look if we use it there, or keep it Red.
            // Actually, let's stick to the theme: Primary=Lime, Secondary=Purple.
            // If status is critical, maybe we keep it Error Red or use Secondary Purple?
            // Let's use Secondary (Purple) for a specific case if needed, but standard Critical is Red.
            // However, for the "Outdoor" card in the image (Purple), it's likely a specific type.
            // Let's rely on 'status' mapping for now.
            cardBg = "bg-error border-error";
            textColor = "text-white";
            iconBg = "bg-white/20 text-white";
            unitColor = "text-white/80";
            titleColor = "text-white/90";
        }
    }

    return (
        <div className={clsx(
            "relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 hover:shadow-lg group",
            cardBg
        )}>
            <div className="flex justify-between items-start mb-4">
                <div className={clsx("p-3 rounded-xl", iconBg)}>
                    <Icon className="w-6 h-6" />
                </div>
                {/* Status Badge - Only show if NOT filled, or if we want to show it on filled too. 
                    Reference image doesn't show small status badges on the big filled cards, the whole card allows it. 
                    Let's hide badge for filled cards to be cleaner. */}
                {!isFilled && status !== "normal" && (
                    <span className={clsx(
                        "px-2 py-1 rounded-full text-xs font-bold",
                        status === "warning" ? "bg-warning text-black" : "bg-error text-white"
                    )}>
                        {status.toUpperCase()}
                    </span>
                )}
            </div>

            <div>
                <h3 className={clsx("text-sm font-medium mb-1", titleColor)}>{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className={clsx("text-3xl font-bold tracking-tight", textColor)}>{value}</span>
                    <span className={clsx("text-sm font-medium", unitColor)}>{unit}</span>
                </div>
                {trend && (
                    <p className={clsx("text-xs mt-2", unitColor)}>
                        {trend}
                    </p>
                )}
            </div>
        </div>
    );
}
