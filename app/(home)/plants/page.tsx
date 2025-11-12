import { PlantHeader } from "@/components/Plants/plant-header";
import { PlantDataTable } from "@/components/Plants/plant-datatable";
import { getPlants } from "@/app/actions";

export default async function PlantsPage() {
    const { error, plants } = await getPlants();

    if (error) {
        return <div>
            <div className="w-full max-w-full py-4">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">No se encontraron plantas</h1>
                </div>
            </div>
        </div>
    }

    return <>
        <PlantHeader />
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div>
                    <div className="w-full max-w-full py-4">
                        <PlantDataTable data={plants} />
                    </div>
                </div>
            </div>
        </div>
    </>
}