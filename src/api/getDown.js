import server from '../util/request.js'
export function getdown(obj) {
  return server({
    url: '/api/order/exportExcel',
    method: 'POST',
    data: obj
  })
}