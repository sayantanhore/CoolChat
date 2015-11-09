(function(){
	"use strict";
	var clear = require('clear');
	clear();
	
	var express = require('express');
	var app = express();
	var path = require('path');
    
    //var http = require('http').Server(app);
    //var io = require('socket.io')(http);
    
	
	app.use('/static', express.static(__dirname + '/static'));
	app.use('/templates', express.static(__dirname + '/templates'));
    app.use('/vendor', express.static(__dirname + '/static/vendor'));
	
	app.get('/', function(req, res){
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
	
    
    
	var server = app.listen('3200', function(){
		console.log("Listening @ " + 3200)
	});
    
    // Socket.io
    
    //-------------------------------------------
    
    var activeUsers = [];
    var activeSockets = [];
    
    var io = require('socket.io').listen(server);
    
    io.on('connection', function(socket){
        var client = socket.id;
        console.log(client + " connected");
        
        socket.on('disconnect', function(){
            console.log(socket.id + " disconnected");
        });
        
        socket.on('login', function(msg){
            console.log("---------------------------------------");
            console.log("User " + msg.username + " logged in");
            console.log("---------------------------------------");
            activeUsers.push(msg.username);
            activeSockets.push(socket);
        });
        
        socket.on('logout', function(msg){
            console.log("---------------------------------------");
            console.log("User " + msg.username + " logged out");
            console.log("---------------------------------------");
            var activeUserAt = activeUsers.indexOf(msg.username);
            activeUsers.slice(activeUserAt, 1);
            activeSockets.slice(activeUserAt, 1);
        });
        
        socket.on('handshake', function(msgObj){
            console.log(msgObj);
            var chatIsPossible = false;
            console.log(activeUsers);
            console.log(activeUsers.indexOf(msgObj.askingFor));
            if (activeUsers.indexOf(msgObj.askingFor) !== -1){
                chatIsPossible = true;
            }
            var handshake_ack = {
                sendFrom: 'server',
                sendTo: msgObj.sendFrom,
                msgType: 'HANDSHAKE_ACK',
                chatIsPossible: chatIsPossible
            };
            socket.emit('handshake_ack', handshake_ack);
        });
        
        socket.on('chat', function(msgObj){
            var sendTo = msgObj.sendTo;
            console.log(sendTo);
            console.log(activeUsers.indexOf(sendTo));
            var sendToSocket = activeSockets[activeUsers.indexOf(sendTo)];
            sendToSocket.emit('chat', msgObj)
        });
        
    });
    
    
	
})();