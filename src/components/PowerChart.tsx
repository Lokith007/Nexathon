"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface PowerChartProps {
    data: any[];
}

export default function PowerChart({ data }: PowerChartProps) {
    return (
        <div className="w-full h-[300px] bg-surface rounded-2xl p-4 border border-white/50 shadow-sm">
            <h3 className="text-lg font-semibold text-white mb-6">Power Generation (Live)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                    <XAxis
                        dataKey="time"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}kW`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#000000', border: '1px solid #334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="power"
                        stroke="#bef264" /* Lime Prime */
                        strokeWidth={3}
                        fillOpacity={0.1}
                        fill="#bef264"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
