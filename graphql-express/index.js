const express = require("express");
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");
let port = 4000;

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(port, () => console.log("GraphQL API server running at port 4000"));
