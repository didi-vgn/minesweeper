import {
    generateGameBoard,
    width, 
    height, 
    bombAmount,
} from "./main.js";

const rules = document.querySelector('.rules');
const info = document.querySelector('.info');
const bug = document.querySelector('.bug');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');
const modalContent = document.querySelector('.modal-content');

const rulesTitle = "How to play";
const rulesParagraph = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed voluptatum at iure eius distinctio est libero repellat, delectus autem necessitatibus unde dignissimos minima, deserunt odit soluta nulla non, vel quibusdam voluptatibus maiores dolorum eligendi dolore? Et, provident eligendi. Facilis excepturi itaque dolorem tempore porro mollitia! Provident, velit, molestias officia voluptates ad dolores nihil ducimus enim doloremque odit omnis mollitia numquam expedita optio quidem cum dolore dignissimos repellat nesciunt accusamus vel officiis? Tempore aut nemo, error voluptatibus magni eaque? Consequuntur dicta, tempora cum necessitatibus dolorem maxime, harum natus quisquam obcaecati, quis distinctio nobis! Hic minima esse quia iure, atque vitae.";

const infoTitle = "About";
const infoParagraph = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed voluptatum at iure eius distinctio est libero repellat, delectus autem necessitatibus unde dignissimos minima, deserunt odit soluta nulla non, vel quibusdam voluptatibus maiores dolorum eligendi dolore? Et, provident eligendi. Facilis excepturi itaque dolorem tempore porro mollitia! Provident, velit, molestias officia voluptates ad dolores nihil ducimus enim doloremque odit omnis mollitia numquam expedita optio quidem cum dolore dignissimos repellat nesciunt accusamus vel officiis? Tempore aut nemo, error voluptatibus magni eaque? Consequuntur dicta, tempora cum necessitatibus dolorem maxime, harum natus quisquam obcaecati, quis distinctio nobis! Hic minima esse quia iure, atque vitae.";

function display(title, paragraph){
    const modalTitle = document.createElement('h2');
    const modalText = document.createElement('p');

    modalTitle.textContent = title;
    modalText.textContent = paragraph;

    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalText);
}

rules.addEventListener("click", () => {
    display(rulesTitle, rulesParagraph);
    modal.classList.add('open');
})

info.addEventListener("click", () => {
    display(infoTitle, infoParagraph);
    modal.classList.add('open');
})

closeBtn.addEventListener("click", () => {
    modal.classList.remove('open');
    while (modalContent.firstChild){
        modalContent.removeChild(modalContent.lastChild);
    }
})

function displayGameOver() {
    const playAgain = document.createElement('button');
    playAgain.textContent = "Try again";
    
    playAgain.addEventListener("click", () => {
        newGame();
    })

    display("Game Over!", "You clicked a bomb! =(");
    modalContent.appendChild(playAgain);
    modal.classList.add('open');
}

function displayGameSolved() {
    const playAgain = document.createElement('button');
    playAgain.textContent = "New game";
    const time = document.querySelector('.stopwatch');

    playAgain.addEventListener("click", () => {
        newGame();
    })

    display("Puzzle solved!", `You finished the game in ${time.textContent}! =)`);
    modalContent.appendChild(playAgain);
    modal.classList.add('open');
}

function newGame() {
    modal.classList.remove('open');
    while (modalContent.firstChild){
        modalContent.removeChild(modalContent.lastChild);
    }
    generateGameBoard(width, height, bombAmount);
}

function displayReport() {
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = "Report a bug";

    const subject = document.createElement('div');
    subject.textContent = 'Subject: ';
    subject.classList.add('subject');
    const input = document.createElement('input');
    subject.appendChild(input);

    const message = document.createElement('div');
    message.textContent = 'Message: ';
    message.classList.add('message');
    const textarea = document.createElement('textarea');
    message.appendChild(textarea);

    const submit = document.createElement('button');
    submit.textContent = 'Submit';
    submit.setAttribute("type", "submit");

    modalContent.appendChild(modalTitle);
    modalContent.appendChild(subject);
    modalContent.appendChild(message);
    modalContent.appendChild(submit);
}

bug.addEventListener("click", () => {
    displayReport();
    modal.classList.add('open');
})

export {
    displayGameOver,
    displayGameSolved,
}
