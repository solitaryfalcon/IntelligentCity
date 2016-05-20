var app = angular.module('accountApp',[]);
		app.controller('accountController',function($http,$scope){
			 var date = new Date();
			 var today;
			 //function click(){
				 $scope.today = date.toLocaleDateString();
			// }
			 
			//从json取数据并传给html accounts[];
			$http.get("account.json").success(function(response) {
				$scope.accounts = response.records;
				//alert(JSON.stringify(response.records[1]));
				//设置首页显示数据
				$scope.accounts_each =[response.records[0],response.records[1],response.records[2],
									   response.records[3],response.records[4]];
				//分页跳转
				
				//分页总数
				$scope.pageSize = 5;
				$scope.pages = Math.ceil($scope.accounts.length / $scope.pageSize); //分页数
				$scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
				$scope.pageList = [];
				$scope.selPage = 1;
				//设置表格数据源(分页)
				$scope.setaccounts = function () {
					$scope.items = $scope.accounts.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
				}
				$scope.items = $scope.accounts.slice(0, $scope.pageSize);
				//分页要repeat的数组
				for (var i = 0; i < $scope.newPages; i++) {
					$scope.pageList.push(i + 1);
				}
				//打印当前选中页索引
				$scope.selectPage = function (page) {
				//不能小于1大于最大
				if (page < 1 || page > $scope.pages) return;
				//最多显示分页数5
				if (page > 2) {
				//因为只显示5个页数，大于2页开始分页转换
				var newpageList = [];
				for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
					newpageList.push(i + 1);
				}
				$scope.pageList = newpageList;
				}
				$scope.selPage = page;
				$scope.setaccounts();
				$scope.isActivePage(page);
				console.log("选择的页：" + page);
				//判断是否为空，处理最后一页数据不满五条情况
				if (response.records[page*5-1] == null) response.records[page*5-1]={"date":"","num":"","type":"null"};
				if (response.records[page*5-2] == null) response.records[page*5-2]={"date":"","num":"","type":"null"};
				if (response.records[page*5-3] == null) response.records[page*5-3]={"date":"","num":"","type":"null"};
				if (response.records[page*5-4] == null) response.records[page*5-4]={"date":"","num":"","type":"null"};
				////把条数据放入每页，每页最多五条
				$scope.accounts_each =[response.records[page*5-5],response.records[page*5-4],response.records[page*5-3],
				response.records[page*5-2],response.records[page*5-1]];
				
				//$scope.accounts =[response.records[page-1]];
				};
				//设置当前选中页样式
				$scope.isActivePage = function (page) {
					return $scope.selPage == page;
				};
				//上一页
				$scope.Previous = function () {
					$scope.selectPage($scope.selPage - 1);
				}
				//下一页
				$scope.Next = function () {
					$scope.selectPage($scope.selPage + 1);
				};
			});
			
			this.today = today;
		});