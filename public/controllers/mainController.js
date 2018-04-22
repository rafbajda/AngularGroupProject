//GLOWNY KONTROLLER (WYSWIETLANIE)
app.controller('mainController', ['$scope', '$http','$route', function mainController($scope, $http, $route) {
    var ctrl = this;
    ctrl.lessons = [];
    $scope.dni = [1,2,3,4,5];
    $scope.godziny = [8, 9, 10, 11, 12, 13, 14];
    $scope.grupy = [1, 2, 3];
    $scope.lekcja = function (array, d, s, gr) {
      var temp = array.findIndex((lesson) => lesson.day == d && lesson.start == s && lesson.grupa == gr);
      if (temp != -1) return array[temp];
      return null;
    };    

    ctrl.getDayName = function(day){
      switch(day){
        case 1:
          return "poniedziałek"
        case 2:
          return "wtorek"
        case 3:
          return "środa"
        case 4:
          return "czwartek"        
        default:
          return "piątek"
      }
    }
    

    $("#DayDropdown a").click(function(){
      let selText = $(this).text();    
      console.log(selText)
      $("#DropdownMenuButton").html(selText)
    });

    // $("#DeleteLessonCell").click(function(){
    //  console.log('works')
    //   // $("#GroupDropdownMenuButton").html(selText)
    // });

    $("#GroupDropdown a").click(function(){
      let selText = $(this).text();   
      console.log(selText)
      
      $("#GroupDropdownMenuButton").html(selText)
    });

  ctrl.reloadData = function(){
    $route.reload();
  }
  
    $scope.kolidacja = function (array, d, s, gr, dur) {
      temp3=-1;
      var temp = array.findIndex((lesson) => lesson.day == d && lesson.start == s && lesson.grupa == gr);
      var temp2 = array.findIndex((lesson) => lesson.day == d && lesson.start == s-1 && lesson.grupa == gr && lesson.dur==2);
      if(dur==2) var temp3 = array.findIndex((lesson) => lesson.day == d && lesson.start == s+1 && lesson.grupa == gr);
      if (temp != -1 || temp2 != -1 || temp3!=-1) return true;
      return false;
    };
  
    ctrl.getLessons = function () {
      $http.get('/api/lessons').then(function (response) {
        ctrl.lessons = response.data;
        console.log('Pobrano lekcje w konsoli przegladarki');
      });
    };
      
    // ctrl.DeleteHandler = function(){
    //   console.log('xd');
    // }
  
    // ctrl.delete = function() {
    //     ctrl.onDelete({lekcja: ctrl.lekcja});
    //   };
      

    
    ctrl.deleteLesson = function (lesson) {
        $http({
          method: 'DELETE',
          url: '/api/lessons/delete',
          data: {
            day: lesson.day,
            start: lesson.start,
            grupa: lesson.grupa
          },
          headers: {
            'Content-type': 'application/json;charset=utf-8'
          }
        })
          .then(function (response) {
            ctrl.lessons = response.data;
            console.log("Deleted w konsoli przegladarki");
          }, function (rejection) {
            console.log(rejection.data);
          });
      };
  
  }]);