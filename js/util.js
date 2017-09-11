'use strict';

(function () {

  function showError(errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 100;
    node.style.margin = '0 auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'yellow';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = 'black';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.CONSTANS = {
    KEYCODES: {
      ESC: 27,
      ENTER: 13
    },
    HASHTAGS_VALIDITY: {
      MAX_LENGTH: 20,
      MAX_QUANTITY: 5
    },
    FILTER: {
      MIN_VALUE: 0,
      MAX_VALUE: 100,
      INITIAL_VALUE: parseInt(getComputedStyle(document.querySelector('.upload-effect-level-pin')).left, 10),
      EFFECTS: {
        NONE: 'effect-none',
        CHROME: 'effect-chrome',
        SEPIA: 'effect-sepia',
        MARVIN: 'effect-marvin',
        PHOBOS: 'effect-phobos',
        HEAT: 'effect-heat'
      }
    },
    POSTS: {
      QUANTITY_RANDOM_FILTER: 16,
      RECOMENDED_FILTER: 'recommend',
      POPULAR_FILTER: 'popular',
      DISCUSSED_FILTER: 'discussed',
      RANDOM_FILTER: 'random'
    }
  };

  window.util = {
    hideBodyScroll: function () {
      document.body.style.overflow = 'hidden';
    },
    showBodyScroll: function () {
      document.body.style.overflow = 'auto';
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.CONSTANS.KEYCODES.ESC) {
        action(evt);
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === window.CONSTANS.KEYCODES.ENTER) {
        action(evt);
      }
    },
    getRandomIndex: function (number) {
      return Math.floor(Math.random() * number);
    },
    showError: showError
  };

})();
