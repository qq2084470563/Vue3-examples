// 情况1代理一个值
function createRef<T>(val:T){
    const obj ={
        _value :0,
        get value(){
            // 知道哪些组件需要更新
            track()
            return val
        },
        set value(value:T){
            // 触发更新
            trigger()
            val=value
        }
    } 
    return obj
}
function reactive<T extends Object>(obj:T){
    const proxy = new Proxy(obj,{
        get(target,key){
            return Reflect.get(target,key)
        },
        set(target,key,value){
            Reflect.set(target,key,value)
            return true
        }
    })
    return proxy
}

const count = createRef(1)

