import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// const v='@/views'
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/basic',
      name: 'homepage',
      component: () => import(`@/views/homepage`),
      children: [{
        path: '/basic',
        name: 'basic',
        component: () => import('@/components/homepage/basic')
      },
      {
        path: '/types/:id',
        name: 'types',
        component: () => import('@/components/homepage/classify')
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/main')
    },
    {
      path: '/commodity/:id',
      name: 'commodity',
      component: () => import('@/views/commodityInfo')
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('@/views/publish')
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: () => import('@/views/shoppingCart')
    },
    {
      path: '/collect',
      name: 'collect',
      component: () => import('@/views/collect')
    },
    {
      path: '/published',
      name: 'published',
      component: () => import('@/views/published')
    },
    {
      path:'/historyTransaction',
      name:'historyTransaction',
      component:()=>import('@/views/historyTransaction')
    }
  ]
})
