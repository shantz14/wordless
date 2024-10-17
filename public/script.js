console.log("Script Loaded");

const GUESSES = 5;
let currentGuess = 0;

// TODO word load from database!!!
let word = "GAMER";
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function() {
    const baseId = "letter" + currentGuess;
    let guess = "";
    let boxes = [];

    for (let i = 0; i < word.length; i++) {
        let box = document.getElementById(baseId + i);
        boxes.push(box);

        const letter = box.value
        guess = guess + letter;
    }
    colorMyBoxes(boxes, guess);
    currentGuess++;
});

function colorMyBoxes(boxes, guess) {
    letterCounts = countLetters();

    lettersCounted = {}
    for (let i = 0; i < guess.length; i++) {
        lettersCounted[guess[i]] = 0;
    }
    
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] == word[i]) {
            boxes[i].style.backgroundColor = "green";
        } else if (word.includes(guess[i])) {
            for (let x = 0; x < guess.length; x++) {
                if (guess[x] == word[x]) {
                    boxes[i].style.backgroundColor = "grey";
                }
            }
            if (lettersCounted[guess[i]] < letterCounts[guess[i]]) {
                boxes[i].style.backgroundColor = "yellow";
            } else {
                boxes[i].style.backgroundColor = "grey";
            }
        } else {
            boxes[i].style.backgroundColor = "grey";
        }
        lettersCounted[guess[i]]++;
    }
}

function countLetters() {
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    letterCounts = {};
    for (let i = 0; i < letters.length; i++) {
        letterCounts[letters[i]] = 0;
    }
    for (let i = 0; i < word.length; i++) {
        letterCounts[word[i]]++;
    }
    return letterCounts;
}

document.addEventListener("DOMContentLoaded", function() {
    populateGame();    
    
});

function populateGame() {
    let gameContainer = document.getElementById("gameContainer");
    let wordContainer = document.getElementById("wordContainer0");

    for (let r = 1; r < GUESSES; r++) {
        let newWord = wordContainer.cloneNode();
        newWord.id = "wordContainer" + r;
        populateWord(newWord);
        gameContainer.appendChild(newWord);
    }
    populateWord(wordContainer)

    document.querySelector("input").remove();
}

function populateWord(wordContainer) {
    const letterDiv = document.getElementById("letter00");
    for (let c = 0; c < word.length; c++) {
        let newLetter = letterDiv.cloneNode(true);
        newLetter.id = "letter" + wordContainer.id[wordContainer.id.length - 1] + c;
        console.log(newLetter.id);
        wordContainer.appendChild(newLetter);
    }
}

function validateInput(letter, value) {
    const charCode = value.charCodeAt(0);

    if (charCode < 65 || charCode > 122) {
        letter.value = "";
    } else {
        letter.value = value.toUpperCase();
    }

    const oldId = letter.id;
    var row = parseInt(oldId[oldId.length - 2]);
    var col = parseInt(oldId[oldId.length - 1]);

    if (col == word.length - 1) {
        if (row == GUESSES - 1) {
            row = 0;
        } else {
            row++;
        }
        col = 0;
    } else {
        col++;
    }

    var newId = "letter" + row.toString() + col.toString();
    const nextLetter = document.getElementById(newId);
    nextLetter.focus();
}
