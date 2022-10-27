import {
	defineComponent,
	ref,
	PropType,
	VNode,
	reactive,
	toRefs,
	Ref,
	unref,
} from 'vue'

//封装展示类组件
export const component01 = () => {
	return <Button text={'hello'} />
}
const Button = defineComponent({
	props: {
		text: {
			type: String,
		},
	},
	setup({ text }) {
		return () => <button>{text}</button>
	},
})

//  slot 封装展示类
export const component02 = () => {
	return <Button2>{'hello button2'}</Button2>
}
const Button2 = defineComponent({
	setup(props, { slots }) {
		const Child = slots.default!
		// const Child = (slots.default!) as any as ()=> JSX.Element
		// 逻辑上我们是调child函数，但是为什么大写，因为其实可以这样写
		// return ()=> <button><Child/></button>
		return () => <button>{Child()}</button>
	},
})
export const component03 = () => {
	return (
		<Panel header={<span>title</span>}>
			<span>hello content</span>
		</Panel>
	)
}

const Panel = defineComponent({
	props: {
		header: {
			type: Object as PropType<JSX.Element>,
		},
	},
	setup(props, { slots }) {
		console.log(slots)

		return () => {
			return (
				<div>
					<header>{props.header}</header>
					{slots.default!()}
				</div>
			)
		}
	},
})

export const component04 = () => {
	return (
		<Flex>
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		</Flex>
	)
}

const Flex = defineComponent({
	setup(props, { slots }) {
		return () => {
			// 拿vnode需要去slots.default!()[0]
			const vNode: VNode = slots.default!()[0]
			if (!vNode.props) {
				vNode.props = {}
			}
			vNode.props.style = {
				display: 'flex',
			}
			return <>{vNode}</>
		}
	},
})

export const component05 = defineComponent({
	setup() {
		const FROM_DATA = reactive({
			username: 'abc',
		})
		setTimeout(() => {
			FROM_DATA.username = 'def'
		}, 1000)
		const { username } = toRefs(FROM_DATA)
		return () => <Input text={username} />
	},
})
const Input = ({ text }: { text: Ref<String> }) => {
	return (
		<input
			type='text'
			value={text.value}
			onChange={(e) => {
				text.value = (e.target as HTMLInputElement).value
			}}
		/>
	)
}

export const component06 = defineComponent({
	setup() {
		const { from } = useFrom({
			username: 'abc',
		})
		setTimeout(() => {
			// 代码上没有username，所以需要转换
			from.username = 'def'
		}, 1000)
		// const { username } = toRefs(from)
		return () => {
			return (
				<div>
					<button
						onClick={(e) => {
							console.log(from.getValues())
						}}>
						submit
					</button>
					<Input1
						{...from.getField('username')}
						// 	onChange={(v) => {
						// 		from.username = v
						// 	}}
						// 	text={from.username}
					/>
				</div>
			)
		}
	},
})

const Input1 = ({
	text,
	onChange,
}: {
	text: String
	onChange?: (v: string) => void
}) => {
	return (
		<input
			type='text'
			value={text}
			onChange={(e) => {
				e.stopImmediatePropagation()
			}}
			onInput={(e) => {
				onChange && onChange((e.target as HTMLInputElement).value)
			}}
		/>
	)
}
// 更好的约束
class Form<T extends Record<string, any>> {
	private data: { [key: string]: any }
	constructor(data: T) {
		this.data = reactive(data)
	}
	public getFieldValue(key: string) {
		return this.data[key]
	}
	public setFieldValue(key: string, value: string) {
		// 泛型没办法赋值，所以定一个data类型
		this.data[key] = value
	}
	public getValues = () => {
		return JSON.parse(JSON.stringify(this.data))
		// return unref(this.data)
	}
	public getField = (key: string) => {
		return {
			text: this.data[key],
			onChange: (v: any) => {
				this.data[key] = v
			},
		}
	}
}
// 注册方法
interface FormOperators<T> {
	getValues(): T
	getField(key: string): { text: any; onChange: (v: any) => void }
}

function useFrom<T>(data: T) {
	const form = new Form<T>(data)
	// 当前的版本号
	// const ver = ref(0)
	const proxy = new Proxy(form, {
		get(target, key) {
			if (key === 'getValues') {
				return form.getValues
			}
			if (key === 'getField') {
				return form.getField
			}
			return form.getFieldValue(key as string)
		},
		set(target, key, value) {
			form.setFieldValue(key as string, value as string)
			return true
		},
	})
	return {
		// 简单转换，强制类型转换
		from: proxy as any as T & FormOperators<T>,
	}
}
