app.controller('PopUpViewController', function(CONFIG, $scope, $location, $rootScope, BloomingFactory, SprayedFactory, PottingFactory, HealthFactory){

    $scope.plant = {};
    $scope.health_condition = "";
    $scope.data = {};

    $scope.$on('current-plant', function(event, data){
      $scope.plant = data;
      concatObjects(data, 'plant');
      init();
    })

    $scope.today = new Date();

    $scope.submitPopUp = function(){
      console.log(extractData('plant'));
    }

    var handleBloom = function() {

    }

    $scope.closePopUp = function(){
      console.log($scope.data);
      $rootScope.$broadcast('popup-close', true);
    }

    //These requests are async, but since they do not equire each other's data we will execute them concurently
    var init = function(){
      BloomingFactory.getBloomByPlantID($scope.plant.id).then(function(data){
        concatObjects(data, 'blooming');
      })
      SprayedFactory.getPestByPlantID($scope.plant.id).then(function(data){
        concatObjects(data, 'sprayed');
      })
      PottingFactory.getBloomByPlantID($scope.plant.id).then(function(data){
        concatObjects(data, 'potting');
      })
      HealthFactory.getHealthBtPlantID($scope.plant.id).then(function(data){
        concatObjects(data, 'health');
      })
    }

    //Add data to scope object
    var concatObjects = function(data, prefix){
      for(key in data){
        if(data.hasOwnProperty(key)){
          $scope.data[prefix + '_' + key] = data[key];
        }
      }
    }

    //get all items which have the current prefix in the scope.data object
    var extractData = function(prefix){
      var data = $scope.data;
      var temp = {};
      for(key in data){
        if(data.hasOwnProperty(key)){
          if(stringContains(key, prefix)){
            var tempKey = removePrefix(key);
            temp[tempKey] = data[key];
          }
        }
      }
      return temp;
    }

    var stringContains = function(string, prefix){
      if(string.indexOf(prefix) !== -1){
        return true;
      } else {
        return false;
      }
    }

    var removePrefix = function(string){
      var index = string.indexOf('_');
      return string.substring(index + 1, string.length);
    }

});
