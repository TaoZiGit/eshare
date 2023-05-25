import api from './api.js'
export const CommentAll=async({ current, size, rid, ...rest })=>{
	let data={current, size, rid}
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

export const CommentAppend=async(data)=>{
	let result =await api({
		url:'/comment/append',
		method:'PUT',
		data,
	})
	return result
}

export const CommentGood=async(data)=>{
	let result =await api({
		url:'/comment/good',
		method:'POST',
		data,
	})
	return result
}
export const CommentDelete=async(data)=>{
	let result =await api({
		url:'/comment/delete',
		method:'DELETE',
		data,
	})
	return result
}


