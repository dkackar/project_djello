
djelloApp.factory('listService', ['Restangular', function(Restangular){

    var obj = {};
    var currentList;
    var boardLists = [];

    obj.populateboardLists = function(boardObj){
      boardLists.splice(0,boardLists.length);
      for (var i = 0; i < boardObj.lists.length; i++) {
        boardLists.push(boardObj.lists[i]);
      }
    };

    obj.getBoardLists = function(){
      return boardLists;
    };

    obj.addOne = function(listObj){
      boardLists.push(listObj);
    };

    obj.create = function(listObj) {
      return Restangular.all('lists').post(listObj).then(
        function(response)  {
          obj.addOne(response);     
        },
        function(response)  {
           alert("Could not add your list: " + listObj.title);
       });
    };

    obj.addCard = function(card,list) {
     var index = boardLists.indexOf(list);
     boardLists[index].cards.push(card);
    };

    obj.removeCard = function(card,list) {
      var listIndex = boardLists.indexOf(list);
      console.log("List is " + listIndex + " cards are");
      console.log(boardLists[listIndex].cards);
      var cardIndex =  boardLists[listIndex].cards.indexOf(card);
      boardLists[listIndex].cards.splice( cardIndex,1);
    };

    obj.update = function ( listObj,data ) {
      return Restangular.one('lists', listObj.id).get().then(
        function(response)  {
          response.title = data.title;
          response.put();
        },
        function(response)  {
          alert("Could not update your list: " + listObj.title);
       });
    };

    obj.destroy = function(listObj) {
      return Restangular.one("lists/" + listObj.id).remove().then(
        function(res)  {
          boardLists.splice(boardLists.indexOf(listObj), 1);
          alert("Deleted your list: " + listObj.title);
        },
        function(res)  {
          alert("Could not delete your list: " + listObj.title);
        }
      )
    };

    return obj;
}]);
