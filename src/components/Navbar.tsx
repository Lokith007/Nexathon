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
                <Link href="/" className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Smart Highway EMS
                </Link>
            </div>

            <div className="flex items-center gap-6">
                {/* Connection Status */}
                <div className="flex items-center gap-2 text-sm font-medium">
                    {dbConnected ? (
                        <>
                            <Wifi className="w-4 h-4 text-primary" />
                            <span className="text-primary">Online</span>
                        </>
                    ) : (
                        <>
                            <WifiOff className="w-4 h-4 text-error" />
                            <span className="text-error">Offline</span>
                        </>
                    )}
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold text-foreground">{user?.email || "Guest"}</span>
                        <span className="text-xs text-stone-400">Admin</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
