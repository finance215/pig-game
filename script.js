'use strict';
// selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
let allstate = new Audio('game.mp3');

let activePlayer, playing, currentScore, scores;

//sets scores to zero in the begining of the game

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// hides dice in the begining of game

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  dice.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
// function to be completed when rolldice button is clicked
rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    // 1. generate random dice roll
    const diceinfunct = Math.trunc(Math.random() * 6 + 1);
    console.log(diceinfunct);

    // 2.display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceinfunct}.png`;

    // 3. check if roll is a one
    if (diceinfunct !== 1) {
      currentScore += diceinfunct;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //current0El.textContent = currentScore; // change later

      // add dice to current score
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    //add current score to active players score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if players sore is <=100
    if (scores[activePlayer] >= 100) {
      //finish game
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      allstate.play();
    } else {
      // toggles to next team
      switchPlayer();
    }
  }
});
//resets game

newGameBtn.addEventListener('click', init);
