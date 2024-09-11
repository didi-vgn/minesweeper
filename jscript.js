const container = document.querySelector(".grid-container");
let tileCount = 0;

function generateGrid (width, height, bombAmount) {
    const tileArray = [];
    for (let i = 0; i < width * height - bombAmount; i++) {
        tileArray.push('empty');
    }
    for (let i = 0; i < bombAmount; i++) {
        tileArray.push('bomb');
    }
    tileArray.sort(() => Math.random() - 0.5); //shuffle array
    tileArray.sort(() => Math.random() - 0.5);
    
    generateNumbers (width, height, tileArray);

    for (let i = 1; i <= height; i++){
        const row = document.createElement('div');
        row.className = "row";
        for (let j = 1; j <= width; j++){
            const tile = document.createElement('div');
            tile.className = "tile";
            tile.className += " " + tileArray[tileCount];
            tile.id = tileCount;

            //test
            if (tile.classList.contains("one")) tile.textContent = "1";
            else if (tile.classList.contains("two")) tile.textContent = "2";
            else if (tile.classList.contains("three")) tile.textContent = "3";
            else if (tile.classList.contains("four")) tile.textContent = "4";
            else if (tile.classList.contains("five")) tile.textContent = "5";
            else if (tile.classList.contains("six")) tile.textContent = "6";
            else if (tile.classList.contains("seven")) tile.textContent = "7";
            else if (tile.classList.contains("eight")) tile.textContent = "8";

            row.appendChild(tile);
            tileCount++;
        }
        container.appendChild(row);
    }
}

generateGrid(30, 16, 99);

function generateNumbers (width, height, numberArray) {
    
    for (let i = 0; i < numberArray.length; i++) {
        let number = 0;
        if (numberArray[i] === 'bomb') continue;
        if (i === 0) { // if i is upper corner left
            if (numberArray[i - 1] === 'bomb') number++;
            if (numberArray[i + width] === 'bomb') number++;
            if (numberArray[i + width + 1] === 'bomb') number++;
        } else if (i === width -1) { // if i is upper corner right
            if (numberArray[i - 1] === 'bomb') number++;
            if (numberArray[i + width - 1] === 'bomb') number++;
            if (numberArray[i + width] === 'bomb') number++;
        } else if (i === width * height - width +1) { // if i is bottom corner left
            if (numberArray[i - width] === 'bomb') number++;
            if (numberArray[i - width + 1] === 'bomb') number++;
            if (numberArray[i + 1] === 'bomb') number++;
        } else if (i === width * height -1) { // if i is bottom corner right
            if (numberArray[i - width - 1] === 'bomb') number++;
            if (numberArray[i - width] === 'bomb') number++;
            if (numberArray[i - 1] === 'bomb') number++;
        } else if (i > 0 && i < width) { // if i is upper edge
            if (numberArray[i - 1] === 'bomb') number++;
            if (numberArray[i + 1] === 'bomb') number++;
            if (numberArray[i + width - 1] === 'bomb') number++;
            if (numberArray[i + width] === 'bomb') number++;
            if (numberArray[i + width + 1] === 'bomb') number++;
        } else if (i > width * height - width && i < width * height) { // if i is bottom edge
            if (numberArray[i - width - 1] === 'bomb') number++;
            if (numberArray[i - width] === 'bomb') number++;
            if (numberArray[i - width + 1] === 'bomb') number++;
            if (numberArray[i - 1] === 'bomb') number++;
            if (numberArray[i + 1] === 'bomb') number++;
        } else if (i % width === 0) { // if i is left edge
            if (numberArray[i - width] === 'bomb') number++;
            if (numberArray[i - width + 1] === 'bomb') number++;
            if (numberArray[i + 1] === 'bomb') number++;
            if (numberArray[i + width] === 'bomb') number++;
            if (numberArray[i + width + 1] === 'bomb') number++;
        } else if (i % width === 8) { // if i is right edge
            if (numberArray[i - width - 1] === 'bomb') number++;
            if (numberArray[i - width] === 'bomb') number++;
            if (numberArray[i - 1] === 'bomb') number++;
            if (numberArray[i + width - 1] === 'bomb') number++;
            if (numberArray[i + width] === 'bomb') number++;
        } else { // if i is in the center of the board
            if (numberArray[i - width - 1] === 'bomb') number++;
            if (numberArray[i - width] === 'bomb') number++;
            if (numberArray[i - width + 1] === 'bomb') number++;
            if (numberArray[i - 1] === 'bomb') number++;
            if (numberArray[i + 1] === 'bomb') number++;
            if (numberArray[i + width - 1] === 'bomb') number++;
            if (numberArray[i + width] === 'bomb') number++;
            if (numberArray[i + width + 1] === 'bomb') number++;
        }

        switch (number) {
            case 0: numberArray[i] = 'empty'; break;
            case 1: numberArray[i] = 'one'; break;
            case 2: numberArray[i] = 'two'; break;
            case 3: numberArray[i] = 'three'; break;
            case 4: numberArray[i] = 'four'; break;
            case 5: numberArray[i] = 'five'; break;
            case 6: numberArray[i] = 'six'; break;
            case 7: numberArray[i] = 'seven'; break;
            case 8: numberArray[i] = 'eight'; break;
        }
    }
    console.table(numberArray);
}