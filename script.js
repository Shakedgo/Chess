const newTable = document.createElement('table');
document.body.appendChild(newTable); // Create table;

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
        // Fuck this is awful.
        if (i === 0 && j===0 || i === 0 && j ===7){
            td.innerHTML = '&#9820;'; //Black Rook
        }
        if (i === 7 && j===7 || i === 7 && j ===0){
            td.innerHTML = '&#9814;'; //White Rook
        }
        if (i === 0 && j === 1 || i===0 && j===6){
            td.innerHTML = '&#9822;'; //Black Knight
        }
        if (i === 7 && j === 6 || i===7 && j===1){
            td.innerHTML = '&#9816;'; //White Knight
        }
        if (i === 0 && j === 2 || i===0 && j===5){
            td.innerHTML = '&#9821;'; //Black Bishop
        }
        if (i === 7 && j === 5 || i===7 && j===2){
            td.innerHTML = '&#9815;'; //White Bishop
        }
        if (i === 1){
            td.innerHTML = '&#9823;'; //Black Pawn
        }
        if (i === 6){
            td.innerHTML = '&#9817;'; //White Pawn
        }
        if (i === 0 && j === 3) {
            td.innerHTML = '&#9819;'; //Black Queen
        }
        if (i === 7 && j === 3) {
            td.innerHTML = '&#9813;'; //White Queen
        }
        if (i === 0 && j === 4) {
            td.innerHTML = '&#9818;'; //Black King
        }
        if (i === 7 && j === 4) {
            td.innerHTML = '&#9812;'; //White King
        }
        //newTable.addEventListener('click', () => {th.className = 'clicked';})
    }
}
