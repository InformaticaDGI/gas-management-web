import { PlantHeader } from "@/components/Plants/header";

export default function PlantsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>
        <PlantHeader />
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                {children}
            </div>
        </div>
    </>
}