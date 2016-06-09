# 复旦二手工坊
项目地址:http://www.fudan.market

## 项目启动
```
# 添加配置信息 src/service/setting.js
vim src/service/setting.js

# 安装并启动redis-server
brew install redis
redis-server

# 启动gulp
cd client
gulp clean
gulp webpack

# 启动webApp(默认端口:3000)
node app.js
```

## 开发须知
* 主分支为master
* 开发分支为dev, 每次开发需先更新本地代码, 请勿直接在master分支上修改
* 欢迎提交issue~

## 主要贡献者
[@starkwang](https://github.com/starkwang)
[@Jingtao Wang](https://github.com/jt-wang)
[@gzdaijie](https://github.com/gzdaijie)

## 声明
* 遵循[MIT](https://github.com/fdu-dev/second-hand-market/blob/master/LICENSE)开源许可协议
* 非官方项目,晨曦工作室保留解释权


