/* eslint-disable no-undef */
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import cors from "cors";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import { schemaGameData } from "./schemaGameData.mjs";
import { resolverGameData } from "./resolverGameData.mjs"
import { authenticationMiddleware } from "./authenticationMiddleware.mjs";

const app = new express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authenticationMiddleware);

app.all("/graphql", createHandler({
    schema: schemaGameData, rootValue: resolverGameData, context: (req) => req, formatError(err) {
        if (!err.originalError) {
            return err;
        }
        const name = err.name;
        const message = err.message;
        const path = err.path;
        return { name, message, path };
    }
}))

app.get('/', (req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/graphql" }));
})

// app.use((req, res, next) => {
//     const error = new Error('Unexpectable error got occured');
//     next(error);
// });

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send("Server encountered an unexpected edition and got error");
});

try {
    await connect("mongodb+srv://Minhtainth123:JURXUS2XxgnrQSBy@clusterdemo.9qyadhq.mongodb.net/ClusterDemoDB?retryWrites=true&w=majority&appName=ClusterDemo");
    await app.listen(PORT, () => console.log(`Server NodeJS + Express + MongoDB + GraphQL is running on port ${PORT}`));
}
catch (err) {
    throw new Error(err.message || "MongoDB or Express disconnected");
}
