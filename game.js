// A Simon game that allows users understand jQuery

var gameArray = []
var userClickedPattern = []
var buttonColours = ["red","blue","green","yellow"]
var level = 1
var userClickIndex = 0


function playSound(name){
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColor){
    $(currentColor).addClass('pressed')
    setTimeout(function() {
        $(currentColor).removeClass('pressed')
    }, 100);
}

$(document).on("keypress",function () {
    console.log(level);
    if (level == 1){
        setTimeout(() => {
            nextSequence()
        }, 1000);   
    }  
})


$('.btn').on("click",function () {
    var userChosenColor = this.getAttribute("id")
    userClickedPattern.push(userChosenColor)

    $("#" + userChosenColor).fadeOut(100).fadeIn(100);
    playSound("sounds/" + userChosenColor + ".mp3")

    animatePress("#" + userChosenColor)

    checkAnswer(userClickIndex)
    
})

function nextSequence(){
    var randomNumber = Math.round(Math.random() * 3)

    var randomChosenColor = buttonColours[randomNumber]
    gameArray.push(randomChosenColor)

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound("sounds/" + randomChosenColor + ".mp3")

    animatePress("#" + randomChosenColor)

    $('h1').text("Level " + level.toString())
    level += 1
    animatePress(randomChosenColor)
}

function checkAnswer(clickIndex){
    var result = "failure"
    for (var i =0;i<clickIndex+1;i++){
        gameColor = gameArray[clickIndex]
        usercolor = userClickedPattern[clickIndex]

        
        if (gameColor != usercolor){
            userClickIndex = 0
            userClickedPattern = []
            gameArray = []
            level = 1
            result = "failure"
            $('body').addClass('game-over')
            setTimeout(() => {
                $('body').removeClass('game-over')
            }, 200);
            playSound("sounds/wrong.mp3")
            $('h1').text("Press A Key to Start")
            break
        }
        else{
            result = "success" 
        }
    }
    if (result == "success"){
        userClickIndex += 1 
        console.log("The click index is " + clickIndex)
        if (userClickedPattern.length == gameArray.length){
            $(document).delay("slow")
            userClickIndex = 0
            userClickedPattern = []
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    }
}
