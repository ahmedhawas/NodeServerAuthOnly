// Main starting point of our app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

// App Setup
app.use(morgan('combined')); // setup as middleware - logging framework
app.use(bodyParser.json({ type: '*/*' })); // parse any request as a JSON
router(app); //call the router with our app

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening to port:', port);
