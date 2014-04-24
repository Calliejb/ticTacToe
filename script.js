
// var gameApp = angular.module('gameApp', []);
// gameApp.controller('GameController', function($scope){

function TicTacController($scope){

	var game = 0;

	// function newGame(){

		$scope.families1 = [
			{
				name: "House Stark",
				image: "images/stark1.jpg"
			},
			{
				name: "House Lannister",
				image: "images/lannister1.jpeg"
			},
			{
				name: "House Baratheon",
				image: "images/baratheon1.jpeg"
			},
			{
				name: "House Targaryen",
				image: "images/targaryen1.jpeg"
			},
			{
				name: "House Martell",
				image: "images/martell1.jpeg"
			},
			{
				name: "House Greyjoy",
				image: "images/greyjoy1.jpeg"
			},
			{
				name: "House Tully",
				image: "images/tully1.jpeg"
			},
		];


		$scope.families2 = [
			{
				name: "House Stark",
				image: "images/stark2.jpg"
			},
			{
				name: "House Lannister",
				image: "images/lannister2.jpeg"
			},
			{
				name: "House Baratheon",
				image: "images/baratheon2.jpeg"
			},
			{
				name: "House Targaryen",
				image: "images/targaryen2.jpeg"
			},
			{
				name: "House Martell",
				image: "images/martell2.jpeg"
			},
			{
				name: "House Greyjoy",
				image: "images/greyjoy2.jpeg"
			},
			{
				name: "House Tully",
				image: "images/tully2.jpeg"
			},
		];

		$scope.rows = [
			[
			{
				position: "0-0",
				empty: true,
				xo: ' '
			},
			{
				position: "0-1",
				empty: true,
				xo: ''
			},
			{
				position: "0-2",
				empty: true,
				xo: ' '
			}
			],
			
			[
			{
				position: "1-0",
				empty: true,
				xo: ''
			},
			{
				position: "1-1",
				empty: true,
				xo: ' '
			},
			{
				position: "1-2",
				empty: true,
				xo: ''
			}
			],
						
			[
			{
				position: "2-0",
				empty: true,
				xo: ' '
			},
			{
				position: "2-1",
				empty: true,
				xo: ''
			},
			{
				position: "2-2",
				empty: true,
				xo: ' '
			}
			]
		];

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
					if($scope.rows[0][0].xo == 'X'){
						$scope.winner=$scope.player1.username;
						$scope.house=$scope.family1.name;
					} else if($scope.rows[0][0].xo == 'O'){
						$scope.winner=$scope.player2.username;
						$scope.house=$scope.family2.name;
					}
				} else if($scope.rows[0][1].xo == $scope.rows[1][1].xo && $scope.rows[1][1].xo == $scope.rows[2][1].xo) {
					console.log("middle column");
					console.log($scope.rows[0][1].xo + " wins!");
					if($scope.rows[0][1].xo == 'X'){
						$scope.winner=$scope.player1.username;
						$scope.house=$scope.family1.name;
					} else if($scope.rows[0][1].xo == 'O'){
						$scope.winner=$scope.player2.username;
						$scope.house=$scope.family2.name;
					}
				} else if($scope.rows[0][2].xo == $scope.rows[1][2].xo && $scope.rows[1][2].xo == $scope.rows[2][2].xo) {
					console.log("right column");
					console.log($scope.rows[0][2].xo + " wins!");
					if($scope.rows[0][2].xo == 'X'){
						$scope.winner=$scope.player1.username;
						$scope.house=$scope.family1.name;
					} else if($scope.rows[0][2].xo == 'O'){
						$scope.winner=$scope.player2.username;
						$scope.house=$scope.family2.name;
					}
				} else if($scope.rows[0][0].xo == $scope.rows[0][1].xo && $scope.rows[0][1].xo == $scope.rows[0][2].xo) {
					console.log("top row");
					console.log($scope.rows[0][0].xo + " wins!");
					if($scope.rows[0][0].xo == 'X'){
						$scope.winner=$scope.player1.username;
						$scope.house=$scope.family1.name;
					} else if($scope.rows[0][0].xo == 'O'){
						$scope.winner=$scope.player2.username;
						$scope.house=$scope.family2.name;
					}
				} else if($scope.rows[1][0].xo == $scope.rows[1][1].xo && $scope.rows[1][1].xo == $scope.rows[1][2].xo) {
					console.log("middle row");
					console.log($scope.rows[1][0] + " wins!");
					if($scope.rows[1][0].xo == 'X'){
						$scope.winner=$scope.player1.username;
						$scope.house=$scope.family1.name;
					} else if($scope.rows[1][0].xo == 'O'){
						$scope.winner=$scope.player2.username;
						$scope.house=$scope.family2.name;
					}
				} else if($scope.rows[2][0].xo == $scope.rows[2][1].xo && $scope.rows[2][1].xo == $scope.rows[2][2].xo) {
					console.log("bottom row");
					console.log($scope.rows[2][0].xo + " wins!");
					if($scope.rows[2][0].xo == 'X'){
						$scope.winner=$scope.player1.username;
						$scope.house=$scope.family1.name;
					} else if($scope.rows[2][0].xo == 'O'){
						$scope.winner=$scope.player2.username;
						$scope.house=$scope.family2.name;
					}
				} else if($scope.rows[0][0].xo == $scope.rows[1][1].xo && $scope.rows[1][1].xo == $scope.rows[2][2].xo) {
					console.log("diagonal left");
					console.log($scope.rows[0][0].xo + " wins!");
					if($scope.rows[0][0].xo == 'X'){
						$scope.winner=$scope.player1.username;
						$scope.house=$scope.family1.name;
					} else if($scope.rows[0][0].xo == 'O'){
						$scope.winner=$scope.player2.username;
						$scope.house=$scope.family1.name;
					}
				} else if($scope.rows[0][2].xo == $scope.rows[1][1].xo && $scope.rows[1][1].xo == $scope.rows[2][0].xo) {
					console.log("diagonal right");
					console.log($scope.rows[0][2].xo + "wins!");
					if($scope.rows[0][2].xo == 'X'){
						$scope.winner=$scope.player1.username;
						$scope.house=$scope.family1.name;
					} else if($scope.rows[0][2].xo == 'O'){
						$scope.winner=$scope.player2.username;
						$scope.house=$scope.family1.name;
					}
				} else {
					return false;
				}

			}

			if(turn == 9 && checkForWin() === false) {
				console.log("It's a tie!");
				tie++;
			}

		};

	// 	game++;
	// }

}
		

		// maybe do a recursive function! 
		// if obj is top-left -- check top-center -- if top-center is empty or
		// = opposite letter -- check middle-center -- if middle-center 
		// is empty or = opposite letter -- check middle-left -- 
		// if middle-left is empty or = opposite letter -- return FALSE

// Example of a RECURSIVE function
// var simpsons = ["Maggie",["Monty", ["Waylan", "Homer", ["Lisa", "Bart"], "Quimby", ["Wiggam", ["Eddie", "Lou"]]]]];

// function parseLayer(ary)
// {
// 	for(var i = 0; i < ary.length ; i++)
// 	{
// 		if(ary[i] instanceof Array)
// 			parseLayer(ary[i]);
// 		else
// 			alert(ary[i]);
// 	}
// }

// parseLayer(simpsons);
// 	}



	
		// if(col == false) {
		// 	$scope.col = obj + "X";
		// }

		// $scope.col.xo = clickXO;
		// $scope.col.empty = false;


	// function clickXO(xo) {

	// }
