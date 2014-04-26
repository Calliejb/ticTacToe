
var tictacApp = angular.module('tictacApp', ['firebase']);

	tictacApp.controller('TicTacController', function ($scope, $firebase) {

	var game = 0;
	var turn = 0;
	var win1 = 0;
	var win2 = 0;
	var loss1 = 0;
	var loss2 = 0;
	var tie = 0;
	$scope.noMessage = true;
	var playerNum = null;

	var tictacRef = new Firebase("https://tic-tac-thrones.firebaseio.com/games");


		$scope.startGame = function(){
 			var lastGame;

 			document.getElementById("beforegame").style.display = "none";
			document.getElementById("setusers").style.display = "block";
			document.getElementById("user1").style.display = "block";
			document.getElementById("user2").style.display = "block";

 			tictacRef.once("value", function(data){
		
 		 	var games = data.val();
			if(games == null) {
				lastGame = tictacRef.push({
					waiting: true,
					player1: {
							username: '',
							xo: '',
							wins: win1,
							ties: tie,
							losses: loss1 } 
						});
				playerNum = 1;

				document.getELementById("setusers").style.display = "block";
					
			} else {
				var keys = Object.keys(games);
				var lastKey = keys[keys.length - 1];
				var lastGame = games[lastKey];
				playerNum = 2;

				console.log(lastKey);
				console.log(playerNum);
				
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
							wins: win2,
							ties: tie,
							losses: loss2 }
					});
					
					document.getElementById("setusers").style.display = "none";
					document.getElementById("restartgame").style.display = "none";

				} else {
					lastGame = tictacRef.push(
						{waiting: true,
						player1: {
							username: '',
							xo: '',
							wins: win1,
							ties: tie,
							losses: loss1 } }
				);
					playerNum = 1;				
					console.log(playerNum);
					//document.getElementById("user1message").style.display = "block";
					document.getElementById("setusers").style.display = "block";
				}
			}
			$scope.game = $firebase(lastGame);

		});

	};

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

		$scope.setPlayer1 = function(username, housename){
			$scope.game.player1.username = username;
			$scope.game.player1.xo = 'X';
			console.log($scope.game.player1.username);
			console.log($scope.game.player1.xo);
			$scope.game.$save();
		};

		$scope.setPlayer2 = function(username, housename){
			$scope.game.player2.username = username;
			$scope.game.player2.xo = 'O';
			console.log($scope.game.player2.username);
			document.getElementById("duringgame").style.display = "block";
			document.getElementById("setusers").style.display = "none";	
			$scope.game.$save();
		};

		
		

		$scope.makeMove = function(obj){
		

			console.log(obj.position);
			
			if(obj.empty == true) {
				obj.empty = false;
				if(turn % 2 == 0) {
					obj.xo = $scope.game.player1.xo;
					turn += 1;
				} else {
					obj.xo = $scope.game.player2.xo;
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
					if(winLetter == 'X'){
						$scope.winner=$scope.game.player2.username;
						//Don't forget to set your house! Or name will show up undefined
						$scope.house=$scope.family1.name;
						$scope.noMessage = false;
						$scope.isPlayer1 = true;
						win1 ++;
						loss2 ++;
					} else if(winLetter == 'O'){
						$scope.winner=$scope.game.player2.username;
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
			document.getElementById("winmessage").style.display = "none";
			turn = 1;
			game ++;
		}

		$scope.game.$save();
	});
