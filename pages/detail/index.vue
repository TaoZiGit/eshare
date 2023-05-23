<template>
	<view style="position: relative;">
		<view class="routeback" @click="routeback(1)">
			<u-icon name="arrow-left" size="16" color="#fff"></u-icon>
		</view>
		<view class="like">
			<u-icon :name="islike?'heart-fill':'heart'" size="33" :color="info.islike?'#ff5454':'#fff'"
				@click="changelike()">
			</u-icon>
		</view>
		<uni-swiper-dot style=" height: 275px" :info="info.photourl" :current="current" field="0" @clickItem=clickItem
			mode="round">
			<swiper class="swiper-box" style="height: 275px" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item ,index) in info.photourl" :key="index"
					@click="previewImage(info.photourl,index)">
					<view class="swiper-item">
						<image :src="item" mode="scaleToFill" lazy-load style="width: 375px;height: 275px;">
						</image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="particulars">
			<view class="price">
				￥{{info.price ? info.price.toFixed(2) : 0}}
			</view>
			<view style="font-weight: 700;font-size: 16px;margin:5px 16px 12px;">
				{{info.title}}
			</view>
			<div class="collect" @click="changecollect()">
				<u-icon name="star-fill" size="38" :color="info.iscollect?'#fab005':'#e5e5e5'"
					style=" position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%); ">
				</u-icon>
			</div>
			<view class="publisher">
				<u-avatar style="margin-left: 16px;" :src="info.userurl">
				</u-avatar>
				<view class="name">
					<h2 style="font-size: 14px;color: rgba(0, 0, 0, 0.78);">{{info.username}}
					</h2>
					<view class="publishaddress">
						发布于{{info.location}}
					</view>
				</view>
				<view class="focus" @click="changefoucs()">
					<u-icon name="plus" size="13" :color="info.isfoucs?'#fab005':'rgba(0, 0, 0, 1)'"></u-icon>
					<span>&nbsp;关注</span>
				</view>
			</view>
			<view class="resource-details">
				<view class="nav">
					<view class="circle">
						<u-icon name="order" size="17" color="rgba(0, 0, 0, 0.86)"></u-icon>
					</view>
					<div class="title">资源介绍</div>
				</view>
				<view
					style="padding:10px 12px;font-size: 12px;line-height: 20px;font-weight: 400;color:rgba(31, 51, 73, 0.6);">
					<p style="  word-wrap: break-word;word-break: break-all;text-align: justify;">{{info.content}}</p>
				</view>
			</view>
			<view class="content">
				<view class="nav">
					<view class="circle">
						<u-icon name="more-dot-fill" size="17" color="rgba(0, 0, 0, 0.86)"></u-icon>
					</view>
					<view class="title">评论区</view>
				</view>
				<view class="first">
					<u-avatar :src="userinfo.photourl" size="30" style="margin-left: 10px;"></u-avatar>
					<view
						style="background-color: #f5f5f5;border-radius: 20px;padding-left: 10px;margin-left: 10px;display: flex;align-items: center;width: 300px;color: #ccc;"
						@click="Commentfirst()">看对眼就留言,问问更多细节~
					</view>
				</view>
				<view v-if="!commentlist||commentlist.length==0">
					<u-empty text="暂无评论,快来评论吧~" mode="list"></u-empty>
				</view>
				<view style="margin-top: 15px;" v-for="item of commentlist" :key="item.mainComent.id" v-else>
					<view class="commentlist">
						<u-avatar :src="item.mainComent.photourl" size="30" style="margin-left: 10px;">
						</u-avatar>
						<view style="display: flex;flex-direction: column;margin-left: 10px;">
							<view>
								<span class="commentname" style="font-weight: 700;">{{item.mainComent.username}}
								</span>
								<span class="createtime"
									style="padding-left: 5px;font-size: 9px;color: rgba(128, 128, 128, 0.4);">{{formattedTime(item.mainComent.createtime)}}
								</span>
							</view>
							<view style="display: flex;justify-content: flex-start;">
								<view
									style="font-size: 15px;padding: 6px 3px;width: 235px; word-wrap: break-word;word-break: break-all;text-align: justify;">
									{{item.mainComent.content}}
								</view>
								<view style="display: flex;">
									<view
										style="font-size: 12px;display: flex;flex-direction: column; align-items: center;margin-left: 10px;color:rgba(128, 128, 128, 1);">
										<u-icon name="thumb-up" color="rgba(255, 144, 0, 1)" size="20" @click="changelikecomment(item.mainComent)">
										</u-icon>
										{{item.mainComent.goodsnum}}
									</view>
									<view style="margin-left: 5px;">
										<u-icon name="chat" color="rgba(255, 144, 0, 1)" size="20"
											@click="CommentSecond(item.mainComent.id,item.mainComent.userid,item.mainComent.id,item.mainComent.username)"></u-icon>
									</view>
								</view>
							</view>
							<view class="commentlist" v-for="sceond of item.childrenComment" :key="sceond.id"
								style="margin-top: 4px;justify-content: space-between;">
								<u-avatar :src="sceond.photourl" size="30"></u-avatar>
								<view style="display: flex;flex-direction: column;margin-left: 5px;">
									<view>
										<span class="commentname"
											style="font-weight: 700;font-size:15px">{{sceond.username}}</span>
										<span class="createtime"
											style="padding-left: 5px;font-size: 12px;color: rgba(128, 128, 128, 0.4);">{{sceond.updatetime.split(" ")[0]}}</span>
										<view style="display: flex;align-items: flex-start;">
											<view
												style="font-size: 13px;padding: 3px 0;width: 185px; word-wrap: break-word;word-break: break-all;text-align: justify;">
												{{sceond.content}}
											</view>
											<view style="display: flex;">
												<view
													style="font-size: 12px;display: flex;flex-direction: column; align-items: center;margin-left: 10px;color:rgba(128, 128, 128, 1);">
													<u-icon name="thumb-up" color="rgba(255, 144, 0, 1)"
														size="20"></u-icon>
													{{sceond.goodsnum}}
												</view>
												<view style="margin-left: 5px;">
													<u-icon name="chat" color="rgba(255, 144, 0, 1)" size="20"
														@click="CommentSceond()"></u-icon>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popupcomment">
				<textarea auto-height placeholder="看对眼就留言,问问更多细节~" style="padding: 10px;" focus v-model="commenttext" />
				<view class="flex-center"
					style="height: 30px; ;width: 60px;border-radius: 20px;margin: 10px 0;background-color: #ffc300;border: 0;font-size: 14px;font-weight: 700;"
					@click="commentadd()">发送</view>
			</view>
		</uni-popup>
		<view class="botton">
			<view class="seller">
			</view>
			<view class="buybtn flex-center" @click="buy()">立即购买</view>
		</view>
	</view>

