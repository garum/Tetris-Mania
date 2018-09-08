const canvas=document.getElementById("tetris-box");
const context=canvas.getContext('2d');


const boardHeight=22;
const boardWeight=10;
const nrPixel=24;

var gameBoard=creatMatrix(boardHeight,boardWeight);
context.fillStyle="#000";
context.fillRect(0,0,canvas.width,canvas.height);
context.scale(nrPixel,nrPixel);


const matrixTest=[
                    [0,0,1,0],
                    [0,0,1,0],
                    [0,0,1,0],
                    [0,0,1,0]
                ];

function creatMatrix(h,w){
    var matrix=[];
    for(var i=0;i<h;i++)
        matrix[i]=new Array(w).fill(10);
        return matrix;
}

function drawMatrix(matrix,position,color)
{
    pos=position;
    for(var i=0;i<matrix.length;i++)
        for(var j=0;j<matrix[0].length;j++)
        {
            if(matrix[i][j]==10)
                context.fillStyle='black';
            else if(matrix[i][j]==1)
                context.fillStyle=player.color;
            else if(matrix[i][j]!=0){
                context.fillStyle=matrix[i][j];
            }

            if(matrix[i][j]!=0) 
                 context.fillRect(j+pos.x,i+pos.y,1,1);
        }
}

var player={
     matrix:matrixTest,
     position:{'x':boardWeight/2,'y':0},
     color:'#FF0000'
};

function checkCollision(player,gameBoard){
    const pMatrix=player.matrix;
    const pos=player.position;

    for(var i = 0;i < pMatrix.length; i++)
        for(var j = 0; j < pMatrix[i].length; j++)
        {
           
            if(pos.y+i>=gameBoard.length || pos.x+j<0 || pos.x+j>=gameBoard[0].length ){
                if( pMatrix[i][j]==1)
                return true;
            }else
                 if(pMatrix[i][j] == 1 && (gameBoard[pos.y+i][pos.x+j] != 10))
                     return true;
        }

    return false;
}

function resetPlayer()
{
    player.position={'x':boardWeight/2,'y':0};
    key=Math.floor(Math.random()*5);
    getRandomTetrimon(key);
  
}

function playerGravity(){
    player.position.y++;
    let collided=false
    if(checkCollision(player,gameBoard)){
      player.position.y--;
      collided=true;
    }

    if(collided){
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
                gameBoard[pos.y+i][pos.x+j]=player.color;
        }
    }
}

function rotatePlayer(player,direction){

    pMatrix=player.matrix;
    var h=pMatrix.length;
    var w=pMatrix[0].length;
    buffer=creatMatrix(h,w);

    for(let i=0;i<h;i++)
        for(let j=0;j<w;j++)
            if(direction==1)
                buffer[i][j]=pMatrix[j][h-i-1];
            else
                 buffer[i][j]=pMatrix[w-j-1][i];

    player.matrix=buffer;
}

function checkRotation(player,direction,gameBoard){

    var initialPosition=player.position
    let offset=1;
    rotatePlayer(player,direction);

    while(checkCollision(player,gameBoard)){
        player.position.x+=offset;
        
        if(offset>0)
            offset=-offset-1;
        else offset=-offset+1;

        if(offset > player.matrix.length) {
            rotatePlayer(player,-direction);
            player.position=initialPosition;
            return;
        }
    }
}

function removeRow(gameBoard,row){

    gameBoard[row]=new Array(boardWeight).fill(10);
    for(let i=row;i>=1;i--){
        for(let j=0;j<gameBoard[0].length;j++){
            gameBoard[i][j]=gameBoard[i-1][j];

        }
    }    
        
}

function lineSweep(gameBoard){  

    for(let i=gameBoard.length-1; i>=0;i--){
        var full=true;
        for(let j=0;j<gameBoard[0].length;j++) {
            if(gameBoard[i][j]==10)
                full=false;
        }

        if(full){
            removeRow(gameBoard,i);
        }
    }
            
}
var tick=0;

function update(){
    tick++;
    if(tick>13){
        // update  movement of the player
        playerGravity();
        lineSweep(gameBoard);
        tick=0;
    }
    // Render gameBoard and the player 
   drawMatrix(gameBoard,{'x':0,'y':0},player.color); 
   drawMatrix(player.matrix,player.position,player.color);
   window.requestAnimationFrame(update);
}

document.addEventListener("keydown",event => {
        if(event.keyCode==40)
            playerGravity();
        if(event.keyCode==37)
            playerMove(-1);
        if(event.keyCode==39)
            playerMove(1);
        if(event.keyCode==65)
            checkRotation(player,1,gameBoard);
        if(event.keyCode==68)
            checkRotation(player,-1,gameBoard);
});

function getRandomTetrimon(key){
    if(key==0){
        player.matrix=[
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0]
        ];
        player.color='#FF0000';
    }
    if(key==1){
        player.matrix=[
            [0,0,1],
            [0,0,1],
            [0,1,1]
        ];
        player.color='#EFFF00';
    }
    if(key==2){
        player.matrix=[
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ];
        player.color='#009999';
    }
    if(key==3){
        player.matrix=[
            [0,0,0],
            [0,1,1],
            [1,1,0]
        ];
        player.color='#89FF00';
    }
    if(key==4){
        player.matrix=[
           [1,1],
           [1,1]
        ];
        player.color='#6600CC';
        
    }

}


update();

