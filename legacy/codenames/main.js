var words=[];
//create the array of words
var redCards;
var blueCards;
var counter;
var assCount;
var hidden=true;

$(function(){	
document.getElementById("input").onchange = update;
});

function startGame(){
	//shuffles the words
	shuffle(words);
	//creates the counter
	counter=0;

	/* Input Requirements:
		size>2
		agents!=0
		assassins+(2*agents) < size^2
	*/
	assCount=$("#assassins").val();
	var size=$("#gridSize").val();
	var agents=$("#agents").val();
	redCards=agents;
	blueCards=agents;
	
	var maxBoxes=Math.pow(size,2);
	
	if(!(size>2 && agents!=0 && (assCount+agents <= maxBoxes))){
		console.log("fail");
		return;
	}
	
	//clears and resizes table			
    document.getElementById("myTable").innerHTML="";
	document.getElementById("myTable").style.width=300*size+"px";
	document.getElementById("myTable").style.height=200*size+"px";
	//build rows and columns
	for(y=0;y<size;y++){
	//create a new row
		var myRow = document.createElement("tr");
		//create initial values
		myRow.id="row"+y;
		myRow.style.height="100px";
		myRow.style.backgroundColor="#e6ffff";
		//add it to the table				
		document.getElementById("myTable").appendChild(myRow);
		//add boxes to each row
		for(x=0;x<size;x++){
			//create a new box
			var myTd = document.createElement("td");
			//set initial values
			myTd.state=0;
			myTd.id="box"+counter;
			myTd.onclick=function(){clicked(this)};
			myTd.onmouseover=function(){mouseOver(this)};
			myTd.onmouseout=function(){mouseOut(this)};
			myTd.style.width="200px";
			myTd.style.textAlign="center";
			myTd.style.fontSize="30pt";
			myTd.style.fontFamily="impact";
			myTd.style.border="3px solid black";
			myTd.clickey=false;
			//give it a word
			myTd.innerHTML=words[counter];
			//increment counter
			counter++;
			//add it to the row
			document.getElementById(myRow.id).appendChild(myTd);
		}
	}
				
	//table has been created, decide on state
	
	//pick a starting colour
	var redStart=Math.random();
	if(redStart>0.5){
		//blue starts
		document.getElementById("whoStarts").innerHTML="Blue Starts!";
		redStart=0;
		blueCards++;
	}
	else{
		//red starts
		document.getElementById("whoStarts").innerHTML="Red Starts!";
		redStart=1
		redCards++;
	}
	//make some cards red
	var num;
	for(var red=0;red<redCards;red++){
		num=Math.floor(Math.random()*maxBoxes);
		if(document.getElementById("box"+num).state==0){
			document.getElementById("box"+num).state=1;
		}
		else{
			red--;
		}
	}
	//make some cards blue
	for(var blue=0;blue<blueCards;blue++){
		num=Math.floor(Math.random()*maxBoxes);
		if(document.getElementById("box"+num).state==0){
			document.getElementById("box"+num).state=2;
		}
		else{
			blue--;
		}
	}
	//make some cards black
	if(assCount!=0){
		for(var black=0;black<assCount;black++){
			num=Math.floor(Math.random()*maxBoxes);
				if(document.getElementById("box"+num).state==0){
					document.getElementById("box"+num).state=3;
				}
				else{
					black--;
				}
			}
		}
		updateCounter();
	}

function updateCounter(){
	document.getElementById("redLeft").innerHTML="Red Agents: "+redCards;
	document.getElementById("blueLeft").innerHTML="Blue Agents: "+blueCards;
	if(redCards==0){
		alert("Team Red wins!");
		showAll();
	}
	if(blueCards==0){
		alert("Team Blue wins!");
		showAll();
	}		
}

//(very lazily) shuffles an array
function shuffle(words){
	var len=words.length;
	for(x=0;x<len;x++){
		var one=Math.floor(Math.random()*len);
		var two=Math.floor(Math.random()*len);
		var placeholder=words[one];
		words[one]=words[two];
		words[two]=placeholder;
	}
}
			
//file reading stuff THANK YOU PERRIN
function update() {
	words=[];
	if (window.FileReader) {
		var file = this.files[0];
		var reader = new FileReader();
		reader.onload = function(progressEvent){
			var newWords = this.result.split('\n');
			for(var line = 0; line < newWords.length; line++){
				words.push(newWords[line]);
			}
		}
		reader.readAsText(file);
	} else {
		alert("File reader not supported!");
	}
}

function clicked(cell){
	if(hidden && !(cell.clickey)){
		cell.clickey=true;
		if(cell.state==0){
			cell.style.backgroundColor="#ffffcc";
		}
		if(cell.state==1){
			cell.style.backgroundColor="#e62e00";
			redCards--;
			updateCounter();
		}
		if(cell.state==2){
			cell.style.backgroundColor="#0066cc";
			blueCards--;
			updateCounter();
		}
		if(cell.state==3){
			cell.style.backgroundColor="#000000";
			cell.style.color="#ffffff";
			showAll();
			for(x=0;x<counter;x++){
				document.getElementById("box"+x).clickey=true;
			}
		}
	}
}
			
function change(){
	if(hidden && window.confirm("About to show agents! Avert your eyes!")){
		document.getElementById("myToggle").innerHTML="Hide agents";
		showAll();
	}else{
		document.getElementById("myToggle").innerHTML="Show agents";
		for(x=0;x<counter;x++){
			var cell=document.getElementById("box"+x);
			if(!cell.clickey){
				cell.style.color="#000000";
				cell.style.backgroundColor="#e6ffff";
			}
		}
	}
	hidden=!hidden;
}
			
function showAll(){
	for(x=0;x<counter;x++){
			var cell=document.getElementById("box"+x);
			if(!cell.clickey){
				if(cell.state==0){
					cell.style.backgroundColor="#ffffcc";
				}
				if(cell.state==1){
					cell.style.backgroundColor="#e62e00";
				}
				if(cell.state==2){
					cell.style.backgroundColor="#0066cc";
				}
				if(cell.state==3){
					cell.style.backgroundColor="#000000";
					cell.style.color="#ffffff";
				}
			}
		}
}
			
function mouseOver(cell){
	cell.style.border="3px solid gold";
}
			
function mouseOut(cell){
	cell.style.border="3px solid black";
}