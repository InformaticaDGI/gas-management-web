
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { API_BASE_URL } from './lib/constants';

type CreateApolloClientProps = {
  accessToken?: string;
}

const createApolloClient = async ({ accessToken }: CreateApolloClientProps = {}) => {

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