/**
 * 定义校验规则
 */
const { LinValidator, Rule } = require('../core/lin-validator-v2')
const { User } = require('../model/User')

// 正整数
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '需要正整数', { min: 1 })
    ]
  }
}
// -----------------------------------
// 注册
class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.username = [
      new Rule('isLength', '用户名至少为2-8个字符', {
        min: 2,
        max: 8
      })
    ]
    this.password = [
      new Rule('isLength', '密码至少6个字符，至多12个字符', {
        min: 6,
        max: 12
      }),
    ]
  }
}

// 登录
class LoginValidator extends LinValidator {
  constructor() {
    super()
    this.username = []
    this.password = []
  }
}

module.exports = {
  RegisterValidator,
  LoginValidator,
  PositiveIntegerValidator
}