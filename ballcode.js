var aX=1;
var aY=1;
var vX=0;
var vY=0;
var angle=0;
var rotatespeed=0;
var yPos=window.innerHeight-200;
var xPos=window.innerWidth/2-100;
var timer;
var score=0;
var highscore=0;
var started=false;

function init(){
	timer = setInterval(function(){tick()}, 10);
}

function tick(){
	document.getElementById("ball").style.top=yPos+"px";
	document.getElementById("ball").style.left=xPos+"px";

	if(!started) return;

	//angle stuff
	angle+=rotatespeed;
	document.getElementById("ball").style.transform="rotate("+angle+"deg)";

	//bouncing off walls, need to flip xVel and rotatespeed
	if(xPos+200>window.innerWidth || xPos<0){
		vX*=-1;
		rotatespeed*=-1;
	}

	//calculate new position
	yPos+=vY;
	xPos-=vX;
	vY+=aY;

	//reset if lose
	if(yPos>window.innerHeight+200){
		rotatespeed=0;
		yPos=window.innerHeight-200;
		xPos=window.innerWidth/2-100;
		vX=0;
		vY=0;
		drawScore();
		started=false;
	}
}

function drawScore(){
	document.getElementById("score").innerHTML=score;
	document.getElementById("highscore").innerHTML=highscore;
}

function clicked(event){
	if(!started){
	score=0;
	started=true;
	}	
	score++;
	if(score>highscore){
		highscore=score;
	}
	drawScore();
	vY=-30;
	mouseX=event.clientX;
	if(mouseX>=xPos && mouseX<=xPos+200){
		vX=(mouseX-xPos-100)/5;
		rotatespeed=-vX/2;
	}
}