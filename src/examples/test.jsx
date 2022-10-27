import { defineComponent, reactive ,unref} from "vue"

export const test = defineComponent({
    setup(){
        const {from}=useFrom({
            username:'abc',
            password:'123'
        })
        // console.log(from);
        return ()=>{
            return <div>
                user: <Input 
                        {...from.getField('username')}
                      ></Input>
                <br />
                psd:<Input1
                    {...from.getField('password')}
                    // 需要删除冒泡
                    //  value={from.password}
                    //  onChange={(v)=>{
                    //         console.log(v);
                    //         from.password = v
                    //     }}
                    ></Input1>
                <div style={{marginTop:'10px'}}>
                    <button onClick={()=>console.log(from.getValues())}>submit</button>
                    登录用户为：
                    <br />
                    user:{from.username}。
                    <br />
                    psd:{from.password}。
                </div>
            </div>
            
        }
    }
})

const Input = defineComponent({
    props:{
        value:{
            type:String
        },
        onChange:{
            type:Function
        }
    },
    setup(props){
        return ()=>{
            return <input 
                    value={props.value}
                    onInput={(e)=>{
                        props.onChange&&props.onChange(e.target.value)
                    }}
                   ></input>
        }
    }
})

const Input1 = ({
    value,
    onChange
})=>{
        return <input 
                value={value}
                 onChange={e=>{
                        e.stopImmediatePropagation()
                    }}
                onInput={(e)=>{
                    onChange&&onChange(e.target.value)
                }}
               ></input>
}

// 创建 表单
class From {
    constructor(data){
    this.data = reactive(data)
    }
    // 定义track
    getFieldValue(key){
        return this.data[key]
    }
    // 定义Trigger
    setFieldValue(key,value){
        console.log(this);
        this.data[key]=value
    }
    // 获取表单
    getValues=()=>{
        return JSON.parse(JSON.stringify(this.data)) 

    }
    getField=(key)=>{
        return {
            value:this.data[key],
            onChange:(v)=> {
				this.data[key] = v
			},
        }

    }
}

// 封装proxy，主动代理，自控
function useFrom(data){
    const from =new From(data)
    // console.log(from);
    const proxy= new Proxy(from ,{
        get(target,key){
            // 获取表单
            if(key==='getValues'){
                return from.getValues
            }
            // 封装 v-model 
            if(key==='getField'){
                return from.getField
            }
            return from.getFieldValue(key)
        },
        set(target,key,value){
            from.setFieldValue(key,value)
            return true
        }
    }
        
    )
    return {
        from:proxy
    }
}