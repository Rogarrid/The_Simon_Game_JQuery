const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = []; //guarda botón que sale a modo random.
let userClickedPattern = [];// guarda botón pulsado por el jugador.
let level = 0;
let checkLevel = 0;
let resetPlayKey = 0;

$(document).on('click', 'div[type="button"]', function(event){
	let userChosenColour = this.id;
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkClicked();
});

$(document).keypress(function(){
	if(!resetPlayKey)
	{
		level = 0;
		checkLevel = 0;
		userClickedPattern = [];
		gamePattern = [];
		nextSequence(level);
	}
});

function nextSequence(level){
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];

	if (randomChosenColour == gamePattern[gamePattern.length - 1])
		nextSequence(level);
	else {
		gamePattern.push(randomChosenColour);
		$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
		playSound(randomChosenColour);
		$("h1").text("Level " + level);
		resetPlayKey = 1;
	}
}

function gameOver(){
	let music = "wrong";
	$("h1").text("Game Over, Press a key to reset");
	$("body").addClass("game-over");
	setTimeout(function(){
		$("body").removeClass("game-over");
	}, 200); //setTimeOut permite que una función actue tras el paso de un tiempo.
	playSound(music);
	resetPlayKey = 0;
}

function checkClicked(){

	if (userClickedPattern[checkLevel] == gamePattern[checkLevel])
		checkLevel++;
	else
		gameOver();
	if (checkLevel == gamePattern.length) {
		userClickedPattern = [];
		checkLevel = 0;
		level++;
		nextSequence(level);
	}
}

function playSound(effect){

	switch (effect) { //entra en switch el valor del parámetro y ve si está en algún caso, si no está da error.
	  case "red":
		  var red = new Audio('sounds/red.mp3');
		  red.play();
		break;
	  case "blue":
		  var blue = new Audio('sounds/blue.mp3');
		  blue.play();
		break;
	  case "green":
		  var green = new Audio('sounds/green.mp3');
		  green.play();
		break;
	  case "yellow":
		  var yellow = new Audio('sounds/yellow.mp3');
		  yellow.play();
		break;
	  case "wrong":
		  var wrong = new Audio('sounds/wrong.mp3');
		  wrong.play();
		break;
	  default: console.log("Error");
	}
  }

function animatePress(currentColour)
{
	$("#" + currentColour).addClass("pressed");
	setTimeout(function(){
		$("#" + currentColour).removeClass("pressed");
	}, 100); //setTimeOut permite que una función actue tras el paso de un tiempo.
};
