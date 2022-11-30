'use strict';

// Utility Functions
import { select, selectAll, onEvent, print, create } from "./util.js";

// Words
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
words.sort(() => (Math.random() > .5) ? 1 : -1);

let index = 0;
let hits = 0;
let seconds = 10;

function randomWord() {
  index++;
  return words[index - 1];
}

// HTML Elements

const time = select('.time');
const play = select('.play');
const input = select('.user-input');
const word = select('.word');

function displayTime() {
  time.innerText = `${seconds}s | ${index.toString().padStart(2, '0')}`;
  console.log(time.innerText)
  seconds--;
  if(seconds >= 0) {
    setTimeout(function() {
      displayTime()
    }, 1_000);
  }
}

function start() {
  displayTime()

}

onEvent('click', play, function() {
  start()
})