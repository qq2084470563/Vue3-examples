import { defineComponent, ref } from 'vue'
import _ from 'lodash'

export const DragExample = defineComponent({
	setup() {
		return () => {
			return (
				<div
					style={{ width: '1000px', height: '1000px' }}
					onDragover={(e) => {
						e.preventDefault()
					}}>
					<Draggable>
						<div
							style={{
								width: '100px',
								height: '100px',
								backgroundColor: 'red',
							}}>
							<h1>111</h1>
						</div>
					</Draggable>
				</div>
			)
		}
	},
})
// 封装拖拽行为
function useDrag({ onDragend }: { onDragend: (x: number, y: number) => void }) {
	// 记录
	let startX = 0,
		startY = 0
	// 移动的距离
	const diffX = ref(0)
	const diffY = ref(0)
	const handlers = {
		// 开始拖拽
		onDragstart(e: DragEvent) {
			startX = e.clientX
			startY = e.clientY
		},
		// 拖拽中
		onDrag(e: DragEvent) {
			// 注释掉自己这一套就好了
			e.preventDefault()
			// diffX.value = e.clientX - startX
			// diffY.value = e.clientY - startY
		},
		// 结束拖拽
		onDragend(e: DragEvent) {
			diffX.value = e.clientX - startX
			diffY.value = e.clientY - startY
			// 恢复默认值,通知
			onDragend(diffX.value, diffY.value)
			// 计算结束清空
			diffX.value = 0
			diffY.value = 0
		},
	}
	return { handlers, diffX, diffY }
}

// 给子组件加属性
export const Draggable = defineComponent({
	setup(props, { slots }) {
		// 真实的的值
		const x = ref(0)
		const y = ref(0)
		const { handlers, diffX, diffY } = useDrag({
			onDragend(diffX, diffY) {
				x.value = x.value + diffX
				y.value = y.value + diffY
			},
		})
		return () => {
			const VNode = slots.default!()[0]
			VNode.props = VNode.props || {}
			console.log('render Drag1', VNode.props)
			_.merge(VNode.props, {
				style: {
					position: 'absolute',
					left: x.value + 'px',
					top: y.value + 'px',
					transform: `translate(${diffX.value}px,${diffY.value}px)`,
				},
				draggable: true,
				...handlers,
			})
			console.log('render Drag2', VNode.props)
			return <>{VNode}</>
		}
	},
})
