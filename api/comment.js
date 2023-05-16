import api from './api.js'
export const CommentAll=async(data)=>{
	let result =await api({
		url:'/comment/all',
		method:'GET',
		data,
	})
	return result
}

export const CommentAdd=async(data)=>{
	let result =await api({
		url:'/comment/add',
		method:'PUT',
		data,
	})
	return result
}

