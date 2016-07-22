

//N Size Version
var whosTurn = 1; //start off on player 1's turn

var alph = ['a','b','c','d','e','f','g','h','i'];
var winners = [];
var gridSize = 7;

// a0,a1,a2,a3,a4,...aN
// b0,b1,b2,b3,b4,...bN

var diag1 = [];
var diag2 = [];


for (var i = 0; i < gridSize; i++){
	diag1.push(alph[i] + i);
	diag2.push(alph[i] + ((gridSize - 1) - i));
	var winnersInsideH = [];
	var winnersInsideV= [];
	for (var j = 0; j < gridSize; j++){
		//Vertical Winners
		winnersInsideV.push(alph[j] + i);
		//Horizontal Winners
		winnersInsideH.push(alph[i] + j);	
	}
	winners.push(winnersInsideH);
	winners.push(winnersInsideV);
}

winners.push(diag1);
winners.push(diag2);
console.log(diag1);
console.log(diag2);

// 1. Build a winners array
// 2. We need to populate the board
var htmlForTheBoard = "";
var boxWidth = (100/gridSize) - (gridSize - 1);
var marginWidth = gridSize;
var inLineStyle1 = 
for (var i = 0; i < gridSize; i++){
	htmlForTheBoard += '<div class="board-row">';
		for(var j = 0;j<gridSize; j++){
			if (j === 0){
				htmlForTheBoard += '<button id="' + alph[i] + j + '" class="box" style="width: ' +boxWidth+'%; margin-left: 0" onClick="markSquare(this)">-</button>';
			}else{
				htmlForTheBoard += '<button id="' + alph[i] + j + '" class="box" style="width: ' +boxWidth+'%; margin-left: ' + marginWidth + '%" onClick="markSquare(this)">-</button>';
			}

		}
	htmlForTheBoard += '</div>';
}

document.getElementsByClassName('game-wrapper')[0].innerHTML = htmlForTheBoard;

var aiActivate = false;
var player1 = []; // Array were we will stash 
var player2 = [];
var someoneWon = false;

function play1Player(){
	aiActivate = true;
}

function markSquare(square) {

	if(someoneWon){
		console.log("Someone already won");
	}

	// Check to see if this square is in either player array. If so, goodbye.
	else if((player1.indexOf(square.id) == -1) //Look in player1 array for this 
	 && (player2.indexOf(square.id) == -1)){ // Look in player2 array
	 		//If BOTH 
		if(whosTurn == 1){
			square.innerHTML = 'X';
			whosTurn = 2;
			player1.push(square.id);
			checkWin(player1, 1);
			if ((aiActivate) && (player1.length < 13)){
				makeAiMove(aiMove());
				// square.innerHTML = 'O';
				whosTurn = 1;
				player2.push(aiMove().id);
				checkWin(player2, 2);
			}
		}else{
			square.innerHTML = 'O';
			whosTurn = 1;
			player2.push(square.id);
			checkWin(player2, 2);
		}
		console.dir(square.id);
		console.log(player1);
		}else{
		console.log("Something's already there!! No cheating!!");
	}
}

function aiMove(){
	
	function getMove(){
		var moveChoice1 = Math.floor(Math.random() * 12);
		var moveChoice2 = Math.floor(Math.random() * gridSize);
		var move = winners[moveChoice1][moveChoice2];

		return move;

	}
	var validMove = false;
	var attemptedMove;

	while (validMove === false) {

		var attemptedMove = getMove();
		if ((player1.indexOf(attemptedMove) == -1) && (player2.indexOf(attemptedMove) == -1)) {
			validMove = true;
		}
	}

	if (validMove){
		return attemptedMove;
	}

}
		


function checkWin(currentPlayersSquares, whoJustMarked){
	var rowCount = 0;
	//Loop through the outer array
	for (var i = 0; i < winners.length; i++){
		//Loop through each row (inner array)
		rowCount = 0;
		for (var j = 0; j < winners[i].length; j++){
			if(currentPlayersSquares.indexOf(winners[i][j]) > -1) {
				//HIT!
				rowCount++;
			}
			if(rowCount == gridSize){
				//BINGO!!!!
				gameOver(whoJustMarked, winners[i]);
			}
		}
	}
}


function gameOver(whoWon, winningCombo){
	var message = document.getElementById('message');
	message.innerHTML = "Congratulations to player " + whoWon + ". You won with " + winningCombo.join(', ');
	for(var i = 0; i < winningCombo.length; i++) {
		document.getElementById(winningCombo[i]).className += ' winner';
	}
	someoneWon = true;
}

function makeAiMove(aiMove){
	var buttonGrab = document.getElementById(aiMove);
	buttonGrab.click();
}























