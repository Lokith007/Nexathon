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
    color?: "primary" | "secondary" | "blue" | "cyan" | "emerald" | "amber" | "rose" | "indigo" | "purple" | "orange";
    className?: string;
}

export default function MetricCard({ title, value, unit, status = "normal", icon: Icon, trend, variant = "default", color, className }: MetricCardProps) {
    // Determine base colors based on status if filled
    const isFilled = variant === "filled";

    // Default/Dark Card Styles - Professional "Black on Black"
    // Using a subtle border to define the card against the same color background
    let cardBg = "bg-surface border-white/50 shadow-sm hover:border-white/60 hover:bg-white/5";
    let textColor = "text-white";
    let iconBg = "bg-white/5 text-white border border-white/10";
    let unitColor = "text-stone-500";
    let titleColor = "text-stone-400";

    if (isFilled) {
        if (color) {
            // explicit color overrides status-based default colors
            switch (color) {
                case "primary":
                    cardBg = "bg-primary border-primary";
                    textColor = "text-black";
                    iconBg = "bg-black/20 text-black";
                    unitColor = "text-black/60";
                    titleColor = "text-black/70";
                    break;
                case "secondary":
                    cardBg = "bg-secondary border-secondary";
                    textColor = "text-white";
                    iconBg = "bg-white/20 text-white";
                    unitColor = "text-white/80";
                    titleColor = "text-white/90";
                    break;
                case "blue":
                    cardBg = "bg-blue-500 border-blue-500";
                    textColor = "text-white";
                    iconBg = "bg-white/20 text-white";
                    unitColor = "text-white/80";
                    titleColor = "text-white/90";
                    break;
                case "cyan":
                    cardBg = "bg-cyan-400 border-cyan-400";
                    textColor = "text-black";
                    iconBg = "bg-black/20 text-black";
                    unitColor = "text-black/60";
                    titleColor = "text-black/70";
                    break;
                case "emerald":
                    cardBg = "bg-emerald-500 border-emerald-500";
                    textColor = "text-white";
                    iconBg = "bg-white/20 text-white";
                    unitColor = "text-white/80";
                    titleColor = "text-white/90";
                    break;
                case "amber":
                    cardBg = "bg-amber-400 border-amber-400";
                    textColor = "text-black";
                    iconBg = "bg-black/20 text-black";
                    unitColor = "text-black/60";
                    titleColor = "text-black/70";
                    break;
                case "rose":
                    cardBg = "bg-rose-500 border-rose-500";
                    textColor = "text-white";
                    iconBg = "bg-white/20 text-white";
                    unitColor = "text-white/80";
                    titleColor = "text-white/90";
                    break;
                case "indigo":
                    cardBg = "bg-indigo-500 border-indigo-500";
                    textColor = "text-white";
                    iconBg = "bg-white/20 text-white";
                    unitColor = "text-white/80";
                    titleColor = "text-white/90";
                    break;
                case "purple":
                    cardBg = "bg-purple-500 border-purple-500";
                    textColor = "text-white";
                    iconBg = "bg-white/20 text-white";
                    unitColor = "text-white/80";
                    titleColor = "text-white/90";
                    break;
                case "orange":
                    cardBg = "bg-orange-500 border-orange-500";
                    textColor = "text-white";
                    iconBg = "bg-white/20 text-white";
                    unitColor = "text-white/80";
                    titleColor = "text-white/90";
                    break;
            }
        } else if (status === "normal") {
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
            cardBg,
            className
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
