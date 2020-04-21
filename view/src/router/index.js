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
            name: '',
            components: {
                default: () => import('@/views/web/home'),
            }
        },
        { 
            path: '/detail',
            name: '',
            components: {
                default: () => import('@/views/web/book-detail'),
            }
        },
        { 
            path: '/cart',
            name: '',
            components: {
                default: () => import('@/views/web/book-cart'),
            }
        },
        { 
            path: '/order',
            name: '',
            components: {
                default: () => import('@/views/web/book-order'),
            }
        },
        { 
            path: '/collection',
            name: '',
            components: {
                default: () => import('@/views/web/book-like'),
            }
        },
        { 
            path: '/confirm',
            name: '',
            components: {
                default: () => import('@/views/web/order-confirm'),
            }
        },
        { 
            path: '/success',
            name: '',
            components: {
                default: () => import('@/views/web/order-success'),
            }
        },
        { 
            path: '/read',
            name: '',
            components: {
                default: () => import('@/views/web/book-read'),
            }
        },
        { 
            path: '/read/detail',
            name: '',
            components: {
                default: () => import('@/views/web/book-read-detail'),
            }
        },
        { 
            path: '/myself',
            name: '',
            components: {
                default: () => import('@/views/web/book-self'),
            }
        },
        { 
            path: '/system',
            name: '',
            components: {
                default: () => import('@/views/system/layout'),
            }
        },
        { 
            path: '/system/login',
            name: '',
            components: {
                default: () => import('@/views/system/login'),
            }
        },
    ]
})
