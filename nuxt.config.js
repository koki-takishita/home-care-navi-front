import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: process.env.PORT || 8000, // デフォルト: 3000
    host: '0.0.0.0', // デフォルト: localhost,
    timing: false,
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'toppage',
        path: '/',
        component: resolve(__dirname, 'pages/top.vue'),
      })
    },
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - front',
    title: 'front',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v6.0.0/css/all.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  plugins: [
    { src: '~/plugins/persistedstate.js' },
    '~/plugins/axios.js',
    '~/plugins/apiToRequestOfAddress.js',
    '~plugins/dateFilter.js',
    '~/plugins/officeSearch/selectedArea.js',
    '~/plugins/officeSearch/currentLocation.js',
    '~/plugins/officeSearch/conversionKeywords.js',
    '~/plugins/validates.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules

  middleware: 'authentication',

  modules: [
    // https://axios.nuxtjs.org/setup
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  auth: {
    redirect: {
      login: '/top',
      logout: false,
      callback: false,
      home: false,
    },
    strategies: {
      local: {
        token: {
          property: false,
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'delete' },
          user: false,
        },
      },
    },
    plugins: ['~/plugins/login.js', '~/plugins/logout.js'],
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  publicRuntimeConfig: {
    passwordResetRedirectUrl: process.env.PASSWORD_RESET_REDIRECT_URL,
    frontTopUrl: process.env.FRONT_TOP_URL,
    axios: {
      baseURL: process.env.END_POINT_BASE_URL,
    },
  },
}
