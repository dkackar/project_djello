
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

    obj.update = function ( listObj,data ) {
        return Restangular.one('lists', listObj.id).get().then(function(response)  {
             console.log(data.title);
                  console.log(response);
             response.title = data.title;
             console.log(response);
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
