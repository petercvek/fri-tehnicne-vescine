const dotenv = require("dotenv");
const express = require("express");
const { Client } = require("pg");
const graphqlHttp = require("express-graphql");
const graphqlSchema = require("./graphql/schema/index.js");

dotenv.config();
const app = express();

global.pg = new Client({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: true
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    graphiql: true
  })
);

global.pg
  .connect()
  .then(() => console.log("connected to db"))
  .catch(error => console.error(error, "bedno"))
  .then(() => {
    app.listen(process.env.PORT || 5000, function() {
      console.log("Aplication worker " + process.pid + " started...");
      console.log("Running a GraphQL API server at http://localhost:5000/graphql");
    });
  });
