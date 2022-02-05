// TO-DO LIST

// Fixes:
// Optimize this spaghetti code

// ✔ DONE
// (Done) Add new round function and button
// (Done) Add betting system
// (Fixed) Remove ability to start a new round while a current one is ongoing
// (Fixed) Remove ability to keep drawing new cards after losing a round
// (Fixed) Remove ability to click start game after running out of money
// (Done) Add end round function which ends the round and lets player keep (some) winnings
// (Fixed) Fix betting system so that player funds are actually deducted
// (Fixed) Winning blackjack concatenates your bet to your funds instead of adding
// (Fixed) Can draw a new card after ending the round
// (Fixed) If you win blackjack on your first draw, your bet doesn't get deducted and your winnings are not added
// (Done) Hide "Start Game" button after starting a game
// (Done) Add and show "Reset" button after losing all your money
// (Done) Ending a round early awards you a portion of the bet based on how close you got to 21
// (Done) Instructions for the player
// (Done) Proper input for player bet that checks for type and funds
// (Done) Make pretty
// (Fixed) On new round, don't show cards until bet is placed
// (Fixed) Always round to two decimal places
// (Fixed) Allow decimal bets
// (Done) Only show necessary buttons

// Player object
const player = {
    bet: 0,
    chips: 100
}

// Initializing variables
let hasMoney = true; 
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

//Information elements
const messageEl = document.querySelector("#message-el");
const sumEl = document.querySelector("#sum-el");
const cardsEl = document.querySelector("#cards-el"); 
const chipsEl = document.querySelector("#chips-el"); 
const betEl = document.querySelector("#bet-el"); 
const helpInfo = document.querySelector("#help-info"); 

// Button and input elements
const startButton = document.querySelector("#start-btn");
const endButton = document.querySelector("#endRound-btn");
const resetButton = document.querySelector("#reset-btn"); 
const newButton = document.querySelector("#newRound-btn");
const dealButton = document.querySelector("#newCard-btn");
const helpMe = document.querySelector("#help-click"); 
const bookie = document.querySelector("form"); 
const betInput = document.querySelector("input"); 

// Displays player funds information
chipsEl.textContent = `$${player.chips}`; 
betEl.textContent = `$${player.bet}`; 

// Hides some elements until later
resetButton.style.display = "none";
bookie.style.display = "none"; 
endButton.style.display = "none";
newButton.style.display = "none";
dealButton.style.display = "none";

// The following function generates a random whole number between 2 - 11
function getRandomCard() {
    return Math.floor(Math.random() * (12 - 2) + 2);
}

// Show bet input, store bet, hide bet input
function giveMeYourMoney() {
    bookie.style.display = "flex";
    // Set maximum bet amount to current player funds
    betInput.setAttribute("max", `${player.chips}`); 
    bookie.addEventListener("submit", function (event) {
        // Prevents submitting the form from refreshing the page
        event.preventDefault();
        // Store player input as bet value
        player.bet = betInput.value;
        player.bet = Number.parseFloat(player.bet).toFixed(2); 
        // Display bet info and hide the bookie
        chipsEl.textContent = `$${player.chips}`;
        betEl.textContent = `$${player.bet}`;
        bookie.style.display = "none";
    })
}

// Deal two cards at the start of a round
function dealTwoCards() {
    firstCard = getRandomCard();
    secondCard = getRandomCard();
    sum = firstCard + secondCard;
    sum = Number(sum); 
    // Pushes the cards to the cards array
    cards.push(firstCard, secondCard); 
    endButton.style.display = "inline-block"; 
    dealButton.style.display = "inline-block";
}

// Clicking "Start Game" calls on startGame()
startButton.addEventListener("click", startGame); 
function startGame() {
    if (player.bet === 0) {
        giveMeYourMoney();
        message = "Place your bet and hit start again. Minimum $5.00 to play.";
        messageEl.textContent = `${message}`; 
    } else {
        gameStarted = true; 
        roundInProgress = true; 
        dealTwoCards();  
        luckyDrawCheck();
        startButton.style.display = "none";
    }
}

// Used to check for a natural at the first deal
function luckyDrawCheck() {
    if (sum === 21) {
        player.chips = player.chips + player.bet * 2;
        player.chips = Number.parseFloat(player.chips).toFixed(2); 
        message = "You got blackjack! You win double your bet for being so lucky.";
        roundLost = false;
        roundWon = true;
        roundInProgress = false; 
        endButton.style.display = "none"; 
        newButton.style.display = "inline-block"; 
        dealButton.style.display = "none";
    } else {
        renderGame();
    }
    messageEl.textContent = `${message}`; 
    chipsEl.textContent = `$${player.chips}`;
    betEl.textContent = `$${player.bet}`; 
    cardsEl.textContent = cards.join(" | ");
    sumEl.textContent = `${sum}`; 
}

