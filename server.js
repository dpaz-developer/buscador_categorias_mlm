var express = require('express')
    , app = express()
    , server = require('http').createServer(app);

app.set('port', process.env.INTERNAL_PORT || 8080);
app.use(express.static('public', __dirname + 'public'));

app.get('/', function (request, response) {
    response.sendfile('index.html');
});

server.listen(app.get('port'), function () {
    console.log("Mock server listening on port " + app.get('port'));
});