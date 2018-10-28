const inquirer = require("inquirer");
const Word = require("./word.js");

const words = [
    "pepper",
    "salt",
    "paprika",
    "allspice",
    "cayenne",
    "sage",
    "parsley",
    "rosemary",
    "thyme",
    "basil"
];
let wins = 0;
let losses = 0;
let random;
function keepPlaying() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Would you like to play again?"
        }
    ])
    .then(function(answer) {
        if(answer.confirm === true) {
            playGame();
        }else{
            console.log("Hope you had fun!!!");
        }
    })
}

function playGame() {
    let random = Math.floor(Math.random() * (words.length));
    const randomWord = words[random];
    const word = new Word(randomWord);
    const lettersGuessed = [];
    let guessesLeft = randomWord.length + 5;
    let truths = 0;
    const divider = "*********************************************\n";
    console.log(`${divider}`);
    console.log("-----  Welcome to the Word Guess Game -----\n");
    console.log(`${divider}`);
    console.log("--- The theme of today's game is SPICES --- \n");
    console.log(`Game Stats: ${wins} WINS and ${losses} LOSSES\n`);
    console.log("Guess the word below....\n");
        word.letterString();
        console.log("\n");
    function guessLetter() {
        console.log(`Letters Guessed: ${lettersGuessed}\n`);
        console.log(`Guesses Left: ${guessesLeft}\n`);
        inquirer.prompt([
            {
              type: "input",
              name: "letter",
              message: "Which letter would you like to guess?",
            }
        ]).then(function(answers) {
            let hasGuessed = lettersGuessed.includes(answers.letter);
            if(hasGuessed) {
                word.guess(answers.letter);
            }else{
            lettersGuessed.push(answers.letter);
            word.guess(answers.letter);
            }
        }).then(function() {
            word.letterString();
            console.log("\n");
            for(let i = 0; i < word.letterArray.length; i++) {
                if(word.letterArray[i].letterGuessed === true) {
                    truths++;
                }
            }
            
        }).then(function() {
            if(truths === word.letterArray.length) {
                console.log("----- You win!!!!!!! -----\n");
                wins++;
                keepPlaying();
                
            }else if(guessesLeft === 1) {
                console.log("You LOSE!  You almost made it!!\n");
                console.log(`The correct word was: ${randomWord}\n`);
                losses++;
                keepPlaying();
            }else{
                truths = 0;
                guessesLeft--;
                console.log("\n");
                console.log("Keep Going!!\n");
                console.log("Guess another letter\n");
                guessLetter();
            }
        })
    }
    guessLetter();
}
playGame();

