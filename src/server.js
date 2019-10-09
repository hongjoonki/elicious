require("dotenv").config(); // env 파일을 읽어온다.
import { GraphQLServer } from "graphql-yoga"; // npm install graphql-yoga
import logger from "morgan"; // 로깅전용 모듈 임포트
import schema from "./schema";

// PORT에 관한 변수를 env파일에서 가져온다.
const PORT = process.env.PORT || 4000;

/* 이 작업을 schma.js파일을 임포트하여 자동화시켯음
// type에 관한 정의
const typeDefs = `
    type Query {
        hello: String!
    }
`;

// resolver에 관한 정의
const resolvers = {
    Query: {
        hello: () => "Hi"
    }
};
*/

// Server 생성
const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));

// Server 실행
server.start({ port: PORT }, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);