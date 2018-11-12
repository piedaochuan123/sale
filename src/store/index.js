import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import shoppingCart from './modules/shoppingCart'

Vue.use(Vuex)


export default new Vuex.Store({
      modules:{
          user,
          shoppingCart
      }
})