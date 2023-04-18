<template>
	<view class="">
		<view class="header">
			<view class="search">
				<view class="search-input">
					<u-input v-model="sarchvalue" type="text" placeholder="搜索想要的资源" border="true" style="background-color: #fff;border-radius: 12px;" />
					<view class="searchbtn">搜索</view>
			
				</view>
			</view>
		</view>
		<view class="nav">
			<ul class="flex-center" style="gap:12px;">
				<li   :class="currentTab==index ? 'active' : ''" v-for="(item,index) in sortbtn" :key="index" @click="changesearch(index)">{{item.text}}</li>
			</ul>
		</view>
			<view class="search-lists">
				<view class="search-item">
					<view class="img" style="margin-top:16px;">
						<view class="star">
							<u-icon name="star-fill" color="#fab005" size="14"></u-icon>
							<span style="line-height: 20px;padding-left: 2px;">12</span>
						</view>
					</view>
					<view style="display: flex;flex-direction: column;margin:16px;">
						 <view style="font-weight: 700;font-size: 16px;">
						 	全新倍思wm02白色
						 </view>
						 <view style="font-size: 12px;width: 175px;">
							<p class="introduce">送耳机套壳，心动不如行动，可以小刀，感兴趣的话点“我想要阿斯啊蒂芬</p>
						 </view>
						 <view style="margin-top: 12px;font-weight: 700;">
						 	￥85.0
						 </view>
					</view>
				</view>
				
				<view class="search-item">
					<view class="img">
						
					</view>
					1
				</view>
			</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello1',
				sarchvalue:"",
				sortbtn:[{type:'default',text:'默认排序'},{type:'default',text:'按点赞排序'},{type:'default',text:'按收藏数排序'}],
				currentTab:0
			}
		},
		onLoad() {

		},
		methods: {
			changesearch(index){
				this.currentTab=index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header{
		width: 375px;
		display:flex;
		flex-direction: column;
		align-items: center;
		.search{
			width: 315px;
			height: 42px;
			margin:44px 25px 5px 26px;
		
			position: relative;
			.searchbtn{
				position: absolute;
				right:15px;
				top:7px;
				width: 68px;
				height: 25px;
				background-color: #ffc300;
				border-radius: 12.75px;
				display: flex;
				justify-content: center;
				margin: 0 auto;
				font-size: 16px;
			}
		}
		
		.category{
			width: 80%;

			.lists{
				ul{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					li{
						background-color: #fffef2;
						width: 147px;
						height: 125px;
						display: flex;
						justify-content: center;
						align-items: center; 
						border-radius: 14px;
					}
				}
			}
		}
	}
	.nav{
		margin-top: 7px;
		ul{
			li{
				height: 41px;
				border-radius: 8px;	
				padding: 10px 12px;
				background-color: #ffffff;
			
			}
		}
	}
	.active{
		background: rgba(255, 195, 0, 1) !important;
		box-shadow: 0px 6px 14px 0px rgba(255, 195, 0, 0.4);
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
				background: url(https://img.js.design/assets/img/62e4f02866bc4d7b9bbffc79.jpg) no-repeat;
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
