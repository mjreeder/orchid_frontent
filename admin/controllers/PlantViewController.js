app.controller('PlantViewController', function($window, $scope, UserFactory, CONFIG, countryFactory, $rootScope, $routeParams, PlantsFactory, LocationFactory, classificationLinkFactory, bloomService, TagFactory, $location, PlantCountryLinkFactory, PhotoFactory, splitFactory, BloomingFactory, SprayedFactory, PottingFactory, HealthFactory, VerifiedFactory, $anchorScroll, SpecialCollectionsFactory, $route, taxonommyFactory, PestFactory) {


    $scope.iFrameURL = location.origin +"/2016/orchid_site/utilities/file_frame.php?session_key=" +$rootScope.userSessionKey +"&session_id=" +$rootScope.userSessionId +"&url_section=blah";

    var param1 = $routeParams.accession_number;

    $scope.PlantCountryNames = [];
    $scope.Tables = [];
    //$scope.createNew = false;
    $scope.createNew = false;
    $scope.noProfile = true;

    $scope.newAcceessionNumer = 0;

    $scope.allCountires = [];
    $scope.plant_id_url = [];

    $scope.theSelectedProfilePicture = [];

    $scope.habitatPictures = [];
    $scope.otherPictures = [];
    $scope.deletedPictures = [];

    $scope.newHabitatList = [];
    $scope.newOtherList = [];

    $scope.similarPhotos = [];

    $scope.verifiedObject = {};
    $scope.verifiedDate = "";
    $scope.splits = [];

    //View More Toggles
    $scope.bloomingMoreShow = true;
    $scope.sprayedMoreShow = true;
    $scope.repottedMoreShow = true;
    $scope.healthMoreShow = true;


    //COLLECTIONS
    $scope.allCollections = [];
    $scope.selectedCollectionName = "";

    $scope.selectedCountry = "";


    $scope.plantLocation = "";

    $scope.collectionWarning = false;
    $scope.selectedSpecialCollectionDeletedName = "";

    $scope.OGPhotos = [];

    //boolean to see if there is a verifed object
    $scope.isVerified;


    SpecialCollectionsFactory.getAllSpecialCollections().then(function(response){
        var responseAllCollections = response.data.data;
        for(var i = 0; i < responseAllCollections.length; i++){
            $scope.allCollections.push(responseAllCollections[i]);
        }
    });

    countryFactory.getCountries().then(function(response) {
        var countryNames = response.data.data;

        for (var i = 0; i < countryNames.length; i++) {
            $scope.allCountires.push(countryNames[i]);
        }

    });

    var newCountrySelections = [];
    var newCountryAllSelections = [];

    $scope.origianlSelectedCountries = [];



    $scope.selectedCountry;
    $scope.deselectedCountry;

    $scope.selectedCountries = [];

    $scope.updateBloom = false;

    $scope.addBloom = false;

    $scope.updateSpray = false;

    $scope.addSpray = false;

    $scope.addRepot = false;

    $scope.updateRepot = false;

    $scope.addHealth = false;

    $scope.updateHealth = false;


    /*****************/
    /* BLOOMING CRUD */
    /*****************/
    $scope.updateBloomFunction = function(){

        var updateData = {
            'plant_id' : $scope.plant.id,
            'end_date': $scope.updateBloomEndDate,
            'start_date' : $scope.updateBloomStartDate,
            'id' : $scope.updateBloomid
        };

        BloomingFactory.updateBloom(updateData).then(function(response){
            window.alert("Update Bloom");
            $route.reload();
        }, function (error){
            console.log(error);
            window.alert("Nothing was selected. Try again. If continues, log out and log in.");
        })
    };

    $scope.updateGenericBloom = function(data){

        if(data == "N/A" || data == "" || data == undefined){
            window.alert("Please Select Time range");
        } else {
            if ($scope.addBloom == true) {
                $scope.addBloom = false;
            }

            if($scope.updateBloom == false){
                $scope.updateBloom = true;
            } else {
                $scope.updateBloom = false;

            }


            var dataString = data.substring(0, 10);

            for (var i = 0; i < $scope.allBloomData.length; i++) {
                if (dataString == $scope.allBloomData[i].start_date) {
                    $scope.updateBloomid = $scope.allBloomData[i].id;

                    $scope.updateBloomStartDate = createDateFromString($scope.allBloomData[i].start_date);
                    $scope.updateBloomEndDate = createDateFromString($scope.allBloomData[i].end_date);
                }
            }
        }
    };


    $scope.deleteBloom = function(){
        //this is the function to delete a bloom
        var deleteData = {
            'id': $scope.updateBloomid
        }

        BloomingFactory.deleteBloom(deleteData).then(function(response){
            window.alert("Deleted Bloom");
            $scope.updateBloomStartDate = "";
            $scope.updateBloomEndDate = "";
            $route.reload();

        }, function (error){
            console.log(error);
            window.alert("Nothing was selected. Try again. If continues, log out and log in.");
        })
    }

    $scope.addGenericBloom = function(){


        if($scope.addBloom == true){
            $scope.addBloom = false;

        } else {
            $scope.addBloom = true;
        }

    };

    $scope.saveNewBloom = function(data){
        if(data == undefined){
            window.alert("Please enter values");
        } else {
            var createGenericBloom = {
                'start_date': data.addStartDate,
                'end_date' : data.addStartEnd,
                'plantId' : $scope.plant.id
            }
            BloomingFactory.createGenericBloom(createGenericBloom).then(function(response){
                window.alert("Addition Successful");
                $scope.updateBloomEndDate = "";
                $scope.updateBloomStartDate = "";
                $scope.add.addStartDate = "";
                $scope.add.addStartEnd = "";
                $route.reload();


            }, function (error){
                console.log(error);
                window.alert("there is an alert");
            })
        }

    };

    /*****************/
    /*   PEST CRUD   */
    /*****************/

    $scope.updatePestFunction = function(){

        var updateData = {
            'plantId' : $scope.plant.id,
            'timestamp': $scope.updatePestDate,
            'id' : $scope.updateSprayedID,
            'note' : $scope.updatePestNote
        };
        SprayedFactory.updateSplit(updateData).then(function (response){
            window.alert('Update Spray');
            $route.reload();

        }, function (error){
            window.alert("Error. Please log out and try again");
        });
    };

    $scope.updateGenericPest = function(data){

        if(data == "N/A" || data == "" || data == undefined){
            window.alert("Please Select Time range");
            $scope.addSpray = false;
        } else {

            if ($scope.addSpray == true) {
                $scope.addSpray = false;
            } else {
            }
            if($scope.updateSpray == true){
                $scope.updateSpray = false;
            } else {
                $scope.updateSpray = true;
            }

            var dataString = data;

            for (var i = 0; i < $scope.allSprayedData.length; i++) {

                if (dataString == $scope.allSprayedData[i].timestamp) {
                    $scope.updateSprayedID = $scope.allSprayedData[i].id;
                    $scope.updatePestDate = createDateFromString($scope.allSprayedData[i].timestamp);
                    $scope.updatePestNote = $scope.allSprayedData[i].note;
                }
            }
        }
    };

    $scope.deletePest = function(){
        //this is the function to delete a bloom
        var deleteData = {
            'id': $scope.updateSprayedID
        };

        SprayedFactory.deleteSprayed(deleteData).then(function (response){
            window.alert("Spray Deleted");
            $route.reload();
        }, function (error){
            window.alert("Error. Please log out and try again");
        });
    };

    $scope.addGenericPest = function(){
        if($scope.addSpray == false){
            $scope.addSpray = true;
        } else {
            $scope.addSpray = false;
        }
    };

    $scope.saveNewSpray = function(data){

        if(data == undefined){
            window.alert("Please enter values");
        } else {
            if(data.note == undefined){
                data.note = "";
            }
            var createGenericPest = {
                'timestamp': data.timestamp,
                'note' : data.note,
                'plantId' : $scope.plant.id
            };

            SprayedFactory.createSplit(createGenericPest).then(function (response){
                window.alert("Created Spray");
                $route.reload();
            }, function (response){
                window.alert("Error. Please log out and try again");

            });
        }

    };

    /*****************/
    /*   REPOT CRUD  */
    /*****************/

    $scope.updateRepotFunction = function(){

        var updateData = {
            'plantId' : $scope.plant.id,
            'timestamp': $scope.updateRepotDate,
            'id' : $scope.updateRepotID
        };

        PottingFactory.updatePotting(updateData).then(function (response){
            window.alert('Update Complete');
            $route.reload();
        }, function (error){
            window.alert("Error. Please log out and try again");

        });
    };

    $scope.updateGenericRepot = function(data){
        if(data == "N/A" || data == "" || data == undefined){
            window.alert("Please Select Time range");
            $scope.addRepot = false;

        } else {

            if ($scope.addRepot == true) {
                $scope.addRepot = false;
            }else {

            }
            if($scope.updateRepot == true){
                $scope.updateRepot = false;
            }else {
                $scope.updateRepot = true;

            }

            var dataString = data;

            for (var i = 0; i < $scope.allRepotData.length; i++) {
                if (dataString == $scope.allRepotData[i].timestamp) {
                    $scope.updateRepotID = $scope.allRepotData[i].id;
                    $scope.updateRepotDate = createDateFromString($scope.allRepotData[i].timestamp);
                }
            }
        }
    };

    $scope.deletePotting = function(){
        //this is the function to delete a bloom
        var deleteData = {
            'id': $scope.updateRepotID
        };

        PottingFactory.deletePotting(deleteData).then(function (response){
            window.alert("Repot Deleted");
            $route.reload();
        }, function(error){
            window.alert("Error. Please log out and try again");
        });

    };

    $scope.addGenericPotting = function(){
        if($scope.addRepot == false){
            $scope.addRepot = true;
        } else {
            $scope.addRepot = false;
        }
        $scope.updateRepot = false;
        $scope.potting = "";
    };

    $scope.saveNewRepotting = function(data){

        var createGenericRepot = {
            'timestamp': data.timestamp,
            'plantId' : $scope.plant.id
        };

        PottingFactory.createPest(createGenericRepot).then(function (response){
            window.alert("Created new repot");
            $route.reload();
        }, function (error){
            window.alert("Error. Please log out and try again");
        });
    };

    /*****************/
    /*   HEALTH CRUD  */
    /*****************/

    $scope.updateHealthFunction = function(){

        var updateData = {
            'plant_id' : $scope.plant.id,
            'timestamp': $scope.updateHealthDate,
            'id' : $scope.updateHealthID,
            'score' : $scope.health_score,
            'comment' : $scope.updateHealthComment
        };

        HealthFactory.editHealth(updateData).then(function (response){
            window.alert('Update Health Complete');
            $route.reload();
        }, function (response){
            window.alert("Error. Please log out and try again");
        });
    };

    $scope.updateGenericHealth = function(data){
        if(data == "N/A" || data == "" || data == undefined){
            window.alert("Please Select Time range");
            $scope.addHealth = false;

        } else {

            if ($scope.addHealth == true) {
                $scope.addHealth = false;
            }else {

            }
            if($scope.updateHealth == true){
                $scope.updateHealth = false;
            }else {
                $scope.updateHealth = true;

            }




            var dataString = data;

            for (var i = 0; i < $scope.allHealthData.length; i++) {
                if (dataString == $scope.allHealthData[i].timestamp) {
                    $scope.updateHealthID = $scope.allHealthData[i].id;

                    $scope.updateHealthDate = createDateFromString($scope.allHealthData[i].timestamp);
                    $scope.health_score = $scope.allHealthData[i].score;
                    $scope.updateHealthComment = $scope.allHealthData[i].comment;
                }
            }
        }
    };

    $scope.deleteHealth = function(){
        //this is the function to delete a bloom
        var deleteData = {
            'id': $scope.updateHealthID
        };

        HealthFactory.deleteHealth(deleteData).then(function (response){
            window.alert("Health Deleted");
            $route.reload();
        }, function (error){
            window.alert("Error. Please log out and try again");
        });
    };

    $scope.addGenericHealth = function(){
        if($scope.addHealth == false){
            $scope.addHealth = true;
        } else {
            $scope.addHealth = false;
        }
        $scope.updateHealth = false;
        $scope.health = "";

    };

    $scope.saveNewHealth = function(data){
        if(data == undefined || $scope.health_score == undefined || data.timestamp == undefined){
            window.alert("Please enter data");
        } else {
            if(data.comment == undefined){
                data.comment = "";
            }
            var createGenericHealth = {
                'timestamp': data.timestamp,
                'plantId': $scope.plant.id,
                'score': $scope.health_score,
                'comment': data.comment
            };

            HealthFactory.createHealth(createGenericHealth).then(function (response) {
                window.alert("Created new Health");
                $route.reload();
            }, function (error) {
                window.alert("Error. Please log out and try again");
            });
        }
    };

    $scope.updateHealthScore = function (value){
        if(value == 'poor'){
            $scope.health_score = 'poor';
        } else if (value == 'fair'){
            $scope.health_score = 'fair';
        }else if (value == 'good'){
            $scope.health_score = 'good';
        }
    }

    $scope.deletePlant = function() {
        var verifiy_accession_number = prompt("*Warning* Please enter the accession number to delete. Accession Number " + $scope.plant.accession_number , "");

        if (verifiy_accession_number == null || verifiy_accession_number != $scope.plant.accession_number) {

        } else {
            $window.alert("Plant Deleted.")
            if(verifiy_accession_number == $scope.plant.accession_number){
                PlantsFactory.inactivePlant($scope.plant.id).then(function (response) {
                    $location.path('/search');
                }, function (error) {
                    console.log("There is an when delete the plant");
                });
            }
        }
    }

    ///this is the new information

    $scope.selectCountry = function() {
        //loop over the all countries and only return those that are not the selected country
        $scope.allCountires = $scope.allCountires.filter(function(countryObject) {
            if (countryObject.name == $scope.selectedCountry) {
                $scope.selectedCountries.push(countryObject);
                newCountrySelections.push(countryObject);
            }
            return countryObject.name !== $scope.selectedCountry;
        });

        //empty out selected country
        $scope.selectedCountry = '';

        //sort the selected countries
        $scope.selectedCountries.sort(function (a, b){
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1:0;
        });
    };

    $scope.deselectCountryFunction = function(country){
        $scope.selectedCountries = $scope.selectedCountries.filter(function (countryObject){

            if (countryObject.name == $scope.deselectedCountry){
                $scope.allCountires.push(countryObject);
                newCountryAllSelections.push(countryObject);
            }

            return countryObject.name !== $scope.deselectedCountry;
        });
        $scope.deselectedCountry = '';

        $scope.allCountires.sort(function (a, b){
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1:0;
        });
    }

    PlantsFactory.getPlantByAccessionNumber(param1).then(function(response) {
        var plantData = response.data.data[0];
        var plant_id = response.data.data[0].id;

        Country = [];

        LocationFactory.getTableLocations().then(function(response) {
            var tableData = response.data.data;
            for (i = 0; i < tableData.length; i++) {
                $scope.Tables.push(tableData[i]);
            }
            $scope.Tables = _.sortBy($scope.Tables, ['name']);

        });

        newLink = [];

        $scope.plant = {
            id: plantData.id,
            accession_number: plantData.accession_number,
            name: plantData.name,
            authority: plantData.authority,
            distribution: plantData.distribution,
            habitat: plantData.habitat,
            culture: plantData.culture,
            donation: plantData.donation,
            date_recieved: createDateFromString(plantData.date_received),
            received_from: plantData.received_from,
            description: plantData.description,
            username: plantData.username,
            inactive: plantData.inactive,
            inactive_date: createDateFromString(plantData.inactive_date),
            inactive_comment: plantData.inactive_comment,
            size: plantData.size,
            value: plantData.value,
            parent_one: plantData.parent_one,
            parent_two: plantData.parent_two,
            grex_status: plantData.grex_status,
            hybrid_status: plantData.status,
            hybrid_comment: plantData.hybrid_comment,
            dead: plantData.dead,
            scientific_name: plantData.scientific_name,
            location_id: plantData.location_id,
            special_collections_id: plantData.special_collections_id,
            donation_comment: plantData.donation_comment,
            origin_comment: plantData.origin_comment,
            last_varified: createDateFromString(plantData.last_varified),
            is_donation: plantData.is_donation,
            class: plantData.class,
            tribe: plantData.tribe,
            subtribe: plantData.subtribe,
            genus: plantData.genus,
            species: plantData.species,
            variety: plantData.variety,
            phylum: plantData.phylum,
            family: plantData.family,
            image: "",
            dead_date: createDateFromString(plantData.dead_date),
            general_note: plantData.general_note,
            countries_note: plantData.countries_note
        };

        //assigning the table to plant.
        $scope.plantLocation = plantData.location;

        $scope.originalAccessionNumber = $scope.plant.accession_number;

        var speciesName  = $scope.plant.species;
        var id = $scope.plant.id;

        var promArray1 = [];

        var prom = new Promise(function(resolve, reject) {
            SpecialCollectionsFactory.getSpecificSpecialCollectionID(id).then(function(response){
                console.log(response.data.data);
                resolve(response.data.data);
            });

        });

        var prom2 = new Promise(function(resolve, reject) {
           BloomingFactory.getAllBloomByPlantID(id).then(function (response){
               console.log(response.data.data);

               resolve(response.data.data);
           })

        });

        var prom3 = new Promise(function(resolve, reject) {
            SprayedFactory.getAllSpraysFromPlantID($scope.plant.id).then(function (response){
                resolve(response.data.data);
            });

        });

        var prom4 = new Promise(function(resolve, reject) {
            PottingFactory.getAllPottingFromPlantID($scope.plant.id).then(function (response){
                resolve(response.data.data);
            });
        });

        var prom5 = new Promise(function(resolve, reject) {
            HealthFactory.getAllHealthByPlantID($scope.plant.id).then(function (response){
               resolve(response.data.data);
            });
        });



        promArray1.push(prom);
        promArray1.push(prom2);
        promArray1.push(prom3);
        promArray1.push(prom4);
        promArray1.push(prom5);


        Promise.all(promArray1).then(function (success) {
            var specialCollectionData = success[0];

            $scope.plant.special_collections_id = specialCollectionData[0].special_collections_id;
            $scope.loadSpecialCollection( $scope.plant.special_collections_id);

            var bloom_data = success[1];

            $scope.allBloomData = bloom_data;

            $scope.allSprayedData = success[2];

            if($scope.allSprayedData[0] == false){
                $scope.allSprayedData = [];
            }

            $scope.allRepotData = success[3];

            $scope.allHealthData = success[4];

        }, function (error) {
            console.log(error);
        });

        VerifiedFactory.getLastVerifiedDate(id).then(function (response){
            if(response.data.data.length == 0){
                $scope.isVerified = false;
            }else {
                $scope.isVerified = true;
                var data = response.data.data;
                $scope.verifiedObject = data[0];
                $scope.verifiedDate = createDateFromString(data[0].verified_date);
            }
        });

        var bloomPage = 0;
        $scope.blooms = [];
        $scope.bloomYears = [];
        $scope.getMoreBlooms = function() {
          bloomPage++;
          BloomingFactory.getBloomByPlantID($scope.plant.id, bloomPage).then(function(response) {
            var data = response.data.data;
            if (data.length < 5) {
              $scope.bloomingMoreShow = false;
            }
            for (var i = 0; i < data.length; i++) {
              $scope.blooms.push(data[i]);
              if (isInBloomYears(data[i]) == false) {
                $scope.bloomYears.push({
                  "year": moment(data[i].start_date, "YYYY/MM/DD").year(),
                  "dateObj": data[i].start_date
                })
              }
            }

            if($scope.bloomYears[0]){
              //$scope.loadBloomGraph($scope.bloomYears[0]);
            }

            for (var i = 0; i < $scope.blooms.length; i++) {
              if ($scope.blooms[i].end_date == "0000-00-00") {
                $scope.blooms[i].end_date = "present";
              }
            }
          })
        }

        $scope.getMoreBlooms();

        function isInBloomYears(year) {
          for (var i = 0; i < $scope.bloomYears.length; i++) {
            if ($scope.bloomYears[i].year == moment(year.start_date, "YYYY/MM/DD").year()) {
              return true;
            }
          }
          return false;
        }

        // function to load bloom graph for a given calender year,
        //$scope.loadBloomGraph = function(year) {
        //  document.getElementById("bloom_timeline").innerHTML = "";
        //  var container = document.getElementById('bloom_timeline');
        //  var graphData = bloomService.loadBloomGraphData($scope.blooms, year);
        //  var timeline = new vis.Timeline(container, graphData.data, graphData.options);
        //}

        var sprayPage = 0;
        $scope.sprayed = [];
        $scope.getMoreSprayed = function(){
          sprayPage++;
          SprayedFactory.getPestByPlantID($scope.plant.id, sprayPage).then(function(response){
            var data = response.data.data;
            if(data.length < 5){
              $scope.sprayedMoreShow = false;
            }
            for(var i = 0; i < data.length; i++){
              $scope.sprayed.push(data[i]);
            }
          })
        }
        $scope.getMoreSprayed();

        var repotPage = 0;
        $scope.repotted = [];
        $scope.getMoreRepotted = function(){
          repotPage++;
          PottingFactory.getBloomByPlantID($scope.plant.id, repotPage).then(function(response){
            var data = response.data.data;
            if(data.length < 5){
              $scope.repottedMoreShow = false;
            }
            for(var i = 0; i < data.length; i++){
              $scope.repotted.push(data[i]);
            }
          })
        }
        $scope.getMoreRepotted();

        var healthPage = 0;
        $scope.healthData = [];
        $scope.getMoreHealth = function(){
          healthPage++;
          HealthFactory.getHealthBtPlantID($scope.plant.id, healthPage).then(function(response){
            var data = response.data.data;
            if(data.length < 5){
              $scope.healthMoreShow = false;
            }
            for(var i = 0; i < response.data.data.length; i++){
              $scope.healthData.push(response.data.data[i]);
            }
          })
        }
        $scope.getMoreHealth();

        splitFactory.getSplitForPlantId($scope.plant.id).then(function(response) {
            for (var i = 0; i < response.data.data.length; i++) {
                var timestamp = new Date(response.data.data[i].timestamp);
                response.data.data[i].timestamp = timestamp;
                $scope.splits.push(response.data.data[i]);
            }
        });

        PlantCountryLinkFactory.getCountryByPlantID($scope.plant.id).then(function(response) {
            if(response.data.data != undefined){

                for (var i = 0; i < response.data.data.length; i++) {
                    $scope.selectedCountries.push(response.data.data[i][0]);
                }

                for (var i = 0; i < response.data.data.length; i++) {
                    $scope.origianlSelectedCountries.push(response.data.data[i][0]);
                }

            }
        }, function (error){
            console.log("There is an error getting the countries");
        });

        countryFactory.getCountries().then(function(response) {
            $scope.allCountires = [];
            var countryNames = response.data.data;

            for (var i = 0; i < countryNames.length; i++) {
                if (countryHasPlant(countryNames[i]) === false) {
                    $scope.allCountires.push(countryNames[i]);

                }
            }
        });


        //todo need to look at why this is not pulling in the correct image
        PhotoFactory.getPhtosByPlantID($scope.plant.id).then(function(response) {
            if (response.data.data != "") {
                var data = response.data.data;
                for (var i = 0; i < data.length; i++) {

                    if (data[i].type == "profile") {
                        $scope.plant.image = response.data.data[i];
                        $scope.theSelectedProfilePicture = data[i];
                        $scope.plant_id_url.push(response.data.data[i]);
                        $scope.noProfile = false;

                    } else {
                        //if not profile, add in the rest of the file
                        $scope.plant_id_url.push(response.data.data[i]);

                        if (data[i].type == "habitat") {
                            $scope.habitatPictures.push(data[i]);

                        } else if (data[i].type == "other") {

                            $scope.otherPictures = data[i].id;

                        }

                    }
                }

            }


        });

        populateGraph();

    }, function(error) {
        var param1 = $routeParams.accession_number;
        if (param1 == "create") {
            $scope.createNew = true;
            $scope.plant = {
                image: 'images/no_plant_icon.svg'
            };

            LocationFactory.getTableLocations().then(function(response) {
                var tableData = response.data.data;
                for (i = 0; i < tableData.length; i++) {
                    $scope.Tables.push(tableData[i]);
                }
                $scope.Tables = _.sortBy($scope.Tables, ['name']);
            });

            countryFactory.getCountries().then(function(response) {
                var countryNames = response.data.data;
                $scope.example1data = [];
            });

        } else {
            $location.path('/404');
        }

    });

    var createDateFromString = function(string){
      return moment(string).toDate();
    };

    if ($scope.createNew) {
        $scope.editPlant = {
            critical: false,
            taxonommy: false,
            culture: false,
            accesssion: false,
            description: false,
            hybrid: false,
            inactive: false,
            photos: false,
            save: false,
            split: false,
            speical_collections: false,
            notes: false
        };
    } else {
        $scope.editPlant = {
            critical: true,
            taxonommy: true,
            culture: true,
            description: true,
            accesssion: true,
            hybrid: true,
            inactive: true,
            photos: true,
            save: true,
            split: true,
            speical_collections: true,
            notes: true
        };
    }

    $scope.loadSpecialCollection = function(id){
        if($scope.plant.special_collections_id == undefined){

        } else {
            SpecialCollectionsFactory.getSpecialCollectionById($scope.plant.special_collections_id).then(function (response) {
                $scope.selectedCollectionName = response.data.data.name;

            });
        }
    };

    $scope.newCollectionName = "";

    $scope.createNewCollection = function(){
        if($scope.newCollectionName == ""){
            //DO NOTHING SINCE IT IS EMPTY
        } else {
            var newCollection = {
                "name" : $scope.newCollectionName
            };

            SpecialCollectionsFactory.createSpecialCollection(newCollection).then(function (response){
                //TODO maybe look at display a note say that is was created
                $scope.allCollections.push(response.data.data[0]);
            });
            $scope.selectedCollectionName = $scope.newCollectionName;
            $scope.newCollectionName = "";

            SpecialCollectionsFactory.getAllSpecialCollections().then(function(response){
                var responseAllCollections = response.data.data;
                for(var i = 0; i < responseAllCollections.length; i++){
                    $scope.allCollections.push(responseAllCollections[i]);
                }

            });

        }

    }

    $scope.editSpecialCollections = function(){
        if ($scope.editPlant.speical_collections == false) {
            $scope.editPlant.speical_collections = true;

            var speicalCollectionRelationshipData = {
                'id' :  $scope.plant.id,
                'name' : $scope.selectedCollectionName
            };

            PlantsFactory.updateCollection(speicalCollectionRelationshipData).then(function(response){
            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });


        } else {
            $scope.editPlant.speical_collections = false;
        }
    };

    $scope.saveCulture = {
        taxonommy: false,
        culture: false,
        accesssion: false,
        hybrid: false
    };

    $scope.newPlant = {
        taxonomicRank: {
            class: '',
            tribe: '',
            authority: '',
            genus: '',
            species: '',
            variety: ''
        },
        culture: {
            distribution: '',
            country: '',
            habitat: ''
        },
        accesssion: {
            donatedTo: '',
            Recieved: '',
            dontationComment: ''
        },
        description: '',
        hybrid: {
            parentOne: '',
            parentTwo: '',
            grex: ''
        }
    };

    $scope.collectionID = "NULL";
    $scope.tableID = 0;
    $scope.tableError = false;
    $scope.accessionError = false;
     var promArray = [];
    var promArray2 = [];

    $scope.saveAll = function() {

        $scope.AccessionHasBeenChecked = false;

        //DETERMINE IF THE TABLE IS EMPT
        if ($scope.plantLocation == "" || $scope.plantLocation == undefined ){
            $scope.tableError = true;
        } else {
            $scope.tableError = false;
        }

        if ($scope.plant.accession_number == undefined || $scope.plant.accession_number == ""){
            $scope.accessionError = true;
            if($scope.accessionError == true && $scope.tableError == true){
                window.alert("Accession Error. (1)Please enter a valid accession number.");
                window.alert("Table Error. (1)Please select a valid table");
            }else{
                if($scope.accessionError == true){
                    window.alert("Accession Error. (1)Please enter a valid accession number.");
                }
                if($scope.tableError == true){
                    window.alert("Table Error. (1)Please select a valid table");
                }
            }
        } else {

            var prom = new Promise(function(resolve, reject) {
                PlantsFactory.checkAccessionNumber($scope.plant.accession_number).then(function (response){
                    var accessionResponse = response.data.data;
                    resolve(accessionResponse);
                }, function(error){
                    window.alert('Network Error. Please try again.');
                    $location.path('/');
                });
            });

            promArray.push(prom);

            Promise.all(promArray).then(function (success) {

                var updateList = [];

                for (var i = 0; i < success.length; i++){
                    if (success[i] != ""){
                        updateList.push(success[i][0]);
                    }
                }

                var value = updateList[((updateList.length)-1)];
                if(value == true){
                    $scope.accessionError = false;
                }  else {
                    $scope.accessionError = true;
                }

                $scope.$apply();

                promArray = [];

                //Checking the status of the errors.
                $scope.AccessionHasBeenChecked = true;

                if($scope.accessionError == true || $scope.tableError == true) {
                    if($scope.tableError == true && $scope.accessionError == true){
                        window.alert("Accession Error. (1)Please enter a valid accession number.");
                        window.alert("Table Error. (1)Please select a valid table");
                    }
                    else if($scope.tableError == true){
                        window.alert("Table Error. (1)Please select a valid table");
                    } else if($scope.accessionError == true){
                        window.alert("Accession Error. (1)Please enter a valid accession number.");
                    }
                    $scope.accessionError = false;
                    $scope.tableError = false;
                } else {
                    if ($scope.AccessionHasBeenChecked == true){
                        $scope.continueForwaring();
                    } else {
                        window.alert("Error. Please try again.")
                    }
                }
            }, function (error) {
            });
        }
    };

    $scope.continueForwaring = function(){

        //Getting the collection ID or setting it to null
        if($scope.selectedCollectionName == ""){
            //SETTING THE COLLECTION ID TO NOTHING SINCE THERE IS NONE
            $scope.collectionID = null;
        } else {
            //GETTING THE CORRECT ID FOR THE COLLECTIONS
            for(var i = 0; i < $scope.allCollections.length; i++){
                if($scope.selectedCollectionName == $scope.allCollections[i].name){
                    $scope.collectionID = $scope.allCollections[i].id;
                    break;
                }
            }
        }

        //Getting the table ID
        for(var i = 0; i < $scope.Tables.length; i++){
            if($scope.plantLocation == $scope.Tables[i].name){
                $scope.tableID = $scope.Tables[i].id;
                $scope.tableError == false;
                break;
            }
        }

        var date_recieved_object;
        if($scope.plant.date_recieved == null){
            date_recieved_object = null;
        } else {
            date_recieved_object = $scope.plant.date_recieved;
        }

        checkData();

        var data = {
            "accession_number" : $scope.plant.accession_number,
            "name" : $scope.plant.name,
            "scientific_name" : $scope.plant.scientific_name,
            "class_name" : $scope.plant.class,
            "tribe_name" : $scope.plant.tribe,
            "subtribe_name" : $scope.plant.subtribe,
            "genus_name" : $scope.plant.genus,
            "distribution" : $scope.plant.distribution,
            "variety_name" : $scope.plant.variety,
            "authority" : $scope.plant.authority,
            "species_name" : $scope.plant.species,
            "family_name" : $scope.plant.family,
            "habitat" : $scope.plant.habitat,
            "origin_comment" : $scope.plant.origin_comment,
            "received_from" : $scope.plant.received_from,
            "donation_comment": $scope.plant.donation_comment,
            "date_received": date_recieved_object,
            "description": $scope.plant.description,
            "parent_one": $scope.plant.parent_one,
            "parent_two" : $scope.plant.parent_two,
            "grex_status" : $scope.plant.grex_status,
            "hybrid_comment" : $scope.plant.hybrid_comment,
            "location_id" : $scope.tableID,
            "special_collections_id" : $scope.collectionID,
            "general_note": $scope.plant.general_note,
            "phylum_name": $scope.plant.phylum,
            "countries_note" : $scope.plant.countries_note,
            "username" : "ROGH"
        };

        var plant = {
            "data" : data
        };
        var prom2 = new Promise(function(resolve, reject) {
            PlantsFactory.createNew(plant).then(function(response){
                var newPlantInfo = response.data.data;
                resolve(newPlantInfo);
            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });
        });

        promArray2.push(prom2);
        Promise.all(promArray2).then(function (success) {
            var updateList = [];
            for (var i = 0; i < success.length; i++){
                if (success[i] != ""){
                    $scope.newPlantID = success[i].id;
                    $scope.newAcceessionNumer = success[i].accession_number;
                }
            }

            $scope.createNewPlantCountryLink();

            $scope.$apply();

        }, function (error) {

        });

    };

    $scope.createNewPlantCountryLink = function(){
        for(var i = 0; i < $scope.selectedCountries.length; i++){
            var p_c_link = {
                'plant_id' : $scope.newPlantID,
                'country_id': $scope.selectedCountries[i].id
            };
            PlantCountryLinkFactory.createPlantCountryLink(p_c_link).then(function(response){
            })
        }
        $scope.forwardToPage();


    };

    //PUTS UNDEFINDS TO STRINGS
    function checkData(){

        if($scope.plant.scientific_name == undefined){
            $scope.plant.scientific_name = "";
        }
        if($scope.plant.name == undefined){
            $scope.plant.name = "";
        }
        if($scope.plant.class == undefined){
            $scope.plant.class = "";
        }

        if($scope.plant.tribe == undefined){
            $scope.plant.tribe = "";
        }

        if($scope.plant.species == undefined){
            $scope.plant.species = "";
        }
        if($scope.plant.authority == undefined){
            $scope.plant.authority = "";
        }
        if($scope.plant.variety == undefined){
            $scope.plant.variety = "";
        }

        if($scope.plant.subtribe == undefined){
            $scope.plant.subtribe = "";
        }

        if($scope.plant.genus == undefined){
            $scope.plant.genus = "";
        }
        if($scope.plant.distribution == undefined){
            $scope.plant.distribution = "";
        }

        if($scope.plant.habitat == undefined){
            $scope.plant.habitat = "";
        }

        if($scope.plant.origin_comment == undefined){
            $scope.plant.origin_comment = "";
        }
        if($scope.plant.received_from == undefined){
            $scope.plant.received_from = "";
        }
        if($scope.plant.donation_comment == undefined){
            $scope.plant.donation_comment = "";
        }

        if($scope.plant.description == undefined){
            $scope.plant.description = "";
        }
        if($scope.plant.parent_one == undefined){
            $scope.plant.parent_one = "";
        }
        if($scope.plant.parent_two == undefined){
            $scope.plant.parent_two = "";
        }
        if($scope.plant.grex_status == undefined){
            $scope.plant.grex_status = "";
        }
        if($scope.plant.hybrid_comment == undefined){
            $scope.plant.hybrid_comment = "";
        }
        if($scope.plant.general_note == undefined){
            $scope.plant.general_note = "";
        }
        if($scope.plant.phylum == undefined){
            $scope.plant.phylum = "";
        }
        if($scope.plant.countries_note == undefined){
            $scope.plant.countries_note = "";
        }
    }

    $scope.forwardToPage = function(){
        $location.path('/plant/' + $scope.newAcceessionNumer);
        $route.reload();
        $scope.scrollToFunction();
    };

    $scope.otherList = [];
    $scope.habitiatList = [];
    $scope.deleteList = [];

    var OValue = false;

    $scope.changeOther = function(photo) {

        for (var i = 0; i < $scope.otherList.length; i++) {


            if ($scope.otherList[i].id == photo.id) {
                //they are matching
                OValue = true;
                break;
            }
        }

        if (OValue == false) {
            var lengthList = $scope.otherList.length;
            $scope.otherList[lengthList] = photo;
        }



        for (var i = 0; i < $scope.habitiatList.length; i++) {
            if ($scope.habitiatList[i].id == photo.id) {
                $scope.habitiatList.splice(i, 1);
                break;
            }
        }

        for (var i = 0; i < $scope.deleteList.length; i++) {
            if ($scope.deleteList[i].id == photo.id) {
                $scope.deleteList.splice(i, 1);
                break;
            }
        }



    };

    var HValue = false;
    $scope.changeHabitat = function(photo) {

        for (var i = 0; i < $scope.habitiatList.length; i++) {


            if ($scope.habitiatList[i].id == photo.id) {
                //they are matching
                HValue = true;
                break;
            }
        }

        if (HValue == false) {

            var lengthList = $scope.habitiatList.length;
            $scope.habitiatList[lengthList] = photo;
        }

        for (var i = 0; i < $scope.otherList.length; i++) {

            if ($scope.otherList[i].id == photo.id) {
                $scope.otherList.splice(i, 1);
            }
        }

        for (var i = 0; i < $scope.deleteList.length; i++) {
            if ($scope.deleteList[i].id == photo.id) {
                $scope.deleteList.splice(i, 1);
            }
        }
    };

    var DValue = false;
    $scope.delete = function(photo) {

        for (var i = 0; i < $scope.deleteList.length; i++) {
            if ($scope.deleteList[i].id == photo.id) {
                //they are matching
                DValue = true;
                break;
            }
        }

        if (DValue == false) {

            var lengthList = $scope.deleteList.length;
            $scope.deleteList[lengthList] = photo;
        }


        for (var i = 0; i < $scope.otherList.length; i++) {

            if ($scope.otherList[i].id == photo.id) {
                $scope.otherList.splice(i, 1);
            }
        }

        for (var i = 0; i < $scope.habitiatList.length; i++) {

            if ($scope.habitiatList[i].id == photo.id) {
                $scope.habitiatList.splice(i, 1);
            }
        }
    };

    $scope.copyToNewPlant = function(){
        var newAccession = prompt("Creating new plant. PLease give new accession:", "");

        if (newAccession == null) {

        } else {

            console.log(newAccession);
            PlantsFactory.checkAccessionNumber(newAccession).then(function (response){
                console.log(response);
                var data = response.data.data;
                if(data[0] == true){
                    createOldPlantWithNewAccessionNumber($scope.plant, newAccession);

                } else {

                }
            }, function (errorr){

            });
        }
    }

    var createOldPlantWithNewAccessionNumber = function(oldPlantData, newAccessionNumber){

        $scope.newPlantA = $scope.plant;

        //Getting the collection ID or setting it to null
        if($scope.selectedCollectionName == ""){
            //SETTING THE COLLECTION ID TO NOTHING SINCE THERE IS NONE
            $scope.newPlantA.collectionID = null;
        } else {
            //GETTING THE CORRECT ID FOR THE COLLECTIONS
            for(var i = 0; i < $scope.allCollections.length; i++){
                if($scope.selectedCollectionName == $scope.allCollections[i].name){
                    $scope.newPlantA.collectionID = $scope.allCollections[i].id;
                    break;
                }
            }
        }

        //Getting the table ID
        for(var i = 0; i < $scope.Tables.length; i++){
            if($scope.plantLocation == $scope.Tables[i].name){
                $scope.tableID = $scope.Tables[i].id;
                $scope.tableError == false;
                break;
            }
        }

        $scope.newPlantA.tableID = 12;

        var newPlantA_date_recieved_object;
        if($scope.plant.date_recieved == null){
            newPlantA_date_recieved_object = null;
        } else {
            newPlantA_date_recieved_object = $scope.plant.date_recieved;
        }


        var data = {
            "accession_number" : $scope.newPlantA.accession_number,
            "name" : $scope.newPlantA.name,
            "scientific_name" : $scope.newPlantA.scientific_name,
            "class_name" : $scope.newPlantA.class,
            "tribe_name" : $scope.newPlantA.tribe,
            "subtribe_name" : $scope.newPlantA.subtribe,
            "genus_name" : $scope.newPlantA.genus,
            "distribution" : $scope.newPlantA.distribution,
            "variety_name" : $scope.newPlantA.variety,
            "authority" : $scope.newPlantA.authority,
            "species_name" : $scope.newPlantA.species,
            "family_name" : "hello",
            "habitat" : $scope.newPlantA.habitat,
            "origin_comment" : $scope.newPlantA.origin_comment,
            "received_from" : $scope.newPlantA.received_from,
            "donation_comment": $scope.newPlantA.donation_comment,
            "date_received": newPlantA_date_recieved_object,
            "description": $scope.newPlantA.description,
            "parent_one": $scope.newPlantA.parent_one,
            "parent_two" : $scope.newPlantA.parent_two,
            "grex_status" : $scope.newPlantA.grex_status,
            "hybrid_comment" : $scope.newPlantA.hybrid_comment,
            "location_id" : $scope.tableID,
            "special_collections_id" : $scope.newPlantA.collectionID,
            "general_note": $scope.newPlantA.general_note,
            "phylum_name": $scope.newPlantA.phylum,
            "countries_note" : $scope.newPlantA.countries_note,
            "username" : "ROGH",
            "old_accession_numer" : $scope.plant.accession_number,
        };

        var plantAData = {
            "data" : data
        };

        data.new_plant_accession_number = newAccessionNumber;

        PlantsFactory.createPlantWithNewAccessionNumber(plantAData).then(function (response){
            //todo make sure this is correct
        }, function (error){

        });

    }

    $scope.editPhotos = function() {
        if ($scope.editPlant.photos == false) {
            $scope.editPlant.photos = true;

            var photoData = $scope.plant_id_url;

            PhotoFactory.updatePhoto(photoData).then(function(response) {
                var photoResponse = response.data.data;
                $scope.plant_id_url = [];
                $scope.plant_id_url = response.data.data;

                formatData();
            }, function (error){
                //todo put in the error message
                //todo if the photo comes back as profile then we need to indicate that

            });

        } else {
            $scope.editPlant.photos = false;
        }
    };

    var formatData = function (){
        for(var i = 0; i < $scope.plant_id_url.length; i++){
            if($scope.plant_id_url[i]['type'] == "profile"){
                var proPicture = $scope.plant_id_url[i];
                $scope.plant.image = proPicture;
                $scope.theSelectedProfilePicture = proPicture;
                $scope.noProfile = false;

            }
        }
    }

    $scope.newSplit = false;
    $scope.newPlantSplits = [];
    $scope.addPlantSplitFunction = function(donation) {
        $scope.newSplit = true;
        if(donation){
            $scope.donationSet();
        }
        $scope.newPlantSplit
    };

    $scope.autoFillTaxonomicRanking = "false";

    $scope.autoFillHit = function(){
        if($scope.autoFillTaxonomicRanking == "false"){
            $scope.autoFillTaxonomicRanking = "true"
        } else {
            $scope.autoFillTaxonomicRanking = "false";
        }
    }

    $scope.editTaxonomy = function() {
        if ($scope.editPlant.taxonommy == false) {
            $scope.editPlant.taxonommy = true;


            //var taxonmicPlantInformation = {
            //    phylum_name: $scope.plant.phylum,
            //    family_name: $scope.plant.family,
            //    class_name: $scope.plant.class,
            //    tribe_name: $scope.plant.tribe,
            //    subtribe_name: $scope.plant.subtribe,
            //    genus_name: $scope.plant.genus,
            //    species_name: $scope.plant.species,
            //    variety_name: $scope.plant.variety,
            //    authority: $scope.plant.authority,
            //    id: $scope.plant.id,
            //    autofill: "true"
            //};



            var taxonmicPlantInformation = {
                autofill: $scope.autoFillTaxonomicRanking,
                phylum_name: $scope.plant.phylum,
                family_name: $scope.plant.family,
                class_name: $scope.plant.class,
                tribe_name: $scope.plant.tribe,
                subtribe_name: $scope.plant.subtribe,
                genus_name: $scope.plant.genus,
                species_name: $scope.plant.species,
                variety_name: $scope.plant.variety,
                authority: $scope.plant.authority,
                id: $scope.plant.id
            };


            PlantsFactory.editTaxonmicPlant(taxonmicPlantInformation).then(function(response) {

                var data = response.data.data;
                $scope.plant.phylum = data.phylum_name;
                $scope.plant.family = data.family_name;
                $scope.plant.class = data.class_name;
                $scope.plant.tribe = data.tribe_name;
                $scope.plant.subtribe = data.subtribe_name;
                $scope.plant.genus = data.genus_name;
                $scope.plant.species = data.species_name;
                $scope.plant.variety = data.variety_name;
                $scope.plant.authority = data.authority;

            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });

        } else {
            $scope.editPlant.taxonommy = false;
        }
    };

    $scope.donationSet = function() {
        $scope.donation = !$scope.donation;
    }

    $scope.donation = false;
    $scope.editSplit = function() {
        if ($scope.editPlant.split == false) {


                if ($scope.newPlantSplit.recipient == "" || !$scope.newPlantSplit.timestamp == undefined) {
                    window.alert("Error creating Split");
                } else {
                    var plantSplit = {
                        'recipient': $scope.newPlantSplit.recipient,
                        'timestamp': $scope.newPlantSplit.timestamp,
                        'note' : $scope.newPlantSplit.note
                    };

                    splitFactory.createNewSplit(plantSplit, $scope.plant.id).then(function (response) {
                        if(!$scope.donation){
                            splitFactory.addLetter($scope.plant.id).then(function(response){

                            });
                        } else {
                            splitFactory.makeDonation($scope.plant.id).then(function(response){

                            })
                        }
                    });

                    for (var i = 0; i < $scope.splits.length; i++) {
                        splitFactory.updateSplits($scope.splits[i], $scope.plant.id).then(function (response) {
                        });
                    }

                    $scope.editPlant.split = true;

                    $route.reload();
                }
        } else {
            $scope.editPlant.split = false;
        }
    }

    $scope.newPlantSplit = {};

    $scope.newPlantSplits = [];
    $scope.addPlantSplit = function() {
        $scope.newPlantSplits.push({
            'recipient': '',
            'timestamp': ''
        });
    }

    function countryHasPlant(countryObject) {
        var isPlantInCountry = false;
        $scope.selectedCountries.forEach(function(country) {
            if (country.name == countryObject.name) {
                isPlantInCountry = true;
            }
        });

        return isPlantInCountry;
    }

    $scope.editInactive = function() {
        if ($scope.editPlant.inactive == false) {

            var dead_date_object;
            var inactive_date_object;

            var dateError = false;

            if($scope.plant.dead_date == null){
                dead_date_object = null;
            } else {
                dead_date_object = new Date($scope.plant.dead_date);
                if(String(dead_date_object.getFullYear()).length > 4 || (dead_date_object.getFullYear()) < 1990){
                    dateError = true;
                } else {

                }
            }

            if($scope.plant.inactive_date == null){
                inactive_date_object = null;
            } else {
                inactive_date_object = new Date($scope.plant.inactive_date);
                if(String(inactive_date_object.getFullYear()).length > 4 || (inactive_date_object.getFullYear()) < 1990){
                    dateError = true;
                } else {
                }
            }

            if ( dateError == true) {
                window.alert('Date is not in the correct format.');
            } else {


                var inactiveInformation = {
                    dead_date: dead_date_object,
                    inactive_date: inactive_date_object,
                    inactive_comment: $scope.plant.inactive_comment,
                    id: $scope.plant.id
                };

                PlantsFactory.editInactivePlant(inactiveInformation).then(function (response) {

                }, function (error) {
                    window.alert('Network Error. Please try again.');
                    $location.path('/');
                });
                $scope.editPlant.inactive = true;

            }

        } else {
            $scope.editPlant.inactive = false;
        }
    };

    $scope.saveCritical = function() {
        var criticalPlantInformation = {
            scientific_name: $scope.plant.scientific_name,
            name: $scope.plant.name,
            location_id: $scope.plant.location_id,
            accession_number: $scope.plant.accession_number,
            username: "ROGH"
        };

        $scope.editPlant = {
            critical: false,
            taxonommy: false,
            culture: false,
            accesssion: false,
            description: false,
            hybrid: false,
            inactive: false,
            photos: false,
            save: false

        };
        PlantsFactory.createNewPlant(criticalPlantInformation).then(function(response) {

            $scope.plant.id = response.data.data.id;
            $scope.accession_number = response.data.data.accession_number;
            $scope.editTaxonomy();
            $scope.editCulture();
            $scope.editDescription();
            $scope.editHybrid();
            $scope.editInactive();
            $scope.editAccession();
            var x = $scope.accession_number;
            $location.path('/plant/' + x);
        }, function(error){
            window.alert('Network Error. Please try again.');
            $location.path('/');
        });

    };

    $scope.profilePopUp = false;

    $scope.changeProfilePicture = function() {
        if ($scope.editPlant.photos == false) {
            $scope.profilePopUp = !$scope.profilePopUp;

            $rootScope.$broadcast('abc', {
                any: {
                    'accession_number': $scope.plant.accession_number,
                    'plant_id' : $scope.plant.id
                }
            });

            $scope.$on('photoMatcher', function(event, data) {
                if (data == true) {
                    $scope.profilePopUp = true;
                }
                if (data == false){
                    $scope.profilePopUp = false;

                }
            });
        } else {
            //Do nothing since the section is not editable
        }
    };

    $scope.checkBloomDate = function(){
        console.log("it has changed");
        console.log($scope.add.addStartDate);

        var bloom_start_date;

        bloom_start_date = new Date($scope.add.addStartDate);

        if(String(bloom_start_date.getFullYear()).length > 4 || (bloom_start_date.getFullYear()) < 1990){
            // not ready to add
        } else {
            bloom_start_date.setDate(bloom_start_date.getDate() + 7);
            $scope.add.addStartEnd = bloom_start_date;

        }


    }

    $scope.editCritical = function() {
        $scope.checkedTable = false;
        if ($scope.editPlant.critical == false) {

            for(var i = 0; i < $scope.Tables.length; i++){
                if($scope.plantLocation == $scope.Tables[i].name){
                    $scope.tableID = $scope.Tables[i].id;
                    $scope.checkedTable = true;
                    break;
                } else {
                    $scope.checkedTable = false;
                }
            }

            if($scope.checkedTable == false){
                window.alert("Please select a table from the list.");
            } else {
                var criticalPlantInformation = {
                    scientific_name: $scope.plant.scientific_name,
                    name: $scope.plant.name,
                    location_id: $scope.tableID,
                    id: $scope.plant.id,
                    accession_number: $scope.plant.accession_number
                };
                PlantsFactory.editCriticalPlant(criticalPlantInformation).then(function (response) {
                }, function(error){
                    window.alert('Network Error. Please try again.');
                    $location.path('/');
                });

                var dataAsString = createDateFromString($scope.verifiedObject.verified_data);

                if (dataAsString == $scope.verifiedDate || $scope.verifiedDate == undefined) {
                    $scope.editPlant.critical = true;
                }
                else if(dateIsFuture($scope.verifiedDate)){ 
                   alert("Verify date cannot be set in the future."); 
                }
                else {
                    if($scope.isVerified == true) {
                        var newDateFromModel = new Date($scope.verifiedDate);
                        var verifiedInformation = {
                            plant_id: $scope.plant.id,
                            verified_date: newDateFromModel,
                            id: $scope.verifiedObject.id,
                            active: 1
                        };

                        VerifiedFactory.updateVerified(verifiedInformation).then(function (response) {

                        });
                        $scope.editPlant.critical = true;

                    } else {
                        var newDateFromModel = new Date($scope.verifiedDate);
                        var verifiedSpecificInformation = {
                            plant_id: $scope.plant.id,
                            verified_date: newDateFromModel
                        };
                        VerifiedFactory.createSpecifcVerifiedDate(verifiedSpecificInformation).then(function (response){
                        });
                        $scope.editPlant.critical = true;
                    }
                }
            }

        } else {
            $scope.editPlant.critical = false;
        }
    };

    var dateIsFuture = function(string){ 
        var verifyDate = moment(string); 
        var today = new Date(); 
        if (verifyDate.isAfter(today)) { 
            return true; 
        } else { 
            return false; 
        } 
    };

    $scope.deleteCountryList = [];
    $scope.addCountryList = [];

    $scope.editCulture = function() {
        if ($scope.editPlant.culture == false) {
            // Update the record
            $scope.editPlant.culture = true;


            var culturePlantInformation = {
                distribution: $scope.plant.distribution,
                habitat: $scope.plant.habitat,
                location_id: 3,
                id: $scope.plant.id,
                origin_comment: $scope.plant.origin_comment,
                countries_note: $scope.plant.countries_note
            };


            var alreadyAdded = false;


            for(var i = 0; i < $scope.selectedCountries.length; i++){
                var country = $scope.selectedCountries[i];
                alreadyAdded = false;
                for(var j = 0; j < $scope.origianlSelectedCountries.length; j++){
                    if($scope.selectedCountries[i].name == $scope.origianlSelectedCountries[j].name){
                        alreadyAdded = true;
                        break;
                    }
                }

                if(alreadyAdded == false){
                    $scope.addCountryList.push(country);
                }
            }

            var alreadyTaken = false;
            for(var i = 0; i < $scope.origianlSelectedCountries.length; i++){
                var country = $scope.origianlSelectedCountries[i];
                alreadyTaken = false;
                for(var j = 0; j < $scope.selectedCountries.length; j++){
                    if($scope.origianlSelectedCountries[i].name == $scope.selectedCountries[j].name){
                        alreadyTaken = true;
                        break;
                    }

                }

                if(alreadyTaken == false){

                    $scope.deleteCountryList.push(country);
                }
            }

            for(var i = 0; i < $scope.addCountryList.length; i++){
                var p_c_link = {
                    'plant_id' : $scope.plant.id,
                    'country_id': $scope.addCountryList[i].id
                }
                PlantCountryLinkFactory.createPlantCountryLink(p_c_link).then(function(response){

                })
            }

            for(var i = 0; i < $scope.deleteCountryList.length; i++){
                var p_c_link = {
                    'plant_id' : $scope.plant.id,
                    'country_id': $scope.deleteCountryList[i].id
                }
                PlantCountryLinkFactory.deleteRelationship(p_c_link).then(function(response){

                });
            }

            PlantsFactory.editCulturePlant(culturePlantInformation).then(function() {

            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });

        } else {
            //change the state of the button
            $scope.editPlant.culture = false;
        }
    }

    $scope.editAccession = function() {
        if ($scope.editPlant.accesssion == false) {

            var date_object;
            var dateError = false;

            if($scope.plant.date_recieved == null){
                date_object = null;
            } else {
                date_object = new Date($scope.plant.date_recieved);
                if(String(date_object.getFullYear()).length > 4 || (date_object.getFullYear()) < 1990){
                    dateError = true;
                } else {

                }
            }


            if(dateError == false){
                var accessionPlantInformation = {
                    received_from: $scope.plant.received_from,
                    donation_comment: $scope.plant.donation_comment,
                    date_received: date_object,
                    id: $scope.plant.id
                }

                PlantsFactory.editAccessionPlant(accessionPlantInformation).then(function (response) {

                }, function (error) {
                    window.alert('Network Error. Please try again.');
                    $location.path('/');
                });
                $scope.editPlant.accesssion = true;
            } else {
                window.alert('Date is not in the correct format.');
            }
        } else {
            $scope.editPlant.accesssion = false;
        }
    }

    $scope.editDescription = function() {
        if ($scope.editPlant.description == false) {
            $scope.editPlant.description = true;
            var descriptionPlantInformation = {
                description: $scope.plant.description,
                id: $scope.plant.id
            };

            PlantsFactory.editDescription(descriptionPlantInformation).then(function(response) {
            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });
        } else {
            $scope.editPlant.description = false;
        }
    };

    $scope.editHybrid = function() {
        if ($scope.editPlant.hybrid == false) {
            $scope.editPlant.hybrid = true;

            var hybridPlantInformation = {
                parent_one: $scope.plant.parent_one,
                parent_two: $scope.plant.parent_two,
                grex_status: $scope.plant.grex_status,
                hybrid_comment: $scope.plant.hybrid_comment,
                id: $scope.plant.id
            };

            PlantsFactory.editHybird(hybridPlantInformation).then(function(response) {
            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });
        } else {
            $scope.editPlant.hybrid = false;

        }
    };

    $scope.editGeneralNote = function() {
        if ($scope.editPlant.notes == false) {
            $scope.editPlant.notes = true;

            var generalNotesInformation = {
                general_note: $scope.plant.general_note,
                id: $scope.plant.id
            };

            PlantsFactory.updateGeneralNotes(generalNotesInformation).then(function(response) {
            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });

        } else {
            $scope.editPlant.notes = false;

        }
    };

    $scope.click = function() {
    }


    $scope.showMoveFunction = function() {
        $scope.showPopup2 = !$scope.showPopup2;
    };

    $scope.addPhotoList = [];

    $scope.newPhotoLink = function (photo){

        for(var i = 0; i < $scope.similarPhotos.length; i++){
            var index = -1;
            if($scope.similarPhotos[i].id == photo.id) {
                index = i;
                break;
            }
        }
        var changed = false;

        for (var i = 0; i < $scope.addPhotoList.length; i++) {

            if (photo.id == $scope.addPhotoList[i].id) {
                $scope.addPhotoList.splice(i, 1);
                $scope.similarPhotos[i].clicked = "NO";
                changed = true;
            }
        }

        if (changed == false) {
            $scope.addPhotoList.push(photo);
            $scope.similarPhotos[index].clicked = "YES";
            $scope.addPhotoList.checked = true;

        }

        //$scope.$apply();
    };

    $scope.profileSelected = function(photo) {
        if (photo.id == $scope.theSelectedProfilePicture.id) {
            //stays the same
        } else {

            for (var i = 0; i < $scope.plant_id_url.length; i++){
                if ($scope.theSelectedProfilePicture.id == $scope.plant_id_url[i].id){
                    var oldPhoto = $scope.plant_id_url[i];
                    $scope.plant_id_url[i].type = 'habitat';
                    $scope.newHabitatList.push(oldPhoto);
                    break;
                } else {

                }
            }
            photo.type = 'profile';
            $scope.theSelectedProfilePicture = photo;
            $rootScope.apply;
        }
    };

    $scope.otherSelected = function(photo) {

        var noChange = false;
        for (var i = 0; i < $scope.otherPictures.length; i++){
            if(photo.id == $scope.otherPictures[i].id){
                //do nothing since it is already there
                noChange = true;
            }
        }
        if(noChange == false) {
            //we need to made a change
            for (var i = 0; i < $scope.plant_id_url.length; i++) {
                if ($scope.plant_id_url[i].id == photo.id) {
                    var index = i;
                    break;
                }
            }

            $scope.otherList.push(photo);
            $scope.plant_id_url[index].type = 'other';
            for (var j = 0; j < $scope.newHabitatList.length; j++) {
                if (photo.id == $scope.newHabitatList[j].id) {
                    $scope.newHabitatList.splice(j, 1);
                    break;
                }
            }
            if (photo.id == $scope.theSelectedProfilePicture.id) {
                $scope.theSelectedProfilePicture = "";
            }
        }
        $rootScope.apply;
    };

    $scope.deletedSelcted = function(photo){
        var noChange = false;
        for (var i = 0; i < $scope.deletedPictures.length; i++){
            if(photo.id == $scope.deletedPictures[i].id){
                //do nothing since it is already there
                noChange = true;
            }
        }

        if(noChange == false){
            //we need to made a change
            for (var i = 0; i < $scope.plant_id_url.length; i++){
                if ($scope.plant_id_url[i].id == photo.id){
                    var index = i;
                    break;
                }
            }

            $scope.deletedPictures.push(photo);
            $scope.plant_id_url[index].type = 'del';

            //seeing if it is in the habitiat list
            for(var j = 0; j < $scope.newHabitatList.length; j++){
                if(photo.id == $scope.newHabitatList[j].id){
                    $scope.newHabitatList.splice(j, 1);
                    break;
                }
            }

            //seeing if it is in the other list
            for(var j = 0; j < $scope.otherPictures.length; j++){
                if(photo.id == $scope.otherPictures[j].id){
                    $scope.otherPictures.splice(j, 1);
                    break;
                }
            }
            if(photo.id == $scope.theSelectedProfilePicture.id) {
                $scope.theSelectedProfilePicture = "";
            }
        }
        $rootScope.apply;
    };

    $scope.habitatSelected = function(photo) {
         var index;
        for (var i = 0; i < $scope.plant_id_url.length; i++){
            if ($scope.plant_id_url[i].id == photo.id){
                index = i;
                break;
            }
        }
        $scope.plant_id_url[index].type = 'habitat';

        if(photo.id == $scope.theSelectedProfilePicture.id) {
            $scope.theSelectedProfilePicture = "";
        }

        $rootScope.apply;
    };

    $scope.deleteSpecialCollection = function(){

        if($scope.selectedSpecialCollectionDeletedName == ""){

            window.alert("No Special Collection to delete");
        } else {
            SpecialCollectionsFactory.deleteSpecialCollection($scope.selectedSpecialCollectionDeletedName).then(function (response){
                if(response.data.data[0] == true){
                    $route.reload();
                } else {
                    window.alert('Error with Deleting Special Collections');
                }
            }, function (error) {
                window.alert('Network Error.');
            });
        }
    };

    $scope.changeSpecialColelctionDelete = function(name){
        if(name == "Delete Collection"){
            $scope.collectionWarning = false;
        } else {
            $scope.collectionWarning = true;
        }
    };

    $scope.uploadFileUrl = function(url, b, thumbnailURL){
        var baseURL = "http://s3.amazonaws.com/bsuorchid/";
        var thumb_nail = thumbnailURL.split(baseURL)[1];

        var fileName = url.split(baseURL)[1];
        var photo = {
          'plant_id' : $scope.plant.id,
            'url' : url,
            'type' : 'habitat',
            'fileName' : fileName,
            'thumb_url' : thumbnailURL
        };

        PhotoFactory.createPhoto(photo).then(function (response){
            $scope.editPlant.photos = true;
            $scope.plant_id_url.push(data);
        });
        $route.reload();

    }

    $scope.scrollToFunction = function(){
        $(window).scrollTop(0);
    }
    $scope.autoFilledFamily = [];
    $scope.autoFilledClasses = [];
    $scope.autoFilledPhylums = [];
    $scope.autoFilledGenuses = [];
    $scope.autoFilledTribes = [];
    $scope.autoFilledSpecies = [];
    $scope.autoFilledSubtribes = [];
    $scope.autoFilledVarieties = [];
    $scope.autoFilledAuthorities = [];

    $scope.autoFillClass = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('class', text).then(function(response) {
          $scope.autoFilledClasses = response.map(function(classObj) {
            return classObj.class_name;
          });
        });
      }
    }

    $scope.autoFillFamily = function(text) {
        if (text !== "" && text !== undefined && text !== null) {
            taxonommyFactory.getAutoFillTaxonomy('family', text).then(function(response) {
                $scope.autoFilledFamily = response.map(function(classObj) {
                    return classObj.family_name;
                });
            });
        }
    }


    $scope.autoFillPhylum = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('phylum', text).then(function(response) {
          $scope.autoFilledPhylums = response.map(function(classObj) {
            return classObj.phylum_name;
          });
        });
      }
    }


    $scope.autoFillGenus = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('genus', text).then(function(response) {
          $scope.autoFilledGenuses = response.map(function(classObj) {
            return classObj.genus_name;
          });
        });
      }
    }

    $scope.autoFillTribe = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('tribe', text).then(function(response) {
          $scope.autoFilledTribes = response.map(function(classObj) {
            return classObj.tribe_name;
          });
        });
      }
    }

    $scope.autoFillSpecies = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('species', text).then(function(response) {
          $scope.autoFilledSpecies = response.map(function(classObj) {
            return classObj.species_name;
          });
        });
      }
    }

    $scope.autoFillSubtribe = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('subtribe', text).then(function(response) {
          $scope.autoFilledSubtribes = response.map(function(classObj) {
            return classObj.subtribe_name;
          });
        });
      }
    }

    $scope.autoFillVariety = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('variety', text).then(function(response) {
          $scope.autoFilledVarieties = response.map(function(classObj) {
            return classObj.variety_name;
          });
        });
      }
    }

    $scope.autoFillAuthority = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('authority', text).then(function(response) {
          $scope.autoFilledAuthorities = response.map(function(classObj) {
            return classObj.authority;
          });
        });
      }
    }

    var populateGraph = function() {
        BloomingFactory.getGraphData($scope.plant.id).then(function (response) {
            $scope.graphData = response.data.data;


            Highcharts.chart('container', {
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Plant Chart'
                },
                subtitle: {
                    text: 'Blooming Data'
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Months'
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true,
                    max: 13,
                    allowDecimals: false,
                    mintickinterval: 1,
                    minRange: 10,
                    tickInterval: 1,
                    min: 1
                },
                yAxis: {
                    title: {
                        text: 'Hits'
                    },
                    mintickinterval: 1,
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 100,
                    y: 70,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                    borderWidth: 1
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.x} Month, {point.y} hits'
                        }
                    }
                },
                series: [{
                    name: 'Start Date',
                    color: 'rgba(223, 83, 83, .5)',
                    data: (function () {
                        // generate an array of random data

                        var data = [];


                        for (i = 0; i <= 11; i += 1) {
                            var singleMonthData = $scope.graphData[i];

                            var monthPart = singleMonthData.month;
                            var firstCount = 0;
                            var secondCount = 0;
                            var thirdCount = 0;

                            firstCount = singleMonthData.startBreakDown[".3"]["count"];
                            secondCount = singleMonthData.startBreakDown[".6"]["count"];
                            thirdCount = singleMonthData.startBreakDown[".9"]["count"];

                            for (var a = firstCount; a > 0; a--) {
                                data.push([
                                    monthPart + .3,
                                    parseInt(a)
                                ]);
                            }

                            for (var b = secondCount; b > 0; b--) {
                                data.push([
                                    monthPart + .6,
                                    parseInt(b)
                                ]);
                            }

                            for (var c = thirdCount; c > 0; c--) {
                                data.push([
                                    monthPart + .9,
                                    parseInt(c)
                                ]);
                            }
                        }
                        return data;
                    }())

                }, {
                    name: 'End Date',
                    color: 'rgba(119, 152, 191, .5)',
                    data: (function () {
                        // generate an array of random data

                        var data = [];
                        for (i = 0; i <= 11; i += 1) {
                            var singleMonthData = $scope.graphData[i];
                            //
                            var monthPart = singleMonthData.month;
                            var firstCount = 0;
                            var secondCount = 0;
                            var thirdCount = 0;

                            firstCount = singleMonthData.endBreakDown[".3"]["count"];
                            secondCount = singleMonthData.endBreakDown[".6"]["count"];
                            thirdCount = singleMonthData.endBreakDown[".9"]["count"];

                            for (var a = firstCount; a > 0; a--) {
                                data.push([
                                    monthPart + .3,
                                    parseInt(a)
                                ]);
                            }

                            for (var b = secondCount; b > 0; b--) {
                                data.push([
                                    monthPart + .6,
                                    parseInt(b)
                                ]);
                            }

                            for (var c = thirdCount; c > 0; c--) {
                                data.push([
                                    monthPart + .9,
                                    parseInt(c)
                                ]);
                            }
                        }
                        return data;
                    }())
                }]
            });
        }, function (error) {

        });
    }
});
