<template>
  <div>
    <Headers></Headers>
    <div class="urlMain">
      <el-card class="box-card" v-for="item in 6" >
        <div style="display: flex;flex-direction: row">
          <img :src="logoImg" alt="logo" width="80px" height="80px">
          <div class="box_content">
            <div class="title">标题</div>
            <div class="introduce">介绍sdsdfsdfdsfdsfdsfdsfdsfsdfdssssfsdfsdfsdfdsfdsfsdfsdfsdfsdfdsfsdfsdfdsfdsfsd</div>
          </div>
        </div>
        <slot>
          <div class="box_bottom">
            <ul >
              <li>分享</li>
              <li>访问</li>
            </ul>
          </div>
        </slot>
      </el-card>
    </div>

  </div>
</template>

<script>
import {reqAddArticle} from "@/api"
import { mapState } from 'vuex';
import axios  from "axios";
import Headers from '@/pages/header/index'
export default {
  data(){
    return{
      logoImg:require("@/assets/images/nooblogo.jpg"),
    }
  },
  name: "FriendsUrl",
  components:{
    Headers
  },
  methods:{


  },
  computed:{
    ...mapState({

    })
  },
  watch:{

  }
}
</script>

<style scoped>
.urlMain{
  padding-top: 30px;
  margin: auto;
  width: 62%;
  /*height: 600px;*/
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

}
.box-card {
  width: 300px;
  height: 200px;
  margin: 5px;
}
.box-card:hover{
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
}
.box_content{
  width: 65%;
  margin-left: 20px;
}
.introduce{
  height: 120px;
  word-break: break-all;
}
.box_bottom{
  /*margin-top: 60px*/
}
.box_bottom ul{
  display: flex;flex-direction: row
}
.box_bottom ul li {
  width: 50%;
  text-align: center;
}
</style>