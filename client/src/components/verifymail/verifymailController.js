module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    $scope.verifyMailIsShow = false;
    $scope.$on('showVerifyMail', function() {
        $scope.verifyMailIsShow = true;
    })
    $scope.loaderIsShow = false;
    $scope.changeVerifyMailShow = function($event) {
        if ($event.target.id == "change-show") {
            $scope.verifyMailIsShow = !$scope.verifyMailIsShow;
        }
    }

    $scope.requestVerifyMail = function() {
        if ($scope.mailAddress) {
            $scope.loaderIsShow = true;
            BaseService.user.requestMailVerify($scope.mailAddress).then(function(result) {
                if (result.data.success) {
                    $rootScope.$broadcast('notice', {
                        text: '验证邮件发送成功~',
                        linkText: '现在登录邮箱，立刻激活 >',
                        link: 'http://mail.fudan.edu.cn/'
                    });
                    $scope.verifyMailIsShow = !$scope.verifyMailIsShow;
                } else {
                    $rootScope.$broadcast('alert', '哎呀发送失败了 T^T');
                }
                $scope.loaderIsShow = false;
            });
        } else {
            $rootScope.$broadcast('alert', '请输入正确的复旦邮箱 0v0');
        }

    }

}]
