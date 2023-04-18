<template>
	<view style="position: relative;">
		<view class="routeback" @click="routeback">
			<u-icon name="arrow-left" size="16" color="#fff"></u-icon>
			
		</view>
		<view class="like">
			<u-icon :name="islike?'heart-fill':'heart'" size="33" :color="islike?'#ff5454':'#fff'"></u-icon>
		</view>
		<uni-swiper-dot style=" height: 275px" :info="imginfo" :current="current" field="0" @clickItem=clickItem  mode="round">
			<swiper class="swiper-box" style="height: 275px"  @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item ,index) in imginfo" :key="index"  @click="previewImage(imginfo,index)">
					<view class="swiper-item">
						<image :src="item.url"  mode="scaleToFill" lazy-load style="width: 375px;height: 275px;"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="particulars">
			<view class="price">
				￥85
			</view>
			<view style="font-weight: 700;font-size: 16px;margin:5px 16px 12px;">
				全新未拆封倍思wm02白色 
			</view>
			<div class="collect">
				<u-icon name="star-fill" size="38" :color="islike?'#fab005':'#e5e5e5'" style=" position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%); "></u-icon>
			</div>
			<view class="publisher">
				<u-avatar  style="margin-left: 16px;" src="https://img.js.design/assets/smartFill/img307164da746310.jpeg"></u-avatar>
				<view class="name">
					<h2 style="font-size: 14px;color: rgba(0, 0, 0, 0.78);">南瓜星打球的丹参</h2>
					<view class="publishaddress">
						发布于桂林电子科技大学女生宿舍C区
					</view>
				</view>
				<view class="focus">
					<u-icon name="plus" size="13" color="rgba(0, 0, 0, 1)"></u-icon>
					<span>&nbsp;关注</span>
				</view>
			</view>
			<view class="resource-details">
				<view class="nav">
					<view class="circle">
						<u-icon name="order"  size="17" color="rgba(0, 0, 0, 0.86)"></u-icon>
					</view>
					<div class="title">资源介绍</div>
				</view>
				<view style="padding:10px 12px;font-size: 12px;line-height: 20px;font-weight: 400;color:rgba(31, 51, 73, 0.6);">
					全新未拆封倍思wm02白色，爽快送耳机套壳。心动不如行动，感兴趣的话点“我想要”和我私聊吧~
				</view>
			</view>
			<view class="content">
				<view class="nav">
					<view class="circle">
						<u-icon name="more-dot-fill"  size="17" color="rgba(0, 0, 0, 0.86)"></u-icon>
					</view>
					<div class="title">评论区</div>
				</view>
				<view class="first">
					<u-avatar src="https://img.js.design/assets/smartFill/img322164da746310.jpg" size="30" style="margin-left: 10px;"></u-avatar>
					<view style="background-color: #f5f5f5;border-radius: 20px;padding-left: 10px;margin-left: 10px;display: flex;align-items: center;width: 300px;color: #ccc;" @click="Commentfirst()">看对眼就留言,问问更多细节~</view>  
				</view>
				<view style="margin-top: 20px;">
					<view class="commentlist">
						<u-avatar src="https://img.js.design/assets/smartFill/img322164da746310.jpg" size="30" style="margin-left: 10px;"></u-avatar>
					<view style="display: flex;flex-direction: column;margin-left: 10px;">
						<view>
							<span class="commentname" style="font-weight: 700;">可乐</span>
							<span class="createtime" style="padding-left: 5px;font-size: 9px;color: rgba(128, 128, 128, 0.4);">两天前</span>
						</view>
						<view style="font-size: 15px;padding: 3px 0;">
							同学，那个倍思耳机的音质怎么样呀
						</view>
					</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" >
			<view class="popupcomment">
				<textarea auto-height  placeholder="看对眼就留言,问问更多细节~" style="padding: 10px;"/>
				<u-button type="success" style="height: 30px; ;width: 60px;border-radius: 20px;margin: 10px 0;">发送</u-button>
			</view>
			
		</uni-popup>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				show:false,
				islike:true,
				iscollect:true,
				commenttext:"",
				imginfo:[
					{	
						url:'https://img.js.design/assets/img/62e4f02866bc4d7b9bbffc79.jpg',
					},
					{
						url:'https://img.js.design/assets/img/62e4f02866bc4d7b9bbffc79.jpg',
					},
				],
				current: 0,
				swiperDotIndex: 0
			};
		},
		methods:{
			change(e) {
				this.current = e.detail.current
				console.log(this.current)
			
			},
			Commentfirst(){
				 this.$refs.popup.open('bottom')
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			routeback(){
				uni.navigateBack({
				  delta: 1, // 返回的页面数，如果 delta 为 1，则返回上一级页面
				  success: function () {
				    console.log('返回上级页面成功');
				  }
				});
			},
			previewImage(imgs) {
				console.log(imgs)
			  uni.previewImage({ 
			    urls:imgs.map(({url})=>url),
			  });
			},
		},
		onLoad() {
		    // 修改默认背景颜色
		    const body = document.getElementsByTagName('body')[0];
		    body.style.backgroundColor = '#fff'; // 这里可以替换成你想要的颜色
		  },
	}
</script>


<style lang="scss" scoped>
	html{
		background-color: #fff;
	}
	.routeback{
		position: absolute;
		top: 35px;
		left:16px;
		z-index: 999;
		width: 34px;
		height: 34px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.like{
		position: absolute;
		top: 35px;
		right:16px;	
		z-index: 999;
	}
		
	.particulars{
		width: 375px;
		background-color: #fff;
		border-radius: 16px 16px 0px 0px;
		position: relative;
		.price{
			padding: 20px 16px 0;
			font-size: 20px;
			font-weight: 700;
		}
		.collect{
			position: absolute;
			right: 22px;
			top: -20px;
			width: 62px;
			height: 62px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
			border-radius: 50%;
			z-index: 100;
			
		}
		.publisher{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.publishaddress{
				font-size: 12px;
				color:rgba(31, 51, 73, 0.6);
				width: 204px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.focus{
				width: 57.05px;
				height: 27px;
				border-radius: 12px;
				background: rgba(240, 240, 240, 1);
				display: flex;
				justify-content: center;
				align-items: center;
				span{
					padding-left:3px;
					font-size: 13px;
					color: rgba(0, 0, 0, 0.86);
					font-weight: 700;
				}
				margin-right: 23px;
			}
		}
		.resource-details,.content{
			margin: 12px;
		}
		.content{
			.first{
				display: flex;
				width: 330px;
				margin-top: 15px;
			}
		}
		.nav{
			display: flex;
			align-items: center;
			background-color:#fffcf2;
			padding-left: 18px;
			width: 345px;
			height: 43px;
			border-radius: 10px;
			.title{
				margin-left: 10px;
				font-size: 16px;
				font-weight: 700;
				font-family: '思源黑体';
			}
		}
		.circle{
			background-color:  rgba(255, 198, 149, 1);
			width: 25px;
			height: 25px;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.popupcomment{
		border-radius:10px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		background-color: #fff;
		display: flex;
	}
	.commentlist{
		display: flex;
	}
</style>
