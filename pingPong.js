//For Fun
console.log("Let's build ping pong");


//Initializing Section

const cvs = document.getElementById('cancan');
const ctx = cvs.getContext('2d');
console.log(ctx);
console.log(cvs);





//Declaring Section
var ball = {
	positionX: cvs.width/2,   
	positionY: cvs.height/2,
	radius: 4,
	speedX: 3,
	speedY: 3
}
console.log(ball);

var paddlePlayer1 = {
	positionPlayer_Horizontal_1: 0,
	positionPlayer_Vertical_1: cvs.height/2,//if(xball<positionPlayer_Horizontal_1+paddleWidth1 && yball>positionPlayer_Vertical_1 && yball<positionPlayer_Vertical_1+paddleLength1) then dy=-dy;
	paddleWidth1: 7,
	paddleLength1: 40
}
console.log(paddlePlayer1);

var paddlePlayer2 = {
	positionPlayer_Horizontal_2: cvs.width-7,
	positionPlayer_Vertical_2: cvs.height/2,//if(xball>positionPlayer_Horizontal_2 && yball>positionPlayer_Vertical_2 && bally<positionPlayer_Vertical_2+paddleLength2) t=-dhen dy
	paddleWidth2: 7,
	paddleLength2: 40
}
console.log(paddlePlayer2);

var score = {
	pointPlayer1: 0,
	pointPlayer2: 0
}


var mid_line = {
	x: cvs.width/2-2,
	y: 0,
	len: 3,
	width: cvs.height
}

var lives = {
	player1_lives: 3,
	player2_lives: 3
}

