'use strict';

(function () {

  function showError(errorMessage, method) {
    var node = document.createElement('div');

    node.textContent = errorMessage;
    node.classList.add('error-message');
    document.body.insertAdjacentElement('afterbegin', node);
    if (method === 'POST') {
      setTimeout(function () {
        node.parentNode.removeChild(node);
      }, 5000);
    }
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
      GET_INITIAL_VALUE: parseInt(getComputedStyle(document.querySelector('.upload-effect-level-pin')).left, 10),
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
    pressEsc: function (evt, action) {
      if (evt.keyCode === window.CONSTANS.KEYCODES.ESC) {
        action(evt);
      }
    },
    pressEnter: function (evt, action) {
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
