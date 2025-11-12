import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserForm from "@/components/Users/user-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CreateUserPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect("/auth/login");
    }

    return <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
        <div className="w-full max-w-md">
            <UserForm accessToken={session.accessToken} />
        </div>
    </div>
}