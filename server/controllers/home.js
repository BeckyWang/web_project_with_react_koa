const randomTexts = require('../mock/random');
const { generateSummary } = require('../models/home');

module.exports = {
  //生成摘要
  summary: async (ctx, next) => {
    const { originalText } = ctx.request.body;
    try {
      const { summary } = await generateSummary(originalText);
      ctx.response.body = {
        summary: summary[0].summarization,
      }
    } catch (e) {
      ctx.response.status = 500;
      ctx.response.body = {
        info: e.info || '未知错误，请稍候再试！'
      };
    }
  },
  //生成随机文章
  randomText: async (ctx, next) => {
    const idx = Math.floor(Math.random() * 10);
    ctx.response.body = {
      text: randomTexts.texts[idx]
    }
  }
};