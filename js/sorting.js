'use strict';

(function () {

  window.getSortedArray = function (array, sorting, callback) {
    callback(sorting(array));
  };

})();
