var http = require('http');
var url = 'http://i.imgur.com/0kLB26Y.png';
var Canvas = require('canvas');

var img = new Canvas.Image();

console.log(img);

function startServer() {
	http.createServer(function(req, res) {
		// handle requests
		//res.write("Hello.");
		//var img = fs.readFileSync(path);
		res.writeHead(200, {'Content-Type': 'image/png' });
		res.end(img, 'binary');
		console.log("sent file");
	}).listen(3000, '127.0.0.1');
	console.log("Server listening at port: 3000");
}