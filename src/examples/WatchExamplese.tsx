import { defineComponent,watchEffect,ref, onUnmounted, watch} from "vue";


export const watchExample01 = defineComponent({
    setup(){
        const count = ref(0)
        watchEffect(()=>{
            // console.log('im running..',count.value)
            document.title="count"+count.value
            // history.replaceState({},"","/count/"+count.value)
        })
        return ()=>{
            return <div>
            <button onClick={()=>{
                count.value++
            }}>+</button>
            {count.value}
        </div>
        }
    }
})

export const watchExample02 = defineComponent({
    setup(){
        const count = ref(0)
        watchEffect(()=>{
            console.log('im running..')
            document.title="count"+count.value
            // history.replaceState({},"","/count/"+count.value)
        },{
            flush:'post'
        })
        // sync ... tick ... pre ... render ... post
        return ()=>{
            console.log("render..");
            
            return <div>
            <button onClick={()=>{
                count.value++
            }}>+</button>
            {count.value}
        </div>
        }
    }
})
export const watchExample03 = defineComponent({
    setup(){
        const count = ref(0)
        watchEffect((onInvalidate)=>{
            console.log(count.value);
            
            let I = setInterval(()=>{
                count.value++
            },1000)
            // 这么配置onInvalidate
            onInvalidate(()=>{
                clearInterval(I)
            })
            // console.log('im running..',count.value)
        })
        return ()=>{
            console.log("render..");
            return <div>
            {count.value}
        </div>
        }
    }
})
export const watchExample04 = defineComponent({
    setup(){
        const count =ref(0)
        let I = setInterval(()=>{
            count.value++
        },1000)
       
        onUnmounted(()=>{
            clearInterval(I)
        })
        return ()=>{
            console.log("render..");
            return <div>
            {count.value}
        </div>
        }
    }
})

/*Watch */

export const watchExample05=defineComponent({
    setup(){
        const count = ref(0)
        setTimeout(() =>{
            count.value++
        },1000)
        watch(count,()=>{
            console.log('count',count);
            
        })
        return()=>{
            return <div>
                {count.value}
            </div>
        }
    }
})

export const watchExample06=defineComponent({
    setup(){
        const a = ref(0)
        const b = ref(0)
        const c = ref(a.value+b.value)
        setInterval(()=>{
            a.value+=0.2
        },500)
        setInterval(()=>{
            b.value+=0.7
        })
        watch([a,b],(x,y)=>{
            c.value = a.value+b.value
            
        })
        return()=>{
            return <div>
                {c.value}
            </div>
        }
    }
})

export const watchExample07=defineComponent({
    setup(){
       const greetings =ref('hello')
       setTimeout(() => {
        greetings.value='bye'
       }, 1000);
        return()=>{
            return <div>
                <Item text={greetings.value}/>
            </div>
        }
    }
})
const Item =defineComponent({
    props:{
        text:{
           type:String 
        }
    },

    setup(props){
        watch (()=>props.text,(to,from)=>{
            console.log("prop changed to",to)
        })
        return()=>{
            return <div>{props.text}</div>
        }
    }
})

export const watchExample08=defineComponent({
    setup(){
       const c = ref(0)
       watch (c,(to,from)=>{
        console.log(to);
        
       },{
        "immediate":true
       })
        return()=><div onClick={()=>{
            c.value++
        }}>{c.value}</div>

}
})