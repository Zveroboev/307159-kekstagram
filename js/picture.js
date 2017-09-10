'use strict';

// Отрисовка миниатюры с постами на index.html
(function () {
  var POSTS = window.CONSTANS.POSTS;

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

  function getRandomSortedArray(array) {
    var quantity = POSTS.QUANTITY_RANDOM_FILTER > array.length ? array.length : POSTS.QUANTITY_RANDOM_FILTER;

    var sortedArray = [];
    var repeatedIndexes = [];
    var i = 0;

    while (i < quantity) {
      do {
        var randomIndex = window.util.getRandomIndex(array.length);
      } while (repeatedIndexes.indexOf(randomIndex) !== -1);

      sortedArray.push(array[randomIndex]);
      repeatedIndexes.push(randomIndex);
      i++;
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
      case POSTS.RECOMENDED_FILTER:
        window.debounce(function () {
          renderPosts(posts);
        });
        break;
      case POSTS.POPULAR_FILTER:
        window.debounce(function () {
          window.sorting(posts, getPopularSortedArray, renderPosts);
        });
        break;
      case POSTS.DISCUSSED_FILTER:
        window.debounce(function () {
          window.sorting(posts, getDiscussedSortedArray, renderPosts);
        });
        break;
      case POSTS.RANDOM_FILTER:
        window.debounce(function () {
          window.sorting(posts, getRandomSortedArray, renderPosts);
        });
        break;
    }
  }

  window.backend.load(onLoad, window.util.showError);
})();
