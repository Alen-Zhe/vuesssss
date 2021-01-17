import server from '../util/request.js'
export function delUser(obj) {
    console.log(obj);
    return server({
        url: '/api/admin/delete',
        method: 'DELETE',
        data: obj
    })
}