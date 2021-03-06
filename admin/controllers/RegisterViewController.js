app.controller('RegisterViewController', function($scope, $rootScope, UserFactory, $route, $location){

    $scope.newUser = false;

    $scope.editUsers = false;

    $scope.changeUser = [];

    $scope.startEditingUser = function(){
        if($scope.editUsers == false){
            $scope.editUsers = true;
        } else {
            $scope.editUsers = false;
            //TODO SAVE THE INFORMATION THAT IS CHANGED

            checkUserModelInformation();

            for(var i = 0; i < $scope.updateUsers.length; i++){
                var user = $scope.updateUsers[i];
                UserFactory.updateUser(user).then(function (response){

                }, function(error){
                    window.alert('Network Error. Please try again.');
                    $location.path('/');
                });
            }
        }
    };

    $scope.updateUsers = [];

    function checkUserModelInformation(){

        for(var i = 0; i < $scope.allUsers.length; i++){
            for(var j = 0; j < $scope.oringialUsers.length; j++){


                if($scope.allUsers[i].id == $scope.oringialUsers[j].id){
                    //WE HAVE MATCHED THE NEW EMPLOYESS AND THE ORGINIAL
                    var newUser = $scope.allUsers[i];
                    var oldUser = $scope.oringialUsers[j];


                    if(oldUser.first_name == newUser.first_name){
                        //Do NOTHING
                    } else {
                        $scope.updateUsers.push(newUser);
                        break;
                    }

                    if(oldUser.last_name == newUser.last_name){
                        //Do NOTHING
                    } else {
                        $scope.updateUsers.push(newUser);
                        break;
                    }

                    if(oldUser.auth_level == newUser.auth_level){
                        //Do NOTHING
                    } else {
                        $scope.updateUsers.push(newUser);
                        break;
                    }

                }
            }
        }

    }
    var promArray = [];

    var prom = new Promise(function(resolve, reject) {
        UserFactory.getAuth().then(function (response){
            var data = response.data.data;
            resolve(data);
        });
    }, function(error){
        window.alert('Network Error. Please try again.');
        $location.path('/');
    });

    promArray.push(prom);

    Promise.all(promArray).then(function (success) {

        console.log(success);

        $scope.currentUser = success[0].email;
        console.log($scope.currentUser);
        $scope.$apply();

    }, function (error) {

    });

    $scope.allUsers = [];

    $scope.oringialUsers = [];

    UserFactory.getAllUsers().then(function (response){
       var data = response.data.data;

        for (var i = 0; i < data.length; i++){
            var singleUser = data[i];
            if(singleUser.auth_level == 1){
                singleUser.isAuthUser = true;
            } else {
                singleUser.isAthUser = false;
            }
            if(singleUser.email == $scope.currentUser){
                singleUser.warning = true;
            } else {
                singleUser.warning = false;
            }

            $scope.allUsers.push(singleUser);
        }
    });

    UserFactory.getAllUsers().then(function (response){
        var data = response.data.data;

        for (var i = 0; i < data.length; i++){
            var singleUser = data[i];
            if(singleUser.auth_level == 1){
                singleUser.isAuthUser = true;
            } else {
                singleUser.isAthUser = false;
            }
            $scope.oringialUsers.push(singleUser);
        }
    }, function(error){
        window.alert('Network Error. Please try again.');
        $location.path('/');
    });

    $scope.changePassword = true;
    $scope.deleteUser = true;

    $scope.deleteUserPopUp = function(user){
        if(user.warning == true){
            window.alert('Error. Can not delete current user');
        } else {
            $scope.deleteUser = false;

            var number;
            for (var index = 0; index < $scope.allUsers.length; index++){

                if (user.id == $scope.allUsers[index].id){
                    number = index;
                }
            }
            $rootScope.$broadcast('deleteUserData', {
                user: {
                    'specificUser': $scope.allUsers[number]
                }
            });
            return false;
        }
    };

    $scope.$on('changePassword', function(event, data) {
        if (data == true) {
            $scope.changePassword = true;
        }
    });

    $scope.$on('deleteUser2', function(event, data) {
        if (data == true) {
            $scope.deleteUser = true;
        }
    });


    $scope.changePasswordFunction = function(user){
        if(user.warning == true){
            window.alert("Warning. This is the current user.");
        }
        $scope.changePassword = false;
    };

    $scope.changePasswordFunction = function(user) {
        if(user.warning == true){
            window.alert("Warning. This is the current user.");
        }
        $scope.changePassword =false;
        var number;
        for (var index = 0; index < $scope.allUsers.length; index++){
            if (user.id == $scope.allUsers[index].id){
                number = index;
            }
        }

        $rootScope.$broadcast('changePasswordData', {
            user: {
                'specificUser': $scope.allUsers[number]
            }
        });
    };

    $scope.deleteUserFunction = function(user){
        $route.reload();
    };

    $scope.addUser = function(){
        $scope.newUser = true;
    };

    $scope.sendNewRequest = false;

    $scope.saveUser = function(user){
        checkNewUserData(user);
    };

    var checkNewUserData = function(user){
        console.log(user);
        if(user == undefined){
            window.alert("Please fill in data");
            return;
        }
        if(user.isAuthUser == undefined || user.isAuthUser == null ){
            user.isAuthUser  = false;
        } else {
            user.isAuthUser  = true;
        }

        if(user.firstName == null || user.firstName == null || user.email == null || user.password == null){
            window.alert("Please fill in all fields for a new user");
            return;
        }

        if(user.lastName == "" || user.firstName == "" || user.email == "" || user.password == ""){
            window.alert("Please fill in all fields for a new user");
        } else {
            $scope.sendNewRequest = true;
            $scope.sendUserData(user);
        }
    };
    $scope.sendUserData = function(user){
        var authData = 0;
        if(user.isAuthUser == true){
            authData = 1;
        } else {
            authData = 2;
        }

        var userData = {
            "first_name" : user.firstName,
            "last_name" : user.lastName,
            "email" : user.email,
            "password" : user.password,
            "auth_level" : authData
        };

        var promArray = [];

        var prom = new Promise(function(resolve, reject) {
            UserFactory.newUser(userData).then(function (response){
                var userResponse = response.data.data;
                resolve(userResponse);
            });
        });

        promArray.push(prom);

        Promise.all(promArray).then(function (success) {
            $scope.$apply();

            $route.reload();
        }, function (error) {

        });
    };

    var userAdded = false;

    $scope.changeAuthLevel = function(user){
        //CHANGING THE AUTH LEVEL OF THAT USER
       if(user.auth_level == 1){
           user.auth_level = 2;
       } else {
           user.auth_level = 1;
       }

        for(var i = 0; i < $scope.changeUser.length; i++){
            if (user.id == $scope.changeUser[i].id){
                $scope.changeUser.splice(i, 1);
                $scope.changeUser.push(user);
                userAdded = true;

                break;
            } else {

            }

        }

        if(userAdded == false){
            $scope.changeUser.push(user);
        }

    }
});