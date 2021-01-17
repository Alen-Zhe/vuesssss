import server from '../util/request.js'
export function addClass(obj) {
    console.log(obj);
    return server({
        url: '/api/order/add',
        method: 'post',
        data: obj
    })
}