<template>
	<view class="search-lists">	
	<u-empty text="暂无内容" mode="list" v-if="!list||!list.length"></u-empty>
				<view class="search-item" v-for="item in list" :key="item.id">
						<u-avatar :src="photo(item.photourl)" style="margin-left: 20px;"></u-avatar>
					<view style="margin-left: 10px">
						<view style="font-weight: 700;font-size: 18px;">
							{{item.name}}
						</view>
						<view style="font-size: 12px;color: #ccc;">
							粉丝数：{{item.followersnum}}
						</view>
					</view>
					<view class="focus" @click="changefoucs(item)" :style="`background:${item.isfocus?'#fab005':''}`">
						<u-icon name="plus" size="13" color="rgba(0, 0, 0, 1)" v-if="!item.isfocus"></u-icon>
						<span>&nbsp;{{item.isfocus?'已':''}}关注</span>
					</view>
				</view>
		</view>
</template>

<script>
	import {
		UserFocus
	} from '@/api/user.js'
	import {
		mapState
	} from "vuex";
	export default{
		data() {
			return {
			}
		},
		props:{
			list:{
				type: Array,
				default: ()=>[]
			},
			type:{
				type:String,
				default:"",
			}
		},
		methods: {
			Todeatil(id){
				uni.navigateTo({
				url:'/pages/detail/index?id='+id,
				});
			},
			photo(str){
				return str.split(",")[0]
			},
			async changefoucs(item) {
				let result=await UserFocus({
					userid:item.userid,
					myid:this.userinfo.id,
				})
				if(result.status==200){
					item.isfocus=!item.isfocus
				}
			},
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
	.search-lists{
		margin:22px 16px 0 16px;
		.search-item{
			background-color: #ffffff;
			border-radius: 12px;
			margin-bottom: 16px;
			height: 80px;
			display: flex;
			align-items: center;
			}	
		.focus {
			margin-left: 15px;
			width: 57.05px;
			height: 27px;
			border-radius: 12px;
			background: rgba(240, 240, 240, 1);
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: auto;
			margin-right: 20px;
			span {
				padding-left: 3px;
				font-size: 13px;
				color: rgba(0, 0, 0, 0.86);
				font-weight: 700;
			}
		}	
		}
</style>