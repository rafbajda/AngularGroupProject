
//KONTROLLER DO EDYCJI I USUWANIA LEKCJI
app.controller('modifyController', ['$scope', '$http', function modifyController($scope, $http) {
    var ctrl = this;
  
    $scope.lekcja_szuk = function (array, d, s, gr) {
      var temp = array.findIndex((lesson) => lesson.day == d && lesson.start == s && lesson.grupa == gr);
      if (temp != -1) return array[temp];
      return null;
    };
      
    ctrl.update = function(prop, value) {
      ctrl.onUpdate({lekcja: ctrl.lekcja, prop: prop, value: value});
  
    };
  
    ctrl.updateLessonValue = function(lesson, prop, value) {
      lesson[prop] = value;
      ctrl.updateLesson(lesson);
    };
  
    $scope.edytowanie = function(lesson) {
      $scope.edyt = !$scope.edyt;
  };
    ctrl.updateLesson = function (lesson) {
  
      $http.post('/api/lessons/update', lesson).then(function (response) {
        console.log('Uupdated w konsoli przeglaadarki');
      });
    };  
   
  
  }]);