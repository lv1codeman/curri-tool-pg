// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // baseURL: import.meta.env.PROD ? "/curri-tool-pg/" : "/",
    // baseURL: import.meta.dev ? "/" : "/curri-tool-pg/",
    baseURL: "/",
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
