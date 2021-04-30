import { Message } from "element-ui"


export function formatToNumber(data) {
    if (typeof data == 'string') {
        return parseFloat(data)
    } else if (typeof data == 'number') {
        return data
    } else {
        Message.error('数据传入有误，这不是可以转化成数字的类型')
        return null
    }
}

export function formatToString(data) {
    if (typeof data == 'string') {
        return data
    } else if (typeof data == 'number') {
        return data.toString()
    } else {
        Message.error('数据传入有误，这不是可以转化成字符串的类型')
        return null
    }
}