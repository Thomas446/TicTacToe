let board = new Array(9);
board.fill('z');
let player = 'x';
let gameOver = false;
let AIGame = true;

// creates canvas
function setup(){
	createCanvas(96,96);
	noLoop();
}
// draws
function draw(){	
	drawBoard(board);
	var winner = evaluateBoard(board);
	if(winner == 1){
		console.log("X wins");
		gameOver = true;
	}
	else if(winner == -1){
		console.log("O wins");
		gameOver = true;
	}
}
// does the optimal move
function AIMove(){
	var move = miniMax(board, player, true)[0];
	if(checkValid(board,move)){
		board = makeMove(board, move,player);
		player = changeTurn(player);
		redraw();
	}	
}
// recursively evaluates the position (doesn't make a move yet)
function miniMax(tempBoard, currPlayer, topLayer){
	var evals = [];
	if(boardFilled(tempBoard) || evaluateBoard(tempBoard) != 0){
		return evaluateBoard(tempBoard);
	}else{
		for(var i = 0; i < tempBoard.length; i++){
			if(checkValid(tempBoard,i)){
				evals.push([i, miniMax(makeMove(tempBoard, i, currPlayer), changeTurn(currPlayer), false)]);
			}
		}
			return maximizeForPlayer(currPlayer, evals, topLayer);
			
	}
}

// takes array of [index, eval] pairs and returns best;
function maximizeForPlayer(currPlayer, evals, topLayer){
	if(currPlayer == 'x'){
		var best = -.1;
		var index = 0;
		for(var i = 0; i < evals.length; i++){
			if(evals[i][1] > best){
				best = evals[i][1];
				index = i;
			}
		}
	}else if(currPlayer == 'o'){
		var best = .1;
		var index = 0;
		for(var i = 0; i < evals.length; i++){
			if(evals[i][1] < best){
				best = evals[i][1];
				index = i;
			}
		}
	}
	if(topLayer)
		return evals[index];
	else
		return evals[index][1];
}
// click handler
function mouseClicked(){
	for(var i = 0; i < board.length; i++){
		var centerX = (width/3)*(.5 + indexToCoords(i)[0]);
		var centerY = (height/3)*(.5 + indexToCoords(i)[1]);
		if(mouseX  < centerX + 15 && mouseX > centerX < 15 && mouseY < centerY + 15 && mouseY > centerY - 15){
			if(checkValid(board, i, player)){
			board = makeMove(board, i, player);
			player = changeTurn(player);
			redraw();
			if(AIGame){
				setTimeout(function() {AIMove();}, 1000);
			}
			break;
			}
		}
	}
}
// checks if someone has won (board is filled with z by default)
function evaluateBoard(tempBoard){
	var winningPlayer = 'z';
	for(var i = 0; i < tempBoard.length/3; i++){
		if(tempBoard[coordsToIndex(0,i)] == tempBoard[coordsToIndex(1,i)] && tempBoard[coordsToIndex(0,i)] == tempBoard[coordsToIndex(2,i)] && winningPlayer == 'z'){
			winningPlayer = tempBoard[coordsToIndex(0,i)];
		}
	}
	
	for(var i = 0; i < tempBoard.length/3; i++){
		if(tempBoard[coordsToIndex(i,0)] == tempBoard[coordsToIndex(i,1)] && tempBoard[coordsToIndex(i,0)] == tempBoard[coordsToIndex(i,2)] && winningPlayer == 'z'){
			winningPlayer = tempBoard[coordsToIndex(i,0)];
		}
	}
	
	if(tempBoard[0] == tempBoard[4] && tempBoard[0] == tempBoard[8] && winningPlayer == 'z'){
		winningPlayer = tempBoard[4];
	}
	if(tempBoard[2] == tempBoard[4] && tempBoard[2] == tempBoard[6] && winningPlayer == 'z'){
		winningPlayer = tempBoard[4];
	}
	if(winningPlayer == 'o')
		return -1;
	else if(winningPlayer == 'x')
		return 1;
	else
		return 0;
		
}
// checks for a tie
function boardFilled(tempBoard){
	var filled = true;
	for(var i = 0; i < tempBoard.length; i++){
		if(tempBoard[i] == 'z'){
			filled = false;
			break;
		}
	}
	return filled;
}
// turns x y coordinates into an index
function coordsToIndex(x, y){
	return y*3 + x;
}

// returns the player for the next turn
function changeTurn(currPlayer){
	if (currPlayer == 'x')
		return 'o';
	else
		return 'x';
}
// turns an index into x,y coordinates
function indexToCoords(index){
	return [index%3, Math.floor(index/3)];
}

// returns a board with the move by player at index
function makeMove(tempBoard, index, currPlayer){
	var currBoard = tempBoard.slice();
	currBoard[index] = currPlayer;
	return currBoard;
}

//checks if moving at index would be valid
function checkValid(tempBoard, index){
	if(tempBoard[index] != 'o' && tempBoard[index] != 'x' && !gameOver)
		return true;
	return false;
}

//draws the board
function drawBoard(tempBoard){
	line(64, 0,64,96);
	line(32, 0 , 32, 96 );
	
	line(0, 32, 96, 32);
	line(0, 64, 96, 64);
	
	for(var i = 0; i < tempBoard.length; i++){
		if(tempBoard[i] == 'x'){
			drawX(i);
		}else if(tempBoard[i] == 'o'){
			drawO(i);
		}
	}
	
}
// draws Xs
function drawX(index){
	var centerX;
	var centerY;
	
	centerX = (width/3)*(.5 + indexToCoords(index)[0]);
	centerY = (height/3)*(.5 + indexToCoords(index)[1]);
	line(centerX - (width/6) * .75, centerY - (height/6) * .75, centerX + (width/6) * .75, centerY + (height/6) * .75);
	line(centerX + (width/6) * .75, centerY - (height/6) * .75, centerX - (width/6) * .75, centerY + (height/6) * .75);
}
// draws Os
function drawO(index){
	var centerX;
	var centerY;
	centerX = (width/3)*(.5 + indexToCoords(index)[0]);
	centerY = (height/3)*(.5 + indexToCoords(index)[1]);
	circle(centerX,centerY, (height/3) * .75);
}