<template>
	<div class="header">
		<view class="search">
			<view class="search-input">
				<input type="text" name="" id="">
				<view>搜索</view>
		
			</view>
			<view>筛选</view>
		</view>
		<view class="category">
			<view class="category-top">
				<h1>热门共享校园资源</h1>
				<view class="">
					其他
				</view>
			</view>
			<view class="lists">
				<ul>
					<li>闲置服饰</li>
					<li>交通工具</li>
					<li>电子产品</li>
					<li>学习资源</li>
				</ul>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello1'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.header{
		width: 750rpx;
		height: 504rpx;
		background-color: #ffc300;
		clip-path: inset(0% 0% 0% 0% round 0% 0% 20% 20%);
		display:flex;
		flex-direction: column;
		align-items: center;
		.category{
			width: 80%;
			background-color: #f0f0f0;
		}
	}
</style>
