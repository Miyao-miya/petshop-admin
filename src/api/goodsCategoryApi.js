

// 商品类型相关

import {post, get} from '../utils/request'
export default {

    //      添加商品
    insert(goods){
        return post('/GoodsCategory/insert', goods)
    },

    //      删除商品
    delete(index){
        return get('/GoodsCategory/delect/' +index)
    },

    //    修改商品信息
    updata(goods){
        return post('/GoodsCategory/updata', goods)
    },

    //    分页查看商品列表   宠物图片列表
    listByAll(){
        return get('/GoodsCategory/listByAll')
    },
}