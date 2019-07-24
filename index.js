var time = 1000;

var W = window.innerWidth;
var H = window.innerHeight;

const N = 1;
var gravity = 0.3;
// var traction = 0.005;
var bounce_factor = 1;

window.requestAnimationFrame = function(){   // To tell the browser about the animation.
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function(f){
    setTimeout(f, 1000/60);
  }
}();

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = W;
canvas.height = H;

var ball = []

function newBall(mousex, mousey){
  ball.push(new Ball(mousex, mousey));
  console.log(ball.length);
}

// newBall();
// newBall();

for(let j=0; j<N; j++){
  newBall();
}

// setInterval(function(){
//   newBall();
// }, 3000);

// var ball2 = new Ball();

var mousex = 0;
var mousey = 0;

addEventListener("click", function(){
  console.log("inside");
  mousex = event.clientX;
  mousey = event.clientY;
  newBall(mousex, mousey);
})

// function createObstacle(){
//   var obstacle = new Obstacle();
//   return obstacle;
// }

$(document).ready( function renderFrame() {

  requestAnimationFrame(renderFrame);
  ctx.clearRect(0, 0, W, H);

  for(let i=0; i<ball.length; i++){

    console.log(ball.length);
    // console.log(ball[i].vy);
    ball[i].vy += gravity;
    // vx = (vx < 0 ? vx+traction : vx-traction);
    ball[i].x += ball[i].vx;
    ball[i].y += ball[i].vy;

    if (ball[i].x + ball[i].radius > W ){
      ball[i].x = W - ball[i].radius;
      ball[i].vx *= -bounce_factor;
    }
    else if(ball[i].x - ball[i].radius < 0){
      ball[i].x = ball[i].radius;
      ball[i].vx *= -bounce_factor;
    }
    if(ball[i].y + ball[i].radius > H){
      ball[i].y = H - ball[i].radius;
      ball[i].vy *= -bounce_factor;
    }
    else if(ball[i].y - ball[i].radius < 0){
      ball[i].vy *= -bounce_factor;
    }

    // if((mousex >= (ball[i].x - ball[i].radius)) &&
    //   (mousex <= (ball[i].x + ball[i].radius)) &&
    //   (mousey >= (ball[i].y - ball[i].radius)) &&
    //   (mousey <= (ball[i].y + ball[i].radius)))
    // {
    //   ball[i].newRadius = ball[i].radius + 40;
    // }
    // else{
    //   ball[i].newRadius = ball[i].radius;
    // }
    ball[i].draw(ctx);
  }
}());

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Ball(mousex, mousey) {
  this.color = getRandomColor();
  this.radius = Math.random()*50 + 15;

  this.x = (mousex == undefined ? Math.random()*canvas.width : mousex);
  this.y = (mousey == undefined ? Math.random()*(canvas.height) + this.radius : mousey);

  // console.log("(x,y) : ", this.x, this.y);

  this.newRadius = this.radius;
  var randomVal = Math.random();

  this.vx = (randomVal * 10);  // To ensure a value between 6 and 15.
  if( randomVal % 2 > 0.5)  // remainder is in the range [0,1]
    this.vx *= -1;
  this.vy = 0;

  this.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.newRadius,
      0,
      Math.PI*2,
      false
    );

    ctx.closePath();
    ctx.fill();
  }
}
