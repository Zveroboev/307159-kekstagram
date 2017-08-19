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

function getRandomValue(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

function getRandomIndex(number) {
  return Math.floor(Math.random() * number);
}

function getRandomComments(number) {
  var comments = [];
  var repeatedIndex = -1;

  for (var i = 0; i < number; i++) {
    var randomIndex = getRandomIndex(PICTURES_COMMENTS.length);

    if (randomIndex === repeatedIndex) {
      for (var j = 0; ; j++) {
        randomIndex = getRandomIndex(PICTURES_COMMENTS.length);
        if (randomIndex !== repeatedIndex) {
          break;
        }
      }
      comments.push(PICTURES_COMMENTS[randomIndex]);
      repeatedIndex = randomIndex;
    } else {
      comments.push(PICTURES_COMMENTS[randomIndex]);
      repeatedIndex = randomIndex;
    }
  }
  return comments;
}

function getPostsArray(number) {
  var postsArray = [];

  for (var i = 0; i < number; i++) {
    postsArray.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomValue(MIN_LIKES, MAX_LIKES),
      comment: getRandomComments(getRandomValue(1, 2))
    });
  }
  return postsArray;
}

function renderPostStructure(posts) {
  var postStructure = document.querySelector('#picture-template').content.cloneNode(true);

  postStructure.querySelector('img').setAttribute('src', posts.url);
  postStructure.querySelector('.picture-likes').textContent = posts.likes;
  postStructure.querySelector('.picture-comments').textContent = posts.comment.length;

  return postStructure;
}

function showGallery(arrayElement) {
  var galleryElement = document.querySelector('.gallery-overlay');

  galleryElement.classList.remove('hidden');
  galleryElement.querySelector('.gallery-overlay-image').setAttribute('src', arrayElement.url);
  galleryElement.querySelector('.likes-count').textContent = arrayElement.likes;
  galleryElement.querySelector('.comments-count').textContent = arrayElement.comment.length;
}

function renderPosts() {
  var posts = getPostsArray(PHOTO_QUANTITY);
  var picturesElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTO_QUANTITY; i++) {
    fragment.appendChild(renderPostStructure(posts[i]));
  }
  picturesElement.appendChild(fragment);

  // showGallery(posts[0]);
}

renderPosts();

