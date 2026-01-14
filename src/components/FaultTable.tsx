"use client";

import clsx from "clsx";
import { UserPlus, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Fault {
    id: string;
    type: string;
    location: string;
    status: "new" | "assigned" | "in_progress" | "completed";
    assignedTo?: string;
}

interface FaultTableProps {
    faults: Fault[];
    onAssign: (id: string) => void;
}

export default function FaultTable({ faults, onAssign }: FaultTableProps) {
    return (
        <div className="overflow-x-auto bg-surface/50 backdrop-blur-sm rounded-2xl border border-white/5">
            <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-stone-400 font-medium">
                    <tr>
                        <th className="p-4">Fault ID</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Assigned To</th>
                        <th className="p-4">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {faults.map((fault) => (
                        <tr key={fault.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-mono text-stone-500">#{fault.id}</td>
                            <td className="p-4 font-medium text-white">{fault.type}</td>
                            <td className="p-4 text-stone-300">{fault.location}</td>
                            <td className="p-4">
                                <span className={clsx(
                                    "px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1",
                                    fault.status === "new" && "bg-error/10 text-error",
                                    fault.status === "assigned" && "bg-warning/10 text-warning",
                                    fault.status === "in_progress" && "bg-blue-500/10 text-blue-500",
                                    fault.status === "completed" && "bg-primary/10 text-primary",
                                )}>
                                    {fault.status === "new" && <AlertCircle className="w-3 h-3" />}
                                    {fault.status === "assigned" && <Clock className="w-3 h-3" />}
                                    {fault.status === "in_progress" && <Clock className="w-3 h-3 animate-pulse" />}
                                    {fault.status === "completed" && <CheckCircle className="w-3 h-3" />}
                                    {fault.status.replace("_", " ").toUpperCase()}
                                </span>
                            </td>
                            <td className="p-4 text-stone-400">
                                {fault.assignedTo || "-"}
                            </td>
                            <td className="p-4">
                                {fault.status === "new" && (
                                    <button
                                        onClick={() => onAssign(fault.id)}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-bold"
                                    >
                                        <UserPlus className="w-4 h-4" />
                                        Assign
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
