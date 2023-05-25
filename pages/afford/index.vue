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
						<image :src="item" mode="aspectFill" lazy-load style="width: 375px;height: 275px;">
						</image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="buylist">
			<image :src="detailinfo.photourl[0]" mode="aspectFill" ></image>
			<view style="margin-left: 10px;">
				<view style="width: 200px;font-size: 16px; word-wrap: break-word;word-break: break-all;text-align: justify;font-weight: 700;padding-left: 10px;">{{detailinfo.title}}</view>
				<view style="width: 200px;font-size: 14px; word-wrap: break-word;word-break: break-all;text-align: justify;padding:15px 10px; color: #ccc;">{{detailinfo.content}}</view>
				<view class="price">
					￥{{detailinfo.price}}
				</view>
			</view>
		</view>
		<view v-if="detailinfo.type==1">
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
						{{detailinfo.username}}  {{detailinfo.phone}}
					</view>
					<view style="width: 230px; white-space: nowrap; overflow: hidden;text-overflow: ellipsis;color:rgba(128, 128, 128, 1);font-size: 12px;margin-top: 5px;display: flex;justify-content: flex-end;">
						{{detailinfo.location}}
					</view>
				</view>
			</view>
		</view>
		<view class="buylist" style="flex-direction: column;" v-if="detailinfo.type==0">
			<view >
				可下载资源：
			</view>
			<view style="margin: 10px 0;" v-for="item in detailinfo.url " :key="item.url">
					{{item.name}}
			</view>
		
		</view>
		
		<view class="botton">
			<view class="seller">
				实付款:
				<span>￥{{detailinfo.price*(num?num:1)}}</span>
			</view>
			<view class="buybtn flex-center" @click="Buy()">立即支付</view>
		</view>
		<view class="">
			<uni-popup ref="popup"  type='center'>
				<uni-popup-dialog ref="inputClose"  mode="input" title="请输入密码"  inputType="password" placeholder="请输入密码" @confirm="dialogConfirm"  style="outline: none;"></uni-popup-dialog>
			</uni-popup>
		</view>
	
	</view>

</template>

<script>
	import {
		getDeatil,
		ResourceGood,
		ResourceCollect,
	} from '@/api/resource.js'
	import {PayBuy} from '@/api/user.js'
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				detailinfo:{photourl:[]},
				num:0,
				current: 0,
				swiperDotIndex: 0,
			};
		},
		methods:{
			routeback() {
				uni.navigateBack({
					delta: 1, 
				});
			},
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
				if(this.detailinfo.url)
				this.detailinfo.url=JSON.parse(this.detailinfo.url)
			},
			async Buy(){
				this.$refs.popup.open('center');
			},
			async dialogConfirm(val){
				console.log({
					userid:this.userinfo.id,
					rid:this.detailinfo.rid,
					num:this.num?this.num:1,
					password:val})
				let result=await PayBuy(
				{
					userid:this.userinfo.id,
					rid:this.detailinfo.rid,
					num:this.num?this.num:1,
					password:val})
				if(result.status==200){
					uni.showToast({
						icon:'success',
						title:result.data
					})
						this.$store.dispatch("paybuy",this.detailinfo.price*(this.detailinfo.num?this.detailinfo.num:1))
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1, 
						});
					},1000)
				
					
				}
			}
		},
		onLoad(option) {
			this.detailinfo.rid = option.id || '2bd0fadb-456a-46da-ae03-0ef027387739'
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
