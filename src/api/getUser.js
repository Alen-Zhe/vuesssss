import server from '../util/request.js'
export function getUser(obj) {
    console.log(obj)
    return server({
        url: '/api/admin/userPage/{page}/{size}',
        method: 'get',
        params: obj
    })
}