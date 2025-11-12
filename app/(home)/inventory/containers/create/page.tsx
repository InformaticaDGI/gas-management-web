import ContainerForm from "@/components/containers/container-form";
import { createApolloClient, createContainer, getPlants } from "@/app/actions";
import { ErrorLike } from "@apollo/client";
import { CreateContainerMutation } from "@/graphql/generated/graphql";

export default async function CreateContainerPage() {
    const { error, plants } = await getPlants();
    return <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
        <ContainerForm plants={plants} createContainer={createContainer} />
    </div>
}