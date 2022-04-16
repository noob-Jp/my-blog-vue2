<template>
  <div>
    <div class="container">
      <div class="content">
        <div class="content_left">
          <div class="content_left_info">
            <router-view></router-view>
          </div>
          <div class="no_data" ref="noDataBtn" >暂无更多数据</div>

        </div>
        <div class="content_right">
          <section class="content_right_info">
            <InfoLink></InfoLink>
          </section>
          <section>
            <HotArticle></HotArticle>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoLink from '@/components/InfoLink/index';
import Article from '@/components/Article/index';
import HotArticle from '@/components/HotArticle/index'
import Comment from '@/components/Comment/index'
import { mapState } from 'vuex';
import _ from 'lodash';
export default {
  name: 'container',
  created() {
    // this.getArticleList();
    this.getHotArticle();

  },
  mounted() {
    window.addEventListener('scroll', this.scroll,false )
  },
  data(){
    return{
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        categoryId: 0
      },
    }
  },
  methods:{
    async getArticleList(){
      const {queryParams}=this;
      try {
        let result=await this.$store.dispatch('getArticleList',queryParams)
      }catch (e){
        console.log(e)
      }
    },
    async getHotArticle(){
      try {
        await this.$store.dispatch("getHotArticle");
      }catch (e){
        console.log(e)
      }
    },
    scroll:_.throttle(function(){
      let scroll=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;//获取滚动条距离顶部的高度
      let clientHeight=document.documentElement.clientHeight;//窗口高度
      let noDataBtnTop=this.$refs.noDataBtn.offsetTop||500;//没有数据按钮距离顶部的距离
      let noDataBtnHeight=this.$refs.noDataBtn.offsetHeight||500;//没有数据按钮的高度
      console.log(scroll,"-------scroll")
      console.log(clientHeight,"-------clientHeight")
      console.log(noDataBtnTop,"-------noDataBtnTop")
      console.log(noDataBtnHeight,"-------noDataBtnHeight")
      console.log(scroll+clientHeight>=noDataBtnTop+noDataBtnHeight)
      if(scroll+clientHeight>=noDataBtnTop+noDataBtnHeight){
        this.queryParams.pageNum++;
        if(!this.isShow){
          this.getArticleList();
        }
      }
    },2000),

  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll, false)
  },
  components: {
    InfoLink,
    Article,
    HotArticle,
    Comment
  },
  computed:{
    ...mapState({
      articleList:state=>state.home.articleList,
      isShow:state=>state.home.isShow,
    })
  }
}
</script>

<style scoped>
.container {
  max-width: 80%;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 50px;
}

.content {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.content_left {
  width: 60%;
  text-align: center;
}
.content_left_info {
  border-radius: 10px;
  margin-bottom: 30px;

}

.no_data {
  background: #97dffd;
  color: #fff;
  cursor: pointer;
}

.content_right {
  width: 36%;
}

section {
  padding: 10px;
  background: #fff;
  width: 100%;
  /*text-align: center;*/
  margin-bottom: 25px;
  border-radius: 10px;
}

.content_right_info:hover {
  box-shadow: 5px 5px 5px #888888;
  transition: all 0.5s linear;
}
@media all and (max-width: 450px) {
  .content {
    flex-direction: column;
  }

  .container {
    max-width: 90%;
  }

  .content_left {
    width: 100%;
  }

  .content_right {
    width: 100%;
  }

  .content_left_info img {
    max-height: 200px;
  }
}
</style>