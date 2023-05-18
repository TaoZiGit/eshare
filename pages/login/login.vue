<template>
	<view>
	<view class="title">
		<h1>你好呀</h1>
		<h1 style="color: rgba(250, 176, 5, 1);">欢迎回来！</h1>
		<view style="margin-top: 6px;font-size: 20px;">
			大学资源闲置？来e享圈！
		</view>
	</view>
	<view class="email">
		邮箱号：
		<input type="text" v-model="email">
	</view>
	<view class="checkCode" >
		验证码：
		<view style="display: flex;align-items: center;justify-content: space-between;">
				<input type="text" v-model="checkcode">
				<button  @click="getCode()" :disabled="checkcodetime==0?false:true" :class="checkcodetime==0?'':'disabled'">发送验证码<span v-show="checkcodetime!==0">{{checkcodetime}}</span></button>
		</view>
	
	</view>
	<button style="border-radius: 6px;
background: rgba(250, 176, 5, 1);
box-shadow: 0px -2px 4px 0px rgba(214, 214, 214, 0.25);width: 345px;margin: 20px auto;color: #fff;" @click="login()">登录</button>
<view class="tores" @click="Tores()">
	还没有账号？<span>点击开始注册</span>
</view>
	</view>
</template>

<script>
import {getCode,Login} from '@/api/user.js'
import {emailRegex} from '@/utils/regular.js'
import {setToken,getToken} from '@/utils/Token.js'
	export default {
		data() {
			return {
				email:'444186682@qq.com',
				checkcodetime:0,
				checkcode:"",
			}
		}, 
		methods:{
			Tores(){
				uni.navigateTo({
					url:'/pages/resgister/resgister'
				})
			},
			countdown(){
				if(this.checkcodetime==0){
					clearInterval(countdownTimer)
				}
				this.checkcodetime--;
			},
			async getCode(){
				if(emailRegex(this.email)){
					let result=await getCode({email:this.email});
					this.checkcodetime=120;
					let countdownTimer = setInterval(this.countdown, 1000);
				}
				else{
					uni.showToast({
						title:'邮箱格式错误',
						icon:'error'
					})
				}
			},
			async login(){
				let result=await Login({email:this.email,checkCode:this.checkcode.trim()})
				console.log(result)
				setToken(result.data)
				uni.showToast({
					title:'登录成功',
					icon:'success'
				})
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.disabled{
	border-color: #f3d19e !important;
	background-color: #f3d19e !important; 
}
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
