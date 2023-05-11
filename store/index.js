import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user.js'
Vue.use(Vuex);//vue的插件机制

export default new Vuex.Store({
		modules:{
			user,
		}
	})