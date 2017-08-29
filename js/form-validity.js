'use strict';
(function () {

  // Дополнительные функции для валидации хеш-тегов
  var validity = {
    hasLongElements: function (array, maxLength) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].length > maxLength) {
          return true;
        }
      }
      return false;
    },
    hasElementsWithoutSharp: function (array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].slice(0, 1) !== '#' && array[i].trim().length > 0) {
          return true;
        }
      }
      return false;
    },
    hasElementsWithSeveralSharp: function (array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].indexOf('#', 1) !== -1) {
          return true;
        }
      }
      return false;
    },
    hasDuplicateElement: function (array) {
      var obj = {};

      for (var i = 0; i < array.length; i++) {
        if (obj[array[i]]) {
          return true;
        }
        obj[array[i]] = true;
      }
      return false;
    }
  };

// Валидация текстового поля ввода комментария
  function sayAboutValidityDescription(evt) {
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Поле должно содержать минимум: ' + evt.target.minLength + ' символов');
    } else if (evt.target.validity.tooLong) {
      evt.target.setCustomValidity('Поле должно содержать максимум: ' + evt.target.maxLength + ' символов');
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity('Введите комментарий');
    } else {
      evt.target.setCustomValidity('');
    }
  }

  var HASHTAG = window.CONSTANS.HASHTAGS_VALIDITY;

// Валидация поля ввода хеш-тегов
  function sayAboutValidityHashtags(evt) {
    // Запрет ввода пробела первым символом
    if (evt.target.value === ' ') {
      evt.target.value = '';
    }

    var arrayWithHashtags = evt.target.value.split(' ');

    if (arrayWithHashtags.length > HASHTAG.MAX_HASHTAGS_QUANTITY) {
      evt.target.setCustomValidity('Максимум можно использовать' + HASHTAG.MAX_HASHTAGS_QUANTITY + 'хеш-тегов');
    } else if (validity.hasLongElements(arrayWithHashtags, HASHTAG.MAX_HASHTAG_LENGTH)) {
      evt.target.setCustomValidity('Максимальная длина одного хэш-тега' + HASHTAG.MAX_HASHTAG_LENGTH + 'символов');
    } else if (validity.hasElementsWithoutSharp(arrayWithHashtags)) {
      evt.target.setCustomValidity('Хэш-тег начинается с символа `#`');
    } else if (validity.hasElementsWithSeveralSharp(arrayWithHashtags)) {
      evt.target.setCustomValidity('Хэш-теги разделяются пробелами');
    } else if (validity.hasDuplicateElement(arrayWithHashtags)) {
      evt.target.setCustomValidity('Хэш-теги не должны повторяться');
    } else {
      evt.target.setCustomValidity('');
    }
  }

  window.sayAboutValidity = function (evt) {
    if (evt.target === window.inputDescription) {
      sayAboutValidityDescription(evt);
    } else if (evt.target === window.inputHashtags) {
      sayAboutValidityHashtags(evt);
    }
  };

})();
