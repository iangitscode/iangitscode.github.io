$(document).ready(function(){
	fillStars();
	if($("#image").height()>window.innerHeight || $("#image").width()>window.innerWidth){
		$("#image").width(window.innerWidth);
		$("#image").height(window.innerWidth);
	}
});

//Function to insert stars into elements with class 'star'
//Glyphicons courtesy of http://glyphicons.com/ :)
function fillStars(){
	var stars=$(".stars")
	$.each(stars, function(index, value) {
  		var number=parseInt(this.innerHTML);
  		var fullstar="<span class='glyphicon glyphicon-star'></span>";
  		var emptystar="<span class='glyphicon glyphicon-star-empty'></span>";
  		this.innerHTML="";
  		for(var x=0;x<5;x++){
  			if(x<number) this.innerHTML+=fullstar;
  			else this.innerHTML+=emptystar;
  		}
	});
}

//Function to switch the current view in the iframe

var projects = [
	{link:'soccer/index.html',
	 description:"This is a small game I built with vanilla HTML, CSS, and Javascript, based on the Facebook Messenger game.\
	It features a basic physics engine and a variable difficulty setting."},
	{link:'graph/index.html',
	 description:"This is a node graphing tool built using HTML5 Canvas, based on concepts learned in Math 239.\
	It features nodes that you can create, delete, move, and rename, and the ability to draw edges between nodes.\
	This project was created in collaboration with Jonah Dlin."}
];

function switchFrame(id){
	document.getElementById("myframe").setAttribute("src",projects[id].link);
	document.getElementById("projectinfo").innerHTML=projects[id].description;
}