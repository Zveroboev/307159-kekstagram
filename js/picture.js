'use strict';

// Отрисовка миниатюры с постами на index.html
(function () {
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
    picturesElement.appendChild(fragment);
  }

  window.backend.load(renderPosts, window.util.showError);
})();
