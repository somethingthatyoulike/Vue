import request from '@/utils/request'

export function getTableList(page, size) {
  return request({
    url: '/sys/user',
    method: 'get',
    params: {
      size,
      page
    }
  })
}

export function removeTableDate(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete',
  })
}

export function addTableDate(id, data) {
  return request({
    url: `/sys/user/${id}`,
    method: 'put',
    data,
  })
}

export function getBm() {
  return request({
    method: 'GET',
    url: '/company/department',
  })
}