'use strict';

coolchatApp.controller('MenuController', ['$scope', '$state', '$ManageLoggedInUsername', '$socket', function($scope, $state, $ManageLoggedInUsername, $socket){
    $scope.logout = function(){
        $socket.emitLogout({
            username: $ManageLoggedInUsername.getUsername()
        });
        $ManageLoggedInUsername.setUsername(null);
        $state.go('login');
    }
}]);

coolchatApp.controller('ShowActiveContactListController', ['$scope', '$state', '$getActiveContacts', '$ManageLoggedInUsername', function($scope, $state, $getActiveContacts, $ManageLoggedInUsername){
	$scope.activeContacts = {};
	$getActiveContacts.getActiveContacts($scope.activeContacts, $ManageLoggedInUsername.getUsername());
}]);

coolchatApp.controller('LoginController', ['$scope', '$state', '$validateContact', '$ManageLoggedInUsername', '$socket', function($scope, $state, $validateContact, $ManageLoggedInUsername, $socket){
    $scope.validateUser = function(){
        $validateContact.validateContact($scope.username, function(username){
            $ManageLoggedInUsername.setUsername(username);
            $socket.emitLogin({
                username: $ManageLoggedInUsername.getUsername()
            });
            $state.go('home.inactive-chat');
        });
    };
}]);

coolchatApp.controller('InactiveChatController', ['$scope', '$ManageLoggedInUsername', function($scope, $ManageLoggedInUsername){
    $scope.loggedInUsername = $ManageLoggedInUsername.getUsername();
}]);

coolchatApp.controller('ActiveChatController', ['$scope', 'contact', '$ManageLoggedInUsername', '$socket',function($scope, contact, $ManageLoggedInUsername, $socket){
    $scope.loggedInUsername = $ManageLoggedInUsername.getUsername();
    $scope.contact = contact;
    
    $socket.emitHandshake({
        sendFrom: $ManageLoggedInUsername.getUsername(),
        sendTo: 'server',
        askingFor: $scope.contact.name,
        msgType: 'HANDSHAKE'
    });
    
    $scope.sendMsg = function(){
        var newMsg = $('div#text-entry-view').html();
        var existingMsg = $("div#msg-view").html();
        console.log(existingMsg);
        console.log(newMsg);
        var newHtml = existingMsg + "<p class = 'msg'>" + newMsg + "</p>";
        $("div#msg-view").html(newHtml);
        $("div#text-entry-view").html("");
        
        var msgToEmit = {
            sendFrom: $scope.loggedInUsername,
            sendTo: $scope.contact.name,
            msg: newMsg
        };
        $socket.emitChat(msgToEmit);
    }
}]);