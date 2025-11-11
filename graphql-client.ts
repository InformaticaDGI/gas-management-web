
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { API_BASE_URL } from './lib/constants';
import { authOptions } from './app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

type CreateApolloClientProps = {
  accessToken?: string;
}

const createApolloClient = async ({ accessToken }: CreateApolloClientProps = {}) => {

  if (!accessToken) {
    const session = await getServerSession(authOptions);
    accessToken = session?.accessToken;
  }

  const headers: Record<string, string> = {};
  const authorization = accessToken && `Bearer ${accessToken}`;
  if (authorization) {
    headers['Authorization'] = authorization;
  }
  return new ApolloClient({
    link: new HttpLink({ uri: API_BASE_URL, headers }),
    cache: new InMemoryCache(),
  });
}


export default createApolloClient;