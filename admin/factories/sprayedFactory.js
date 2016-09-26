app.factory('sFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/split';



    data.getPestByPlantID = function(plant_id) {
        $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createSplit = function (split) {
        $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": split.plantId,
                "timestamp": split.start_date,
                "note": split.note,
                "recipient" : split.recipient
            }
        });
    }

    data.updateSplit = function(split){
        $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": split.plantId,
                "timestamp": split.timestamp,
                "note": split.note,
                "id": split.id,
                "recipient": split.recipient
            }
        });
    }

    return data;
});