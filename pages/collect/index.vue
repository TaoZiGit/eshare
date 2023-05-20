<template>
	<view>
		<header>
			<u-icon name="arrow-left" size="20" style="margin-left: 5px;" @click="routeback"></u-icon>
			<view style="position: absolute;left:50%;transform: translateX(-50%);">收藏</view>
		</header>
		
		<view class="search-lists"  >
					<view class="search-item" @click="Todeatil(item.id)" v-for="item in list" :key="item.id">
						<view class="img" style="margin:16px;" :style="{ backgroundImage: 'url(' + item.photourl + ')' }">
							<view class="star">
								<u-icon name="star-fill" color="#fab005" size="14"></u-icon>
								<span style="line-height: 20px;padding-left: 2px;">{{item.goodsnum}}</span>
							</view>
						</view>
						<view style="display: flex;flex-direction: column;margin:16px;">
							 <view style="font-weight: 700;font-size: 16px;">
							 	{{item.title}}
							 </view>
							 <view style="font-size: 12px;width: 175px;">
								<p class="introduce">{{item.content}}</p>
							 </view>
							 <view style="margin-top: 12px;font-weight: 700;">
							 	￥{{  item.price.toFixed(2)}}
							 </view>
						</view>
					</view>
			</view>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import {ResourceCollections} from "@/api/resource.js"
	export default {
		data() {
			return {
				list:[],
				listinfo:{
					current:1,
					size:12,
					userid:"",
				}
			}
		},
		methods: {
			async getlist(){
				this.listinfo.userid=this.info.id
				let result=await ResourceCollections(this.listinfo)
				this.list=result.collectionsDataList;
			},
			Todeatil(id){
				console.log(id)
				uni.navigateTo({
				url:'/pages/detail/index?id='+id,
				  success: function () {
				    console.log('路由到其他页面成功');
				  }
				});
			},
			routeback(){
				uni.navigateBack({
					delta: 1, 
				});
			},
		},
		onLoad(){
			this.getlist()
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
	padding-bottom: 5px;
	
}
.search-lists{
		margin:22px 16px 0 16px;
		.search-item{
			background-color: #ffffff;
			border-radius: 12px;
			margin-bottom: 16px;
			height: 140px;
			display: flex;
			// align-items: center;
			.img{
				width: 108px;
				height: 108px;
				border-radius:12px;
				padding:8px;
			
				background-size: cover ;
				background-position: center;
				.star{
					display: flex;
					width: 43px;
					height: 20px;
					border-radius: 4px;
					background: rgba(0, 0, 0, 0.36);
					color: #fff;
					font-size: 12px;
				}
			}
			.introduce{
				margin-top: 10px; 
				color:rgba(31, 51, 73, 0.6);
				word-wrap: break-word;
				word-break: break-all;
				text-align: justify;
				overflow: hidden;
				text-overflow: ellipsis;display: -webkit-box;
				-webkit-line-clamp: 2; 
				-webkit-box-orient: vertical;
			}
		}
		
	}
</style>
