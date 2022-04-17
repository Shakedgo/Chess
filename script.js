function build(newTable) {
    for (let i = 0; i < 8; i++) {
        let tr = document.createElement('tr');
        newTable.appendChild(tr); // creates new tr
        for (let j = 0; j < 8; j++) {
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
            if (i === 0) {
                if (j===0 || j === 7) {
                    addImg(td,'BlackRook');
                } else if (j === 1 || j===6) {
                    addImg(td, 'BlackKnight');
                } else if (j === 2 || j===5) {
                    addImg(td, 'BlackBishop');
                } else if (j===3) {
                    addImg(td, 'BlackQueen');
                } else if (j===4) {
                    addImg(td, 'BlackKing');
                }
            } else if (i === 1) {
                addImg(td, 'BlackPawn');
            } else if (i === 6) {
                addImg(td, 'WhitePawn');
            } else if (i === 7) {
                if (j===0 || j === 7) {
                    addImg(td,'WhiteRook');
                } else if (j === 1 || j===6) {
                    addImg(td, 'WhiteKnight');
                } else if (j === 2 || j===5) {
                    addImg(td, 'WhiteBishop');
                } else if (j===3) {
                    addImg(td, 'WhiteQueen');
                } else if (j===4) {
                    addImg(td, 'WhiteKing');
                }
            }
            td.onclick = () => { cellClick(td) };
        }
    }
}

function addImg(cell, name) {
    const img = document.createElement('img');
    img.style = 'width: 60px;height:60px;'
    img.src = 'pieces/' + name + '.svg';
    cell.appendChild(img);
    console.log(img.src)
}

function cellClick(td) {
    selectedCell = document.querySelector(".clicked")
    console.log("td = " + td)
    console.log("selectedCell = " + selectedCell)
    if (selectedCell !== null) {
        selectedCell.classList.remove("clicked")
    }
    td.classList.toggle("clicked")
    selectedCell = td

}

const newTable = document.createElement('table');
document.body.appendChild(newTable); // Create table.
build(newTable) // Builds the chessboard.