import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRouter from '@/utils/permission';
import Home from '../views/layout/Home.vue';

// import Login from '../views/layout/Login.vue';
Vue.use(VueRouter);

const ayncRouterMap = [{
  path: '/product',
  name: 'product',
  meta: {
    title: '商品',
    hidden: false,
    icon: 'inbox',

  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProudectList',
    meta: {
      title: '商品列表',
      hidden: false,
      icon: 'bars',

    },
    component: () => import('../views/page/proudectList.vue'),
  },
  {
    path: 'add',
    name: 'productAdd',
    meta: {
      title: '新增商品',
      hidden: false,
      icon: 'hdd',

    },
    component: () => import('../views/page/productAdd.vue'),
  },
  {
    path: 'edit/:id',
    name: 'productEdit',
    meta: {
      title: '编辑商品',
      hidden: true,
      icon: 'edit',

    },
    component: () => import('../views/page/productAdd.vue'),
  },
  {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
      hidden: false,
      icon: 'edit',

    },
    component: () => import('../views/page/category.vue'),
  },
  ],

}];

const routes = [
  {

    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'laptop',

    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        hidden: false,
        icon: 'file',

      },
      component: () => import('../views/page/index.vue'),
    }],

  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: () => import('../views/layout/Login.vue'),
  },

];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRouter(store.state.user.role, ayncRouterMap);

        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }

      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
