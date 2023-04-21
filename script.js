'use strict';

//selecting elemnts and storing in variables
const score0_p1 = document.getElementById('score--0');
const score0_p2 = document.getElementById('score--1');
const diceimg = document.querySelector('.dice');
const btnrollnew = document.querySelector('.btn--roll');
const current0el = document.getElementById('current--0');
const current1el = document.getElementById('current--1');
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const btnhold = document.querySelector('.btn--hold');
const newgame = document.querySelector('.btn--new');

//strating cnditions
score0_p1.textContent = 0;
score0_p2.textContent = 0;
diceimg.classList.add('hidden');
let totscore = [0, 0];
let playing = true;

let activeplayer = 0;
let current_score = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;

  activeplayer = activeplayer === 0 ? 1 : 0;
  current_score = 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};

// dice roll functionality
btnrollnew.addEventListener('click', function () {
  if (playing) {
    //1 generate a random number
    const score = Math.trunc(Math.random() * 6) + 1;

    // dice img change
    console.log(score);
    diceimg.classList.remove('hidden');
    diceimg.src = `./dice-${score}.png`;
    // display current score
    if (score !== 1) {
      current_score += score;
      document.getElementById(`current--${activeplayer}`).textContent =
        current_score;
    } else {
      //switch playeer
      switchPlayer();
    }
  }
});
btnhold.addEventListener('click', function () {
  if (playing) {
    // add current score to the global score
    totscore[activeplayer] += current_score;
    document.getElementById(`score--${activeplayer}`).textContent =
      totscore[activeplayer];

    // check if the sscore is >=100 and dec;lare winner
    if (totscore[activeplayer] >= 20) {
      playing = false;

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
      diceimg.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

newgame.addEventListener('click', function () {
  document
    .querySelector(`.player--${activeplayer}`)
    .classList.remove('player--winner');
  for (let i = 0; i < 2; i++) {
    document.getElementById(`score--${i}`).textContent = 0;
  }
  for (let i = 0; i < 2; i++) {
    document.getElementById(`current--${i}`).textContent = 0;
  }
  document.querySelector('.player--0').classList.add('player--active');

  current_score = 0;
  totscore[0] = 0;
  totscore[1] = 0;
  playing = true;
  activeplayer = 0;
});
