import './App.css';

import { ApolloClient, ApolloProvider, InMemoryCache, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import Getusers from './components/Getusers';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message, location, path }) => {
      alert("Graphql error: " + message)
    })
  }
})

const Link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" })
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: Link
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Getusers />
    </ApolloProvider>
  );
}

export default App;
