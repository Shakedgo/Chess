const BOARD_SIZE = 8;
const WHITE_PLAYER = 'White';
const DARK_PLAYER = 'Black';

let selectedCell;
let pieces = [];

// Builds the board.
function build(newTable) {
    for (let i = 0; i < BOARD_SIZE; i++) {
        let tr = document.createElement('tr');
        newTable.appendChild(tr); // creates new tr
        for (let j = 0; j < BOARD_SIZE; j++) {
            // i and j to switch places
            const td = document.createElement('td');
            td.style = 'text-align: center; font-size: 60px;';
            if ((j + i) % 2 === 0) {
                td.className = 'white';
                td.id = (i + "_" + j)
                tr.appendChild(td);
            }
            else {
                td.className = 'dark';
                td.id = (i + "_" + j)
                tr.appendChild(td);
            }
            td.addEventListener('click', onCellClick);
        }
    }
    pieces = getInitialBoard();
    for (let piece of pieces) {
        addImg(newTable.rows[piece.row].cells[piece.col], piece.color, piece.name);
    }
}

// When clicking a td it marks it.
function onCellClick(event) {
    if (selectedCell !== undefined) {
        cleanBoard();
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.toggle('clicked');
    if (selectedCell.firstChild !== null) {
        checkMoves();
    }
}

// Cleans all the board.
function cleanBoard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            move = document.getElementById(`${i}_${j}`)
            move.classList.remove('clicked')
        }
    }
}
// Marks the moves of each piece.
// ..By the way - this is shit.
function checkMoves() {
    let move = selectedCell;
    cleanBoard();
    let splitter = selectedCell.id.split('_')
    let row = parseInt(splitter[0]); // from string to int
    let col = parseInt(splitter[1]);
    // Pawns
    if (row === 6){
        for (let i = 0; i < BOARD_SIZE; i++) {
            if (selectedCell.id === `${row}_${i}`) {
                move = document.getElementById(`${row-1}_${i}`)
                move.classList.add('clicked')
                if (row === 6){ // Stupid now but differ from first move.
                    move = document.getElementById(`${row-2}_${i}`)
                    move.classList.add('clicked')
                }
            }
        }
    }
    //Rooks
    if (selectedCell.id === '7_0' || selectedCell.id === '7_7') {
        for (let i = 0; i < BOARD_SIZE; i++) {
            move = document.getElementById(`${row}_${i}`)
            move.classList.toggle('clicked')
            move = document.getElementById(`${i}_${col}`)
            move.classList.toggle('clicked')
        }
    }
    // Knights
    if (selectedCell.id === '7_1' || selectedCell.id === '7_6') {
        if (selectedCell.id === '7_1') {
            // Lemi iesh koh lhashev....
            //for (let i=0; i<BOARD_SIZE;i++){
            //    row+2
            //    col-+1
            //    //
            //    row+1
            //    col+-2
            //}
            move = document.getElementById(`5_0`)
            move.classList.toggle('clicked')
            move = document.getElementById(`5_2`)
            move.classList.toggle('clicked')
            move = document.getElementById(`6_3`)
            move.classList.toggle('clicked')
        } else {
            move = document.getElementById(`5_7`)
            move.classList.toggle('clicked')
            move = document.getElementById(`5_5`)
            move.classList.toggle('clicked')
            move = document.getElementById(`6_4`)
            move.classList.toggle('clicked')
        }
    }
    // Bishops - Math man.
    if (selectedCell.id === '7_2' || selectedCell.id === '7_5') {
        for (let j = 0; j < BOARD_SIZE-col; j++) {
            move = document.getElementById(`${row - j}_${col + j}`);
            console.log(`${row - j}_${col + j}`);
            move.classList.toggle('clicked');
        }
        for (let i = 0; i < BOARD_SIZE - (row - col); i++) {
            move = document.getElementById(`${row - i}_${col - i}`)
            console.log(`${row - i}_${col - i}`);
            move.classList.toggle('clicked')
        }
    }
    // Queen
    if (selectedCell.id === '7_3') {
        for (let i = 0; i < BOARD_SIZE; i++) {
            move = document.getElementById(`${row}_${i}`)
            move.classList.toggle('clicked')
            move = document.getElementById(`${i}_${col}`)
            move.classList.toggle('clicked')
        }
        for (let j = 1; j < BOARD_SIZE-col; j++) {
            move = document.getElementById(`${row - j}_${col + j}`);
            move.classList.toggle('clicked');
        }
        for (let i = 1; i < BOARD_SIZE - (row - col); i++) {
            move = document.getElementById(`${row - i}_${col - i}`)
            move.classList.toggle('clicked')
        }
    }
    // King
    if (selectedCell.id === '7_4') {
        for(let i=0; i<2;i++){
            move = document.getElementById(`${row}_${col+i}`)
            move.classList.toggle('clicked')
            move = document.getElementById(`${row}_${col-i}`)
            move.classList.toggle('clicked')
            move = document.getElementById(`${row-i}_${col+i}`)
            move.classList.toggle('clicked')
            move = document.getElementById(`${row-i}_${col-i}`)
            move.classList.toggle('clicked')
            move = document.getElementById(`${row-i}_${col}`)
            move.classList.toggle('clicked')
        }
    }
}

// Adds the image to the cell.
function addImg(cell, color, name) {
    const img = document.createElement('img');
    img.style = 'width: 60px;height:60px;'
    img.src = 'pieces/' + color + name + '.svg';
    cell.appendChild(img);
}

class piece {
    constructor(row, col, color, name) {
        this.row = row;
        this.col = col;
        this.color = color;
        this.name = name;
    }
}

// Puts the pieces on the board
function getInitialBoard() {
    let result = [];
    addFirstRowPieces(result, 0, DARK_PLAYER);
    addFirstRowPieces(result, 7, WHITE_PLAYER);
    for (let i = 0; i < 8; i++) {
        result.push(new piece(1, i, DARK_PLAYER, "Pawn"))
        result.push(new piece(6, i, WHITE_PLAYER, "Pawn"))
    }
    return result;
}
// To avoid duplicate in getInitialBoard().
function addFirstRowPieces(result, row, color) {
    result.push(new piece(row, 0, color, "Rook"));
    result.push(new piece(row, 1, color, "Knight"));
    result.push(new piece(row, 2, color, "Bishop"));
    result.push(new piece(row, 3, color, "Queen"));
    result.push(new piece(row, 4, color, "King"));
    result.push(new piece(row, 5, color, "Bishop"));
    result.push(new piece(row, 6, color, "Knight"));
    result.push(new piece(row, 7, color, "Rook"));
}

const newTable = document.createElement('table');
document.body.appendChild(newTable); // Create table.
build(newTable) // Builds the chessboard.