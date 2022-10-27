import {
	ref,
	defineComponent,
	onBeforeMount,
	onMounted,
	onBeforeUnmount,
	onUnmounted,
	onUpdated,
	onErrorCaptured,
	onRenderTracked,
	onRenderTriggered,
	KeepAlive,
	onActivated,
	onDeactivated,
} from 'vue'

export const LifeExample01 = defineComponent({
	setup() {
		const toggle = ref(false)
		return () => {
			onUpdated(() => {
				console.log('update...')
			})
			onErrorCaptured((error) => {
				console.log(error)
				toggle.value = false
			})
			return (
				<div>
					<button onClick={() => (toggle.value = !toggle.value)}>toggle</button>
					{toggle.value && <A />}
				</div>
			)
		}
	},
})

const A = defineComponent({
	setup() {
		onBeforeMount(() => {
			console.log('before mount...')
		})
		onMounted(() => {
			console.log('Mounted...')
		})
		onBeforeUnmount(() => {
			console.log('before unmount...')
		})
		onUnmounted(() => {
			console.log('unmounted...')
		})
		// throw 'eee'
		return () => <div>A</div>
	},
})

export const LifeExample02 = defineComponent({
	setup() {
		const c = ref(0)
		onRenderTracked((x) => {
			console.log('tracked...', x)
		})
		onRenderTriggered((x) => {
			console.log('trigger...', x)
		})
		return () => {
			return (
				<div>
					<button onClick={() => c.value++}>+</button>
					{c.value}
				</div>
			)
		}
	},
})

export const LifeExample03 = defineComponent({
	setup() {
		const toggle = ref(false)
		return () => {
			return (
				<div>
					<button onClick={() => (toggle.value = !toggle.value)}>toggle</button>
					<KeepAlive>{toggle.value && <B />}</KeepAlive>
				</div>
			)
		}
	},
})

const B = defineComponent({
	setup() {
		onActivated(() => {
			console.log('activate...')
		})
		onDeactivated(() => {
			console.log('deactivate')
		})
		// throw 'eee'
		return () => <div>B</div>
	},
})
