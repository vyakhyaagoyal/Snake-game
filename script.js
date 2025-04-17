//game variables and constants
let inputDir={x:0,y:0};
const foodSound=new Audio("food.mp3");
const gameOverSound=new Audio("gameover.mp3");
const moveSound=new Audio("move.mp3");
const musicSound=new Audio("music.mp3");
// const foodSound = document.getElementById('foodSound');
// const gameOverSound = document.getElementById('gameOverSound');
// const moveSound = document.getElementById('moveSound');
// const musicSound = document.getElementById('musicSound');
let score=0;

const board = document.getElementById("board");

let speed=9;
let lastPaintTime=0;        //initially
let snakeArr=[
    {x:10,y:10}     //object(head of snake/starting point)
]
food={x:13,y:14};        //not an array

//game functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed){             //lastPaintTime takes the last time when the page rendered
        return;         //divide by 1000 because it is in miliseconds
    }
    lastPaintTime=ctime;
    gameEngine();
}

function collide(snakebody){
    //snake collides with itself
    for(let i=1;i<snakeArr.length;i++){
        if(snakebody[i].x===snakebody[0].x && snakebody[i].y===snakebody[0].y){
            return true;
        }
    }  
        //if snake bumps into wall
        if(snakebody[0].x>=20 || snakebody[0].x<=0 || snakebody[0].y>=20 || snakebody[0].y<=0){
            return true;
        }
}

function gameEngine(){
    //part 1: updating snake array and food- giving it locations and all
    if(collide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game over! You lost haha. Press any key to start again");
        //Context.fillText("Game over! You lost haha. Press any key to start again", width/2, height/2);
        snakeArr=[{x:10,y:10}];
        musicSound.play();
        score=0;
    }

    //if food is eaten then increment score and regenerate food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=1;

        if(score>highScoreVal){
            highScoreVal=score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML="HighScore: "+highScoreVal;
        }

        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+ inputDir.y}) //adds new segment in starting of array when the snake eats food
        let a=1;
        let b=20;
        food={x:Math.round(a+(b-a)*Math.random()),
        y:Math.round(a+(b-a)*Math.random())}; //food will be generated at random grid points
        }  //generate food at random grid points

    //moving the snake
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]}; //snakeArr[i]'s new object is formed
        
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    //part 2: display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{           //this will be for all objects
        snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index===0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snakebody");
        }

        board.appendChild(snakeElement);
    });

    //part 3: display food
    foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}




// main function logic
let highScore=localStorage.getItem("highScore");
if(highScore===null){
    highScoreVal=0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}
else{
    highScoreVal=JSON.parse(highScore);
    highScoreBox.innerHTML="HighScore: "+highScore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    inputDir={x:0,y:1}  //start game by moving head downwards
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
})