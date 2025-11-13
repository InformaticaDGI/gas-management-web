import { getProducts } from "@/app/actions";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { ProductDataTable } from "@/components/products/product-datatable";

export default async function ProductsPage() {
    const { error, products } = await getProducts();

    if (error) {
        return <div>
            <div className="w-full max-w-full py-4">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">No se encontraron productos</h1>
                </div>
            </div>
        </div>
    }

    return <>
        <SiteHeader title="Productos">
            <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="hidden h-7 sm:flex" asChild>
                    <Link href="/inventory/products/create">
                        <IconCirclePlusFilled />
                        <span>Crear producto</span>
                    </Link>
                </Button>
            </div>
        </SiteHeader>
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div>
                    <div className="w-full max-w-full py-4">
                        <ProductDataTable data={products} />
                    </div>
                </div>
            </div>
        </div>
    </>
}