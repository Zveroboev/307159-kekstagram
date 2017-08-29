'use strict';

// Создание массива с постами на index.html
(function () {
  var POSTS = window.CONSTANS.POSTS_ATTRIBUTES;

  function getRandomComments(number) {
    var comments = [];
    var repeatedIndexes = [];

    for (var i = 0; i < number; i++) {
      do {
        var randomIndex = window.util.getRandomIndex(POSTS.PICTURES_COMMENTS.length);
      } while (repeatedIndexes.indexOf(randomIndex) !== -1);

      comments.push(POSTS.PICTURES_COMMENTS[randomIndex]);
      repeatedIndexes.push(randomIndex);
    }
    return comments;
  }

  function getPostsArray(number) {
    var postsArray = [];

    for (var i = 0; i < number; i++) {
      postsArray.push({
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.util.getRandomValueInRange(POSTS.MIN_LIKES, POSTS.MAX_LIKES),
        comment: getRandomComments(window.util.getRandomValueInRange(1, 2))
      });
    }
    return postsArray;
  }

  window.posts = getPostsArray(POSTS.PHOTO_QUANTITY);

})();
