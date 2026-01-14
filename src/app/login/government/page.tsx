"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { loginWithGoogle } from "@/lib/auth";

export default function GovernmentLogin() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock login delay
        setTimeout(() => {
            setLoading(false);
            router.push("/government/dashboard");
        }, 1500);
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            router.push("/government/dashboard");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-background" />
            <div className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary border border-primary/20">
                        <Building2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Government Portal</h2>
                    <p className="text-stone-400 mt-2">Secure access for administrators.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 bg-surface/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                    <div>
                        <label className="block text-sm font-medium text-stone-400 mb-1">Email ID</label>
                        <input
                            type="email"
                            placeholder="admin@gov.in"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-400 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-black font-bold py-3 rounded-xl hover:bg-primary-600 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Access Dashboard <ArrowRight className="w-5 h-5" /></>}
                    </button>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-surface px-2 text-stone-500">Or continue with</span></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-stone-200 transition-all"
                    >
                        Google
                    </button>
                </form>

                <p className="text-center text-sm text-stone-500">
                    <Link href="/" className="hover:text-white transition-colors">Back to Home</Link>
                </p>
            </div>
        </div>
    );
}
