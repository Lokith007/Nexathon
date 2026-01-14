"use client";

import Link from "next/link";
import { User, Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { subscribeToData } from "@/lib/db";

export default function Navbar() {
    const [dbConnected, setDbConnected] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check connection by listening to a special path or .info/connected
        const unsubscribe = subscribeToData(".info/connected", (connected) => {
            setDbConnected(!!connected);
        });

        // Auth state
        const unsubscribeAuth = useAuth((u) => {
            setUser(u);
        });

        return () => {
            unsubscribe();
            unsubscribeAuth();
        }
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-50">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-black font-bold">
                    <Wifi className="w-5 h-5" />
                </div>
                <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
                    Smart Highway Management
                </Link>
            </div>

            <div className="flex items-center gap-6">
                {/* Connection Status */}
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
                    {dbConnected ? (
                        <span className="flex items-center gap-1.5 text-primary">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            System Online
                        </span>
                    ) : (
                        <span className="text-error flex items-center gap-1.5">
                            <WifiOff className="w-3 h-3" /> Offline
                        </span>
                    )}
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold text-white">Admin User</span>
                        <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Government</span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/10 border border-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer">
                        <User className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
