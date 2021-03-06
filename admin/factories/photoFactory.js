app.factory('PhotoFactory', function($http, $rootScope, CONFIG) {

    var data = {};
    var baseUrl = location.origin +CONFIG.urlfixForServer +'/orchid_site/public/api/photos';



    data.getPhtosByPlantID = function(plant_id) {
        return $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.getSimilarPhotos = function(data){
        //return $http.get(baseUrl + "/getSimilarPlants/" + name);
        return $http({
            method: "POST",
            url: baseUrl + '/getSimilarPlants',
            data: {
                "species": data.species,
                "genus": data.genus,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.createPhoto = function (photo) {
        return $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": photo.plant_id,
                "url": photo.url,
                "type": photo.type,
                "fileName": photo.fileName,
                "thumb_url" : photo.thumb_url,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.updatePhoto = function(photo){
        return $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "allPhotos" : photo,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.deletePhoto = function(photo){
        console.log("we are here at the delete stage");
        console.log(photo);
        return $http({
            method: "PUT",
            url: baseUrl + '/deactive',
            data: {
                "id": photo.id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    return data;
});
