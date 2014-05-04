var http = require('http');
var fs = require('fs');
//var url = 'http://i.imgur.com/0kLB26Y.png';
var url = 'tmp.png';

var w = 40;
var h = 40;

var Canvas = require('canvas')
	,	canvas = new Canvas(w, h)
	, ctx = canvas.getContext('2d');;

var imgDataBuffers = [];
var img = new Canvas.Image;

img.onerror = function(err) {
	throw err;
};

img.onload = function() {
	var i = Math.floor(img.width / w);
	var j = Math.floor(img.height / h);

	for (var y = 0; y < j; y++) {
		for (var x = 0; x < i; x++) {
			ctx.clearRect(0,0,w,h); // necessary for subimages with transparency
			ctx.drawImage(img, x * w , y * h, w, h, 0, 0, w, h);
			imgDataBuffers.push(canvas.toBuffer());
		}
	}
	

	startServer();
}

img.src = url;

function startServer() {
	http.createServer(function(req, res) {
		if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end(/* icon content here */);
     } else {
     	var n = Math.floor(Math.random() * imgDataBuffers.length);
     	res.writeHead(200, {'Content-Type': 'image/png' });
     	res.end(imgDataBuffers[n], 'binary');
     	console.log("sent image number: " + n);
     }
	}).listen(3000, '127.0.0.1');

	console.log("Server listening at port: 3000");
}