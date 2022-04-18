const BOARD_SIZE = 8;
const WHITE_PLAYER = 'White';
const DARK_PLAYER = 'Black';

let selectedCell;
let pieces = [];

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
                tr.appendChild(td);
            }
            else {
                td.className = 'dark';
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

function onCellClick(event) {  
    if (selectedCell !== undefined) {
        selectedCell.classList.remove('clicked');
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add('clicked');
    //checkMoves();
}

//function checkMoves(){
//    //console.log(getInitialBoard()[1].row)
//    //console.log(getInitialBoard()[1].col)
//    //console.log(getInitialBoard()[1].name)
//    //console.log(selectedCell.firstChild);
//    selectedCell = selectedCell.classList;
//    console.log(selectedCell)
//    //if (selectedCell.firstChild !== null) {
//    //    // loop to check if the selected cell is the piece
//    //    for (let i = 0; i< getInitialBoard().length; i++){
//    //    }
//    //}
//}

function addImg(cell, color, name) {
    const img = document.createElement('img');
    img.style = 'width: 60px;height:60px;'
    img.src = 'pieces/' + color + name + '.svg';
    cell.appendChild(img);
}

class piece {
    constructor(row, col, color, name){
        this.row = row;
        this.col = col;
        this.color = color;
        this.name = name;
    }
}


function getInitialBoard() {
    let result = [];
    result.push(new piece(0, 0,  DARK_PLAYER, "Rook"))
    result.push(new piece(0, 1, DARK_PLAYER, "Knight"))
    result.push(new piece(0, 2,  DARK_PLAYER, "Bishop"))
    result.push(new piece(0, 3, DARK_PLAYER, "Queen"))
    result.push(new piece(0, 4,  DARK_PLAYER, "King"))
    result.push(new piece(0, 5,  DARK_PLAYER, "Bishop"))
    result.push(new piece(0, 6, DARK_PLAYER, "Knight"))
    result.push(new piece(0, 7,  DARK_PLAYER, "Rook"))
    for (let i =0; i<8; i++){
        result.push(new piece(1, i,  DARK_PLAYER, "Pawn"))
    }
    for (let i =0; i<8; i++){
        result.push(new piece(6, i,  WHITE_PLAYER, "Pawn"))
    }
    result.push(new piece(7, 0,  WHITE_PLAYER, "Rook"))
    result.push(new piece(7, 1, WHITE_PLAYER, "Knight"))
    result.push(new piece(7, 2,  WHITE_PLAYER, "Bishop"))
    result.push(new piece(7, 3, WHITE_PLAYER, "Queen"))
    result.push(new piece(7, 4,  WHITE_PLAYER, "King"))
    result.push(new piece(7, 5,  WHITE_PLAYER, "Bishop"))
    result.push(new piece(7, 6, WHITE_PLAYER, "Knight"))
    result.push(new piece(7, 7,  WHITE_PLAYER, "Rook"))
    return result;
}


const newTable = document.createElement('table');
document.body.appendChild(newTable); // Create table.
build(newTable) // Builds the chessboard.