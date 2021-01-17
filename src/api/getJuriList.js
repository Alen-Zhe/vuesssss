import server from '../util/request.js'
export function getJuri(obj) {
    return server({
        url: '/api/admin/allRole',
        method: 'get',
        params: obj
    })
}