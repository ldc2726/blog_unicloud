<template>
	<h1>{{ msg }}--{{ obj2 }}</h1>
	<button @click="obj.count++"> count is: {{ obj.count }} </button>
	<button @click="counts++"> count is: {{ counts }} </button>
	<button @click="obj2.num++"> num is: {{ obj2.num }} </button>
	<button @click="getValue"> getvalue} </button>
	<button @click="change"> change--{{ state }} </button>
</template>

<script lang="ts">
	import { reactive, watchEffect, shallowReactive, ref } from 'vue'
	export default {
		name: 'HelloWorld',
		props: {
			msg: {
				type: String,
				default: ''
			}
		},
		emits: ['change'],
		setup(props: Object, context: any) {
			console.log(props, context, 'PPLLKKLL')
			const obj = reactive({ count: 0 })
			// const copy = readonly(props)
			const obj2 = shallowReactive({ num: 0 })
			const state = ref(0)
			const change = () => state.value++

			const getValue = () => {
				console.log(obj2.num, state.value, 'VVVXXX')
			}

			watchEffect(() => {
				console.log(obj.count, '+++')
				context.emit('change', obj.count)
			})

			return {
				obj,
				obj2,
				state,
				change,
				getValue
				// msg:copy.msg
			}
		},
		data() {
			return {
				counts: 0
			}
		}
	}
</script>
