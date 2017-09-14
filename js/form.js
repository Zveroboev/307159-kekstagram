'use strict';

(function () {
  // Открытие формы обработки загруженной фотографии
  var FILTER = window.CONSTANS.FILTER.EFFECTS;

  var fileChooser = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-form');

  var uploadFormCancel = uploadForm.querySelector('.upload-form-cancel');
  var uploadFormControls = uploadForm.querySelector('.upload-effect-controls');

  var inputResize = uploadForm.querySelector('.upload-resize-controls-value');
  var buttonInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var buttonDec = uploadForm.querySelector('.upload-resize-controls-button-dec');

  var saturationSlider = uploadForm.querySelector('.upload-effect-level');
  var sliderPin = saturationSlider.querySelector('.upload-effect-level-pin');
  var sliderProgressLine = saturationSlider.querySelector('.upload-effect-level-val');
  var image = uploadForm.querySelector('img');

  window.inputDescription = uploadForm.querySelector('.upload-form-description');
  window.inputHashtags = uploadForm.querySelector('.upload-form-hashtags');

  fileChooser.addEventListener('change', function () {
    window.onFileChange(fileChooser, image, openUploadOverlay);
  });

  function openUploadOverlay() {
    uploadForm.querySelector('.upload-image').classList.add('hidden');
    uploadForm.querySelector('.upload-overlay').classList.remove('hidden');

    uploadFormCancel.addEventListener('click', closeUploadOverlay);
    uploadFormCancel.addEventListener('keydown', closeUploadOverlayOnKeyDown);
    document.addEventListener('keydown', closeUploadOverlayOnPressEsc);

    uploadFormControls.addEventListener('change', setFilterType);
    uploadForm.addEventListener('input', window.sayAboutValidity);

    sliderPin.addEventListener('mousedown', moveSaturationSlider);

    buttonInc.addEventListener('click', onIncrementClick);
    buttonDec.addEventListener('click', onDecrementClick);

    uploadForm.addEventListener('submit', submitForm);

    setStandardForm();

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

    buttonInc.removeEventListener('click', onIncrementClick);
    buttonDec.removeEventListener('click', onDecrementClick);

    uploadForm.removeEventListener('submit', submitForm);

    inputResize.value = inputResize.dataset.max;

    window.util.showBodyScroll();
  }

  function submitForm(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), closeUploadOverlay, window.util.showError);
  }

  function closeUploadOverlayOnKeyDown(evt) {
    window.util.pressEnter(evt, closeUploadOverlay);
  }

  function closeUploadOverlayOnPressEsc(evt) {
    if (evt.target !== window.inputDescription && evt.target !== window.inputHashtags) {
      window.util.pressEsc(evt, closeUploadOverlay);
    }
  }

  // Работа элементов внутри формы кадрирования
  function setFilterType(evt) {
    image.className = evt.target.dataset.filter;
    setStartSaturation();
  }

  function onIncrementClick() {
    window.pressIncrementScale(inputResize, adjustScale);
  }

  function onDecrementClick() {
    window.pressDecrementScale(inputResize, adjustScale);
  }

  function adjustScale(value) {
    image.style.transform = 'scale(' + value / 100 + ')';
  }

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

  function setSaturationSlider() {
    if (image.className === FILTER.NONE) {
      hideSaturationSlider();
      return;
    }

    showSaturationSlider();
  }

  function setStartSaturation() {
    var startSaturation = window.CONSTANS.FILTER.GET_INITIAL_VALUE;

    sliderPin.style.left = startSaturation + '%';
    sliderProgressLine.style.width = startSaturation + '%';
    window.setFilter(image, startSaturation, setSaturationSlider);
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

      window.setFilter(image, persentOffset, setSaturationSlider);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function setStandardForm() {
    uploadFormControls.querySelector('#upload-effect-none').checked = true;
    uploadForm.querySelector('.upload-form-hashtags').value = '';
    uploadForm.querySelector('.upload-form-description').value = '';
    image.className = FILTER.NONE;
    image.style.transform = 'none';
    image.style.filter = 'none';
    hideSaturationSlider();
  }

})();
