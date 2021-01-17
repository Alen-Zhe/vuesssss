import server from '../util/request.js'
export function goodsSerch(obj){
    return server({
        url:'api/manage/product/search',
        method:'get',
        params:obj
    })
}