let moves = 0;
let rows, cols, table, movesDisplayed, arrayBoard, duration;

function createBoard() {
    document.querySelector('body').insertAdjacentHTML('afterbegin', '<div class="wrapper"></div>');
    document.querySelector('.wrapper').insertAdjacentHTML('afterbegin', '<table id="gem-table"></table>');
    document.querySelector('table').insertAdjacentHTML('afterend', '<input type="button" id="start-game" value="Start">');
    document.querySelector('#start-game').insertAdjacentHTML('afterend', '<div class="stats-container"></div>');
    document.querySelector('.stats-container').insertAdjacentHTML('afterbegin', '<label id="label-rows">Rows <input type="text" id="rows" value="4" size="2"></label>');
    document.querySelector('#label-rows').insertAdjacentHTML('afterend', '<label id="label-cols">Columns <input type="text" id="cols" value="4" size="2"></label>');
    document.querySelector('#label-cols').insertAdjacentHTML('afterend', '<span id="moves-container">Moves <span id="moves">0</span></span>');
    document.querySelector('#moves-container').insertAdjacentHTML('afterend', '<span id="time">Duration <label id="min">00</label>:<label id="sec">00</label></span>');
    document.querySelector('#time').insertAdjacentHTML('afterend', 
    '<div id="comment" >You can choose the size of the board by entering the number of <strong>rows</strong> and <strong>columns</strong> in the corresponding fields and start the game by pressing <strong>Start</strong>.</div>');
   
    let startButton = document.querySelector('#start-game');
    startButton.addEventListener('click', startGame);
    startButton.addEventListener('click', startTimer);
    movesDisplayed = document.querySelector('#moves');
    duration = document.querySelector('#duration');
    table = document.querySelector('#gem-table');
    rows = 4;
    cols = 4;
    startGame();
}

function startGame() {
    let arrayOfNum = [];
    let usedNumbers;
    moves = 0;
    let random = 0;
    let count = 0;
    rows = document.querySelector('#rows').value;
    cols = document.querySelector('#cols').value;
    movesDisplayed.innerHTML = moves;
    // create board size
    arrayBoard = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arrayBoard[i] = new Array(cols);
    }
    // temporary array for unique numbers
    usedNumbers = new Array(rows * cols);
    for (let i = 0; i < rows * cols; i++) {
        usedNumbers[i] = 0;
    }

    // add random number to the board
    for (let i = 0; i < rows * cols; i++) {
        random = Math.floor(Math.random() * rows * cols);
        // if random num is unique, insert it in the board
        if (usedNumbers[random] == 0) {
            usedNumbers[random] = 1;
            arrayOfNum.push(random);
            // num is not unique, check further
        } else {
            i--;
        }
    }

    // add numbers to the board
    count = 0;
    //console.log(arrayBoard)
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            arrayBoard[i][j] = arrayOfNum[count];
            count++;
        }
    }
    displayTable();
}

function displayTable() {
    let outputStr = "";
    for (let i = 0; i < rows; i++) {
        outputStr += "<tr>";
        for (let j = 0; j < cols; j++) {
            if (arrayBoard[i][j] == 0) {
                outputStr += `<td class="empty"> </td>`;
            } else {
                outputStr += `<td class="square" onclick="moveSquare(${i}, ${j})">${arrayBoard[i][j]}</td>`;
            }
        }
        outputStr += "</tr>";
    }
    table.innerHTML = outputStr;
}

function moveSquare(rowsTable, colsTable) {
    if (ableToMove(rowsTable, colsTable, "up") ||
        ableToMove(rowsTable, colsTable, "down") ||
        ableToMove(rowsTable, colsTable, "left") ||
        ableToMove(rowsTable, colsTable, "right")) {
        moveFurther();
    } else {
        alert("Square should be next to the blank space.");
    }
    if (checkIfWinner()) {
        alert(`Congrats, the puzzle is solved in ${moves} moves!`);
        startGame();
    }
}

function ableToMove(rowCoord, colCoord, direct) {
    rowOffset = 0;
    colOffset = 0;
    if (direct == "up") {
        rowOffset = - 1;
    } else if (direct == "down") {
        rowOffset = 1;
    } else if (direct == "left") {
        colOffset = - 1;
    } else if (direct == "right") {
        colOffset = 1;
    }

    // check if square can be moved and move it.
    if (rowCoord + rowOffset >= 0 && colCoord + colOffset >= 0
        && rowCoord + rowOffset < rows && colCoord + colOffset < cols) {
        if (arrayBoard[rowCoord + rowOffset][colCoord + colOffset] == 0) {
            arrayBoard[rowCoord + rowOffset][colCoord + colOffset] = arrayBoard[rowCoord][colCoord];
            arrayBoard[rowCoord][colCoord] = 0;
            displayTable();
            return true;
        }
    }
    return false;
}

function checkIfWinner() {
    count = 1;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (arrayBoard[i][j] != count) {
                if (!(count === rows * cols && arrayBoard[i][j] === 0)) {
                    return false;
                }
            }
            count++;
        }
    }
    document.querySelector("#min").innerHTML = "00";
    document.querySelector("#sec").innerHTML = "00";
    return true;
}

function moveFurther() {
    moves++;
    if (movesDisplayed) {
        movesDisplayed.innerHTML = moves;
    }
}

document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('square')) {
        event.target.classList.add('active');
    }
   
})

document.addEventListener('mouseup', (event) => {
    document.querySelectorAll('table').forEach(item => {
        item.classList.remove('active');
    });
})

function startTimer() {
    minLabel = document.querySelector("#min");
    secLabel = document.querySelector("#sec");
    let totalSec = 0;
    setInterval(setTime, 1000);

    function setTime()
    {
        totalSec++;
        secLabel.innerHTML = add(totalSec%60);
        minLabel.innerHTML = add(parseInt(totalSec/60));
    }

    function add(value)
    {
        let valueStr = value + "";
        if(valueStr.length < 2)
        {
            return "0" + valueStr;
        }
        else
        {
            return valueStr;
        }
    }
 }


window.addEventListener('DOMContentLoaded', () => {
    createBoard();
    startGame();
}); 


