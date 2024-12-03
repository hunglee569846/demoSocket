const net = require('net');

const client = new net.Socket();

client.connect(3000, '127.0.0.1', () => {
    console.log('Connected to server');
});

client.on('data', (data) => {
    console.log(`Received: ${data.toString()}`);
});

client.on('close', () => {
    console.log('Connection closed');
});

// Bắt và xử lý lỗi
client.on('error', (err) => {
    console.error(`Client error: ${err}`);
});
