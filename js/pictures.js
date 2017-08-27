'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var PHOTO_QUANTITY = 26;
var PICTURES_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var KEYCODES = {
  ESC_KEYCODE: 27,
  ENTER_KEYCODE: 13
};

var HASH_TAGS_VALIDITY = {
  MAX_LENGTH: 20,
  MAX_HASHTAGS: 5
};

function hideBodyScroll() {
  document.body.style.overflow = 'hidden';
}

function showBodyScroll() {
  document.body.style.overflow = 'auto';
}

// Создание постов на index.html
function getRandomValueInRange(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

function getRandomIndex(number) {
  return Math.floor(Math.random() * number);
}

function getRandomComments(number) {
  var comments = [];
  var repeatedIndexes = [];

  for (var i = 0; i < number; i++) {
    do {
      var randomIndex = getRandomIndex(PICTURES_COMMENTS.length);
    } while (repeatedIndexes.indexOf(randomIndex) !== -1);

    comments.push(PICTURES_COMMENTS[randomIndex]);
    repeatedIndexes.push(randomIndex);
  }
  return comments;
}

function getPostsArray(number) {
  var postsArray = [];

  for (var i = 0; i < number; i++) {
    postsArray.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomValueInRange(MIN_LIKES, MAX_LIKES),
      comment: getRandomComments(getRandomValueInRange(1, 2))
    });
  }
  return postsArray;
}

function renderPostStructure(posts) {
  var postStructure = document.querySelector('#picture-template').content.cloneNode(true);

  postStructure.querySelector('img').setAttribute('src', posts.url);
  postStructure.querySelector('.picture-likes').textContent = posts.likes.toString();
  postStructure.querySelector('.picture-comments').textContent = posts.comment.length.toString();

  return postStructure;
}

function renderPosts() {
  var posts = getPostsArray(PHOTO_QUANTITY);
  var picturesElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTO_QUANTITY; i++) {
    fragment.appendChild(renderPostStructure(posts[i]));
  }
  picturesElement.appendChild(fragment);

  return posts;
}

renderPosts();

/* ....................................................................... */

// Открытие Попапа с постом по клику на этот пост
function openPopup(evt) {
  var target = evt.target;

  while (target.parentNode !== evt.currentTarget) {
    target = target.parentNode;
    if (target.classList.contains('picture')) {
      renderPopup(target);
      addEventsForOpeningPopup();
      hideBodyScroll();
      return;
    }
  }

}

function closePopup() {
  document.querySelector('.gallery-overlay').classList.add('hidden');
  addEventsForClosingPopup();
  showBodyScroll();
}

function openPopupOnKeyDown(evt) {
  if (evt.keyCode === KEYCODES.ENTER_KEYCODE) {
    openPopup(evt);
  }
}

function closePopupOnKeyDown(evt) {
  if (evt.keyCode === KEYCODES.ENTER_KEYCODE) {
    closePopup();
  }
}

function closePopupOnPressEsc(evt) {
  if (evt.keyCode === KEYCODES.ESC_KEYCODE) {
    closePopup();
  }
}

function addEventsForOpeningPopup() {
  // Вешаю обработчики закрытия
  document.querySelector('.gallery-overlay-close').addEventListener('click', closePopup);
  document.querySelector('.gallery-overlay-close').addEventListener('keydown', closePopupOnKeyDown);
  document.addEventListener('keydown', closePopupOnPressEsc);
  // Удаляю обработчики открытия
  picturesContainer.removeEventListener('click', openPopup);
  picturesContainer.removeEventListener('keydown', openPopupOnKeyDown);
}

function addEventsForClosingPopup() {
  // Вешаю обработчики открытия
  picturesContainer.addEventListener('click', openPopup);
  picturesContainer.addEventListener('keydown', openPopupOnKeyDown);
  // Удаляю обработчики закрытия
  document.querySelector('.gallery-overlay-close').removeEventListener('click', closePopup);
  document.querySelector('.gallery-overlay-close').removeEventListener('keydown', closePopupOnKeyDown);
  document.removeEventListener('keydown', closePopupOnPressEsc);
}

function renderPopup(element) {
  var targetSrcIMG = element.querySelector('img').getAttribute('src');
  var targetLikesCount = element.querySelector('.picture-likes').textContent;
  var targetCommentsCount = element.querySelector('.picture-comments').textContent;
  var galleryElement = document.querySelector('.gallery-overlay');

  galleryElement.querySelector('.gallery-overlay-image').setAttribute('src', targetSrcIMG);
  galleryElement.querySelector('.likes-count').textContent = targetLikesCount;
  galleryElement.querySelector('.comments-count').textContent = targetCommentsCount;
  galleryElement.classList.remove('hidden');
}

var picturesContainer = document.querySelector('.pictures');

picturesContainer.addEventListener('click', openPopup);
picturesContainer.addEventListener('keydown', openPopupOnKeyDown);

/* ....................................................................... */
// Открытие формы обработки загруженной фотографии
var inputFile = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.upload-form');
var uploadFormCancel = uploadForm.querySelector('.upload-form-cancel');

var inputResize = uploadForm.querySelector('.upload-resize-controls-value');
var uploadFormControls = uploadForm.querySelector('.upload-effect-controls');

var inputDescription = uploadForm.querySelector('.upload-form-description');
var inputHashtags = uploadForm.querySelector('.upload-form-hashtags');


