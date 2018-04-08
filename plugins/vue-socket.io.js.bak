import Vue from 'vue'
import Router from 'vue-router'
import Index from '~/pages/index'
import User from '~/pages/user'
import UserRegister from '~/pages/userRegister'
import myProfile from '~/pages/myProfile'




Vue.use(Router)
//Vue.use(VueSocketio, 'http://localhost:4000');
export function createRouter() {
	console.log('***********************************88');
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: User
      },
       {
        path: '/signUp',
        component: UserRegister
      },
      {
        path:'/myProfile',
        component: myProfile


      }
    ]
  })
}
