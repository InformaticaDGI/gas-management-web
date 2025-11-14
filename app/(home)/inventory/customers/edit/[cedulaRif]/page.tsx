import { getCustomerByCedulaRif } from "@/app/actions";
import CustomerForm from "@/components/costumer/costumer-form";

export default async function EditCustomerPage({ params }: { params: Promise<{ cedulaRif: string }> }) {
    const { cedulaRif } = await params;
    const { error, customer } = await getCustomerByCedulaRif(cedulaRif);
    if (error || !customer) {
        return <div>Error al obtener el cliente</div>
    }

    return <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
        <div className="w-full">
            <CustomerForm customer={customer} />
        </div>
    </div>
}