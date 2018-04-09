module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'chatweb',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
 modules: [
    '@nuxtjs/router',
    '@nuxtjs/axios',
  ],
  plugins: [
    '@/plugins/vue-socket.io',
    '@/plugins/element-ui'
  ],

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

 axios: {
    baseURL:'http://localhost:4000',
    proxy: false,
    credentials:false,
    proxyHeaders:false,
    // proxyHeaders: false
    requestInterceptor: (config, { store }) => {
    /*if (store.state.token) {
       config.headers.common['Authorization'] = 'Bearer ' 
    }*/
    return config
  },
  responseInterceptor: (response, { store }) => {
   /*if (response && response.data.status===401) {
        store.dispatch('ACTION_LOGOUT')
    }*/
    return response
  }
},
  env: {
    'node_env': process.env.node_env || 'local'
  }
}
