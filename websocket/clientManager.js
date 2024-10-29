// websocket/clientManager.js
const clients = new Set();

const addClient = (ws) => {
	clients.add(ws);
};

const removeClient = (ws) => {
	clients.delete(ws);
};

const broadcast = (message, excludeWs = null) => {
	clients.forEach((client) => {
		if (client !== excludeWs && client.readyState === client.OPEN) {
			client.send(message);
		}
	});
};

module.exports = {
	addClient,
	removeClient,
	broadcast,
};
