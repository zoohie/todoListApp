angular.module("todoListApp", [])
	
.controller("mainCtrl", function($scope, $window) {
	
	if ($window.localStorage.getItem("data") == null) {
		// fill the app's data with "default" todos (if ls was cleared)
		$scope.data = {
			todos: [
				{
					name: "Put some algorythm down here",
					comments: [
						"First todo comment one",
						"First todo comment twowwwwwwww",
					]
				},
				{
					name: "Start some coding",
					comments: [
						"Second todo comment one"
					]
				},
				{
					name: "Check the code",
					comments: [
						"Sss"
					]
				}
			]
		};
	} else {
		//fill the app's data with "localStorage" todos
		$scope.data = JSON.parse($window.localStorage.data);
	}
	
	//save data from $scope.data to localStorage
	$window.localStorage.setItem("data", JSON.stringify($scope.data));
	
	//trigger selection of the element
	$scope.selectedIndex = 0;
	$scope.itemNumber = 1;
	
	$scope.itemSelected = function($index) {
		console.log($index);
		$scope.selectedIndex = $index;
		$scope.itemNumber = $index + 1;
		$scope.showComments($index);
	}
	
	//add new todo
	$scope.addTodo = function() {
		if ($scope.inputText.length >= 1) {
			$scope.newTodo = {
				name: $scope.inputText,
				comments: []
			};
			$scope.data.todos.push($scope.newTodo);
		}
		$scope.inputText = "";
		//focus on newly created task
		$scope.itemSelected($scope.data.todos.length - 1);
		//update data
		$scope.updateData($scope.data);
	}
	
	//remove certain todo
	$scope.removeTodo = function($index) {
		$scope.data.todos.splice($index, 1);
		//update data
		$scope.updateData($scope.data);
	}
	
	//update todo
	$scope.updateData = function(newData) {
		$window.localStorage.data = JSON.stringify(newData);
	}
	
	//show comments
	$scope.showComments = function($index) {
		$scope.comments = $scope.data.todos[$index].comments;
	}
	
	//show appropriate comments onload
	$scope.showComments(0);
	
	//add new comment
	$scope.addNewComment = function($event) {
		// check whether CTRL+ENTER event triggered
		if ($window.event.keyCode == 13 && $window.event.ctrlKey && $scope.newComment.length >= 1) {
			$scope.data.todos[$scope.itemNumber - 1].comments.push($scope.newComment);
			$scope.updateData($scope.data);
			$scope.newComment = "";
		}
	}
	
});