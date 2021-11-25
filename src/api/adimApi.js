

//管理员相关接口
import {post, get} from '../utils/request'
export default {

    //   添加管理员
    insert(adim){
        return post('/adim/insert', adim)
    },

    //    修改管管理员信息
    update(adim){
        return post('/adim/update', adim)
    },

    //  删除管理员信息
    delect(aId){
        return get('/adim/delect/'+aId)
    },

    //    登入
    login(adim){
        return post('/adim/login', adim)
    },

    //   根据管路员ID 查找管理员
    select(aId){
        return get('/adim/select/'+aId)
    },

    //   根据管路员ID 查找管理员
    findAllByARoot(aRoot, page, size){
        return get('/adim/findAllByARoot/'+aRoot +'/' +page +'/' +size)
    },

}