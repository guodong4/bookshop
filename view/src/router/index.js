import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            redirect: "/index",
        },
        { 
            path: '/index',
            name: 'index',
            components: {
                default: () => import('@/views/web/home'),
            }
        },
        { 
            path: '/detail',
            name: 'detail',
            components: {
                default: () => import('@/views/web/book-detail'),
            }
        },
        { 
            path: '/cart',
            name: 'cart',
            components: {
                default: () => import('@/views/web/book-cart'),
            }
        },
        { 
            path: '/order',
            name: 'order',
            components: {
                default: () => import('@/views/web/book-order'),
            }
        },
        { 
            path: '/collection',
            name: 'collection',
            components: {
                default: () => import('@/views/web/book-like'),
            }
        },
        { 
            path: '/confirm',
            name: 'confirm',
            components: {
                default: () => import('@/views/web/order-confirm'),
            }
        },
        { 
            path: '/success',
            name: 'success',
            components: {
                default: () => import('@/views/web/order-success'),
            }
        },
        { 
            path: '/read',
            name: 'read',
            components: {
                default: () => import('@/views/web/book-read'),
            }
        },
        { 
            path: '/read/detail',
            name: 'read/detail',
            components: {
                default: () => import('@/views/web/book-read-detail'),
            }
        },
        { 
            path: '/myself',
            name: 'myself',
            components: {
                default: () => import('@/views/web/book-self'),
            }
        },
        { 
            path: '/system',
            name: 'system',
            components: {
                default: () => import('@/views/system/layout'),
            }
        },
        { 
            path: '/system/login',
            name: 'system/login',
            components: {
                default: () => import('@/views/system/login'),
            }
        },
    ]
})
