import api from './api.js'
import upload from './upload.js'
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
	let result =await upload({
		url:'/tfile/upload',
		method:'POST',
		data,
	})
	return result
}

export const ResourceCollections=async(data)=>{
	let result =await api({
		url:'/resource/collections',
		method:'GET',
		data,
	})
	return result
}
export const ResourceSearch=async(data)=>{
	let result =await api({
		url:'/resource/search',
		method:'GET',
		data,
	})
	return result
}
