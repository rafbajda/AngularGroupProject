
// KONTROLLER DO DODAWANIA LEKCJI
app.controller('addController', ['$scope', '$http', function addController($scope, $http) {
    var ctrl = this;
    
    $("#AddButton").click(function() {
      $(".sa-success").addClass("hide");
      setTimeout(function() {
        $(".sa-success").removeClass("hide");
      }, 10);
      setTimeout(function() {
       ctrl.succesAnimation = false;
      }, 30)
    });
  ctrl.succesAnimation = false;

    ctrl.newlesson = {
      name: '',
      day: null,
      start: null,
      dur: null,
      grupa: null,
      ind: null,
      Lid: null
    };
  
   $scope.wart=function(){
  ctrl.newlesson.name=$scope.selected.name;
    };  
  
  $scope.nowyindex=function(array){
    var tibia =  0;
    var result = array.map(a => a.ind);
    for(i = 0; i<result.length; i++)
      if(result[i]>tibia)tibia=result[i];
    
  return tibia+1;
  };
  
    ctrl.addLesson = function (lesson) {
      $http.post('/api/lessons/add', lesson).then(function (response) {
        console.log('Added w konsoli przegladarki');
      });
    };
    
  }]);