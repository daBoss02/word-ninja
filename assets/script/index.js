'use strict';

// Utility Functions
import { select, selectAll, onEvent, print, create } from "./util.js";

import { Score } from "./score.js";


// HTML Elements

const time = select('.time');
const hitCount = select('.hit-count')
const play = select('.play');
const input = select('.user-input');
const word = select('.word');
const dateOutput = select('.date');
const hitsDisplay = select('.hits-display');
const percent = select('.percent');
const stats = select('.stats-grid');
const exit = select('.exit');
const instructions = select('.instructions');
const arrows = selectAll('.arrow');
const scores = [];
const backgroundMusic = new Audio('./assets/audio/background-music.mp3');
backgroundMusic.volume = 0.2;
const correct = new Audio('./assets/audio/correct.wav');
correct.volume = 0.2;
const countdown = new Audio('./assets/audio/countdown.wav');
countdown.volume = 0.2;
const gameOver = new Audio('./assets/audio/game-over.wav');
gameOver.volume = 0.2;
const incorrect = new Audio('./assets/audio/incorrect.wav');
incorrect.volume = 0.2;
const words = ['love', 'dinosaur', 'pineapple', 'calendar', 'robot', 'building',
  'keyboard', 'window', 'population', 'weather', 'bottle', 'history', 'dream',
  'character', 'money', 'absolute', 'discipline', 'machine', 'accurate',
  'connection', 'rainbow', 'bicycle','eclipse', 'calculator', 'trouble', 'watermelon',
  'developer', 'philosophy', 'database', 'periodic', 'capitalism', 'abominable',
  'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee',
  'beauty', 'agency','chocolate', 'eleven', 'technology', 'alphabet', 'knowledge',
  'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
  'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
  'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
  'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework','fantastic',
  'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous',
  'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
];


let index = 0;
let hits = 0;
let seconds = 99;
let bug = false;

input.value = '';
input.disabled = true;

function randomWord() {
  index++;
  return words[index - 1];
}

function displayTime() {
  time.innerText = `${seconds.toString().padStart(2, '0')}s`;
  // console.log(time.innerText)
  seconds--;
  if(seconds >= 0) {
    setTimeout(function() {
      displayTime()
    }, 1_000);
  }
  if(seconds < 0 && bug === false) {
    endGame();
  }
}

function createScore() {
  let score = new Score(hits);
  dateOutput.innerText = score.date;
  hitsDisplay.innerText = score.hits;
  percent.innerText = score.percentage;
  stats.style.visibility = 'visible';
  stats.style.opacity = '1';
  scores.push(score);
}

function start() {
  play.disabled = true;
  if (play.innerText === 'Play' || play.innerText === 'Play Again') {
    words.sort(() => (Math.random() > .5) ? 1 : -1);
    countdown.play()
    setTimeout(() => {
      seconds = 99;
      play.disabled = false;
      word.innerText = randomWord();
      input.disabled = false;
      input.focus()
      displayTime();
      backgroundMusic.play()
      play.innerText = 'End Game';
    }, 2_500);
  } else {
    endGame()
    bug = true;
  }
}

function endGame() {
  play.innerText = 'Play Again';
  seconds = 0;
  index = 0;
  createScore();
  input.disabled = true;
  backgroundMusic.pause()
  backgroundMusic.currentTime = 0;
  gameOver.play();
  play.disabled = false;
  word.innerText = '';
  input.value = '';
  hits = 0;
  hitCount.innerText = '00';
  instructions.innerText = '';
}

onEvent('click', play, function() {
  start();
})

input.onkeyup = function() {
  if (input.value.toLowerCase().trim() === word.innerText) {
    input.style.backgroundColor = '#060231';
    ++hits;
    arrows.forEach(arrow => arrow.classList.add('spin'));
    setTimeout(() => {
      arrows.forEach(arrow => arrow.classList.remove('spin'));
    }, 200)
    hitCount.innerText = `${hits.toString().padStart(2, '0')}`;
    word.innerText = randomWord();
    input.value = '';
    correct.play();
  } else if (input.value.trim().length >= word.innerText.length) {
    incorrect.play()
    input.style.backgroundColor = 'var(--app-red)';
    setTimeout(() => {
      incorrect.pause();
      incorrect.currentTime = 0;
    }, 300)
  }
  if (hits === words.length || seconds < 0) {
    bug = true;
    start()
  }
}

onEvent('click', exit, () => {
  stats.style.opacity = '0';
  setTimeout(() => {
    stats.style.visibility = 'hidden';
  }, 250)
  

})