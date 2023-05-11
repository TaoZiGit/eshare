<template>
	<view>
		<header>
			<u-icon name="arrow-left" size="20" style="margin-left: 5px;"></u-icon>
			<view style="position: absolute;left:50%;transform: translateX(-50%);">个人信息</view>
		</header>
		<view style="display: flex;align-items: flex-end;margin-left: 16px;">
				<u-avatar src="https://img.js.design/assets/img/62c2a7cc4835c7f3c1ce3c79.png" size="80" >		
				</u-avatar>
				<view class="focus">
							<view style="font-weight: 700;">0</view>
							<view >
								关注
							</view>
					</view>
						<view class="fans">
							<view style="font-weight: 700;">0</view>
							<view class="">
								粉丝
							</view>
						</view>
					<view class="setting flex-center">
						编辑资料
					</view>
		</view>		
		<view style="margin-left: 16px;margin-top: 10px;font-size: 14px;line-height: 25px;">
			<view style="font-weight: 700;font-size: 20px;padding:0 0 22px 33px;">
				lzz
			</view>
			<view>个人签名：111</view>
			<view>邮箱号：111</view>
			<view>所在地：111</view>
		</view>	
		<u-line class="u-line"></u-line>
		
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
.name{
	font-weight: 700;
	font-size: 20px;
	margin-bottom: 4px;
	padding-left:25px;
}
.adress{
	font-size: 12px;
	font-weight: 400;
	color: rgba(31, 51, 73, 0.6);
}
.setting{
	height: 42px;
	border-radius: 20px;
	background: rgba(229, 229, 229, 1);
	margin-right:16px;
	flex:1;
	font-size: 15px;
	font-weight: 500;
	color:rgba(56, 56, 56, 1);
}
.focus,.fans{
	height: inherit;
	display: flex;
	flex-direction: column;
	align-items: center;
	flex:1;
}
.fans{
	
}
</style>
