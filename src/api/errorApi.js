

// 错误信息相关接口
import {post, get} from '../utils/request'
export default {
    //    分页查看错误信息
    listByAll(page, size){
        return get('/Error/listByAll/' +page +'/' +size)
    },
}