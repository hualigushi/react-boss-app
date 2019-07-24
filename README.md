# 开发

#### mongodb 启动
mongodb/bin 文件路径放入path环境变量

mongod --dbpath F:mongodb-data


#### mongodb 命令
show dbs   

use boss  

show tables  

db.users.find({})

#### 后端启动

server目录下

nodemon server_bak.js

#### 项目启动
npm run start 

#### 端口访问
localhost:3000/register

localhost:3000/login

localhost:9093  后台端口


# 打包

npm run build

#### 启动
npm run server

#### 访问
http://localhost:9093/login

# 技术栈
---

- `React16`
- `redux` 管理状态
- `react-router4` 路由
- `antd-mobile` 蚂蚁金服UI组件库
- `express` 构建服务
- `mongodb` 存储数据
- `socket.io` 

项目结构
---

<pre>
├── config                   // react开发环境配置
├── docs                     // 项目开发文档
├── mock                     // 项目开发中的mock数据
├── package.json             // 项目配置文件
├── server                   // express服务
│   ├── server.js            // express服务启动入口
│   ├── model.js             // 用户model
│   ├── user.js              // 用户信息接口
├── script                   // webpack配置
│   ├── build.js             // 打包相关
│   ├── start.js             // 本地开发
│   ├── test.js              // 测试
├── public                   // 打包后的静态资源
├── src                      // 生产目录
│   ├── actions              // redux action相关操作
│   │    └── chatuser.js     // 用户列表
│   │    └── index.js        // user、chatuser入口
│   │    └── user.js         // 用户信息
│   ├── components           // 展示组件
│   │    └── Authroute       // 授权路由组件，判断用户登录信息  
│   │    └── AvatarSelector  // 头像选择组件  
│   │    └── Boss            // Boss组件 
│   │    └── Genius          // 牛人组件  
│   │    └── Chat            // 聊天组件  
│   │    └── DashBoard       // 信息管理面板  
│   │    └── Logo            // Logo组件  
│   │    └── Msg             // 消息组件  
│   │    └── FooterNav       // 底部导航组件  
│   │    └── UserCenter      // 用户中心组件 
│   │    └── UserCard        // 用户信息组件  
│   ├── config               // 配置文件 
│   │    └── index.js        // axios全局拦截配置
│   └── constants            // actionType常量
│   └── container            // 容器组件
│   │    └── BossInfo        // Boss信息完善页 
│   │    └── GeniusInfo      // 牛人信息完善页
│   │    └── Login           // 登录页    
│   │    └── Register        // 注册页  
│   │    └── Root.js         // 页面入口配置    
│   └── reducers             // 处理action的逻辑
│   │    └── chatuser.js     // 获取用户列表 
│   │    └── index.js        // reducer入口
│   │    └── user.js         // 处理user信息action的reducer
│   └── routers              // 配置路由
│   └── store                // redux store仓库
│   │    └── configureStore.dev.js     // 开发中的store配置 
│   │    └── configureStore.js         // store入口判断
│   │    └── configureStore.prod.js    // 生产环境入口 
│   └── index.css                      // 全局样式
│   └── utils                          // 工具函数
│   │    └── getDirectPath.js          // 根据用户信息,返回跳转地址
│   └── App.js               // 主页面
│   └── App.css              // 主页面样式
│   └── index.html           // 项目入口页面
│   └── index.js             // Webpack 预编译入口
|__
</pre>
