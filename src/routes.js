import Home from '@/views/home'
import Basket from '@/views/basket'
import Order from '@/views/order'
import Tips from '@/views/tips'
import Events from '@/views/events'


export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/basket/',
    component: Basket,
  },
  {
    path: '/order/',
    component: Order,
  },
  {
    path: '/tips/',
    component: Tips,
  },
  {
    path: '/events/',
    component: Events,
  },
];
