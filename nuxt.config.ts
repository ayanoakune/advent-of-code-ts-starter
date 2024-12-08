// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  app: {
    rootAttrs: {
      class: "min-h-screen",
    },
  },
  devtools: {
    enabled: "development" === process.env.NODE_ENV,
  },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss"],
});
