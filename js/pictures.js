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

// Создание постов на index.html
function getRandomValueInRange(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

function getRandomIndex(number) {
  return Math.floor(Math.random() * number);
}

function getReplacedElements(array) {
  var count = {};
  var res = 0;

  for (var i = 0; i < array.length; i++) {
    count[array[i]] = ~~count[array[i]] + 1;
  }

  for (i in count) {
    if (count.hasOwnProperty(i) && count[i] > 1) {
      res += count[i];
    }
  }

  return res;
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
    if (target.tagName.toLowerCase() === 'a' && target.classList.contains('picture')) {
      renderPopup(target);
      addEventsForOpeningPopup();
      return;
    }
  }

}

function closePopup() {
  document.querySelector('.gallery-overlay').classList.add('hidden');
  addEventsForClosingPopup();
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
  uploadForm.querySelector('.upload-image').classList.add('hidden');
  uploadForm.querySelector('.upload-overlay').classList.remove('hidden');

  // Вешаю обработчики закрытия
  uploadFormCancel.addEventListener('click', closeUploadOverlay);
  uploadFormCancel.addEventListener('keydown', closeUploadOverlayOnKeyDown);
  document.addEventListener('keydown', closeUploadOverlayOnPressEsc);

  setInputAction(inputResize);
}

function closeUploadOverlay() {
  uploadForm.querySelector('.upload-image').classList.remove('hidden');
  uploadForm.querySelector('.upload-overlay').classList.add('hidden');

  // Удаляю обработчики закрытия
  uploadFormCancel.removeEventListener('click', closeUploadOverlay);
  uploadFormCancel.removeEventListener('keydown', closeUploadOverlayOnKeyDown);
  document.removeEventListener('keydown', closeUploadOverlayOnPressEsc);

  removeInputAction(inputResize);
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
  var deletedFromValueId = 'upload-';

  uploadForm.querySelector('img').className = evt.target.getAttribute('id').substring(deletedFromValueId.length);
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
  resizeImage();
}

function onButtonClickDecrementValue() {
  inputResize.value = parseInt(inputResize.value, 10) - parseInt(inputResize.dataset.step, 10);
  if (inputResize.value <= parseInt(inputResize.dataset.min, 10)) {
    inputResize.value = parseInt(inputResize.dataset.min, 10);
  }
  resizeImage();
}

function resizeImage() {
  uploadForm.querySelector('img').style.transform = 'scale(' + inputResize.value / 100 + ')';
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
  var longHastags = 0;
  var withoutSharp = 0;
  var severalSharp = 0;

  for (var i = 0; i < arrayWithHastags.length; i++) {
    if (arrayWithHastags[i].length > 20) {
      longHastags++;
    } else if (arrayWithHastags[i].slice(0, 1) !== '#') {
      withoutSharp++;
    } else if (arrayWithHastags[i].indexOf('#', 1) !== -1) {
      severalSharp++;
    }
  }

  if (arrayWithHastags.length > 5) {
    evt.target.setCustomValidity('Максимум можно использовать 5 хеш-тегов');
  } else if (longHastags > 0) {
    evt.target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
  } else if (withoutSharp > 0) {
    evt.target.setCustomValidity('Хэш-тег начинается с символа `#`');
  } else if (severalSharp > 0) {
    evt.target.setCustomValidity('Хэш-теги разделяются пробелами');
  } else if (getReplacedElements(arrayWithHastags) > 0) {
    evt.target.setCustomValidity('Хэш-теги не должны повторяться');
  } else {
    evt.target.setCustomValidity('');
  }
}

uploadForm.addEventListener('input', sayAboutValidity);
