import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import data from "@/app/data.json";
import { MeDocument } from "@/graphql/generated/graphql";
import createApolloClient from "@/graphql-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const getMyData = async (accessToken: string) => {
  const client = await createApolloClient({ accessToken });
  const { data, error } = await client.query({
    query: MeDocument,
  });
  if (error) {
    console.error("Error al obtener los datos:", error);
    return null;
  }
  return data;
}

export default async function DashboardPage() {

  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    redirect("/auth/login");
  }

  const response = await getMyData(session.accessToken);

  console.log({ session: session.accessToken });

  return <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
    <SectionCards />
    <div className="px-4 lg:px-6">
      <ChartAreaInteractive />
    </div>
    <DataTable data={data} />
  </div>
}