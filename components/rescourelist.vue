<template>
	<view class="search-lists">	
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
</template>

<script>
	export default{
		data() {
			return {
			
			}
		},
		props:{
			list:{
				type: Array,
				default: ()=>[]
			}
		},
		methods: {
			Todeatil(id){
				console.log(id)
				uni.navigateTo({
				url:'/pages/detail/index?id='+id,
				  success: function () {
				    console.log('路由到其他页面成功');
				  }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
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