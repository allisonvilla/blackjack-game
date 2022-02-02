// TO-DO LIST

// Fixes:
// Optimize this spaghetti code - maybe I should use some loops????

// New Features:
// Hide "Start Game" button after starting a game
// Add and show "Reset" button after losing all your money
// Proper input for player bet that checks for type and funds
// Quick instructions for the player

// ✔ DONE
// Add new round function and button
// Add the option to change your bet
// Remove ability to start a new round while a current one is ongoing
// Remove ability to keep drawing new cards after losing a round
// Remove ability to click start game after running out of money
// Add end round function which ends the round and lets player keep (some) winnings
// Fix betting system so that player funds are actually deducted
// (Bug Fixed) Winning blackjack concatenates your bet to your funds instead of adding
// (Bug Fixed) Can draw a new card after ending the round
// (Bug Fixed) If you win blackjack on your first draw, your bet doesn't get deducted and your winnings are not added

// Player object
const player = {
    bet: 0,
    chips: 1000
}
// Player is currently prompted to make a bet in startGame() and newRound() 

// Initializing variables
let hasMoney = false; 
let gameStarted = false; 
let roundInProgress = false; 
let roundWon = false; 
let roundLost = false; // Need both because you can end a round without winning or losing!
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

// Displays player funds information
playerEl.textContent = `Current Funds: $${player.chips} | Current Bet: $${player.bet}`; 

// The following function generates a random whole number between 2 - 11
function getRandomCard() {
    return Math.floor(Math.random() * (12 - 2) + 2);
}

// Clicking "Start Game" calls on startGame()
document.getElementById("start-btn").addEventListener("click", startGame); 

function startGame() {
    if (gameStarted == true) {
        message = "You've already started a game, you silly goose.";
        messageEl.textContent = `${message}`; 
    } else {
        hasMoney = true; 
        gameStarted = true; 
        roundInProgress = true; 
        firstCard = getRandomCard();
        secondCard = getRandomCard();
        sum = firstCard + secondCard; 
        cards.push(firstCard, secondCard); // Adds the cards to the cards array 
        // Make bet and deduct from current funds
        player.bet = prompt("You start with $1000. What is your bet? (Please enter a number with no other symbols or characters. 🙏)"); 
        // Converts the bet from a string to a number 
        player.bet = parseInt(player.bet); 
        player.chips = player.chips - player.bet;
        luckyDrawCheck();
    }
}

// Function that checks for a natural before rendering game
function luckyDrawCheck() {
    if (sum === 21) {
        player.chips = player.chips + player.bet * 2;
        message = "You got blackjack!";
        roundLost = false;
        roundWon = true;
        roundInProgress = false; 
    } else {
        renderGame();
    }
    playerEl.textContent = `Current Funds: $${player.chips} | Current Bet: $${player.bet}`; 
    messageEl.textContent = `${message}`; 
}

function renderGame() {
    // cardsEl element will display the cards in the cards array - this used to be a for-loop
    cardsEl.textContent = cards.join(" | ");
    sumEl.textContent = `${sum}`; 
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
        roundInProgress = true; 
    } else if (sum === 21) {
        message = "You win!";
        roundLost = false; 
        roundWon = true;
        roundInProgress = false; 
    } else {
        message = "You lose!";
        roundLost = true; 
        roundWon = false; 
        roundInProgress = false; 
    }
    chipsManager(); 
    areYouBroke();
    messageEl.textContent = `${message}`; 
}


// Changes the chips value based on win/lose conditions
function chipsManager() {
    if (roundWon == true && hasMoney == true && roundLost == false && roundInProgress == false) {
        // Full winnings for blackjack 
        player.chips = player.chips + player.bet * 2; 
    } else if (roundWon == false && hasMoney == true && roundLost == false && roundInProgress == false) {
        // Half winnings for early enders
        player.chips = player.chips + player.bet / 2; 
    }
    playerEl.textContent = `Current Funds: $${player.chips} | Current Bet: $${player.bet}`; 
}

// If the player runs out of chips, they perma-lose
function areYouBroke() {
    if (player.chips >= 1) {
        hasMoney = true;
    } else if (player.chips <= 0) {
        hasMoney = false;
        roundInProgress = false; 
        message = "You're out of money. Thanks for playing!";
        messageEl.textContent = `${message}`;
    }
}

// Clicking "New Card" calls on newCard()
document.querySelector("#newCard-btn").addEventListener("click", newCard); 

function newCard() {
    if (hasMoney == true && roundWon == false && roundLost == false && roundInProgress == true) {
        let anotherCard = 2;
        sum += anotherCard;
        cards.push(anotherCard);
        renderGame(); 
    } else if (hasMoney == true && roundWon == true) {
        message = "You've won this round! Care to play another?"; 
    } else if (gameStarted === false) {
        message = `Click "Start Game" to begin.`; 
    } else if (hasMoney == false) {
        message = "You're done, kiddo."; 
    } else if (roundInProgress == false || roundLost == true && hasMoney == true) {
        message = "This round has ended. Care to start a new one?"; 
    }
    messageEl.textContent = `${message}`;
}

document.querySelector("#newRound-btn").addEventListener("click", newRound); 

function newRound() {
    if (hasMoney == true && gameStarted == true && roundInProgress == false) {
        // Reset the roundLost and roundWon variables
        roundLost = false; 
        roundWon = false; 
        // Clear the cards array
        cards.splice(0); 
        // Draw new cards and make new bet
        firstCard = 10;
        secondCard = 11;
        // getRandomCard(); 
        sum = firstCard + secondCard;
        cards.push(firstCard, secondCard);
        // Make new bet and deduct from current funds
        player.bet = prompt("What is your new bet? (Please enter a number with no other symbols or characters. 🙏)");
        player.bet = parseInt(player.bet);
        player.chips = player.chips - player.bet;
        luckyDrawCheck();
    } else if (hasMoney == false && gameStarted == true) {
        message = "Get out of my casino."; 
    } else if (gameStarted == false) {
        message = `Click "Start Game" to begin.`;
    } else if (roundInProgress == true) {
        message = `Round is still in progress! Select "End Round" to keep half your bet.`;
    }
    messageEl.textContent = `${message}`;
}

document.querySelector("#endRound-btn").addEventListener("click", endRound); 

function endRound() {
    if (roundInProgress == false || roundLost == true) {
        message = "Round has already ended!"; 
    }
    else if (hasMoney == true && gameStarted == true) {
        roundInProgress = false
        roundLost = false;
        cards.splice(0); 
        chipsManager(); 
        message = "You've won back half your bet.";
    } else if (hasMoney == false && gameStarted == true) {
        message = "Get out of my casino.";
    } else if (gameStarted == false) {
        message = `Click "Start Game" to begin.`;
    }
    messageEl.textContent = `${message}`;
}