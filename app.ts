const mineValues = document.getElementsByClassName('mineValues');
const betButton = document.getElementsByClassName('betButton');
const gameBox = document.getElementsByClassName('gameBox');
const selectedTile = document.getElementsByClassName('tiles');

let grid = new Array(25).fill(0);
let tileChecked = new Array(25).fill(false);
let minesPostion = new Array(25);
let betButtonState = false;

for(let i=0; i<25; i++)
    minesPostion[i] = i;

for(let i=1; i<=24; i++) {
    const options = document.createElement('option');
    options.value = String(i);
    options.innerText = String(i);
    mineValues[0].appendChild(options);
}

const renderTiles = () => {
    for(let i=0; i<25; i++) {
        const tiles = document.createElement('div');
        tiles.className = 'tiles';
        tiles.addEventListener('click', () => {
            if(betButtonState)
                checkTile(i);
        });
        gameBox[0].appendChild(tiles);
    }
}

const setMines = (numberOfMines: number) => {
    for(let i=0; i<25; i++) {
        let random = Math.floor(Math.random()*25);
        [minesPostion[i], minesPostion[random]] = [minesPostion[random], minesPostion[i]];
    }
    for(let i=0; i<numberOfMines; i++) {
        grid[minesPostion[i]] = -1;
    }
}

const gameOver = () => {
    betButtonState = false;
    if (betButton[0]) {
        (betButton[0] as HTMLButtonElement).disabled = false;
    }
    alert("you Loose!");
}

const gameWon = () => {
    betButtonState = false;
    if (betButton[0]) {
        (betButton[0] as HTMLButtonElement).disabled = false;
    }
    alert("you Won!");
}

const showTile = (tileNumber: number) => {
    const tileToBeShown = document.getElementsByClassName('tiles')[tileNumber];
    if(grid[tileNumber] == -1) {
        tileToBeShown.innerHTML = '<img src="assets/bomb.png" class="diamond" alt="diamond.png">';
        (tileToBeShown as HTMLElement).style.backgroundColor = '#071824';
        (tileToBeShown as HTMLElement).style.border = '0';
    }
    else {
        tileToBeShown.innerHTML = '<img src="assets/diamond.png" class="diamond" alt="diamond.png">';
        (tileToBeShown as HTMLElement).style.backgroundColor = '#071824';
        (tileToBeShown as HTMLElement).style.border = '0';
    }
}

const checkForLeftDiamonds = () => {
    let flag = true;
    for(let i=0; i<25; i++) {
        if(grid[i] == 0 && tileChecked[i] == false)
            flag = false;
    }
    return flag;
}

const checkTile = (tileNumber: number) => {
    if(!tileChecked[tileNumber]) {
        showTile(tileNumber);
        tileChecked[tileNumber] = true;
        if(grid[tileNumber] ==  -1) {
            showAllTile();
            gameOver();
        }
        else if(checkForLeftDiamonds()) {
            showAllTile();
            gameWon();
        }
    }
}

const reset = () => {
    grid.fill(0);
    tileChecked.fill(0);
    for(let i=0; i<25; i++)
        minesPostion[i] = i;
    for(let i=0; i<25; i++) {
        const temp = document.getElementsByClassName('tiles')[i];
        temp.innerHTML = '';
        (temp as HTMLElement).style.backgroundColor = '#2f4553';
        (temp as HTMLElement).style.borderBottom = '6px #203641 solid';
    }
    betButtonState = false;
}

const showAllTile = () => {
    for(let i=0; i<25; i++) {
        showTile(i);
    }
}

const buttonClicked = () => {
    if(!betButtonState) {
        reset();
        betButtonState = true;
        if (betButton[0]) {
            (betButton[0] as HTMLButtonElement).disabled = false;
        }
        const numberOfMines = Number((mineValues[0] as HTMLSelectElement).value);
        setMines(numberOfMines);
    }
}

betButton[0].addEventListener('click', buttonClicked);

renderTiles();

