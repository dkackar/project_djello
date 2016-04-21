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
      cardService.create(newCard,$scope.currentList,$scope.card_members).then(
        function(response) {
          $scope.card_description = "";
          $scope.card_title = "";
          $scope.completed = false;
          $scope.card_members = "";
        },
        function(response) {
          alert("Error in add your card!")
        })
    }
  }

}]);
