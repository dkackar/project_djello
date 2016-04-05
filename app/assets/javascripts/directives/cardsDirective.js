
djelloApp.directive('showCard', [ function() {
  // console.log('stock display directive');
  return {
    restrict: 'AE',
    scope: {
      card: '=',
      removeCard: '&',
    },
    templateUrl: 'templates/directives/cardLayout.html'
  };
}]);