</template>

<script>
	import {
		getDeatil,
		ResourceGood,
		ResourceCollect
	} from '@/api/resource.js'
	import {
		CommentAll,
		CommentAdd,
		CommentAppend
	} from '@/api/comment.js'
	import {
		UserGetUserMessage
	} from '@/api/user.js'
	import timeFrom from '@/utils/timeFrom.js'
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				show: false,
				islike: true,
				iscollect: true,
				commenttext: "",
				current: 0,
				swiperDotIndex: 0,
				info: {},
				commentinfo: {
					current: 1,
					size: 5,
					rid: null,
					commenttype: 'first',
					firstid: "",
					userid: "",
					commentid: "",
				},
				commentlist: [],
			};
		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			Commentfirst() {
				if (this.commentinfo.commenttype == 'second')
					this.commenttext = '';
				this.commentinfo.commenttype = 'first';
				this.$refs.popup.open('bottom');
			},
			CommentSecond(firstid, userid, commentid, secondname) {
				const newinfo = {
					firstid,
					userid,
					commentid,
					secondname
				}
				this.commentinfo = {
					...this.commentinfo,
					...newinfo
				}
				console.log(this.commentinfo)
				this.commentinfo.commenttype = 'second';
				this.commenttext = '回复@' + secondname + ":"
				this.$refs.popup.open('bottom');
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			formattedTime(timestamp) {
				return timeFrom(timestamp)
			},
			async commentadd() {
				if (this.commenttext.trim()) {
					if (!this.userinfo.id) {
						let result = await UserGetUserMessage()
					}
					if (this.commentinfo.commenttype == 'first') {
						let result = await CommentAdd({
							rid: this.commentinfo.rid,
							userid: this.userinfo.id,
							content: this.commenttext
						})
					} else {
						this.commenttext = this.commenttext.split(":")[1]
						let result = await CommentAppend({
							mainid: this.commentinfo.firstid,
							userid: this.commentinfo.userid,
							myid: this.userinfo.id,
							content: this.commenttext,
							commentid: this.commentinfo.commentid
						})
					}
					this.commenttext = "";
					uni.showToast({
						title: '评论成功',
						icon: 'success'
					})
					this.$refs.popup.close();
					this.getcomment()
				} else {
					uni.showToast({
						title: '请输入内容',
						icon: 'error'
					})
				}
			},
			routeback() {
				uni.navigateBack({
					delta: 1, // 返回的页面数，如果 delta 为 1，则返回上一级页面
					success: function() {
						console.log('返回上级页面成功');
					}
				});
			},
			previewImage(imgs) {
				console.log(imgs)
				uni.previewImage({
					urls: imgs,
				});
			},
			async getcomment() {
				let comments = await CommentAll(this.commentinfo);
				this.commentlist = comments.data.dataList
			},
			async getdeatil() {
				const {
					info,
					comments
				} = await this.getDetailAndComments();
				this.info = info;
				this.commentlist = comments.data.dataList;
				this.info.photourl = this.info.photourl.split(",")
			},
			async getDetailAndComments() {
				const [info, comments] = await Promise.all([
					getDeatil({
						rid: this.commentinfo.rid,
						userid: this.userinfo.id,
					}).then(result => result.data),
					CommentAll(this.commentinfo)
				]);
				return {
					info,
					comments
				};
			},
			async changelike() {
				const[result1,result2]= await Promise.all([ResourceGood({rid: this.commentinfo.rid,userid: this.userinfo.id,}),getDeatil({rid: this.commentinfo.rid,userid: this.userinfo.id,}).then(result => result.data)]) 
				if(result1.status==200){
					this.info.islike=!this.info.islike
				}
			},
			async changecollect() {
				const[result1,result2]= await Promise.all([ResourceCollect({rid: this.commentinfo.rid,userid: this.userinfo.id}),getDeatil({rid: this.commentinfo.rid,userid: this.userinfo.id}).then(result => result.data)]) 
				if(result1.status==200){
					this.info.iscollect=!this.info.iscollect
				}
			},
			async changelikecomment(item) {
				let result=await CommentGood({commentid:item.id,userid: this.userinfo.id})
				if(result1.status==200){
					item.goodsnum
				}
			},
			async changefoucs() {
				console.log(this.info.isfoucs)
				/* await ResourceCollect({
					rid: this.commentinfo.rid,
					userid: this.userinfo.id,
				}) */
			},
			buy(){
				uni.navigateTo({
					url: `/pages/afford/index?id=${this.commentinfo.rid}`, // 路由的页面路径
					success: function() {
						console.log('路由到其他页面成功');
					}
				});
			}
		},
		onLoad(option) {
			this.commentinfo.rid = option.id || 'be8a5570-5e61-422d-8bb3-7b0f410c1857'
			this.getdeatil();
			document.body.style.backgroundColor = '#fff';
		},
		computed: {
			...mapState({
				token: (state) => state.user.token,
				userinfo: (state) => state.user.info,
			}),
		},
	}
