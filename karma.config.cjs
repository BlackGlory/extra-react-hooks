const webpack = require('./webpack.config.cjs')

module.exports = config => {
  config.set({
    plugins: [
      'karma-webpack'
    , 'karma-jasmine'
    , 'karma-chrome-launcher'
    ]
  , frameworks: ['jasmine']
  , files: ['__tests__/**/*.spec.+(ts|tsx)']
  , preprocessors: {
      '__tests__/**/*.spec.+(ts|tsx)': ['webpack']
    }
  , browsers: ['ChromeHeadless']
  , webpack
  })
}
