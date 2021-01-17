import server from '../util/request.js'
export function addGoods(obj){
    console.log(obj);
    return server({
        url:'api/manage/product/add',
        method:'post',
        data:obj
    })
}