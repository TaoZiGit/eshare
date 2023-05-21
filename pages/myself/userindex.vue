<template>
	<view>
		<header>
			<u-icon name="arrow-left" size="20" style="margin-left: 5px;" @click="routeback"></u-icon>
		</header>
		<view class="nav"></view>
		<view class="UserInfo">
			<view class="first">
				<view class="avator">
					<u-avatar src="" size="70"></u-avatar>
				</view>
				<view class="nameandupdatetime">
					<view class="name">
						estrella
					</view>
					<view class="updatetime">
						23小时前来过
					</view>
				</view>
			</view>
			<view class="introduce">
				<uni-section :title="`简介:${intro}`" type="line" style="padding: 10px;width: 360px;"></uni-section>
			</view>
			<view class="setting">
				<view class="left">
					<span>557</span>关注
					<span>2260</span>粉丝
				</view>
				<view class="focus">
					<u-icon name="plus" size="13" color="rgba(0, 0, 0, 1)"></u-icon>
					<span>&nbsp;关注</span>
				</view>
			</view>
			<u-divider></u-divider>
			1
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				intro: "1123123",
			}
		},
		methods: {
			routeback() {

				uni.navigateBack({
					delta: 1,
				});
			},
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
		background-color: #555360;
		padding-bottom: 5px;
	}

	.nav {
		background-color: #555360;
		height: 100px;
	}

	.UserInfo {
		background-color: #fff;

		.first {
			position: relative;
			display: flex;
			width: 375px;
			padding: 0 15px;
			z-index: 10;

			.avator {
				position: absolute;
				top: -30px;
				border: 3px solid #fff;
				border-radius: 100%;
			}

			.nameandupdatetime {
				margin-left: 80px;

				.name {
					font-size: 20px;
					font-weight: 700;
				}

				.updatetime {
					font-size: 12px;
					color: #aba9ac;
				}
			}
		}

		.introduce {
			width: 375px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			overflow: hidden;
			word-break: break-all;
			/* break-all(允许在单词内换行。) */
			text-overflow: ellipsis;
			/* 超出部分省略号 */
			display: -webkit-box;
			/** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical;
			/** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 2;

			span {
				margin-right: 15px;
			}
		}

		.setting {
			margin: 0 7px;
			font-size: 15px;
			display: flex;
			justify-content: space-between;
			.left{
				span {
					padding: 8px;
					font-size: 16px;
					font-weight: 700;
					height: 15px;
				}
			}
			.focus {
				width:80px;
				height: 30px;
				border-radius:20px;
				background:#fbe750;
				display: flex;
				justify-content: center;
				align-items: center;
			
				span {
					padding-left: 3px;
					font-size: 13px;
					color: rgba(0, 0, 0, 0.86);
					font-weight: 700;
				}
			
				margin-right: 23px;
			}
		}
	}
</style>