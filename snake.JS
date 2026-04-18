// Get the canvas element from the HTML so we can draw the game on it.
let c = document.getElementById("canvas");
// Get the 2D drawing context, which gives us drawing tools like rectangles and text.
let ctx = c.getContext("2d");
// Get the paragraph element used to show feedback messages to the player.
let feedbackElement = document.getElementById('feedback');

// Create a class to store the x and y position of each snake body segment.
class snakePart{
    // This runs whenever we create a new snake body segment.
    constructor(x, y){
        // Save the x position of this body segment.
        this.x = x;
        // Save the y position of this body segment.
        this.y = y;
    }
}
// Set the starting speed of the game loop.
let speed = 6;
// Set how many tiles exist across and down the board.
let tileCount = 20;
// Calculate the size of each tile in pixels.
let tileSize = c.width / tileCount - 2;
// Start the snake head in the middle area on the x axis.
let headX = 10;
// Start the snake head in the middle area on the y axis.
let headY = 10;
// Set the apple's starting x position.
let appleX = 5;
// Set the apple's starting y position.
let appleY = 5;


// Set the bomb's starting x position.
let bombX = 4;
// Set the bomb's starting y position.
let bombY = 4;
// Start the snake with a tail length of 2.
let tailLength = 2;
// Start the score at 0.
let score = 0;

// Create an empty array that will hold all body segments of the snake.
let snakeParts = [];

// Start with no horizontal movement.
let xVelocity = 0;
// Start with no vertical movement.
let yVelocity = 0;


// Store the next horizontal direction chosen by the player.
let inputsXVelocity = 0;
// Store the next vertical direction chosen by the player.
let inputsYVelocity = 0;

// Store the left wall position in tile coordinates.
let wallLeft = 0;
// Store the right wall position in tile coordinates.
let wallRight = c.width/ tileCount;
// Store the top wall position in tile coordinates.
let wallTop = 0;
// Store the bottom wall position in tile coordinates.
let wallBottom = c.height/ tileCount;



// This is the main game loop that redraws the game again and again.
function drawGame(){
    // Copy the player's chosen direction into the active movement direction.
    xVelocity = inputsXVelocity;
    // Copy the player's chosen vertical direction into the active movement direction.
    yVelocity = inputsYVelocity;
    // Move the snake to its new position.
    snakePositon();
    // Check whether the game should end after moving.
    let resulte = isGameOver();
    // If the game is over, stop the loop here.
    if(resulte){
        // Exit the function so no more drawing happens.
        return;
    }
    // Paint the background for the new frame.
    clearScreen();
    // Check whether the snake ate the apple.
    checkAppleCollision();
    // Draw the apple.
    drawApple();
   
    
    // Draw the snake body and head.
    drawSnake();
    // Draw the bomb obstacle.
    drawBomb();
    // Draw the current score.
    drawScore();

    // If the score is greater than 10, increase the speed.
    if (score > 10) {
        // Make the game faster.
        speed = 9;
        // Tell the player the game has sped up.
        feedbackElement.innerText = `You gained more than 10 apples! the game will be faster`
    }
    // If the score is greater than 20, increase the speed again.
    if (score > 20) {
        // Make the game even faster.
        speed = 14;
        // Show a stronger speed warning message.
        feedbackElement.innerText = `You gained 20 apples! the game will be even faster`
    }   
    // If the score is greater than 30, increase the speed a lot.
    if (score > 30) {
        // Make the game very fast.
        speed = 21;
        // Show a message telling the player the game is now really fast.
        feedbackElement.innerText = ` Wow! more than 30 apples. it's going to be really fast`
    }
    // Run the game loop again after a short delay based on the current speed.
    setTimeout(drawGame, 1000 / speed);
}
// This function reloads the page when the restart button is clicked.
function restartGame(){
    // Reload the whole page to reset the game state.
    location.reload();
}

