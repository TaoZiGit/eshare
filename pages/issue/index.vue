<template>
	<view>
		<header>
			<u-icon name="arrow-left" size="20" style="margin-left: 5px;" @click="routeback"></u-icon>
			<view style="position: absolute;left:50%;transform: translateX(-50%);">资源发布</view>
			<view class="issue" @click="issue()">
				发布
			</view>
		</header>
		<section>
			<view class="nav">
				<ul class="flex-center" style="gap:24px;">
					<li class="flex-center" :class="issueinfo.type==index ? 'active' : ''"
						v-for="(item,index) in sortbtn" :key="index" @click="changesearch(index)">{{item.text}}</li>
				</ul>
			</view>
		</section>
		<section>
			<view class="msg">
				<view class="title">
					标题
					<u-input placeholder="请输入内容" v-model="issueinfo.title" class="title-input">
					</u-input>
				</view>
				<!-- 	<view class="content">
							内容
							<u-input
							  placeholder="请输入内容"
							  v-model="content"
							  class="title-input">
							</u-input>
						</view> -->
				<view class="content">
					内容
					<textarea placeholder="请输入内容" class="content-textarea" v-model="issueinfo.content"
						placeholder-style="color:#ccc4cf;"></textarea>
				</view>
				<u-divider></u-divider>
				<view class="price">
					<view class="left">
						设定价格
					</view>
					<view class="right" @click="changeprice()">
						<span>￥{{Number(issueinfo.price).toFixed(2)||0}}</span>
						<u-icon name="arrow-right" size="10" style="margin-left: 5px;"></u-icon>
					</view>
				</view>
				<view class="num" v-if="issueinfo.type==1">
					<view class="left">
						数量
					</view>
					<view class="right">
						<u-number-box v-model="issueinfo.num" bgColor="#eeeeee" @change="valChange"></u-number-box>
					</view>
				</view>
				<view class="address" v-if="issueinfo.type==1">
					<view class="left">
						交易地址
					</view>
					<view class="right" @click="changeaddress">
						<span>{{issueinfo.location}}</span>
						<u-icon name="arrow-right" size="10" style="margin-left: 5px;"></u-icon>
					</view>
				</view>
				<view v-else>
					<view class="uploadfile flex-center" @click="selectFile()">
						<u-icon name="plus-circle" size="30" color="rgba(250, 176, 5, 1)"></u-icon>
						<view>点击上传添加文件</view>
					</view>
					<view v-for="(file,index) in uploadFileList" :key="index">
						<view class="uplaodfiles">
							<view class="">
								{{file.name}}
							</view>
							<u-icon name="close" class="iclose" color="#000" size="20" @click="removeFile(index)" />
						</view>
					</view>
				</view>
			</view>
			<u-divider></u-divider>
		</section>
		<section>
			<view style="margin: 0 16px;">
				选择图片
			</view>
			<view class="pics">
				<view class="medias" v-for="( image, index ) in uploadPicsList" :key="index">
					<image class="img" :src="image.path" :data-src="image" @tap="previewImage(index)"
						mode="aspectFill" />
					<u-icon name="close" class="iclose" color="#eee" size="20" @tap="removeImage(index)" />
				</view>
				<view class="uploadBtn" @tap="chosePicsAndUpload" v-if="uploadPicsList.length < 9">
					<u-icon name="plus" size="60" color="#aaa" />
					<view class="text">选择照片</view>
				</view>
			</view>
		</section>
		<uni-popup ref="popup" type="bottom">
			<view class="popupcomment">
				<input type="text" style="padding:10px;height: inherit;border: 0 !important;outline: none;width: 300px;"
					v-model="inputValue" :focus="true">
				<view class="flex-center"
					style="height: 30px;width: 60px;border-radius: 20px;margin: 10px;background-color: #ffc300;border: 0;font-size: 14px;font-weight: 700;"
					@click="saveprice()">保存</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var AfDocument = uni.requireNativePlugin("Aq-ChooseFile");
	import {
		verification
	} from '@/utils/regular.js'
	import {
		TfileUpload,
		ResourceAdd,
		ResourceInfo,
		ResourceUpdate
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
				sortbtn: [{
					type: 'default',
					text: '电子类资源'
				}, {
					type: 'default',
					text: '非电子类资源'
				}],
				temp: null,
				uploadFileList: [],
				currentTab: 0,
				uploadPicsList: [],
				selectedOption: 'price',
				issueinfo: {
					title: "",
					content: "",
					photourl: [],
					price: null,
					location: "",
					type: 0,
					num: 1,
					url: [],
					userid: "",
				}
			}
		},
		methods: {
			routeback() {
				uni.navigateBack({
					delta: 1,
				});
			},
			success() {
				console.log(1)
			},
			changesearch(index) {
				this.issueinfo.type = index;
			},
			previewImage(index) {
				var current = this.uploadPicsList[index].path;
				let urls = [];
				this.uploadPicsList.map((item) => {
					urls.push(item.path);
				});
				uni.previewImage({
					current: current,
					urls,
				});
			},
			selectFile() {
				const plugin = uni.requireNativePlugin('GuoWei-SelectFileModule')
				plugin.chooseFile({
						count: 10,
						extension: ["docx", "xlsx", "pptx", "mp3"],
						rootDirName: '根目录',
						themeColor: '#18b566',
						folderIconColor: '#ffc300',
						fileIconColor: '#0000ff',
						showHiddenFiles: false
					},
					result => {
						if (result.code == 0) {
							this.uploadFile(result.files)

						}
						console.log(result) // result 看下方“回调说明”
					}
				)
			},
			async uploadFile(list) {
				let uploadlist = []
				let promises = []
				for (let item of list) {
					if (item.url.slice(0, 4) == 'http') {
						uploadlist.push(item);
						continue
					}
					const promise = new Promise((resolve, reject) => {
						uni.uploadFile({
							url: 'http://47.115.220.70:8082/tfile/upload',
							filePath: item.path,
							name: 'file',
							success: (uploadFileRes) => {
								const result = JSON.parse(uploadFileRes.data).data;
								const newItem = {
									name: item.name,
									url: result
								};
								resolve(newItem);
							},
							fail: (error) => {
								reject(error)
							}
						})
					})
					promises.push(promise)
				}
				uni.showLoading({
					title: '上传中'
				});
				uploadlist = [...uploadlist, ...await Promise.all(promises)]
				uni.hideLoading();
				this.uploadFileList = [...this.uploadFileList, ...uploadlist]
			},
			removeFile(index) {
				this.uploadFileList.splice(index, 1);
			},
			removeImage(index) {
				this.uploadPicsList.splice(index, 1);
			},
			chosePicsAndUpload() {
				let count = 9 - this.uploadPicsList.length;
				if (this.uploadPicsList.length >= 9) {
					uni.showToast({
						title: "最多选择9张照片",
						icon: "success",
						duration: 1000,
					});
					count = 0;
					return false;
				}
				uni.chooseImage({
					count,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: (res) => {
						this.uploadPicsList = [...this.uploadPicsList, ...res.tempFiles];
						if (this.uploadPicsList.length > 9) {
							this.uploadPicsList = this.uploadPicsList.slice(0, 9);
						}
					},
				});
			},
			async uploadImage(list) {
				let uploadlist = []
				let promises = []
				for (let item of list) {
					console.log(item.path.slice(0, 4))
					if (item.path.slice(0, 4) == 'http') {
						uploadlist.push(item.path);
						continue
					}
					const promise = new Promise((resolve, reject) => {
						uni.uploadFile({
							url: 'http://47.115.220.70:8082/tfile/upload',
							filePath: item.path,
							name: 'file',
							success: (uploadFileRes) => {
								resolve(JSON.parse(uploadFileRes.data).data)
							},
							fail: (error) => {
								reject(error)
							}
						})
					})
					promises.push(promise)
				}
				uploadlist = [...uploadlist, ...await Promise.all(promises)]
				return uploadlist
			},
			async issue() {
				let validator = verification(this.issueinfo)
				if (!validator.valid) {
					uni.showToast({
						title: validator.message,
						icon: 'error'
					})
					return
				}
				if (!this.uploadPicsList.length) {
					uni.showToast({
						title: '图片不能为空',
						icon: 'error'
					})
					return
				}
				const urls = await this.uploadImage(this.uploadPicsList)
				this.issueinfo.photourl = urls
				this.issueinfo.url = JSON.stringify(this.uploadFileList )
				this.issueinfo.photourl = this.issueinfo.photourl.join(",")
				let result;
				if (this.issueinfo.rid) {
					const propsToKeep = ["userid", "type", "title", "content", "price", "photourl", "location", "num",
						"url"
					];
					const newObj = Object.entries(this.issueinfo).reduce((obj, [key, value]) => {
						if (propsToKeep.includes(key)) {
							obj[key] = value;
						}
						return obj;
					}, {});
					newObj.id = this.issueinfo.rid
					result = await ResourceUpdate(newObj)
				} else {
					result = await ResourceAdd(this.issueinfo)
				}
				if (result.status == 200) {
					uni.showToast({
						icon: 'success',
						title: result.message
					})
				}
				this.issueinfo = {}
				this.uploadFileList = [];
				this.uploadPList = [];
				this.issueinfo.price = 0;
				uni.switchTab({
					url:'/pages/index/index'
				})
				
			},
			changeprice() {
				this.$refs.popup.open('bottom');
				this.selectedOption = 'price'
			},
			changeaddress() {
				this.$refs.popup.open('bottom');
				this.selectedOption = 'location'
			},
			saveprice() {
				if (!Number(this.temp) && this.selectedOption=='price') {
					uni.showToast({
						title: '请填入数字',
						icon: 'error'
					})
				} else {
					this.issueinfo[this.selectedOption] = this.temp;
				}
				this.$refs.popup.close();
			},
			valChange(e) {

			},
			async getlist(id) {
				let result = await ResourceInfo({
					rid: id
				});
				this.issueinfo = result.data;
				this.issueinfo.photourl.split(",").map(item => {
					this.uploadPicsList.push({
						path: item
					})
				})
				this.issueinfo.url = JSON.parse(this.issueinfo.url)
			}
		},
		onLoad(option) {
			if (option.id) {
				this.getlist(option.id);
			} else {
				this.issueinfo.location = this.info.address;
				this.issueinfo.userid = this.info.id
			}

		},
		computed: {
			inputValue: {
				get() {
					return this.issueinfo[this.selectedOption];
				},
				set(value) {
					this.temp = value;
				}
			},
			UploadFileObject() {
				if (typeof this.issueinfo.url === 'object') {
					return this.issueinfo.url
				} else if (typeof this.issueinfo.url === 'string') {
					return JSON.parse(this.issueinfo.url)
				} else return {}
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
		height: 90px;
		display: flex;
		align-items: flex-end;

		font-weight: 700;
		position: relative;
		background-color: #ffffff;
		padding-bottom: 5px;

		.issue {
			margin-left: auto;
			margin-right: 10px;
			background-color: #ffc300;
			width: 50px;
			height: 35px;
			text-align: center;
			line-height: 35px;
			border-radius: 20px;
			font-weight: 500;

		}
	}

	.nav {
		margin-top: 20px;

		ul {
			li {
				width: 157px;
				height: 70px;
				border-radius: 10px;
				padding: 10px 12px;
				background-color: #ffffff;
				font-weight: 700;
				font-size: 20px;
			}
		}
	}

	.active {
		background: rgba(255, 195, 0, 1) !important;
		box-shadow: 0px 6px 14px 0px rgba(255, 195, 0, 0.4);
	}

	.pics {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		margin: 0px 16px;
		width: 375px;

		.medias {
			width: 210rpx;
			height: 210rpx;
			background-color: #eee;
			border-radius: 6rpx;
			margin: 10rpx;
			position: relative;

			.iclose {
				position: absolute;
				right: 0;
				top: 0;
				background-color: rgba($color: #333, $alpha: 0.6);
				border-bottom-left-radius: 100%;
				padding: 10rpx 10rpx 16rpx 16rpx;
			}
		}

		.img {
			width: 210rpx;
			height: 210rpx;
			border-radius: 6rpx;
		}

		.video {
			width: 210rpx;
			height: 210rpx;
			border-radius: 6rpx;
		}

		.uploadBtn {
			width: 210rpx;
			height: 210rpx;
			background-color: #eee;
			border-radius: 6rpx;
			margin: 5rpx;
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			align-content: center;

			.text {
				color: #888;
				font-size: 8rpx;
				margin-top: 20rpx;
			}
		}
	}

	.msg {
		margin: 20px 16px;

		.title {
			.title-input {
				margin: 10px 0;
				width: 97%;
				border: 1px solid #dadbde;
			}
		}

		.content {
			.content-textarea {
				padding: 3px 0 0 5px;
				border: 0.5px solid #dadbde;
				width: 97%;
				border-radius: 4px;
				height: 100px;
				margin-top: 10px;
			}
		}

		.price {
			width: 97%;
			display: flex;
			margin: 10px 0;
			justify-content: space-between;

			.right {
				display: flex;

				span {
					color: red;
					font-weight: 700;
				}
			}
		}

		.num {
			width: 97%;
			display: flex;
			margin: 20px 0;
			justify-content: space-between;

			.right {
				display: flex;
			}
		}

		.address {
			width: 97%;
			display: flex;
			justify-content: space-between;

			.right {
				display: flex;

				span {
					width: 200px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					text-align: right;
				}
			}
		}

		.uploadfile {
			width: 300px;
			margin: 0 auto;
			height: 89px;
			opacity: 1;
			border-radius: 6px;
			margin-top: 10px;
			background: rgba(238, 241, 244, 1);
			border: 1px dotted rgba(78, 75, 102, 1);
			flex-direction: column;
		}

		.uplaodfiles {
			width: 300px;
			height: 40px;
			align-items: center;
			margin: 10px auto;
			display: flex;
			justify-content: space-between;
			border: 1px #eee solid;
			border-radius: 5px;
			background: rgba(238, 241, 244, 1);

		}
	}

	.popupcomment {
		border-radius: 10px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		background-color: #fff;
		display: flex;
		justify-content: space-between;

		input {
			height: inherit;
			border: 0 !important;
		}
	}
</style>