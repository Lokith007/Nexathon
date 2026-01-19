import { useState, useEffect } from "react";
import { HardHat, CheckCircle2, XCircle, Briefcase, User } from "lucide-react";

interface Worker {
    id: string;
    name: string;
    status: "Free" | "Busy";
    currentTask?: string;
}

// Mock initial data - in real app this would come from Firebase
const initialWorkers: Worker[] = [
    { id: "1", name: "Ramesh Gupta", status: "Free" },
    { id: "2", name: "Suresh Kumar", status: "Busy", currentTask: "Maintenance at Pole 4" },
    { id: "3", name: "Amit Singh", status: "Free" },
    { id: "4", name: "Rajesh Verma", status: "Busy", currentTask: "Wiring check at Sector 2" },
];

export default function WorkerManagementPanel() {
    const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskDescription, setNewTaskDescription] = useState("");

    // Handler to open assign modal
    const handleAssignClick = (worker: Worker) => {
        setSelectedWorker(worker);
        setNewTaskDescription("");
        setIsModalOpen(true);
    };

    // Handler to confirm assignment
    const handleConfirmAssignment = () => {
        if (!selectedWorker || !newTaskDescription.trim()) return;

        setWorkers((prev) =>
            prev.map((w) =>
                w.id === selectedWorker.id
                    ? { ...w, status: "Busy", currentTask: newTaskDescription }
                    : w
            )
        );

        setIsModalOpen(false);
        setSelectedWorker(null);
    };

    return (
        <div className="bg-surface/50 backdrop-blur-sm border border-white/50 rounded-3xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white">Active Workforce</h3>
                    <p className="text-sm text-stone-400">Manage and assign tasks to field workers.</p>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
                    {workers.filter(w => w.status === "Free").length} Available
                </div>
            </div>

            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {workers.map((worker) => (
                    <div
                        key={worker.id}
                        className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all hover:bg-white/[0.07]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center">
                                <User className="w-5 h-5 text-stone-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium">{worker.name}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    {worker.status === "Free" ? (
                                        <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                                            <CheckCircle2 className="w-3 h-3" /> Free
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                                            <HardHat className="w-3 h-3" /> Busy
                                        </span>
                                    )}
                                    {worker.currentTask && (
                                        <span className="text-xs text-stone-500 max-w-[150px] truncate hidden sm:block">
                                            • {worker.currentTask}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {worker.status === "Free" ? (
                            <button
                                onClick={() => handleAssignClick(worker)}
                                className="px-4 py-2 rounded-xl bg-primary text-background font-bold text-sm hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20"
                            >
                                Assign
                            </button>
                        ) : (
                            <button
                                disabled
                                className="px-4 py-2 rounded-xl bg-stone-700/50 text-stone-500 font-bold text-sm cursor-not-allowed border border-white/5"
                            >
                                Assigned
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Simple Modal for Assignment */}
            {isModalOpen && selectedWorker && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-2">Assign Task</h3>
                        <p className="text-stone-400 text-sm mb-6">
                            Assigning work to <span className="text-primary font-bold">{selectedWorker.name}</span>
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-stone-500 uppercase mb-2 block">Task Description</label>
                                <textarea
                                    value={newTaskDescription}
                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                    placeholder="e.g., Fix broken sensor at Pole 12..."
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder:text-stone-600 focus:outline-none focus:border-primary/50 transition-all resize-none h-32"
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 rounded-xl bg-stone-800 text-stone-300 font-bold hover:bg-stone-700 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmAssignment}
                                    disabled={!newTaskDescription.trim()}
                                    className="flex-1 py-3 rounded-xl bg-primary text-background font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Confirm Assignment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
