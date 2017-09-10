'use strict';

// Отрисовка миниатюры с постами на index.html
(function () {
  var QUANTITY_RANDOM_POSTS = 16;
  var RECOMENDED_FILTER = 'recommend';
  var POPULAR_FILTER = 'popular';
  var DISCUSSED_FILTER = 'discussed';
  var RANDOM_FILTER = 'random';

  var posts = [];
  var filters = document.querySelector('.filters');

  function getPopularSortedArray(array) {
    return array.slice(0).sort(function (left, right) {
      return right.likes - left.likes;
    });
  }

  function getDiscussedSortedArray(array) {
    return array.slice(0).sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
  }

  function getRandomSortedArray(array, quantity) {
    quantity = quantity > array.length ? array.length : quantity;

    var sortedArray = [];
    var repeatedIndexes = [];

    for (var i = 0; i < quantity; i++) {
      do {
        var randomIndex = window.util.getRandomIndex(array.length);
      } while (repeatedIndexes.indexOf(randomIndex) !== -1);

      sortedArray.push(array[randomIndex]);
      repeatedIndexes.push(randomIndex);
    }
    return sortedArray;
  }

  function renderPostStructure(post) {
    var postStructure = document.querySelector('#picture-template').content.cloneNode(true);

    postStructure.querySelector('img').setAttribute('src', post.url);
    postStructure.querySelector('.picture-likes').textContent = post.likes.toString();
    postStructure.querySelector('.picture-comments').textContent = post.comments.length.toString();

    return postStructure;
  }

  function renderPosts(array) {
    var picturesElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPostStructure(array[i]));
    }
    picturesElement.innerHTML = '';
    picturesElement.appendChild(fragment);
  }

  function onLoad(data) {
    filters.addEventListener('change', onFilterClick);
    filters.classList.remove('hidden');
    posts = data;
    renderPosts(posts);
  }

  function onFilterClick(evt) {
    evt.preventDefault();

    switch (evt.target.value) {
      case RECOMENDED_FILTER:
        window.debounce(renderPosts(posts));
        break;
      case POPULAR_FILTER:
        window.debounce(window.sorting(posts, getPopularSortedArray, renderPosts));
        break;
      case DISCUSSED_FILTER:
        window.debounce(window.sorting(posts, getDiscussedSortedArray, renderPosts));
        break;
      case RANDOM_FILTER:
        window.debounce(window.sorting(posts, getRandomSortedArray, renderPosts, QUANTITY_RANDOM_POSTS));
        break;
    }
  }

  window.backend.load(onLoad, window.util.showError);
})();
