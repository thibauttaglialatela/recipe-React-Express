const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 3000;

/* const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/recipes', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connecté avec succés");
    } catch (err) {
        console.error("Erreur de connection : ", err.message);
    }
} */

    mongoose.connect("mongodb://localhost:27017/recipes").then(() => {
        console.log("Base de donnée connectée")
    });

server.use(cors({
    origin: "http://localhost:5173/"
}));

server.use(express.json());
server.use(express.urlencoded({ extended: true}));

server.listen(PORT, () => {
    console.log(`serveur en écoute sur le port ${PORT}`);
})