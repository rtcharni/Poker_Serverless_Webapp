import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import About from './views/About.vue';
import Game from './views/Game.vue';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL ? process.env.BASE_URL : '/',
  routes: [
    {
      path: '/',
      redirect: '/login', // In prod /login
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
    },
  ],
});
// IN PROD!
// router.beforeEach((to, from, next) => {
//   if (to.name === 'game' && !to.params.user) {
//     next({name: 'login', replace: true});
//   }
//   next();
// });

export default router;
