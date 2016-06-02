require('../waterfoo/ng-infinite-scroll.min.js');
module.exports = ['$scope', 'BaseService', '$location', '$rootScope', function($scope, BaseService, $location, $rootScope) {

    var dataSource = BaseService.waterfoo.getItem;
    var dataSearchSource = BaseService.item.search;
    if (window.location.pathname == '/usermanage/') {
        $scope.waterfooListIsShow = true;
        dataSource = BaseService.waterfoo.getItemInUsermanage;
    }
    var now = 0;
    var everyPullAmount = 20;
    $scope.items = [];

    //不同页的瀑布流不一样
    //闲置数码 - digital
    //校园代步 - ride
    //电器日用 - commodity
    //图书教材 - book
    //美妆衣物 - makeup
    //运动棋牌 - sport
    //票券小物 - smallthing
    var category;
    var isKeyword = false;
    switch (window.location.pathname) {
        case '/category/digital':
            category = '闲置数码'
            break;
        case '/category/ride':
            category = '校园代步'
            break;
        case '/category/commodity':
            category = '电器日用'
            break;
        case '/category/book':
            category = '图书教材'
            break;
        case '/category/makeup':
            category = '美妆衣物'
            break;
        case '/category/sport':
            category = '运动棋牌'
            break;
        case '/category/smallthing':
            category = '票券小物'
            break;
        case '/category/all':
            category = 'all'
            break;
        default:
            var paths = window.location.pathname.split('/');
            category = paths[paths.length - 1];
            isKeyword = true;
            break;
    }

    $scope.getItem = function() {
        $scope.isBusy = $scope.loaderShow = true;

        var dealResult = function(result) {
            console.log('haha');
            if (result.data.length === 0) {
                $scope.isBusy = true;
                $scope.loaderShow = false;
            } else {
                $scope.items = $scope.items.concat(result.data);
                $scope.isBusy = $scope.loaderShow = false;
            }
            if($scope.items.length === 0 ){
                $scope.noItemIsShow = true;
            }
        }

        if (isKeyword) {
            dataSearchSource(category).then(dealResult);
        } else {
            dataSource(now * everyPullAmount, everyPullAmount, category).then(dealResult);
            now++;
        }
    }


    function init() {
        $scope.items = [];
        now = 0;
        everyPullAmount = 20;
        $scope.isBusy = false;
        $scope.getItem();
    }

    init();


    $scope.$on('item-publish', function() {
        init();
    });

    $scope.showDetailEditor = function() {
        $rootScope.$broadcast('showDetailEditor', this.item.pubTimeStamp)
    };
    $scope.itemSaled = function(){
        if(confirm('恭喜你成功收出一个宝贝！其他用户将看不到此商品，是否确认售出？')){
            BaseService.item.setStatus(this.item.pubTimeStamp,'saled').then(function(result){
                if(result.data.success){
                    $rootScope.$broadcast('alert', '成功！');
                    init();
                }
            })
        }
        
    };
    $scope.itemUnderCarriage = function(){
        if(confirm('此操作会让商品下架，请慎重操作')){
            BaseService.item.setStatus(this.item.pubTimeStamp,'undercarriage').then(function(result){
                if(result.data.success){
                    $rootScope.$broadcast('alert', '成功！');
                    init();
                }
            })
        }
    };
    $scope.showPublish = function() {
        $rootScope.$broadcast('showPublish');
    }
    $scope.showLogin = function() {
        $rootScope.$broadcast('showLogin');
    }
    $scope.showSignup = function() {
        $rootScope.$broadcast('showSignup');
    }
}]
