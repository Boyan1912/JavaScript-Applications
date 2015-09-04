/*
 Task description

 The computer generates a random number with four different digits
 The leftmost digit must not be 0 (zero)
 For simplicity called abcd
 At each turn the player enters a four-digit number
 For simplicity called xyzw
 Implement a high-score list
 Sheep means that a digit from xyzw is contained in abcd, but not on the same position
 If two such digits exists, the sheep are 2
 Ram means that a digit from xyzw is contained in abcd and it is on the same position * If two such digits exists, the rams are 2
 The game continues until the player guesses the number abcd
 i.e. has 4 rams

 Task implementation

 Your task is to create an object, that has 3 methods:

 init(playerName, endCallback)
 Starts a new game
 Generates a new number
 playerName is the name of the player in the high-score
 endCallback is a function that must be called when the game ends (the player wins)
 It is called after the high-score is updated
 guess(number)
 Available only after init() is invoked
 Should throw otherwise
 The player makes a guess agains the number
 Returns as a result an object in the format:
 { sheep: 3, rams: 1 }
 getHighScore(count)
 Returns the top count players of the high-score
 If count is greater than the total count of players in the high-score, return the actual number of player in the high-score
 The returned players are returned in an array, where each player is in the format:
 {name: 'Sheep master', score: 5}
 */

var CONSTANTS = {
    NUMBER_DIGITS : 4,
    DEFAULT_HIGHSCORES_COUNT : 5,
    HIGHSCORES : []
};

function getRandomNumbers(){
    var rndNumber,
        rndIndex,
        abcd = '';
    for (var i = 0; i < CONSTANTS.NUMBER_DIGITS; i++) {
        rndNumber = Math.random() * 100000 | 0;
        rndNumber = rndNumber + '';
        rndIndex = Math.random() * rndNumber.length | 0;
        abcd += rndNumber[rndIndex];
    }
    while (abcd[0] == '0'){
        abcd[0] = (Math.random() * 10 | 0) + '';
    }
    return abcd;
}

function endCallback(){
    console.log('******** GAME OVER ********');
}

var shipGame = (function solve() {

    var abcd = getRandomNumbers(),
        self,
        gameOver = false;

    function init(playerName, endCallback) {
        self = this;
        self.playerName = playerName;
        self.wins = endCallback;
        self.result = {
            Sheep : 0,
            Ram : 0
        };
        return self;
    }

    function guess(number) {
        if (!self.playerName){
            throw Error('Player must be initialized!');
        }
        number = number + '';
        if (number.length !== abcd.length){
            throw Error('Guess must be exactly ' + CONSTANTS.NUMBER_DIGITS + ' digits long');
        }
        var searchNumber,
            rams = 0,
            sheep = 0;
        for (var i = 0; i < number.length; i++) {
            searchNumber = number[i];
            if (abcd[i] === number[i]){
                rams++;
            }else if (abcd.indexOf(searchNumber) >= 0){
                sheep++;
            }
        }
        self.result.Ram += rams;
        self.result.Sheep += sheep;

        if (CONSTANTS.HIGHSCORES.length > 0 && CONSTANTS.HIGHSCORES[CONSTANTS.HIGHSCORES.length - 1].name === self.playerName){
            CONSTANTS.HIGHSCORES.pop();
        }
        CONSTANTS.HIGHSCORES.push({name : self.playerName, score : self.result.Ram * 2 + self.result.Sheep});

        if (number === abcd){
            getHighScore();
            self.wins();
            gameOver = true;
            return;
        }
        return self.result;
    }

    function getHighScore(count) {
        count = count || CONSTANTS.DEFAULT_HIGHSCORES_COUNT;
        var sortedScores = CONSTANTS.HIGHSCORES.sort(function (pl1, pl2) {
            return pl2.score - pl1.score;
        });

        for (var i = 0; i < count; i++) {
            if (sortedScores[i]) {
                console.log(sortedScores[i]);
            }
        }
    }

    if (gameOver){
        return;
    }

    return {
        init : init,
        guess : guess,
        getHighScore : getHighScore
    }
})();

function getPlayer(name){
    return shipGame.init(name, endCallback);
}

var players = [];
for (var i = 0; i < 1500; i++) {
    players.push(getPlayer('Pesho' + i));
    var rnd = Math.random() * 10000 | 0;
    rnd += '';
    while (rnd.length !== CONSTANTS.NUMBER_DIGITS){
       rnd = rnd.length < CONSTANTS.NUMBER_DIGITS ? rnd += Math.random() * 10 | 0 : +rnd;
    }

    players[i].guess(rnd);
}
//shipGame.getHighScore();
//module.exports = solve;




