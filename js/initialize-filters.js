'use strict';

(function () {
  var FILTER = window.CONSTANS.FILTER.EFFECTS;

  window.setFilter = function (element, value, callback) {
    var denominatorForChromeAndSepia = 100;
    var denominatorForPhobosAndHeat = 33.3;

    switch (element.className) {
      case FILTER.NONE:
        element.style.filter = '';
        break;
      case FILTER.CHROME:
        element.style.filter = 'grayscale(' + value / denominatorForChromeAndSepia + ')';
        break;
      case FILTER.SEPIA:
        element.style.filter = 'sepia(' + value / denominatorForChromeAndSepia + ')';
        break;
      case FILTER.MARVIN:
        element.style.filter = 'invert(' + value + '%)';
        break;
      case FILTER.PHOBOS:
        element.style.filter = 'blur(' + (value / denominatorForPhobosAndHeat).toFixed(1) + 'px)';
        break;
      case FILTER.HEAT:
        element.style.filter = 'brightness(' + (value / denominatorForPhobosAndHeat).toFixed(1) + ')';
        break;
    }
    callback();
  };

})();
