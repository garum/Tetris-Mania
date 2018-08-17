const cavanas=document.getElementById("tetris-box");
const context=cavanas.getContext('2d');


const boardHeight=22;
const boardWeight=10;
const nrPixel=24;

var gameBoard=creatMatrix(boardHeight,boardWeight);
context.fillStyle="#000";
context.fillRect(0,0,cavanas.width,cavanas.height);
context.scale(nrPixel,nrPixel);


const matrixTest=[
                    [0,1,0],
                    [1,1,0],
                    [0,1,0]
                ];

function creatMatrix(h,w){
    var matrix=[];
    for(var i=0;i<h;i++)
        matrix[i]=new Array(w).fill(10);
        return matrix;
}

function drawMatrix(matrix,position)
{
    for(var i=0;i<matrix.length;i++)
        for(var j=0;j<matrix[0].length;j++)
        {
            if(matrix[i][j]==1)
                 context.fillStyle='red';
            if(matrix[i][j]==10)
                context.fillStyle='black';
            if(matrix[i][j]!=0)
                 context.fillRect(j+position.x,i+position.y,1,1);
        }
}

var player={
     matrix:matrixTest,
     position:{'x':boardWeight/2,'y':0}
};

function checkCollision(player,gameBoard){
    const pMatrix=player.matrix;
    const pos=player.position;
//  if(pos.y+pMatrix.length>boardHeight || pos.x<0 || pos.x+pMatrix[0].length>boardWeight)
      // return true


    for(var i = 0;i < pMatrix.length; i++)
        for(var j = 0; j < pMatrix[i].length; j++)
        {
           // console.log(pos.y+i, pos.x+j,(pos.y+i>=pMatrix.length || pos.x+j<0 || pos.x+j>=pMatrix[i].length));
            if(pos.y+i>=gameBoard.length || pos.x+j<0 || pos.x+j>=gameBoard[0].length ){
                if( pMatrix[i][j]==1)
                return true;
            }else
                 if(pMatrix[i][j] == 1 && (gameBoard[pos.y+i][pos.x+j] == 1))
                     return true;
        }

    return false;
}

function resetPlayer()
{
    player.position={'x':boardWeight/2,'y':0};
}

function playerGravity(){
    player.position.y++;
    if(checkCollision(player,gameBoard)){
      player.position.y--;
      merge(player,gameBoard);
      resetPlayer();
    }

}

function playerMove(direction){
    player.position.x+=direction;
    if(checkCollision(player,gameBoard))
        player.position.x-=direction;
}

function merge(player,gameBoard){
    var m=player.matrix;
    var pos=player.position;
    for(var i=0;i<m.length;i++){
        for(var j=0;j<m[0].length;j++)
        {
            if(m[i][j]==1)
                gameBoard[pos.y+i][pos.x+j]=1;
        }
    }
}


var tick=0;

function update(){
    

    tick++;
    if(tick>13){
        // update  movement of the player
        playerGravity();
        tick=0;
    }

    //console.log(player.position,checkCollision(player,gameBoard));
    // Render gameBoard and the player 

   drawMatrix(gameBoard,{'x':0,'y':0}); 
   drawMatrix(player.matrix,player.position);
   window.requestAnimationFrame(update);
}

document.addEventListener("keydown",event => {
        if(event.keyCode==40)
            playerGravity();
        if(event.keyCode==37)
            playerMove(-1);
        if(event.keyCode==39)
            playerMove(1);
});

update();

