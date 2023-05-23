<template>
	<view>
		<view class="title">
			<h1>你好呀</h1>
			<h1 style="color: rgba(250, 176, 5, 1);">欢迎回来！</h1>
			<view style="margin-top: 6px;font-size: 20px;">
				大学资源闲置？来e享圈！
			</view>
		</view>
		<view class="email">
			邮箱号：
			<input type="text" v-model="email">
		</view>
		<view class="checkCode" v-if="!logintype">
			验证码：
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<input type="text" v-model="checkcode">
				<button @click="getCode()" :disabled="checkcodetime==0?false:true"
					:class="checkcodetime==0?'':'disabled'">发送验证码<span
						v-show="checkcodetime!==0">{{checkcodetime}}</span></button>
			</view>

		</view>
		<view class="password" v-else>
			密码：
			<view class="password-input" style="display: flex;align-items: center;justify-content: space-between;">
				<input :type="type" placeholder="输入密码" v-model="password" class="input">
				<u-icon :name="Icon" size="20" class="eyes" @click="flag=!flag"></u-icon>
			</view>
		</view>
		<button style="border-radius: 6px;
background: rgba(250, 176, 5, 1);
box-shadow: 0px -2px 4px 0px rgba(214, 214, 214, 0.25);width: 345px;margin: 20px auto;color: #fff;"
			@click="login()">登录</button>
		<view class="passwordlogin">
			<view class="" @click="logintype=!logintype">
				{{logintype?'验证码':'密码'}}登录
			</view>
			<view class="">
				忘记密码
			</view>
		</view>
		<view class="tores" @click="Tores()">
			还没有账号？<span>点击开始注册</span>
		</view>
	</view>
</template>

<script>
	import {
		getCode,
		Login,
		UserLoginByPassword
	} from '@/api/user.js'
	import {
		emailRegex
	} from '@/utils/regular.js'
	import {
		setToken,
		getToken
	} from '@/utils/Token.js'
	export default {
		data() {
			return {
				email: '444186682@qq.com',
				checkcodetime: 0,
				checkcode: "",
				logintype: 0,
				password: "",
				flag: 0,
				showPassword: true
			}
		},
		methods: {
			Tores() {
				uni.navigateTo({
					url: '/pages/resgister/resgister'
				})
			},
			changePassword() {
				this.showPassword = !this.showPassword
			},
			countdown() {
				if (this.checkcodetime == 0) {
					clearInterval(countdownTimer)
				}
				this.checkcodetime--;
			},
			async getCode() {
				if (emailRegex(this.email)) {
					let result = await getCode({
						email: this.email
					});
					this.checkcodetime = 120;
					let countdownTimer = setInterval(this.countdown, 1000);
				} else {
					uni.showToast({
						title: '邮箱格式错误',
						icon: 'error'
					})
				}
			},
			async login() {
				let result;
				if (this.logintype) {
					result = await UserLoginByPassword({
						account: this.email,
						password: this.password.trim()
					})
				} else {
					result = await Login({
						email: this.email,
						checkCode: this.checkcode.trim()
					})
				}
				setToken(result.data)
				uni.showToast({
					title: '登录成功',
					icon: 'success'
				})
				uni.switchTab({
					url: "/pages/index/index"
				})
			}

		},
		computed: {
			type() {
				return this.flag ? "text" : "password";
			},
			Icon() {
				return !this.flag ? "eye" : "eye-off"
			}
		},
	}
</script>

<style lang="scss" scoped>
	.disabled {
		border-color: #f3d19e !important;
		background-color: #f3d19e !important;
	}

	.title {
		margin: 68px 16px 6px 16px;

		h1 {
			font-size: 48px;
		}
	}

	.email,
	.checkCode,
	.password {
		margin: 10px 16px 6px 18px;

		input {
			width: 339.5px;
			height: 48px;
			border: 1px solid #000;
			border-radius: 6px;
			padding: 10px 10px 10px 10px;
			margin-top: 3px;
			background-color: #ffffff;
		}
	}

	.checkCode {
		input {
			width: 206px;
			height: 48px;
		}

		button {
			width: 123px;
			height: 40px;
			border-radius: 6px;
			background: rgba(250, 176, 5, 1);
			box-shadow: 0px -2px 4px 0px rgba(214, 214, 214, 0.25);
			color: #fff;
			line-height: 40px;
		}
	}

	.password {
		.password-input {
			width: 339.5px;
			height: 48px;
			border: 1px solid #000;
			border-radius: 6px;
			padding: 10px 10px 10px 10px;
			margin-top: 3px;
			background-color: #ffffff;

			.input {
				border: 0;
				outline: none;
				height: 40px;
				font-size: 15px;
			}
		}
	}

	.tores {
		margin: 20px auto;
		text-align: center;

		span {
			color: rgba(255, 195, 0, 0.92);
		}
	}

	.passwordlogin {
		display: flex;
		margin: 1px 18px;
		justify-content: space-between;

		span {
			color: rgba(255, 195, 0, 0.92);
		}
	}
</style>