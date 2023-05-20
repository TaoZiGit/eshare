const upload=(Option)=>{
	let baseURL='http://47.115.220.70:8082'
	let url=baseURL+Option.url;
	if (Option.data) {
	  url+='?'+Object.keys(Option.data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(Option.data[key])).join('&')
	} 
	return new Promise((resolve,reject)=>{
		uni.showLoading({
			title:'加载中'
		})	
		uni.request({
			url,
			method:Option.method||'GET',
			header:Option.headers,
			// data:Option.data,
			success:res=>{
				uni.hideLoading()
				if(res.data.status==200)
					resolve(res.data)
				else{
					uni.showToast({
						title:res.data.message,
						icon:'error'
					})
					reject(res.data.message)
				}
			},
			fail:err=>{
				uni.showToast({
					title:'请求接口失败',
					icon:'error'
				})
				reject(err)
			}
		})
	})
	
}
export default upload