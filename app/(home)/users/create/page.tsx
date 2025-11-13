import UserForm from "@/components/users/user-form";

export default async function CreateUserPage() {

    return <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
        <div className="w-full max-w-md">
            <UserForm />
        </div>
    </div>
}