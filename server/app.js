const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { apolloUploadExpress } = require('apollo-upload-server');
const { makeExecutableSchema } = require('graphql-tools');
require('dotenv').config();

const { allowCors } = require('./middlewares/allow-cors');
const schemas = require('./schemas/schema');
const resolvers = require('./resolvers/resolvers');

const schema = makeExecutableSchema({
  typeDefs: schemas,
  resolvers
});

const app = express();

app.use(allowCors);

app.use(
  bodyParser.json(),
  apolloUploadExpress({
    maxFileSize: 10000000,
    maxFiles: 10
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  '/graphql',
  graphqlExpress(req => {
    const { authorization } = req.headers;
    return {
      schema,
      context: {
        token: authorization ? authorization.replace('Bearer ', '') : ''
      }
    };
  })
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

mongoose
  .connect(process.env.DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening the server on the ${process.env.PORT} port.`);
    });
  })
  .catch(err => console.log(err));
