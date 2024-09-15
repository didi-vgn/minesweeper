const container = document.querySelector(".grid-container");
const difficulty = document.getElementById('difficulty');
const reset = document.querySelector(".reset");
const bomb = 'bomb';
const empty = 'empty';

let width, height, bombAmount, bombsLeft, tileCount, tileArray, valueArray, gameOver;

let timer = false;
let minute = 0;
let second = 0;

getDifficulty();
difficulty.addEventListener("change", getDifficulty);

reset.addEventListener("click", () => {
    clearGameBoard();
    generateGameBoard(width, height, bombAmount);
    resetTimer();
});

function generateGameBoard (width, height, bombAmount) {
    bombsLeft = bombAmount;
    tileCount = 0;
    tileArray = [];
    valueArray = [];
    gameOver = false;
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
            tile.setAttribute("oncontextmenu", "event.preventDefault();");
            tile.addEventListener('mouseup', (e) => {
                if ((tile.className === "tile" || tile.className === "tile flag") && gameOver === false){
                    switch(e.button) {
                        case 0: {
                            if (!tile.classList.contains("flag")){
                                clickTile(tile); 
                            }
                            break;
                        }
                        case 2: {
                            tile.classList.toggle("flag"); /// bombs left can have negative valuse
                            if (tile.classList.contains("flag")) {
                                bombsLeft--;
                            } else bombsLeft++;
                            updateDisplay();
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
            })
            row.appendChild(tile);
            tileCount++;
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
    clearGameBoard();
    resetTimer();
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
    const rows = document.querySelectorAll(".row");
    rows.forEach(row => {
        row.remove();
    });
}

function fillArray(array, numberOfElements, element) {
    for (let i = 0; i < numberOfElements; i++) {
        array.push(element);
    }
    return;
}

function updateDisplay(){
    const display = document.querySelector(".display");
    display.textContent = bombsLeft;
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

function clickTile(tile) {
    tile.classList += " " + tileArray[tile.id];
    if (tile.classList.contains(empty)) {
        clickAdjacentTiles(tile);
    } else if (tile.classList.contains(bomb)) {
        // revealGameBoard();
        for (let i = 0; i < tileArray.length; i++){
            if (tileArray[i] === bomb && document.getElementById(i).className === 'tile')
                document.getElementById(i).classList += ' ' + bomb;
        }
        gameOver = true;
    } else {tile.textContent = valueArray[tile.id];}
}
