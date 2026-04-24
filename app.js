const wordDisplay = document.querySelector(".word-display");
const keyboard = document.querySelector(".keyboard");
const guessesText = document.querySelector(".Guesses-Text b");
const hangmanImage = document.querySelector(".hangman-box img");

const words = [
    { word: "javascript", hint: "Programming language for web" },
    { word: "python", hint: "Popular programming language" },
    { word: "elephant", hint: "Largest land animal" },
    { word: "guitar", hint: "A musical instrument" },
    { word: "mountain", hint: "Very high natural elevation" }
];

let currentWord, correctLetters = [], wrongGuesses = 0;
const maxGuesses = 6;

const hintText = document.querySelector(".hint-Text b");

/* Select random word */
const startGame = () => {
    const randomObj = words[Math.floor(Math.random() * words.length)];
    currentWord = randomObj.word;
    hintText.innerText = randomObj.hint;

    correctLetters = [];
    wrongGuesses = 0;
    guessesText.innerText = `${wrongGuesses} / ${maxGuesses}`;

    hangmanImage.src = `hangman-game-images/images/hangman-0.svg`;

    wordDisplay.innerHTML = currentWord
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");

    keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
};

/* Handle letter click */

const handleGuess = (button, letter) => {
    button.disabled = true;

    if (currentWord.includes(letter)) {

        [...currentWord].forEach((l, index) => {
            if (l === letter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
            }
        });

    } else {

        wrongGuesses++;
        hangmanImage.src = `hangman-game-images/images/hangman-${wrongGuesses}.svg`;

    }

    guessesText.innerText = `${wrongGuesses} / ${maxGuesses}`;

    checkGameStatus();
};

/* Check win or lose */

const checkGameStatus = () => {

    if (wrongGuesses === maxGuesses) {
        alert("Game Over! The word was: " + currentWord);
        startGame();
    }

    if (correctLetters.length === currentWord.length) {
        alert("You Won!");
        startGame();
    }
};

/* Create keyboard events */

keyboard.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", e => handleGuess(e.target, e.target.innerText));
});

/* Start game */

startGame();