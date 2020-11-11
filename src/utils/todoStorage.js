const list = 'LIST'

export function getListData () {
    const arr = localStorage.getItem('list')
    return arr && JSON.parse(arr)
}

export function addListData (item) {
    return localStorage.setItem('list',item)
}

export function removeListData (item) {
    return localStorage.setItem('list',item)
}

export function generatorId(){
    return Date.now() + Math.random().toString(16).substr(2,4)
}

export function filterData(list, type = 'all'){
    debugger
    if (type === 'all') {
        return list
    }
    if (type === 'completed') {
        return list.filter((item)=>{
            return item.completed
        })
    }
    if (type === 'uncomplete') {
        return list.filter((item)=>{
            return !item.completed
        })
    }
}