
var tictacApp = angular.module('tictacApp', ['firebase']);

	tictacApp.controller('TicTacController', function ($scope, $firebase) {

	var game = 0;
	var win1 = 0;
	var win2 = 0;
	var loss1 = 0;
	var loss2 = 0;
	var tie = 0;
	$scope.noMessage = true;
	$scope.playerNum = null;

	var tictacRef = new Firebase("https://tic-tac-thrones.firebaseio.com/games");


		
 			var lastGame;

 			tictacRef.once("value", function(data){
		
 		 	var games = data.val();
			if(games == null) {
				lastGame = tictacRef.push({
					waiting: true,
					gameState: 0,
					turn: 0,
					player1: {
							username: '',
							xo: '',
							house: '',
							houseimage: '',
							wins: win1,
							ties: tie,
							losses: loss1 } 
						});
				$scope.playerNum = 1;
					
			} else {
				var keys = Object.keys(games);
				var lastKey = keys[keys.length - 1];
				var lastGame = games[lastKey];
				$scope.playerNum = 2;

				console.log(lastKey);
				
				
				if(lastGame.waiting == true) {
					lastGame = tictacRef.child(lastKey);
					lastGame.update(
						{waiting: false,
						rows:[[{ position: "0-0", empty: true, xo: ' '},
							{ position: "0-1", empty: true, xo: '' },
							{ position: "0-2", empty: true, xo: ' '} ],
							
							[{ position: "1-0", empty: true, xo: ''},
							{ position: "1-1", empty: true, xo: ' '},
							{ position: "1-2", empty: true, xo: ''}],
										
							[{ position: "2-0", empty: true, xo: ' '},
							{ position: "2-1", empty: true, xo: ''},
							{ position: "2-2", empty: true, xo: ' '}]],	
					
						player2: {
							username: '',
							xo: '',
							house: '',
							houseimage: '',
							wins: win2,
							ties: tie,
							losses: loss2 },
					});

				} else {
					lastGame = tictacRef.push(
						{waiting: true,
						turn: 0,
						gameState: 0,
						player1: {
							username: '',
							xo: '',
							wins: win1,
							ties: tie,
							losses: loss1 } }
				);
					$scope.playerNum = 1;				
			
					//document.getElementById("user1message").style.display = "block";
					// document.getElementById("setusers").style.display = "block";
				}
			}
			$scope.game = $firebase(lastGame);

		});

		$scope.startGame = function(){
			$scope.game.gameState = 1;
			$scope.game.$save();
		};

		$scope.families1 = [
			{ name: "House Stark", image: "images/stark1.jpg" },
			{ name: "House Lannister", image: "images/lannister1.jpg" },
			{ name: "House Baratheon", image: "images/baratheon1.jpg" },
			{ name: "House Targaryen", image: "images/targaryen1.jpg" },
			{ name: "House Arryn", image: "images/arryn1.jpg"},
			{ name: "House Tyrell", image:"images/tyrell1.jpg"},
			{ name: "House Martell", image: "images/martell1.jpg" },
			{ name: "House Greyjoy", image: "images/greyjoy1.jpg" },
			{ name: "House Tully", image: "images/tully1.jpg" }];


		$scope.families2 = [
			{ name: "House Stark", image: "images/stark2.jpg" },
			{ name: "House Lannister", image: "images/lannister2.jpeg" },
			{ name: "House Baratheon", image: "images/baratheon2.jpeg" },
			{ name: "House Targaryen", image: "images/targaryen2.jpeg" },
			{ name: "House Arryn", image: "images/arryn1.jpg"},
			{ name: "House Tyrell", image:"images/tyrell1.jpg"},
			{ name: "House Martell", image: "images/martell2.jpeg" },
			{ name: "House Greyjoy", image: "images/greyjoy2.jpeg" },
			{ name: "House Tully", image: "images/tully2.jpeg" }];

		$scope.setPlayer1 = function(username, housename, houseimage){
			$scope.game.player1.username = username;
			$scope.game.player1.xo = 'X';
			$scope.game.player1.house = housename;
			$scope.game.player1.houseimage = houseimage;
			console.log($scope.game.player1.username);
			console.log($scope.game.player1.xo);
			console.log($scope.game.player1.house);
			$scope.game.gameState = 2;
			$scope.game.$save();
		};

		$scope.setPlayer2 = function(username, housename, houseimage){
			$scope.game.player2.username = username;
			$scope.game.player2.xo = 'O';
			$scope.game.player2.house = housename;
			$scope.game.player2.houseimage = houseimage;
			console.log($scope.game.player2.username);
			$scope.game.gameState = 3;
			
			// document.getElementById("duringgame").style.display = "block";
			// document.getElementById("setusers").style.display = "none";	
			$scope.game.$save();
		};

		
		

		$scope.makeMove = function(obj){
		

			console.log(obj.position);
			
			if(obj.empty == true) {
				obj.empty = false;
				if($scope.game.turn % 2 == 0) {
					obj.xo = $scope.game.player1.xo;
					$scope.game.turn++;
				} else {
					obj.xo = $scope.game.player2.xo;
					$scope.game.turn++;
				}
			} else {
				console.log("NOOOOO");
			}
		
			if($scope.game.turn > 4){
				checkForWin();
			}
			$scope.game.$save();

			function checkForWin() {
				if($scope.game.rows[0][0].xo == $scope.game.rows[1][0].xo && $scope.game.rows[1][0].xo == $scope.game.rows[2][0].xo) {
					console.log("left column");
					console.log($scope.game.rows[0][0].xo + " wins!");
					declareWinner($scope.game.rows[0][0].xo);
				} else if($scope.game.rows[0][1].xo == $scope.game.rows[1][1].xo && $scope.game.rows[1][1].xo == $scope.game.rows[2][1].xo) {
					console.log("middle column");
					console.log($scope.game.rows[0][1].xo + " wins!");
					declareWinner($scope.game.rows[0][1].xo);
				} else if($scope.game.rows[0][2].xo == $scope.game.rows[1][2].xo && $scope.game.rows[1][2].xo == $scope.game.rows[2][2].xo) {
					console.log("right column");
					console.log($scope.game.rows[0][2].xo + " wins!");
					declareWinner($scope.game.rows[0][0].xo);
				} else if($scope.game.rows[0][0].xo == $scope.game.rows[0][1].xo && $scope.game.rows[0][1].xo == $scope.game.rows[0][2].xo) {
					console.log("top row");
					console.log($scope.game.rows[0][0].xo + " wins!");
					declareWinner($scope.game.rows[0][0].xo);
				} else if($scope.game.rows[1][0].xo == $scope.game.rows[1][1].xo && $scope.game.rows[1][1].xo == $scope.game.rows[1][2].xo) {
					console.log("middle row");
					console.log($scope.game.rows[1][0] + " wins!");
					declareWinner($scope.game.rows[1][0].xo);
				} else if($scope.game.rows[2][0].xo == $scope.game.rows[2][1].xo && $scope.game.rows[2][1].xo == $scope.game.rows[2][2].xo) {
					console.log("bottom row");
					console.log($scope.game.rows[2][0].xo + " wins!");
					declareWinner($scope.game.rows[2][0].xo);
				} else if($scope.game.rows[0][0].xo == $scope.game.rows[1][1].xo && $scope.game.rows[1][1].xo == $scope.game.rows[2][2].xo) {
					console.log("diagonal left");
					console.log($scope.game.rows[0][0].xo + " wins!");
					declareWinner($scope.game.rows[0][0].xo);
				} else if($scope.game.rows[0][2].xo == $scope.game.rows[1][1].xo && $scope.game.rows[1][1].xo == $scope.game.rows[2][0].xo) {
					console.log("diagonal right");
					console.log($scope.game.rows[0][2].xo + "wins!");
					declareWinner($scope.game.rows[0][2].xo);
				} else {
					declareWinner("tie");
				}

				function declareWinner(winLetter) {
					$scope.game.gameState = 4;

					if(winLetter == 'X'){
						$scope.winner= $scope.game.player1.username;
						//Don't forget to set your house! Or name will show up undefined
						$scope.house= $scope.game.player1.house;
						$scope.noMessage = false;
						$scope.isPlayer1 = true;
						win1 ++;
						loss2 ++;
					} else if(winLetter == 'O'){
						$scope.winner=$scope.game.player2.username;
						$scope.house=$scope.game.player2.house;
						$scope.noMessage = false;
						$scope.isPlayer2 = true;
						win2 ++;
						loss1 ++;
					} else if($scope.game.turn == 9 && winLetter == 'tie'){
						$scope.noMessage = false;
						$scope.isTie = true;
						console.log("check for win is a tie");
						tie ++;
					}
					$scope.game.$save();
				}
				$scope.game.$save();
			}

		};

		$scope.restartGame = function(){
			$scope.game.rows[0][0].xo = '';
			$scope.game.rows[0][0].empty = true;
			$scope.game.rows[0][1].xo = ' ';
			$scope.game.rows[0][1].empty = true;
			$scope.game.rows[0][2].xo = '';
			$scope.game.rows[0][2].empty = true;
			$scope.game.rows[1][0].xo = ' ';
			$scope.game.rows[1][0].empty = true;
			$scope.game.rows[1][1].xo = '';
			$scope.game.rows[1][1].empty = true;
			$scope.game.rows[1][2].xo = ' ';
			$scope.game.rows[1][2].empty = true;
			$scope.game.rows[2][0].xo = '';
			$scope.game.rows[2][0].empty = true;
			$scope.game.rows[2][1].xo = ' ';
			$scope.game.rows[2][1].empty = true;
			$scope.game.rows[2][2].xo = '';
			$scope.game.rows[2][2].empty = true;
			
			$scope.game.turn = 1;
			$scope.game.gameState = 3;
			game ++;
			$scope.game.$save();
		}
	


	});
