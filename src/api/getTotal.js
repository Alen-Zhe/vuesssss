import server from '../util/request.js'
export function getTotal() {
  return server({
    url: '/api/order/allNum',
    method: 'GET',
  })
}