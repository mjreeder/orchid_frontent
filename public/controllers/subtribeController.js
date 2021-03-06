orchidApp.controller('subtribeController', function($scope, $state, $stateParams, PlantsFactory, PhotoFactory, $error) {

    $scope.collectionOfItems = [];

    $scope.moveTo = function(item){
        $state.go('specificSubTribe', {tribe: item.name});
    };

    $scope.dynamicSidebarContent = {
        specialCollections : [],
        subtribes: []
    };

    var init = function() {
        $scope.dynamicSidebarContent.specialCollections; //= factory call to pull in collections; TODO
        $scope.dynamicSidebarContent.subtribes; //= factory call to pull in subtribes; TODO
    };

    PlantsFactory.topFiveCollectionsAndSubtribes()
      .then(function (success) {
        $scope.dynamicSidebarContent.specialCollections = success.collections;
        $scope.dynamicSidebarContent.subtribes = success.subtribes;
        $scope.collectionOfItems = success.subtribes;

        $scope.continueLoad();

    }, function (error) {
        $error.handle(error);
    });

    var pictureArray = [];
    var syncArray = [];

    $scope.continueLoad = function() {

        for (var i = 0; i < $scope.collectionOfItems.length; i++) {

            var prom = new Promise(function (resolve, reject) {
                PhotoFactory.onePhotoTribe($scope.collectionOfItems[i].tribe_name).then(function (response) {
                    resolve(response.data.data);
                }, function(error){
                  reject(error);
                });
            });

            pictureArray.push(prom);
            syncArray.push($scope.collectionOfItems[i].tribe_name);
        }


        Promise.all(pictureArray).then(function (success) {

            for (var i = 0; i < $scope.collectionOfItems.length; i++) {
                $scope.collectionOfItems[i].hasPicture = false;
                $scope.collectionOfItems[i].display_name = $scope.collectionOfItems[i].subtribe_name;
            }

            $scope.$apply();

            for (var i = 0; i < success.length; i++) {
                var countryID = syncArray[i];
                var data = success[i];
                if (data.length == 0) {
                } else {
                    for (var t = 0; t < $scope.collectionOfItems.length; t++) {
                        if ($scope.collectionOfItems[t].name == countryID) {
                            $scope.collectionOfItems[t].picture = data[0].url;
                            $scope.collectionOfItems[t].hasPicture = true;
                        }
                    }
                }
            }

        }, function (error) {
          $error.handle(error);
        });
    }



});