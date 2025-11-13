import ProductForm from "@/components/products/product-form";

export default async function CreateProductPage() {

    return <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
        <div className="w-full max-w-md">
            <ProductForm />
        </div>
    </div>
}