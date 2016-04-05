djelloApp.factory('cardService', ['Restangular', 'listService',function(Restangular,listService){

    var obj = {};
    var currenCard;
    var cards = [];

   // I think I dont use this - remove it later after checking
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

    obj.create = function(cardObj,listObj,card_members) {
      return Restangular.all('cards').post(cardObj).then(
        function(response)  {
          listService.addCard(response,listObj);
          obj.create_members(response,card_members);
        },
        function(response)  {
           alert("Could not add your card: " + $scope.card_title);
       });
    };


    obj.create_members = function(cardObj, card_members) {
      for (var i = 0; i < card_members.length; i++) {
        Restangular.all('card_members').post({card_id: cardObj.id, user_id: card_members[i]}).then(
          function(response) {
            console.log("Added the card and members");
          },
          function(response) {
            alert("Could not add a card member");
          })
      };
    };

    obj.destroy = function(cardObj,listObj) {
      return Restangular.one("cards/" + cardObj.id).remove().then(
        function(res)  {
          alert("Deleted your card: " + cardObj.title);
        },
        function(res)  {
          alert("Could not delete your card: " + cardObj.title);
        }
      )
    };

    return obj;
}]);
