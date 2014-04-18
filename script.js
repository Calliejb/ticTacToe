function TicTacController($scope)
{
	$scope.rows = [
		[
		{
			position: "Top-Left", 
			empty: true, 
			xo: ''
		},
		{
			position: "Top-Center", 
			empty: true, 
			xo: ''
		},
		{
			position: "Top-Right", 
			empty: true, 
			xo: ''
		}
		],
		
		[
		{
			position: "Middle-Left", 
			empty: true, 
			xo: ''
		},
		{
			position: "Middle-Center", 
			empty: true, 
			xo: ''},
		{
			position: "Middle-Right", 
			empty: true, 
			xo: ''
		}
		],
					
		[
		{
			position: "Bottom-Left", 
			empty: true, 
			xo: ''
		},
		{
			position: "Bottom-Center", 
			empty: true, 
			xo: ''
		},
		{
			position: "Bottom-Right", 
			empty: true, 
			xo: ''
		}
		]
	];
	var turn = 0;
	
	$scope.makeMove = function(obj){
	
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
	};

	function checkForWin() {
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
	};

	// function clickXO(xo) {

	// }
}