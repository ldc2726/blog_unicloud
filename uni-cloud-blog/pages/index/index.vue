<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button type="default" @click="sayHello()">say hello</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad() {
			
		},
		methods: {
			sayHello() {
				this.title = ''
				uni.showLoading({
					title: '加载中...'
				})
				this.request('hello/sayHello', {}).then(res => {
					this.title = res.data
					uni.hideLoading()
				}).catch().finally(() => {
					uni.hideLoading()
				})
			},
			
			request(action, data) {
				return uniCloud.callFunction({
					name: 'hello-uni-cloud-router',
					data: {
						action,
						data
					}
				}).then(({
					result
				}) => {
					return Promise.resolve(result)
				}).catch(err => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
					return Promise.reject(err)
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		min-height: 100px;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
