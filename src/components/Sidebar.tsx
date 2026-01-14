"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, AlertTriangle, Wrench, Users, LogOut, ClipboardList } from "lucide-react";
import clsx from "clsx";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface SidebarProps {
    role: "government" | "worker";
}

export default function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/login/" + role);
        } catch (e) {
            console.error(e);
        }
    };

    const menuItems = role === "government" ? [
        { name: "Dashboard", href: "/government/dashboard", icon: LayoutDashboard },
        { name: "Alerts", href: "/government/alerts", icon: AlertTriangle },
        { name: "Faults", href: "/government/faults", icon: Wrench },
        { name: "Workers", href: "/government/workers", icon: Users },
    ] : [
        { name: "Dashboard", href: "/worker/dashboard", icon: LayoutDashboard },
        { name: "My Tasks", href: "/worker/tasks", icon: ClipboardList },
    ];

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-surface/50 backdrop-blur-sm border-r border-white/10 flex flex-col p-4 z-40">
            <div className="flex-1 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:scale-[1.02]",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(16,185,129,0.1)] border border-primary/20"
                                    : "text-stone-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className={clsx("w-5 h-5", isActive ? "text-primary" : "text-stone-400 group-hover:text-white")} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </div>

            <div className="pt-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/10 transition-colors w-full"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
