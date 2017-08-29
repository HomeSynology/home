import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Download from '@/components/Download'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/download',
      name: 'Download',
      component: Download
    }
  ]
})
