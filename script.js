
var tictacApp = angular.module('tictacApp', []);
	tictacApp.controller('TicTacController', function ($scope) {


	// var ticTacRef = new Firebase("https://tic-tac-thrones.firebaseio.com/games");

	// 		// Note that you can use multiple references if you for instance wanted to keep
	// 		// track of all the users on the system
	// 		// var usersRef = new Firebase("https://fiery-fire-8597.firebaseio.com/users");
	// 		// usersRef.push( {name:"fred"} );

	// 	$scope.newGame = function(){
	// 		// Is there a game that I can graft onto?
	// 		ticTacRef.once("value", function(data){
	// 			var games = data.val();	// Get the real objects out of the angularified blob
	// 			if(games != null)
	// 			{
	// 				console.log(games);
	// 				var keys = Object.keys(games);	// Get all the screwy text keys
	// 				var lastKey = keys[keys.length - 1];	// Find the last key
	// 				var lastGame = games[lastKey];	// Use the last key to get the last game object

	// 				if(lastGame.waiting==true)
	// 				{
	// 					// Currently someone like JoJo is waiting to play
	// 					// Find the Angular version of this game
	// 					lastGame = ticTacRef.child(lastKey);
	// 					// whoseTurn = 1 for player 1, 2 for player 2, 3 for player 1 won, 4 for player 2 won, and 5 for a draw
	// 					lastGame.set( {waiting: false, whoseTurn: 1, board:[change to be ]} );
	// 				}
	// 				else
	// 				{
	// 					// This is like when JoJo had walked up and wanted to start playing TicTacToe
	// 					ticTacRef.push( {waiting: true} );
	// 				}
	// 			}
	// 			else // I got no game :(
	// 			{
	// 				// This is like when JoJo had walked up and wanted to start playing TicTacToe
	// 				ticTacRef.push( {waiting: true} );
	// 			}

	// 		});

	// 	};


	var game = 0;
	$scope.noMessage = true;

	// $scope.newGame = function(){
			// 	game++;
			// document.getElementById("gameboard").style.display = show;
	// }

		$scope.families1 = [
			{ name: "House Stark", image: "images/stark1.jpg" },
			{ name: "House Lannister", image: "images/lannister1.jpeg" },
			{ name: "House Baratheon", image: "images/baratheon1.jpeg" },
			{ name: "House Targaryen", image: "images/targaryen1.jpeg" },
			{ name: "House Martell", image: "images/martell1.jpeg" },
			{ name: "House Greyjoy", image: "images/greyjoy1.jpeg" },
			{ name: "House Tully", image: "images/tully1.jpeg" }];


		$scope.families2 = [
			{ name: "House Stark", image: "images/stark2.jpg" },
			{ name: "House Lannister", image: "images/lannister2.jpeg" },
			{ name: "House Baratheon", image: "images/baratheon2.jpeg" },
			{ name: "House Targaryen", image: "images/targaryen2.jpeg" },
			{ name: "House Martell", image: "images/martell2.jpeg" },
			{ name: "House Greyjoy", image: "images/greyjoy2.jpeg" },
			{ name: "House Tully", image: "images/tully2.jpeg" }];

		$scope.rows = [
			[{ position: "0-0", empty: true, xo: ' ' },
			{ position: "0-1", empty: true, xo: '' },
			{ position: "0-2", empty: true, xo: ' ' } ],
			
			[{ position: "1-0", empty: true, xo: '' },
			{ position: "1-1", empty: true, xo: ' ' },
			{ position: "1-2", empty: true, xo: '' }],
						
			[{ position: "2-0", empty: true, xo: ' ' },
			{ position: "2-1", empty: true, xo: '' },
			{ position: "2-2", empty: true, xo: ' ' }]];

		var turn = 0;
		var win1 = 0;
		var win2 = 0;
		var loss1 = 0;
		var loss2 = 0;
		var tie = 0;


		$scope.player1 = {
			username: '',
			xo: '',
			wins: win1,
			ties: tie,
			losses: loss1
		};

		$scope.player2 = {
			username: '',
			xo: '',
			wins: win2,
			ties: tie,
			losses: loss2
		};



		$scope.newGame = function(){
			document.getElementById("beforegame").style.display = "none";
			document.getElementById("setusers").style.display = "block";
			document.getElementById("user1").style.display = "block";
			document.getElementById("user2").style.display = "block";
		};

		$scope.setPlayer1 = function(username, housename){
			$scope.player1.username = username;
			
			$scope.player1.xo = 'X';
			// if(game % 2 == 0){
			// 	$scope.player1.xo = 'X';
			// } else {
			// 	$scope.player1.xo = 'O';
			// }
			
			console.log($scope.player1.username);			
		};

		$scope.setPlayer2 = function(username, housename){
			$scope.player2.username = username;

			$scope.player2.xo = 'O';
			// if(game % 2 == 0){
			// 	$scope.player1.xo = 'O';
			// } else {
			// 	$scope.player1.xo = 'X';
			// }
			console.log($scope.player2.username);
			document.getElementById("setusers").style.display = "none";
			document.getElementById("duringgame").style.display = "block";
		};

		



		$scope.makeMove = function(obj){
		

			console.log(obj.position);
			
			if(obj.empty == true) {
				obj.empty = false;
				if(turn % 2 == 0) {
					obj.xo = $scope.player1.xo;
					turn += 1;
				} else {
					obj.xo = $scope.player2.xo;
					turn += 1;
				}
			} else {
				console.log("NOOOOO");
			}
		
			if(turn > 4){
				checkForWin();
			}

			function checkForWin() {
				console.log("sup homie");
				if($scope.rows[0][0].xo == $scope.rows[1][0].xo && $scope.rows[1][0].xo == $scope.rows[2][0].xo) {
					console.log("left column");
					console.log($scope.rows[0][0].xo + " wins!");
					declareWinner($scope.rows[0][0].xo);
				} else if($scope.rows[0][1].xo == $scope.rows[1][1].xo && $scope.rows[1][1].xo == $scope.rows[2][1].xo) {
					console.log("middle column");
					console.log($scope.rows[0][1].xo + " wins!");
					declareWinner($scope.rows[0][1].xo);
				} else if($scope.rows[0][2].xo == $scope.rows[1][2].xo && $scope.rows[1][2].xo == $scope.rows[2][2].xo) {
					console.log("right column");
					console.log($scope.rows[0][2].xo + " wins!");
					declareWinner($scope.rows[0][0].xo);
				} else if($scope.rows[0][0].xo == $scope.rows[0][1].xo && $scope.rows[0][1].xo == $scope.rows[0][2].xo) {
					console.log("top row");
					console.log($scope.rows[0][0].xo + " wins!");
					declareWinner($scope.rows[0][0].xo);
				} else if($scope.rows[1][0].xo == $scope.rows[1][1].xo && $scope.rows[1][1].xo == $scope.rows[1][2].xo) {
					console.log("middle row");
					console.log($scope.rows[1][0] + " wins!");
					declareWinner($scope.rows[1][0].xo);
				} else if($scope.rows[2][0].xo == $scope.rows[2][1].xo && $scope.rows[2][1].xo == $scope.rows[2][2].xo) {
					console.log("bottom row");
					console.log($scope.rows[2][0].xo + " wins!");
					declareWinner($scope.rows[2][0].xo);
				} else if($scope.rows[0][0].xo == $scope.rows[1][1].xo && $scope.rows[1][1].xo == $scope.rows[2][2].xo) {
					console.log("diagonal left");
					console.log($scope.rows[0][0].xo + " wins!");
					declareWinner($scope.rows[0][0].xo);
				} else if($scope.rows[0][2].xo == $scope.rows[1][1].xo && $scope.rows[1][1].xo == $scope.rows[2][0].xo) {
					console.log("diagonal right");
					console.log($scope.rows[0][2].xo + "wins!");
					declareWinner($scope.rows[0][2].xo);
				} else {
					declareWinner("tie");
				}

				function declareWinner(winLetter) {
					if(winLetter == 'X'){
						$scope.winner=$scope.player1.username;
						//Don't forget to set your house! Or name will show up undefined
						$scope.house=$scope.family1.name;
						$scope.noMessage = false;
						$scope.isPlayer1 = true;
						win1 ++;
						loss2 ++;
					} else if(winLetter == 'O'){
						$scope.winner=$scope.player2.username;
						$scope.house=$scope.family2.name;
						$scope.noMessage = false;
						$scope.isPlayer2 = true;
						win2 ++;
						loss1 ++;
					} else if(turn == 9 && winLetter == 'tie'){
						$scope.noMessage = false;
						$scope.isTie = true;
						console.log("check for win is a tie");
						tie ++;
					}
				}

			}

		};

	});
