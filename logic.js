const cavanas=document.getElementById("tetris-box");
const context=cavanas.getContext('2d');


const boardHeight=22;
const boardWeight=10
const nrPixel=24;

var gameBoard=creatMatrix(boardHeight,boardWeight);
context.scale(nrPixel,nrPixel);

const matrixTest=[
                    [0,0,0],
                    [0,1,0],
                    [1,1,1]
                ];

function creatMatrix(h,w){
    var matrix=[];
    for(var i=0;i<h;i++)
        matrix[i]=new Array(w).fill(0);
        return matrix;
}

function drawMatrix(matrix,position)
{
    for(var i=0;i<matrix.length;i++)
        for(var j=0;j<matrix[0].length;j++)
        {
            context.fillStyle='red'
            if(matrix[i][j]!=0)
                 context.fillRect(i+position.x,j+position.y,1,1);
        }
}

var player={
     matrix:matrixTest,
     position:{'x':boardWeight/2,'y':0}
};

function checkColision(player,gameBoard){
    const pMatrix=player.matrix;
    const pos=player.position;
    if(pos.y+pMatrix.length>boardHeight || pos.x<0 || pos.x+pMatrix[0].length>boardHeight)
        return true;
    for(var i = 0;i < pMatrix.length; i++)
        for(var j = 0; j < pMatrix[i].length; j++)
        {
            if(pMatrix[i][j] == 1 && gameBoard[pos.y+i][pos.x+j] == 1)
                return true;
        }

    return false;
}

function playerGravity(){
    player.position.y++;
    if(checkColision(player,gameBoard))
      player.position.y--;
}

function playerMove(direction){
    player.position.x+=direction;
    if(checkColision(player,gameBoard))
        player.position-=direction;
}

var start=null;
var tick=0;

function update(){
    

    tick++;
    if(tick>10){
        // update  movement of the player
        playerGravity();

        tick=0;
    }

    console.log(player.position, " ",checkColision(player,gameBoard));
    // Render gameBoard and the player 

   context.fillStyle="#000";
   context.fillRect(0,0,cavanas.width,cavanas.height);
   drawMatrix(gameBoard,{'x':0,'y':0}); 
   drawMatrix(player.matrix,player.position);

   window.requestAnimationFrame(update);
}


update();
