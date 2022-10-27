import { computed, defineComponent, nextTick, ref, Ref } from 'vue'
// import classes from './canvas.module.scss'
import classes from './canvas/canvas.module.scss'
import {selectionSort,bubbleSort,insertionSort} from './canvas/canvas'
import co from './canvas/utils/co'
import {Draggable} from './Drag' 

type instKAndV<T> = {
	k: number
	v: T
}
// 获取无序数组
function useArr<T>(
	param: number | Array<T>,
	num: number = 1
): Array<T | number> {
	let nums: Array<T | number> = []
	for (let i = 0; i < num; i++) {
		let arr: Array<T | number> = []
		if (typeof param === 'number') {
			arr = [...Array(param).keys()]
		} else {
			arr = param
		}
		const new_arr: Array<instKAndV<T>> = arr
			.map((item) => Object({ k: Math.random(), v: item }))
			.sort((a, b) => a.k - b.k)
		arr.splice(0, arr.length, ...new_arr.map((i) => i.v))
		nums = [...nums, ...arr]
	}
	return nums
}
// 计算cos 和sin
function cosAndSin(angle: number) {
	const new_angle = (angle / 180) * Math.PI
	return {
		cos: Math.cos(new_angle),
		sin: Math.sin(new_angle),
	}
}
// 定义坐标类型
type InstPOle = {
	x: number
	y: number
}
// 计算极点坐标
function movePole(arr: Array<any>) {
	const poleArr: Array<InstPOle> = []
	arr.forEach((v, i) => {
		const obj: InstPOle = { x: 0, y: 0 }
		// 只有数字的，如果是其他排序，通过计算生成数子
		if (typeof v === 'number') {
			const { cos, sin } = cosAndSin(i)
			obj.x = cos * v
			obj.y = sin * v
			poleArr.push(obj)
		}
	})
	return poleArr
}

// 封装参数获取
function useSort() {
	const point = ref<Array<number>>([])
	point.value = useArr(180, 4) as Array<number>

	return { point }
}

export const canvasExamples = defineComponent({
	setup() {
		const arr = ref<Array<InstPOle>>([])
		const { point } = useSort()
		// arr.value = movePole(point.value)
		return () => {
			return (
				<div>
					<Draggable><div><Canvas points={point.value}/></div></Draggable>
					<button
						onClick={() => {
                            // 加一个节流函数
							 co(selectionSort(point))
						}}>
						开始冒泡排序
					</button>
					{point.value && point.value.join('-')}
				</div>
			)
		}
	},
})

// 画图组件
const Canvas = ({ points }: { points: Array<number> }) => {
	// console.log(1)
	const po = movePole(points)
	return (
		// <div 
		// class={classes.canvas}></div>
		<div class={classes.canvas}>
			{po &&
				po.map((point: InstPOle) => {
					return (
						<div
							class={classes.point}
							style={{
								top: `${250 + point.y}px`,
								left: `${250 + point.x}px`,
							}}></div>
					)
				})}
		</div>
	)
}
