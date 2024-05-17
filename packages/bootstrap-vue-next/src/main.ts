import {createApp, h} from 'vue'
import App from './App.vue'
import {createBootstrap} from './BootstrapVue'

import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: {
        name: 'Home',
        render() {
          return h('h1', {}, 'Home page')
        },
      },
    },
    {
      path: '/test',
      name: 'test',
      component: {
        name: 'Test',
        render() {
          return h('h1', {}, 'test page')
        },
      },
    },
    {
      path: '/about/:id',
      name: 'About',
      component: {
        name: 'About',
        props: {id: [Number, String]},
        render() {
          return h('h1', {}, `About page ${this.props.id}`)
        },
      },
      props: true,
    },
  ],
})

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.scss'

createApp(App)
  .use(
    createBootstrap({
      components: true,
      directives: true,
      aliases: {
        BInput: 'BFormInput',
      },
      plugins: {
        // components: {
        //   global: {
        //     type: 'grow',
        //   },
        //   BAccordion: {
        //     flush: true,
        //   },
        //   BFormText: {
        //     text: 'foobar!',
        //   },
        //   BSpinner: {
        //     type: 'grow',
        //   },
        // },
      },
    })
  )
  .use(router)
  .mount('#app')
