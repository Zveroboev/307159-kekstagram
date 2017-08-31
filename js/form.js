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

    uploadFormControls.addEventListener('change', setPhotoFilter);
    uploadForm.addEventListener('input', window.sayAboutValidity);

    sliderPin.addEventListener('mousedown', moveSaturationSlider);

    setInputAction(inputResize);
    setStandardFilter();

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

    sliderPin.removeEventListener('mousedown', moveSaturationSlider);

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

  function setPhotoFilter(evt) {
    var StartSaturation = window.CONSTANS.SATURATION.START_SATURATION;

    image.className = evt.target.dataset.filter;

    if (image.className === 'effect-none') {
      hideSaturationSlider();
    } else {
      showSaturationSlider();
    }

    sliderPin.style.left = StartSaturation + '%';
    sliderProgressLine.style.width = StartSaturation + '%';
    setFilterSaturation(StartSaturation);
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

  // Реализация перемещения ползунка насыщенности
  var sliderFullLine = saturationSlider.querySelector('.upload-effect-level-line');
  var minOffset = window.CONSTANS.SATURATION.MIN_SATURATION;
  var maxOffset = window.CONSTANS.SATURATION.MAX_SATURATION;

  // Я долго думал над тем, как назвать эти делители. В итоге ничего кроме этой жуткой штуки не придумал.
  var denominatorForChromeAndSepia = 100;
  var denominatorForPhobosAndHeat = 33.3;

  saturationSlider.classList.add('hidden');

  function showSaturationSlider() {
    saturationSlider.classList.remove('hidden');
  }

  function hideSaturationSlider() {
    saturationSlider.classList.add('hidden');
  }

  function moveSaturationSlider(evt) {
    evt.preventDefault();
    var sliderCoords = sliderFullLine.getBoundingClientRect();
    var startX = evt.clientX;
    var lengthAll = sliderCoords.right - sliderCoords.left;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startX - moveEvt.clientX;

      startX = moveEvt.clientX;
      sliderProgressLine.style.width = sliderPin.style.left;

      var lengthSegment = startX - sliderCoords.left;
      var persentOffset = null;

      if (startX < sliderCoords.left) {
        startX = sliderCoords.left;
        persentOffset = minOffset;
        sliderPin.style.left = minOffset + '%';
      } else if (startX > sliderCoords.right) {
        startX = sliderCoords.right;
        persentOffset = maxOffset;
        sliderPin.style.left = maxOffset + '%';
      } else {
        persentOffset = ((lengthSegment * maxOffset) / lengthAll).toFixed(1);
        sliderPin.style.left = (sliderPin.offsetLeft - shiftX) + 'px';
      }
      setFilterSaturation(persentOffset);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function setFilterSaturation(saturation) {
    switch (image.className) {
      case 'effect-none':
        image.style.filter = '';
        break;
      case 'effect-chrome':
        image.style.filter = 'grayscale(' + saturation / denominatorForChromeAndSepia + ')';
        break;
      case 'effect-sepia':
        image.style.filter = 'sepia(' + saturation / denominatorForChromeAndSepia + ')';
        break;
      case 'effect-marvin':
        image.style.filter = 'invert(' + saturation + '%)';
        break;
      case 'effect-phobos':
        image.style.filter = 'blur(' + (saturation / denominatorForPhobosAndHeat).toFixed(1) + 'px)';
        break;
      case 'effect-heat':
        image.style.filter = 'brightness(' + (saturation / denominatorForPhobosAndHeat).toFixed(1) + ')';
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