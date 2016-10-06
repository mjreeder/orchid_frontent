app.controller('PopUpViewController', function(CONFIG, $scope, $location, $rootScope, BloomingFactory, SprayedFactory, PottingFactory, HealthFactory, Bloom_CommentFactory, TagFactory){

    $scope.plant = {};
    $scope.health_condition = "";

    $scope.$on('current-plant', function(event, data){
      $scope.plant = data;
      concatObjects(data, 'plant');
      init();
    })

    $scope.today = new Date();

    $scope.submitPopUp = function(){
      handleBloom();
      handleBloomingComment();
      handleSprayed();
      handlePotting();
      handleHealth();
      handleTag();
    }

    var handleBloom = function() {
      var data = prepareForFactory('blooming');
      if(objectIsNew('blooming')){
        BloomingFactory.createBloom(data).then(function(){})
      } else {
        BloomingFactory.updateBloom(data).then(function(){})
      }
    }

    var handleBloomingComment = function(){
      var data = prepareForFactory('blooming_comment');
      if(objectIsNew('blooming_comment')){
        Bloom_CommentFactory.createBloom_Comment(data).then(function(){})
      } else {
        Bloom_CommentFactory.updateBloom(data).then(function(){})
      }
    }

    var handleSprayed = function() {
      var data = prepareForFactory('sprayed');
      if(objectIsNew('sprayed')){
        SprayedFactory.createSplit(data).then(function(){})
      } else {
        SprayedFactory.updateSplit(data).then(function(){})
      }
    }

    var handlePotting = function(){
      var data = prepareForFactory('potting');
      if(objectIsNew('potting')){
        PottingFactory.createPest(data).then(function(){})
      } else {
        PottingFactory.updatePotting(data).then(function(){})
      }
    }

    var handleHealth = function(){
      var data = prepareForFactory('health');
      if(objectIsNew('health')){
        HealthFactory.createHealth(data).then(function(){});
      } else {
        HealthFactory.editHealth(data).then(function(){})
      }
    }

    var handleTag = function(){
      var data = prepareForFactory('flag');
      if(objectIsNew('flag')){
        TagFactory.createTag(data).then(function(){})
      } else {
        TagFactory.updateTag(data).then(function(){})
      }
    }

    var prepareForFactory = function(field){
      var data = extractData(field);
      if(objectIsNew('plant')){
        data.plantId = plant.id;
      }
      return data;
    }

    var objectIsNew = function(object){
      if($scope[object + '_id']){
        return false;
      } else {
        return true;
      }
    }

    $scope.closePopUp = function(){
      $rootScope.$broadcast('popup-close', true);
    }

    //These requests are async, but since they do not equire each other's data we will execute them concurently
    var init = function(){
      if(!objectIsNew('plant')){
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
        TagFactory.getPestByPlantID($scope.plant.id).then(function(data){
          concatObjects(data, 'tag');
        })

      }
    }

    //Add data to scope object
    var concatObjects = function(data, prefix){
      for(key in data){
        if(data.hasOwnProperty(key)){
          $scope[prefix + '_' + key] = data[key];
        }
      }
    }

    //get all items which have the current prefix in the scope.data object
    var extractData = function(prefix){
      var data = $scope;
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
