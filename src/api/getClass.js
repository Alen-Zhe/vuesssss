import server from '../util/request.js'
export function getClass(obj) {
    return server({
        url: '/api/order/page',
        method: 'get',
        params: obj
    })
}