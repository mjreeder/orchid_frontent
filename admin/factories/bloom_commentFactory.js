app.factory('Bloom_CommentFactory', function($http, $rootScope, CONFIG) {

    var data = {};
    var baseUrl = location.origin + CONFIG.urlfixForServer + '/orchid_site/public/api/bloom_comment';



    data.getBloomByPlantID = function(plant_id) {
        return $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createBloom_Comment = function (bloom_comment) {
        return $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": bloom_comment.plantId,
                "timestamp": bloom_comment.timestamp,
                "note": bloom_comment.note,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.updateBloom_Comment = function(bloom_comment){
        return $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": bloom_comment.plantId,
                "timestamp": bloom_comment.timestamp,
                "note": bloom_comment.note,
                "id": bloom_comment.id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    return data;
});
