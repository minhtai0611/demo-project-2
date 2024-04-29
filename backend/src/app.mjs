/* eslint-disable no-undef */
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server"
import { schemaGameData } from "./schemaGameData.mjs";
import { resolverGameData } from "./resolverGameData.mjs"

const app = new express();
const PORT = process.env.PORT || 3000;

app.all("/graphql", createHandler({ schema: schemaGameData, rootValue: resolverGameData }))

app.get('/', (req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/graphql" }));
})


app.listen(PORT, () => console.log(`Server NodeJS + Express + MongoDB is running on port ${PORT}`))