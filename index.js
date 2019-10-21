const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');

const { resolvers } = require('./src/resolvers');
const { typeDefs } = require('./src/schema');


const PORT = 9000;

const app = express();
app.use(cors());



const pubsub = new PubSub();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/graphql' });

app.get('/download', (req, res) => {
  res.download(`./data/Invoices/${req.query.file}`, function (err) {
         if (err) {
             console.log("Error");
             console.log(err);
         } else {
             console.log("Success");
         }
  });
});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);

// simulate real time data

// (() => {
//   setInterval(() => {
//     const mW = (Math.random() * 300).toFixed(2);
//     const price = (Math.random() * 80).toFixed(2);
//     const newData = {
//       mW,
//       price
//     }
//     pubsub.publish('POST_ADDED', { getNewData: {
//       mW,
//       price
//     } });
//   }, 1000);
// })();
