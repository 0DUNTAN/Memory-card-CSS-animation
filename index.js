const cardsCon = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addCon = document.getElementById('add-container');

//Keep tract of currunt card
let currentActiveCard = 0;

//Store DOM cards
const cardsEl = [];

//Store card data
const cardsData = getCardsData();

//Function
//Create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index)); 
}

//Create Single Card 
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML= `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>
                ${data.question}
            </p>
        </div>
        
        <div class="inner-card-back">
            <p>
                ${data.answer}
            </p>
        </div>
    </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    //Add to DOM cards
    cardsEl.push(card);
    cardsCon.appendChild(card);

    updCurText(); 
}

//show card Number
function updCurText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;  
}

//Get cards from local Storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
    
}

//Add card to Local Storage
function setCardsData(cards) {
 localStorage.setItem('cards', JSON.stringify(cards));
 window.location.reload();   
}

createCards(); 

//Event  Listeners

//next Button
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;
    
    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updCurText();
});

//Previous Button
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;
    
    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updCurText();
});

//Show add container
showBtn.addEventListener('click', () => addCon.classList.add('show'));

//Hide add container
hideBtn.addEventListener('click', () => addCon.classList.remove('show'));

//Add New Card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = {question, answer };
        
        createCards(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addCon.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

//Clear Card Button
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsCon.innerHTML = '';
    window.location.reload();
});