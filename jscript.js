const container = document.querySelector(".grid-container");


function generateGrid (a, b) {
    for (let i = 1; i <= b; i++){
        const row = document.createElement('div');
        row.setAttribute('class', 'row');
        for (let j = 1; j <= a; j++){
            const tile = document.createElement('div');
            tile.setAttribute('class', 'tile');
            row.appendChild(tile);
        }
        container.appendChild(row);
    }
}

generateGrid(30, 16);

