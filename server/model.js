const mongoose = require('mongoose')

// 链接mongodb
const DB_URL = 'mongodb://localhost:27017/boss'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
    console.log('mongodb connect success')
})


const models = {
    user:{
      'user':{
          type:String,
          require:true
      },
      'pwd':{
        type:String,
        require:true
      },
      'type':{
        type:String,
        require:true
      },
      'avatar':{ // 头像
          type:String
      },
      'desc':{ //个人简介或者职位简介
          type:String
      },
      'title':{ // 职位名
          type:String
      },
      'company':{
          type:String
      },
      'money':{
          type:String
      }  
    },
    'chat':{
        'chatid': { 
            type: String, 
            require: true 
        },
        'from': { 
            type: String, 
            require: true 
        },
        'to': { 
            type: String, 
            require: true 
        },
        'read': {  // 信息是否已读
            type:Boolean, 
            default: false 
        },
        'content': { 
            type: String, 
            require: true, 
            default: '' },
        'create_time': { 
            type: Number, 
            default: new Date().getTime() 
        }
    }
}

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}