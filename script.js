// TO-DO LIST

// Fixes:
// Optimize this spaghetti code

// New Features:
// Quick instructions for the player
// Make pretty
// Proper input for player bet that checks for type and funds

// ✔ DONE
// (Done) Add new round function and button
// (Done) Add the option to change your bet
// (Fixed) Remove ability to start a new round while a current one is ongoing
// (Fixed) Remove ability to keep drawing new cards after losing a round
// (Fixed) Remove ability to click start game after running out of money
// (Done) Add end round function which ends the round and lets player keep (some) winnings
// (Fixed) Fix betting so that player funds are actually deducted
// (Fixed) Winning blackjack concatenates your bet to your funds instead of adding
// (Fixed) Can draw a new card after ending the round
// (Fixed) If you win blackjack on your first draw, your bet doesn't get deducted and your winnings are not added
// (Done) Hide "Start Game" button after starting a game
// (Done) Add and show "Reset" button after losing all your money
// (Done) Ending a round early awards you a portion of the bet based on how close you got to 21

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
let roundLost = false; // Need both because you can end a round without winning or losing
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
const chipsEl = document.querySelector("#chips-el"); 
const betEl = document.querySelector("#bet-el"); 
const startButton = document.querySelector("#start-btn");
const resetButton = document.querySelector("#reset-btn"); 
const helpMe = document.querySelector("#help-click"); 
const helpInfo = document.querySelector("#help-info"); 

// Displays player funds information
chipsEl.textContent = `$${player.chips}`; 
betEl.textContent = `$${player.bet}`; 

// Hides reset button until later
resetButton.style.display = "none";

// The following function generates a random whole number between 2 - 11
function getRandomCard() {
    return Math.floor(Math.random() * (12 - 2) + 2);
}

// Clicking "Start Game" calls on startGame()

startButton.addEventListener("click", startGame); 

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
        player.bet = prompt(`You currently have $${player.chips}. What is your bet? (Please enter a number with no other symbols or characters. 🙏)`); 
        // Converts the bet from a string to a number 
        player.bet = parseInt(player.bet);  
        luckyDrawCheck();
    } 
    // Hide start button
    startButton.style.display = "none";
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
    heyBigSpender();
    messageEl.textContent = `${message}`; 
}


// Changes the chips value based on win/lose conditions
function chipsManager() {
    if (roundWon == true && hasMoney == true && roundLost == false && roundInProgress == false) {
        // Full winnings for getting 21
        player.chips += player.bet; 
    } else if (roundWon == false && roundLost == true && roundInProgress == false) {
        // Deduct bet for losers
        player.chips -= player.bet;
    } else if (roundWon == false && hasMoney == true && roundLost == false && roundInProgress == false) {
        // Partial winnings for early enders, based on how close they got to 21
        player.chips = player.chips - player.bet + (player.bet * ( sum / 21 )); 
        player.chips = Math.round(player.chips * 100) / 100;
    }
    chipsEl.textContent = `$${player.chips}`;
    betEl.textContent = `$${player.bet}`; 
}

// If the player runs out of chips, they perma-lose
function heyBigSpender() {
    if (player.chips >= 1) {
        hasMoney = true;
    } else if (player.chips <= 0) {
        hasMoney = false;
        roundInProgress = false; 
        message = "You're out of money. Thanks for playing!";
        messageEl.textContent = `${message}`;
        // Show reset button
        resetButton.style.display = "inline-block";
    }
}

// Clicking "New Card" calls on newCard()
document.querySelector("#newCard-btn").addEventListener("click", newCard); 

function newCard() {
    if (hasMoney == true && roundWon == false && roundLost == false && roundInProgress == true) {
        let anotherCard = getRandomCard();  
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
        firstCard = getRandomCard(); 
        secondCard = getRandomCard(); 
        sum = firstCard + secondCard;
        cards.push(firstCard, secondCard);
        player.bet = prompt(`You currently have $${player.chips}. What is your bet? (Please enter a number with no other symbols or characters. 🙏)`);
        player.bet = parseInt(player.bet);
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
        message = "You've won back a portion of your bet, based on how close you got to 21.";
    } else if (hasMoney == false && gameStarted == true) {
        message = "Get out of my casino.";
    } else if (gameStarted == false) {
        message = `Click "Start Game" to begin.`;
    }
    messageEl.textContent = `${message}`;
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    window.location.reload(); 
}

// Show and hide the help info on click
helpMe.addEventListener("click", giveHelp); 

helpInfo.style.display = "none";

function giveHelp() { 
    if (helpInfo.style.display === "none") {
        helpInfo.style.display = "block"; 
    } else {
        helpInfo.style.display = "none"; 
    }
}