import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

const typeDefs = `#graphql
    input CreateBoardInput {
        number: Int,
        writer: String,
        title: String,
        contents: String
    }

    type MyInput {
        writer: String,
        title: String,
        contents: String
    }

    type Query {
        // fetchBoards: MyResult // 객체 1개를 의미
        fetchBoards: [MyResult] // 배열 안에 객체 1개 이상을 의미
    }

    type Mutation {
        // createBoard(writer: String, title: String, contents: String): String
        createBoard(createBoardInput: CreateBoardInput!): String
    }
`

const resolvers = {
    Query: {
        fetchBoards: (parent, args, context, info) => {
            // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정 
            const result = [
                { number: 1, writer: "Paul", title: "This is title", contents: "This is the contents for Paul"}, 
                { number: 2, writer: "Chris", title: "This is Chris", contents: "This is the contents for Chris"}, 
                { number: 3, writer: "Matt", title: "This is Matt", contents: "This is the contents for Matt"}, 
            ]

            // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
            return result
        }
    },

    Mutation: {
        createBoard: (_, args) => {
            // 1. 브라우저에서 보내준 데이터 확인하기
            console.log(args.createBoardInput.writer)
            console.log(args.createBoardInput.title)
            console.log(args.createBoardInput.writer)
            

            // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정 
            
            // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기

            return "Successfully submited"
        }
    }
}

// graphlql 는 스웨거를 동시에 만들어야함
const server = new ApolloServer({
    typeDefs, // swagger 부분
    resolvers, // api 부분
    cors: true
    // cors: {origin: ["http://localhost:3001", "http://naver.com"]} // 특정 사이트만 지정하고 싶을 떄 
})

startStandaloneServer(server) // 4000