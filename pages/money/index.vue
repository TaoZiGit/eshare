<template>
	<view>
		<header>
			<u-icon name="arrow-left" size="20" style="margin-left: 5px;" @click="routerback"></u-icon>
			<view style="position: absolute;left:50%;transform: translateX(-50%);">零钱余额</view>
		</header>
		<section class="coin">
			
			<view class="remaining">
				<view style="font-size: 18px;font-weight: 700;display: flex;">
					<view class="coin-icon  flex-center">
							<u-icon name="rmb-circle" size="16"></u-icon>					
					</view>
					零钱余额
				</view>
				<view style="padding:23px 16px;font-size: 24px; font-weight: 700;display: flex;justify-content: space-between;width:inherit">
					￥{{info.money!==undefined?info.money.toFixed(2):0.00}}
				</view>
			</view>
			
		</section>
		<section class="recharge">
			<view class="recharge-header">
				提现
			</view>
			<ul>
				<li class="flex-center" v-for="(item,index) in list.slice(6)" :key="index" :class="currentIndex==index&&currenttpye==0?'active':''" @click="currentIndex=index;currenttpye=0">提现{{item}}元</li>
			</ul>
		</section>
		<section class="recharge">
			<view class="recharge-header">
				充值
			</view>
			<ul>
				<li class="flex-center" v-for="(item,index) in newList" :key="index" :class="currentIndex==index&&currenttpye==1?'active':''" @click="currentIndex=index;currenttpye=1">充值{{item}}元</li>
			</ul>
		</section>
		<view class="recharge-btn" @click="RechargeBtn()">
			立即{{currenttpye?'充值':'提现'}}
		</view>
		<uni-popup ref="popup" type='center'>
			<uni-popup-dialog type="dialog" cancelText="关闭" confirmText="充值"  :content="`确定${currenttpye?'充值':'提现'}${list[currentIndex]}元吗`" @confirm="dialogConfirm" @close="dialogClose" v-if="currenttpye==1"></uni-popup-dialog>
			<uni-popup-dialog ref="inputClose"  mode="input" title="请输入密码" value="" placeholder="请输入密码" @confirm="dialogConfirm" v-else style="outline: none;"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import {PayAdd,UserGetUserMessage,PayGet} from '@/api/user.js'
	export default {
		data() {
			return {
				list:[10,30,50,70,100,200,10,30,50,70,100,200],
				currenttpye:0,
				currentIndex:0,
			}
		},
		methods: {
			RechargeBtn(){
				this.$refs.popup.open('center');
			},
			async dialogConfirm(val){
				let result;
				if(this.currenttpye){
					result=await PayAdd({userid:this.info.id,money:this.list[this.currentIndex]})
					
				}
				else{
					result=await PayGet({userid:this.info.id,money:this.list[this.currentIndex],password:val})
				}
				if(result.status==200){
					uni.showToast({
						icon:'success',
						title:result.data
					})
				}
			},
			dialogClose(){
				
			},
			routerback(){
				uni.navigateBack({
					delta: 1, 
				});
			},
		},
		computed: {
			newList() {
			      return this.list.slice(0, this.list.length - 6);
			},
			...mapState({
				token: (state) => state.user.token,
				info: (state) => state.user.info,
			}),
		},
	}
</script>

<style lang="scss" scoped>
.uni-dialog-input{
	outline: none !important;
}
header{
	width: 375px;
	height: 70px;
	display: flex;
	align-items: flex-end;
	font-weight: 700;
	position: relative;
	background-color: #ffffff;
}
.coin{
	left: 15px;
	top: 185px;
	width: 344px;
	border-radius: 8px;
	background: #f7f1e0;
	margin: 0 auto;
	margin-top: 13px;
	display: flex;
	align-items: center;
	.remaining{
		margin-top: 16px;
		width: inherit;
		.deposit{
			font-size: 16px;
			color: #fff;
			width: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 20px;
			background-color:#ffc300;
		}
	}
	.coin-icon{
		width: 28px;
		height: 28px;
		background: rgba(255, 189, 39, 1);
		border-radius: 100%;
		margin:0 16px;
	}
}
.recharge{
	width: 344px;
	border-radius: 8px;
	background-color: #ffffff;
	margin: 16px auto;
	.recharge-header{
		padding: 20px;
		font-weight: 700;
	}
	ul{
		display:flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		li{
			width: 91px;
			height: 41px;
			margin:0 10px 10px 0; 
			background: rgba(250, 250, 250, 1);
			border-radius: 8px;
		}
		
	}
}
.recharge-btn{
	position: fixed;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 345px;
	height: 55px;
	border-radius: 27.5px;
	background: rgba(255, 195, 0, 1);
	box-shadow: 0px 6px 14px 0px rgba(255, 195, 0, 0.4);
	margin: 0 auto;
	color: #fff;
}
.active{
	background: rgba(255, 195, 0, 0.05) !important;
	border: 1px solid rgba(255, 195, 0, 1);

}
</style>
