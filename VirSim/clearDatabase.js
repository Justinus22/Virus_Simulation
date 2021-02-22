const Datastore = require('nedb');
const express = require('express');
const app = express(); 

const database = new Datastore('database.db')
database.loadDatabase()

database.remove({}, {multi: true}, function(err, numRemoved){
	console.log('clear database')
});