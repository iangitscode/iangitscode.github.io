var aX=1;
var aY=1;
var vX=0;
var vY=0;
var angle=0;
var rotatespeed=0;
var size=window.innerHeight/4;
var yPos=window.innerHeight-size;
var xPos=(window.innerWidth-size)/2;
var timer;
var score=0;
var highscore=0;
var started=false;

function init(){
	timer = setInterval(function(){tick()}, 10);
	document.getElementById("ball").style.height=size+'px';
	document.getElementById("ball").style.width=size+'px';
	createBall();
}

function instructions(){
	var over = document.createElement('div');
	over.innerHTML="Click the ball to kick it! Juggle as long as you can~ <br> (Click anywhere to return)";
	over.setAttribute('class','over text');
	over.setAttribute('onclick','this.parentNode.removeChild(this)');
	document.body.appendChild(over);
}

function tick(){
	
	document.getElementById("ball").style.top=yPos+"px";
	document.getElementById("ball").style.left=xPos+"px";

	if(!started) return;

	//angle stuff
	angle+=rotatespeed;
	document.getElementById("ball").style.transform="rotate("+angle+"deg)";

	//bouncing off walls, need to flip xVel and rotatespeed
	if(xPos+size>window.innerWidth || xPos<0){
		vX*=-1;
		rotatespeed*=-1;
	}

	//calculate new position
	yPos+=vY;
	xPos-=vX;
	vY+=aY;

	//reset if lose
	if(yPos>window.innerHeight+size){
		rotatespeed=0;
		yPos=window.innerHeight-size;
		xPos=(window.innerWidth-size)/2;
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
	if(mouseX>=xPos && mouseX<=xPos+size){
		vX=(mouseX-xPos-size/2)/5;
		rotatespeed=-vX/2;
	}
}