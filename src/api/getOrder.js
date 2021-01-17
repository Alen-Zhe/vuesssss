import server from '../util/request.js'
export function getOrder(obj) {
    console.log(obj)
    return server({
        url: '/api/order/page',
        method: 'POST',
        data: obj
    })
}