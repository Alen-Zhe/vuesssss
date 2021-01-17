import server from '../util/request.js'
export function goodStatus(obj) {
    return server({
        url: '/api/order/approval',
        method: 'PUT',
        data: obj
    })
}