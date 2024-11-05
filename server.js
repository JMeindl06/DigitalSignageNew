const WebSocket = require('ws'); 
const express = require('express');
const path = require('path');
const http = require('http');

//express app
const app = express();
const hostname = '10.13.242.80'; 
const port = 3000;

// HTTP-Server erstellen und sowohl für Express als auch für WebSocket verwenden
const server = http.createServer(app);

// WebSocket-Server an den HTTP-Server binden
const wss = new WebSocket.Server({ server });

// Static Files (HTML, JS, CSS) aus dem 'public'-Ordner für clients des servers
app.use(express.static(path.join(__dirname, 'public')));


//NEUER CLIENT CONNECTED
wss.on('connection', function connection(ws) {

    ws.on('close', function () {
        console.log(`Client ${clientID || 'Unbekannt'} hat die Verbindung getrennt.`);
        // Entferne den Client, wenn die Verbindung geschlossen wird
        connectedClients.delete(clientID);
    });
});

// Server-URL ausgeben
server.listen(port, hostname, () => {
    console.log(`Server läuft unter http://${hostname}:${port}/`);
});
