import { buildSchema } from "graphql";
export const schemaGameData = buildSchema(`
    type Query {
        fetchGameData: String!
    }
`)