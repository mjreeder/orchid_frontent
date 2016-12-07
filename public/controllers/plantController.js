orchidApp.controller('plantController', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory) {

    $scope.number = $stateParams.accession_number;

    $scope.noPlant = false;
    $scope.plantInformation = "";
    $scope.photoInformation = [];
    $scope.url = "";
    $scope.plant = {};
    $scope.haveProfilePicture = false;

    $scope.allimagesURL =[];

    $scope.profilePicture = "";


    console.log($scope.NAMEOFPAGE);
        PlantsFactory.getPlantByAccessionNumber($scope.number).then(function (response) {
            var data = response.data.data[0];
            $scope.NAMEOFPAGE = data.name;
            if (response.data.data[0] == false) {
                $scope.noPlant = false;
                $location.path('/404');
            } else {

                $scope.noPlant = true;
                $scope.plantInformation = response.data.data[0];

                $scope.createPlant();
            }
        }, function (error) {

            $location.path('/404');
        });


    $scope.createPlant = function(){
        console.log($scope.plantInformation);
        $scope.plant = {
            'id': $scope.plantInformation.id,

            'class_name' : $scope.plantInformation.class_name,
            'species_name' : $scope.plantInformation.species_name,
            'variety_name' : $scope.plantInformation.variety_name,
            'subtribe_name' : $scope.plantInformation.subtribe_name,
            'tribe_name' : $scope.plantInformation.tribe_name,
            'genus_name' : $scope.plantInformation.genus_name,

            'parent_one' : $scope.plantInformation.parent_one,
            'parent_two' : $scope.plantInformation.parent_two,
            'grex_status' : $scope.plantInformation.grex_status,
            'hybrid_status' : $scope.plantInformation.hybrid_status,

            'description' : $scope.plantInformation.description,
            'culture' : $scope.plantInformation.culture
        };

        //var data = response.data.data;
        //resolve(data);
        var promArray = [];

        var prom = new Promise(function(resolve, reject) {
            PhotoFactory.getPhotosByPlantID($scope.plant.id).then(function (response){
                var data = response.data.data;
                resolve(data);
            });
        });

        promArray.push(prom);

        Promise.all(promArray).then(function (success) {

            var data= success[0];

            $scope.allimagesURL = [];
            console.log(data.length);
            console.log($scope.allimagesURL.length);

            var r = 0;
            for(r = 0; r < data.length; r++){
                $scope.allimagesURL.push(data[r].url);
            }

            var foundProfilePicture = false;
            for(var i = 0;i < $scope.allimagesURL.length; i++){
                console.log($scope.allimagesURL[i]);
                if($scope.allimagesURL[i].type == "profile"){
                    $scope.profilePicture = $scope.allimagesURL[i];
                    foundProfilePicture = faslse = true;
                    $scope.haveProfilePicture = true;
                }
            }
            if(foundProfilePicture == false){
                for(var i = 0;i < $scope.allimagesURL.length; i++){
                    $scope.profilePicture = $scope.allimagesURL[i];
                    $scope.haveProfilePicture = true;
                    break;
                }
            }
            $scope.$apply();

        }, function (error) {

        });





        for(var i = 0; i < $scope.photoInformation.length; i++){
            console.log($scope.photoInformation[i].url);
            $scope.allimagesURL.add($scope.photoInformation[i].url);
        }

        console.log($scope.allimagesURL.length);
        for(var i = 0; i < $scope.allimagesURL.length; i++){
           console.log($scope.allimagesURL[0] + "asdfasdfads");

        }
        $scope.oneURL = $scope.allimagesURL[0];
        $scope.$apply();
    };

    $scope.goBack = function() {
        window.history.back();
    }

    var myIndex = 0;



    console.log("WE ARE AT THE PLANT VIEW CONTROLLER");


});