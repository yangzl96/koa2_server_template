/**
 * 初始化
 */
const requireDirectory = require('require-directory')
const Router = require('koa-router')
const path = require('path')
const { sequelize } = require('../core/db')
const config = require('../config/index')
const httpException = require('./http-exception')

class InitManager {
  // 初始化方法
  static initCore(app) {
    InitManager.app = app
    // 初始化加载所有路由
    InitManager.initLoadRouter()
    // 初始化配置
    InitManager.initLoadConfig()
    // 初始化全局错误处理
    InitManager.initHttpError()
  }

  static initLoadRouter() {
    const routerDir = path.resolve(__dirname, '../app/api')
    requireDirectory(module, routerDir, { visit: whenModuleLoad });
    // 什么时候去加载路由
    function whenModuleLoad(module) {
      // module 每一个模块
      if (module instanceof Router) {
        InitManager.app.use(module.routes())
      }
    }
  }

  static initLoadConfig() {
    global.config = config
  }

  static initHttpError() {    
    global.errs = httpException
  }
}

module.exports = InitManager