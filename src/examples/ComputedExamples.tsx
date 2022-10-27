import { computed, defineComponent, ref } from 'vue'
function reverse(str: string) {
	return [...str].reverse().join('')
}
export const ComputedExample01 = defineComponent({
	setup() {
		const c = ref('hello')
		return () => {
			return (
				<div>
					{reverse(c.value)}
					<input
						value={c.value}
						onInput={(e) => {
							c.value = (e.target as HTMLInputElement).value
						}}
						type='text'
					/>
				</div>
			)
		}
	},
})

export const ComputedExample02 = defineComponent({
	setup() {
		const c = ref('hello')
		const s = computed(() => [...c.value].reverse().join(''))
		return () => {
			return (
				<div>
					{s.value}
					<input
						value={c.value}
						onInput={(e) => {
							c.value = (e.target as HTMLInputElement).value
						}}
						type='text'
					/>
				</div>
			)
		}
	},
})

export const ComputedExample03 = defineComponent({
	setup() {
		const c = ref('hello')
		const s = computed({
			get() {
				return c.value
			},
			set(str: string) {
				c.value = reverse(str)
			},
		})
		return () => {
			return (
				<div>
					{s.value}
					<input
						value={s.value}
						onInput={(e) => {
							s.value = (e.target as HTMLInputElement).value
						}}
						type='text'
					/>
				</div>
			)
		}
	},
})

let fib = function (n: number): number {
	if (n === 1 || n === 2) return n
	return fib(n - 1) + fib(n - 2)
}

// 实际不能每一个都改，所以说我们可以这样写
fib = cache(fib)

function cache(f: Function) {
	const m: {
		[key: string]: any
	} = {}

	function hash(...args: any[]) {
		return args.map((x) => x.toString()).join('-')
	}

	return (...args: any[]) => {
		const h = hash(...args)
		if (h in m) return m[h]
		const r = f(...args)
		m[h] = r
		return r
	}
}
export const ComputedExample04 = defineComponent({
	setup() {
		const n = ref(1)
		const fibValue = computed(() => fib(n.value))
		const c = ref(0)

		setInterval(() => {
			c.value++
		}, 1000)
		return () => {
			return (
				<div>
					<span>Fibor Value:{fib(fibValue.value)}</span>
					<button
						onClick={() => {
							n.value++
						}}>
						+
					</button>
					<span>{c.value}</span>
				</div>
			)
		}
	},
})
