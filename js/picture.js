'use strict';

// Отрисовка миниатюры с постами на index.html
(function () {

  var POST = window.CONSTANS.POSTS_ATTRIBUTES;

  function renderPostStructure(posts) {
    var postStructure = document.querySelector('#picture-template').content.cloneNode(true);

    postStructure.querySelector('img').setAttribute('src', posts.url);
    postStructure.querySelector('.picture-likes').textContent = posts.likes.toString();
    postStructure.querySelector('.picture-comments').textContent = posts.comment.length.toString();

    return postStructure;
  }

  function renderPosts() {
    var picturesElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < POST.PHOTO_QUANTITY; i++) {
      fragment.appendChild(renderPostStructure(window.posts[i]));
    }
    picturesElement.appendChild(fragment);
  }

  renderPosts();
})();
