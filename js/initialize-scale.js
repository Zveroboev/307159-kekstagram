'use strict';

(function () {
  var buttonInc = document.querySelector('.upload-resize-controls-button-inc');
  var buttonDec = document.querySelector('.upload-resize-controls-button-dec');

  window.incrementScale = function (element, callback) {
    buttonInc.addEventListener('click', function () {
      element.value = parseInt(element.value, 10) + parseInt(element.dataset.step, 10);
      if (element.value >= parseInt(element.dataset.max, 10)) {
        element.value = parseInt(element.dataset.max, 10);
      }
      callback(element.value);
    });
  };

  window.decrementScale = function (element, callback) {
    buttonDec.addEventListener('click', function () {
      element.value = parseInt(element.value, 10) - parseInt(element.dataset.step, 10);
      if (element.value <= parseInt(element.dataset.min, 10)) {
        element.value = parseInt(element.dataset.min, 10);
      }
      callback(element.value);
    });
  };
})();
