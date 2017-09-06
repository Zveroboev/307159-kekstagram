'use strict';

(function () {

  window.CONSTANS = {
    KEYCODES: {
      ESC_KEYCODE: 27,
      ENTER_KEYCODE: 13,
      SPACE_KEYCODE: 32
    },
    POSTS_ATTRIBUTES: {
      MIN_LIKES: 15,
      MAX_LIKES: 200,
      PHOTO_QUANTITY: 26,
      PICTURES_COMMENTS: [
        'Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
      ]
    },
    HASHTAGS_VALIDITY: {
      MAX_HASHTAG_LENGTH: 20,
      MAX_HASHTAGS_QUANTITY: 5
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
      if (evt.keyCode === window.CONSTANS.KEYCODES.ESC_KEYCODE) {
        action(evt);
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === window.CONSTANS.KEYCODES.ENTER_KEYCODE) {
        action(evt);
      }
    },
    getRandomValueInRange: function (min, max) {
      return Math.floor(Math.random() * ((max + 1) - min)) + min;
    },
    getRandomIndex: function (number) {
      return Math.floor(Math.random() * number);
    }
  };

})();
