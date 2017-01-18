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
	var info = document.createElement("div");
	var infoSize=window.innerWidth*0.4;
	info.style.borderRadius="20%";
	info.style.height=infoSize;
	info.style.width=infoSize;
	info.style.position="absolute";
	info.style.left="30%";
	info.style.top="5%";
	info.style.backgroundColor="#90b5e5";

	
	var text = document.createElement("div");
	text.innerHTML="Click the ball!";
	text.style.marginTop="30%";
	text.setAttribute("class","text");
	info.appendChild(text);

	var button = document.createElement("div");
	button.setAttribute("class","text");
	button.style.opacity="0.9";
	button.innerHTML="GOT IT";
	button.style.height="13%";
	button.style.borderStyle="solid";
	button.style.borderWidth="medium";
	button.style.borderColor="red";
	button.style.width="46%";
	button.style.position="absolute";
	button.style.left="27%"
	button.style.borderRadius="30%";
	button.style.backgroundColor="#2c1d54";
	button.style.color="white";
	button.setAttribute("onclick","slowDelete(this.parentNode)");

	//<img id='ball' src='ball.png' onclick='clicked(event)'draggable='false'>
	info.appendChild(button);
	
	document.body.appendChild(info);
}

function slowDelete(x){
	x.style.animationName="disappear";
	x.style.animationDuration="1s";
	setTimeout(function(){document.body.removeChild(x);}, 1000);
	createBall();

}

function createBall(){
	var ball = document.createElement('img');
	ball.setAttribute('id','ball');
	ball.setAttribute('src','ball.png');
	ball.setAttribute('onclick','clicked(event)');
	ball.setAttribute('draggable','false');
	ball.style.height=size+'px';
	ball.style.width=size+'px';
	timer = setInterval(function(){tick()}, 10);
	document.body.appendChild(ball);
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