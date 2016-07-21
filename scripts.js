
var whosTurn = 1; //start off on player 1's turn

var winners = [
["A1", "A2", "A3"],//row A
["B1", "B2", "B3"],//row B
["C1", "C2", "C3"],//row C
["A1", "B2", "C3"],// Diag
["A1", "B1", "C1"], // Col 1
["A2", "B2", "C2"], // Col 2
["A3", "B3", "C3"], //Col 3
["A3", "B2", "C3"] //Other diag
];

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
			if ((aiActivate) && (player1.length < 5)){
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
		var moveChoice1 = Math.floor(Math.random() * 8);
		var moveChoice2 = Math.floor(Math.random() * 3);
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
			if(rowCount == 3){
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























