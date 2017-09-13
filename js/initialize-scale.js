'use strict';

(function () {

  window.pressIncrementScale = function (element, callback) {
    element.value = parseInt(element.value, 10) + parseInt(element.dataset.step, 10);
    if (element.value >= parseInt(element.dataset.max, 10)) {
      element.value = parseInt(element.dataset.max, 10);
    }
    callback(element.value);
  };


  window.pressDecrementScale = function (element, callback) {
    element.value = parseInt(element.value, 10) - parseInt(element.dataset.step, 10);
    if (element.value <= parseInt(element.dataset.min, 10)) {
      element.value = parseInt(element.dataset.min, 10);
    }
    callback(element.value);
  };

})();
