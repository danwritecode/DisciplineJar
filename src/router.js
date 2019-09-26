import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Settings from './views/Settings.vue'


const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]



const router = new VueRouter({
  // mode: 'history',
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user;
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then(data => {
      if (data && data.signInUserSession) {
        user = data;
      }
      next()
    }).catch((e) => {
      next({
        path: '/login'
      });
    });
  }
  else if (to.matched.some(record => record.meta.requiresUnauth)) {
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then(data => {
      next({ path: '/'})
    }).catch((e) => {
      next({ path: '/register'});
    });
  }
  next()
})

export default router