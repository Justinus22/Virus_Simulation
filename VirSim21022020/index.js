//Server Site
const Datastore = require('nedb');
const express = require('express');
const app = express();


//init Server
const hostname = '0.0.0.0'
var server = app.listen(4321, hostname, function () {
    var hostname = server.address().address;
    var port = server.address().port;
    console.log('running at http://[' + hostname + ']:' + port)
});

app.use(express.static('public'));
app.use(express.json({ limit: '100mb'}));

//init Database
const database = new Datastore('database.db');
database.loadDatabase();

//handel Requests
app.get('/api', (request, response) => {
	console.log('got a get')
	database.find({}, (err, data) =>{
		
		if(err){
			response.end();
			return;
		}
		response.json(data)
	})

	
});
app.post('/api', (request, response) => {
	console.log('got a request');
	const data = request.body;

	database.insert(data);

	response.json(data);
});
