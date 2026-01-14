import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function GovernmentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <Sidebar role="government" />
            <main className="pl-64 pt-16 min-h-screen transition-all duration-300">
                <div className="p-6 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
