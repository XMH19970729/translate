'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async translate() {
    await this.ctx.service.getTranslate.get();
    this.ctx.body = '正在执行';
  }
}

module.exports = HomeController;
