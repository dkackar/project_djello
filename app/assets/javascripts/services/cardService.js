djelloApp.factory('cardService', ['Restangular', function(Restangular){

    var obj = {};
    var currenCard;
    var cards = [];

    obj.populateCards = function(listObj){
      if (listObj && listObj.lists.length) { 
        cards.splice(0,cards.length);
        for (var i = 0; i < listObj.lists.length; i++) {
          cards.push(cardObj.lists[i]);
        }
      } else {
        cards.splice(0,cards.length);
      }
    };

    obj.getBoardLists = function(){
      return boardLists;
    };

    obj.addOne = function(cardObj){
      cards.push(cardObj);
    };

    obj.create = function(cardObj, card_members) {
      return Restangular.all('cards').post(cardObj).then(
        function(response)  {
          obj.addOne(response);
          for (var i = 0; i < card_members.length; i++) {
             Restangular.all('card_members').post({card_id: response.id, user_id: card_members[i]}).then(  function(response) {
                 alert("Added the card and members");
               },
               function(response) {
                 alert("Could not add the card members");
               })
          };
        },
        function(response)  {
           alert("Could not add your card: " + $scope.card_title);
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
