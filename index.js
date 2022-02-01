console.log("This is the rounds feature branch."); 

// Player object
const player = {
    bet: 0,
    chips: 1000
}

// Initializing variables
let hasBlackjack = false; 
let isAlive = false; 
let gameStarted = false; 
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
// This type of function declaration means it can be used anywhere in the code

// Clicking "Start Game" calls on startGame()
document.getElementById("start-btn").addEventListener("click", startGame); 

function startGame() {
    if (gameStarted == true) {
        message = "The game has already started, you silly goose."
        messageEl.textContent = `${message}`; 
    } else {
        isAlive = true; 
        gameStarted = true; 
        firstCard = getRandomCard();
        secondCard = getRandomCard(); 
        sum = firstCard + secondCard; 
        cards.push(firstCard, secondCard); // Adds the cards to the cards array 
        player.bet = prompt("You start with $1000. What is your bet? (Please enter a number with no other symbols or characters.)"); 
        renderGame();
    }
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
        message = "You lose!";
        roundLost = true;
    }
    chipsManager(); 
    areYouBroke();
    messageEl.textContent = `${message}`; 
}

// Changes the chips value based on game conditions
function chipsManager() {
    if (hasBlackjack == true && isAlive == true) {
        player.chips = player.chips + player.bet; 
    } else if (hasBlackjack == false && isAlive == true && roundLost == true) {
        player.chips = player.chips - player.bet; 
    }
    playerEl.textContent = `Current Funds: $${player.chips} | Current Bet: $${player.bet}`;  
    console.log(player.chips); 
}

// If the player runs out of chips, they perma-lose
function areYouBroke() {
    if (player.chips >= 1) {
        isAlive = true;
    } else if (player.chips <= 0) {
        isAlive = false;
        message = "Get out of my casino."
        messageEl.textContent = `${message}`;
    }
}

// Clicking "New Card" calls on newCard()
document.querySelector("#new-btn").addEventListener("click", newCard); 

function newCard() {
    if (isAlive == true && hasBlackjack == false) {
        let anotherCard = getRandomCard();
        sum += anotherCard;
        cards.push(anotherCard);
        renderGame(); 
    } else if (isAlive == true && hasBlackjack == true) {
        message = "You've won! Time to cash out."; 
    } else if (gameStarted === false) {
        message = `Click "Start Game" to begin.`; 
    } else if (isAlive == false) {
        message = "You're done, kiddo."; 
    }
    messageEl.textContent = `${message}`;
    console.log(isAlive);
}

document.querySelector("#reset-btn").addEventListener("click", resetGame); 

// Reloads the page to reset the game
// Eventually want this to clear current cards and draw new ones so player can keep going until money runs out/they cash out
function resetGame() {
    document.location.reload(); 
}