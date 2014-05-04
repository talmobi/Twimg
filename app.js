var http = require('http');
var fs = require('fs');

var path = "img.png";
var url = 'http://i.imgur.com/0kLB26Y.png';

var images = require('images');

var file;

// check if img exists
fs.exists(path, function(exists) {
	if (!exists) {
		file = fs.createWriteStream(path);
		// download it form the url
		http.get(process.argv[2] || url, function(res) {
			if (res.statusCode !== 200) {
				console.log("Failed to downoad image, exiting.");
				process.exit(1);
				return;
			} else {
				console.log("Saving image.");
				res.pipe(file)
				file.on('finish', function() {
					console.log("Done.");
					init();
				});
			}
		});
	} else {
		// file already exists in the file system
		init();
	}
});


var img;
function init() {
	var output = "tmp.png";

	images(path).save(output);

	img = fs.readFileSync(output);

	startServer();
}

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