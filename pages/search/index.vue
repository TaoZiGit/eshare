<template>
	<view class="">
		<header>
			<u-icon name="arrow-left" size="20" style="margin-left: 5px;" @click="routeback"></u-icon>
			<view style="position: absolute;left:50%;transform: translateX(-50%);">搜索</view>
		</header>
		<view class="header">
			<view class="search">
				<view class="search-input">
					<u-input v-model="sarchvalue" type="text" placeholder="搜索想要的资源" border="true" style="background-color: #fff;border-radius: 12px;" />
					<view class="searchbtn" @click="Tosearch()">搜索</view>
				</view>
			</view>
		</view>
		<view class="nav">
			<ul class="flex-center" style="gap:12px;">
				<li   :class="currentTab==index ? 'active' : ''" v-for="(item,index) in sortbtn" :key="index" @click="changesearch(index)">{{item.text}}</li>
			</ul>
		</view>
		<Lists :list="searchlist" />
	</view>
	
</template>

<script>
	import {ResourceSearch} from '@/api/resource.js'
	import Lists from '@/components/rescourelist.vue'
	export default {
		components: {
			Lists
		},
		data() {
			return {
				title: 'Hello1',
				sarchvalue:"",
				sortbtn:[{type:'default',text:'默认排序'},{type:'default',text:'按点赞排序'},{type:'default',text:'按收藏数排序'}],
				currentTab:0,
				searchinfo:{
					current:1,
					size:10,
					type:0,
					order:0,
					search:"",
				},
				searchlist:[],
			}
		},
		onLoad(option) {
			this.searchinfo={...this.searchinfo,...option}
			this.getlist();
		},
		methods: {
			routeback() {
				uni.navigateBack({
					delta: 1,
				});
			},
			Tosearch(){
				this.searchinfo.search=this.sarchvalue;
				this.searchinfo.current = 1;
				this.searchlist = [],
				this.getlist();
			},
			changesearch(index){
				this.currentTab=index;
				this.searchinfo.type=index;
				this.searchinfo.current = 1;
				this.searchlist = [],
				this.getlist();
			},
			async getlist(){
				let result=await ResourceSearch(this.searchinfo)
				this.searchlist=[...this.searchlist,...result.data.resourcesList]
			}
		}
	}
</script>

<style lang="scss" scoped>
	header {
		width: 375px;
		height: 70px;
		display: flex;
		align-items: flex-end;
		font-weight: 700;
		position: relative;
		background-color: #ffffff;
		padding-bottom: 5px;
	}
	.header{
		width: 375px;
		display:flex;
		flex-direction: column;
		align-items: center;
		.search{
			width: 340px;
			height: 42px;
			margin:10px 25px 0 26px;
		
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
