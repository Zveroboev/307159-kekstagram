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

function openPopup(evt) {
  debugger;
  var target = evt.target;

  while (target.parentNode !== evt.currentTarget) {
    target = target.parentNode;
    if (target.tagName === 'A' && target.classList.contains('picture')) {
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
    openPopup(evt); // если не передаю событие, то дальше evt.target = undef
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
