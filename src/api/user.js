import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'post',
  })
}

export function getUserImg(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/sys/logout',
    method: 'post'
  })
}
