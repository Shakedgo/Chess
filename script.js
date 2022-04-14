const newTable = document.createElement('table');
document.body.appendChild(newTable); // Create table;

// creates th in the column.
// get - name of the class. and the tr we're in;
function columnCreator(nameClass, tr){
    const th = document.createElement('th')
    th.className = nameClass;
    tr.appendChild(th);
}

for (let i=0; i<8; i++){
    let tr = document.createElement('tr')
    newTable.appendChild(tr); // creates new tr
    for (let j=0; j<8;j++){
        // i and j to switch places
        if(i%2===0){
            if (j%2 === 0){columnCreator('dark', tr);}
            else {columnCreator('white', tr);}
        }
        else {
            if (j%2 === 0){columnCreator('white', tr);}
            else {columnCreator('dark', tr);}
        }
    }
}