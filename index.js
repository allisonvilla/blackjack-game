// Draw cards with a value between 2 - 11
let firstCard = Math.floor(Math.random() * (12 - 2) + 2);
let secondCard = Math.floor(Math.random() * (12 - 2) + 2);
let sum = firstCard + secondCard; 

// Cards Array
let cards = [firstCard, secondCard]; 

// Initializing variables
let hasBlackjack = false; 
let isAlive = true; 
let message = ""; 

// Clicking "Start Game" calls on startGame()
document.getElementById("start-btn").addEventListener("click", startGame); 

// Storing html elements in variables
let messageEl = document.querySelector("#message-el"); 
let sumEl = document.querySelector("#sum-el"); 
let cardsEl = document.querySelector("#cards-el"); 

function startGame() {
    renderGame();
}

function renderGame() {
    // cardsEl element will display the cards in the cards array
    cardsEl.textContent = " "
    for (let n = 0; n < cards.length; n++) {
        cardsEl.textContent += cards[n] + " "; 
    }
    sumEl.textContent = `${sum}`; 
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got blackjack!";
        hasBlackjack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }
    messageEl.textContent = `${message}`; 
}

// Clicking "New Card" calls on newCard()
document.querySelector("#new-btn").addEventListener("click", newCard); 

function newCard() {
    let anotherCard = Math.floor(Math.random() * (12 - 2) + 2);
    sum += anotherCard; 
    cards.push(anotherCard); 

    renderGame(); 

    console.log(anotherCard);
    console.log(cards);
}