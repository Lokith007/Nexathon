"use client";

import FaultTable from "@/components/FaultTable";
import AssignWorkerModal from "@/components/AssignWorkerModal";
import { useState } from "react";

interface Fault {
    id: string;
    type: string;
    location: string;
    status: "new" | "assigned" | "in_progress" | "completed";
    assignedTo?: string;
}

const initialFaults: Fault[] = [
    { id: "101", type: "Turbine Malfunction", location: "Highway Section A4", status: "new" },
    { id: "102", type: "Sensor Disconnected", location: "Pole P-22", status: "in_progress", assignedTo: "John Doe" },
    { id: "103", type: "Gas Leak", location: "Sector 5", status: "new" },
    { id: "104", type: "Overheating", location: "Turbine T-01", status: "completed", assignedTo: "Jane Smith" },
];

import * as XLSX from "xlsx";

export default function FaultsPage() {
    const [faults, setFaults] = useState<Fault[]>(initialFaults);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFaultId, setSelectedFaultId] = useState<string | null>(null);

    const handleAssignClick = (id: string) => {
        setSelectedFaultId(id);
        setIsModalOpen(true);
    };

    const handleWorkerAssign = (workerId: number) => {
        // Find worker name (mock)
        const workerName = workerId === 1 ? "John Doe" : "Sarah Connor";

        setFaults(prev => prev.map(f => f.id === selectedFaultId ? {
            ...f,
            status: "assigned",
            assignedTo: workerName
        } : f));

        setIsModalOpen(false);
        setSelectedFaultId(null);
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(faults);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Faults");
        XLSX.writeFile(workbook, "Faults_Report.xlsx");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Fault Management</h1>
                    <p className="text-stone-400">Track and assign system faults.</p>
                </div>
                <button
                    onClick={handleExport}
                    className="bg-primary text-black font-bold px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors"
                >
                    Export Report
                </button>
            </div>

            <FaultTable faults={faults} onAssign={handleAssignClick} />

            <AssignWorkerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAssign={handleWorkerAssign}
            />
        </div>
    );
}
