<template>
  <div id="app">

      <!--    登入-->
      <Login v-if="pkId == null || pkId == ''"
             v-bind:pkid="pkId"
             v-on:logins="pkIds($event)"/>
      <!--    主页-->

      <div v-else-if="this.newPage != 'true'">
          <el-container style="height: 700px; border: 1px solid #eee">

              <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                  <el-menu router :default-openeds="['0', '1','3']" >
                      <el-submenu v-for = "(item, index) in $router.options.routes" :index="index + ''" v-if="item.show">
                          <template slot="title">
                              <i v-if="index == 0" class="el-icon-s-custom"></i>
                              <i v-else-if="index == 1" class="el-icon-warning"></i>
                              <i v-else-if="index == 2" class="el-icon-error"></i>
                              <i v-else-if="index == 3" class="el-icon-s-cooperation"></i>
                              <i v-else-if="index == 4" class="el-icon-user-solid"></i>
                              <i v-else-if="index == 5" class="el-icon-s-shop"></i>
                              {{item.name}}
                          </template>
                          <el-menu-item v-for = "(item_a, index_a) in item.children" :index="item_a.path"
                                        :class="$route.path == item_a.path ? 'is-active':''">{{item_a.name}}</el-menu-item>
                      </el-submenu>
                      <el-submenu>
                          <template slot="title">
                              <i class="el-icon-error"></i>
                              退出
                          </template>
                          <el-menu-item>
                              <el-button type="info"
                                         @click="logOut" >退出系统
                              </el-button>
                          </el-menu-item>
                      </el-submenu>
                  </el-menu>
              </el-aside>

              <el-main>
                  <router-view></router-view>
              </el-main>

          </el-container>
      </div>

  </div>
</template>

<style>
    @import "./css/none.css";
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>

    import Login from "./views/Login";

  export default {
      components: {
          Login,
      },
    data() {
      const item = {

      };
      return {
        tableData: Array(20).fill(item),
          newPage: 'false',
          pkId: ''
      }
    },
      watch: {
          pkId:{
              handler(val){
                  console.log(window.sessionStorage.getItem('pkId'))
                  this.pkId = window.sessionStorage.getItem('pkId')
              }
          }
      },
      methods: {
          pkIds(id) {
              this.pkId = id
          },
          logOut(){
              window.sessionStorage.removeItem('pkId')
              this.$router.go(0)
          }
      },
      created() {
          /**
           * 测试
           * */
          // window.sessionStorage.setItem('pkId',1001)


          this.pkId = window.sessionStorage.getItem('pkId')

          this.newPage = this.$router.currentRoute.query.newPage

      }
  };
</script>
