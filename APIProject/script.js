const BASE_URL = 'http://numbersapi.com/';
const RANDOM = 'random/';
const TRIVIA = 'trivia/';
const YEAR = 'year/';
const DATE = 'date/';
const MATH = 'math/';

let input = document.querySelector('input');
let confirm = document.getElementById('confirm');
let randomMath = document.getElementById('randomMath');
let randomTrivia = document.getElementById('randomTrivia');
let randomDate = document.getElementById('randomDate');
let randomYear = document.getElementById('randomYear');
let confirmTrivia = document.getElementById('confirmTrivia');
let confirmMath = document.getElementById('confirmMath');
let text = document.getElementById('text');

let number = 0;

confirmTrivia.addEventListener('click', function() {
    number = input.value;

    var url = BASE_URL + number + '/' + TRIVIA;

    fetch(url)
    .then(response => response.text())
    .then(data => {
        text.innerHTML = data;
    });

  });

confirmMath.addEventListener('click', function() {
    number = input.value;

    var url = BASE_URL + number + '/' + MATH;

    fetch(url)
    .then(response => response.text())
    .then(data => {
        text.innerHTML = data;
    });

  });

randomMath.addEventListener('click', function() {
    var url = BASE_URL + RANDOM + MATH;

    fetch(url)
    .then(response => response.text())
    .then(data => {
        text.innerHTML = data;
    });

  });

  randomTrivia.addEventListener('click', function() {
    var url = BASE_URL + RANDOM + TRIVIA;

    fetch(url)
    .then(response => response.text())
    .then(data => {
        text.innerHTML = data;
    });

  });

  randomDate.addEventListener('click', function() {
    var url = BASE_URL + RANDOM + DATE;

    fetch(url)
    .then(response => response.text())
    .then(data => {
        text.innerHTML = data;
    });

  });

  randomYear.addEventListener('click', function() {
    var url = BASE_URL + RANDOM + YEAR;

    fetch(url)
    .then(response => response.text())
    .then(data => {
        text.innerHTML = data;
    });

  });
  