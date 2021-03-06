app.factory('classificationLinkFactory', function($http, $rootScope, CONFIG) {

    var data = {};
    var baseUrl = location.origin + CONFIG.urlfixForServer +'/orchid_site/public/api/classification_link';

    data.createClassificationLink = function(classificationLink) {
      return $http({
          method: "POST",
          url: baseUrl,
          data: {
              "plantId": classificationLink.plantId,
              "classId": classification.classId,
              "session_id": $rootScope.userSessionId,
              "session_key": $rootScope.userSessionKey
          }
      });
    }

    data.getPlantByClassificationId = function(id){
      return $http.get(baseUrl + '/plant/' + id);
    }

    data.getPlantHierarchy = function(id){
        return $http.get(baseUrl + '/plant_hierarchy/' + id);
    }

    return data;
});
