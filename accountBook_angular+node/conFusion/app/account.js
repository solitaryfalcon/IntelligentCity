var app = angular.module('accountApp',[]);
		app.controller('accountController',function($http,$scope){
			 var date = new Date();
			 var today;
			 //function click(){
				 $scope.today = date.toLocaleDateString();
			// }
			 
			//��jsonȡ���ݲ�����html accounts[];
			$http.get("account.json").success(function(response) {
				$scope.accounts = response.records;
				//alert(JSON.stringify(response.records[1]));
				//������ҳ��ʾ����
				$scope.accounts_each =[response.records[0],response.records[1],response.records[2],
									   response.records[3],response.records[4]];
				//��ҳ��ת
				
				//��ҳ����
				$scope.pageSize = 5;
				$scope.pages = Math.ceil($scope.accounts.length / $scope.pageSize); //��ҳ��
				$scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
				$scope.pageList = [];
				$scope.selPage = 1;
				//���ñ������Դ(��ҳ)
				$scope.setaccounts = function () {
					$scope.items = $scope.accounts.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//ͨ����ǰҳ��ɸѡ�����ǰ��ʾ����
				}
				$scope.items = $scope.accounts.slice(0, $scope.pageSize);
				//��ҳҪrepeat������
				for (var i = 0; i < $scope.newPages; i++) {
					$scope.pageList.push(i + 1);
				}
				//��ӡ��ǰѡ��ҳ����
				$scope.selectPage = function (page) {
				//����С��1�������
				if (page < 1 || page > $scope.pages) return;
				//�����ʾ��ҳ��5
				if (page > 2) {
				//��Ϊֻ��ʾ5��ҳ��������2ҳ��ʼ��ҳת��
				var newpageList = [];
				for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
					newpageList.push(i + 1);
				}
				$scope.pageList = newpageList;
				}
				$scope.selPage = page;
				$scope.setaccounts();
				$scope.isActivePage(page);
				console.log("ѡ���ҳ��" + page);
				//�ж��Ƿ�Ϊ�գ��������һҳ���ݲ����������
				if (response.records[page*5-1] == null) response.records[page*5-1]={"date":"","num":"","type":"null"};
				if (response.records[page*5-2] == null) response.records[page*5-2]={"date":"","num":"","type":"null"};
				if (response.records[page*5-3] == null) response.records[page*5-3]={"date":"","num":"","type":"null"};
				if (response.records[page*5-4] == null) response.records[page*5-4]={"date":"","num":"","type":"null"};
				////�������ݷ���ÿҳ��ÿҳ�������
				$scope.accounts_each =[response.records[page*5-5],response.records[page*5-4],response.records[page*5-3],
				response.records[page*5-2],response.records[page*5-1]];
				
				//$scope.accounts =[response.records[page-1]];
				};
				//���õ�ǰѡ��ҳ��ʽ
				$scope.isActivePage = function (page) {
					return $scope.selPage == page;
				};
				//��һҳ
				$scope.Previous = function () {
					$scope.selectPage($scope.selPage - 1);
				}
				//��һҳ
				$scope.Next = function () {
					$scope.selectPage($scope.selPage + 1);
				};
			});
			
			this.today = today;
		});