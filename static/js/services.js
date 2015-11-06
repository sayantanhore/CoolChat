'use strict';

coolchatApp.service('$getActiveContacts', function($http){
	return {
		getActiveContacts: function(activeContacts, username){
			
			$http.get('/getActiveContacts')
				.success(function(data, status){
					console.log("Success");
					activeContacts.noOfActiveContacts = data.activeContactList.length;
					activeContacts.contactList = data.activeContactList;
                    var usernameAt = activeContacts.contactList.indexOf(username);
                    if (usernameAt !== -1){
                        activeContacts.contactList.splice(usernameAt, 1);
                    }
					console.log(activeContacts);
					return activeContacts;
				}).
				error(function(data, status){
					console.log("Error");
					console.log(status);
					activeContacts.noOfActiveContacts = 0;
					activeContacts.contactList = [];
				});
		}
	};
});

coolchatApp.service('$ManageLoggedInUsername', function($localStorage){
    return {
        setUsername: function(username){
            $localStorage.username = username;
        },
        getUsername: function(){
            return $localStorage.username;
        }
    }
});

coolchatApp.service('$validateContact', function($http, $ManageLoggedInUsername){
    return {
        validateContact: function(username, callback){
            $http.get('/validateUsername', {
                params: {
                    username: username
                }
            })
            .success(function(data, status){
                console.log(status);
                if(data.usernameIsValid === true){
                    console.log("Username " + username + " is valid");
                    //$ManageLoggedInUsername.setUsername(username);
                    callback(username);
                }
                else{
                    console.log(status);
                    console.log("Username " + username + " is not valid");
                }
            })
            .error(function(data, status){
                console.log("Username " + username + " is not valid");
				console.log(status);
            });
        }
    }
});