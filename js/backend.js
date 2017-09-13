'use strict';

(function () {
  var URL_SAVE = 'https://1510.dump.academy/kekstagram';
  var URL_LOAD = URL_SAVE + '/data';

  function addXHREvents(xhr, onLoad, onError, method) {
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError('Неверный запрос', method);
          break;
        case 401:
          onError('Пользователь не авторизован', method);
          break;
        case 404:
          onError('Ничего не найдено', method);
          break;
        default:
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText, method);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', method);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', method);
    });
  }

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var method = 'GET';

    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open(method, URL_LOAD);
    addXHREvents(xhr, onLoad, onError, method);
    xhr.send();
  }

  function save(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var method = 'POST';

    xhr.responseType = 'json';
    xhr.timeout = 5000;
    xhr.open(method, URL_SAVE);
    addXHREvents(xhr, onLoad, onError, method);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    save: save
  };
})();
