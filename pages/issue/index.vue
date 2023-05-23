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
				<view class="num">
					<view class="left">
						数量
					</view>
					<view class="right" >
					<u-number-box v-model="issueinfo.num" bgColor="#eeeeee" @change="valChange"></u-number-box>
					</view>
				</view>
				<view class="address" v-if="issueinfo.type==0">
					<view class="left">
						交易地址
					</view>
					<view class="right" @click="changeaddress">
						<span>{{issueinfo.location}}</span>
						<u-icon name="arrow-right" size="10" style="margin-left: 5px;"></u-icon>
					</view>
				</view>
				<view v-else>
					<uni-file-picker ref="uploadFile" file-mediatype="all" v-model="issueinfo.url" @select="selectFile">
						<view class="uploadfile flex-center">
							<u-icon name="plus-circle" size="30" color="rgba(250, 176, 5, 1)"></u-icon>
							<view>点击上传添加文件</view>
						</view>

					</uni-file-picker>
				</view>
			</view>
			<u-divider></u-divider>
		</section>
		<section>
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
				<input :type="selectedOption=='price'?'digit':'text'"
					style="padding:10px;height: inherit;border: 0 !important;outline: none;width: 300px;"
					v-model="inputValue" :focus="true">
				<view class="flex-center"
					style="height: 30px;width: 60px;border-radius: 20px;margin: 10px;background-color: #ffc300;border: 0;font-size: 14px;font-weight: 700;"
					@click="saveprice()">保存</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		reqextname
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
					text: '非电子类资源'
				}, {
					type: 'default',
					text: '电子类资源'
				}],
				temp: null,
				imageValue: [],
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
					num: 0,
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
			uploadFile(filePath, name, uuid, progressCallBack) {
				return new Promise(resolve => {
					const uploadTask = uni.uploadFile({
						url: 'http://47.115.220.70:8082/tfile/upload',
						filePath,
						formData: {
							name: 'file'
						},
						success: async (uploadFileRes) => {
							let {
								data
							} = uploadFileRes
							const {
								data: d
							} = JSON.parse(data)
							resolve({
								url: d,
								uuid,
								name
							})

						}
					})
					uploadTask.onProgressUpdate(res => {
						progressCallBack(res)
					})
				})

			},
			async selectFile(e) {
				console.log(e)
				let _this = this;
				const name = e.tempFiles[0]['name'];
				const uuid = e.tempFiles[0]['uuid'];
				const tempFilePaths = e.tempFilePaths;
				const res = await this.uploadFile(tempFilePaths[0], name, uuid, function(progress) {
					_this.$refs.uploadFile.setProgressByCustomUplaod(uuid, progress.progress)
				})
				console.log(res)
				let item = {
					name: res.name,
					extname: reqextname(res.url),
					url: res.url
				}
				this.issueinfo.url.push(item)
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
			  let uploadlist=[]
			  let promises = []
			  for (let item of list) {
				  console.log(item.path.slice(0,4))
				if(item.path.slice(0,4)=='http'){
					uploadlist.push(item);
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
				uploadlist=[...uploadlist,...await Promise.all(promises)] 
				console.log(uploadlist)
				return uploadlist
			},
			async issue() {

			  const urls = await this.uploadImage(this.uploadPicsList)
			  this.issueinfo.photourl = urls
			  let result;
			  if(this.issueinfo.id){
			  	result = await ResourceUpdate(this.issueinfo)
			  }
			  else{
				result = await ResourceAdd(this.issueinfo)
			  }
			  
			  console.log(result)
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
				if(!Number(this.temp)){
					uni.showToast({
						title:'请填入数字',
						icon:'error'
					})
				}
				else{
						this.issueinfo[this.selectedOption] = this.temp;
				}	
				this.$refs.popup.close();
			},
			valChange(e){
				
			},
			async getlist(id){
				let result=await ResourceInfo({rid:id});
				this.issueinfo=result.data;
				this.issueinfo.photourl.split(",").map(item=>{this.uploadPicsList.push({path:item})})
			}
		},
		onLoad(option) {
			if(option.id){
				this.getlist(option.id);
			}
			else{
				this.issueinfo.location = this.info.address;
				this.issueinfo.userid=this.info.id
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

		.issue {
			margin-left: auto;
			margin-right: 10px;
			background-color: #ffc300;
			width: 50px;
			height: 25px;
			text-align: center;
			line-height: 25px;
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
		margin: 20px 12px;
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
			width: 343px;
			height: 89px;
			opacity: 1;
			border-radius: 6px;
			margin-top: 10px;
			background: rgba(238, 241, 244, 1);

			border: 1px dotted rgba(78, 75, 102, 1);
			flex-direction: column;
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