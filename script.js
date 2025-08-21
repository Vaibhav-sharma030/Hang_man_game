const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const hintText = document.querySelector(".hint-text b");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// Reset & start new game
function resetGame() {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `Hangman_images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModal.style.display = "none";
}

// Pick random word
function getRandomWord() {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  hintText.innerText = hint;
  resetGame();
}

// Game over modal
function gameOver(isVictory) {
  setTimeout(() => {
    const modalText = isVictory
      ? "You found the word!"
      : "Game over! The word was:";
    const modalImg = isVictory ? "victory.gif" : "lost.gif";
    gameModal.querySelector("img").src = `Hangman_images/${modalImg}`;
    gameModal.querySelector("h4").innerText = isVictory ? "Congrats!" : "Oops!";
    gameModal.querySelector("p").innerHTML =
      `${modalText} <b>${currentWord}</b>`;
    gameModal.style.display = "flex";
  }, 300);
}

// Letter guess handler
function initGame(button, clickedLetter) {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `Hangman_images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if ([...new Set(correctLetters)].length === new Set(currentWord).size) {
    return gameOver(true);
  }
  if (wrongGuessCount === maxGuesses) return gameOver(false);
}

// Keyboard setup
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", e =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
