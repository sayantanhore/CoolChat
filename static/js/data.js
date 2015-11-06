// MongoDB test

(function(){
    var MongoClient = require('mongodb').MongoClient
      , assert = require('assert');

    // Connection URL
    var url = 'mongodb://localhost:27017/CoolChat';
    // Use connect method to connect to the Server
    
    // Insert 
    
    var insertUsers = function(db, callback){
        var collection = db.collection('users');
        collection.insertMany([
            {
                name: 'Sayantan'
            },
            {
                name: 'Kalle'
            },
            {
                name: 'Joel'
            },
            {
                name: 'Teemu'
            },
            {
                name: 'Mikko'
            },
            {
                name: 'Lasse'
            }
        ], function(err, result){
            assert.equal(err, null);
            callback(result);
        });
    };
    
    var getUsers = function(db, callback){
        var users = db.collection('users').find({})
            .toArray(function(err, docs){
                assert.equal(err, null);
                console.log(docs[0].name);
                callback();
            });
        console.log(users);
    };
    
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        /*
        insertUsers(db, function(){
            db.close();
        });
        */
        
        getUsers(db, function(){
            db.close();
        });
        
    });
})();