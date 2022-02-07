/**
 * 用户表
 */
const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../core/db')

class User extends Model {
  // 校验用户名密码
  static async verifyUserPassword(username, rawPwd) {
    const errorClass = new global.errs.AuthFailed('用户名或者密码不正确')
    const userInfo = await User.findOne({
      where: { username }
    })
    if (!userInfo) {
      throw errorClass
    }
    // 验证密码
    const { password } = userInfo
    const checkPwd = bcrypt.compareSync(rawPwd, password)
    if (!checkPwd) {
      throw errorClass
    }
    return userInfo
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    set(val) {
      // 加密后存储
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      console.log(psw)
      this.setDataValue('password', psw)
    }
  }
}, {
  sequelize
})

module.exports = {
  User
}