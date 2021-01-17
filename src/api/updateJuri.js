import server from '../util/request.js'
export function updateJuri(obj){
    return server({
        url:'api/manage/role/update',
        method:'POST',
        data:obj
    })
}