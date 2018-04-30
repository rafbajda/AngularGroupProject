//GLOWNY KONTROLLER (WYSWIETLANIE)
app.controller('mainController', ['$scope', '$http','$route', function mainController($scope, $http, $route) {
    var ctrl = this;

    ctrl.temp = true;
    ctrl.editShow = false;
    ctrl.LessonToDelete = {};
    ctrl.DeleteInformation = "";
    ctrl.lessons = [];
    ctrl.AllLecturers = [];
    $scope.lecturers = [];
    $scope.chosenLect;
    $scope.dni = [1,2,3,4,5];
    $scope.godziny = [8, 9, 10, 11, 12, 13, 14];
    $scope.grupy = [1, 2, 3];

    $scope.lekcja = function (array, d, s, gr) {
      var temp = array.findIndex((lesson) => lesson.day == d && lesson.start == s && lesson.grupa == gr);
      if (temp != -1) return array[temp];
      return null;
    };   

  ctrl.updateChosenLect = function(id){
   $scope.chosenLect = id;
  }
  ctrl.getAllLecturers = function(lect){
      console.log($scope.lecturers)
      ctrl.AllLecturers = [];
      $scope.lecturers.map(lect => {
        ctrl.AllLecturers.push(
          {
          fullTitle: lect.title + ' ' + lect.name + ' ' + lect.surname,
          id: lect.id
          }
        );
      })
    }
   

    ctrl.getLecturers = function () {
      console.log('pobieram wykladowcow')
      $http.get('/api/lecturers').then(function (response) {
        $scope.lecturers = response.data;
        ctrl.getAllLecturers();
      });
      
    };

    $('#carousel1').carousel({
      interval: 2300
    })
    $('#carousel2').carousel({
      interval: 3100
    })

    $(function() {
      $('.scroll-down').click (function() {
        var temp = $('#footer').offset().top;
        if(temp){
          $('html, body').animate({scrollTop: temp }, 'slow');
          return false;
        }
      
      });
    });
  
  
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

    $("#GroupDropdown a").click(function(){
      let selText = $(this).text();   
      console.log(selText)
      $("#GroupDropdownMenuButton").html(selText)
    });

    $("#LectDropdown a").click(function(){
      let selText = $(this).text();    
            
      $("#LectDropdownMenuButton").html(selText)
    });


    $("#DayDropdown a").click(function(){
      let selText = $(this).text();    
      console.log(selText)
      $("#DropdownMenuButton").html(selText)
    });

    ctrl.editHandler = function(lekcja){
      console.log('jestem')
      ctrl.LessonToDelete = lekcja;
      $ctrl.editShow = !$ctrl.editShow

    }
 
    ctrl.clickHandler = function(lekcja){
      ctrl.LessonToDelete = lekcja;
      let tempDay = lekcja.day;
      switch(tempDay){
          case 1:
        tempDay = "poniedziałek"
        break;
          case 2:
        tempDay = "wtorek"
        break;
          case 3:
        tempDay = "środa"
        break;
          case 4:
        tempDay = "czwartek" 
        break;       
          default:
        tempDay = "piątek"
        break;
      }
      let duration = lekcja.start + ':15-' + (lekcja.start + lekcja.dur) + ':15';
      ctrl.DeleteInformation = lekcja.grupa + ' grupa, ' + tempDay + ' ' + duration;
      ctrl.temp = !ctrl.temp;    
      
    }
    ctrl.deleteHandler = function(){
      ctrl.deleteLesson(ctrl.LessonToDelete)
      ctrl.temp = !ctrl.temp;
    }

    

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
     
    ctrl.getLecturerName = function (id) {
      let temp;
      $scope.lecturers.map(lect => {
        if(id == lect.id) temp = lect.title + ' ' + lect.name + ' ' + lect.surname;
      })
      if(temp) {
        return temp
      } else return ''
    }

    
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