<template>
	<view>
		<header>
			<u-icon name="arrow-left" size="20" style="margin-left: 5px;" @click="routeback"></u-icon>
			<view style="position: absolute;left:50%;transform: translateX(-50%);">我的购买</view>
		</header>
		<view class="nav">
			<ul class="flex-center" style="gap:12px;">
				<li :class="currentTab==index ? 'active' : ''" v-for="(item,index) in sortbtn" :key="index"
					@click="changesearch(index)">{{item.text}}</li>
			</ul>
		</view>
		<Lists :list="list" v-if="!currentTab" />
		<view v-else >
			<view class="uplaodfiles" @click="ReadFile(file)" v-for="(file,index) in uploadlist" :key="index">
				<view class="">
					{{file.name}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import {
		HistoryAll
	} from "@/api/user.js"
	import Lists from '@/components/buylist.vue'
	export default {
		components: {
			Lists
		},
		data() {
			return {
				uploadlist: uni.getStorageSync("uploadlist"),
				list: [],
				listinfo: {
					current: 1,
					size: 10,
					userid: "",
				},
				currentTab: 0,
				sortbtn: [{
					type: 'default',
					text: '可下载资源'
				}, {
					type: 'default',
					text: '已下载资源'
				}],
			}
		},
		methods: {
			changesearch(index) {
				this.currentTab = index;
			},
			async getlist() {
				this.listinfo.userid = this.info.id
				let result = await HistoryAll(this.listinfo)
				this.list = result.data.datalist;
			},
			Todeatil(id) {
				uni.navigateTo({
					url: '/pages/detail/index?id=' + id,
					success: function() {
						console.log('路由到其他页面成功');
					}
				});
			},
			routeback() {
				uni.navigateBack({
					delta: 1,
				});
			},
			ReadFile(item) {
				console.log(item)
				uni.openDocument({
					filePath: item.path,
				})
			},

		},
		onLoad() {
			this.getlist()
			let _this = this
			uni.$on("updateupload", function(data) {
				_this.uploadlist = uni.getStorageSync("uploadlist")
				console.log(_this.uploadlist)
			})
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

	.nav {
		margin-top: 7px;
		width: 330px;
		margin: 10px auto;

		ul {
			li {
				text-align: center;
				flex: 1;
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

	.uplaodfiles {
		padding: 10px;
		width: 330px;
		height: 60px;
		align-items: center;
		margin: 20px auto;
		display: flex;
		justify-content: space-between;
		border: 1px #eee solid;
		border-radius: 5px;
		background: #fff;

	}

	.search-lists {
		margin: 22px 16px 0 16px;

		.search-item {
			background-color: #ffffff;
			border-radius: 12px;
			margin-bottom: 16px;
			height: 140px;
			display: flex;

			// align-items: center;
			.img {
				width: 108px;
				height: 108px;
				border-radius: 12px;
				padding: 8px;

				background-size: cover;
				background-position: center;

				.star {
					display: flex;
					width: 43px;
					height: 20px;
					border-radius: 4px;
					background: rgba(0, 0, 0, 0.36);
					color: #fff;
					font-size: 12px;
				}
			}

			.introduce {
				margin-top: 10px;
				color: rgba(31, 51, 73, 0.6);
				word-wrap: break-word;
				word-break: break-all;
				text-align: justify;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}

	}
</style>