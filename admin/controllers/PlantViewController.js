app.controller('PlantViewController', function($scope, CONFIG, $routeParams, PlantsFactory, LocationFactory) {

    var param1 = $routeParams.accession_number;

    console.log(param1);

    PlantsFactory.getPlantByAccessionNumber(param1).then(function (response){
       var data = response.data.data[0];
        console.log(data);
        $scope.commonName = data.name;
        $scope.accession_number = data.accession_number;
        $scope.scientific_name = data.scientific_name;
    });


    $scope.editPlant = {
      taxonommy:false,
      culture:false,
      accesssion:false,
      hybrid:false

    }

    $scope.newPlant = {
      taxonomicRank:{
        class: '',
        tribe:'',
        authority:'',
        genus:'',
        species:'',
        variety:''
      },
      culture: {
        distribution: '',
        country: '',
        habitat:''
      },
      accesssion:{
        donatedTo:'',
        Recieved:'',
        dontationComment:''
      },
      description:'',
      hybrid:{
        parentOne:'',
        parentTwo:'',
        grex:''
      }
    }

    $scope.editTaxonomy = function() {
        if ($scope.editPlant.taxonommy == false) {
            $scope.editPlant.taxonommy = true;
        } else {
            $scope.editPlant.taxonommy = false;
        }
    }

    $scope.editCulture = function() {
      if ($scope.editPlant.culture == false) {
          $scope.editPlant.culture = true;
      } else {
          $scope.editPlant.culture = false;
      }
    }

    $scope.editAccession = function () {
      if ($scope.editPlant.accesssion == false) {
          $scope.editPlant.accesssion = true;
      } else {
          $scope.editPlant.accesssion = false;
      }
    }

    $scope.editDescription = function () {
      if ($scope.editPlant.description == false) {
          $scope.editPlant.description = true;
      } else {
          $scope.editPlant.description = false;
      }
    }

    $scope.editHybrid = function () {
      if ($scope.editPlant.hybrid == false) {
          $scope.editPlant.hybrid = true;
      } else {
          $scope.editPlant.hybrid = false;
      }
    }







});
