const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');

function configureSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('Nuevo usuario conectado:', socket.id);

        // **Recibir y validar el token del usuario**
        socket.on('authenticate', (token) => {
            try {
                const decoded = jwt.verify(token, secret);
                socket.user = decoded;
                console.log(`Usuario autenticado: ${decoded.email}`);
            } catch (error) {
                console.log('Token inválido:', error.message);
                socket.disconnect();
            }
        });

        socket.on('sendMessage', async (data) => {
            if (!socket.user) {
                return socket.emit('error', 'Usuario no autenticado');
            }

            // **Enviar mensaje solo si el usuario está autenticado**
            io.emit('receiveMessage', { user: socket.user.email, message: data.message });
        });

        socket.on('disconnect', () => {
            console.log('Usuario desconectado:', socket.id);
        });
    });
}

module.exports = configureSocket;