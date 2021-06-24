const { dev_server: devServer } = require('@rails/webpacker').config
const multi = require('multi-loader')

const isProduction = process.env.NODE_ENV === 'production'
const inDevServer = process.argv.find(v => v.includes('webpack-dev-server'))
const extractCSS = !(inDevServer && (devServer && devServer.hmr)) || isProduction

module.exports = {
  test: /\.vue(\.erb)?$/,
  use: [{
    loader: 'vue-loader',
    options: {
      extractCSS,
      loaders: {
        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax', // <style lang="sass"
        loader: multi( 'file-loader?name=[name].[ext].webp!webp-loader?{quality: 95}' )
      },
    },
  }]
}
