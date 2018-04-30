
app.controller('lecturerController', ['$scope', '$http', function lecturerController($scope, $http) {
    var ctrl = this;
    $scope.lecturers = [];
    $scope.AllImages = [];
    ctrl.editShow = false;
    ctrl.deleteShow = false;
    ctrl.showAdd = false;
    ctrl.currentLecturer = {};
    ctrl.tempLessons = "";

    ctrl.newLecturer = {
      name: "",
      surname: "",
      title: "",
      lections: [],
      mail: "",
      id: null
    }

    
    
    ctrl.editLecturerHandler = function(lect){
      ctrl.editShow = !ctrl.editShow;
      ctrl.currentLecturer = lect;
    }

    ctrl.writeLessons = function(arr){
      let counter = 1;
      let tempStr = "";
      arr.map(str => {
        tempStr += str;        
        if(counter !== arr.length) {
          tempStr += ', '
          counter++;
        }
      })
      return tempStr;
    }

    ctrl.AddButtonHandler = function(){
      ctrl.newLecturer.id = ctrl.newId($scope.lecturers);
      let tempArr = ctrl.tempLessons.split(",");

      tempArr = tempArr.map(str => {
       return str.trim();      
      })
      ctrl.newLecturer.lections = tempArr;
      ctrl.addLecturer(ctrl.newLecturer);

      document.location.reload()
      
    }

    ctrl.addImage = function(Img){
      $http.post('/uploadImg', Img).then(function (response) {
        console.log('dodany img');
      });
    }

    ctrl.newId=function(array){
      let temp = 0;
        array.map((val, i) => {
          if(val.id > temp) temp = val.id;
        })
        return temp+1;
    };

    $('.custom-file-input').on('change', function() { 
    
      let fileName = $(this).val().split('\\').pop(); 
      $(this).next('.custom-file-label').addClass("selected").html(fileName); 
      var file = this.files[0];
      var fileType = file["type"];
      var ValidImageTypes = ["image/gif", "image/jpeg", "image/png", "image/jpg"];

      if ($.inArray(fileType, ValidImageTypes) < 0) {

        alert('Proszę wybrać plik graficzny')  
        $(this).next('.custom-file-label').removeClass("selected").html('Zdjęcie nie jest obowiązkowe');
        $(this).val('');
}

   });

   ctrl.addLecturer = function (lecturer) {
    $http.post('/api/lecturers/add', lecturer).then(function (response) {
      console.log('Added w konsoli przegladarki');
    });
  };

    ctrl.getFullTitle = function (lect){
      return lect.title + ' ' + lect.name + ' ' + lect.surname;
    }

    ctrl.deleteLecturerHandler = function(lect){
      ctrl.deleteShow = !ctrl.deleteShow;
      ctrl.currentLecturer = lect;
    }

    ctrl.deleteHandler = function(lect){
      
      ctrl.deleteLecturer(lect)
      document.location.reload()
    
    }

    ctrl.deleteLecturer = function (lect) {
      $http({
        method: 'DELETE',
        url: '/api/lecturers/delete',
        data: {
          id: lect.id
        },
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      })
        .then(function (response) {
          ctrl.lecturers = response.data;
          console.log("Deleted w konsoli przegladarki");
        }, function (rejection) {
          console.log(rejection.data);
        });
    };

    ctrl.getLecturers = function () {
      $http.get('/api/lecturers').then(function (response) {
        $scope.lecturers = response.data;
      });
    };

    
    ctrl.getImages = function(){
      $http.get('/api/getAllImages').then(function (response) {
        $scope.AllImages = response.data;
      });
    }

    
 

    ctrl.getImgPath = function(lect){
      const ImgDir = "../uploads/";
      let name = lect.name + '_' + lect.surname + '_' + lect.id;
      let ext,tmp,path;
        $scope.AllImages.map(str => {
           ext = str.substring(str.indexOf('.'), str.length);
           tmp = str.substring(0, str.indexOf('.'));
          if(name == tmp) path = ImgDir + tmp + ext;
        })
      if(path) return path;
      else return ImgDir + 'default.png';
    }
  }]);