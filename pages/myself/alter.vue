<template>
	<view>
		<header>
			<u-icon name="arrow-left" size="20" style="margin-left: 5px;" @click="routeback"></u-icon>
			<view style="position: absolute;left:50%;transform: translateX(-50%);">编辑资料</view>
		</header>
		<section style="background-color: #fff;">
			<span style="color: #a5a5a5;margin: 10px;font-weight: 700;font-size: 14px;">基本信息</span>
			<ul>
				<li>
					<view class="left">
						头像
					</view>
					<view class="right" @click="changeavator()">
						<u-avatar :src="info.photourl" size="35"></u-avatar>
						<u-icon name="arrow-right" size="10" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						昵称
					</view>
					<view class="right" @click="popupinfo('name')">
						<span>{{info.name?info.name:'用户'+info.email}}</span>
						<u-icon name="arrow-right" size="14" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						性别
					</view>
					<view class="right" @click="popupinfo('sex')">
						<span>{{info.sex?info.sex:'暂无性别'}}</span>
						<u-icon name="arrow-right" size="14" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						邮箱
					</view>
					<view class="right">
						<span>{{info.email}}</span>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						工号
					</view>
					<view class="right"  @click="popupinfo('worknum')">
						<span>{{info.worknum}}</span>
						<u-icon name="arrow-right" size="14" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						电话
					</view>
					<view class="right" @click="popupinfo('phone')">
						<span>{{info.phone}}</span>
						<u-icon name="arrow-right" size="14" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						地址
					</view>
					<view class="right" @click="popupinfo('address')">
						<span>{{info.address?info.address:'暂无地址'}}</span>
						<u-icon name="arrow-right" size="14" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
				<li>
					<view class="left">
						简介
					</view>
					<view class="right" @click="popupinfo('description')">
						<span>{{info.description?info.description:'这个人很懒，暂无简介'}}</span>
						<u-icon name="arrow-right" size="14" style="margin-left: 5px;"></u-icon>
					</view>
				</li>
				<u-line />
			</ul>
		</section>
		<uni-popup ref="popup" type="bottom">
			<view class="popupsex" v-if="selectedOption==
'sex'">
				<view class="" @click="ChangeSex('男')">
					男
				</view>
				<view class="" @click="ChangeSex('女')">
					女
				</view>
			</view>
			<view class="popupcomment" v-else>
				<textarea auto-height style="padding: 10px;" focus v-model="inputValue" />
				<view class="flex-center"
					style="height: 30px; ;width: 60px;border-radius: 20px;margin: 10px 0;background-color: #ffc300;border: 0;font-size: 14px;font-weight: 700;"
					@click="ChangeInfo()">保存</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		TfileUpload
	} from '@/api/resource.js'
	import {
		UserGetUserMessage
	} from "@/api/user.js"
	import {
		mapState
	} from "vuex";
	import {
		getToken
	} from "../../utils/Token";

	export default {
		data() {
			return {
				imageStyles: {
					width: 55,
					height: 55,
					border: {
						radius: '50%'
					}
				},
				changeinfo: {},
				selectedOption: 'name',
			}
		},
		methods: {
			routeback() {
				uni.navigateBack({
					delta: 1,
				});
			},
			async getuserList() {
				let result = await UserGetUserMessage();
			},
			changeavator() {
				let _this = this
				uni.chooseImage({
					count: 1,
					sourceType: ["album", "camera"],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'http://47.115.220.70:8082/tfile/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log(JSON.parse( uploadFileRes.data).data);
								this.changeinfo.photourl =JSON.parse( uploadFileRes.data).data;
								this.$store.dispatch("alterinfo", this.changeinfo)
							}
						});
						// let result=await TfileUpload({file: [res.tempFiles][0][0].path});
						// console.log(result)
						// _this.changeinfo.avator =;
					},
				});
			},
			popupinfo(item) {
				this.$refs.popup.open('bottom');
				this.selectedOption = item;
			},
			ChangeInfo() {
				this.$store.dispatch("alterinfo", this.changeinfo).then((res)=>{
					console.log(res,"success")
				})
				.catch((res)=>{
					uni.showToast({
							icon:'error',
							title:res.message
						})
				})
				// if(!result.valid) {
				// 	uni.showToast({
				// 		icon:'error',
				// 		title:result.message
				// 	})
				// 	this.changeinfo={}
				// }
				// else{
				// 	uni.showToast({
				// 		icon:'success',
				// 		title:'修改成功'
				// 	})
				// 	this.getuserList()
				// }
				this.$refs.popup.close();
			},
			ChangeSex(item) {
				
				this.$set(this.changeinfo, 'sex', item);
				console.log(this.changeinfo)
				this.$store.dispatch("alterinfo", this.changeinfo).then((res)=>{
					console.log(res,"success")
				})
				.catch((res)=>{
					uni.showToast({
							icon:'error',
							title:res.message
						})
				})
				this.$refs.popup.close();
			}
		},
		onLoad() {
			this.getuserList()
		},
		computed: {
			inputValue: {
				get() {
					return this.info[this.selectedOption];
				},
				set(value) {
					this.changeinfo[this.selectedOption] = value;
				}
			},
			...mapState({
				token: (state) => state.user.token,
				info: (state) => state.user.info,
			}),
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

	ul {
		li {
			height: 50px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 10px 10px 0 10px;

			.left {
				font-weight: 700;
			}

			.right {
				display: flex;
				color: #aaaaaa;

				span {
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

	.popupcomment {
		border-radius: 10px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		background-color: #fff;
		display: flex;
	}

	.popupsex {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		view {
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border-bottom: 1px solid rgb(214, 215, 217);
		}
	}
</style>