// Access the db

module.exports.accessDatabase = function(){
    
    // Declare db client
    var MongoClient = require('mongodb').MongoClient
      , assert = require('assert');

    // Declare Connection URL
    var url = 'mongodb://localhost:27017/CoolChat';
    
    var getUsers = function(db, callback){
        db.collection('users').find({})
            .toArray(function(err, docs){
                assert.equal(err, null);
                var users = docs.map(function(userObj){
                    return userObj.name;
                });
                console.log(users);
                callback(users);
            });
    };
    
    var dbObj = {
        getUserList: function(callback){
            MongoClient.connect(url, function(err, db){
                assert.equal(null, err);
                console.log("Connected correctly to server");
                getUsers(db, function(users){
                    db.close();
                    callback(users);
                });
            }); 
        },
        validateUsername: function(username, callback){
            MongoClient.connect(url, function(err, db){
                assert.equal(null, err);
                getUsers(db, function(users){
                    callback(users);
                })
            })
        }
    };
    return dbObj;
}