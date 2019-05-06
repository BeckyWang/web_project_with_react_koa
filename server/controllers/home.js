const randomTexts = require('../mock/random');

module.exports = {
  summary: async (ctx, next) => {
    ctx.response.body = {
      summary: '123'
    }
  },
  randomText: async (ctx, next) => {
    const idx = Math.floor(Math.random()*10);
    ctx.response.body = {
      text: randomTexts.texts[idx]
    }
  }
};