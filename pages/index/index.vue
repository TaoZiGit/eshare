<template>
	<view class="">
		<view class="header">
			<view class="search">
				<view class="search-input">
					<u-input v-model="searchvalue" type="text" placeholder="搜索想要的资源" border="true"
						style="background-color: #fff;border-radius: 12px;" />
					<view class="searchbtn" @click="Tosearch(searchvalue)">搜索</view>

				</view>
			</view>
			<view class="category">
				<view class="lists">
					<ul>
						<li style="margin-right: 20px;">
							<view class="flex-center" style="flex-direction: column;">
								<h3 style="font-size:20px font-weight:700">非电子类资源</h3>
								<image src="../../static/img/unelectronic.jpg" mode="scaleToFill"
									style="width: 75px;height: 63px;"></image>
							</view>
						</li>
						<li>
							<view class="flex-center" style="flex-direction: column;">
								<h3 style="font-size:20px font-weight:700">电子类资源</h3>
								<image src="../../static/img/electronic.jpg" mode="scaleToFill"
									style="width: 66px;height: 63px;"></image>
							</view>
						</li>
					</ul>
				</view>
			</view>
		</view>
		<view class="nav">
			<ul class="flex-center" style="gap:12px;">
				<li :class="currentTab==index ? 'active' : ''" v-for="(item,index) in sortbtn" :key="index"
					@click="changesearch(index)">{{item.text}}</li>
			</ul>
		</view>
		<Lists :list="indexlist" />
	</view>

</template>

<script>
	import {
		setToken,
		getToken,
		removeToken
	} from "@/utils/Token.js"
	import Lists from '@/components/rescourelist.vue'
	import {
		getindex
	} from '@/api/resource.js'
	import {
		UserGetUserMessage
	} from '@/api/user.js'
	import {
		mapState
	} from "vuex";
	export default {
		components: {
			Lists
		},
		data() {
			return {
				title: 'Hello1',
				searchvalue: "",
				sortbtn: [{
					type: 'default',
					text: '默认排序'
				}, {
					type: 'default',
					text: '按点赞排序'
				}, {
					type: 'default',
					text: '按收藏数排序'
				}],
				currentTab: 0,
				pagelist: {
					current: 1,
					size: 3,
					type: 0,
					order:0,
				},
				indexlist: [],
			}
		},
		onLoad() {
			this.getuserList()
			this.getlist()

		},
		onReachBottom() {
			this.pagelist.current++;
			this.getlist();
		},
		methods: {
			changesearch(index) {
				this.currentTab = index;
				this.pagelist.type = index;
				this.pagelist.current = 1;
				this.indexlist = [],
					this.getlist();
			},
			Todeatil(id) {
				uni.navigateTo({
					url: `'/pages/detail/index?rid=${id}'`, // 路由的页面路径
					success: function() {
						console.log('路由到其他页面成功');
					}
				});
			},
			async getuserList() {
				let result = await UserGetUserMessage(this.token);
			},
			async getlist() {
				let result = await getindex(this.pagelist);
				if (result.data.current * result.data.size - 1 > result.data.total) {
					result.current--;
					uni.showToast({
						title: '已经到底了~',
						icon: 'error'
					})
				} else this.indexlist = [...this.indexlist, ...result.data.resourcesList];
				console.log(result)
			},
			Tosearch(vaule){
				console.log(vaule)
			}
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
	.header {
		height: 504rpx;
		background-color: #ffc300;
		clip-path: polygon(0 0, 100% 0, 100% 93%, 50% 100%, 0 93%);
		;
		display: flex;
		flex-direction: column;
		align-items: center;

		.search {
			width: 315px;
			height: 42px;
			margin: 44px 25px 5px 26px;

			position: relative;

			.searchbtn {
				position: absolute;
				right: 15px;
				top: 7px;
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

		.category {
			width: 80%;

			.lists {
				ul {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					li {
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

	.nav {
		margin-top: 7px;

		ul {
			li {
				height: 41px;
				border-radius: 8px;
				padding: 10px 12px;
				background-color: #ffffff;

			}
		}
	}

	.active {
		background: rgba(255, 195, 0, 1) !important;
		box-shadow: 0px 6px 14px 0px rgba(255, 195, 0, 0.4);
	}
</style>