// Renders the game logic
function renderGame() {
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
        roundInProgress = true; 
    } else if (sum === 21) {
        message = "You win!";
        roundLost = false; 
        roundWon = true;
        roundInProgress = false; 
        endButton.style.display = "none"; 
        newButton.style.display = "inline-block"; 
    } else {
        message = "You lose!";
        roundLost = true; 
        roundWon = false; 
        roundInProgress = false; 
        endButton.style.display = "none"; 
        newButton.style.display = "inline-block"; 
    }
    chipsManager(); 
    heyBigSpender();
    messageEl.textContent = `${message}`; 
    cardsEl.textContent = cards.join(" | ");
    sumEl.textContent = `${sum}`; 
}

// Changes the chips value based on win/lose conditions
function chipsManager() {
    if (roundWon == true && hasMoney == true && roundLost == false && roundInProgress == false) {
        // Full winnings for getting 21
        player.chips += player.bet; 
        player.chips = Number.parseFloat(player.chips).toFixed(2); 
    } else if (roundWon == false && roundLost == true && roundInProgress == false) {
        // Deduct bet for losers
        player.chips -= player.bet;
        player.chips = Number.parseFloat(player.chips).toFixed(2); 
    } else if (roundWon == false && hasMoney == true && roundLost == false && roundInProgress == false) {
        // Partial winnings for early enders, based on how close they got to 21
        player.chips = player.chips - player.bet + (player.bet * ( sum / 21 )); 
        player.chips = Number.parseFloat(player.chips).toFixed(2); 
    }
    chipsEl.textContent = `$${player.chips}`;
    betEl.textContent = `$${player.bet}`; 
}

// If the player runs out of chips, they perma-lose
function heyBigSpender() {
    if (player.chips >= 5) {
        hasMoney = true;
    } else if (player.chips < 5) {
        hasMoney = false;
        roundInProgress = false; 
        message = "You're out of money. Thanks for playing!";
        messageEl.textContent = `${message}`;
        // Show reset button
        resetButton.style.display = "inline-block";
    }
    chipsEl.textContent = `$${player.chips}`;
    betEl.textContent = `$${player.bet}`; 
}

document.querySelector("#newCard-btn").addEventListener("click", newCard); 
function newCard() {
    if (bookie.style.display == "flex") {
        message = "Place your bet first!"
    } else {
        if (hasMoney == true && roundWon == false && roundLost == false && roundInProgress == true) {
            // Check cards array length - if more than two, deal one card; if none, deal two cards 
            if (cards.length >= 2) {
                let anotherCard = getRandomCard();
                sum += anotherCard;
                cards.push(anotherCard);
            } else {
                dealTwoCards(); 
            }
            renderGame(); 
        } else if (gameStarted === false) {
            message = `Click "Start Game" to begin.`;
            messageEl.textContent = `${message}`;
        } else if (hasMoney == true && roundWon == true) {
            message = "You've won this round! Care to play another?"; 
        } else if (hasMoney == false) {
            message = "You're done, kiddo."; 
        } else if (roundInProgress == false || roundLost == true && hasMoney == true) {
            message = "This round has ended. Care to start a new one?"; 
        }
    }
    messageEl.textContent = `${message}`;
}

document.querySelector("#newRound-btn").addEventListener("click", newRound); 
function newRound() {
    if (gameStarted === false) {
        message = `Click "Start Game" to begin.`;
        messageEl.textContent = `${message}`;
    } else {
        if (hasMoney == true && gameStarted == true && roundInProgress == false) {
            // Reset the roundLost and roundWon variables
            roundLost = false;
            roundWon = false; 
            roundInProgress = true; 
            newButton.style.display = "none";
            dealButton.style.display = "inline-block";
            // Clear the cards array
            cards.splice(0); 
            sum = "";
            // Ask for new bet
            message = `Place your bet then hit "Deal Cards".`
            giveMeYourMoney();
        } else if (hasMoney == false && gameStarted == true) {
            message = "Get out of my casino."; 
        } else if (roundInProgress == true) {
            message = `Round is still in progress! Select "End Round" to keep half your bet.`;
        }
        messageEl.textContent = `${message}`
        cardsEl.textContent = cards.join(" | ");
        sumEl.textContent = `${sum}`; 
    }
}

document.querySelector("#endRound-btn").addEventListener("click", endRound); 
function endRound() {
    if (bookie.style.display == "flex") {
        message = "Place your bet first!"
        messageEl.textContent = `${message}`;
        } else {
        if (gameStarted === false) {
            message = `Click "Start Game" to begin.`;
            messageEl.textContent = `${message}`;
        } else if (hasMoney == false && gameStarted == true) {
            message = "Get out of my casino.";
        } else if (roundInProgress == false || roundLost == true) {
            message = "Round has already ended!"; 
        } else if (hasMoney == true && gameStarted == true) {
            roundInProgress = false
            roundLost = false;
            chipsManager(); 
            message = "You've won back a portion of your bet, based on how close you got to 21.";
            endButton.style.display = "none";
            dealButton.style.display = "none";
            newButton.style.display = "inline-block"; 
        }
        messageEl.textContent = `${message}`;
        cardsEl.textContent = cards.join(" | ");
        sumEl.textContent = `${sum}`; 
    }
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