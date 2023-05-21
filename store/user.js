import {getToken} from '@/utils/Token.js'
import {UserUpdateUserMessage} from "@/api/user.js"
import {AlterIssueRegex} from "@/utils/regular.js"
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
		state.info={ ...state.info, ...info };
	}
}
const actions={
	settoken({commit}){
		let token=getToken();
		console.log(token)
		commit("SETTOKEN",token);
	},
	async alterinfo({commit},info){
		console.log(info)
		let regexsult=AlterIssueRegex(info)
		if(!regexsult.valid){
			console.log(regexsult.message)
		}
		const {name,phone,address,sex,worknum,age,description,photourl}=info;
		const newInfo = {name,phone,address,sex,worknum,age,description,photourl};
		let result=await UserUpdateUserMessage(newInfo);
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