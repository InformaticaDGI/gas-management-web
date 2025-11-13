import { SiteHeader } from "@/components/site-header";
import { DailyClosingDataTable } from "@/components/dailyclosings/dailyclosings-datatable";
import { getDailyClosings, getPlants } from "@/app/actions";
import { DailyClosingDialog } from "@/components/dailyclosings/dailyclosing-dialog";

export default async function DailyClosingsPage() {

    const [dailyClosingsData, plantsData] = await Promise.all([getDailyClosings(), getPlants()]);

    if (dailyClosingsData.error || plantsData.error) {
        return <div>
            <div className="w-full max-w-full py-4">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">No se encontraron cierres diarios</h1>
                </div>
            </div>
        </div>
    }

    return <>
        <SiteHeader title="Cierres diarios">
            <div className="ml-auto flex items-center gap-2">
                <DailyClosingDialog plants={plantsData.plants} />
            </div>
        </SiteHeader>
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div>
                    <div className="w-full max-w-full py-4">
                        <DailyClosingDataTable data={dailyClosingsData.dailyClosings} />
                    </div>
                </div>
            </div>
        </div>
    </>
}