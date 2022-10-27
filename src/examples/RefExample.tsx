import { defineComponent, mergeProps, PropType, Ref, ref } from 'vue'
export const RefExample01 = defineComponent({
	setup() {
		const count = ref(0)
		return () => {
			return (
				<div>
					{' '}
					<button
						onClick={() => {
							count.value++
						}}>
						+
					</button>
					{count.value}
				</div>
			)
		}
	},
})

export const RefExample02 = defineComponent({
	setup() {
		const count = ref(0)
		return () => {
			console.log('render', count.value)

			return (
				<div>
					{' '}
					<button
						onClick={() => {
							count.value++
						}}>
						+
					</button>
				</div>
			)
		}
	},
})
export const RefExample03 = defineComponent({
	setup() {
		const count = ref(0)
		return () => {
			return (
				<div>
					{''}
					<button
						onClick={() => {
							count.value++
						}}>
						+
					</button>
					<div>{count.value}</div>
					<Counter count={count} />
				</div>
			)
		}
	},
})

const Counter = ({ count }: { count: Ref<number> }) => {
	return <div>{count.value}</div>
}

const Counter1 = defineComponent({
	props: {
		count: {
			type: Object as PropType<Ref<number>>,
			required: true,
		},
	},
	setup(props) {
		// props:{
		//     count:Ref<number>
		// }
		return () => {
			return <div>{props.count.value}</div>
		}
	},
})

export const RefExample04 = defineComponent({
	setup() {
		const count = ref(0)
		return () => {
			console.log('render', count.value)

			return (
				<div>
					{' '}
					<button
						onClick={() => {
							count.value++
						}}>
						+
					</button>
				</div>
			)
		}
	},
})
