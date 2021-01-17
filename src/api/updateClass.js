import server from '../util/request.js'
export function updateClass(obj){
    console.log(obj)
    return server({
        url:'api/manage/category/update',
        method:'post',
        data:obj
    })
}