let firstCard = Math.floor(Math.random() * (12 - 2) + 2); 
let secondCard = Math.floor(Math.random() * (12 - 2) + 2);
let sum = firstCard + secondCard; 
let hasBlackjack = false; 
let isAlive = true; 
let message = ""; 

document.getElementById("start-btn").addEventListener("click", startGame); 

let messageEl = document.getElementById("message-el"); 
let sumEl = document.getElementById("sum-el"); 

function startGame() {
    sumEl.textContent = `Sum: ${sum}`; 
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

    console.log(message);
    console.log(sum);
    console.log(hasBlackjack);
    console.log(isAlive);
}
