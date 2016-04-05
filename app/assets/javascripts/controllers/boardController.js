
djelloApp.controller('BoardCtrl', ['Restangular', 'Auth', 'boardService', 'listService', 'cardService', '$scope', '$stateParams', '$state', 'allBoards', 'currentUser', function( Restangular, Auth, boardService, listService, cardService, $scope, $stateParams, $state, allBoards, currentUser){

  $scope.currentUser = currentUser;

  //Initializes the boards array in service
  boardService.populateBoards(allBoards);

  // Initializes the scope boards arrray
  $scope.boards       = boardService.getBoards(); 
  $scope.currentBoard = boardService.getCurrentBoard();
  
  // Initializes the list array in service with current board lists
  listService.populateboardLists($scope.currentBoard);
  $scope.lists = listService.getBoardLists();

  //Should initialize ??
  $scope.cards = cardService.populateCards();

  $scope.board_title = "";

  $scope.list_title = "";
  $scope.list_board_id = $scope.currentBoard.id
 
  $scope.users = [];
 
  $scope.currentList = "";
  // $scope.card_title = "";
  // $scope.card_description = "";

  $scope.refreshBoard = function(boardIndex) {
    boardService.refreshBoard(boardIndex);
    $scope.currentBoard = boardService.getCurrentBoard();
  }

  $scope.selectBoard = function(boardObj) {
    $scope.refreshBoard(boardService.getIndexOfBoard(boardObj));
  }

  $scope.createBoard = function(boardValid) {

    var newBoard = { title: $scope.board_title, 
                     user_id: $scope.currentUser.id
                   };
   
    if (boardValid) {
      boardService.create(newBoard).then( function() {
        $scope.currentBoard = boardService.getCurrentBoard();
      });  
    }
  }

  $scope.saveBoard = function(data) {
    var saveBoard = {title: data};
   
    boardService.update($scope.currentBoard,saveBoard).then( 
      function() {
    });  
  }

  $scope.deleteBoard = function(boardObj) {
    boardService.destroy(boardObj).then(function () {
      $scope.currentBoard = boardService.getCurrentBoard();
    });
  }

  $scope.saveList = function(listObj) {
    console.log(listObj.title);
    var saveList = {title: listObj.title};
   
    listService.update(listObj,saveList).then( 
      function() {
     });  
  }

  $scope.removeList = function(listObj) {
    listService.destroy(listObj).then(function () {
      $scope.currentBoard = boardService.getCurrentBoard();
    });
  }

  $scope.addList = function(listValid) {

    if (listValid) {
      var newList = {title: $scope.list_title, 
                     board_id: $scope.currentBoard.id
                    };

      var index = boardService.getIndexOfBoard($scope.currentBoard);
      listService.create(newList).then( function() {
        console.log("Added List");
      });
    }
    $scope.list_title = "";
  }

  $scope.newCard = function(listObj) {
    cardService.populateCards;
    Restangular.all('users').getList().then(
      function(response)  {
          $scope.users = response;
          $scope.currentList = listObj;
          $state.go("board.card");
      }
    ); 
  }

  $scope.removeCard = function(cardObj,listObj) {
    console.log("Card is");
    console.log(cardObj);
    console.log(listObj);
    cardService.destroy(cardObj,listObj).then (
      function(response) {
        console.log("In response")
        console.log(response);
       listService.removeCard(cardObj,listObj);
       console.log("Removed your card!");
      },
      function(response) {
       console.log("Could not remove your card!");
      })
  }

}]);
