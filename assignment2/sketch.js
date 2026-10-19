
function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100, 100); // 알록달록한 색상 제어를 위해 HSB 모드 사용
  noLoop(); // 마우스 클릭 시에만 다시 그리도록 설정
}

function draw() {
  // 1. 따뜻한 한지 느낌의 배경
  background(40, 15, 95);

  // 2. 나무 쟁반 그리기
  drawPlate();

  // 3. 송편을 무작위로 여러 개 배치하기
  let numSongpyeon = floor(random(7, 13)); // 쟁반 위에 올려놓을 송편 개수

  for (let i = 0; i < numSongpyeon; i++) {
    // [과제 필수 조건] random() 변수 3개 이상 정의
    let posX = width / 2 + random(-100, 100);       // 변수 1: 쟁반 내부 X 위치
    let posY = height / 2 + random(-100, 100);      // 변수 2: 쟁반 내부 Y 위치
    let songSize = random(45, 65);                  // 변수 3: 송편 크기
    let songAngle = random(TWO_PI);                 // 변수 4: 송편 회전 각도
    
    // 송편 대표 색상 무작위 선택 (쑥색, 단호박색, 자색고구마색, 백미)
    let colorType = floor(random(4)); 
    
    // 송편 그리기 함수 호출
    drawSingleSongpyeon(posX, posY, songSize, songAngle, colorType);
  }

 
}

//쟁반 만들기
function drawPlate() {
  push();
  translate(width / 2, height / 2);

  // 쟁반 그림자
  fill(0, 0, 0, 15);
  noStroke();
  ellipse(10, 15, 360, 360);

  // 쟁반 테두리 (나무 질감 톤)
  fill(25, 60, 45);
  ellipse(0, 0, 360, 360);

  fill(25, 50, 60);
  ellipse(0, 0, 340, 340);

  // 쟁반 안쪽 바닥
  fill(30, 35, 80);
  ellipse(0, 0, 320, 320);

 
  pop();
}

//송편 그리기
function drawSingleSongpyeon(x, y, sz, angle, colorType) {
  push();
  translate(x, y);
  rotate(angle);

  // HSB 색상 무작위 채색
  let h, s, b;
  if (colorType === 0) {       // 쑥 송편 (초록)
    h = random(110, 140); s = random(50, 80); b = random(40, 60);
  } else if (colorType === 1) { // 단호박 송편 (노랑)
    h = random(40, 55);   s = random(70, 90); b = random(85, 100);
  } else if (colorType === 2) { // 자색고구마 송편 (보라)
    h = random(280, 310); s = random(40, 65); b = random(60, 80);
  } else {                      // 백미 송편 (흰색)
    h = random(35, 45);   s = random(5, 15);  b = random(90, 98);
  }

  // 송편 그림자
  noStroke();
  fill(0, 0, 0, 20);
  ellipse(0, sz * 0.3, sz * 1.1, sz * 0.5);

  // 송편 몸통 (반달 모양 베지에 곡선)
  fill(h, s, b);
  stroke(h, s + 10, b - 15);
  strokeWeight(1.5);

  beginShape();
  vertex(-sz * 0.6, 0);
  // 위쪽 넙적한 곡선
  bezierVertex(-sz * 0.3, -sz * 0.6, sz * 0.3, -sz * 0.6, sz * 0.6, 0);
  // 아래쪽 통통한 곡선
  bezierVertex(sz * 0.3, sz * 0.5, -sz * 0.3, sz * 0.5, -sz * 0.6, 0);
  endShape(CLOSE);

  // 송편 손가락 자국/주름 표현
  noFill();
  stroke(h, s + 15, b - 20, 50);
  strokeWeight(2);
  arc(0, -sz * 0.1, sz * 0.6, sz * 0.3, PI, TWO_PI);

  
  // 깨 뿌리기
  fill(20, 80, 30);
  for (let k = 0; k < 3; k++) {
    ellipse(random(-sz * 0.2, sz * 0.2), random(-sz * 0.2, 0), 2, 3);
  }

  pop();
}


function mousePressed() {
  redraw(); // 클릭 시 draw() 함수를 다시 실행하여 송편을 새로 배치함
}