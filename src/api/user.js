import { delay } from "../utils/todoStorage";


export function delayTime(duration){
    let timer = null
    return new Promise(res=>{
        timer && clearTimeout(timer)
        timer = setTimeout(()=>{
            res()
        },duration)
    })
}

export async function login(id,pw){
    await delayTime(1000);
    const user = {
        id,
        name: '管理员'
    }
    localStorage.setItem("user", JSON.stringify(user))
    return user
}

export async function loginOut(){
    await delayTime(1000);
    localStorage.removeItem('user')
}

export async function whoAmI(){
    await delayTime(1000);
    const user = localStorage.getItem('user')
    if(user){
        return JSON.parse(user)
    }
    return null
}
