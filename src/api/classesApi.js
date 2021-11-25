

//排班相关接口
import {post, get} from '../utils/request'
export default {
    //   添加排班
    inset(business){
        return post('/Classes/inset', business)
    },

    //    修改排班信息
    updata(business){
        return post('/Classes/updata', business)
    },

    //    删除排信息
    delect(integer){
        return get('/Classes/delect/' + integer)
    },

    //    根据排班ID查找排班信息‘
    select(integer){
        return get('/Classes/select/' + integer)
    },

    //    默认列表查找
    listByAll(page, size){
        return get('/Classes/listByAll/' + page+ '/'+ size)
    },

}