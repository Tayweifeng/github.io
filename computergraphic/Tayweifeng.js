function setup(){
  createCanvas(400,400);
}

function draw(){
  background(220);
  translate(width/2,height/2);
  let angle = frameCount * 0.05;
  let x = 100*cos(angle);
  let y = 100*sin(angle);
  ellipse(x,y,50,50);

}