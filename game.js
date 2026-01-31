import {Canvas, Sprite, Input} from "./2d.js";

// CANVAS
const gameCanvas = new Canvas("canvas", 500, 500);
//const gameCanvas2 = new Canvas("canvas2", 500, 325);

// SPRITES
const playerImg = new Image(); playerImg.src = "TestPlayer.png";
const enemyImg = new Image(); enemyImg.src = "TestEnemy.png";
const player = new Sprite(gameCanvas, playerImg, 10, 10, 100, 50);
player.isAnchorCentered = true;
const enemy = new Sprite(gameCanvas, enemyImg, 400, 400)

enemy.setSize(50, 50);
enemy.setPos(300, 100);

let speedX = 0, speedY = 0;
// GAME LOOP
function update(){
    gameCanvas.clear();
    //gameCanvas2.clear();
    player.draw();
    enemy.draw();

    //enemy.moveToDestination(player.getPos(), 1);
    player.changePos(speedX, speedY);
    enemy.moveToDestination(player.getPos(), 1);

    playerController();
    requestAnimationFrame(update);
} update();


function playerController(){
    if(Input.keyDown("w", "ArrowUp") && !Input.keyDown("s", "ArrowDown")){
        speedY = -3;
    }else speedY*=0.98;

    if(Input.keyDown("s", "ArrowDown") && !Input.keyDown("w", "ArrowUp")) speedY = 3;
            else speedY*=0.98;

    if(Input.keyDown("d", "ArrowRight") && !Input.keyDown("a", "ArrowLeft")) speedX = 3;
            else speedX*=0.98;

    if(Input.keyDown("a", "ArrowLeft") && !Input.keyDown("d", "ArrowRight")) speedX = -3;
            else speedX*=0.98;

    if(Input.keyDown("e")){
        player.setRotation(45);
    }
    if(Input.keyDown("q")) player.setRotation(0);
}