//Drawing Section
function drawBall(){
	ctx.beginPath();
	ctx.arc(ball.positionX, ball.positionY, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = "yellow";
	ctx.fill();
	ctx.closePath();
}


function drawPaddle_firstPlayer(){
	ctx.beginPath();
	ctx.rect(paddlePlayer1.positionPlayer_Horizontal_1, paddlePlayer1.positionPlayer_Vertical_1, paddlePlayer1.paddleWidth1, paddlePlayer1.paddleLength1);
	ctx.fillStyle = "#8458B3";
	ctx.fill();
	ctx.closePath();
}
drawPaddle_firstPlayer();

function drawPaddle_secondPlayer(){
	ctx.beginPath();
	ctx.rect(paddlePlayer2.positionPlayer_Horizontal_2, paddlePlayer2.positionPlayer_Vertical_2, paddlePlayer2.paddleWidth2, paddlePlayer2.paddleLength2);
	ctx.fillStyle = "#8458B3";
	ctx.fill();
	ctx.closePath();
}
drawPaddle_secondPlayer();


function draw_scorePlayer1(){
	ctx.font = "16px Arial";
    ctx.fillStyle = "#a28089";
    ctx.fillText("Score: "+score.pointPlayer1, 8, 20);
}
draw_scorePlayer1();


function draw_scorePlayer2(){
	ctx.font = "16px Arial";
    ctx.fillStyle = "#a28089";
    ctx.fillText("Score: "+score.pointPlayer2, cvs.width-68, 20);
}


function draw_midLine(){	
		ctx.beginPath();
		ctx.rect(mid_line.x, mid_line.y, mid_line.len, mid_line.width);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();
}
draw_midLine();

function drawPlayer1_lvs(){
	ctx.font = "16px Arial";
    ctx.fillStyle = "#a28089";
    ctx.fillText("Lives: "+lives.player1_lives, 8, cvs.height/2);
}
function drawPlayer2_lvs(){
	ctx.font = "16px Arial";
    ctx.fillStyle = "#a28089";
    ctx.fillText("Lives: "+lives.player2_lives, cvs.width-68, cvs.height/2);
}

//Control Section
//Initialiaztion for player 1
var control_1 = {
	up_pressed: false,
	down_pressed: false
}


//document.addEventListener() part for player1
document.addEventListener("keyup", keyUp);
document.addEventListener("keydown", keyDown);

//functions in document.addEventListener() for player1
function keyUp(e){    //function1
	if(e.keyCode == 38){
		control_1.up_pressed = false;
	}else if(e.keyCode == 40){
		control_1.down_pressed = false;
	}
}

function keyDown(e){   //function2
	if(e.keyCode == 38){
	    control_1.up_pressed = true;
	}else if(e.keyCode == 40){
		control_1.down_pressed = true;
	}
}






//Initialization for player 2
var control_2 = {
	w_pressed:false,
	s_pressed: false
}

//document.addEventListener() for player2
document.addEventListener("keyup", keyUp_2);
document.addEventListener("keydown", keyDown_2);

//Functions Part for player 2
function keyUp_2(key){    //function 1
	if(key.keyCode == 87){
		control_2.w_pressed = false;
	}else if(key.keyCode == 83){
		control_2.s_pressed = false;
	}
}


function keyDown_2(key){     //function 2
	if(key.keyCode == 87){
		control_2.w_pressed = true;
	}else if(key.keyCode == 83){
		control_2.s_pressed = true;
	}
}



//Collision Section

function collide(){
	if(ball.positionY+ball.speedY<ball.radius || ball.positionY+ball.radius>cvs.height-ball.radius){
		ball.speedY = -ball.speedY;
	}else if(ball.positionX+ball.speedX<0+ball.radius){
		if(ball.positionY>paddlePlayer1.positionPlayer_Vertical_1 && ball.positionY<paddlePlayer1.positionPlayer_Vertical_1+paddlePlayer1.paddleLength1){
			ball.speedX = -ball.speedX;
			score.pointPlayer1++;
		}else{
			lives.player1_lives--;
			if(lives.player1_lives==0){
			alert("Player2 wins with score:"+" "+score.pointPlayer2);
			document.location.reload();
			clearInterval(interval);
			}else{
				ball.positionX = cvs.width/2;
				ball.positionY = cvs.height/2;
				ball.speedX = 5;
				ball.speedY = 5;
				paddlePlayer1.positionPlayer_Horizontal_1= 0;
				paddlePlayer1.positionPlayer_Vertical_1= cvs.height/2;
				paddlePlayer2.positionPlayer_Horizontal_2= cvs.width-7;
				paddlePlayer2.positionPlayer_Vertical_2= cvs.height/2;
				positionPlayer_Horizontal_1= 0;
				positionPlayer_Vertical_1= cvs.height/2;
			}
		}
	}else if(ball.positionX+ball.speedX>cvs.width-ball.radius){
		if(ball.positionY>paddlePlayer2.positionPlayer_Vertical_2 && ball.positionY<paddlePlayer2.positionPlayer_Vertical_2+paddlePlayer2.paddleLength2){
			ball.speedX = -ball.speedX;
			score.pointPlayer2++;
		}else{
			lives.player2_lives--;
			if(lives.player2_lives==0){
			alert("Player1 wins with score:"+" "+score.pointPlayer1);
			document.location.reload();
			clearInterval(interval);
			}else{
				ball.positionX = cvs.width/2;
				ball.positionY = cvs.height/2;
				ball.speedX = 3;
				ball.speedY = 3;
				paddlePlayer1.positionPlayer_Horizontal_1= 0;
				paddlePlayer1.positionPlayer_Vertical_1= cvs.height/2;
				paddlePlayer2.positionPlayer_Horizontal_2= cvs.width-7;
				paddlePlayer2.positionPlayer_Vertical_2= cvs.height/2;
				positionPlayer_Horizontal_1= 0;
				positionPlayer_Vertical_1= cvs.height/2;
			}
		}
	}
}





//Animating Section
function animation(){

	//clearing section
	ctx.clearRect(0, 0, cvs.width, cvs.height);


	//invoking section
	drawPaddle_firstPlayer();
	drawPaddle_secondPlayer();
	drawPlayer1_lvs();
	drawPlayer2_lvs();
	collide();
	draw_scorePlayer1();
	draw_scorePlayer2();
	draw_midLine();
	drawBall();

	//paddle movement

	//for paddle left(1)
	if(control_2.w_pressed && paddlePlayer1.positionPlayer_Vertical_1 >= 0+5){
		paddlePlayer1.positionPlayer_Vertical_1 -= 5;
	}else if(control_2.s_pressed && paddlePlayer1.positionPlayer_Vertical_1 < cvs.height-paddlePlayer1.paddleLength1){
		paddlePlayer1.positionPlayer_Vertical_1  += 5;
	}
	//for paddle right(2)
	if(control_1.up_pressed && paddlePlayer2.positionPlayer_Vertical_2 >= 0+5){
		paddlePlayer2.positionPlayer_Vertical_2 -= 5;
	}else if(control_1.down_pressed && paddlePlayer2.positionPlayer_Vertical_2 < cvs.height-paddlePlayer2.paddleLength2){
		paddlePlayer2.positionPlayer_Vertical_2 += 5;
	}



	//ball movement
	ball.positionX += ball.speedX;
	ball.positionY += ball.speedY;

	//ball returning
	
}
let interval = setInterval(animation, 40);

//GAME FINISHED
