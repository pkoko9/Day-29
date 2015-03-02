
angular.module ('app.controllers', [])

	.controller('postController', function($scope, $http) {

		$scope.data='';
		$scope.myArray=[];
		$scope.displayArray=[];
		$scope.menuHide = true;

		$scope.expandMenu = function() {
		$scope.menuHide = !$scope.menuHide;
		};


// get and post image code
	$scope.sendImage = function(myImage, myCaption) {
		var myImageExists = false;
		for(var i=0; i<$scope.myArray.length; i++) {
			if($scope.myArray[i].url === myImage) {
				myImageExists = true;
			}
		}

		if(myImageExists === false) {
			$http.post(
				'http://tiny-pizza-server.herokuapp.com/collections/pk',
				
				{url: myImage,
				caption: myCaption}
			);

			$scope.displayArray.unshift(
			
				{url: myImage,
				caption: myCaption}
				);
				console.log($scope.displayArray);
		}
		
		else {
			alert('That image already exists');
		}

	};
	
	$http.get('http://tiny-pizza-server.herokuapp.com/collections/pk')
	.success(function(response) {
		// Successfully received a response from the server

		$scope.myArray = [];
		for(var i=0; i<response.length; i++) {
			if(response[i].url && response[i].caption) {
				$scope.myArray.push(response[i]);
			}
		}
		// $scope.myArray = response;
		$scope.displayArray = $scope.myArray;
		console.log($scope.myArray);
		console.log(response);

	})
	.error(function(err) {
		// Got an error back from the server
		console.log(err);
	});

	$scope.cancelClick = function() {
		$scope.imageURL = '';
		$scope.caption = '';
	};


	// Called when submit is clicked
	// Send the data to the server
	// $scope.sendImage = function(myImage, myCaption) {
	// 	var myImageExists = false;
	// 	for(var i=0; i<$scope.myArray.length; i++) {
	// 		if($scope.myArray[i].url === myImage) {
	// 			myImageExists = true;
	// 		}
	// 	}

	// 	if(myImageExists === false) {
	// 		$http.post(
	// 			'http://tiny-pizza-server.herokuapp.com/collections/pk',
				
	// 			{url: myImage,
	// 			caption: myCaption}
	// 		);
	// 	}
		
	// 	else {
	// 		alert('That image already exists');
	// 	}

	// };

// error message code

	$scope.addImage = function() {
		'use strict';
		var correctEntry=0;

		var failArray = [
			'You must enter a valid URL for your image',
			'Image URL must begin with http:// or https://',
			'You must enter an image desciption'
			];
	
		if(angular.isUndefined($scope.imageURL) || $scope.imageURL === "") {
			$scope.fail1 = failArray[0];
		} else {
			$scope.fail1 = undefined;
		}
		if($scope.imageURL.substring(0,7) === "http://" || $scope.imageURL.substring(0,8)==="https://") {
				$scope.fail1 = "";
			} else {
				$scope.fail1 = failArray[1];
			}

		if(angular.isUndefined($scope.caption) || $scope.caption === "") {
			$scope.fail2 = failArray[2];
		} else {
			$scope.fail2 = "";
		}

		$scope.imageURL = '';
		$scope.caption = '';
	}; 
});