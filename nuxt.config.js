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
  css: ["~/assets/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-grid-layout", mode: "client" },
    { src: "~/plugins/one-colorpicker", mode: "client" }
  ],

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
              "faCode",
              "faStar",
              "faHome",
              "faRedo",
              "faRandom",
              "faPlay",
              "faPause",
              "faStop",
              "faStopwatch",
              "faCheck",
              "faTimes",
              "faEdit",
              "faPlus",
              "faCircle",
              "faCheckCircle",
              "faListUl",
              "faClock",
              "faStickyNote",
              "faHourglass",
              "faImage",
              "faLightbulb"
            ]
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: []
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
          Quicksand: true,
          RobotoMono: true
        }
      }
    ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    base: "/qubi/"
  }
};
