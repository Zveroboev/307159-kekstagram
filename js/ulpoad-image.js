'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.onFileChange = function (fileChooser, preview, callback) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        callback();
      });

      reader.readAsDataURL(file);
    }
  };

})();
