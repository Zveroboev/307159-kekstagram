'use strict';

(function () {

  window.sorting = function (array, sorting, callback) {
    var sortedArray = sorting(array);

    callback(sortedArray);
  };
})();
