(function(){
	"use strict";
	var clear = require('clear');
	clear();
	
	var express = require('express');
	var app = express();
	var path = require('path');
    
	
	app.use('/static', express.static(__dirname + '/static'));
	app.use('/templates', express.static(__dirname + '/templates'));
    app.use('/vendor', express.static(__dirname + '/static/vendor'));
	
	app.get('/', function(req, res){
		console.log(__dirname);
		res.sendFile(__dirname + '/templates/index.html');
	});
	
	app.get('/getActiveContacts', function(req, res){
        var db_access = require('./db_access');
        var db_handl = db_access.accessDatabase();
        db_handl.getUserList(function(users){
            res.json({
                activeContactList: users
            });
        });
	});
    
    app.get('/validateUsername/', function(req, res){
        console.log(req.query.username);
        var db_access = require('./db_access');
        var db_handl = db_access.accessDatabase();
        db_handl.validateUsername(req.query.username, function(users){
            if (users.indexOf(req.query.username) !== -1){
                console.log('Valid');
                res.json({
                    usernameIsValid: true
                });
            }
            else{
                console.log(' Not Valid');
                res.json({
                    usernameIsValid: false
                });
            }
        });
    });
	
	app.listen('3200', function(){
		console.log("Listening @ " + 3200)
	});
	
})();