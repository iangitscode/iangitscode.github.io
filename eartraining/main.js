function note(name,freq){
	this.name=name;
	this.freq=freq;
}

var c=new (window.AudioContext || window.webkitAudioContext)();
var notes=[];
notes.push(new note("G",196.00));
notes.push(new note("A",220.00));
notes.push(new note("B",246.94));
notes.push(new note("C",261.63));
notes.push(new note("D",293.66));
notes.push(new note("E",329.63));
notes.push(new note("F",349.23));
notes.push(new note("G",392.00));
notes.push(new note("A",440.00));

var currentTargetNote;
var currentOutputFreq;
var currentAnswer;

var playDuration=500;

var minDistance=2;

var score=0;

function playNote(freq){
	var note=c.createOscillator();
	note.frequency.value=freq;

	note.connect(c.destination);
	note.start(0);

	setTimeout(function(){
		note.stop(0);
	},playDuration);
}

function pickNote(){
	return Math.floor(Math.random()*(notes.length-2)+1);
}

function pickAnswer(){
	return Math.floor(Math.random()*3)+1;
}

//generates a note slightly flatter than the note index given
function generateFlat(index){
	var originalFreq=notes[index].freq;
	var prevFreq=notes[index-1].freq;
	var oneTenth=(originalFreq-prevFreq)/10;
	return originalFreq-(Math.floor(Math.random()*7)+1+minDistance)*oneTenth;
}

//generates a note slightly sharper than the note index given
function generateSharp(index){
	var originalFreq=notes[index].freq;
	var prevFreq=notes[index+1].freq;
	var oneTenth=(prevFreq-originalFreq)/10;
	return originalFreq+(Math.floor(Math.random()*7)+1+minDistance)*oneTenth;
}

function replay(){
	document.getElementById("replay").disabled=true;
	setTimeout(function(){
		document.getElementById("replay").disabled=false;
	},playDuration);
	playNote(currentOutputFreq);
}

function round(){
	currentTargetNote=pickNote();
	document.getElementById("targetnote").innerHTML=notes[currentTargetNote].name;
	//playNote(currentTargetNote.freq);
	currentAnswer=pickAnswer();

	switch(currentAnswer){
		case 1: //flat
			currentOutputFreq=generateFlat(currentTargetNote);
			console.log("FLAT");
			break;
		case 2: //perfect
			currentOutputFreq=notes[currentTargetNote].freq;
			console.log("PERFECT");
			break;
		case 3: //sharp
			currentOutputFreq=generateSharp(currentTargetNote);
			console.log("SHARP");
			break;
	}
	playNote(currentOutputFreq);
}

function guess(guess){
	if(currentAnswer==guess){
		round();
	}
}

function start(){
	document.getElementById("play").style.display="none";
	document.getElementById("game").style.display="block";
	round();
}