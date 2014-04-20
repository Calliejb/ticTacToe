function TicTacController($scope)
{
	$scope.rows = [
		[
		{
			position: "0-0", 
			empty: true, 
			xo: ''
		},
		{
			position: "0-1", 
			empty: true, 
			xo: ''
		},
		{
			position: "0-2", 
			empty: true, 
			xo: ''
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
			xo: ''},
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
			xo: ''
		},
		{
			position: "2-1", 
			empty: true, 
			xo: ''
		},
		{
			position: "2-2", 
			empty: true, 
			xo: ''
		}
		]
	];

	var turn = 0;
	
	$scope.makeMove = function(obj){
	
		function checkForWin() {
			console.log("sup homie");
			if($scope.rows[0][0].xo == $scope.rows[1][0].xo && $scope.rows[1][0].xo == $scope.rows[2][0].xo) {
				console.log("condition 1");
			} else if($scope.rows[0][1].xo == $scope.rows[1][1].xo && $scope.rows[1][1].xo == $scope.rows[2][1].xo) {
				console.log("condition 2");
			} else if($scope.rows[0][2].xo == $scope.rows[2][1].xo && $scope.rows[2][1].xo == $scope.rows[2][2].xo) {
				console.log("condition 3");
			} else if($scope.rows[0][0].xo == $scope.rows[0][1].xo && $scope.rows[0][1].xo == $scope.rows[0][2].xo) {
				console.log("condition 4");
			} else if($scope.rows[1][0].xo == $scope.rows[1][1].xo && $scope.rows[1][1].xo == $scope.rows[1][2].xo) {
				condition.log("conditon 5");
			} else if($scope.rows[2][0].xo == $scope.rows[2][1].xo && $scope.rows[2][1].xo == $scope.rows[2][2].xo) {
				console.log("condition 6");
			} else if($scope.rows[0][0].xo == $scope.rows[1][1].xo && $scope.rows[1][1].xo == $scope.rows[2][2].xo) {
				console.log("condition 7");
			} else if($scope.rows[0][2].xo == $scope.rows[1][1].xo && $scope.rows[1][1].xo == $scope.rows[2][0].xo) {
				console.log("condition 8");
			}
		}

		console.log(obj.position);
		
		if(obj.empty == true) {
			obj.empty = false;
			if(turn % 2 == 0) {
				obj.xo = "X";
				turn += 1;	
			} else {
				obj.xo = "O";
				turn += 1;
			}
		} else {
			alert("NOOOOO");
		}
	
		if(turn > 4){
			checkForWin();
		}

		if(turn == 9){
			alert("It's a tie!");
		}

	};
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
