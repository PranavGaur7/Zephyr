import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from "dotenv";
import { Server } from "socket.io";
import { connectDB } from './db/connectDB.js';
import resolvers from './resolvers/index.js';
import typeDefs from './typedefs/index.js';
// import googleRouter from './routers/googleApiRouter.js';
interface MyContext {
    token?: string;
}

dotenv.config()
const app = express();
app.use(express.json())
const httpServer = http.createServer(app);
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
}))
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});
io.on("connection", (socket) => {
    socket.on("send-msg", (arg) => {
        console.log(socket.id);
        socket.emit("rec-msg", "message recieved")
    })

});
const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start(); 

app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }) =>{ 
            
            return { token: req.headers.authorization }
        },
    }),
);
// app.use('/api', googleRouter);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
connectDB();
console.log(`🚀 Server ready at http://localhost:4000/graphql`); 