// Initializing variables
let hasBlackjack = false; 
let isAlive = true; 
let message = ""; 

// Draw cards and show sum
let firstCard = getRandomCard();
let secondCard = getRandomCard();
let sum = firstCard + secondCard;

// The following function generates a random value between 2 - 11
// This type of function declaration means it can be used anywhere in the code
function getRandomCard() {
    return Math.floor(Math.random() * (12 - 2) + 2);
}

// Cards Array
let cards = [firstCard, secondCard]; 

// Clicking "Start Game" calls on startGame()
document.getElementById("start-btn").addEventListener("click", startGame); 

// Storing html elements in variables
let messageEl = document.querySelector("#message-el"); 
let sumEl = document.querySelector("#sum-el"); 
let cardsEl = document.querySelector("#cards-el"); 

function startGame() {
    renderGame();
}

// The following function shows the player their cards and their status
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
    let anotherCard = getRandomCard();
    sum += anotherCard; 
    cards.push(anotherCard); 
    renderGame(); 
}