

//关于用户日志
import {post, get} from '../utils/request'
export default {

    //    查询日志
    listByAll(page, size){
        return get('/UserLog/listByAll/'+ page +'/' +size)
    },

}