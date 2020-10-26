// variables
const keyBoard = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const startButton = document.querySelector('.btn__reset');
const phraseUl = document.querySelector('#phrase ul');
let missed = 0;

// phrases array
const phrases = [
  "Billie Eilish",
  "Red Dead Redemption",
  "Zelda Breath of the Wild",
  "The Last of Us",
  "The Long Dark",
  "Trinkets",
  "Riverdale"
];

// function that chooses a random phrase from the phrases array
function getRandomPhraseAsArray(array) {
  let pickRandomPhrase = Math.floor(Math.random() * array.length);
  let letterArray = array[pickRandomPhrase].split('');
  return letterArray;
}

// variable that holds the new array of letters and calls the getRandomPhraseAsArray function
const newArray = getRandomPhraseAsArray(phrases);

// function that loops through each randomPhrase and creates a list item for each character (letter)
function addPhraseToDisplay(array) {
  for (let i = 0; i < array.length; i++) {
    let li = document.createElement('li');
    li.textContent = array[i];
    phraseUl.appendChild(li);
    if (array[i] != ' ') {
       li.className = 'letter';
    } else {
       li.className = 'space';
    }
  }
}

// call the addPhraseToDisplay function to the letter arrays
addPhraseToDisplay(newArray);

// Checkletter function
function checkLetter(button) {
  // variable that holds the li elements of the phrases
  const liItems = document.querySelectorAll("li.letter");
  // variable that stores the match (if its found)
  let match = null;
  // loop through all the li elements of the phrases
  for (let i = 0; i < liItems.length; i++) {
  // create conditional that compares the text of the button parameters to the text of the li elements.
    if (button.textContent.toUpperCase() === liItems[i].textContent.toUpperCase() ) {
       liItems[i].classList.add('show');
       match = button.textContent;
    }
  }
  return match;
}

// checkwin function
function checkWin() {
  const letter = document.querySelectorAll("li.letter");
  const show = document.querySelectorAll("li.show");
  const overlay = document.getElementById("overlay");

// check if the length of the letter and show variables are the same
  if (letter.length === show.length) {
    overlay.classList.add('win')
    overlay.style.display = "flex";
    overlay.querySelector('h2').textContent = "Congrats! You've won!";
    startButton.textContent = 'Play Again';
    resetGame();
  // check if wrong answers are greater than 5
  } else if (missed >= 5) {
    overlay.classList.add('lose')
    overlay.querySelector('h2').textContent = "Game over!";
    overlay.style.display = "flex";
    startButton.textContent = 'Try Again';
    resetGame();
  }
}

// event listener keyboard
keyBoard.addEventListener('click', (event) => {
  let letterFound = checkLetter(event.target);
  // filter out clicks that don't happen on buttons
  if (event.target.tagName === 'BUTTON') {
    event.target.classList.add('chosen');
    // Sets button attributes to disabled when true
    event.target.setAttribute('disabled', true);
    // remove hearts when answer is wrong
    if (letterFound == null) {
      document.querySelectorAll('.tries img')[missed].src = 'images/lostHeart.png';
      missed += 1;
    }
    checkWin();
  }
});

// function that resets the game when lost or won
function resetGame() {
  const heaRts = document.querySelectorAll('.tries');
  const liItems = document.querySelectorAll("li.letter");
  const keyboardButtons = keyBoard.querySelectorAll("button");

    for (let i = 0; i < liItems.length; i++) {
      liItems[i].classList.remove('show');
    }

    for (let i = 0; i < keyboardButtons.length; i++) {
     keyboardButtons[i].classList.remove('chosen');
     keyboardButtons[i].disabled = false;
    }

    for (let i = 0; i < heaRts.length; i++) {
      missed = 0;
      const img = heaRts[i].getElementsByTagName('img')[0].src = 'images/liveHeart.png';
    }
}

// eventlistener that starts the game and hides the overlay screen
startButton.addEventListener("click", () => {
  overlay.style.display = "none";
});
