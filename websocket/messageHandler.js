// websocket/messageHandler.js
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

const handleMessage = (data, ws, broadcast) => {
	let messageStr;

	if (Buffer.isBuffer(data)) {
		// Converte Buffer para string usando UTF-8
		messageStr = data.toString('utf8');
	} else if (typeof data === 'string') {
		messageStr = data;
	} else {
		logger.warn('Tipo de mensagem desconhecido. Ignorando...');
		return;
	}

	logger.info(`Mensagem recebida: ${messageStr}`);
	logger.info(`Tipo da mensagem recebida: ${typeof messageStr}`);

	// Tenta analisar a mensagem como JSON
	try {
		const parsedMessage = JSON.parse(messageStr);
		// Validação básica dos campos da mensagem
		if (
			parsedMessage.id &&
			parsedMessage.author &&
			parsedMessage.text &&
			parsedMessage.timestamp
		) {
			// Modifica o 'author' para 'Outra pessoa'
			const broadcastMessage = {
				...parsedMessage,
				author: 'Outra pessoa',
			};

			const broadcastStr = JSON.stringify(broadcastMessage);

			// Envia a mensagem para todos os clientes conectados, **exceto o emissor**
			broadcast(broadcastStr, ws);
			logger.info(
				`Mensagem enviada para outros clientes: ${broadcastStr}`,
			);
		} else {
			logger.warn('Mensagem recebida está faltando campos. Ignorando...');
		}
	} catch (error) {
		logger.error('Erro ao analisar a mensagem recebida:', error);
		logger.info('Dados recebidos:', messageStr);
	}
};

module.exports = handleMessage;
