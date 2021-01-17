import server from '../util/request.js'
export function addJuri(obj){
    console.log(obj);
    return server({
        url:'api/manage/role/add',
        method:'post',
        data:obj
    })
}