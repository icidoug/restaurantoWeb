import Home from '@/views/home'
import Basket from '@/views/basket'
import Order from '@/views/order'


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
];
