const dotenv = require('dotenv').config();
process.env.VUE_APP_TMDB_API_KEY = dotenv.parsed.VUE_APP_TMDB_API_KEY;
process.env.VUE_APP_FIREBASE_API_KEY = dotenv.parsed.VUE_APP_FIREBASE_API_KEY

module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
};
