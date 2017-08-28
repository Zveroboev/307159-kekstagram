'use strict';

// Создание массива с постами на index.html
(function () {

  window.posts = getPostsArray(window.POSTS_ATTRIBUTES.PHOTO_QUANTITY);

  function getRandomComments(number) {
    var comments = [];
    var repeatedIndexes = [];

    for (var i = 0; i < number; i++) {
      do {
        var randomIndex = window.util.getRandomIndex(window.POSTS_ATTRIBUTES.PICTURES_COMMENTS.length);
      } while (repeatedIndexes.indexOf(randomIndex) !== -1);

      comments.push(window.POSTS_ATTRIBUTES.PICTURES_COMMENTS[randomIndex]);
      repeatedIndexes.push(randomIndex);
    }
    return comments;
  }

  function getPostsArray(number) {
    var postsArray = [];

    for (var i = 0; i < number; i++) {
      postsArray.push({
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.util.getRandomValueInRange(window.POSTS_ATTRIBUTES.MIN_LIKES, window.POSTS_ATTRIBUTES.MAX_LIKES),
        comment: getRandomComments(window.util.getRandomValueInRange(1, 2))
      });
    }
    return postsArray;
  }

})();
