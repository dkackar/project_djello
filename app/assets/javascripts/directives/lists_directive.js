djelloApp.directive('showList', [ function() {
  // console.log('stock display directive');
  return def = {
    restrict: 'AE',
    scope: {
      list: '=',
      removeList: '&',
      addCard: '&',
      newCard: '&',
      removeCard: '&',
      onaftersave: '&',
    },
    templateUrl: 'templates/directives/listLayout.html'
  };
}]);
