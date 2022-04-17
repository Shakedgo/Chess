function build(newTable){
    for (let i = 0; i < 8; i++) {
        let tr = document.createElement('tr');
        newTable.appendChild(tr); // creates new tr
        for (let j = 0; j < 8; j++) {
            // i and j to switch places
            const td = document.createElement('td');
            td.style='text-align: center; font-size: 60px;';
            if ((j + i) % 2 === 0) {
                td.className = 'white';
                tr.appendChild(td);
            }
            else {
                td.className = 'dark';
                tr.appendChild(td);
            }
            let count = 0;
            td.addEventListener("click", () => {td.classList.toggle("clicked")})
        }
    }
}

function populate(newTable) {
    getCell = (x,y) =>{
        return newTable.rows[x].cells[y];
    }
    addPieces = (path) => {
        let img = document.createElement('img');
        img.style = 'width: 60px;height:60px;'
        img.src ='pieces/' + path + '.svg';
        return img;
    }
    getCell(0,0).appendChild(addPieces('BlackRook'))
    getCell(0,7).appendChild(addPieces('BlackRook'))
    getCell(7,0).appendChild(addPieces('WhiteRook'))
    getCell(7,7).appendChild(addPieces('WhiteRook'))
    
    getCell(0,1).appendChild(addPieces('BlackKnight'))
    getCell(0,6).appendChild(addPieces('BlackKnight'))
    getCell(7,1).appendChild(addPieces('WhiteKnight'))
    getCell(7,6).appendChild(addPieces('WhiteKnight'))
    
    getCell(0,2).appendChild(addPieces('BlackBishop'))
    getCell(0,5).appendChild(addPieces('BlackBishop'))
    getCell(7,2).appendChild(addPieces('WhiteBishop'))
    getCell(7,5).appendChild(addPieces('WhiteBishop'))

    getCell(0,3).appendChild(addPieces('BlackQueen'))
    getCell(7,3).appendChild(addPieces('WhiteQueen'))

    getCell(0,4).appendChild(addPieces('BlackKing'))
    getCell(7,4).appendChild(addPieces('WhiteKing'))

    for (let i=0; i<8; i++){
        getCell(1,i).appendChild(addPieces('BlackPawn'))
    }
    for (let i=0; i<8; i++){
        getCell(6,i).appendChild(addPieces('WhitePawn'))
    }

}

const newTable = document.createElement('table');
document.body.appendChild(newTable); // Create table;

build(newTable)
populate(newTable);