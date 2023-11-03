const { defineConfig } = require('@vue/cli-service')
const registerRouter = require('./backend/router.js')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/scss/variable.scss";
        @import "@/assets/scss/mixin.scss";
      `
      }
    }

  },
  devServer: {
    setupMiddlewares(middlewares, devServer) {

      registerRouter(devServer.app);

      return middlewares;

    },
  }
})
