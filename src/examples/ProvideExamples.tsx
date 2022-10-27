import { defineComponent, inject, provide,reactive } from "vue";


type Theme = {
    color:string
}
export const ProvideExample01 = defineComponent({

    setup(){
        const theme = reactive({
            color:'red'
        })
        provide('theme',theme)
        return ()=>{
            return <div>
                <button onClick={()=>{
                    theme.color='blue'
                }}>Theme to Blue</button>
                <A/>
            </div>
        }
    }
})

const B = defineComponent({
    setup(){
        const theme = inject('theme') as Theme 
        return ()=>{
            return <div style={{
                backgroundColor:theme.color
            }}>Hello</div>
        }
    }
})
const A = ()=>{
    return <B/>
}


function wait(ms:number) {
    return new Promise((resolve)=>{
        setTimeout(() => {
        return resolve(null)
        },ms);
    })
    
}

async function login() {
    await wait(2000)
    return {
        success:null,
        data:null
    }
}
// 在前端框架中单独分离一个专门放类型的文件
type User={
userName:string,
loggedIn:boolean
}

function contentUser(){
    const user = reactive<User>({
        userName:'',
        loggedIn:false
    })
    provide('user',user)
    login().then(()=>{
        user.userName='陈大元'
        user.loggedIn=true
    })
}
export const ProvideExample02 = defineComponent({

    setup(){
        contentUser()
        return ()=>{
            return <div>
                <Header/>
                <Content/>
            </div>
        }
    }
})
const Header = defineComponent({
    setup(){
        const user = inject('user') as User
        return ()=>{
            return <div>
                <header>欢迎来到小陈系统。。<strong>{user.userName}</strong></header>
            </div>
        }
    }
})
const Content = ()=>{
    return <div>你好！</div>
}