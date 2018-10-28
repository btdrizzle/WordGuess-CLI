function Letter(letter) {
    this.letter = letter;
    this.letterGuessed = false;
    this.check = function() {
        if(this.letterGuessed) {
            return this.letter;
        }else{
            return "_";
        }
    };
    this.guess = function(guessLetter) {
        if(guessLetter === this.letter) {
            this.letterGuessed = true;
        }
    }
}

module.exports = Letter;
