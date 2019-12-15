import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

import App from './App';
import 'styles/main.scss';
import * as serviceWorker from './serviceWorker';

import { GRAPHQL_HOST } from 'global/constants';
import { resolvers } from 'apollo/resolvers';
import { typeDefs } from 'apollo/typeDefs';

const link = createUploadLink({ uri: GRAPHQL_HOST });
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  resolvers,
  typeDefs
});

const data = {
  isUserLoggedIn: false
};

cache.writeData({ data });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
