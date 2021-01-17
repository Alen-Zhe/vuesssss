import server from '../util/request.js'
export function updateUser(obj) {
    return server({
        url: '/api/admin/update',
        method: 'PUT',
        data: obj
    })
}