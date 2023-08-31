const net = require('net');



exports.handler = async (event, context) => {
    try {
        // Create a server to handle SMTP connections
        const server = net.createServer((client) => {
            client.on('data', (data) => {
                // Implement basic SMTP command parsing here
                const command = data.toString().trim().toUpperCase();

                if (command === 'HELO') {
                    client.write('250 Hello\r\n');
                } else if (command === 'MAIL FROM') {
                    client.write('250 Sender OK\r\n');
                } else if (command === 'RCPT TO') {
                    client.write('250 Recipient OK\r\n');
                } else if (command === 'DATA') {
                    client.write('354 Start mail input; end with <CRLF>.<CRLF>\r\n');
                } else if (command === 'QUIT') {
                    client.write('221 Bye\r\n');
                    client.end();
                } else {
                    client.write('500 Command not recognized\r\n');
                }
            });
        });

        server.listen(25, () => {
            console.log('SMTP server listening on port 25');
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'SMTP server started' }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error starting SMTP server' }),
        };
    }
};
