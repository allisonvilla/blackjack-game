// Player object
const player = {
    name: "Geralt of Rivia",
    chips: 145
}

// Initializing variables
let hasBlackjack = false; 
let isPlaying = false; 
let message = ""; 
let firstCard = 0;
let secondCard = 0;
let sum = 0; 

// Cards array
const cards = []; 

// Storing html elements in variables
const messageEl = document.querySelector("#message-el");
const sumEl = document.querySelector("#sum-el");
const cardsEl = document.querySelector("#cards-el"); 
const playerEl = document.querySelector("#player-el"); 

// Displays player information
// playerEl.textContent = `${player.name}: $${player.chips}`; 

// The following function generates a random whole number between 2 - 11
function getRandomCard() {
    return Math.floor(Math.random() * (12 - 2) + 2);
}
// This type of function declaration means it can be used anywhere in the code

// Clicking "Start Game" calls on startGame()
document.getElementById("start-btn").addEventListener("click", startGame); 

function startGame() {
    isPlaying = true; 
    firstCard = getRandomCard();
    secondCard = getRandomCard(); 
    sum = firstCard + secondCard; 
    cards.push(firstCard, secondCard); // Adds the cards to the cards array 
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
        isPlaying = false;
    }
    messageEl.textContent = `${message}`; 
}

// Clicking "New Card" calls on newCard()
document.querySelector("#new-btn").addEventListener("click", newCard); 

function newCard() {
    if (isPlaying == true && hasBlackjack == false) {
        let anotherCard = getRandomCard();
        sum += anotherCard;
        cards.push(anotherCard);
        renderGame(); 
    } else if (isPlaying == true && hasBlackjack == true) {
        message = "You've already won! Time to cash out."; 
    } else {
        message = "Time to start over."; 
    }
    messageEl.textContent = `${message}`;
}

document.querySelector("#reset-btn").addEventListener("click", resetGame); 

function resetGame() {
    window.location.reload(); 
}