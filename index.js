let firstCard = Math.floor(Math.random() * (12 - 2) + 2); 
console.log(firstCard); 

let secondCard = Math.floor(Math.random() * (12 - 2) + 2);
console.log(secondCard); 

let sum = firstCard + secondCard; 

if (sum < 21) {
    console.log("Do you want to draw a new card?");
} else if (sum === 21) {
    console.log("You win!");
} else {
    console.log("You lose!"); 
}