const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const recipeRoutes = require('./Routes/Recipe');
const authRoutes = require('./Routes/auth');
const PORT = 3000;


    mongoose.connect("mongodb://localhost:27017/recipes").then(() => {
        console.log("Base de donnée connectée")
    });

server.use(cors({
    origin: "http://localhost:5173"
}));

server.use(express.json());
server.use(express.urlencoded({ extended: true}));
server.use('/api/recipes', recipeRoutes);
server.use(authRoutes);
server.use('/uploads', express.static('uploads'));

server.listen(PORT, () => {
    console.log(`serveur en écoute sur le port ${PORT}`);
})