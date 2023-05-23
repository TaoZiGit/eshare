<template>
	<view style="position: relative;">
		<view class="routeback" @click="routeback">
			<u-icon name="arrow-left" size="16" color="#fff"></u-icon>
		</view>
		<uni-swiper-dot style=" height: 275px" :info="detailinfo.photourl" :current="current" field="0" @clickItem=clickItem
			mode="round">
			<swiper class="swiper-box" style="height: 275px" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item ,index) in detailinfo.photourl" :key="index"
					@click="previewImage(detailinfo.photourl,index)">
					<view class="swiper-item">
						<image :src="item" mode="scaleToFill" lazy-load style="width: 375px;height: 275px;">
						</image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="buylist">
			<image :src="detailinfo.photourl[0]" mode="scaleToFill" ></image>
			<view style="margin-left: 10px;">
				<view style="width: 200px;font-size: 14px; word-wrap: break-word;word-break: break-all;text-align: justify;">{{detailinfo.title}}</view>
				<view class="price">
					￥{{detailinfo.price}}
				</view>
			</view>
		</view>
		<view class="address">
			<view class="">
				数量
			</view>
			<view class="right" >
			<u-number-box v-model="num":max="detailinfo.num" bgColor="#eeeeee" @change="valChange"></u-number-box>
			</view>
		</view>
		<view class="address">
			<view class="">
				收货地址
			</view>
			<view style="display: flex; justify-content: flex-end;flex-direction: column;align-items: flex-end;" >
				<view style="font-weight: 700;">
					{{detailinfo.username}}  17707830245
				</view>
				<view style="width: 230px; white-space: nowrap; overflow: hidden;text-overflow: ellipsis;color:rgba(128, 128, 128, 1);font-size: 12px;margin-top: 5px;">
					{{detailinfo.location}}
				</view>
			</view>
		</view>
		<view class="botton">
			<view class="seller">
				实付款:
				<span>￥85.00</span>
			</view>
			<view class="buybtn flex-center">立即支付</view>
		</view>
	</view>

</template>

<script>
	import {
		getDeatil,
		ResourceGood,
		ResourceCollect
	} from '@/api/resource.js'
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				detailinfo:{
					
				},
				num:0,
				current: 0,
				swiperDotIndex: 0
			};
		},
		methods:{
			change(e) {
				this.current = e.detail.current
				console.log(this.current)
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			valChange(){
				
			},
			previewImage(imgs) {
				console.log(imgs)
			  uni.previewImage({
			  	urls: imgs,
			  });
			},
			async getdeatil(){
				let result=await getDeatil({rid: this.detailinfo.rid,userid: this.userinfo.id})
				this.detailinfo=result.data
				this.detailinfo.photourl = this.detailinfo.photourl.split(",")
			}
		},
		onLoad(option) {
			this.detailinfo.rid = option.id || 'be8a5570-5e61-422d-8bb3-7b0f410c1857'
			this.getdeatil();
		},
		computed: {
			...mapState({
				token: (state) => state.user.token,
				userinfo: (state) => state.user.info,
			}),
		},
		
	}
</script>


<style lang="scss" scoped>
	html{
		background-color: #fff;
	}
	.routeback{
		position: absolute;
		top: 35px;
		left:16px;
		z-index: 999;
		width: 34px;
		height: 34px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.buylist{
		margin: 10px;
		background-color: #fff;
		border-radius: 10px;
		display: flex;
		padding: 10px;
		position: relative;
		image{
			width: 100px;
			height: 100px;
			border-radius: 20px;
		}
		.price{
			position: absolute;
			bottom: 10px;
			right: 10px;
			color: rgba(255, 87, 51, 1);
			font-weight: 700;
		}
	}
	.address{
		margin: 10px;
		background-color: #fff;
		border-radius: 10px;
		display: flex;
		padding: 10px;
		justify-content: space-between;
		align-items: center;
	}
	.botton{
		width: 375px;
		height: 52px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px -2px 4px 0px rgba(214, 214, 214, 0.25);
		position: fixed;
		bottom:0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.seller{
			display: flex;
			align-items: center;
			font-size: 18px;
			margin-left: 10px;
			font-weight: 700;
			span{
				color: rgba(255, 87, 51, 1);
				font-size: 24px;
			}
		}
		.buybtn{
			width: 150px; 
			height: 40px;
			margin-right:16px;
			border-radius: 20px;
			font-size: 14px;
			color: #fff;
			background: #ff8d1a;
			box-shadow: 0px -2px 4px 0px rgba(214, 214, 214, 0.25);
			// border: 0;
			
		}
	}
</style>
