/*
 * 生成器自动执行器
 * aysnc 原理
 */
export default co
function co<T>(gen: Generator<T>): Promise<IteratorResult<T>> {
	const promise: Promise<IteratorResult<T>> = new Promise(function (
		resolve,
		reject
	) {
		onFulfilled(null)
		function onFulfilled(res: IteratorResult<T> | null) {
			let ret: IteratorResult<T>
			try {
				ret = gen.next(res) as IteratorResult<T>
			} catch (e) {
				return reject(e)
			}
			next(ret)
			return null
		}
		function onRejected(err: Error) {
			let ret
			try {
				ret = gen.throw(err)
			} catch (e) {
				return reject()
			}
		}

		function next(ret: IteratorResult<T>) {
            let timer
			// console.log(ret.done)
			if (ret.done) {
				return resolve(ret)
			}
            clearTimeout(timer)
			let value = toPromise(ret)
			timer=setTimeout(() => {
				value.then(onFulfilled, onRejected)
			})
		}
	})
	function stop() {}
	return promise
}
// 将对象转为promise对象
function toPromise<T>(obj: T): Promise<T> {
	return Promise.resolve(obj)
}