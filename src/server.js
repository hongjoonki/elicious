import "./env";
import { GraphQLServer } from "graphql-yoga"; // npm install graphql-yoga
import logger from "morgan"; // 로깅전용 모듈 임포트
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

// PORT에 관한 변수를 env파일에서 가져온다.
const PORT = process.env.PORT || 4000;

// Server 생성
const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

// Server 실행
server.start({ port: PORT }, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
);