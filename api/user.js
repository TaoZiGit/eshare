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
export const UserLoginByPassword=async(data)=>{
	let result =await api({
		url:'/user/loginByPassword',
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
	store.state.token=getToken()
	store.state.info= JSON.parse(JSON.stringify(result.data))
	return result
}
export const UserUpdateUserMessage=async(data)=>{
	let result =await api({
		url:'/user/updateUserMessage',
		method:'POST',
		data,
		headers:{token:getToken()},
	})
	return result
}
export const PayAdd=async(data)=>{
	
	let result =await api({
		url:'/pay/add',
		method:'PUT',
		data,
		headers:{token:getToken()},
	})
	UserGetUserMessage()
	return result
}
export const PayGet=async(data)=>{
	
	let result =await api({
		url:'/pay/get',
		method:'POST',
		data,
		headers:{token:getToken()},
	})
	UserGetUserMessage()
	return result
}
