djelloApp.controller('CardCtrl', ['boardService', 'listService', 'cardService', '$scope', '$stateParams', 'Restangular' , function( boardService, listService, cardService, $scope, $stateParams, Restangular){

  $scope.card_title = "";
  $scope.card_description = "";
  $scope.card_members = "";
  $scope.currentCard = null;

  $scope.addCard = function(cardValid) {
    if (cardValid) {

      var newCard = {
        title: $scope.card_title,
        description: $scope.card_description,
        list_id: $scope.currentList.id,
        completed: false,
        priority: $scope.card_members.length
      }
      cardService.create(newCard,$scope.card_members);
    }
  }

  $scope.removeCard = function(cardObj) {

    Restangular.all('cards').post(newCard).then(
      function(response)  {

        for (var i = 0; i < $scope.card_members.length; i++) {
         Restangular.all('card_members').post({card_id: response.id, user_id: $scope.card_members[i]}).then( function() {
           })
        };
      },
      function(response)  {
         alert("Could not add your card: " + $scope.card_title);
     });
  
  }

}]);
