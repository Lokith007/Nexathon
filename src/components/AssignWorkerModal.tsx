"use client";

import { X, User } from "lucide-react";
import clsx from "clsx";

interface AssignWorkerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAssign: (workerId: number) => void;
}

const availableWorkers = [
    { id: 1, name: "John Doe", role: "Technician" },
    { id: 4, name: "Sarah Connor", role: "Specialist" },
];

export default function AssignWorkerModal({ isOpen, onClose, onAssign }: AssignWorkerModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl transform transition-all scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Assign Worker</h3>
                    <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-3">
                    {availableWorkers.map(worker => (
                        <button
                            key={worker.id}
                            onClick={() => onAssign(worker.id)}
                            className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left group"
                        >
                            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                                {worker.name[0]}
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-primary transition-colors">{worker.name}</h4>
                                <p className="text-sm text-stone-400">{worker.role}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 rounded-xl text-stone-400 hover:text-white transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
