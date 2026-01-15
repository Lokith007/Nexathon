import { Info } from "lucide-react";

interface AirQualityCardProps {
    aqi: number;
    pm25?: number;
    pm10?: number;
    no2?: number;
}

export default function AirQualityCard({ aqi, pm25 = 51, pm10 = 34, no2 = 1 }: AirQualityCardProps) {
    // Determine status and color based on AQI
    let status = "Good";
    let statusColor = "text-emerald-400";
    let statusBg = "bg-emerald-500/10";
    let gaugeColor = "text-emerald-500";
    let gaugePercent = Math.min((aqi / 300) * 100, 100);

    if (aqi > 50 && aqi <= 100) {
        status = "Satisfactory";
        statusColor = "text-amber-500"; // Changed to amber/orange as per image
        statusBg = "bg-amber-500/10";
        gaugeColor = "text-amber-500"; // Changed to match image
    } else if (aqi > 100 && aqi <= 200) {
        status = "Moderate";
        statusColor = "text-yellow-400";
        statusBg = "bg-yellow-500/10";
        gaugeColor = "text-yellow-400";
    } else if (aqi > 200) {
        status = "Poor";
        statusColor = "text-red-500";
        statusBg = "bg-red-500/10";
        gaugeColor = "text-red-500";
    }

    // SVG parameters for circular gauge
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (gaugePercent / 100) * circumference;

    return (
        <div className="bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-between h-full relative overflow-hidden group hover:border-white/10 transition-colors">

            {/* Header */}
            <div className="w-full flex items-start justify-between z-10">
                <div>
                    <h3 className="text-xl font-bold text-white">Air Quality Index</h3>
                    <div className="flex items-center gap-2 text-sm text-stone-400 mt-1">
                        <span>Real-time</span>
                        <span className="w-1 h-1 rounded-full bg-stone-600" />
                        <span>India</span>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${statusBg} ${statusColor} border border-white/5`}>
                    {status}
                </div>
            </div>

            {/* Circular Gauge */}
            <div className="relative mt-8 mb-4">
                {/* SVG Gauge */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Background Circle */}
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="12" // Thicker stroke
                            className="text-white/5"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="12" // Thicker stroke
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className={`${gaugeColor} transition-all duration-1000 ease-out`}
                        />
                    </svg>

                    {/* Center Value */}
                    <div className="absolute flex flex-col items-center">
                        <span className={`text-5xl font-bold ${gaugeColor}`}>{aqi}</span>
                        <span className="text-stone-400 text-sm font-medium mt-1">AQI</span>
                    </div>
                </div>
            </div>


            {/* Detailed Breakdown */}
            <div className="w-full space-y-4 mt-4">
                <div className="text-center text-stone-400 text-sm mb-4">
                    PM2.5={pm25}, PM10={pm10}, NO2={no2}
                </div>

                {/* PM2.5 */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-white font-medium w-16">
                        PM2.5
                        <Info className="w-3 h-3 text-red-500/70" /> {/* Simulate the red info icon */}
                    </div>
                    <div className="flex-1 h-2 bg-stone-700/50 rounded-full overflow-hidden flex">
                        {/* Custom multi-color bar to match image style slightly */}
                        <div className="w-1/2 bg-red-400 rounded-full" />
                        <div className="w-1/3 bg-transparent" />
                    </div>
                    <span className="text-red-400 font-bold w-6 text-right">{pm25}</span>
                </div>

                {/* PM10 */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-white font-medium w-16">
                        PM10
                    </div>
                    <div className="flex-1 h-2 bg-stone-700/50 rounded-full overflow-hidden flex">
                        <div className="w-[30%] bg-orange-400 rounded-full" />
                    </div>
                    <span className="text-orange-400 font-bold w-6 text-right">{pm10}</span>
                </div>

                {/* NO2 */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-white font-medium w-16">
                        NO2
                    </div>
                    <div className="flex-1 h-2 bg-stone-700/50 rounded-full overflow-hidden flex">
                        <div className="w-[5%] bg-red-500 rounded-full" />
                    </div>
                    <span className="text-red-500 font-bold w-6 text-right">{no2}</span>
                </div>

                <div className="text-center text-stone-300 text-sm italic mt-4 pt-4 border-t border-white/5">
                    Air quality is acceptable.
                </div>
            </div>
        </div>
    );
}
