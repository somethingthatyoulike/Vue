import request from '@/utils/request'

//保存企业计薪及津贴设置
export function saveSet(data) {
    return request({
        url:'/salarys/settings',
        method:'post',
        data
    })
}