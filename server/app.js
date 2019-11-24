const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const multer = require('multer');
require('dotenv').config();

const { allowCors } = require('./middlewares/allow-cors');
const schemas = require('./schemas/schema');
const resolvers = require('./resolvers/resolvers');
const user = require('./routes/user');

const schema = makeExecutableSchema({
  typeDefs: schemas,
  resolvers
});

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const app = express();

app.use(allowCors);

app.use(bodyParser.json());

app.use(multer({ storage: storageConfig }).single('image'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(user);

app.use('/graphql', graphqlExpress({ schema }));

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
