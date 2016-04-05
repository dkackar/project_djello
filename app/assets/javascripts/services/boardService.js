
djelloApp.factory('boardService', ['Restangular', 'listService', function(Restangular,listService) {

    var obj = {};
    var currentBoard;
    var boards = [];

    obj.index = [];

    obj.getindex = function(){
        return Restangular.all("boards").getList().then(function(data){
            obj.index = data;
        });
    };

    obj.populateBoards = function(allBoards) {
       if (allBoards.length) {
          for (var i = 0; i < allBoards.length; i++) { 
            boards.push(allBoards[i]);
          }
          currentBoard = allBoards[0];
       } else {
          currentBoard = null;
       }
    }

    obj.getBoards = function() {
       return boards;
    }

    obj.getCurrentBoard = function() {
       return currentBoard;
    }

    obj.getIndexOfBoard = function(boardObj) {
      return boards.indexOf(boardObj);
    }

    obj.refreshBoard = function(boardIndex) {
      currentBoard = boards[boardIndex];
      listService.populateboardLists(currentBoard);
    }

    obj.show = function( id ) {
      return Restangular.one( "boards", id).get();
    };

    obj.create = function ( boardObj ) {
        return Restangular.all('boards').post(boardObj).then(function(response)  {
            boards.unshift(response);
            obj.refreshBoard(0);
        },
        function(response)  {
          alert("Could not add your board: " + boardObj.title);
       });
    };

    obj.update = function ( boardObj,data ) {
        return Restangular.one('boards', boardObj.id).get().then(function(response)  {
             response.title = data.title;
             console.log(response);
             response.put();
        },
        function(response)  {
          alert("Could not update your board: " + boardObj.title);
       });
    };

    obj.destroy = function (boardObj) {
      return Restangular.one("boards/" + boardObj.id).remove().then(
        function(res)  {
          index = boards.indexOf(boardObj);
          boards.splice(index, 1);
          obj.refreshBoard(0);
        },
        function(res)  {
          alert("Could not delete your board: " + boardObj.title);
      }      
    )
    };

    return obj;
}]);
