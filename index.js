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
        
        const requestHandler = typeof router[trimmedPath] == 'undefined' ? handlers.notFound : router[trimmedPath];

        const data = {
            path: trimmedPath,
            queries,
            method,
            payload: buffer
        }
        
        requestHandler(data, (statusCode, payload) =>{
            // Default status code 
            statusCode = typeof statusCode == 'number' ? statusCode : 200;

            // Default payload
            payload = typeof payload == 'object' ? payload : {};

            const paylaodAsString = JSON.stringify(payload)

            res.setHeader('Content-Type', 'Application/json');
            res.writeHead(statusCode);
            res.end(paylaodAsString);
        });
    });

}    

httpServer.listen(8080, () => console.log('server working on localhost:3030'))

const handlers = {};

handlers.test = (data, callback) => {
   callback(200, {msg: "Testign the Routing thing"}); 
}

handlers.notFound = (data, callback) => {
   callback(404) 
}

const router = {
    'test': handlers.test
}
