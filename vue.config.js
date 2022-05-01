const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/styles/common";
          @import "@/styles/constants";
          @import "@/styles/responsive";
          @import "@/styles/buttons";`,
      },
    },
  },
});
