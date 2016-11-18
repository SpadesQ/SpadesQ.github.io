var me = true;
var over = false;
var count = 0;//第几种赢法
var chessBoard = []; /*检查落子二维数组*/
var wins = [];//赢法数组
var myWin = [];//赢法统计
var computerWin = [];
for(var i = 0;i < 15; i++ ){  /*初始化是否落子0*/
    chessBoard[i] = [];
    for(var j=0; j <15 ;j++){
        chessBoard[i][j] = 0;
    }
}
for(var i = 0;i < 15;i++){
    wins[i] = [];
    for(var j = 0;j < 15;j++){
        wins[i][j]=[];
    }
}
for(var i = 0;i < 15;i++){ //填充赢法数组165
    for(var j = 0;j < 11;j++){         //j<11是为了减去棋的点
        //wins[0][0][0]=true ,第0种赢法，中间0-4变成一条线
        //wins[0]1][0]=true
        //wins[0][2][0]=true
        //wins[0][3][0]=true
        //wins[0][4][0]=true

        //wins[0][1][1]=true ,第1种赢法，中间1-5变成一条线
        //wins[0][2][1]=true
        //wins[0][3][1]=true
        //wins[0][4][1]=true
        //wins[0][5][1]=true
        for(var k = 0;k < 5;k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
}
for(var i = 0;i < 15;i++){ //竖线165
    for(var j = 0;j < 11;j++){
        for(var k = 0;k < 5;k++){
            wins[j+k][i][count] = true;
        }
        count++;
    }
}
for(var i = 0;i < 11;i++){ //斜线121
    for(var j = 0;j < 11;j++){
        for(var k = 0;k < 5;k++){
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}
for(var i = 0;i < 11;i++){ //反斜线121
    for(var j = 14;j > 3;j--){
        for(var k = 0;k < 5;k++){
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
}


for(var i = 0;i < count; i++){
    myWin[i] = 0;
    computerWin[i] = 0;
}
var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = "#BFBFBF";

var logo = new Image();
logo.src = "img/logo.png";
logo.onload = function(){
    context.drawImage(logo, 0, 0, 450, 450); /*onload图片加载完成再drawimage*/
    drawChessBoard(); /*防止水印在棋盘上面显示，所以把棋盘封装为一个函数*/

}
var drawChessBoard = function(){
    for(var i=0;i<15;i++){
        context.moveTo(15 + i*30, 15);
        context.lineTo(15 + i*30, 435);
        context.stroke();
        context.moveTo(15, 15 + i*30);
        context.lineTo(435, 15 + i*30);
        context.stroke();
    }
}
var oneStep = function(i, j, me){
    var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13, 15 + i*30 + 2, 15 + j*30 - 2, 0); /*外面圆到里面圆渐变,圆心坐标和半径*/
    if(me){
        gradient.addColorStop(0, "#0A0A0A");  /*0-1百分比*/
        gradient.addColorStop(1, "#636766");
    } else{
        gradient.addColorStop(0, "#D1D1D1");  /*0-1百分比*/
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.beginPath();
    context.fillStyle = gradient;
    context.arc(15 + i*30, 15 + j*30, 13, 0, Math.PI * 2);
    context.closePath();
    context.fill();

}
document.getElementById("restart").onclick = function(){
window.location.reload();
}
chess.onclick = function (e) {
    if(over){
        return;
    }
    if(!me){
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if(chessBoard[i][j] == 0){
        oneStep(i ,j ,me);
        chessBoard[i][j] = 1;
        for(var k = 0;k <count ;k++){
            if(wins[i][j][k]){
                myWin[k]++;
                computerWin[k] = 6;
                if(myWin[k] ==5){
                    window.alert("you win！");
                    over = true;
                }
            }
        }
        if(!over){
            me = !me;
            computerAI();
        }
    }
}
var computerAI = function () {
    var myScore = [];
    var computerScore = [];
    var max = 0;
    var u = 0, v = 0;//保存最大坐标
    for (var i = 0; i < 15; i++) {  //初始化
        myScore[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) { //遍历棋盘
        for (var j = 0; j < 15; j++) {
            if (chessBoard[i][j] == 0) {  //空闲点
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {    //分数会累加
                        if (myWin[k] == 1) {  //拦截
                            myScore[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            myScore[i][j] += 400; //拦截2颗棋价值更大
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 10000;
                        }
                        if (computerWin[k] == 1) {
                            computerScore[i][j] += 220;
                        } else if (computerWin[k] == 2) {
                            computerScore[i][j] += 420;
                        } else if (computerWin[k] == 3) {
                            computerScore[i][j] += 2100;
                        } else if (computerWin[k] == 4) {
                            computerScore[i][j] += 20000;
                        }
                    }
                }
                if(myScore[i][j] > max){
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j] == max){
                    if(computerScore[i][j]>computerScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
                if(computerScore[i][j] > max){
                    max =computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j] == max){
                    if(myScore[i][j]>myScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    oneStep(u,v,false);
    chessBoard[u][v] = 2;
    for(var k = 0;k <count ;k++){
        if(wins[u][v][k]){
           computerWin[k]++;
            myWin[k] = 6;
            if(computerWin[k] == 5){
                window.alert("computer win！");
                over = true;
            }
        }
    }
    if(!over){
        me=!me;
    }
}