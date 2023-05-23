import api from './api.js'
import upload from './upload.js'
import {getToken} from '@/utils/Token.js'
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
		url:'/resource/detail',
		method:'GET',
		data,
		headers:{token:getToken()},
	})
	return result
}
export const ResourceInfo=async(data)=>{
	let result =await api({
		url:'/resource/info',
		method:'GET',
		data,
		headers:{token:getToken()},
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
export const ResourceAdd=async(data)=>{
	let result =await api({
		url:'/resource/add',
		method:'POST',
		data,
	})
	return result
}
export const ResourceGood=async(data)=>{
	let result =await api({
		url:'/resource/good',
		method:'POST',
		data,
	})
	return result
}
export const ResourceCollect=async(data)=>{
	let result =await api({
		url:'/resource/collect',
		method:'POST',
		data,
	})
	return result
}
export const ResourceUserall=async(data)=>{
	let result =await api({
		url:'/resource/userall',
		method:'GET',
		data,
	})
	return result
}
export const ResourceUpdate=async(data)=>{
	let result =await api({
		url:'/resource/update',
		method:'PUT',
		data,
	})
	return result
}

