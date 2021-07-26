export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "qubi",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/vue-grid-layout", mode: "client" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    [
      "nuxt-fontawesome",
      {
        component: "fa", //customize component name
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: [
              "faEnvelope",
              "faFileAlt",
              "faAddressBook",
              "faClipboardList",
              "faCode",
              "faUserCircle",
              "faDatabase",
              "faStar",
              "faHome",
              "faIdCard"
            ]
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: [
              "faLinkedinIn",
              "faGithub",
              "faVuejs",
              "faAngular",
              "faPhp",
              "faJsSquare",
              "faCuttlefish",
              "faCss3",
              "faPython"
            ]
          },
          { set: "@fortawesome/free-regular-svg-icons", icons: [] }
        ]
      }
    ],
    "@nuxtjs/dotenv",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Quicksand: true
        }
      }
    ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
