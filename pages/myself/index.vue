<template>
	<view>
		<header>
			<view style="position: absolute;left:50%;transform: translateX(-50%);">个人中心</view>
		</header>
		<view style="border-radius: 8px;
	background: rgba(255, 255, 255, 1);width: 344px;margin: 0 auto;">
			<view style="display: flex;align-items: center;">
				<view style="margin: 6px;" >
					<u-avatar src="" size="50" ></u-avatar>
				</view>
				
				<view style="margin-left: 10px;">
					<view class="name">
						{{info.name?info.name:'用户'+info.email}}
					</view>
					<view class="adress">
						所在地：{{info.address?info.address:'暂无'}}
					</view>
				</view>
				<view class="setting flex-center" @click="ToAlter()">
					<u-icon name="setting-fill" size="16"  ></u-icon>
				</view>
			</view>
			<view class="introduce">
				{{info.description?info.description:'这个家伙很神秘，没有写个人简介'}}
			</view>
			<section class="buyandsell" style="margin: 0;">
				<ul>
					<li class="flex-center" @click="Tocollect()">
						<span>{{info.collectionsnum}}</span>
							<span>收藏</span>
					</li>
					<li class="flex-center">
						<span>{{info.followersnum}}</span>
						<span>关注</span>
					</li>
					<li class="flex-center">
						<span>{{info.myfollowersnum}}</span>
						<span>粉丝</span>
					</li>
				</ul>
			</section>
		</view>
		
		<section class="coin">
			<view class="coin-icon flex-center">
					<u-icon name="rmb-circle" size="16"></u-icon>
			</view>
			<view class="remaining" @click="Tomoney()">
				<view style="font-size: 18px;font-weight: 700;">
					{{info.money!==undefined?info.money.toFixed(2):0}}
				</view>
				<view style="font-size: 12px;font-weight: 400;color: rgba(31, 51, 73, 0.6);padding-top: 5px;"> 
					零钱余额
				</view>
			</view>
		</section>
		<section class="buyandsell">
			<ul>
				<li class="flex-center">
					<image src="../../static/img/待付款@2x.jpg" mode="">
						<span>我发布的</span>
					</image>
				</li>
				<li class="flex-center">
					<image src="../../static/img/待发货@2x.jpg" mode=""></image>
					<span>我买到的</span>
				</li>
				<li class="flex-center">
					<image src="../../static/img/待收货@2x.jpg" mode=""></image>
					<span>可下载的</span>
				</li>
			</ul>
		</section>
		<section class="other">
			<ul>
				<li>
					<image src="../../static/img/消息中心.jpg" mode=""></image>
					<span>我的收藏</span>
				</li>
				<li>
					<image src="../../static/img/我的喜欢.jpg" mode=""></image>
					<span>我的喜欢</span>
					
				</li>
				<li>
					<image src="../../static/img/联系管理员.jpg" mode=""></image>
					<span>联系管理员</span>
				</li>
			</ul>
		</section>
	</view>
</template>

<script>
	import{UserGetUserMessage} from "@/api/user.js"
	import {mapState} from "vuex";
import { getToken } from "../../utils/Token";
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			async getuserList() {
				let result = await UserGetUserMessage(getToken());
			},
			ToAlter(){
				uni.navigateTo({
					url:'/pages/myself/alter'
				})
			},
			Tocollect(){
				uni.navigateTo({
					url:'/pages/collect/index'
				})
			},
			Tomoney(){
				uni.navigateTo({
					url:'/pages/money/index'
				})
			}
			
		},
		onLoad() {
			if(!this.token){
				this.getuserList()
			}
			console.log(this.info,this.token)
		},
		computed: {
			...mapState({
				token: (state) => state.user.token,
				info: (state) => state.user.info,
			}),
		},
	}
</script>

<style lang="scss" scoped>
header{
	width: 375px;
	height: 70px;
	display: flex;
	align-items: flex-end;
	font-weight: 700;
	position: relative;
	background-color: #ffffff;
}
.name{
	font-weight: 700;
	margin-bottom: 4px;
}
.adress{
	font-size: 12px;
	font-weight: 400;
	color: rgba(31, 51, 73, 0.6);
}
.setting{
	width: 38px;
	height: 38px;
	border-radius: 36px;
	background: rgba(255, 195, 0, 1);
	margin-left: auto;
	margin-right:16px;
}
.introduce{
	padding: 10px 10px 0 10px;
	overflow-wrap: break-word;
	font-size: 14px;
}
.coin{
	left: 15px;
	top: 185px;
	width: 344px;
	height: 73px;
	border-radius: 8px;
	background: rgba(255, 255, 255, 1);
	margin: 0 auto;
	margin-top: 13px;
	display: flex;
	align-items: center;
	.coin-icon{
		width: 28px;
		height: 28px;
		background: rgba(255, 189, 39, 1);
		border-radius: 100%;
		margin:0 16px;
	}
}
.buyandsell{
	width: 343px;
	height: 90px;
	opacity: 1;
	border-radius: 8px;
	background: rgba(255, 255, 255, 1);
	margin: 16px auto;
	ul{
		display: flex;
		align-items: center;
		justify-content: center;
		height: inherit;
		li{
			flex:1;
			height: inherit;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			&:not(:nth-child(1))::before{
				content: "";
				position: absolute;
				left:0;
				width: 1px;
				height: 50%;
				background-color:rgba(31, 51, 73, 0.05);
			}
			image{
				width: 24px;
				height: 24px;
				margin-bottom: 4px;
			}
		}
	}
}
.other{
	width: 343px;
	border-radius: 8px;
	background: rgba(255, 255, 255, 1);
	margin: 16px auto;
	li{
		width: 319px;
		height: 56px;
		margin: 0 auto;
		border-bottom: 1px solid rgba(31, 51, 73, 0.05);
		display: flex;
		align-items: center;
		image{
			width: 20px;
			height: 20px;
			margin-bottom: 4px;
			margin-right: 10px;
		}
	}
}
</style>
