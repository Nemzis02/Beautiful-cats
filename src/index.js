import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';
import 'styles/main.scss';
import * as serviceWorker from './serviceWorker';

import { GRAPHQL_HOST } from 'global/constants';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: GRAPHQL_HOST,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
