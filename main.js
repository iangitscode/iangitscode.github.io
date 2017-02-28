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