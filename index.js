const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const httpServer = http.createServer((req, res) => server(req, res));

const server = (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    const method = req.method.toUpperCase()

    const queries = parsedUrl.query;
    const headers = req.headers;

    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();
        
        res.end('working ' + method + ' ' + trimmedPath);
    });

}    

httpServer.listen(8080, () => console.log('server working on localhost:3030'))
