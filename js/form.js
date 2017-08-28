'use strict';

(function () {

  // Открытие формы обработки загруженной фотографии
  var inputFile = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-form');

  var uploadFormCancel = uploadForm.querySelector('.upload-form-cancel');
  var uploadFormControls = uploadForm.querySelector('.upload-effect-controls');

  var inputResize = uploadForm.querySelector('.upload-resize-controls-value');

  window.inputDescription = uploadForm.querySelector('.upload-form-description');
  window.inputHashtags = uploadForm.querySelector('.upload-form-hashtags');

  inputFile.addEventListener('change', openUploadOverlay);

  function openUploadOverlay() {
    // Задаю эффекты по умолчанию для загруженного изображения
    uploadForm.querySelector('img').className = 'effect-none';
    uploadForm.querySelector('img').style.transform = 'scale(1)';

    // Показываю форму кадрирования
    uploadForm.querySelector('.upload-image').classList.add('hidden');
    uploadForm.querySelector('.upload-overlay').classList.remove('hidden');

    // Вешаю обработчики закрытия
    uploadFormCancel.addEventListener('click', closeUploadOverlay);
    uploadFormCancel.addEventListener('keydown', closeUploadOverlayOnKeyDown);
    document.addEventListener('keydown', closeUploadOverlayOnPressEsc);

    // Вешаю обработчики для элементов внутри попапа
    uploadFormControls.addEventListener('change', setPhotoFilter);
    uploadForm.addEventListener('input', window.sayAboutValidity);

    // Вешаю обработчики для кнопок масштабирования загруженного изображения
    setInputAction(inputResize);

    window.util.hideBodyScroll();
  }

  function closeUploadOverlay() {
    // Скрываю форму кадрирования
    uploadForm.querySelector('.upload-image').classList.remove('hidden');
    uploadForm.querySelector('.upload-overlay').classList.add('hidden');

    // Удаляю обработчики закрытия
    uploadFormCancel.removeEventListener('click', closeUploadOverlay);
    uploadFormCancel.removeEventListener('keydown', closeUploadOverlayOnKeyDown);
    document.removeEventListener('keydown', closeUploadOverlayOnPressEsc);

    // Удаляю обработчики для элементов внутри попапа
    uploadFormControls.removeEventListener('change', setPhotoFilter);
    uploadForm.removeEventListener('input', window.sayAboutValidity);

    // Удаляю обработчики для кнопок масштабирования загруженного изображения
    removeInputAction(inputResize);

    window.util.showBodyScroll();
  }

  function closeUploadOverlayOnKeyDown(evt) {
    window.util.isEnterEvent(evt, closeUploadOverlay);
  }

  function closeUploadOverlayOnPressEsc(evt) {
    if (evt.target !== window.inputDescription && evt.target !== window.inputHashtags) {
      window.util.isEscEvent(evt, closeUploadOverlay);
    }
  }

  // Работа элементов внутри формы кадрирования
  // Наложение фильтров на фотографию
  function setPhotoFilter(evt) {
    uploadForm.querySelector('img').className = evt.target.dataset.filter;
  }

// Вешаю обработчики для кнопок масштабирования
  var buttonInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var buttonDec = uploadForm.querySelector('.upload-resize-controls-button-dec');

  function setInputAction() {
    buttonInc.addEventListener('click', onButtonClickIncrementValue);
    buttonDec.addEventListener('click', onButtonClickDecrementValue);
  }

// Удаляю обработчики для кнопок масштабирования
  function removeInputAction() {
    buttonInc.removeEventListener('click', onButtonClickIncrementValue);
    buttonDec.removeEventListener('click', onButtonClickDecrementValue);

    inputResize.value = inputResize.dataset.max;
  }

  function onButtonClickIncrementValue() {
    inputResize.value = parseInt(inputResize.value, 10) + parseInt(inputResize.dataset.step, 10);
    if (inputResize.value >= parseInt(inputResize.dataset.max, 10)) {
      inputResize.value = parseInt(inputResize.dataset.max, 10);
    }
    resizeImage(inputResize.value);
  }

  function onButtonClickDecrementValue() {
    inputResize.value = parseInt(inputResize.value, 10) - parseInt(inputResize.dataset.step, 10);
    if (inputResize.value <= parseInt(inputResize.dataset.min, 10)) {
      inputResize.value = parseInt(inputResize.dataset.min, 10);
    }
    resizeImage(inputResize.value);
  }

  function resizeImage(value) {
    uploadForm.querySelector('img').style.transform = 'scale(' + value / 100 + ')';
  }

})();
