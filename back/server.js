const express = require('express');
const server = express();
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`serveur en écoute sur le port ${PORT}`);
})