const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configuración de CORS para Socket.io
const allowedOrigins = [
  "http://localhost:5173",  // Frontend en desarrollo
  "http://localhost",  // Frontend en desarrollo
  "http://167.172.139.236"      // Si tienes algún subdominio o algún otro frontend
];

const io = socketIo(server, {
  cors: {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);  // Permite la conexión
      } else {
        callback(new Error('Not allowed by CORS'), false);  // Bloquea la conexión si el origen no es permitido
      }
    },
    methods: ["GET", "POST"],  // Métodos permitidos
    allowedHeaders: ["Content-Type"]  // Cabeceras permitidas
  }
});

// Configurar CORS para el resto de las rutas (si es necesario)
app.use(cors());

// Cuando un jugador se conecta
io.on('connection', (socket) => {
  console.log('Un jugador se ha conectado');

  // Recibir tirada de dados
  socket.on('rollDice', () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    console.log(`Jugador ha tirado: ${diceRoll}`);
    // Emitir el resultado a todos los jugadores
    io.emit('diceRolled', diceRoll);
  });

  // Cuando un jugador se desconecta
  socket.on('disconnect', () => {
    console.log('Un jugador se ha desconectado');
  });
});

// Iniciar el servidor en el puerto 3001
server.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
