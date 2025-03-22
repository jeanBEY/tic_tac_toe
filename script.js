const Player = (sign, name) => {

    const getName = () => {
        return name;
    }

    const getSign = () => {
        return sign;
    }

    return { getSign, getName };
}

const VirtualBoard = (() => {
    const board = ["", "", "", "","", "", "", "", ""];

    const setField = (index, sign) => {
        board[index] = sign;
    };

    const getField = (index) => {
        return board[index];
    };

    const resetFields = () =>{
        for(let i=0; i<board.length; i++){
            board[i] = "";
        }
    };

    return { setField, getField, resetFields, board };
})();

const GameController = (() => {

    let round = 1;
    let gameWon = false;
    let gameTie = false;

    const playerX = Player("X", "PlaceholderNameX");
    const playerO = Player("O", "PlaceholderNameO");

    const vBoard = VirtualBoard;

    //RESET GAME
    const resetGame = () => {
        vBoard.resetFields();
        round = 1;
        gameWon = false;
        gameTie = false;
    }

    //GET CURRENT PLAYER
    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    }

    //GET ROUND
    const getRound = () => {
        return round;
    }

    //GET GAME WON
    const getGameWon = () => {
        return gameWon;
    }

    //GET GAME TIE
    const getGameTie = () => {
        return gameTie;
    }

    //PLAY ROUND
    const playRound = (index) => {
        
        //Check if index is occupied, if not, set it
        if(vBoard.getField(index) === ""){
            vBoard.setField(index, getCurrentPlayerSign());
        }
        else{
            //ADD FUNCTIONALITY HERE TO WARN PLAYER, CAN DELETE
            console.log("ALERT:  PICK ANOTHER SQUARE");
            return;
        }

        //CAN DELETE
        console.log(vBoard.board);

        //Check for winner
        checkWinner();
        
        //If there's a winner or tie
        if(gameWon == true){
            //ADD FUNCTIONALITY HERE SHOW GAME IS OVER
            console.log("****************");
            console.log("WE HAVE A WINNER");
            console.log("****************");
            resetGame();
            return;
        }
        if(round === 9){
            gameTie = true;
            console.log("*************");
            console.log("WE HAVE A TIE");
            console.log("*************");
            resetGame();
            return;
        }

        round++;
    }

    //CHECK WINNER
    //get each player's squares, compare VS array of winning combinations
    const checkWinner = () => {

        const playerXindices = [];
        const playerOindices = [];

        //Need indices of playerX & playerO
        vBoard.board.forEach((element,index) => {
            if(element === playerX.getSign()){
                playerXindices.push(index);
            }
            else if(element === playerO.getSign()){
                playerOindices.push(index);
            }
        });

        const winningCombinations = [
            [0,4,8],
            [0,1,2],
            [0,3,6],
            [6,7,8],
            [3,4,5],
            [2,5,8],
            [1,4,7],
            [6,4,2],
        ];

        let playerXwins = false;
        let playerOwins = false;

        //Loop through array of winning combinations.  For each combination, 
        //check if all of its elements are present in the X or O array
        //User every() method on the combination to ensure that every element is included
        //in the X or O array
        let resultX = winningCombinations.map(combination =>
            combination.every(item => playerXindices.includes(item))
        );

        let resultO = winningCombinations.map(combination =>
            combination.every(item => playerOindices.includes(item))
        );

        playerXwins = resultX.includes(true);
        playerOwins = resultO.includes(true);

        //CAN DELETE
        console.log("Player X wins:" + playerXwins);
        console.log("Player X Indices:" + playerXindices);
        console.log("Player O wins:" + playerOwins);
        console.log("Player O Indices:" + playerOindices);
        

        if(playerXwins == true){
            gameWon = true;
        }
        if(playerOwins == true){
            gameWon = true;
        }

    }

    //CHECK TIE
    //if rounds = 9, then it's a tie
    const checkTie = () => {
        if(round === 9){
            gameTie = true;
        }
    }

    return {
        resetGame,
        getCurrentPlayerSign,
        getGameWon,
        getGameTie,
        playRound,
        checkWinner,
        checkTie,
        getRound,
        vBoard
    };

})();


/*  TESTING

//Player Factory Function - Testing//

const player1 = Player("X", "Alice");
console.log(player1.getSign()); // "X"
console.log(player1.getName()); // "Alice"

const player2 = Player("O", "Bob");
console.log(player2.getSign()); // "O"
console.log(player2.getName()); // "Bob"

//VirtualBoard IIFE Factory Function - Testing//

const board = VirtualBoard;

// Set values on the board
board.setField(0, "X");
board.setField(1, "O");
board.setField(2, "X");

console.log(board.getField(0)); // "X"
console.log(board.getField(1)); // "O"
console.log(board.getField(2)); // "X"

// Reset the board
board.resetFields();
console.log(board.getField(0)); // ""
console.log(board.getField(1)); // ""
console.log(board.getField(2)); // ""



//GameController IIFE Factory Function - Testing 1//
const gameController = GameController;

console.log("--------------------------");
gameController.playRound(0);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(1);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(5);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(2);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(6);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(3);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(7);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(4);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(8);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());


/*

//GameController IIFE Factory Function - Testing 2//
const gameController = GameController;

console.log("--------------------------");
gameController.playRound(1);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(0);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(2);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(5);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(3);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(6);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(4);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(7);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());
console.log("--------------------------");
gameController.playRound(8);
//console.log(gameController.vBoard.board);
console.log("Round:" + gameController.getRound());
console.log("Game Won:" + gameController.getGameWon());
console.log("Game Tie:" + gameController.getGameTie());

*/