# Vue Client Generator
Generator to scaffold app with Create-Retrieve-Update-Delete features for any API documentation for:

* Nuxt.js
* Vue.js
* Vuetify.js

## Create Nuxt

1. Create project

```bash
npx create-nuxt-app your-app-name
```
2. Set up project

Project name: your-app-name
Programming language: JavaScript
Package manager: Yarn
UI framework: Vuetify.js
Nuxt.js modules: None
Linting tools: Prettier, Lint staged files
Testing framework: None
Rendering mode: Single Page App
Deployment target: Static (Static/JAMStack hosting)

3. Intall package

```bash
npm i moment lodash vue-i18n vuelidate vuex-map-fields nuxt-i18n
```

```bash
npm i --dev @nuxtjs/vuetify @nuxtjs/fontawesom
```
4. Config
- nuxt.config.js
```bash
  buildModules: [
    // ...
    '@nuxtjs/vuetify',
    '@nuxtjs/fontawesome',
    'nuxt-i18n'
  ],
  // ...
  // to avoid name conflicts in generators
  components: false, 
```

5. Generating Routes

```bash
npx @giangmv/vue-generator --generator nuxt --module module
```

6. Updating default layout

- create layouts/default.vue
```bash
<template>
  <v-app>
    <alert />
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-book</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link :to="{ name: 'books' }">Books</nuxt-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-comment-quote</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link :to="{ name: 'reviews' }">Reviews</nuxt-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ date }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Alert from '../components/Alert'

export default {
  components: {
    Alert
  },

  data: () => ({
    date: null,
    drawer: null
  }),

  mounted () {
    this.date = new Date().getFullYear()
  }
}
</script>
```

## Create Vue
1. Create project

```bash
vue init webpack-simple my-app
```

2. Intall package

```bash
npm i vue-router vuex vuex-map-fields babel-plugin-transform-builtin-extend babel-preset-es2015 babel-preset-stage-2 lodash
```

```bash
npm i bootstrap font-awesome
```
4. Config
- .babelrc
```bash
// .babelrc
{
  "presets": [
    ["es2015", { "modules": false }],
    ["stage-2"]
  ],
  "plugins": [
    ["babel-plugin-transform-builtin-extend", {
      globals: ["Error", "Array"]
    }]
  ]
}
```

5. Generating Routes

```bash
npx @giangmv/vue-generator --generator vue --module module
```

6. Updating default layout

- create main.js
```bash
import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import book from './store/modules/book/';
import bookRoutes from './router/book';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
  modules: {
    book,
  }
});

const router = new VueRouter({
  mode: 'history',
  routes: [
      ...bookRoutes,
  ],
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
```
## Features

* Generate high-quality TypeScript or ES6 components:
  * List view
  * Creation form
  * Editing form
  * Deletion button


## Credits

Created by [Giangmv]
