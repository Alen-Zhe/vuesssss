import server from '../util/request.js'
export function getLogin(obj) {
    return server({
        url: '/api/admin/login',
        method: 'post',
        data: obj
    })
}