let W = window.innerWidth;
let H = window.innerHeight;
let ball = []

const N = 1;
let gravity = 0.3;
// let traction = 0.005;
let bounce_factor = 1;

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

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = W;
canvas.height = H;


function newBall(mousex, mousey){
  ball.push(new Ball(mousex, mousey));
  console.log(ball.length);
}

function windowResized(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}


for(let j=0; j<N; j++){
  newBall();
}

// setInterval(function(){
//   newBall();
// }, 3000);

// let ball2 = new Ball();

let mousex = 0;
let mousey = 0;

addEventListener("resize", windowResized);

addEventListener("click", function(){
  console.log("inside");
  mousex = event.clientX;
  mousey = event.clientY;
  newBall(mousex, mousey);
})

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
      ball[i].y = ball[i].radius;
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
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
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
  let randomVal = Math.random();

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
