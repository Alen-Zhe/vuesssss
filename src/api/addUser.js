import server from '../util/request.js'
export function addUser(obj) {
    console.log(obj);
    return server({
        url: '/api/admin/update',
        method: 'PUT',
        data: obj
    })
}