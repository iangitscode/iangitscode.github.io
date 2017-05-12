var showingSkills=false;
var showingProjects=false;
var currSlide=0;
var slides;

$(document).ready(function(){
	$("#skilltable").hide();

	document.getElementById("aboutme").style.display="block";
	slides=document.getElementsByClassName("item");
	updateSlides();
	setInterval(function(){
		var maxSlides=slides.length;
		currSlide++;
		if(currSlide==maxSlides) currSlide=0;
		updateSlides();
	},3000);
	fillSkills();
});

//Function to hide all elements with a 'content' class
function hideContent(){
	var contents=document.getElementsByClassName("content");
	$.each(contents, function(index, element) {
		element.style.display="none";
	});
}

//Function to show the appropriate content
function changecontent(id){
	hideContent();
	switch(id){
		case 0:
			document.getElementById("aboutme").style.display="block";
			break;
		case 1:
			document.getElementById("carouselBox").style.display="block";
			break;
		case 2:
			document.getElementById("contactBox").style.display="block";
			break;
	}
}

//Function to insert boxes into elements with class 'skill'
function fillSkills(){
	var skills=$(".strength")
	$.each(skills, function(index, value) {
		var number=parseInt(this.innerHTML);
		var fullBox="<span class='fullBox'></span>";
		var emptyBox="<span class='emptyBox'></span>";
		this.innerHTML="";
		for(var x=0;x<5;x++){
			if(x<number) this.innerHTML+=fullBox;
			else this.innerHTML+=emptyBox;
		}
	});
}

//Function to toggle whether or not the skills are showing
function toggleSkills(){
	showingSkills=!showingSkills;
	$("#skilltable").animate({height: 'toggle'});
}

//Function to toggle whether or not the project list is showing
function toggleProjects(){
	showingProjects=!showingProjects;
	var projects=document.getElementsByClassName("project");
	$.each(projects,function(index,element){
		if(showingProjects){
			element.style.maxHeight="70px";
		}else{
			element.style.maxHeight="0px";
		}
	});
}

//Function to display the appropriate project
function switchProject(id,newTab){
	hideContent();
	document.getElementById("iframebox").style.display="block";
	var link="";
	switch(id){
		case 0:
			link="soccer/index.html";
			break;
		case 1:
			link="redirectToGraph.html";
			break;
	}
	if(newTab){
		var win = window.open(link, '_blank');
		win.focus();
	}else{
	document.getElementById("myframe").setAttribute("src",link);
	}
}

//Function to make the only the /current/ slide visible
function updateSlides(){
	$.each(slides,function(index,slide){
		slide.style.display="none";
	});
	slides[currSlide].style.display="block";
}