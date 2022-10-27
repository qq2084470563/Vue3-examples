import { defineComponent,reactive, toRefs } from "vue";

export const ReactiveExample01 = defineComponent({
    setup(){
        const state = reactive({
            a:'1231',
            b:2
        })
        setTimeout(()=>{
            state.a='456'
        },1000)
        setTimeout(()=>{
            state.a='456'
        },2000)
        return ()=>{
            return <div>
                <div>{state.a}</div>
                <div>{state.b}</div>
            </div>
        }
    }
})

export const ReactiveExample02 = defineComponent({
    setup(){
        const state = reactive({
            a:'1231',
            b:2
        })
        const {a,b}=toRefs(state)
        setTimeout(()=>{
            a.value='456'
        },1000)
        setTimeout(()=>{
            b.value=1
        },2000)
        return ()=>{
            return <div>
                <div>{a.value}</div>
                <div>{b.value}</div>
            </div>
        }
    }
})