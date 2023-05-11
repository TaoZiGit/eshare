<template>
	<view>
		<header>
			<u-icon name="arrow-left" size="20" style="margin-left: 5px;"></u-icon>
			<view style="position: absolute;left:50%;transform: translateX(-50%);">消息中心</view>
		</header>
	<view style="margin-top: 19px;">
		<ul>
			<li>
				<u-avatar src="https://img.js.design/assets/smartFill/img322164da746310.jpg" size="48">
				</u-avatar>
				
			</li>
			<li>2</li>
		</ul>
	</view>
	<view class="kefu">
		<u-icon name="kefu-ermai" size="15" style="margin:0 10px;"></u-icon>
		我的客服
	</view>
	</view>
	
</template>

<script>
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
header{
	width: 375px;
	height: 44px;
	display: flex;
	align-items: center;
	font-weight: 700;
	position: relative;
	
}
.kefu{
	display: flex;
	align-items: center;
	border-radius: 12.75px;
	width: 100.5px;
	height: 25px;
	border: 0.5px solid rgba(0, 0, 0, 0.3);          
	position: fixed;
	bottom:55px;
	left: 50%;
	transform: translateX(-50%);
	font-size: 12px;
	color: rgba(0, 0, 0, 0.4);
}
ul{
	li{
		width: 341px;
		background-color: pink;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}
}
</style>
