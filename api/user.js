import api from './api.js'
import {getToken} from '@/utils/Token.js'
import store from '@/store/user.js'
export const getCode=async(data)=>{
	let result =await api({
		url:'/user/checkCode',
		method:'PUT',
		data,
	})
	return result
}

export const Login=async(data)=>{
	let result =await api({
		url:'/user/login',
		method:'POST',
		data,
	})
	return result
}

export const UserGetUserMessage=async()=>{
	let result =await api({
		url:'/user/getUserMessage',
		method:'GET',
		headers:{token:getToken()},
	})
	store.state.info=result.data
	return result
}
