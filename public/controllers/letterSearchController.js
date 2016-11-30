var orchidApp = angular.module('orchidApp');
orchidApp.controller('letterSearchController', ['$scope','$stateParams', 'PlantsFactory', function($scope, $stateParams, PlantsFactory) {
    $scope.letter = $stateParams.letter;
    $scope.loading = true;
    $scope.plants = [];

    PlantsFactory.getPaginatedPlants($scope.letter, 1).success(function(response) {
        $scope.plants = response.data;
        console.log("SUCCESS: ", $scope.plants);
        $scope.loading = false;
    }).error(function(response) {
        console.log("ERROR: ", response);
        $scope.loading = false;
    });


}]);
