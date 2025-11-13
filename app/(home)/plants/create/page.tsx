import { getCompanies } from "@/app/actions";
import PlantForm from "@/components/plants/plant-form";

export default async function CreatePlantPage() {

    const { error, companies } = await getCompanies();

    if (error) {
        return <div>
            <div className="w-full max-w-full py-4">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">No se encontraron empresas</h1>
                </div>
            </div>
        </div>
    }

    return <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
        <div className="w-full max-w-md">
            <PlantForm companies={companies} />
        </div>
    </div>
}