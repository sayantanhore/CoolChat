'use strict';

var coolchatApp = angular.module('coolchatApp', ['ui.router', 'ngStorage']);

coolchatApp.config(function($stateProvider, $urlRouterProvider){
	//$urlRouterProvider.otherwise('/home');
    
	$stateProvider
    .state('login', {
		url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
	})
    .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
    })
    .state('home.inactive-chat', {
        url: '/home/inactive-chat',
        controller: 'InactiveChatController',
        templateUrl: 'templates/inactive-chat.html'
    })
    .state('home.active-chat', {
        url: '/chat/:id',
        resolve: {
            contact: function($stateParams){
                return { name: $stateParams.id };
            }
        },
        controller: 'ActiveChatController',
        templateUrl: 'templates/active-chat.html'
    })
});

coolchatApp.run(function($ManageLoggedInUsername, $state){
    var loggedInUsername = $ManageLoggedInUsername.getUsername();
    if (loggedInUsername === null){
        console.log('No user is logged in');
        $state.go('login');
    }
    else{
        console.log("Inactive")
        $state.go('home.inactive-chat');
    }
});