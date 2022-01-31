// Drawing cards with a value between 2 - 11
let firstCard = Math.floor(Math.random() * (12 - 2) + 2); 
let secondCard = Math.floor(Math.random() * (12 - 2) + 2);
let sum = firstCard + secondCard; 

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
    sumEl.textContent = `Sum: ${sum}`; 
    cardsEl.textContent = `Cards: You drew a ${firstCard} and a ${secondCard}.`
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
    startGame(); 

    console.log(anotherCard);
    console.log(sum);
}