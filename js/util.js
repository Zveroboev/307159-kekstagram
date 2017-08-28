'use strict';

(function () {

  window.POSTS_ATTRIBUTES = {
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
    ],
    MAX_HASHTAG_LENGTH: 20,
    MAX_HASHTAGS_QUANTITY: 5
  };


  var KEYCODES = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    SPACE_KEYCODE: 32
  };

  window.util = {
    hideBodyScroll: function () {
      document.body.style.overflow = 'hidden';
    },
    showBodyScroll: function () {
      document.body.style.overflow = 'auto';
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEYCODES.ESC_KEYCODE) {
        action(evt);
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEYCODES.ENTER_KEYCODE) {
        action(evt);
      }
    },
    isSpaceEvent: function (evt, action) {
      if (evt.keyCode === KEYCODES.SPACE_KEYCODE) {
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
