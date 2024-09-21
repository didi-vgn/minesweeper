import {
    displayGameOver,
    displayGameSolved,
} from "./modals.js"

const container = document.querySelector('.grid-container');
const difficulty = document.getElementById('difficulty');
const reset = document.querySelector('.reset');

let width, height, bombAmount, bombsLeft, gameOver, winCondition, clickedCounter;

let timer = false;
let minute = 0;
let second = 0;
let tiles = [];

container.addEventListener("mouseup", (e) => {handleEvent(e)});

function handleEvent(e) {
    const domTile = e.target;
    const tile = tiles[domTile.id];
        if (!gameOver && clickedCounter !== winCondition){
            switch(e.button) {
                case 0: {
                    if (!tile.flagged){
                        clickTile(tile); 
                    } break;
                }
                case 2: {
                    if (!tile.clicked){
                        domTile.classList.toggle('flag');
                        tile.flagged = !tile.flagged;
                        if (tile.flagged) {
                            bombsLeft--;
                        } else bombsLeft++;
                        updateDisplay();
                    }
                    break;
                }
            }
            if (timer === false) {
                timer = true;
                startTimer();
            }
        }
        if (gameOver === true) {
            timer = false;
        }
        if (clickedCounter === winCondition) {
            timer = false;
        }
}

getDifficulty();
difficulty.addEventListener("change", getDifficulty);

reset.addEventListener("click", () => {
    
    generateGameBoard(width, height, bombAmount);
    
});

function generateGameBoard (width, height, bombAmount) {
    clearGameBoard();
    resetTimer();
    winCondition = width * height - bombAmount;
    clickedCounter = 0;
    bombsLeft = bombAmount;
    gameOver = false;
    tiles = [];

    for (let i = 0; i < width * height; i++) { //create empty tiles
        tiles.push({
            id: i,
            value: 0,
            class: '',
            clicked: false,
            flagged: false,
        })
    }

    let bombsPlaced = 0;
    while (bombsPlaced < bombAmount) { //add bombs
        const randomId = Math.floor(Math.random() * tiles.length);
        if (tiles[randomId].value != -1) {
            tiles[randomId].value = -1;
            tiles[randomId].class = 'bomb';
            bombsPlaced ++;
        }
    }
    
    checkAdjacentTiles(); //fill tiles with values, and classes

    for (let i = 0; i < height; i++){
        const row = document.createElement('div');
        row.className = 'row';

        for (let j = 0; j < width; j++){
            const domTile = document.createElement('div');
            const tile = tiles[i * width + j];
            domTile.className = 'tile';
            domTile.id = tile.id;
            domTile.setAttribute("oncontextmenu", "event.preventDefault();");
            row.appendChild(domTile);
        }
        container.appendChild(row);
    }
    updateDisplay();
}

function startTimer() {    
    if (timer === true) {
        second++
        if (second === 60) {
            minute++;
            second = 0;
        }

        let minDisplay = minute;
        let secDisplay = second;
        if (minute < 10) {
            minDisplay = "0" + minDisplay;
        }
        if (second < 10) {
            secDisplay = "0" + secDisplay;
        }

        document.querySelector('.stopwatch').textContent = `${minDisplay}:${secDisplay}`;
        setTimeout(startTimer, 1000)
    }
}

function resetTimer() {
    timer = false;
    minute = 0;
    second = 0;
    document.querySelector('.stopwatch').textContent = '00:00';
}

function getDifficulty() {
    switch (difficulty.value) {
        case "begginer": {
            width = 9;
            height = 9;
            bombAmount = 10;
            break;
        }
        case "intermediate": {
            width = 16;
            height = 16;
            bombAmount = 40;
            break;
        }
        case "expert": {
            width = 30;
            height = 16;
            bombAmount = 99;
            break;
        }
    }
    generateGameBoard(width, height, bombAmount);
}

function clearGameBoard(){
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function updateDisplay(){
    document.querySelector('.display').textContent = bombsLeft;
}

function isLeftEdge(index) {return (index % width === 0);}
function isRightEdge(index) {return (index % width === width - 1);}
function isTopEdge(index) {return ((index >= 0) && (index < width));}
function isBotEdge(index) {return ((index >= width * height - width) && (index < width * height));}

function checkAdjacentTiles() {
    for (let i = 0; i < tiles.length; i++) {
        const numbers = ['empty', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
        let number = 0;

        if (tiles[i].value === -1) continue;
        
        if (!isRightEdge(i) && tiles[i + 1].value === -1) number++; 
        if (!isLeftEdge(i) && tiles[i - 1].value === -1) number++;
        if (!isBotEdge(i) && tiles[i + width].value === -1) number++;
        if (!isTopEdge(i) && tiles[i - width].value === -1) number++;
        if (!isBotEdge(i) && !isRightEdge(i) && tiles[i + width + 1].value === -1) number++;
        if (!isBotEdge(i) && !isLeftEdge(i) && tiles[i + width - 1].value === -1) number++;
        if (!isTopEdge(i) && !isRightEdge(i) && tiles[i - width + 1].value === -1) number++;
        if (!isTopEdge(i) && !isLeftEdge(i) && tiles[i - width - 1].value === -1) number++;

        tiles[i].value = number;
        tiles[i].class = numbers[number];
    } return;
}

function clickAdjacentTiles(tile) {    
    if (!isRightEdge(tile.id)) {
        const newTile = tiles[tile.id + 1];
        if (!newTile.clicked) clickTile(newTile);
    }
    if (!isLeftEdge(tile.id)) {
        const newTile = tiles[tile.id - 1];
        if (!newTile.clicked) clickTile(newTile);
    }
    if (!isBotEdge(tile.id)) {
        const newTile = tiles[tile.id + width];
        if (!newTile.clicked) clickTile(newTile);
    }
    if (!isTopEdge(tile.id)) {
        const newTile = tiles[tile.id - width];
        if (!newTile.clicked) clickTile(newTile);
    }
    if (!isBotEdge(tile.id) && !isRightEdge(tile.id)) {
        const newTile = tiles[tile.id + width + 1];
        if (!newTile.clicked) clickTile(newTile);        
    }   
    if (!isBotEdge(tile.id) && !isLeftEdge(tile.id)) {
        const newTile = tiles[tile.id + width - 1];
        if (!newTile.clicked) clickTile(newTile);
    }
    if (!isTopEdge(tile.id) && !isRightEdge(tile.id)) {
        const newTile = tiles[tile.id - width + 1];
        if (!newTile.clicked) clickTile(newTile);
    }
    if (!isTopEdge(tile.id) && !isLeftEdge(tile.id)) {
        const newTile = tiles[tile.id - width - 1];
        if (!newTile.clicked) clickTile(newTile);
    }
    return;
}

function clickTile(tile) {
    clickedCounter++;
    const domTile = document.getElementById(tile.id);
    domTile.classList.add(tile.class);
    tile.clicked = true;

    if (tile.value === 0) {
        clickAdjacentTiles(tile);
    } else if (tile.value === -1) { //bomb clicked
        for (let i = 0; i < tiles.length; i++){
            if (tiles[i].value === -1 && !tiles[i].flagged)
                document.getElementById(i).classList.add(tile.class);
        }
        gameOver = true;
        displayGameOver();
    } else {domTile.textContent = tile.value;}
    if (clickedCounter === winCondition && !gameOver) {
        displayGameSolved();
    }
}

export {
    generateGameBoard,
    width, 
    height, 
    bombAmount,
}