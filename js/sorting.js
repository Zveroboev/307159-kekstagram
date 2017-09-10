'use strict';

(function () {

  window.sorting = function (array, sorting, callback, quantity) {
    var sortedArray = sorting(array, quantity);

    callback(sortedArray);
  };
})();
