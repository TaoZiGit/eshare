<template>
	<view class="search-lists">
		<u-empty text="暂无内容" mode="list" v-if="!list||!list.length"></u-empty>
		<view class="search-item" v-for="item in list" :key="item.id">
			<view class="img" style="margin:16px;" :style="{ backgroundImage: 'url(' + photo(item.photourl)+ ')' }"  @click="Todeatil(item.rid)">
				<view class="star">
					<u-icon name="star-fill" color="#fab005" size="14"></u-icon>
					<span style="line-height: 20px;padding-left: 2px;">{{item.goodsnum}}</span>
				</view>
			</view>
			<view style="display: flex;flex-direction: column;margin:16px;">
				<view style="font-weight: 700;font-size: 16px;display: flex;justify-content: space-between;"  @click="Todeatil(item.rid)">
					{{item.title}}

	<!-- 				<u-button size="mini"
						style="width: 30px;font-size: 12px;background-color: #ffc300; color: #fff;border: 0 !important;"
						v-if="type=='issue'">删除</u-button> -->
				</view>
				<view style="font-size: 12px;width: 175px;"  @click="Todeatil(item.rid)">
					<p class="introduce">{{item.content}}</p>
				</view>
				<view
					style="margin-top: 12px;font-weight: 700;font-size: 14px;display: flex;justify-content: space-between; ">
					￥{{!item.price ||item.price.toFixed(2)}}
				</view>
				<view  style="display: flex;justify-content: flex-end;" v-if="type=='issue'">
					<!-- <u-button size="mini" style="width: 30px;font-size: 12px;background-color: #ffc300; color: #fff;border: 0 !important;"
						>编辑</u-button> -->
				<u-icon @click="Toissue(item)" name="edit-pen"  size="23"></u-icon>
				<u-icon name="trash" color="#dd6161"  size="23" style="margin-left: 7px;" @click="Delete(item)"></u-icon>
				</view>
				
			</view>
		</view>
		<uni-popup ref="popup" type='center'>
			<uni-popup-dialog type="dialog" cancelText="关闭" confirmText="确定"  :content="`确定删除吗`" @confirm="dialogConfirm" @close="dialogClose "></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {ResourceDelete} from "@/api/resource.js"
	export default {
		data() {
			return {
				deleteid:"",
			}
		},
		props: {
			list: {
				type: Array,
				default: () => []
			},
			type: {
				type: String,
				default: "",
			}
		},
		methods: {
			Todeatil(id) {
				uni.navigateTo({
					url: '/pages/detail/index?id=' + id,
				});
			},
			photo(str) {
				return str.split(",")[0]
			},
			Toissue: (item) => {
				console.log(1)
				uni.navigateTo({
					url: '/pages/issue/index?id=' + item.rid,
				});
			},
			Delete(item){
				this.deleteid=item.rid
				this.$refs.popup.open('center');
			},
			async dialogConfirm(){
				console.log(this.deleteid)
				let result=await ResourceDelete({id:this.deleteid});
				if(result.status==200){
					uni.$emit('update',{msg:"1"})
				}
			},
			dialogClose(){
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-lists {
		margin: 22px 16px 0 16px;

		.search-item {
			background-color: #ffffff;
			border-radius: 12px;
			margin-bottom: 16px;
			height: 140px;
			display: flex;

			// align-items: center;
			.img {
				width: 108px;
				height: 108px;
				border-radius: 12px;
				padding: 8px;

				background-size: cover;
				background-position: center;

				.star {
					display: flex;
					width: 43px;
					height: 20px;
					border-radius: 4px;
					background: rgba(0, 0, 0, 0.36);
					color: #fff;
					font-size: 12px;
				}
			}

			.introduce {
				margin-top: 10px;
				color: rgba(31, 51, 73, 0.6);
				word-wrap: break-word;
				word-break: break-all;
				text-align: justify;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}

	}
</style>