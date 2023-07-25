import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

const typeDefs = `#graphql
    type Query {
        sendApi: String
    }
`

const resolvers = {
    Query: {
        sendApi: () => {
            return "HELLO WORLD in graphql!"
        }
    },
}

// graphlql 는 스웨거를 동시에 만들어야함
const server = new ApolloServer({
    typeDefs, // swagger 부분
    resolvers // api 부분
})

startStandaloneServer(server) // 4000