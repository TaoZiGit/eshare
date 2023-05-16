<template>
	<view>
	<view class="title">
		<h1>你好呀</h1>
		<h1 style="color: rgba(250, 176, 5, 1);">欢迎加入！</h1>
		<view style="margin-top: 6px;font-size: 20px;">
			大学资源闲置？来e享圈！
		</view>
	</view>
	<view class="email">
		邮箱号：
		<input type="text" v-model="email">
	</view>
	<view class="checkCode">
		验证码：
		<view style="display: flex;align-items: center;justify-content: space-between;">
				<input type="text" >
				<button @click="getCode()">发送验证码</button>
		</view>
	</view>
	<button style="border-radius: 6px;
background: rgba(250, 176, 5, 1);
box-shadow: 0px -2px 4px 0px rgba(214, 214, 214, 0.25);width: 345px;margin: 20px auto;color: #fff;" @click="resgister()">注册</button>
<view class="tores" @click="ToLogin()">
	已有账号？<span>点击登录</span>
</view>
	</view>
</template>

<script>
import {getCode} from '@/api/user.js'
import {emailRegex} from '@/utils/regular.js'
export default {
	data() {
		return {
			email:'444186682@qq.com',
		}
	}, 
	methods:{
		ToLogin(){
			uni.navigateTo({
				url:'/pages/login/login'
			})
		},
		async getCode(){
			if(emailRegex(this.email)){
				let result=await getCode(this.email)
			}
			else{
				uni.showToast({
					title:'邮箱格式错误',
					icon:'error'
				})
			}
		},
		resgister(){
			
		}
	}
}
</script>

<style lang="scss" scoped>
.title{
	margin: 68px 16px 6px 16px;
	h1{
		font-size: 48px;
	}
}
.email,.checkCode{
	margin: 10px 16px 6px 18px;
	input{
		width: 339.5px;
		height: 48px;
		border: 1px solid #000;
		border-radius: 6px;
		padding: 10px 10px 10px 10px;
		margin-top: 3px;
	}
}
.checkCode{
	input{
		width: 206px;
		height: 48px;
	}
	button{
		width: 123px;
		height: 40px;
		border-radius: 6px;
		background: rgba(250, 176, 5, 1);
		box-shadow: 0px -2px 4px 0px rgba(214, 214, 214, 0.25);
		color: #fff;
		line-height: 40px;
	}
}
.tores{
	margin: 36px auto;
	text-align: center;
	span{
		color: rgba(255, 195, 0, 0.92);
	}
}
</style>
