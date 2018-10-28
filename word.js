const Letter = require("./letter.js");

function Word(randomWord) {
    this.letterArray = [...randomWord].map(letter => {
            return new Letter(letter)
        });
    this.letterString = function () {
        let string = this.letterArray.map(letter => {
            return letter.check()
        }).join(" ");
        console.log(string);
    }
    this.guess = function (character) {
        this.letterArray.forEach(letter => {
            letter.guess(character);
        })
    }
};

module.exports = Word;
