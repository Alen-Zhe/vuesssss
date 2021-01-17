import server from '../util/request.js'
export function updateGood(obj){
    return server({
        url:'api/manage/product/update',
        method:'POST',
        data:obj
    })
}