</script>


<style lang="scss" scoped>
	.routeback {
		position: absolute;
		top: 35px;
		left: 16px;
		width: 34px;
		height: 34px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;
	}

	.like {
		position: absolute;
		top: 35px;
		right: 16px;
		z-index: 2;
	}

	.particulars {
		width: 375px;
		background-color: #fff;
		border-radius: 16px 16px 0px 0px;
		position: relative;
		padding-bottom: 50px;
		.price {
			padding: 20px 16px 0;
			font-size: 20px;
			font-weight: 700;
		}

		.collect {
			position: absolute;
			right: 22px;
			top: -20px;
			width: 62px;
			height: 62px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
			border-radius: 50%;

		}

		.publisher {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.publishaddress {
				font-size: 12px;
				color: rgba(31, 51, 73, 0.6);
				width: 204px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.focus {
				width: 57.05px;
				height: 27px;
				border-radius: 12px;
				background: rgba(240, 240, 240, 1);
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

		.resource-details,
		.content {
			margin: 12px;
		}

		.content {
			.first {
				display: flex;
				width: 330px;
				margin-top: 15px;
			}
		}

		.nav {
			display: flex;
			align-items: center;
			background-color: #fffcf2;
			padding-left: 18px;
			width: 345px;
			height: 43px;
			border-radius: 10px;

			.title {
				margin-left: 10px;
				font-size: 16px;
				font-weight: 700;
				font-family: '思源黑体';
			}
		}

		.circle {
			background-color: rgba(255, 198, 149, 1);
			width: 25px;
			height: 25px;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.popupcomment {
		border-radius: 10px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		background-color: #fff;
		display: flex;
	}

	.commentlist {
		display: flex;
		align-items: flex-start;
	}

	.botton {
		width: 375px;
		height: 52px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px -2px 4px 0px rgba(214, 214, 214, 0.25);
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.seller {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 12px;
			margin-left: 10px;
		}

		.buybtn {
			width: 150px;
			height: 40px;
			margin-right: 16px;
			border-radius: 20px;
			font-size: 14px;
			color: #fff;
			background: rgba(255, 195, 0, 1);
			box-shadow: 0px -2px 4px 0px rgba(214, 214, 214, 0.25);
			// border: 0;

		}
	}
</style>