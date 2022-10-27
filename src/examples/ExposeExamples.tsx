import { defineComponent, watch,ref } from "vue"

export const ExposeExample01 = defineComponent({
    setup(){
        const ipt = ref<HTMLInputElement|null>(null)
        watch(ipt,()=>{
            if(ipt.value){
                ipt.value.value = 'hello'
            }
        })
        return()=>{
            return <input type="text" ref={ipt} />
        }
    }
})

export const ExposeExample02 = defineComponent({
    setup(){
        const someRef = ref<any>(null)
        watch(someRef,()=>{
            console.log(someRef.value.divRef); 
        })
        return()=>{
            return <B ref={someRef}/>
        }
    }
})
const A = ()=>{
    return <div>A...</div>
}
const B = defineComponent({
    setup(props,{expose}){
        const divRef = ref(null)
        expose({
            foo:'foo',
            text(){
                console.log('hello'); 
            },
            divRef

        })
        return()=>{
            return <div ref={divRef}>B...</div>
        }
    }
})