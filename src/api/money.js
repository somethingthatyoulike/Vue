import request from '@/utils/request'

export function getinfo(data) {
  return request({
    url: '/salarys/list',
    method: 'post',
    data,
  })
}

export function setinfo(userId, currentBasicSalary, currentPostWage) {
  return request({
    url: `/salarys/modify/${userId}`,
    method: 'post',
    data: {
      userId,
      currentBasicSalary,
      currentPostWage,
    },
  })
}
export function addinfo(userId, currentBasicSalary, currentPostWage, correctionOfBasicWages, turnToPostWages) {
  return request({
    url: `/salarys/init/${userId}`,
    method: 'post',
    data: {
      userId,
      currentBasicSalary,
      currentPostWage,
      correctionOfBasicWages,
      turnToPostWages
    },
  })
}

export function getjt () {
  return request({
    url: `/salarys/settings`,
    method: 'get',
  })
}

export function getsb (id) {
  return request({
    url: `/social_securitys/${id}`,
    method: 'get',
  })
}