const BOARD_SIZE = 8;
const WHITE_PLAYER = 'White';
const DARK_PLAYER = 'Black';

const PAWN = 'Pawn';
const ROOK = 'Rook';
const KNIGHT = 'Knight';
const BISHOP = 'Bishop';
const KING = 'King';
const QUEEN = 'Queen';

let selectedCell;
let pieces = [];
let table;

class piece {
    constructor(row, col, color, name) {
        this.row = row;
        this.col = col;
        this.color = color;
        this.name = name;
    }

    getPossibleMoves() {
        let relativeMoves;
        console.log(this.name)
        if (this.name === PAWN) {
            relativeMoves = this.getPawnRelativeMoves();
        } else if (this.name === ROOK) {
            relativeMoves = this.getRookRelativeMoves();
        } else if (this.name === KNIGHT) {
            relativeMoves = this.getKnightRelativeMoves();
        } else if (this.name === BISHOP) {
            relativeMoves = this.getBishopRelativeMoves();
        } else if (this.name === KING) {
            relativeMoves = this.getKingRelativeMoves();
        } else if (this.name === QUEEN) {
            relativeMoves = this.getQueenRelativeMoves();
        } else {
            console.log("Unknown name: " + this.name)
        }
        console.log('relativeMoves', relativeMoves);

        let absoluteMoves = [];
        for (let relativeMove of relativeMoves) {
            const absoluteRow = this.row + relativeMove[0];
            const absoluteCol = this.col + relativeMove[1];
            absoluteMoves.push([absoluteRow, absoluteCol]);
        }
        console.log('absoluteMoves', absoluteMoves);

        let filteredMoves = [];
        for (let absoluteMove of absoluteMoves) {
            const absoluteRow = absoluteMove[0];
            const absoluteCol = absoluteMove[1];
            if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
                filteredMoves.push(absoluteMove);
            }
        }
        console.log('filteredMoves', filteredMoves);
        return filteredMoves;
    }

    getPawnRelativeMoves() {
        if (this.color === DARK_PLAYER) {
            return [[1, 0]];
        } else if (this.color === WHITE_PLAYER) {
            return [[-1, 0]];
        }
    }
    getRookRelativeMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, 0]);
            result.push([-i, 0]);
            result.push([0, i]);
            result.push([0, -i]);
        }
        return result;
    }
    getKnightRelativeMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, 0]);
            result.push([-i, 0]);
            result.push([0, i]);
            result.push([0, -i]);
        }
        return result;
        // row+2
        // col-+1
        // row+1
        // col+-2

    }
    getBishopRelativeMoves() {
        let result = [];
        for (let i = 0; i < BOARD_SIZE - this.col; i++) {
            result.push([0 - i, 0 + i]);
        }
        for (let i = 0; i < BOARD_SIZE - (this.row - this.col); i++) {
            result.push([0 - i, 0 - i]);
        }
        for (let i = 0; i < BOARD_SIZE + this.col; i++) {
            result.push([0 + i, 0 - i]);
        }
        for (let i = 0; i < BOARD_SIZE + (this.row - this.col); i++) {
            result.push([0 + i, 0 + i]);
        }
        return result;
    }
    getKingRelativeMoves() {
        let result = [];
        for (let i = 0; i < 2; i++) {
            result.push([0, 0 + i]);
            result.push([0, 0 - i]);
            result.push([0 - i, 0 + i]);
            result.push([0 - i, 0 - i]);
            result.push([0 - i, 0]);
        }
        for (let i = 0; i < 2; i++) {
            result.push([0, 0 - i]);
            result.push([0, 0 + i]);
            result.push([0 + i, 0 - i]);
            result.push([0 + i, 0 + i]);
            result.push([0 + i, 0]);
        }
        return result;
    }
    getQueenRelativeMoves() {
        let result = [];
        for (let i = 0; i < BOARD_SIZE - this.col; i++) {
            result.push([0 - i, 0 + i]);
        }
        for (let i = 0; i < BOARD_SIZE - (this.row - this.col); i++) {
            result.push([0 - i, 0 - i]);
        }
        for (let i = 0; i < BOARD_SIZE + this.col; i++) {
            result.push([0 + i, 0 - i]);
        }
        for (let i = 0; i < BOARD_SIZE + (this.row - this.col); i++) {
            result.push([0 + i, 0 + i]);
        }
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, 0]);
            result.push([-i, 0]);
            result.push([0, i]);
            result.push([0, -i]);
        }
        return result;
    }
}


// Builds the board.
function build() {
    table = document.createElement('table');
    document.body.appendChild(table);
    for (let row = 0; row < BOARD_SIZE; row++) {
        let tr = document.createElement('tr');
        table.appendChild(tr); // creates new tr
        for (let col = 0; col < BOARD_SIZE; col++) {
            // i and j to switch places
            const td = document.createElement('td');
            td.style = 'text-align: center; font-size: 60px;';
            if ((col + row) % 2 === 0) {
                td.className = 'white';
                td.id = (row + "_" + col)
                tr.appendChild(td);
            }
            else {
                td.className = 'dark';
                td.id = (row + "_" + col)
                tr.appendChild(td);
            }
            td.addEventListener('click', (event) => onCellClick(event, row, col));
        }
    }
    pieces = getInitialBoard();
    //console.log('pieces', pieces);
    console.log(pieces[0]);
    //pieces[16].getPossibleMoves();


    for (let piece of pieces) {
        addImg(table.rows[piece.row].cells[piece.col], piece.color, piece.name);
    }
}

// When clicking a td it marks it.
function onCellClick(event, row, col) {
    console.log(row, col)
    // Clean board.
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove('clicked');
        }
    }

    for (let piece of pieces) {
        if (piece.row === row && piece.col === col) {
            console.log(piece);
            let possibleMoves = piece.getPossibleMoves();
            for (let possibleMove of possibleMoves)
                table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('clicked');
        }
    }

    if (selectedCell !== undefined) {
        selectedCell.classList.remove('clicked');
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add('clicked');
}

// Adds the image to the cell.
function addImg(cell, color, name) {
    const img = document.createElement('img');
    img.style = 'width: 60px;height:60px;'
    img.src = 'pieces/' + color + name + '.svg';
    cell.appendChild(img);
}

// Puts the pieces on the board
function getInitialBoard() {
    let result = [];
    addFirstRowPieces(result, 0, DARK_PLAYER);
    addFirstRowPieces(result, 7, WHITE_PLAYER);
    for (let i = 0; i < 8; i++) {
        result.push(new piece(1, i, DARK_PLAYER, PAWN))
        result.push(new piece(6, i, WHITE_PLAYER, PAWN))
    }
    return result;
}
// To avoid duplicate in getInitialBoard().
function addFirstRowPieces(result, row, color) {
    result.push(new piece(row, 0, color, ROOK));
    result.push(new piece(row, 1, color, KNIGHT));
    result.push(new piece(row, 2, color, BISHOP));
    result.push(new piece(row, 3, color, QUEEN));
    result.push(new piece(row, 4, color, KING));
    result.push(new piece(row, 5, color, BISHOP));
    result.push(new piece(row, 6, color, KNIGHT));
    result.push(new piece(row, 7, color, ROOK));
}


window.addEventListener('load', build()); // Builds the chessboard.