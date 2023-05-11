import api from './api.js'
export const getindex=async(data)=>{
	let result =await api({
		url:'/resource/all',
		method:'GET',
		data,
	})
	return result
}
