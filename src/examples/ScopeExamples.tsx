import {
	defineComponent,
	ref,
	effectScope,
	watch,
	toRefs,
	onScopeDispose,
	reactive,
} from 'vue'

import type { Ref, EffectScope } from 'vue'
export const ScopeExample01 = defineComponent({
	setup() {
		const scope = effectScope()
		const c = ref(0)

		scope.run(() => {
			watch(c, () => {
				console.log('watch effect...', c.value)
			})
		})

		setInterval(() => {
			c.value++
		}, 300)

		setTimeout(() => {
			scope.stop()
		}, 2000)
		return () => {
			return <div>{c.value}</div>
		}
	},
})

export const ScopeExample02 = defineComponent({
	setup() {
		const scope = effectScope()
		const c = ref(0)

		scope.run(() => {
			const subscope = effectScope(true)
			subscope.run(() => {
				watch(c, () => {
					console.log('watch effect...', c.value)
				})
			})
		})
		setInterval(() => {
			c.value++
		}, 300)

		setTimeout(() => {
			scope.stop()
		}, 2000)
		return () => {
			return <div>{c.value}</div>
		}
	},
})

function useMouseMove() {
	const point = reactive({ x: 0, y: 0 })
	function handler(e: MouseEvent) {
		point.x = e.clientX
		point.y = e.clientY
	}
	window.addEventListener('mousemove', handler)
	onScopeDispose(() => {
		window.removeEventListener('mousemove', handler)
	})

	return toRefs(point)
}

function useMouseMove1() {
	const point = reactive({ x: 0, y: 0 })
	const active = ref(false)
	function handler(e: MouseEvent) {
		point.x = e.clientX
		point.y = e.clientY
	}
	watch(active, () => {
		if (active.value) {
			window.addEventListener('mousemove', handler)
		} else {
			window.removeEventListener('mousemove', handler)
		}
	})

	return {
		...toRefs(point),
		active,
	}
}

export const ScopeExample03 = defineComponent({
	setup() {
		let point: {
			x: Ref<number>
			y: Ref<number>
		} | null = null
		let scope: EffectScope | null = null
		const active = ref(false)
		watch(active, () => {
			if (active.value) {
				scope = effectScope()
				point = scope.run(() => useMouseMove())!
			} else {
				scope?.stop()
				point = null
			}
		})
		return () => {
			return (
				<div>
					{active.value && (
						<span>
							point is: {point?.x.value},{point?.y.value};
						</span>
					)}
					<button
						onClick={() => {
							active.value = !active.value
						}}>
						toogle
					</button>
				</div>
			)
		}
	},
})

export const ScopeExample04 = defineComponent({
	setup() {
		const { x, y, active } = useMouseMove1()
		return () => {
			return (
				<div>
					<span>
						point is: {x.value},{y.value};
					</span>
					<button
						onClick={() => {
							active.value = !active.value
						}}>
						toogle
					</button>
				</div>
			)
		}
	},
})
