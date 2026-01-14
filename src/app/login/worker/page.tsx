"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HardHat, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function WorkerLogin() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock login delay
        setTimeout(() => {
            setLoading(false);
            router.push("/worker/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-background" />
            <div className="absolute -bottom-1/2 -right-1/2 w-[1000px] h-[1000px] bg-secondary/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-secondary border border-secondary/20">
                        <HardHat className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Worker Portal</h2>
                    <p className="text-stone-400 mt-2">Field access for maintenance.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 bg-surface/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                    <div>
                        <label className="block text-sm font-medium text-stone-400 mb-1">Worker ID</label>
                        <input
                            type="text"
                            placeholder="WK-2024..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-400 mb-1">Passcode</label>
                        <input
                            type="password"
                            placeholder="••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-secondary text-black font-bold py-3 rounded-xl hover:bg-secondary-600 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Login <ArrowRight className="w-5 h-5" /></>}
                    </button>
                </form>

                <p className="text-center text-sm text-stone-500">
                    <Link href="/" className="hover:text-white transition-colors">Back to Home</Link>
                </p>
            </div>
        </div>
    );
}
