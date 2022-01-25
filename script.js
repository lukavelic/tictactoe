const createPlayer = (name, symbol, increment) => {
    let state = false;
    return {name, symbol, increment, state}
}

const gameboard = (() => {
    // Create array
    let board = [];
    
    for(i = 0; i < 9; i++) {
        board.push('')
    }

    // Add event listeners on each div
    const squares = document.getElementsByClassName('tile');

    for(i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', updateBoard)
        squares[i].addEventListener('click', updateDisplay)
    }

    function updateBoard (event) {
        game.determinePlayer();

        const clickedTileData = event.target.getAttribute('data-position');
        board[clickedTileData] = game.activePlayer.increment;

        game.checkWinner();
        
        if(game.isWinner) {
            updateDisplay(event);
            const para = document.getElementById('playthrough');
            para.innerText = `${game.activePlayer.name} is the winner!`
            for(i = 0; i < squares.length; i++) {
                squares[i].removeEventListener('click', updateBoard);
                squares[i].removeEventListener('click', updateDisplay);
            }
        }
    }
    function updateDisplay (event) {
        const clickedTileElement = event.target;
        clickedTileElement.innerText = game.activePlayer.symbol;

        //Remove listener on click
        event.target.removeEventListener('click', updateBoard);
        event.target.removeEventListener('click', updateDisplay);
    }

    return {board}
})();


const game = (() => {
    const player1 = createPlayer('Player 1', 'X', 1);
    const player2 = createPlayer('Player 2', 'O', 2);

    let activePlayer = player1;
    let isWinner = false;

    const winningPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function determinePlayer() {
        if(player1.state === false) {
            player1.state = true;
            player2.state = false;
            this.activePlayer = player1;
        } else {
            player2.state = true;
            player1.state = false;
            this.activePlayer = player2;
        };
    };

    function checkWinner() {
        winningPatterns.forEach((element) => {
            if(gameboard.board[element[0]] === this.activePlayer.increment && gameboard.board[element[1]] === this.activePlayer.increment && gameboard.board[element[2]] === this.activePlayer.increment) {
                this.isWinner = true;
            }
        });
    };

    return {activePlayer, determinePlayer, checkWinner, isWinner};
})();