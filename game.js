let userPattern = [];
let gamePattern = [];
let level = 1;
let streak = 0;
let bestStreak = 0;

function endGame(){
  //Reset arrays of data
  userPattern = [];
  gamePattern = [];
  
  //Update best
  if (bestStreak < streak)
    bestStreak = streak;

  //Let the user know that the game ended
  $(".level").text("Game Over!");
  $("#game").css("display", "none");
  $(".homePage").css("display", "block");
  $("#bestStreak span").text(bestStreak);

  //Animations
  $("body").css({backgroundColor: 'rgb(255,0,0)'});
  setTimeout(()=>{
    $("body").css({backgroundColor: '#011f3f'});
  }, 150)

  if(!$("#gameOver").length)
    $(".game").after("<p id='gameOver'>You failed!</p>");
  else
    $("#gameOver").css({bottom: '0px', opacity: 1});
  $("#gameOver").animate({bottom: '80px', opacity: 0}, 1000);
  //alert(`You failed :( \nYour streak: ${streak}`);
}

function startGame(){
  //Restart variables
  streak = 0;
  level = 1

  //Change website to game mode
  $("#game").css("display", "grid");
  $(".homePage").css("display", "none");
  $(".level").text("Level " + level); 

  //Add a pattern to start
  setTimeout(addPattern, 500);
}

function addPattern(){
  //Random pattern
  let newPattern = Math.ceil(Math.random()*4);
  let square = "#square" + newPattern;
  gamePattern.push(newPattern);

  //Animation
  $(square).animate({opacity: '0'},150);
  $(square).animate({opacity: '1'},150);
}

function levelUp(){
  level += 1;
  userPattern=[];

  $(".level").text(`Level ${level}`);
  addPattern();

  //Animation
  if(!$("#levelUp").length)
    $(".game").after("<p id='levelUp'>Level Up!</p>");
  else
    $("#levelUp").css({bottom: '0px', opacity: 1});
  $("#levelUp").animate({bottom: '80px', opacity: 0}, 700);
}


//Event handlers*******************
//*********************************
$("#startYes").click(()=>{
  startGame();
});

$("#startNo").click(()=>{
  alert("Then get out of my website :/");
});

$("button.square").click((event)=>{
  //Get selected button from user
  let selected = Number(event.target.id.slice(6));
  userPattern.push(selected);
  let userPatternLength = userPattern.length;

  //If player added wrong pattern
  if (gamePattern[userPatternLength-1] != selected){
    endGame();
  }

  //If succesful streak
  if (userPatternLength == gamePattern.length){
    streak += 1;
    levelUp();
  }
});
