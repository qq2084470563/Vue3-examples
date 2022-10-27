import { defineComponent, ref } from 'vue'
import classes from './FilterExamples.module.scss'

// 返回数据
function request() {
	return Promise.resolve([
		{
			name: '张三',
			score: 96,
		},
		{
			name: '李四',
			score: 33,
		},
		{
			name: '小红',
			score: 80,
		},
	])
}
// 类型定义
type TableMeta = {
	title: string
	key: string
}
function useList() {
	const data = ref<any>(null)
	request().then((resp) => {
		data.value = resp
	})
	return data
}

export const FilterExample = defineComponent({
	setup() {
		const tableMeta: TableMeta[] = [
			{
				title: '姓名',
				key: 'name',
			},
			{
				title: '分数',
				key: 'score',
			},
		]
		const data = useList()
		return () => {
			return (
				<div>
					<Table tableMeta={tableMeta} data={data.value} />
				</div>
			)
		}
	},
})
type TableProps = {
	tableMeta: TableMeta[]
	data: Array<Record<string, any>>
}

const Table = ({ tableMeta, data }: TableProps) => {
	{
		return (
			<table class={classes.table}>
				<THead tableMeta={tableMeta} />
				<TBody tableMeta={tableMeta} data={data} />
			</table>
		)
	}
}

const THead = ({ tableMeta }: Omit<TableProps, 'data'>) => {
	return (
		<tr>
			{tableMeta.map((meta) => {
				return <td key={meta.key}>{meta.title}</td>
			})}
		</tr>
	)
}

const TBody = ({ tableMeta, data }: TableProps) => {
	return (
		<>
			{data &&
				data.map((item) => {
					// 基于tableMeta生成元素
					return (
						<tr>
							{tableMeta.map((meta) => {
								return <td key={meta.key}>{item[meta.key]}</td>
							})}
						</tr>
					)
				})}
		</>
	)
}
