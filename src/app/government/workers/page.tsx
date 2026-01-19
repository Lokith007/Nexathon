"use client";

import { User, Phone, MapPin, Search, X } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

interface Worker {
    id: number;
    name: string;
    role: string;
    status: string;
    location: string;
    phone: string;
}

const workers: Worker[] = [
    { id: 1, name: "John Doe", role: "Technician", status: "available", location: "Sector 4", phone: "+1 234 567 890" },
    { id: 2, name: "Jane Smith", role: "Engineer", status: "busy", location: "Turbine T-01", phone: "+1 234 567 891" },
    { id: 3, name: "Mike Ross", role: "Technician", status: "offline", location: "Unknown", phone: "+1 234 567 892" },
    { id: 4, name: "Sarah Connor", role: "Specialist", status: "available", location: "HQ", phone: "+1 234 567 893" },
];

export default function WorkersPage() {
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

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
                    <div key={worker.id} className="bg-surface/50 backdrop-blur-sm p-6 rounded-2xl border border-white/50 hover:border-primary/20 transition-all group">
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

                        <button
                            onClick={() => setSelectedWorker(worker)}
                            className="w-full mt-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {/* View Details Modal */}
            {selectedWorker && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
                        <button
                            onClick={() => setSelectedWorker(null)}
                            className="absolute top-4 right-4 text-stone-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-stone-700 to-stone-800 flex items-center justify-center text-white text-3xl font-bold mb-4">
                                {selectedWorker.name[0]}
                            </div>
                            <h3 className="text-2xl font-bold text-white">{selectedWorker.name}</h3>
                            <p className="text-primary">{selectedWorker.role}</p>
                        </div>

                        <div className="space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-stone-400">Status</span>
                                <span className="text-white capitalize">{selectedWorker.status}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-stone-400">Location</span>
                                <span className="text-white">{selectedWorker.location}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-stone-400">Phone</span>
                                <span className="text-white">{selectedWorker.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-stone-400">ID</span>
                                <span className="text-white">#{selectedWorker.id}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button className="flex-1 py-3 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-all">
                                Contact
                            </button>
                            <button
                                onClick={() => setSelectedWorker(null)}
                                className="flex-1 py-3 rounded-xl bg-stone-800 text-stone-300 font-bold hover:bg-stone-700 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
