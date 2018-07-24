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

var start=null;
var tick=0;
function update(timestamp=0){
    if(!start) start=timestamp;
    var progres=timestamp-start;
    if(progres<1000){
        window.requestAnimationFrame(update);
    }
    tick++;
    if(tick>10){
        player.position.y++;
        tick=0;
    }
    console.log(timestamp," ",tick, " ",progres )
    gameLoop();
}

function gameLoop(){
    context.fillStyle="#000";
    context.fillRect(0,0,cavanas.width,cavanas.height);
    drawMatrix(gameBoard,{'x':0,'y':0}); 

    drawMatrix(player.matrix,player.position);
       
}

update();
