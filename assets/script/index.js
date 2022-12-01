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
const scores = [];
const backgroundMusic = new Audio('./assets/audio/background-music.mp3');
const correct = new Audio('./assets/audio/correct.wav');
const countdown = new Audio('./assets/audio/countdown.wav');
const gameOver = new Audio('./assets/audio/game-over.wav');
const incorrect = new Audio('./assets/audio/incorrect.wav');
const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
'bicycle','eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'component',
'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty',
'agency','chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard', 'window'];

let index = 0;
let hits = 0;
let seconds = 99;
words.sort(() => (Math.random() > .5) ? 1 : -1);

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
  if(seconds < 0) {
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
  play.innerText = 'Try Again'
  countdown.play()
  play.disabled = true;
  setTimeout(() => {
    input.disabled = false;
    input.focus()
    displayTime();
    backgroundMusic.play()
  }, 2_500);
}

function endGame() {
  createScore();
  input.disabled = true;
  seconds = 99;
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
  word.innerText = randomWord();
})

input.onkeyup = function() {
  if (input.value.toLowerCase().trim() === word.innerText) {
    ++hits;
    hitCount.innerText = `${hits.toString().padStart(2, '0')}`;
    word.innerText = randomWord();
    input.value = '';
    correct.play();
  } else if (input.value.length === word.innerText.length) {
    incorrect.play()
    input.style.backgroundColor = 'var(--app-red)';
    setTimeout(() => {
      incorrect.pause();
      incorrect.currentTime = 0;
      input.style.backgroundColor = '#060231';
    }, 300)
  }
  if (hits === words.length || seconds < 0) {
    seconds = 0;
    endGame()
  }
}

onEvent('click', exit, () => {
  stats.style.visibility = 'hidden';
  stats.style.opacity = '0';
  

})