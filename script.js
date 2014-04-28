
var tictacApp = angular.module('tictacApp', ['firebase']);

	tictacApp.controller('TicTacController', function ($scope, $firebase) {

	

	$scope.playerNum = null;
	$scope.tieGame = 9;

	var tictacRef = new Firebase("https://tic-tac-thrones2.firebaseio.com/games");


		
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
							wins: 0,
							ties: 0,
							losses: 0 } 
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
							wins: 0,
							ties: 0,
							losses: 0 },
						winner: '',
						house:'',
						gameNum: 1
					});

				} else {
					lastGame = tictacRef.push(
						{waiting: true,
						turn: 0,
						gameState: 0,
						player1: {
							username: '',
							xo: '',
							wins: 0,
							ties: 0,
							losses: 0 } }
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
			{ name: "House Stark", image: "images/stark1.jpg" },
			{ name: "House Lannister", image: "images/lannister1.jpg" },
			{ name: "House Baratheon", image: "images/baratheon1.jpg" },
			{ name: "House Targaryen", image: "images/targaryen1.jpg" },
			{ name: "House Arryn", image: "images/arryn1.jpg"},
			{ name: "House Tyrell", image:"images/tyrell1.jpg"},
			{ name: "House Martell", image: "images/martell1.jpg" },
			{ name: "House Greyjoy", image: "images/greyjoy1.jpg" },
			{ name: "House Tully", image: "images/tully1.jpg" }];

		$scope.setPlayer1 = function(username, housename, houseimage){
			$scope.game.player1.username = username;
			$scope.game.player1.xo = 'X';
			$scope.game.player1.house = housename;
			$scope.game.player1.houseimage = houseimage;

			$scope.game.gameState = 2;
			$scope.game.$save();
		};

		$scope.setPlayer2 = function(username, housename, houseimage){
			$scope.game.player2.username = username;
			$scope.game.player2.xo = 'O';
			$scope.game.player2.house = housename;
			$scope.game.player2.houseimage = houseimage;

			$scope.game.gameState = 3;
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
					declareWinner($scope.game.rows[0][0].xo);
				} else if($scope.game.rows[0][1].xo == $scope.game.rows[1][1].xo && $scope.game.rows[1][1].xo == $scope.game.rows[2][1].xo) {
					console.log("middle column");
					declareWinner($scope.game.rows[0][1].xo);
				} else if($scope.game.rows[0][2].xo == $scope.game.rows[1][2].xo && $scope.game.rows[1][2].xo == $scope.game.rows[2][2].xo) {
					console.log("right column");
					declareWinner($scope.game.rows[0][0].xo);
				} else if($scope.game.rows[0][0].xo == $scope.game.rows[0][1].xo && $scope.game.rows[0][1].xo == $scope.game.rows[0][2].xo) {
					console.log("top row");
					declareWinner($scope.game.rows[0][0].xo);
				} else if($scope.game.rows[1][0].xo == $scope.game.rows[1][1].xo && $scope.game.rows[1][1].xo == $scope.game.rows[1][2].xo) {
					console.log("middle row");
					declareWinner($scope.game.rows[1][0].xo);
				} else if($scope.game.rows[2][0].xo == $scope.game.rows[2][1].xo && $scope.game.rows[2][1].xo == $scope.game.rows[2][2].xo) {
					console.log("bottom row");
					declareWinner($scope.game.rows[2][0].xo);
				} else if($scope.game.rows[0][0].xo == $scope.game.rows[1][1].xo && $scope.game.rows[1][1].xo == $scope.game.rows[2][2].xo) {
					console.log("diagonal left");
					declareWinner($scope.game.rows[0][0].xo);
				} else if($scope.game.rows[0][2].xo == $scope.game.rows[1][1].xo && $scope.game.rows[1][1].xo == $scope.game.rows[2][0].xo) {
					console.log("diagonal right");
					declareWinner($scope.game.rows[0][2].xo);
				} else {
					declareWinner("tie");
				}

				function declareWinner(winLetter) {
					

					if(winLetter == 'X'){
						$scope.game.winner= $scope.game.player1.username;
						$scope.game.house= $scope.game.player1.house;
						$scope.game.player1.wins += 1;
						$scope.game.player2.losses += 1;
						$scope.game.gameState = 4;
					} else if(winLetter == 'O'){
						$scope.game.winner=$scope.game.player2.username;
						$scope.game.house=$scope.game.player2.house;
						$scope.game.player2.wins += 1;
						$scope.game.player1.losses += 1;
						$scope.game.gameState = 4;
					} else if($scope.game.turn == $scope.tieGame && winLetter == 'tie'){
						$scope.game.player1.ties += 1;
						$scope.game.player2.ties +=1;
						$scope.game.gameState = 5;
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
			
			if($scope.game.gameNum % 2 != 0){
				$scope.game.turn = 1;
				$scope.tieGame = 10;
			} else {
				$scope.game.turn = 0;
				$scope.tieGame = 9;
			}
			
			
			$scope.game.gameState = 3;
			$scope.game.gameNum ++;
			$scope.game.$save();
		}
	


	});
