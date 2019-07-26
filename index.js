let W = window.innerWidth;
let H = window.innerHeight;
let ball = [], controlsToggleHidden;

const N = 100;
let gravity = 0.3;
// let traction = 0.005;
let bounce_factor = 0.99;

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

function addToggleControls(controls, displayName, name, min, max, step, value){
  let wrapper = document.createElement('div');
  wrapper.classList.add('control-wrapper');

  let label = document.createElement('label');
  label.classList.add('control-label');
  label.setAttribute('for', 'control-'+name);
  // label.textContent = displayName + " :  " + value;
  label.textContent = displayName + " : ";

  let span = document.createElement('span');
  span.textContent = value;


  let slider = document.createElement('input');
  slider.setAttribute('type','range');
  slider.classList.add('slider');
  slider.setAttribute('id', 'control-'+name);
  slider.setAttribute('min', min);
  slider.setAttribute('max', max);
  slider.setAttribute('step', step);

  slider.value = value;

  slider.addEventListener('input', function(){
    span.textContent = slider.value;
    if(name == 'xSpeed'){
      for(let j=0; j<ball.length; j++){
        ball[j].vx = parseInt(slider.value);
        console.log(slider.value);
      }
    }
    else if(name == 'ySpeed'){
      for(let j=0; j<N; j++){
        ball[j].vy = parseInt(slider.value);
        // console.log(slider.value);
      }
    }
    else if(name == 'gravity'){
      gravity = slider.value/10;
    }
  });

  wrapper.appendChild(label);
  label.appendChild(span);
  wrapper.appendChild(slider);
  controls.appendChild(wrapper);
}

function addControls(){
  let controls = document.createElement('div');
  controls.classList.add('controls');
  document.body.appendChild(controls);

  addToggleControls(controls, 'Horizontal speed', 'xSpeed', -20, 20, 1, 5);
  addToggleControls(controls, 'Vertical speed', 'ySpeed', -20, 20, 1, 5);
  addToggleControls(controls, 'Gravity', 'gravity', 0, 20, 1, gravity*10);
}

function newBall(mousex, mousey){
  ball.push(new Ball(mousex, mousey));
  // console.log(ball.length);
}

function windowResized(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

for(let j=0; j<N; j++){
  newBall();
}

let mousex = 0;
let mousey = 0;

addEventListener("resize", windowResized);

// addEventListener("click", function(){
//   console.log("inside");
//   mousex = event.clientX;
//   mousey = event.clientY;
//   newBall(mousex, mousey);
// });

$(document).ready( function(){

  addControls();

  $(".controls").hide();
  controlsToggleHidden = true;

  $(".toggleButton").click(function(){
    if(controlsToggleHidden){
      $(".controls").show();
      controlsToggleHidden = false;
    }
    else{
      $(".controls").hide();
      controlsToggleHidden = true;
    }
  });

});


$(document).ready( function renderFrame() {

  requestAnimationFrame(renderFrame);
  ctx.clearRect(0, 0, W, H);

  // console.log(gravity);
  for(let i=0; i<ball.length; i++){

    // console.log("vx: ",ball[i].vx);
    // console.log("vy: ",ball[i].vy);

    ball[i].vy += gravity * (ball[i].radius)/50;
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

  this.newRadius = this.radius;
  let randomVal = Math.random();

  this.vx = (randomVal * 10);
  if( randomVal % 2 > 0.5)
    this.vx *= -1;

  // this.vx = -10;
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
