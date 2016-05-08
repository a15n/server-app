'use strict';
// http://photo-voto.herokuapp.com/api/v1/Pages
let http = require('http');
let dispatcher = require('httpdispatcher');

const PORT = 8080;

let server = http.createServer((request, response) => {
	try {
		console.log(request.url);
		dispatcher.dispatch(request, response);
	} catch(error) {
		console.log(error);
	}

	// response.end(`It works! Path hit ${request.url}`);
});

server.listen(PORT, () => {
	//Callback triggered when server is successfully listening. Hurray!
	console.log(`Server listening on: http://localhost:${PORT}`);
});


//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('resources');

//A sample GET request
dispatcher.onGet('/page1', function(req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Page One');
});

//A sample POST request
dispatcher.onPost('/post1', function(req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Got Post Data');
});
