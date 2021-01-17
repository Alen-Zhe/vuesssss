import server from '../util/request.js'
export function getGoods(obj) {
    return server({
        url: '/api/order/processedData',
        method: 'POST',
        data: obj
    })
}