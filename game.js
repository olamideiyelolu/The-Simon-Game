// Array to put the color pattern
var gamePattern = [];
var userClickedPattern = [];

// Declare variables
var level = 0
var grade;
var buttonColors = ["red", "blue", "green", "yellow"];
var userButtonClicked;




//  This is the event Listener for button clicks
$(".btn").on("click",function(event){ 
    var userChosenColour =  event.target.id;  // This is to get the  id of the div being clicked; so we had to get the traget then the id
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length - 1);

    // This creates the next random sequence
    if((userClickedPattern.length === gamePattern.length) && grade === true){
        setTimeout(function(){
            nextSequence();
            userClickedPattern = [];
        },1000);      
    }                
     
});

// This is an event Listener for keypress to initiate the start of a new game
var pressCount = 0
$(document).on("keypress",function(){
    pressCount += 1;
    if (pressCount == 1){
        nextSequence();
        
    }    
})


// This function creates the next color in a sequence of color pattern for the user to memorize
function nextSequence(){
    // Generate random number
    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4) ;
    var randomChosenColor = buttonColors[randomNumber];

    //Push it into the list of randomly generated color pattern
    gamePattern.push(randomChosenColor);    
    var randomColorID = "#" + randomChosenColor;
    $(randomColorID).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // Animate the random color chosen
    playSound(randomChosenColor);
    level ++;
    $("h1").text("Level " + level);
}

// This function plays the sound for each color/button
function playSound(color){
    var audio = new Audio("sounds/" + color +".mp3"); // You need to put the address to the sound
    audio.play();
}


// This function creates a press animation for each button pressed
function animatePress(currrentColour){
    $("."+ currrentColour).addClass("pressed")
    setTimeout(function(){
        $("."+ currrentColour).removeClass("pressed")
    },100)
}

// This function is to check if the users pattern matches that of the game
function checkAnswer(currentLevel){
    
    for (var i = currentLevel ; i >= 0 ;i--){
        if(userClickedPattern[i] === gamePattern[i]){
            grade = true;
            
        }else{
            grade = false;
            playSound("wrong")
            $("h1").text("Game Over, Press Any Key to Restart")
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200)
            startOver();
            return
        }
    }
    
}

// This function is to set the values that have been altered to default so a new game can begin.
function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0
    pressCount = 0;
}






