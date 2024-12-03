const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Sử dụng thư mục public để phục vụ các tệp tĩnh
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (msg) => {
        console.log('Message received: ' + msg);
        io.emit('message', msg); // Phát tin nhắn cho tất cả các client
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// const net = require('net');

// const server = net.createServer((socket) => {
//     console.log('Client connected');

//     // Hàm gửi tin nhắn đến client định kỳ
//     const sendMessages = () => {
//         if (socket.destroyed) return;
//         const message = `Message from server at ${new Date().toLocaleTimeString()}`;
//         socket.write(message + '\n');
//         console.log(`Sent: ${message}`);
//     };

//     // Gửi một tin nhắn mỗi 5 giây
//     const interval = setInterval(sendMessages, 5000);

//     // Xử lý khi client ngắt kết nối client
//     socket.on('end', () => {
//         console.log('Client disconnected');
//         clearInterval(interval);
//     });

//     // Bắt và xử lý lỗi
//     socket.on('error', (err) => {
//         console.error(`Socket error: ${err}`);
//         clearInterval(interval);
//     });
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });
