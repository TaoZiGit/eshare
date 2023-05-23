import {getToken} from '@/utils/Token.js'
import {UserUpdateUserMessage} from "@/api/user.js"
import {AlterIssueRegex} from "@/utils/regular.js"
const state={ 
	token:"",
	info:{
		id:'1a0926236fd9440d589a7f21372911b6',
		address:'桂林电子科技大学'
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
	async alterinfo({state,commit},info){
		let regexsult=AlterIssueRegex(info)
		console.log(regexsult)
		if(regexsult!==undefined && !regexsult.valid){
			return new Promise((resolve,reject)=>{
				reject(regexsult)
			}) 
		}
		let newInfo = {
		  ...state.info,
		  ...info
		};
		const {name,phone,address,sex,worknum,age,description,photourl}=newInfo;
		newInfo = {name,phone,address,sex,worknum,age,description,photourl};
		let result=await UserUpdateUserMessage(newInfo);
		if(result.status==200){
			uni.showToast({
					icon:'success',
					title:'修改成功'
				})
		}
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