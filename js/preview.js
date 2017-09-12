'use strict';

// Открытие Попапа с постом по клику на этот пост
(function () {

  var picturesContainer = document.querySelector('.pictures');

  picturesContainer.addEventListener('click', openPopup);
  picturesContainer.addEventListener('keydown', openPopupOnKeyDown);

  function openPopup(evt) {
    var target = evt.target;

    while (target.parentNode !== evt.currentTarget) {
      target = target.parentNode;
      if (target.classList.contains('picture')) {
        renderPopup(target);
        addEventsForOpeningPopup();
        window.util.hideBodyScroll();
        return;
      }
    }
  }

  function closePopup() {
    document.querySelector('.gallery-overlay').classList.add('hidden');
    addEventsForClosingPopup();
    window.util.showBodyScroll();
  }

  function openPopupOnKeyDown(evt) {
    window.util.pressEnter(evt, openPopup);
  }

  function closePopupOnKeyDown(evt) {
    window.util.pressEnter(evt, closePopup);
  }

  function closePopupOnPressEsc(evt) {
    window.util.pressEsc(evt, closePopup);
  }

  function addEventsForOpeningPopup() {

    document.querySelector('.gallery-overlay-close').addEventListener('click', closePopup);
    document.querySelector('.gallery-overlay-close').addEventListener('keydown', closePopupOnKeyDown);
    document.addEventListener('keydown', closePopupOnPressEsc);

    picturesContainer.removeEventListener('click', openPopup);
    picturesContainer.removeEventListener('keydown', openPopupOnKeyDown);
  }

  function addEventsForClosingPopup() {

    picturesContainer.addEventListener('click', openPopup);
    picturesContainer.addEventListener('keydown', openPopupOnKeyDown);

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

})();
