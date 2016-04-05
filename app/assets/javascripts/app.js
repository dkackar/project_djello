
var djelloApp = angular.module("djelloApp", ['ui.router', 'Devise', 'restangular', 'xeditable', 'ngDragDrop'] );

djelloApp.config(['$urlRouterProvider', '$stateProvider', 'RestangularProvider', 'AuthProvider',
  function($urlRouterProvider, $stateProvider, RestangularProvider, AuthProvider){

     RestangularProvider.setBaseUrl('/api/v1');
     RestangularProvider.setRequestSuffix('.json');
     RestangularProvider.setDefaultHttpFields({
         "content-type": "application/json"
     });


   $stateProvider
      .state('board', {
        url: '/board',
        templateUrl: '/templates/boardLayout.html',
        controller: 'BoardCtrl',
        resolve: {
          currentUser: ['Auth', function(Auth) {
          return Auth.currentUser();
          }],
          allBoards: ['Restangular', function(Restangular){
            return Restangular.all('boards').getList();
          }]
        }
      })
      .state('board.card', {
        url: '/card',
        templateUrl: '/templates/cardModalLayout.html',
        controller: 'CardCtrl',
        params: {
          list: null
        },
        // resolve: {
        //   allCards: ['Restangular', function(Restangular){
        //     return Restangular.all('cardmembers').getList();
        //   }]
        // }
      })
     $urlRouterProvider.otherwise('/board');

 }]);

djelloApp.run(function($rootScope, $location, Auth){
 $rootScope.$on("$stateChangeError", console.log.bind(console));
  });

