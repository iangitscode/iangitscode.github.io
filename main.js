$(document).ready(function(){
	fillStars();
	$("#image").height($("#aboutme").height());
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
	['soccer/index.html',"This is a small game I built with vanilla HTML, CSS, and Javascript, based on the Facebook Messenger game.\
	It features a basic physics engine and a variable difficulty setting."],
	['https://jonahdlin.com/graph',"This a node graphing tool using HTML5 Canvas, building off concepts learned in Math 239.\
	It features nodes that you can create, delete, move, and rename, and the ability to draw edges between nodes.\
	The base structure of this project was created by Jonah Dlin."]
];

function switchFrame(id){
	document.getElementById("myframe").setAttribute("src",projects[id][0]);
	document.getElementById("projectinfo").innerHTML=projects[id][1];
}