import {getToken} from '@/utils/Token.js'
const state={ 
	token:"",
	info:{},
};

const mutations={
	SETTOKEN(state,token){
		state.token=token
	}
}
const actions={
	settoken({commit}){
		let token=getToken();
		console.log(token)
		commit("SETTOKEN",token);
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