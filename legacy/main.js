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
function switchFrame(id){
	var link="";
	switch(id){
		case 0:
			link="soccer/index.html";
			break;
		case 1:
			link="redirectToGraph.html";
			break;
	}
	document.getElementById("myframe").setAttribute("src",link);
}

//Function to reveal the project info
//Assumes that there the project info node is the second child of obj
function overlay(obj){
	obj.childNodes[1].style.opacity=0.9;
}

//Function to hide the passed in node
function hide(obj){
	obj.style.opacity=0;
}

//Function to open the iframe in a new tab
function createTab(){
	var link=document.getElementById("myframe").getAttribute("src");
	console.log(link);
	if(link != ""){
		var win = window.open(link, '_blank');
		win.focus();
	}
}