// array of objects
let stickArray = [];

// distance between sticks
let stickDist = 100;



function setup() {
  createCanvas(windowWidth,windowHeight)
  background('black');
  angleMode(RADIANS);
  rectMode(CENTER);

  // how many sticks in a row?
  stickCol = Math.round(width/stickDist);
  // how many sticks in a column?
  stickRow = Math.round(height/stickDist);

  // --- STICK INSTANCES
  // iterate through the columns and rows
  for (let yi = 0; yi < stickRow; yi++) {
    for (let xi = 0; xi < stickCol; xi++) {

        // new stick instance
        let stickTmp = new Stick((xi * stickDist), (yi * stickDist));

        // pushing the created object into the array
        stickArray.push(stickTmp);

    }
  }
}


function draw() {
    background('black');

    // iterate through all the array objects
    for (let i = 0; i < stickArray.length ; i++) {
        push();
        stickArray[i].behave();
        stickArray[i].display();
        pop();
    }
}


function Stick(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.a = 0;
  this.b = 0;
  this.h = 100;
  this.w = 0;
  // this.w = 1;

  this.behave = function(){
      // change the angle according to mouse pos
      // this.a = atan2(mouseY - height / 2, mouseX - width / 2);
      // this.a = noise(frameCount/100)*10;
      this.a += 0.01;
      if (mouseIsPressed){
        if (mouseX > this.x - stickDist && mouseX < this.x + stickDist && mouseY > this.y - stickDist && mouseY < this.y + stickDist) {
            this.a = atan2(mouseY - height / 2, mouseX - width / 2);
        }
      }
      // change the stroke weight according to softened mouse distance fromt the stick
      // this.w = this.w * (sqrt((_x^2 + mouseX^2) - (_y^2 + mouseY^2))) / 10;
  }

  this.display = function(){
      push();
      translate(this.x,this.y);
      // console.log(this.x);
      // console.log(this.y);
      rotate(this.a);
      fill(0);
      stroke(255);
      strokeWeight(mouseY/10);
      rect(0,0,this.b,this.h);
      pop();
  }


}
