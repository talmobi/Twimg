var http = require('http');
var fs = require('fs');
//var url = 'http://i.imgur.com/0kLB26Y.png';
var url = 'tmp.png';

var w = 40;
var h = 40;
var n = 0; // subimage index

var Canvas = require('canvas')
	,	canvas = new Canvas(w, h)
	, ctx = canvas.getContext('2d');;

// holds the sub image data
var imgDataBuffers = [];

/**
	*	Initialization of the Sprite Sheet
	*/
function init() {
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
		
		// randomize the subimage
		n = Math.floor(Math.random() * imgDataBuffers.length);
		startServer();
	}

	img.src = url;
};

function startServer() {
	var port = process.argv[2] || 40000;

	http.createServer(function(req, res) {
		if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end(imgDataBuffers[n], 'binary');
     } else {
     	res.writeHead(200, {'Content-Type': 'image/x-icon' });
     	res.end(imgDataBuffers[n], 'binary');
     	// console.log("sent image number: " + n);

			// randomize the subimage
			n = Math.floor(Math.random() * imgDataBuffers.length);
     }
   }).listen(port);

	console.log("Server listening at port: " + port);
}

/**
	*	Start the app
	*/
setTimeout(init, 2000);