// websocket/websocketServer.js
const WebSocket = require('ws');
const handleMessage = require('./messageHandler');
const clientManager = require('./clientManager');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

const setupWebSocket = (server) => {
	const wss = new WebSocket.Server({ server });

	wss.on('connection', (ws) => {
		logger.info('Novo cliente conectado');
		clientManager.addClient(ws);

		// Enviar uma mensagem de boas-vindas (opcional)
		const welcomeMessage = {
			id: uuidv4(),
			author: 'Servidor',
			text: 'Bem-vindo ao chat!',
			timestamp: new Date().toISOString(),
		};
		ws.send(JSON.stringify(welcomeMessage));

		// Evento de recebimento de mensagem
		ws.on('message', (data) => {
			handleMessage(data, ws, clientManager.broadcast);
		});

		// Evento de fechamento de conexão
		ws.on('close', () => {
			logger.info('Cliente desconectado');
			clientManager.removeClient(ws);
		});

		// Evento de erro
		ws.on('error', (error) => {
			logger.error('WebSocket erro:', error);
		});
	});
};

module.exports = setupWebSocket;
