const cavanas=document.getElementById("tetris-box");
const context=cavanas.getContext('2d');

context.fillStyle="#000";
context.fillRect(0,0,cavanas.width,cavanas.height);

const boardHeight=16;
const boardWeight=10
const nrPixel=24;
var gameBoard=creatMatrix(boardHeight,boardWeight);
context.scale(nrPixel,nrPixel);
function creatMatrix(h,w){
    var matrix=[];
    for(var i=0;i<h;i++)
        matrix[i]=new Array(w).fill(0);
        return matrix;
}

function gameLoop(){
    gameBoard[1][3]=1;
    console.table(gameBoard);
    console.log(gameBoard.length);
    drawRect();    
}

function drawRect()
{
    for(var i=0;i<gameBoard.length;i++)
        for(var j=0;j<gameBoard[0].length;j++)
        {
            context.fillStyle='red'
            if(gameBoard[i][j]!=0)
                 context.fillRect(i,j,1,1);
        }
}

gameLoop()