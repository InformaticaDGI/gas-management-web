import { getPlants } from "@/app/actions/getPlants";
import ContainerForm from "@/components/containers/container-form";

export default async function CreateContainerPage() {
    const { error, plants } = await getPlants();
    return <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
        <ContainerForm plants={plants} />
    </div>
}