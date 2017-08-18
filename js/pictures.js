'use strict';

// Нужно ли  все эти 4 константы объеденить в один объект?
var MIN_LIKES = 15;
var MAX_LIKES = 200;

// В ДЗ указано 25 фотографий, но их в папке 26 и на экран помещается 26. Если оставить 25 как указано в ДЗ,
// то в нижнем правом углу экрана будет дырка, будто этой 26ой и не хватает. Если что - верну обратно на 25.
var PHOTO_QUANTITY = 26;
var PICTURES_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function getRandomValue(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

function getRandomIndex(number) {
  return Math.floor(Math.random() * number);
}

function getRandomComment(array) {
  var firstRandomComment = array[getRandomIndex(array.length)];
  var secondRandomComment = array[getRandomIndex(array.length)];

  // Стоить ли создать пустой массив с комментариями и пушить в него случайный комментарий через цикл,
  // где i = 1 / i = 2 будет выбираться через функцию 'getRandomValue'?
  return getRandomValue(1, 2) === 1 ? [firstRandomComment] : [firstRandomComment, secondRandomComment];
  // Надо еще как-то реализовать, что бы 2 одинаковых значения подряд не выдовало,
  // но я ночью туплю и не пойму как. Позже может додумаюсь.
}

function getPostsArray(number) {
  var postsArray = [];

  for (var i = 0; i < number; i++) {
    postsArray.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomValue(MIN_LIKES, MAX_LIKES),
      comment: getRandomComment(PICTURES_COMMENTS)
    });
  }
  return postsArray;
}

function renderPostStructure(posts) {
  // Может эту переменную 'postStructure' стоить вынести за пределы этой функции,
  // что бы не копировать содержимое шаблона в каждой итерации цикла?
  // Например вынести в глобал (что не есть хорошо, вроде) или в функцию 'renderPosts',
  // которая создает картинки на главной из этой структуры. Тогда переменная будет видна через замыкание.
  var postStructure = document.querySelector('#picture-template').content.cloneNode(true);

  postStructure.querySelector('img').setAttribute('src', posts.url);
  postStructure.querySelector('.picture-likes').textContent = posts.likes;
  postStructure.querySelector('.picture-comments').textContent = posts.comment.length;

  return postStructure;
}

function hideUploadForm() {
  document.querySelector('.upload-form').classList.add('hidden');
}

function showGallery(arrayElement) {
  var galleryElement = document.querySelector('.gallery-overlay');

  hideUploadForm();
  galleryElement.classList.remove('hidden');

  // Тут, похоже, DRY не соблюдается. В функции 'renderPostStructure' мы производим похожие действия
  // но делает она их совершенно для другого. Не знаю есть ли смысл вызывать ее из этой функции.
  // Темболее у них разные селекторы в поиске. Это придется дополнительно 4 параметра в нее передавать.
  // Если 'renderPostStructure' вызывать еще и отсюда, то переменную 'postStructure' из нее не получиться перенести
  // в функцию 'renderPost'.
  galleryElement.querySelector('.gallery-overlay-image').setAttribute('src', arrayElement.url);
  galleryElement.querySelector('.likes-count').textContent = arrayElement.likes;
  galleryElement.querySelector('.comments-count').textContent = arrayElement.comment.length;
}

function renderPosts() {
  var posts = getPostsArray(PHOTO_QUANTITY);
  var picturesElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTO_QUANTITY; i++) {
    fragment.appendChild(renderPostStructure(posts[i]));
  }
  picturesElement.appendChild(fragment);

  return posts;
}

renderPosts();

// Запускаю функцию 'showGallery' отдельно что бы удобнее было ее исключать из кода.
// Все-равно она потом на обработчик события повесится... наеврное.
showGallery(renderPosts()[0]);