// This function makes the snake wrap around when it goes off the board.
function boundryCheck(){
    // If the head goes past the left edge...
    if (headX < 0) {
        // Move the head to the right side.
        headX = wallRight;
      // Otherwise, if the head goes past the right edge...
      } else if (headX > wallRight) {
        // Move the head to the left side.
        headX = wallLeft;
      }
      // Check the top and bottom edges too.
      if (headY < wallTop) {
        // Move the head to the bottom side.
        headY = wallBottom;
        
      // Otherwise, if the head goes past the bottom edge...
      } else if (headY > wallBottom) {
        // Move the head to the top side.
        headY = wallTop;
      }
}
// This function draws the snake on the canvas.
function drawSnake(){

// Set the color used to draw the tail/body segments.
    ctx.fillStyle = "yellow";
    // Loop through every saved body segment.
    for(let i =0; i < snakeParts.length; i++){
        // Get the current body segment from the array.
        let part = snakeParts[i];
        // Draw that body segment as a rectangle.
        ctx.fillRect(part.x *tileCount, part.y * tileCount, tileSize, tileSize);
    }
    
    // Add the current head position to the body array so the head becomes part of the tail next frame.
    snakeParts.push(new snakePart(headX, headY));
    // Keep removing old body pieces until the tail matches the correct length.
    while(snakeParts.length > tailLength){
        // Remove the oldest body segment from the front of the array.
        snakeParts.shift();
    }
// Pick a random red value for the snake head color.
red = Math.floor(Math.random() * 256);
// Pick a random green value for the snake head color.
green = Math.floor(Math.random() * 256);
// Pick a random blue value for the snake head color.
blue = Math.floor(Math.random() * 256);

// Build an RGB color string from the three random color values.
ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    // Draw the snake head at its current position.
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    // Set the shadow color used around later drawings.
    ctx.shadowColor = "#ba7966";
    // Set how blurry the shadow should be.
    ctx.shadowBlur = 18;
    // Set the way line corners would join if lines were drawn.
    ctx.lineJoin = "bevel";
    // Set the width for future line drawings.
    ctx.lineWidth = 10;
}

// This function draws the bomb obstacle.
function drawBomb(){
    // Set the bomb color to red.
    ctx.fillStyle = "red";
    // Draw the bomb as a red square.
    ctx.fillRect(bombX * tileCount, bombY * tileCount, tileSize, tileSize);

}

// This function places the bomb at a new random tile.
function placeBomb(){
    // Pick a random x position for the bomb.
    bombX = Math.floor(Math.random() * tileCount);
    // Pick a random y position for the bomb.
    bombY = Math.floor(Math.random() * tileCount);
}

// This function checks if the player has lost the game.
function isGameOver(){
   // Start by assuming the game is not over.
   let gameOver = false;

    // If the snake has not started moving yet, do not end the game.
    if(yVelocity === 0 && xVelocity === 0){ 
        // Return false because the game is still waiting for input.
        return false;
    }

// Check whether the snake hit the bomb.
if(bombX === headX && bombY  === headY){
    // Mark the game as over.
    gameOver = true;
    // Show a message saying the snake hit the bomb.
    feedbackElement.innerText = `the snake collided with the Red box, You gained ${score} apples! Click Restart to play again`
}


// Check whether the snake crashed into its own body.

// Loop through every body segment in the snake.
for (let i = 0; i < snakeParts.length; i++) {
    // Get the current body segment.
    let part = snakeParts[i];
    // If the head is on the same tile as this body segment...
    if (part.x === headX && part.y === headY) {
        // Mark the game as over.
        gameOver = true;
        // Show a message saying the snake hit itself.
        feedbackElement.innerText = `the snake collided with its own body, You gained ${score} apples! Click Restart to play again`
        // Stop checking because one collision is enough.
        break;
    }
  }

  
// If a game-over condition happened, draw the game-over text.
if(gameOver){
    // Set a temporary text color.
    ctx.fillStyle = "white";
    // Set a large font size for the message.
    ctx.font = "50px Verdana";
    
    
    // Double-check that the game is over before drawing the gradient text.
    if (gameOver) {
        // Set the text color to white first.
        ctx.fillStyle = "white";
        // Set the font again for the message.
        ctx.font = "50px Verdana";
  
        // Create a left-to-right gradient across the canvas.
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        // Add magenta at the beginning of the gradient.
        gradient.addColorStop("0", " magenta");
        // Add blue in the middle of the gradient.
        gradient.addColorStop("0.5", "blue");
        // Add red at the end of the gradient.
        gradient.addColorStop("1.0", "red");
        // Switch the fill color to use the gradient.
        ctx.fillStyle = gradient;
  
        // Draw "Game Over!" using the gradient.
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
      }
  
      // Draw the text again, which keeps the message visible.
      ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }
    // Return whether the game is over or not.
    return gameOver;
}

