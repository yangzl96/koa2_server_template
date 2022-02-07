const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')
const { dbName, host, port, user, password } = require('../config/dbConfig')

const sequelize = new Sequelize(dbName, user, password, {
  host,
  port,
  dialect: 'mysql',
  timezone: '+08:00', //北京时间
  define: {
    timestamps: true, //自动添加createdAt  updatedAt  时间
    paranoid: true, //调用 destroy会删除模型，并且添加deleteAt，默认false
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true, //向所有属性添加下划线
    // 设置全局scopes 作用域
    // 定义常用的查询，这样可以在之后使用，最终会生成一个where语句  
    scopes: {
      // 自定义属性：有些接口不需要这三个字段，就排除
      bh: {
        attributes: {
          exclude: ['updated_at', 'deleted_at', 'created_at']
        }
      }
    }
  }
})

// 连接测试
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

async function sync() {
  await sequelize.sync({ force: false })
}
sync()
// 删除同名数据表后同步，谨慎使用，会导致数据丢失
// sequelize.sync({ force: true })

// 不强制同步
// sequelize.sync({ force: false })

// 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// sequelize.sync()


Model.prototype.toJSON = function () {
  let data = clone(this.dataValues)
  // 过滤密码
  if (data.password) delete data.password
  return data
}
module.exports = {
  sequelize
}