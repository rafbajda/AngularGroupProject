// FUNKCJA DO EDITABLE FIELD Z WYKŁADU
app.controller('editController', function editController($scope, $element, $attrs) {
    var ctrl = this;
  
    ctrl.kolizja = function (array, index, prop, value) {
      var t = array.findIndex((lesson) => lesson.ind == index);
      var temp=-1;
      var temp2=-1;
      var temp3=-1;
      if (t == -1) {return false; console.log('Nie znalazło lekcji takiej');}
      if(prop=='day'){
      var temp = array.findIndex((lesson) =>lesson.ind !=index && lesson.day == value && lesson.start == array[t].start && lesson.grupa == array[t].grupa);
      var temp2 = array.findIndex((lesson) =>lesson.ind !=index && lesson.day == value && lesson.start == array[t].start-1 && lesson.grupa == array[t].grupa && lesson.dur == 2);
        if(array[t].dur==2) var temp3 = array.findIndex((lesson) =>lesson.ind !=index && lesson.day == value && lesson.start == array[t].start+1 && lesson.grupa == array[t].grupa);
    }
      if(prop=='start'){
        var temp = array.findIndex((lesson) =>lesson.ind !=index && lesson.day == array[t].day && lesson.start == value && lesson.grupa == array[t].grupa);
        var temp2 = array.findIndex((lesson) =>lesson.ind !=index && lesson.day == array[t].day && lesson.start == value-1 && lesson.grupa == array[t].grupa && lesson.dur == 2);
        if(array[t].dur==2) var temp3 = array.findIndex((lesson) =>lesson.ind !=index && lesson.day == array[t].day && lesson.start == value+1 && lesson.grupa == array[t].grupa);}
      if(prop=='grupa'){
        var temp = array.findIndex((lesson) =>lesson.ind !=index && lesson.day == array[t].day && lesson.start == array[t].start && lesson.grupa == value);
        var temp2 = array.findIndex((lesson) =>lesson.ind !=index && lesson.day == array[t].day && lesson.start == array[t].start-1 && lesson.grupa == value && lesson.dur == 2);
        if(array[t].dur==2) var temp3 = array.findIndex((lesson) =>lesson.ind !=index && lesson.day == array[t].day && lesson.start == array[t].start+1 && lesson.grupa == value);}
  
      if(prop=='dur'&&value==2){
        var temp2 = array.findIndex((lesson) =>lesson.ind !=index && lesson.day == array[t].day && lesson.start == array[t].start+1 && lesson.grupa == array[t].grupa);}
      if (temp != -1 || temp2 != -1 ||temp3!=-1) return true;
      return false;
    };
   
    ctrl.handleModeChange = function() {
      if (ctrl.editMode) {
        ctrl.onUpdate({value: ctrl.fieldValue});
        ctrl.fieldValueCopy = ctrl.fieldValue;
      }
      ctrl.editMode = !ctrl.editMode;
    };
  
    ctrl.reset = function() {
      ctrl.fieldValue = ctrl.fieldValueCopy;
    };
  
    ctrl.$onInit = function() {
      // Make a copy of the initial value to be able to reset it later
      ctrl.fieldValueCopy = ctrl.fieldValue;
  
      // Set a default fieldType
      if (!ctrl.fieldType) {
        ctrl.fieldType = 'text';
      }
    };
  })