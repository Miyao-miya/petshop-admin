

// 管理员日志相关接口
import {post, get} from '../utils/request'
export default {
    //    分页查看商品列表   宠物图片列表
    listByAll(page, size){
        return get('/AdimLog/findall/' +page +'/' +size)
    },
}