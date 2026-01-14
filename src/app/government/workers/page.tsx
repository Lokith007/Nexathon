"use client";

import { User, Phone, MapPin, Search } from "lucide-react";
import clsx from "clsx";

const workers = [
    { id: 1, name: "John Doe", role: "Technician", status: "available", location: "Sector 4", phone: "+1 234 567 890" },
    { id: 2, name: "Jane Smith", role: "Engineer", status: "busy", location: "Turbine T-01", phone: "+1 234 567 891" },
    { id: 3, name: "Mike Ross", role: "Technician", status: "offline", location: "Unknown", phone: "+1 234 567 892" },
    { id: 4, name: "Sarah Connor", role: "Specialist", status: "available", location: "HQ", phone: "+1 234 567 893" },
];

export default function WorkersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Workforce Management</h1>
                    <p className="text-stone-400">View and manage field workers.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search workers..."
                        className="bg-surface/50 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary/50"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workers.map((worker) => (
                    <div key={worker.id} className="bg-surface/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stone-700 to-stone-800 flex items-center justify-center text-white font-bold">
                                    {worker.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white group-hover:text-primary transition-colors">{worker.name}</h3>
                                    <p className="text-xs text-stone-400">{worker.role}</p>
                                </div>
                            </div>
                            <span className={clsx(
                                "px-2 py-1 rounded-full text-xs font-medium border",
                                worker.status === "available" ? "bg-primary/10 border-primary/20 text-primary" :
                                    worker.status === "busy" ? "bg-warning/10 border-warning/20 text-warning" : "bg-stone-500/10 border-stone-500/20 text-stone-500"
                            )}>
                                {worker.status.toUpperCase()}
                            </span>
                        </div>

                        <div className="space-y-2 text-sm text-stone-300">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-stone-500" />
                                <span>{worker.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-stone-500" />
                                <span>{worker.phone}</span>
                            </div>
                        </div>

                        <button className="w-full mt-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
