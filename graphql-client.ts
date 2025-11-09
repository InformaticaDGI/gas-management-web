
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { API_BASE_URL } from './lib/constants';

const createApolloClient = () => {
    return new ApolloClient({
    link: new HttpLink({ uri: API_BASE_URL }),
    cache: new InMemoryCache(),
  });
}


export default createApolloClient;