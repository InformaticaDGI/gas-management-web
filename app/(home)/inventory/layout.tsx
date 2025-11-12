import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function InventoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }

    return <>
        <SiteHeader title="Inventario" children={<Button>Crear entrada</Button>} />
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2 py-4 px-6">
                {children}
            </div>
        </div>
    </>
}