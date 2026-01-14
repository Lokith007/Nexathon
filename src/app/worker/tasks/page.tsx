"use client";

import { CheckCircle, Clock, MapPin, PlayCircle } from "lucide-react";
import clsx from "clsx";

const tasks = [
    { id: 102, title: "Sensor Disconnected", location: "Pole P-22", status: "in_progress", priority: "high" },
    { id: 105, title: "Routine Maintenance", location: "Turbine T-03", status: "pending", priority: "medium" },
    { id: 101, title: "Turbine Malfunction", location: "Highway Section A4", status: "completed", priority: "critical" },
];

export default function WorkerTasks() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
                <p className="text-stone-400">Manage your assigned work orders.</p>
            </div>

            <div className="space-y-4">
                {tasks.map(task => (
                    <div key={task.id} className="bg-surface/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-white">{task.title}</h3>
                                    <span className={clsx(
                                        "px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider",
                                        task.priority === "critical" ? "bg-error/20 text-error" :
                                            task.priority === "high" ? "bg-warning/20 text-warning" : "bg-blue-500/20 text-blue-500"
                                    )}>
                                        {task.priority}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-stone-400">
                                    <MapPin className="w-4 h-4" />
                                    {task.location}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {task.status === "in_progress" && (
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-black font-bold hover:bg-primary-600 transition-colors">
                                        <CheckCircle className="w-4 h-4" />
                                        Done
                                    </button>
                                )}
                                {task.status === "pending" && (
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
                                        <PlayCircle className="w-4 h-4" />
                                        Start
                                    </button>
                                )}
                                {task.status === "completed" && (
                                    <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary font-bold">
                                        <CheckCircle className="w-4 h-4" />
                                        Completed
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
