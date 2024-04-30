import { buildSchema } from "graphql";
export const schemaGameData = buildSchema(`
    type App {
        appid: String!
        name: String!
    }

    type Data {
        type: String!
        name: String!
        steam_appid: String!
        required_age: Int!
        is_free: Boolean!
        controller_support: String
    }
    
    type Query {
        fetchGameApp: [App!]!
        fetchGameData(appid: String!): Data!
    }
`)