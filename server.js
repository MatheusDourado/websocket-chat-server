// server.js
const express = require('express');
const http = require('http');
const setupWebSocket = require('./websocket/websocketServer');
const logger = require('./utils/logger');
require('dotenv').config(); // Carrega variáveis de ambiente, se houver

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Middleware opcional (por exemplo, para servir arquivos estáticos)
app.use(express.static('public'));

// Rota simples para verificar se o servidor está funcionando
app.get('/', (req, res) => {
	res.send('Servidor WebSocket está funcionando!');
});

// Inicializa o WebSocket
setupWebSocket(server);

// Inicia o servidor
server.listen(PORT, () => {
	logger.info(`Servidor rodando na porta ${PORT}`);
});
