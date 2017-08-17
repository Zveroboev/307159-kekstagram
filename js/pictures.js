'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var NUMBER_PHOTOS = 25;
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

function getPostsArray(number) {
  var postsArray = [];

  for (var i = 0; i < number; i++) {
    postsArray.push({
      url: 'photos/{{' + (i + 1) + '}}.jpg',
      likes: getRandomValue(MIN_LIKES, MAX_LIKES),
      comment: PICTURES_COMMENTS[getRandomIndex(PICTURES_COMMENTS.length)]
    });
  }
  return postsArray;
}

function renderPost(posts) {
  var postElement = pictureTemplate.cloneNode(true);

  postElement.querySelector('img').setAttribute('src', posts.url);
  postElement.querySelector('.picture-likes').textContent = posts.likes;
  postElement.querySelector('.picture-comments').textContent = posts.comment;
  return postElement;
}

var posts = getPostsArray(NUMBER_PHOTOS);
var pictureTemplate = document.querySelector('#picture-template').content;
