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
    const container = document.createElement('div');
    const modalTitle = document.createElement('h2');
    const modalText = document.createElement('p');

    modalTitle.textContent = title;
    modalText.textContent = paragraph;

    container.appendChild(modalTitle);
    container.appendChild(modalText);
    modalContent.appendChild(container);
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
    modalContent.removeChild(modalContent.firstChild);
    modalContent.removeChild(modalContent.firstChild);
})
