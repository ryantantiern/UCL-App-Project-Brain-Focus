
function getMousePos(canvas, evt) {
  var timeElapsed = Date.now() - startTime;
	var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
		t: Date.now() - startTime
  };
}
function drawLine(x1, y1, x2, y2){
  context.beginPath();
  context.moveTo(x1, y1);
	context.quadraticCurveTo((x1+x2)/2,(y1+y2)/2, x2, y2);
  
	context.lineWidth = 3;
  context.stroke();
}
var updateUserLine = function(e){
  var mousePos = getMousePos(canvas, e);
  currentPos = {x: mousePos.x, y: mousePos.y, t: mousePos.t};
  lastRecordedPos = {x: mousePos.x, y:mousePos.y};
  userLine.push(currentPos);
}

function drawUserLine(){
  // drawing loop 
  if(play == 1){
		context.clearRect(0, 0, canvas.width, canvas.height);
		
				//draws backwave
		context.drawImage(imageObj, backwave_x, backwave_y);
		context.drawImage(whiteCov, canvas.width * 0.55, 0);
		if(userLine[0] != null){
			for(i = 0; i < userLine.length - 1; i++){
				drawLine(userLine[i].x , userLine[i].y, userLine[i+1].x, userLine[i+1].y);
			}
		}
		setTimeout(function(){drawUserLine();}, 20);
  }
}

function move_line_left(){
	if(play == 1){
		for(i = 0; i < userLine.length; i++){
		 userLine[i].x -= 1;
		 if(userLine[i] < -10){
			 userLine.splice(i,1);
		 }
		}
		backwave_x -= 1;
		setTimeout(function(){move_line_left();}, audio.duration * 1000/(imageObj.width ));
	}
}


function updateIfNoEntry(){
	if(play == 1 && mouse_move == 0){
		if(lastRecordedPos != null){
				var bufferPos = {x:lastRecordedPos.x, y:lastRecordedPos.y, t:Date.now()- startTime};
				userLine.push(bufferPos);
		}
		setTimeout(function (){updateIfNoEntry();}, 10);
	}
}
function mouseStopped(){
	mouse_move = 0;
	updateIfNoEntry();
}

function track_wave(){
	if(play == 1){
		if(userLine[userLine.length-1] != null){
			trackedWave.push(userLine[userLine.length-1]);
		}
		setTimeout(function(){track_wave();}, 20);
	}
}


var handler_end = function(){
  // Stop loop 
  play = 0;
  canvas.removeEventListener('mousemove', updateUserLine);
  audio.removeEventListener('pause', handler_pause); // True when not paused
  audio.removeEventListener('play', handler_play);
}

var handler_play = function (){
	canvas.addEventListener('mousemove', updateUserLine);
	canvas.addEventListener('mousemove', function(){
		mouse_move = 1;
		clearTimeout(timer);
		timer=setTimeout(function(){mouseStopped();}, 50);
		//setTimeout(function(){mouseStopped();}, 100);
	});
	track_wave();
  move_line_left();
  drawUserLine();
  play = 1;
	
	
}

var handler_pause = function(){
	canvas.removeEventListener('mousemove', updateUserLine);
  play = 0; 
} 
function adjustWaveToScreen(uncorrectedWave){
  // waveform produced is a record of Y-values over time. 
  // These values are spread over the screen width equally.
  var dX = canvas.width/uncorrectedWave.length;
  var correctedX = 0;
  for(i = 0; i < uncorrectedWave.length; i++){
    uncorrectedWave[i].x = correctedX;
    correctedX += dX;
  }
}
var manual_pp = function(e){
	if(e.keyCode == 27 || e.keyCode == 80){
		if(audio.paused){
			audio.play();
			play = 1;
		}
		else{
			audio.pause();
			play = 0;
		}
	}
}


var canvas = document.getElementById('myCanvas');
var audio = document.getElementById('myAudio');
var context = canvas.getContext('2d');
var startTime = Date.now();																		 
var currentPos = null;
var lastRecordedPos = null;
var userLine = [];
var trackedWave = [];
var timer; 

var imageObj = new Image();
imageObj.src = '../Game/soundpitch.jpg';
var whiteCov = new Image();
whiteCov.src= '../../cover.jpg';

var coverWidth;
var coverHeight;

var play = 1; //0=OFF 1=ON
var mouse_move = 0;

// Canvas Style
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;
var backwave_x = canvas.width * 0.55;
var backwave_y = canvas.height * 0.4;


window.addEventListener('keydown',manual_pp);
audio.addEventListener('play',handler_play);
audio.addEventListener('pause', handler_pause);
audio.addEventListener('ended', handler_end);






