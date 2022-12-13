import request from '@/utils/request'

export function getrole(page, pageSize) {
    return request({
        url: '/sys/role',
        method: 'get',
        params: {
            page,
            pageSize,
        },
    })
} 

export function getidrole(id) {
    return request({
        url: `sys/role/${id}`,
        method: 'get',
    })
}

export function removerole(id) {
    return request({
        url: `/sys/role/${id}`,
        method: 'delete',
    })
}

export function addrole(name, description) {
    return request({
        url: '/sys/role',
        method: 'post',
        data: {
            name,
            description,
        },
    })
}

export function setrole(id,description,name,permIds,) {
    return request({
        url: `/sys/role/${id}`,
        method: 'put',
        data: {
            description,
            name,
            permIds,
        },
    })
}

export function givep(id,permIds) {
    return request({
      url: `/sys/role/assignPrem`,
      method: 'put',
      data:{
          id,
          permIds,
      },
    })
  }