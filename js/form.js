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
    uploadForm.querySelector('img').className = 'effect-none';
    uploadForm.querySelector('img').style.transform = 'none';

    uploadForm.querySelector('.upload-image').classList.add('hidden');
    uploadForm.querySelector('.upload-overlay').classList.remove('hidden');

    uploadFormCancel.addEventListener('click', closeUploadOverlay);
    uploadFormCancel.addEventListener('keydown', closeUploadOverlayOnKeyDown);
    document.addEventListener('keydown', closeUploadOverlayOnPressEsc);

    uploadFormControls.addEventListener('change', setPhotoFilter);
    uploadForm.addEventListener('input', window.sayAboutValidity);

    setInputAction(inputResize);

    window.util.hideBodyScroll();

  }

  function closeUploadOverlay() {
    uploadForm.querySelector('.upload-image').classList.remove('hidden');
    uploadForm.querySelector('.upload-overlay').classList.add('hidden');

    uploadFormCancel.removeEventListener('click', closeUploadOverlay);
    uploadFormCancel.removeEventListener('keydown', closeUploadOverlayOnKeyDown);
    document.removeEventListener('keydown', closeUploadOverlayOnPressEsc);

    uploadFormControls.removeEventListener('change', setPhotoFilter);
    uploadForm.removeEventListener('input', window.sayAboutValidity);

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
  var image = uploadForm.querySelector('img');

  function setPhotoFilter(evt) {
    image.className = evt.target.dataset.filter;

    if (image.className === 'effect-none') {
      hideSaturationSlider();
    } else {
      showSaturationSlider();
    }
  }

  var buttonInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var buttonDec = uploadForm.querySelector('.upload-resize-controls-button-dec');

  function setInputAction() {
    buttonInc.addEventListener('click', onButtonClickIncrementValue);
    buttonDec.addEventListener('click', onButtonClickDecrementValue);
  }

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

  //
  var saturationSlider = uploadForm.querySelector('.upload-effect-level');
  var sliderFullLine = saturationSlider.querySelector('.upload-effect-level-line');
  var sliderProgressLine = saturationSlider.querySelector('.upload-effect-level-val');
  var sliderPin = saturationSlider.querySelector('.upload-effect-level-pin');

  saturationSlider.classList.add('hidden');

  function showSaturationSlider() {
    saturationSlider.classList.remove('hidden');
  }

  function hideSaturationSlider() {
    saturationSlider.classList.add('hidden');
  }

  sliderPin.addEventListener('mousedown', moveSaturationSlider);

  function moveSaturationSlider(evt) {
    evt.preventDefault();
    var coordsOfWrap = sliderFullLine.getBoundingClientRect();
    var startX = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startX - moveEvt.clientX;

      startX = moveEvt.clientX;

      if (sliderPin.getBoundingClientRect().left < coordsOfWrap.left) {
        sliderPin.style.left = '0%';
        sliderPin.clientX = coordsOfWrap.left;
      } else if (sliderPin.getBoundingClientRect().right > coordsOfWrap.right) {
        sliderPin.style.left = '100%';
      } else {
        sliderPin.style.left = (sliderPin.offsetLeft - shiftX) + 'px';
      }

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }


})();