// This function draws the score text in the corner.
function drawScore(){
    // Set the score text color to white.
    ctx.fillStyle = "white";
    // Choose the font for the score.
    ctx.font = '20px Times New Roman'
    // Draw the score near the top-right of the canvas.
    ctx.fillText("score " + score, c.width-65, 15);
}
// This function paints the background color of the canvas.
function clearScreen(){
    // Set the background fill color to gray.
    ctx.fillStyle = "gray";
    // Draw a gray rectangle over the entire canvas.
    ctx.fillRect(0, 0, c.width, c.height);
}

// This function updates the snake head position.
function snakePositon(){
    // Move the head horizontally by the current x velocity.
    headX += xVelocity;
    // Move the head vertically by the current y velocity.
    headY += yVelocity;
    // Wrap the snake if it moved outside the board.
    boundryCheck();
}

// This function draws the apple.
function drawApple(){
    // Pick a random red value for the apple color.
    red = Math.floor(Math.random() * 256);
    // Pick a random green value for the apple color.
    green = Math.floor(Math.random() * 256);
    // Pick a random blue value for the apple color.
    blue = Math.floor(Math.random() * 256);

    // Build an RGB color from the random values.
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    // Draw the apple as a square.
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
// This function checks whether the snake has eaten the apple.
function checkAppleCollision(){
    // If the snake head is on the same tile as the apple...
    if(appleX === headX && appleY=== headY){

        // Pick a new random x position for the apple.
        appleX = Math.floor(Math.random() * tileCount);
        // Pick a new random y position for the apple.
        appleY = Math.floor(Math.random() * tileCount);

        // Increase the snake's tail length by 1.
        tailLength++;
        // Increase the player's score by 1.
        score++;
        // Move the bomb to a new random position too.
        placeBomb();
    } 
}
                                                                        
// Listen for keydown events on the whole page.
document.body.addEventListener("keydown", keyDown);
 
// This function changes the snake direction based on arrow keys.
function keyDown(event){
    // If the Up Arrow key was pressed...
    if(event.keyCode == 38){
        // Do nothing if the snake is currently moving down, because reversing would hit itself.
        if (inputsYVelocity == 1) return;
    // Change movement to go up.
    inputsYVelocity = -1;
    // Stop horizontal movement.
    inputsXVelocity = 0;
    }
    // If the Down Arrow key was pressed...
    if(event.keyCode == 40){
        // Do nothing if the snake is currently moving up.
        if (inputsYVelocity == -1) return;
        // Change movement to go down.
        inputsYVelocity = 1;
        // Stop horizontal movement.
        inputsXVelocity = 0;
    } 
    // If the Left Arrow key was pressed...
    if(event.keyCode == 37){
        // Do nothing if the snake is currently moving right.
        if (inputsXVelocity == 1) return;
        // Stop vertical movement.
        inputsYVelocity = 0;
        // Change movement to go left.
        inputsXVelocity = -1;
    } 
    // If the Right Arrow key was pressed...
    if(event.keyCode == 39){
        // Do nothing if the snake is currently moving left.
        if (inputsXVelocity == -1) return;
    // Stop vertical movement.
    inputsYVelocity = 0;
    // Change movement to go right.
    inputsXVelocity = 1;
    } 
}

// Start the game loop as soon as the script loads.
drawGame();
