const container = document.querySelector(".grid-container");
const bomb = 'bomb';
const empty = 'empty';
const width = 30;
const height = 16;
const bombAmount = 99;

let tileCount = 0;
let tileArray = [];
let valueArray = [];
let gameOver = false;

function generateGameBoard (width, height, bombAmount) {
    fillArray(tileArray, (width * height - bombAmount), empty);
    fillArray(tileArray, bombAmount, bomb);
    tileArray.sort(() => Math.random() - 0.5); //shuffle array
    tileArray.sort(() => Math.random() - 0.5);
    
    checkAdjacentTiles();

    for (let i = 1; i <= height; i++){
        const row = document.createElement('div');
        row.className = "row";

        for (let j = 1; j <= width; j++){
            const tile = document.createElement('div');
            tile.className = "tile";
            tile.id = tileCount;

            tile.addEventListener('click', () => {
                if (tile.className === "tile") clickTile(tile);
            })

            row.appendChild(tile);
            tileCount++;
        }
        container.appendChild(row);
    }

}

generateGameBoard(width, height, bombAmount);

function fillArray(array, numberOfElements, element) {
    for (let i = 0; i < numberOfElements; i++) {
        array.push(element);
    }
    return;
}
function isLeftEdge(index) {return (index % width === 0);}
function isRightEdge(index) {return (index % width === width - 1);}
function isTopEdge(index) {return ((index >= 0) && (index < width));}
function isBotEdge(index) {return ((index >= width * height - width) && (index < width * height));}

function checkAdjacentTiles() {
    for (let i = 0; i < tileArray.length; i++) {
        let number = 0;
        if (tileArray[i] === bomb) {valueArray.push(bomb);continue;}
        
        if (!isRightEdge(i) && tileArray[i + 1] === bomb) number++; 
        if (!isLeftEdge(i) && tileArray[i - 1] === bomb) number++;
        if (!isBotEdge(i) && tileArray[i + width] === bomb) number++;
        if (!isTopEdge(i) && tileArray[i - width] === bomb) number++;
        if (!isBotEdge(i) && !isRightEdge(i) && tileArray[i + width + 1] === bomb) number++;
        if (!isBotEdge(i) && !isLeftEdge(i) && tileArray[i + width - 1] === bomb) number++;
        if (!isTopEdge(i) && !isRightEdge(i) && tileArray[i - width + 1] === bomb) number++;
        if (!isTopEdge(i) && !isLeftEdge(i) && tileArray[i - width - 1] === bomb) number++;

        switch (number) {
            case 0: tileArray[i] = 'empty'; break;
            case 1: tileArray[i] = 'one'; break;
            case 2: tileArray[i] = 'two'; break;
            case 3: tileArray[i] = 'three'; break;
            case 4: tileArray[i] = 'four'; break;
            case 5: tileArray[i] = 'five'; break;
            case 6: tileArray[i] = 'six'; break;
            case 7: tileArray[i] = 'seven'; break;
            case 8: tileArray[i] = 'eight'; break;
        }
        valueArray.push(number);
    }
    return;
}

function clickAdjacentTiles(tile) {
    const currentId = Number(tile.id);
    
    if (!isRightEdge(currentId)) {
        const newTile = document.getElementById(currentId + 1);
        if (newTile.className === "tile") clickTile(newTile);
    }
    if (!isLeftEdge(currentId)) {
        const newTile = document.getElementById(currentId - 1);
        if (newTile.className === "tile") clickTile(newTile);
    }
    if (!isBotEdge(currentId)) {
        const newTile = document.getElementById(currentId + width);
        if (newTile.className === "tile") clickTile(newTile);
    }
    if (!isTopEdge(currentId)) {
        const newTile = document.getElementById(currentId - width);
        if (newTile.className === "tile") clickTile(newTile);
    }
    if (!isBotEdge(currentId) && !isRightEdge(currentId)) {
        const newTile = document.getElementById(currentId + width + 1);
        if (newTile.className === "tile") clickTile(newTile);        
    }   
    if (!isBotEdge(currentId) && !isLeftEdge(currentId)) {
        const newTile = document.getElementById(currentId + width - 1);
        if (newTile.className === "tile") clickTile(newTile);
    }
    if (!isTopEdge(currentId) && !isRightEdge(currentId)) {
        const newTile = document.getElementById(currentId - width + 1);
        if (newTile.className === "tile") clickTile(newTile);
    }
    if (!isTopEdge(currentId) && !isLeftEdge(currentId)) {
        const newTile = document.getElementById(currentId - width - 1);
        if (newTile.className === "tile") clickTile(newTile);
    }
    return;
}

function revealGameBoard(){
    const tiles = document.querySelectorAll('.tile');            
    tiles.forEach(tile => {
        if (tile.className === "tile"){
        tile.classList += " " + tileArray[tile.id];
            if (tile.classList.contains(empty)) {
                tile.textContent = " ";
            } else if (tile.classList.contains(bomb)) {
                tile.textContent = "*";
            } else tile.textContent = valueArray[tile.id];
        }
    })
}

function clickTile(tile) {
    tile.classList += " " + tileArray[tile.id];
    if (tile.classList.contains(empty)) {
        clickAdjacentTiles(tile);
    }
    else if (tile.classList.contains(bomb)) {
        tile.textContent = "*"; 
        revealGameBoard();
        gameOver = true;
    } else {tile.textContent = valueArray[tile.id];}
}