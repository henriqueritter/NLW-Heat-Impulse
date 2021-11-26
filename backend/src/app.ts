import 'dotenv/config';
import express from 'express';
import { router } from "./routes";

import cors from 'cors';

//http e server para o socketio
import http from 'http';
import { Server } from 'socket.io';

const app = express();

//uso do cors no app
app.use(cors());

//subir o server com o http
const serverHttp = http.createServer(app);

//abrir o acesso ao io do nosso cliente / config do cors para acessar qualquer cliente
const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => { console.log(`Usuário conectado no socket ${socket.id}`) });
//diz para aceitar requisicoes com JSON no body.
app.use(express.json());

// chama as rotas do nosso arquivo
app.use(router);

app.get("/github", (request, response) => {
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

export { serverHttp, io };