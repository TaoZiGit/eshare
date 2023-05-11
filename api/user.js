import api from './api.js'
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
