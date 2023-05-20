import {getToken} from '@/utils/Token.js'
import {UserUpdateUserMessage} from "@/api/user.js"
const state={ 
	token:"",
	info:{
		id:'1a0926236fd9440d589a7f21372911b6'
	},
};

const mutations={
	SETTOKEN(state,token){
		state.token=token
	},
	ALTERIMFO(state,info){
		state.info=info
	}
}
const actions={
	settoken({commit}){
		let token=getToken();
		console.log(token)
		commit("SETTOKEN",token);
	},
	async alterinfo({commit},info){
		let User=info
		let result=await UserUpdateUserMessage(User);
		commit("ALTERIMFO",info);
	}
}
const getters={
	
}
export default {
	state,
	actions,
	mutations,
	getters
}