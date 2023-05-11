<template>
<view class="content">
	<view class="pass" @click="Toindex()">
	跳过<span v-if="time==0?false:true">{{time}}</span>
	</view>		
	<view style="padding-left: 30px;">
			<h1 style="font-size: 56px; font-weight: 400;margin-top: 76rpx;">e享圈</h1>
			<view style="font-family:'华文楷体'; margin-top: 13px;font-size: 25px;font-weight: 600;">
				大学资源闲置？来e享圈！
			</view>
			<image src="../../static/img/Coopen_logo.jpg" style="width: 600rpx;height: 600rpx ;margin-top: 150rpx;"></image>
		</view>
		<view style="padding:0">
			<view style="font-size: 20px; font-weight: 300; text-align: center;margin-top: 200rpx;">
				黄氏集团旗下品牌
			</view>
			<view style="font-size: 15px; font-weight: 300; text-align: center;margin-top:12rpx ;">
				阿里云提供计算服务
			</view>
		</view>
	</view>

</template>

<script>
import { setToken,getToken,removeToken } from "@/utils/Token.js"
export default{
	data(){
		return {
			time:5
		}
	},
	methods:{
		Toindex(){
			console.log(1)
			uni.switchTab({
				url:"/pages/index/index"
			})
		}
	},
	onLoad(option){
		let _this=this
		let timer=setInterval(()=>{
			if(_this.time>0)
			_this.time--;
			else {
				clearInterval(timer)
				this.Toindex()
			}
		},1000)
	}
}
</script>

<style lang="scss" scoped>
	.content{
		width: 100wh;
		height: 100vh;
		display: flex;
		background-color: #ffc300;
		flex-direction: column;
		.pass{
			margin: 120rpx 0 0 20px;
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			width: 120rpx;
			color: #f0f0f0;
			font-size: 16px;
			text-align: center;
		}
	}
</style>