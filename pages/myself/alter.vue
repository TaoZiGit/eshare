<template>
	<view>
		<header>
			<u-icon name="arrow-left" size="20" style="margin-left: 5px;"></u-icon>
			<view style="position: absolute;left:50%;transform: translateX(-50%);">编辑资料</view>
			<u-icon name="checkmark" size="20" style="margin-left: auto; margin-right: 10px;"></u-icon>
		</header>
	
		<section style="background-color: #fff;">
			<span style="color: #a5a5a5;margin: 10px;font-weight: 700;font-size: 14px;">基本信息</span>
			<ul>
				<li>
					<view class="left">
						头像
					</view>
					<view class="right">
						<u-avatar src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg" size="35"></u-avatar>
					<u-icon name="arrow-right" size="10" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						昵称
					</view>
					<view class="right">
						<span>estrella</span>
					<u-icon name="arrow-right" size="14" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						性别
					</view>
					<view class="right">
						<span>男</span>
					<u-icon name="arrow-right" size="14" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						邮箱
					</view>
					<view class="right">
						<span>444186682@qq.com</span>
					<u-icon name="arrow-right" size="14" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						电话
					</view>
					<view class="right">
						<span>17707830245</span>
					<u-icon name="arrow-right" size="14" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						地址
					</view>
					<view class="right">
						<span>桂林电子科技大学</span>
					<u-icon name="arrow-right" size="14" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						简介
					</view>
					<view class="right">
						<span>叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里啦</span>
					<u-icon name="arrow-right" size="14" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
			</ul>
		</section>
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
ul{
	li{
		height:50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 10px 10px 0 10px;
		.left{
			font-weight: 700;
		}
		.right{
			display: flex;
			color:#aaaaaa; 
			span{
				line-height: 50px;
				width: 200px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				text-align: right;
			}
		}
	}
}
</style>
