'use strict';

coolchatApp.controller('MenuController', ['$scope', '$state', '$ManageLoggedInUsername', function($scope, $state, $ManageLoggedInUsername){
    $scope.logout = function(){
        $ManageLoggedInUsername.setUsername(null);
        $state.go('login');
    }
}]);

coolchatApp.controller('ShowActiveContactListController', ['$scope', '$state', '$getActiveContacts', '$ManageLoggedInUsername', function($scope, $state, $getActiveContacts, $ManageLoggedInUsername){
	$scope.activeContacts = {};
	$getActiveContacts.getActiveContacts($scope.activeContacts, $ManageLoggedInUsername.getUsername());
}]);

coolchatApp.controller('LoginController', ['$scope', '$state', '$validateContact', '$ManageLoggedInUsername', function($scope, $state, $validateContact, $ManageLoggedInUsername){
    $scope.validateUser = function(){
        $validateContact.validateContact($scope.username, function(username){
            $ManageLoggedInUsername.setUsername(username);
            $state.go('home.inactive-chat');
        });
    };
}]);

coolchatApp.controller('InactiveChatController', ['$scope', '$ManageLoggedInUsername', function($scope, $ManageLoggedInUsername){
    $scope.loggedInUsername = $ManageLoggedInUsername.getUsername();
}]);

coolchatApp.controller('ActiveChatController', ['$scope', 'contact', '$ManageLoggedInUsername', function($scope, contact, $ManageLoggedInUsername){
    $scope.loggedInUsername = $ManageLoggedInUsername.getUsername();
    $scope.contact = contact;
    $scope.messages = ['wwew', 'sdsds'];
}]);