function openUploadOverlay() {
  uploadForm.querySelector('img').className = 'effect-none';
  uploadForm.querySelector('.upload-image').classList.add('hidden');
  uploadForm.querySelector('.upload-overlay').classList.remove('hidden');

  // Вешаю обработчики закрытия
  uploadFormCancel.addEventListener('click', closeUploadOverlay);
  uploadFormCancel.addEventListener('keydown', closeUploadOverlayOnKeyDown);
  document.addEventListener('keydown', closeUploadOverlayOnPressEsc);

  setInputAction(inputResize);
  hideBodyScroll();
}

function closeUploadOverlay() {
  uploadForm.querySelector('img').style.transform = 'scale(1)';
  uploadForm.querySelector('.upload-image').classList.remove('hidden');
  uploadForm.querySelector('.upload-overlay').classList.add('hidden');

  // Удаляю обработчики закрытия
  uploadFormCancel.removeEventListener('click', closeUploadOverlay);
  uploadFormCancel.removeEventListener('keydown', closeUploadOverlayOnKeyDown);
  document.removeEventListener('keydown', closeUploadOverlayOnPressEsc);

  removeInputAction(inputResize);
  showBodyScroll();
}

function closeUploadOverlayOnKeyDown(evt) {
  if (evt.keyCode === KEYCODES.ENTER_KEYCODE) {
    closeUploadOverlay();
  }
}

function closeUploadOverlayOnPressEsc(evt) {
  if (evt.keyCode === KEYCODES.ESC_KEYCODE && evt.target !== inputDescription && evt.target !== inputHashtags) {
    closeUploadOverlay();
  }
}

inputFile.addEventListener('change', openUploadOverlay);

// Наложение фильтров на фотографию
function setPhotoFilter(evt) {
  uploadForm.querySelector('img').className = evt.target.dataset.filter;
}

uploadFormControls.addEventListener('change', setPhotoFilter);

// Логика работы input'a изменения масштаба
function setInputAction() {
  var buttonInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var buttonDec = uploadForm.querySelector('.upload-resize-controls-button-dec');

  buttonInc.addEventListener('click', onButtonClickIncrementValue);
  buttonDec.addEventListener('click', onButtonClickDecrementValue);
}

function removeInputAction() {
  var buttonInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var buttonDec = uploadForm.querySelector('.upload-resize-controls-button-dec');

  buttonInc.removeEventListener('click', onButtonClickIncrementValue);
  buttonDec.removeEventListener('click', onButtonClickDecrementValue);

  inputResize.value = inputResize.dataset.min;
}

function onButtonClickIncrementValue() {
  inputResize.value = parseInt(inputResize.value, 10) + parseInt(inputResize.dataset.step, 10);
  if (inputResize.value >= parseInt(inputResize.dataset.max, 10)) {
    inputResize.value = parseInt(inputResize.dataset.max, 10);
  }
  resizeImage(inputResize.value);
}

function onButtonClickDecrementValue() {
  inputResize.value = parseInt(inputResize.value, 10) - parseInt(inputResize.dataset.step, 10);
  if (inputResize.value <= parseInt(inputResize.dataset.min, 10)) {
    inputResize.value = parseInt(inputResize.dataset.min, 10);
  }
  resizeImage(inputResize.value);
}

function resizeImage(value) {
  uploadForm.querySelector('img').style.transform = 'scale(' + value / 100 + ')';
}


// Валидация input'ов
function sayAboutValidity(evt) {
  if (evt.target === inputDescription) {
    sayAboutValidityDescription(evt);
  } else if (evt.target === inputHashtags) {
    sayAboutValidityHashtags(evt);
  }
}

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

function sayAboutValidityHashtags(evt) {
  var arrayWithHastags = evt.target.value.split(' ');

  if (arrayWithHastags.length > HASH_TAGS_VALIDITY.MAX_HASHTAGS) {
    evt.target.setCustomValidity('Максимум можно использовать' + HASH_TAGS_VALIDITY.MAX_HASHTAGS + 'хеш-тегов');
  } else if (hasLongElements(arrayWithHastags, HASH_TAGS_VALIDITY.MAX_LENGTH)) {
    evt.target.setCustomValidity('Максимальная длина одного хэш-тега' + HASH_TAGS_VALIDITY.MAX_LENGTH + 'символов');
  } else if (hasElementsWithoutSharp(arrayWithHastags) && arrayWithHastags.toString()) {
    evt.target.setCustomValidity('Хэш-тег начинается с символа `#`');
  } else if (hasElementsWithSeveralSharp(arrayWithHastags)) {
    evt.target.setCustomValidity('Хэш-теги разделяются пробелами');
  } else if (hasDuplicateElement(arrayWithHastags)) {
    evt.target.setCustomValidity('Хэш-теги не должны повторяться');
  } else {
    evt.target.setCustomValidity('');
  }
}

function hasLongElements(array, maxLength) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].length > maxLength) {
      return true;
    }
  }
  return false;
}

function hasElementsWithoutSharp(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].slice(0, 1) !== '#') {
      return true;
    }
  }
  return false;
}

function hasElementsWithSeveralSharp(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].indexOf('#', 1) !== -1) {
      return true;
    }
  }
  return false;
}

function hasDuplicateElement(array) {
  var obj = {};

  for (var i = 0; i < array.length; i++) {
    if (obj[array[i]]) {
      return true;
    }
    obj[array[i]] = true;
  }
  return false;
}

uploadForm.addEventListener('input', sayAboutValidity);
