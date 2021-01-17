import server from '../util/request.js'
export function serchOrder(obj){
    return server({
        url:'api/manage/order/search',
        method:'get',
        params:obj
    })
}