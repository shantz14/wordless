console.log("Script Loaded");

const GUESSES = 5;
let currentGuess = 0;
const url = "localhost:4000/";

// TODO word load from database!!!
let word = "GAMER";
const submitButton = document.getElementById("submit");
let nextLetter;

document.addEventListener("DOMContentLoaded", function() {
    populateGame();    
    document.getElementById("letter00").focus();
});

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

    if (guess.length == word.length) {
        colorMyBoxes(boxes, guess);
        currentGuess++;
        
        if (guess === word) {
            win();
        } else if (currentGuess == GUESSES) {
            lose();
        }

        nextLetter.focus();
    }
});

function win() {
    winData = {
        win: true,
        guesses: currentGuess,
        wordLength: word.length
    };
    jsonData = JSON.stringify(winData);
    fetch("/api/win", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = data.redirect
    })
}

function lose() {
    winData = {
        win: false,
        guesses: currentGuess,
        wordLength: word.length
    };
    jsonData = JSON.stringify(winData);
    fetch("/api/lose", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = data.redirect
    })
}

document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        submitButton.click();
    }
})

function colorMyBoxes(boxes, guess) {
    letterCounts = countLetters();

    lettersCounted = {}
    for (let i = 0; i < guess.length; i++) {
        lettersCounted[guess[i]] = 0;
    }
    
    //sequential checks
    //greys
    for (let i = 0; i < guess.length; i++) {
        boxes[i].style.backgroundColor = "grey";
    }
    //greens
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] == word[i]) {
            boxes[i].style.backgroundColor = "green";
            lettersCounted[guess[i]]++;
        }
    }
    //yellows
    for (let i = 0; i < guess.length; i++) {
        if (lettersCounted[guess[i]] < letterCounts[guess[i]] && word.includes(guess[i]) && boxes[i].style.backgroundColor === "grey") {
            boxes[i].style.backgroundColor = "yellow";
            lettersCounted[guess[i]]++;
        }
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
    nextLetter = document.getElementById(newId);
    if (row == currentGuess) {
        nextLetter.focus();
    }
}
