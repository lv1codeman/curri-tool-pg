// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // 這行有紅字很煩，但這樣寫才能在gh-page上和本地端運作正常且一行搞定
    baseURL: process.env.NODE_ENV === "production" ? "/curri-tool-pg/" : "/",
    buildAssetsDir: "/static/",
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  ssr: true,

  // when enabling ssr option you need to disable inlineStyles and maybe devLogs
  features: {
    inlineStyles: false,
    devLogs: false,
  },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
  },

  css: ["vuetify/styles"],
  modules: ["@nuxt/fonts", "vuetify-nuxt-module"],
  // 運行時配置 (Runtime Config)
  runtimeConfig: {
    public: {
      apiBaseUrl: "",
    },
  },
  vuetify: {
    moduleOptions: {
      // check https://nuxt.vuetifyjs.com/guide/server-side-rendering.html
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersColorScheme: false,

        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
      },

      // /* If customizing sass global variables ($utilities, $reset, $color-pack, $body-font-family, etc) */
      // disableVuetifyStyles: false,
      styles: {
        configFile: "assets/settings.scss",
      },
    },
  },
});
