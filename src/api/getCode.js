import server from '../util/request.js'
export function getCode(obj) {
  return server({
    url: '/api/admin/sendEmail',
    method: 'POST',
    data: obj
  })
}