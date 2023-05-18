import api from './api.js'
export const getindex=async(data)=>{
	let result =await api({
		url:'/resource/all',
		method:'GET',
		data,
	})
	return result
}
export const getDeatil=async(data)=>{
	let result =await api({
		url:'/resource/info',
		method:'GET',
		data,
	})
	return result
}

export const TfileUpload=async(data)=>{
	let result =await api({
		url:'/tfile/upload',
		method:'POST',
		data,
	})
	return result
}
