import { SiteHeader } from "@/components/site-header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>
    <SiteHeader />
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                {children}
            </div>
        </div>
    </>
}