const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
let currentPlayer = 'X';
let scoreX = 0;
let scoreO = 0;
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        cell.innerText = currentPlayer;
        if (checkWin(currentPlayer)) {
            updateScore();
            endGame(false);
        } else if (board.every(cell => cell !== '')) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        scoreXElement.innerText = scoreX;
    } else {
        scoreO++;
        scoreOElement.innerText = scoreO;
    }
}

function endGame(draw) {
    if (draw) {
        alert('It\'s a draw!');
    } else {
        alert(`Player ${currentPlayer} wins!`);
    }
    resetBoard();
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', () => {
    scoreX = 0;
    scoreO = 0;
    scoreXElement.innerText = scoreX;
    scoreOElement.innerText = scoreO;
    resetBoard();
});
