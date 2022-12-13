import request from '@/utils/request'

export function getkq(params) {
    return request({
        url: '/attendances',
        method: 'get',
        params,
    })
}

export function getbb() {
    return request({
        url: '/attendances/reports',
        method: 'get',
    })
}