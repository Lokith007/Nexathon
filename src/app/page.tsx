import Link from "next/link";
import { Building2, HardHat, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-surface to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="z-10 text-center space-y-8 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-white to-stone-400 bg-clip-text text-transparent">
          Smart Highway <br /> Energy System
        </h1>
        <p className="text-xl text-stone-400">
          Advanced monitoring and management for sustainable infrastructure.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 w-full max-w-lg mx-auto">
          <Link
            href="/login/government"
            className="group relative overflow-hidden rounded-2xl bg-surface/50 border border-white/10 p-8 hover:border-primary/50 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Building2 className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Government Portal</h3>
            <p className="text-sm text-stone-400 mb-6">Admin access for monitoring and management.</p>
            <div className="flex items-center gap-2 text-primary text-sm font-bold">
              Login <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/login/worker"
            className="group relative overflow-hidden rounded-2xl bg-surface/50 border border-white/10 p-8 hover:border-secondary/50 transition-all hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <HardHat className="w-12 h-12 text-secondary mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Worker Portal</h3>
            <p className="text-sm text-stone-400 mb-6">Field access for maintenance tasks.</p>
            <div className="flex items-center gap-2 text-secondary text-sm font-bold">
              Login <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
