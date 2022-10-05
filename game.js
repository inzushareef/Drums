// alert("Hey!");
 
// $("h1").css("color","red");
 
// $("h1").fadeOut().fadeIn(1000);
 
// $("div.container").fadeOut().fadeIn(5000);
 
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var start = false;
 
var buttonColors = ["red","blue","green","yellow"];
 
$(document).keypress(function(){

    //this will look for the 1st key press and starts the game.
    if(!start){
        nextSequence();
        start = true;
    }
   
});
 

// Below code is for the event listener on the buttons/colors. 

$(".btn").click(function(e){
    var userChosenColour = $(this).attr("id");

    //populating the user Clicked Pattern array so as to keep track of the user's sequence 
    userClickedPattern.push(userChosenColour);

    //below function is called to play the sound of the respective choosen color;
    playSound(userChosenColour);

    //and the below fucntion is for the animations of the button when it is pressed.
    animatePress(userChosenColour);


    //Every time a button is clicked we have to check the sequence with the game pattern that is generated from next sequence function.
    //and the parameter that is passed is the last element of the array. using the length function.
    checkAnswer(userClickedPattern.length - 1);
});
 
 
function checkAnswer(currentLevel){


    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        //console.log("success");
        
        //Here we are checking if he lengths of both game pattern and user pattern to be same. and it'll satisfy this 
        //when user has reached here with correct pattern. and we call next sequence to go to next level.
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence,1000);
        }
    }
    else{
 
        playSound("wrong");
 
        $("body").addClass("game-over");
 
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        //console.log("Wrong");
 
        $("h1").text("Game Over, Press any key to restart");
        startOver();        
    }
}
 
 
 
 
//this is the imp function which is to be called when we need a next sequence from the player
//So we use the random fucntion from JS to generate random number from 0-3

function nextSequence(){
    
    //Every time a next sequence is called we are emptying this array so as to populate this and check the respective sequence
    //in the next turn.
    userClickedPattern = [];
    
    //to change the level-title to the respective level.
    level++;
    $("#level-title").text("level "+ level);
    

    //Generate the random numbers from 0-3 for adding a new color to the sequence.
    var random = Math.floor(Math.random()*4);
    var randomColor = buttonColors[random];

    //pushing that random generated number to the game pattern so as to keep track of expected sequnce.
    gamePattern.push(randomColor);

    //this will animate the button that is selected for the next level
    $("."+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //for playing the respective sound.
    playSound(randomColor);
    //for animating the respective random color/button.
    animatePress(randomColor);
   
 
}

//fucntion to play the expected name.mp3
 
function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}


//fucntion for animating any of the button when it is pressed. 
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
 
    setTimeout(function() {
        $('#'+currentColor).removeClass('pressed');
    }, 100)
 
}
 

//this function if for starting over the game once it is over.
function startOver(){
    start = false;
    level = 0;
    gamePattern = [];
}
 
 

