'use strict';

(function () {

  // Открытие формы обработки загруженной фотографии
  var inputFile = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-form');

  var uploadFormCancel = uploadForm.querySelector('.upload-form-cancel');
  var uploadFormControls = uploadForm.querySelector('.upload-effect-controls');

  var inputResize = uploadForm.querySelector('.upload-resize-controls-value');

  var saturationSlider = uploadForm.querySelector('.upload-effect-level');
  var sliderPin = saturationSlider.querySelector('.upload-effect-level-pin');
  var sliderProgressLine = saturationSlider.querySelector('.upload-effect-level-val');
  var image = uploadForm.querySelector('img');

  window.inputDescription = uploadForm.querySelector('.upload-form-description');
  window.inputHashtags = uploadForm.querySelector('.upload-form-hashtags');

  inputFile.addEventListener('change', openUploadOverlay);

  function openUploadOverlay() {
    uploadForm.querySelector('.upload-image').classList.add('hidden');
    uploadForm.querySelector('.upload-overlay').classList.remove('hidden');

    uploadFormCancel.addEventListener('click', closeUploadOverlay);
    uploadFormCancel.addEventListener('keydown', closeUploadOverlayOnKeyDown);
    document.addEventListener('keydown', closeUploadOverlayOnPressEsc);

    uploadFormControls.addEventListener('change', setFilterType);
    uploadForm.addEventListener('input', window.sayAboutValidity);

    sliderPin.addEventListener('mousedown', moveSaturationSlider);

    setStandardFilter();

    window.util.hideBodyScroll();

  }

  function closeUploadOverlay() {
    uploadForm.querySelector('.upload-image').classList.remove('hidden');
    uploadForm.querySelector('.upload-overlay').classList.add('hidden');

    uploadFormCancel.removeEventListener('click', closeUploadOverlay);
    uploadFormCancel.removeEventListener('keydown', closeUploadOverlayOnKeyDown);
    document.removeEventListener('keydown', closeUploadOverlayOnPressEsc);

    uploadFormControls.removeEventListener('change', setFilterType);
    uploadForm.removeEventListener('input', window.sayAboutValidity);

    sliderPin.removeEventListener('mousedown', moveSaturationSlider);

    inputResize.value = inputResize.dataset.max;

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
  var pictureElement = uploadForm.querySelector('img');

  function setFilterType(evt) {
    var startSaturation = window.CONSTANS.FILTER.INITIAL_VALUE;

    image.className = evt.target.dataset.filter;

    if (image.className === 'effect-none') {
      hideSaturationSlider();
    } else {
      showSaturationSlider();
    }

    sliderPin.style.left = startSaturation + '%';
    sliderProgressLine.style.width = startSaturation + '%';
    setFilter(startSaturation);
  }

  function adjustScale(value) {
    pictureElement.style.transform = 'scale(' + value / 100 + ')';
  }

  window.incrementScale(inputResize, adjustScale);
  window.decrementScale(inputResize, adjustScale);

  // Реализация перемещения ползунка насыщенности
  var sliderFullLine = saturationSlider.querySelector('.upload-effect-level-line');
  var minOffset = window.CONSTANS.FILTER.MIN_VALUE;
  var maxOffset = window.CONSTANS.FILTER.MAX_VALUE;

  function showSaturationSlider() {
    saturationSlider.classList.remove('hidden');
  }

  function hideSaturationSlider() {
    saturationSlider.classList.add('hidden');
  }

  function moveSaturationSlider(evt) {
    evt.preventDefault();

    var startX = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startX - moveEvt.clientX;
      var sliderCoords = sliderFullLine.getBoundingClientRect();
      var persentOffset = null;
      var lengthSegment = startX - sliderCoords.left;

      startX = moveEvt.clientX;

      if (startX < sliderCoords.left) {
        startX = sliderCoords.left;
        persentOffset = minOffset;
        sliderPin.style.left = minOffset + '%';
      } else if (startX > sliderCoords.right) {
        startX = sliderCoords.right;
        persentOffset = maxOffset;
        sliderPin.style.left = maxOffset + '%';
      } else {
        persentOffset = ((lengthSegment * maxOffset) / sliderCoords.width).toFixed(1);
        sliderPin.style.left = (sliderPin.offsetLeft - shiftX) + 'px';
      }
      sliderProgressLine.style.width = sliderPin.style.left;

      setFilter(persentOffset);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function setFilter(value) {
    var denominatorForChromeAndSepia = 100;
    var denominatorForPhobosAndHeat = 33.3;

    switch (image.className) {
      case 'effect-none':
        image.style.filter = '';
        break;
      case 'effect-chrome':
        image.style.filter = 'grayscale(' + value / denominatorForChromeAndSepia + ')';
        break;
      case 'effect-sepia':
        image.style.filter = 'sepia(' + value / denominatorForChromeAndSepia + ')';
        break;
      case 'effect-marvin':
        image.style.filter = 'invert(' + value + '%)';
        break;
      case 'effect-phobos':
        image.style.filter = 'blur(' + (value / denominatorForPhobosAndHeat).toFixed(1) + 'px)';
        break;
      case 'effect-heat':
        image.style.filter = 'brightness(' + (value / denominatorForPhobosAndHeat).toFixed(1) + ')';
        break;
    }
  }

  function setStandardFilter() {
    uploadFormControls.querySelector('#upload-effect-none').checked = true;
    image.className = 'effect-none';
    image.style.transform = 'none';
    image.style.filter = 'none';
    hideSaturationSlider();
  }

})();
