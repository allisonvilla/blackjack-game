// TO-DO LIST

// Fixes:
// (Bug) If you win blackjack, your bet doesn't get deducted and your winnings are not added
// Optimize this spaghetti code

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
// Add end round function which ends the round and lets player keep winnings (if blackjack) / half winnings (if not blackjack)
// Fix betting system so that player funds are actually deducted
// (Bug) Winning blackjack concatenates your bet to your funds instead of adding

// Player object
const player = {
    bet: 0,
    chips: 1000
}
// Player is currently prompted to make a bet in startGame() and newRound() 

// Initializing variables
let hasBlackjack = false; 
let hasMoney = false; 
let gameStarted = false; 
let roundInProgress = false; 
let roundLost = false; 
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
        renderGame();
    }
}


function renderGame() {
    // cardsEl element will display the cards in the cards array - this used to be a for loop
    cardsEl.textContent = cards.join(" | ");
    sumEl.textContent = `${sum}`; 
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
        roundInProgress = true; 
        hasBlackjack = false; 
    } else if (sum === 21) {
        message = "You've got blackjack!";
        roundLost = false; 
        roundInProgress = false; 
        hasBlackjack = true;
    } else {
        message = "You lose!";
        roundLost = true; 
        roundInProgress = false; 
        hasBlackjack = false; 
    }
    chipsManager(); 
    areYouBroke();
    messageEl.textContent = `${message}`; 
}

// Changes the chips value based on game conditions
function chipsManager() {
    if (hasBlackjack == true && hasMoney == true && roundLost == false) {
        player.chips = player.chips + player.bet;
    } else if (hasBlackjack == false && hasMoney == true && roundLost == true) {
        player.chips = player.chips - player.bet; 
    } else if (hasBlackjack == false && hasMoney == true && roundLost == false && roundInProgress == false) {
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
    if (hasMoney == true && hasBlackjack == false && roundLost == false) {
        let anotherCard = getRandomCard();
        sum += anotherCard;
        cards.push(anotherCard);
        renderGame(); 
    } else if (hasMoney == true && hasBlackjack == true) {
        message = "You've won! Time to cash out."; 
    } else if (gameStarted === false) {
        message = `Click "Start Game" to begin.`; 
    } else if (hasMoney == false) {
        message = "You're done, kiddo."; 
    } else if (roundLost == true && hasMoney == true) {
        message = "You've lost this round. Care to start a new one?"; 
    }
    messageEl.textContent = `${message}`;
}

document.querySelector("#newRound-btn").addEventListener("click", newRound); 

function newRound() {
    if (hasMoney == true && gameStarted == true && roundInProgress == false) {
        // Reset the roundLost variable
        roundLost = false; 
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
        renderGame();
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
        message = "If you've still got some money, you can start a new round!";
    } else if (hasMoney == false && gameStarted == true) {
        message = "Get out of my casino.";
    } else if (gameStarted == false) {
        message = `Click "Start Game" to begin.`;
    }
    messageEl.textContent = `${message}`;
}