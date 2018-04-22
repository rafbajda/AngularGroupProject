

var app = angular.module('myApp', ['ngRoute']);
//FILTRY
//Uzywany przy dodawaniu lekcji aby z listy były tylko unikalne wartosci
app.filter('unique', function() {

  return function (arr, field) {
    var o = {}, i, l = arr.length, r = [];
    for(i=0; i<l;i+=1) {
      o[arr[i][field]] = arr[i];
    }
    for(i in o) {
      r.push(o[i]);
    }
    return r;
  };
});
//Przy wyswietlaniu aby pokazac tylko konkretny dzien lub konkretna grupe
app.filter('oneDay', function() {

  return function (arr, day) {
    if(!day)return arr;
    var filtered = [];
    for(var i=0; i<arr.length; i++){
      for(var j=0; j<day.length; j++)
      if(day[j]==arr[i])filtered.push(arr[i]);
    }
    return filtered;
  };
});

//KOMPONENTY
app.component('wyswietl',{
    
  templateUrl:'views/wyswietl.html',
  controller:'modifyController',
  bindings: {
      lekcje: '='
    }
});

app.component('wyswietl1',{
  
  templateUrl:'views/wyswietljednego.html',
  controller:'modifyController',
  bindings: {
      
      lekcja: '<',
      onDelete: '&',
      onUpdate: '&'
    }
});


app.component('editableField', {
  templateUrl: 'views/edytowanie.html',
  controller: 'editController',
  bindings: {
    index: '<',
    fieldValue: '<',
    fieldType: '@?',
    onUpdate: '&'
  }
});




// KONFIGURACJA ROUTING
app.config(function ($routeProvider) {
  $routeProvider.when('/lekcje', {
    controller: 'mainController',
    templateUrl: 'views/lessons.html'
  })
    .when('/dodaj', {
      controller: 'mainController',
      templateUrl: 'views/dodaj.html'
    })
    .when('/edytuj', {
      controller: 'mainController',
      templateUrl: 'views/edytuj.html'
    })
    .when('/usun', {
      controller: 'mainController',
      templateUrl: 'views/usun.html'
    });

});

