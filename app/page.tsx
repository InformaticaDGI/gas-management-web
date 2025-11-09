import { Button } from "@/components/ui/button";
import createApolloClient from "@/graphql-client";
import { CountriesDocument } from "@/graphql/generated/graphql";

const getCountries = async () => {
  const client = createApolloClient();
  const response = await client.query({
    query: CountriesDocument
  })

  return response

}

export default async function Home() {
  const { data, error } = await getCountries();
  if(!data) return "Loading...";
  if(error) return "Ha ocurrido un error";
  console.log()

  return (
    <div>
      {data.countries.map(country => (
        <p key={country.code}>{country.name} {country.emoji}</p>
      ))}
      <Button>Click Me!</Button>
    </div>
  );
}
