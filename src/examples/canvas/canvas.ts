import {Ref} from 'vue'
// 冒泡排序
export function* bubbleSort<T>(arr: Ref<Array<T>>) {
	let len = arr.value.length
	for (let i = 0; i < len; i++) {
		for (var j = 0; j < len - 1 - i; j++) {
			if (arr.value[j] > arr.value[j + 1]) {
				//相邻元素两两对比
				var temp = arr.value[j + 1] //元素交换
				arr.value[j + 1] = arr.value[j]
				arr.value[j] = temp
			}
		}
		yield arr
	}
}
// 选择排序
export function* selectionSort<T>(arr:Ref<Array<T>>){
    let len = arr.value.length
    let minIndex,temp:T
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr.value[j] < arr.value[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr.value[i];
        arr.value[i] = arr.value[minIndex];
        arr.value[minIndex] = temp;
        yield arr
    }

}
// 插入排序
export function* insertionSort<T> (arr:Ref<Array<T>>){
    let len = arr.value.length
    for (var i = 1; i < len; i++) {
            let key = arr.value[i];
            let j = i - 1;
            while (j >= 0 && arr.value[j] > key) {
                arr.value[j + 1] = arr.value[j];
                j--;
            }
            arr.value[j + 1] = key;
            yield arr
        }
}
// 快速排序
export function* quickSort<T>(arr:Ref<Array<T>>){

}