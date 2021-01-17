import server from '../util/request.js'
export function register(obj) {
  return server({
    url: '/api/admin/registered',
    method: 'post',
    data: obj
  })
}