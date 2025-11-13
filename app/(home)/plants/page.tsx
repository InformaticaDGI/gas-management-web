import { PlantDataTable } from "@/components/plants/plant-datatable";
import { getPlants } from "@/app/actions";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconCirclePlusFilled } from "@tabler/icons-react";

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
        <SiteHeader title="Plantas">
            <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="hidden h-7 sm:flex" asChild>
                    <Link href="/plants/create">
                        <IconCirclePlusFilled />
                        <span>Crear planta</span>
                    </Link>
                </Button>
            </div>
        </SiteHeader>
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