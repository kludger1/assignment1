const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        // return greeting
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>');
        res.write('<head>');
        res.write('<title>Welcome Page</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<h2>Hello from app.js</h2>')
        res.write('<form action="/create-user" method="POST"><input type="text" name="user" placeholder="username"><button type="submit">Send</button></form>')
        res.write('</body>');
        res.write('</html>');
        return res.end()

    } else if (url === '/users') {
        // return dummy user list <ul><li>james</li></li>
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head>');
        res.write('<title>Users Info</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Name: James Age: 36</li>');
        res.write('<li>Name: Katleen Age: 20</li>');
        res.write('<li>Name: Mya Age: 18</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    } else if (url === '/create-user' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            fs.writeFileSync('user.txt', user)
        });


        
        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end()
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head>');
        res.write('<title>Error Page</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<h2>404 Sorry...Page Not Found</h2>')
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }


});

// listen on port 3003
server.listen(3003)



