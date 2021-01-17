import server from '../util/request.js'
export function getClassName(obj){
    return server({
        url:'api/manage/category/info',
        method:'get',
        params:obj
    })
}